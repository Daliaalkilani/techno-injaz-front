import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ArrowUpLeft,
  Globe,
  Radio,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type { LiveProject } from "../../data/types";
import { liveCategories, liveCategoryName } from "../../data/liveProjects";
import { liveProjectTypeLabels } from "../../data/types";
import { cn, toArabicDigits } from "../../lib/utils";

const SLIDE_DURATION = 6000; // 6 seconds per slide for calm reading

export function LiveProjectsShowcase({
  projects,
}: {
  projects: LiveProject[];
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  const total = filteredProjects.length;

  // Reset index when category changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory]);

  const activeProject = filteredProjects[currentIndex] || filteredProjects[0];

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % (total || 1));
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + (total || 1)) % (total || 1));
  }, [total]);

  // Calm Auto-slide
  useEffect(() => {
    if (isPaused || total <= 1) return;
    const timer = setInterval(() => {
      nextSlide();
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [isPaused, total, nextSlide]);

  if (!activeProject) return null;

  const getCleanDomain = (url?: string) => {
    if (!url) return "";
    return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  };

  return (
    <div className="space-y-6">
      {/* Category selector pills */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
              selectedCategory === "all"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "border border-border/80 bg-card text-muted-foreground hover:text-foreground hover:border-primary/40",
            )}
          >
            جميع الأنظمة الحية ({toArabicDigits(projects.length)})
          </button>

          {liveCategories.map((cat) => {
            const count = projects.filter((p) => p.category === cat.slug).length;
            if (count === 0) return null;
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "border border-border/80 bg-card text-muted-foreground hover:text-foreground hover:border-primary/40",
                )}
              >
                <span className="me-1.5">{cat.emoji}</span>
                {cat.name} ({toArabicDigits(count)})
              </button>
            );
          })}
        </div>

        {/* Slide Counter & Arrow Nav */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-semibold text-muted-foreground">
            {toArabicDigits(currentIndex + 1)} من {toArabicDigits(total)}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={prevSlide}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-secondary"
              aria-label="السابق"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <button
              onClick={nextSlide}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-secondary"
              aria-label="التالي"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Balanced Sliding Showcase Card */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative overflow-hidden rounded-[28px] border border-border/80 bg-card shadow-lg"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="grid items-center gap-8 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-10"
          >
            {/* Visual Side (Browser Mockup Frame) */}
            <div className="order-1 lg:order-2">
              <div className="overflow-hidden rounded-2xl border border-border/80 bg-slate-950 shadow-xl">
                {/* Browser Top Bar */}
                <div className="flex items-center justify-between border-b border-white/10 bg-slate-900/90 px-4 py-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="flex items-center gap-1.5 rounded-md bg-slate-950/80 px-3 py-1 font-mono text-[11px] text-slate-300 border border-white/5">
                    <Radio className="h-3 w-3 text-emerald-400" />
                    <span>{getCleanDomain(activeProject.url) || "techno-enjaz.live"}</span>
                  </div>
                  <div className="w-8" />
                </div>

                {/* Screenshot Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                  <img
                    src={activeProject.image}
                    alt={activeProject.name}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent pointer-events-none" />

                  {/* Live Status indicator */}
                  <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/90 px-3 py-1 font-mono text-xs font-semibold text-white shadow-lg backdrop-blur">
                      <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                      يعمل الآن أونلاين
                    </span>

                    <span className="rounded-full bg-slate-900/85 px-3 py-1 font-mono text-xs font-medium text-slate-200 backdrop-blur border border-white/10">
                      {liveProjectTypeLabels[activeProject.type]}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Side */}
            <div className="order-2 space-y-5 lg:order-1">
              <div>
                <span className="inline-block font-mono text-xs font-bold text-primary">
                  {liveCategoryName(activeProject.category)}
                </span>

                <h3 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
                  {activeProject.name}
                </h3>

                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  {activeProject.description}
                </p>
              </div>

              {/* Highlights */}
              <div className="space-y-2 border-y border-border/70 py-3 text-sm text-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>منصة حية منشورة ومتاحة للتجربة الفورية في المتصفح</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <span>تنفيذ وتصميم هندسي كامل مع توثيق كود ومخططات</span>
                </div>
              </div>

              {/* Primary Direct Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                {activeProject.url ? (
                  <a
                    href={activeProject.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-bold text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:-translate-y-0.5"
                  >
                    <span>انقر للمشاهدة الحية</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                ) : null}

                <Link
                  to={`/projects/${activeProject.slug}`}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary hover:border-primary/40"
                >
                  <span>تفاصيل المشروع</span>
                  <ArrowUpLeft className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Indicator Dots */}
        <div className="flex items-center justify-center gap-1.5 border-t border-border/60 bg-muted/20 py-3">
          {filteredProjects.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setCurrentIndex(idx)}
              className={cn(
                "h-2 rounded-full transition-all",
                idx === currentIndex
                  ? "w-8 bg-primary"
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60",
              )}
              aria-label={`الانتقال إلى مشروع ${p.name}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
