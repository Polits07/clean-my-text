import { useState } from "react";
import { Sparkles, Copy, Download, Trash2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { copyToClipboard, downloadTextFile } from "@/utils/fileUtils";

interface Props {
  value: string;
  onClear: () => void;
}

export default function CleanedText({ value, onClear }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const ok = await copyToClipboard(value);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-medium">
          <Sparkles size={16} className="text-violet-600" />
          Cleaned Text
        </div>
        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-600">
          {value.length} characters
        </span>
      </div>

      <textarea
        value={value}
        readOnly
        placeholder="Your cleaned text will appear here..."
        className="min-h-[320px] w-full resize-none rounded-lg border bg-slate-50 p-3 font-mono text-sm"
      />

      <div className="flex gap-2">
        <Button
          type="button"
          size="sm"
          className="bg-violet-600 hover:bg-violet-700"
          onClick={handleCopy}
          disabled={!value}
        >
          {copied ? (
            <Check size={14} className="mr-1" />
          ) : (
            <Copy size={14} className="mr-1" />
          )}
          {copied ? "Copied" : "Copy"}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => downloadTextFile(value)}
          disabled={!value}
        >
          <Download size={14} className="mr-1" /> Download
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={onClear}>
          <Trash2 size={14} className="mr-1" /> Clear
        </Button>
      </div>
    </div>
  );
}