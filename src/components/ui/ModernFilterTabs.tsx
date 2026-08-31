import { useRef, useEffect } from "react";
import { motion } from "motion/react";
import { cn, toArabicDigits } from "../../lib/utils";

export interface FilterTabItem {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

interface ModernFilterTabsProps {
  tabs: FilterTabItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function ModernFilterTabs({
  tabs,
  activeId,
  onChange,
  className,
  size = "md",
}: ModernFilterTabsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll active tab into view on mobile
  useEffect(() => {
    if (containerRef.current) {
      const activeEl = containerRef.current.querySelector(
        `[data-tab-id="${activeId}"]`
      ) as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [activeId]);

  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-xs sm:text-sm gap-2",
    lg: "px-5 py-2.5 text-sm sm:text-base gap-2.5",
  }[size];

  return (
    <div className={cn("relative max-w-full overflow-hidden", className)}>
      <div
        ref={containerRef}
        className="no-scrollbar flex items-center gap-1.5 sm:gap-2 overflow-x-auto p-1.5 rounded-2xl border border-border/80 bg-secondary/30 backdrop-blur-sm"
        role="tablist"
      >
        {tabs.map((tab) => {
          const isActive = activeId === tab.id;
          return (
            <button
              key={tab.id}
              data-tab-id={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(tab.id)}
              className={cn(
                "relative z-10 flex shrink-0 items-center justify-center rounded-xl font-bold transition-all duration-200 cursor-pointer select-none",
                sizeClasses,
                isActive
                  ? "text-primary font-extrabold"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
              )}
            >
              {/* Sliding active pill indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeModernFilterPill"
                  className="absolute inset-0 z-[-1] rounded-xl border border-primary/30 bg-card shadow-xs"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}

              {tab.icon && <span className="shrink-0">{tab.icon}</span>}
              <span className="whitespace-nowrap">{tab.label}</span>

              {typeof tab.count === "number" && (
                <span
                  className={cn(
                    "ms-1 inline-flex items-center justify-center rounded-md font-mono text-[11px] px-1.5 py-0.2 transition-colors",
                    isActive
                      ? "bg-primary/15 text-primary font-bold"
                      : "bg-secondary text-muted-foreground"
                  )}
                >
                  {toArabicDigits(tab.count)}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
