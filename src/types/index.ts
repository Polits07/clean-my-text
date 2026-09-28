export type CleaningOptionId =
  | "fixSpelling"
  | "removeExtraSpaces"
  | "removeExtraSpaces"
  | "removeEmptyLines"
  | "removeDuplicateLines"
  | "fixCapitalization"
  | "removeSpecialCharacters"
  | "removeEmojis"
  | "sortLines"
  | "convertUppercase"
  | "convertLowercase"
  | "titleCase"
  | "removeLineBreaks"
  | "trimLines";

export interface CleaningOption {
  id: CleaningOptionId;
  label: string;
  description: string;
  icon: string; // lucide icon name, mapped in ToolCard
  enabled: boolean;
}

export type PresetId = "basic" | "full" | "strict" | "textOnly";