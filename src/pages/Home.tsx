import {useState } from "react";
import { ArrowRight } from "lucide-react";
import TextEditor from "@/components/TextEditor";
import OutputPanel from "@/components/OutputPanel";
import CleaningTools from "@/components/CleaningTools";
import OneClickClean from "@/components/OneClickClean";
import {DEFAULT_OPTIONS } from "@/utils/textCleaner";
import type { CleaningOptionId } from "@/types";
import { useCleanedText } from "@/hooks/useCleanedText";

export default function Home() {
  const [text, setText] = useState("");
  const [enabled, setEnabled] = useState<CleaningOptionId[]>(DEFAULT_OPTIONS);
  const [outputCleared, setOutputCleared] = useState(false);

  const output = useCleanedText(text, enabled);

  const handleToggle = (id: CleaningOptionId) => {
    setEnabled((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <main className="mx-auto max-w-5xl space-y-6 px-4 py-10">
      <header className="text-center">
        <h1 className="text-4xl font-extrabold">
          Clean. Format. <span className="text-violet-600">Perfect.</span>
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Paste your messy text below and instantly transform it into clean,
          readable, and professional text.
        </p>
      </header>

      <div className="grid items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
        <TextEditor
          value={text}
          onChange={(v) => {
            setText(v);
            setOutputCleared(false);
          }}
        />
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 text-white">
          <ArrowRight size={16} />
        </div>
        <OutputPanel
          value={outputCleared ? "" : output}
          onClear={() => setOutputCleared(true)}
        />
      </div>

      <CleaningTools enabled={enabled} onToggle={handleToggle} />
      <OneClickClean onApplyPreset={(opts) => setEnabled([...opts])} />
    </main>
  );
}