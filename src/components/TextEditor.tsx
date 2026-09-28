import { useRef } from "react";
import { Upload, Trash2, FileEdit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { readTextFile } from "@/utils/fileUtils";

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export default function TextEditor({ value, onChange }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onChange(await readTextFile(file));
    e.target.value = "";
  };

  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-medium">
          <FileEdit size={16} className="text-violet-600" />
          Your Messy Text
        </div>
        <span className="rounded-full bg-rose-100 px-2 py-0.5 text-xs text-rose-600">
          {value.length} characters
        </span>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste your messy text here..."
        className="min-h-[320px] w-full resize-none rounded-lg border p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
      />

      <div className="flex gap-2">
        <input
          ref={fileRef}
          type="file"
          accept=".txt,text/plain"
          hidden
          onChange={handleUpload}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileRef.current?.click()}
        >
          <Upload size={14} className="mr-1" /> Upload File
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onChange("")}
        >
          <Trash2 size={14} className="mr-1" /> Clear
        </Button>
      </div>
    </div>
  );
}