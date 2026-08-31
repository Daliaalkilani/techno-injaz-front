import { useState } from "react";
import { Link } from "react-router-dom";
import { Clock, ArrowUpLeft, BookOpen, Share2, Check, Sparkles } from "lucide-react";
import type { Article } from "../../data/types";
import { categoryName } from "../../data/categories";
import { Badge } from "../ui/primitives";
import { formatArabicDate, toArabicDigits } from "../../lib/utils";

interface ArticleCardProps {
  article: Article;
  variant?: "grid" | "list";
}

export function ArticleCard({ article, variant = "grid" }: ArticleCardProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleCopyLink = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/articles/${article.slug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- List View Variant (Horizontal sleek row) ---
  if (variant === "list") {
    return (
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex flex-col sm:flex-row items-stretch overflow-hidden rounded-2xl border border-border/80 bg-card p-4 sm:p-5 transition-all duration-300 hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5"
      >
        {isHovered && (
          <div
            className="pointer-events-none absolute -inset-px rounded-2xl opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(14, 116, 144, 0.06), transparent 80%)`,
            }}
            aria-hidden
          />
        )}

        {/* Thumbnail on Right (in RTL) */}
        <div className="relative aspect-[16/10] sm:aspect-square sm:w-44 shrink-0 overflow-hidden rounded-xl bg-muted">
          <img
            src={article.coverImage}
            alt={article.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-2 right-2 z-10">
            <span className="inline-flex items-center rounded-lg bg-slate-950/80 px-2 py-0.5 font-mono text-[10px] font-bold text-primary backdrop-blur-xs border border-white/10">
              {categoryName(article.category)}
            </span>
          </div>
        </div>

        {/* Content Details */}
        <div className="relative z-10 flex flex-1 flex-col justify-between mt-3 sm:mt-0 sm:pe-5 sm:ps-5">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5 text-xs text-muted-foreground font-mono">
              <span>{formatArabicDate(article.date)}</span>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3 text-primary" />
                <span>{toArabicDigits(article.readingMinutes)} د</span>
              </div>
            </div>

            <Link to={`/articles/${article.slug}`}>
              <h3 className="text-base sm:text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                {article.title}
              </h3>
            </Link>

            <p className="mt-1.5 line-clamp-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
              {article.excerpt}
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3">
            <div className="flex items-center gap-2">
              <Link
                to={`/articles/${article.slug}`}
                className="inline-flex items-center gap-1 text-xs font-bold text-primary transition-transform duration-200 group-hover:-translate-x-1"
              >
                <span>قراءة المقال</span>
                <ArrowUpLeft className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleCopyLink}
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-secondary/80 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
                title={copied ? "تم نسخ الرابط!" : "مشاركة المقال"}
                aria-label="مشاركة المقال"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Share2 className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- Grid View Variant (Default Card) ---
  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col overflow-hidden rounded-[24px] border border-border/80 bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:-translate-y-1"
    >
      {/* Subtle radial spotlight on hover */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px rounded-[24px] opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(14, 116, 144, 0.08), transparent 80%)`,
          }}
          aria-hidden
        />
      )}

      {/* Cover Image & Category */}
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={article.coverImage}
          alt={article.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"
          aria-hidden
        />

        {/* Category Pill */}
        <div className="absolute right-3.5 top-3.5 z-10">
          <Badge className="bg-slate-900/85 text-primary border border-white/10 font-mono text-[11px] backdrop-blur-md">
            {categoryName(article.category)}
          </Badge>
        </div>

        {/* Read Time Pill & Share button */}
        <div className="absolute bottom-3 left-3.5 right-3.5 z-10 flex items-center justify-between">
          <div className="flex items-center gap-1.5 rounded-lg bg-black/75 px-2.5 py-1 font-mono text-[11px] font-semibold text-white backdrop-blur-xs">
            <Clock className="h-3 w-3 text-primary" />
            <span>{toArabicDigits(article.readingMinutes)} دقائق</span>
          </div>

          <button
            type="button"
            onClick={handleCopyLink}
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-black/75 text-white backdrop-blur-xs hover:bg-primary hover:text-white transition-colors cursor-pointer"
            title={copied ? "تم نسخ الرابط!" : "مشاركة المقال"}
            aria-label="مشاركة المقال"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Share2 className="h-3 w-3" />}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-1 flex-col justify-between p-5 sm:p-6">
        <div>
          <div className="mb-2 text-[11px] font-mono text-muted-foreground">
            {formatArabicDate(article.date)}
          </div>
          <Link to={`/articles/${article.slug}`}>
            <h3 className="text-base sm:text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
              {article.title}
            </h3>
          </Link>
          <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
            {article.excerpt}
          </p>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4">
          <Link
            to={`/articles/${article.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary transition-transform duration-200 group-hover:-translate-x-1"
          >
            <span>قراءة المقال بالكامل</span>
            <ArrowUpLeft className="h-4 w-4" />
          </Link>

          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary/80 text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
            <BookOpen className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
}
