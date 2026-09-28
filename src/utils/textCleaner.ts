import type { CleaningOptionId } from "@/types";

export const DEFAULT_OPTIONS: CleaningOptionId[] = [
  "fixSpelling",
  "removeExtraSpaces",
  "removeEmptyLines",
  "removeDuplicateLines",
];

export const PRESETS: Record<
  "basic" | "full" | "strict" | "textOnly",
  CleaningOptionId[]
> = {
  basic: ["removeExtraSpaces", "removeEmptyLines"],
  full: [
    "fixSpelling",
    "trimLines",
    "removeExtraSpaces",
    "removeEmptyLines",
    "removeDuplicateLines",
    "fixCapitalization",
  ],
  strict: [
    "fixSpelling",
    "trimLines",
    "removeExtraSpaces",
    "removeEmptyLines",
    "removeDuplicateLines",
    "removeEmojis",
    "removeSpecialCharacters",
    "fixCapitalization",
  ],
  textOnly: [
    "fixSpelling",
    "removeEmojis",
    "removeSpecialCharacters",
    "trimLines",
    "removeExtraSpaces",
    "removeEmptyLines",
  ],
};

// Note: "fixSpelling" is async, so it is handled in useCleanedText.ts
// (it runs BEFORE this function). cleanText ignores that option.
export function cleanText(input: string, options: CleaningOptionId[]): string {
  const has = (id: CleaningOptionId) => options.includes(id);
  let t = input;

  if (has("removeEmojis")) {
    t = t.replace(/\p{Extended_Pictographic}|\uFE0F|\u200D/gu, "");
  }
  if (has("removeSpecialCharacters")) {
    t = t.replace(/[^\p{L}\p{N}\s.,!?'"-]/gu, "");
  }

  let lines = t.split(/\r?\n/);

  if (has("trimLines")) lines = lines.map((l) => l.trim());
  if (has("removeExtraSpaces")) {
    lines = lines.map((l) => l.replace(/[ \t]{2,}/g, " ").trim());
  }
  if (has("removeEmptyLines")) lines = lines.filter((l) => l.trim() !== "");
  if (has("removeDuplicateLines")) lines = [...new Set(lines)];
  if (has("sortLines")) {
    lines = [...lines].sort((a, b) => a.localeCompare(b));
  }

  t = has("removeLineBreaks") ? lines.join(" ") : lines.join("\n");

  if (has("convertUppercase")) t = t.toUpperCase();
  if (has("convertLowercase")) t = t.toLowerCase();
  if (has("titleCase")) {
    t = t.toLowerCase().replace(/\b\p{L}/gu, (c) => c.toUpperCase());
  }
  if (has("fixCapitalization")) {
    t = t.replace(
      /(^\s*|[.!?]\s+)(\p{L})/gmu,
      (_, prefix: string, ch: string) => prefix + ch.toUpperCase()
    );
  }

  return t;
}