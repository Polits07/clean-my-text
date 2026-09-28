import { Wand2, HelpCircle, Info, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-4 border-b bg-white/70 backdrop-blur">
      <div className="flex items-center gap-2">
        <Wand2 className="text-violet-600" size={24} />
        <div>
          <h1 className="font-bold text-lg leading-tight">Clean My Text</h1>
          <p className="text-xs text-muted-foreground">
            Instantly clean, format, and optimize your text
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Moon size={18} />
        </Button>
        <Button variant="outline" size="sm">
          <HelpCircle size={16} className="mr-1" /> How it works
        </Button>
        <Button variant="outline" size="sm">
          <Info size={16} className="mr-1" /> About
        </Button>
      </div>
    </header>
  );
}