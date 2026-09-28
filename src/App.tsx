import { useState } from "react";
import Header from "@/components/Header";
import TextEditor from "@/components/TextEditor";
import CleanedText from "@/components/CleanedText";
import CleaningTools from "@/components/CleaningTools";
import OneClickClean from "@/components/OneClickClean";
import FeaturesFooter from "@/components/FeaturesFooter";
import Footer from "@/components/Footer";
import { DEFAULT_OPTIONS } from "@/utils/textCleaner";
import { useCleanedText } from "@/hooks/useCleanedText";
import type { CleaningOptionId } from "@/types";
import { ArrowRight } from "lucide-react";

export default function App() {
  const [inputText, setInputText] = useState("");
  const [enabled, setEnabled] = useState<CleaningOptionId[]>(DEFAULT_OPTIONS);

  // Runs spell-fix (if enabled) and then all the other cleaning tools
  const cleanedText = useCleanedText(inputText, enabled);

  const toggleOption = (id: CleaningOptionId) => {
    setEnabled((prev) =>
      prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50/50 to-white">
      <Header />

      <main className="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold">
            Clean. Format. <span className="text-violet-600">Perfect.</span>
          </h2>
          <p className="text-muted-foreground mt-2">
            Paste your messy text below and instantly transform it into clean, readable, and professional text.
          </p>
        </div>

        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-start">
          <TextEditor value={inputText} onChange={setInputText} />
          <div className="hidden md:flex items-center justify-center h-full pt-24">
            <div className="rounded-full bg-violet-600 text-white p-3">
              <ArrowRight size={18} />
            </div>
          </div>
          <CleanedText value={cleanedText} onClear={() => setInputText("")} />
        </div>

        <CleaningTools enabled={enabled} onToggle={toggleOption} />
        <OneClickClean onApplyPreset={(opts) => setEnabled([...opts])} />
        <FeaturesFooter />
      </main>

      <Footer />
    </div>
  );
}