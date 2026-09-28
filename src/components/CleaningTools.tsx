import {
  AlignLeft, Rows3, Copy as CopyIcon, CaseSensitive, Ban,
  Smile, ArrowDownAZ, ArrowUpAZ, Type, Shuffle, TextCursorInput, SpellCheck,
} from "lucide-react";
import ToolCard from "./ToolCard";
import type { CleaningOptionId } from "@/types";

const TOOLS: {
  id: CleaningOptionId;
  icon: any;
  label: string;
  description: string;
}[] = [
  { id: "fixSpelling", icon: SpellCheck, label: "Fix Spelling & Typos", description: "Fix typos and stretched letters" },
  { id: "removeExtraSpaces", icon: AlignLeft, label: "Remove Extra Spaces", description: "Remove extra spaces between words" },
  { id: "removeEmptyLines", icon: Rows3, label: "Remove Empty Lines", description: "Delete blank lines" },
  { id: "removeDuplicateLines", icon: CopyIcon, label: "Remove Duplicate Lines", description: "Remove duplicate lines" },
  { id: "fixCapitalization", icon: CaseSensitive, label: "Fix Capitalization", description: "Capitalize sentences properly" },
  { id: "removeSpecialCharacters", icon: Ban, label: "Remove Special Characters", description: "Remove special characters" },
  { id: "removeEmojis", icon: Smile, label: "Remove Emojis", description: "Remove all emojis" },
  { id: "sortLines", icon: ArrowDownAZ, label: "Sort Lines (A-Z)", description: "Sort lines alphabetically" },
  { id: "convertUppercase", icon: ArrowUpAZ, label: "Convert to UPPERCASE", description: "Convert all text to uppercase" },
  { id: "convertLowercase", icon: Type, label: "convert to lowercase", description: "Convert all text to lowercase" },
  { id: "titleCase", icon: Type, label: "Title Case", description: "Convert to Title Case" },
  { id: "removeLineBreaks", icon: Shuffle, label: "Remove Line Breaks", description: "Join all lines into one" },
  { id: "trimLines", icon: TextCursorInput, label: "Trim Lines", description: "Remove spaces from start/end" },
];

interface Props {
  enabled: CleaningOptionId[];
  onToggle: (id: CleaningOptionId) => void;
}

export default function CleaningTools({ enabled, onToggle }: Props) {
  return (
    <section className="rounded-xl border bg-white p-6">
      <h2 className="font-semibold text-lg">Text Cleaning Tools</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Select any tools below to clean and format your text
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {TOOLS.map((tool) => (
          <ToolCard
            key={tool.id}
            icon={tool.icon}
            label={tool.label}
            description={tool.description}
            enabled={enabled.includes(tool.id)}
            onToggle={() => onToggle(tool.id)}
          />
        ))}
      </div>
    </section>
  );
}