import { useRef, useEffect, type ChangeEvent } from "react";
import { Search, X, Command } from "lucide-react";
import { cn } from "../../lib/utils";

interface ModernSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  enableKeyboardShortcut?: boolean;
  autoFocus?: boolean;
  resultCount?: number;
  totalCount?: number;
}

export function ModernSearchBar({
  value,
  onChange,
  placeholder = "ابحث بالكلمات المفتاحية...",
  className,
  enableKeyboardShortcut = true,
  autoFocus = false,
  resultCount,
  totalCount,
}: ModernSearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut listener ('/' key or Ctrl+K / Cmd+K)
  useEffect(() => {
    if (!enableKeyboardShortcut) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === "/" || ((e.ctrlKey || e.metaKey) && e.key === "k")) &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enableKeyboardShortcut]);

  const handleClear = () => {
    onChange("");
    inputRef.current?.focus();
  };

  return (
    <div className={cn("relative flex items-center w-full", className)}>
      {/* Search Icon */}
      <div className="pointer-events-none absolute right-3.5 flex items-center text-muted-foreground transition-colors">
        <Search className="h-4 w-4" />
      </div>

      {/* Input */}
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="h-11 w-full rounded-2xl border border-border/80 bg-card pr-10 pl-16 text-xs sm:text-sm text-foreground shadow-2xs placeholder:text-muted-foreground/70 transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
      />

      {/* Actions (Clear & Shortcut Badge) */}
      <div className="absolute left-2.5 flex items-center gap-1.5">
        {value ? (
          <button
            type="button"
            onClick={handleClear}
            className="flex h-7 w-7 items-center justify-center rounded-xl bg-secondary/80 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors cursor-pointer"
            aria-label="مسح البحث"
            title="مسح البحث"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        ) : enableKeyboardShortcut ? (
          <kbd
            onClick={() => inputRef.current?.focus()}
            className="hidden sm:inline-flex h-6 select-none items-center gap-0.5 rounded-lg border border-border/70 bg-secondary/50 px-2 font-mono text-[10px] font-semibold text-muted-foreground cursor-pointer hover:border-primary/40 hover:text-foreground transition-colors"
            title="اضغط / للتركيز على البحث"
          >
            <span>/</span>
          </kbd>
        ) : null}
      </div>
    </div>
  );
}
