import type { LucideIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface Props {
  icon: LucideIcon;
  label: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
}

export default function ToolCard({
  icon: Icon,
  label,
  description,
  enabled,
  onToggle,
}: Props) {
  return (
    <div
      role="switch"
      aria-checked={enabled}
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          onToggle();
        }
      }}
      className="flex cursor-pointer items-center gap-3 rounded-lg border bg-white p-3 transition hover:border-violet-300"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
        <Icon size={16} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium">{label}</div>
        <div className="truncate text-xs text-muted-foreground">
          {description}
        </div>
      </div>
      <Switch
        checked={enabled}
        tabIndex={-1}
        className="pointer-events-none"
      />
    </div>
  );
}