import { useEffect, useMemo, useState } from "react";
import { cleanText } from "@/utils/textCleaner";
import { fixSpelling } from "@/utils/spellFix";
import type { CleaningOptionId } from "@/types";

type Fixed = { text: string; enabled: CleaningOptionId[]; out: string };

export function useCleanedText(text: string, enabled: CleaningOptionId[]): string {
  const wantsSpelling = enabled.includes("fixSpelling");

  // Plain cleaning is derived during render (no state, no effect needed)
  const plain = useMemo(() => cleanText(text, enabled), [text, enabled]);

  // Only the async spelling result lives in state
  const [fixed, setFixed] = useState<Fixed | null>(null);

  useEffect(() => {
    if (!wantsSpelling || !text.trim()) return undefined;

    let cancelled = false;
    const timer = setTimeout(async () => {
      try {
        const spelled = await fixSpelling(text);
        if (!cancelled) {
          setFixed({ text, enabled, out: cleanText(spelled, enabled) });
        }
      } catch (err) {
        console.error("Spell fix failed:", err);
      }
    }, 200); // small debounce while typing

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [text, enabled, wantsSpelling]);

  // Use the spell-fixed result only if it matches the current input and tools
  if (wantsSpelling && fixed && fixed.text === text && fixed.enabled === enabled) {
    return fixed.out;
  }
  return plain;
}