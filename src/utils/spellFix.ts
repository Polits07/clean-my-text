import nspell from "nspell";

type Spell = ReturnType<typeof nspell>;

let spellPromise: Promise<Spell> | null = null;

async function loadText(url: string): Promise<string> {
  const res = await fetch(url);
  const text = await res.text();
  // Vite serves index.html for missing files, so check for that explicitly
  if (!res.ok || text.trimStart().toLowerCase().startsWith("<!doctype")) {
    throw new Error(
      `Dictionary file not found: ${url}. Copy it into the /public/dictionaries folder.`
    );
  }
  return text;
}

function getSpell(): Promise<Spell> {
  if (!spellPromise) {
    spellPromise = Promise.all([
      loadText("/dictionaries/en.aff"),
      loadText("/dictionaries/en.dic"),
    ])
      .then(([aff, dic]) => nspell(aff, dic))
      .catch((err) => {
        spellPromise = null; // allow retry
        throw err;
      });
  }
  return spellPromise;
}

const cache = new Map<string, string>();

function matchCase(original: string, fixed: string): string {
  if (original.length > 1 && original === original.toUpperCase()) {
    return fixed.toUpperCase();
  }
  if (original[0] === original[0].toUpperCase()) {
    return fixed.charAt(0).toUpperCase() + fixed.slice(1);
  }
  return fixed;
}

function fixWord(spell: Spell, word: string): string {
  // Skip single letters and ACRONYMS (NASA, USA, ...)
  if (word.length < 2) return word;
  if (word === word.toUpperCase() && word.length <= 6) return word;

  const cached = cache.get(word);
  if (cached !== undefined) return cached;

  let result = word;

  if (!spell.correct(word)) {
    // 1) Stretched letters: "coool" -> "cool", "trrrrryyyyy" -> "try"
    const candidates: string[] = [];
    if (/(\p{L})\1{2,}/iu.test(word)) {
      candidates.push(word.replace(/(\p{L})\1{2,}/giu, "$1$1"));
      candidates.push(word.replace(/(\p{L})\1+/giu, "$1"));
    }
    const hit = candidates.find((c) => spell.correct(c));

    if (hit) {
      result = matchCase(word, hit);
    } else {
      // 2) Regular typo: "tryy" -> "try", "thia" -> "this"
      const suggestion = spell.suggest(word)[0];
      if (suggestion) result = matchCase(word, suggestion);
    }
  }

  cache.set(word, result);
  return result;
}

export async function fixSpelling(text: string): Promise<string> {
  if (!text.trim()) return text;
  const spell = await getSpell();
  // Letters only (with inner apostrophes), so numbers, URLs and symbols stay untouched
  return text.replace(/\p{L}+(?:['’]\p{L}+)*/gu, (w) => fixWord(spell, w));
}