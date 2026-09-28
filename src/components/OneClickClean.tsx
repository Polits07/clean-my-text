import { Button } from "@/components/ui/button";
import { PRESETS } from "@/utils/textCleaner";
import type { CleaningOptionId } from "@/types";

interface Props {
  onApplyPreset: (options: CleaningOptionId[]) => void;
}

const PRESET_META = [
  { id: "basic", label: "Basic Clean", desc: "Spaces + Empty Lines" },
  { id: "full", label: "Full Clean", desc: "Most common cleaning" },
  { id: "strict", label: "Strict Clean", desc: "Aggressive cleaning" },
  { id: "textOnly", label: "Text Only", desc: "Remove everything except text" },
] as const;

export default function OneClickClean({ onApplyPreset }: Props) {
  return (
    <section className="rounded-xl bg-violet-50 border border-violet-100 p-6 flex flex-col md:flex-row md:items-center gap-4 justify-between">
      <div>
        <h3 className="font-semibold text-violet-700">One-Click Clean</h3>
        <p className="text-sm text-violet-600/80">
          Instantly clean your text with popular presets
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {PRESET_META.map((p) => (
          <Button
            key={p.id}
            variant="outline"
            className="flex flex-col items-start h-auto py-2 px-4 bg-white"
            onClick={() => onApplyPreset(PRESETS[p.id])}
          >
            <span className="text-sm font-medium">{p.label}</span>
            <span className="text-xs text-muted-foreground">{p.desc}</span>
          </Button>
        ))}
      </div>
    </section>
  );
}