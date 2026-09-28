import { ShieldCheck, Zap, PenLine, Sparkles } from "lucide-react";

const FEATURES = [
  { icon: ShieldCheck, title: "100% Private", desc: "Your text never leaves your browser" },
  { icon: Zap, title: "Instant Results", desc: "Clean your text in one click" },
  { icon: PenLine, title: "Easy to Use", desc: "Simple, fast, and user-friendly" },
  { icon: Sparkles, title: "Free Forever", desc: "All features are completely free" },
];

export default function FeaturesFooter() {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-6 rounded-xl border bg-white p-8">
      {FEATURES.map((f) => (
        <div key={f.title} className="flex flex-col items-center text-center gap-2">
          <f.icon className="text-violet-600" size={22} />
          <p className="font-medium text-sm">{f.title}</p>
          <p className="text-xs text-muted-foreground">{f.desc}</p>
        </div>
      ))}
    </section>
  );
}