import { motion } from "motion/react";
import { LayoutGrid, List } from "lucide-react";
import { cn } from "../../lib/utils";

export type ViewMode = "grid" | "list";

interface ViewToggleProps {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
  className?: string;
}

export function ViewToggle({ mode, onChange, className }: ViewToggleProps) {
  return (
    <div
      className={cn(
        "relative flex items-center p-1 rounded-xl border border-border/80 bg-secondary/30",
        className
      )}
      role="group"
      aria-label="نمط العرض"
    >
      <button
        type="button"
        onClick={() => onChange("grid")}
        className={cn(
          "relative z-10 flex h-8 w-8 sm:w-auto sm:px-2.5 items-center justify-center gap-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer select-none",
          mode === "grid" ? "text-primary" : "text-muted-foreground hover:text-foreground"
        )}
        title="عرض كشبكة بطاقات"
      >
        {mode === "grid" && (
          <motion.div
            layoutId="viewToggleIndicator"
            className="absolute inset-0 z-[-1] rounded-lg border border-primary/30 bg-card shadow-xs"
            transition={{ type: "spring", stiffness: 450, damping: 30 }}
          />
        )}
        <LayoutGrid className="h-4 w-4" />
        <span className="hidden sm:inline">شبكة</span>
      </button>

      <button
        type="button"
        onClick={() => onChange("list")}
        className={cn(
          "relative z-10 flex h-8 w-8 sm:w-auto sm:px-2.5 items-center justify-center gap-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer select-none",
          mode === "list" ? "text-primary" : "text-muted-foreground hover:text-foreground"
        )}
        title="عرض كقائمة مفصلة"
      >
        {mode === "list" && (
          <motion.div
            layoutId="viewToggleIndicator"
            className="absolute inset-0 z-[-1] rounded-lg border border-primary/30 bg-card shadow-xs"
            transition={{ type: "spring", stiffness: 450, damping: 30 }}
          />
        )}
        <List className="h-4 w-4" />
        <span className="hidden sm:inline">قائمة</span>
      </button>
    </div>
  );
}
