import { motion, AnimatePresence } from "motion/react";
import { X, RotateCcw } from "lucide-react";
import { cn, toArabicDigits } from "../../lib/utils";

export interface ActiveFilterItem {
  id: string;
  label: string;
  valueDisplay: string;
  onRemove: () => void;
}

interface ActiveFilterPillsProps {
  filters: ActiveFilterItem[];
  onClearAll: () => void;
  resultCount?: number;
  totalCount?: number;
  itemLabel?: string;
  className?: string;
}

export function ActiveFilterPills({
  filters,
  onClearAll,
  resultCount,
  totalCount,
  itemLabel = "عنصر",
  className,
}: ActiveFilterPillsProps) {
  if (filters.length === 0 && resultCount === undefined) return null;

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-3 py-2.5 px-3.5 rounded-2xl border border-border/70 bg-secondary/20 backdrop-blur-xs",
        className
      )}
    >
      {/* Active Tags */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-muted-foreground me-1">
          الفلاتر النشطة:
        </span>

        <AnimatePresence mode="popLayout">
          {filters.map((filter) => (
            <motion.span
              key={filter.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              className="inline-flex items-center gap-1.5 rounded-xl border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary shadow-2xs"
            >
              <span className="text-[11px] text-muted-foreground font-normal">
                {filter.label}:
              </span>
              <span>{filter.valueDisplay}</span>
              <button
                type="button"
                onClick={filter.onRemove}
                className="ms-0.5 flex h-4 w-4 items-center justify-center rounded-md hover:bg-primary/20 transition-colors cursor-pointer"
                title={`إزالة فلتر ${filter.label}`}
              >
                <X className="h-3 w-3" />
              </button>
            </motion.span>
          ))}
        </AnimatePresence>

        {filters.length > 1 && (
          <button
            type="button"
            onClick={onClearAll}
            className="inline-flex items-center gap-1 text-xs font-bold text-muted-foreground hover:text-destructive transition-colors cursor-pointer ms-1"
          >
            <RotateCcw className="h-3 w-3" />
            <span>مسح الكل</span>
          </button>
        )}
      </div>

      {/* Counter */}
      {typeof resultCount === "number" && (
        <div className="text-xs font-medium text-muted-foreground">
          عرض{" "}
          <span className="font-mono font-bold text-foreground">
            {toArabicDigits(resultCount)}
          </span>
          {typeof totalCount === "number" && (
            <>
              {" "}
              من أصل{" "}
              <span className="font-mono font-bold text-foreground">
                {toArabicDigits(totalCount)}
              </span>
            </>
          )}{" "}
          {itemLabel}
        </div>
      )}
    </div>
  );
}
