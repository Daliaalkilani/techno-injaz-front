import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpLeft,
  Bot,
  Brain,
  Radio,
  Cpu,
  Globe,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers,
  ArrowRight,
} from "lucide-react";
import { projects } from "../../data/projects";
import { categories } from "../../data/categories";
import { universityBySlug } from "../../data/universities";
import { toArabicDigits } from "../../lib/utils";

const categoryIconMap: Record<string, typeof Bot> = {
  robotics: Bot,
  ai: Brain,
  iot: Radio,
  embedded: Cpu,
  web: Globe,
};

export function RefinedProjectShowcase() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeSlide, setActiveSlide] = useState(0);

  // Filter projects by active category
  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.categories.includes(activeCategory));

  const total = filteredProjects.length;
  const currentProject = filteredProjects[activeSlide] || filteredProjects[0];
  const uni = universityBySlug(currentProject?.university || "");

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + total) % total);
  };

  const handleCategoryChange = (slug: string) => {
    setActiveCategory(slug);
    setActiveSlide(0);
  };

  return (
    <div className="space-y-8">
      {/* Section Header with Category Tabs */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span>معرض الأعمال والأنظمة المنجزة</span>
          </div>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            مشاريع هندسية نوعية وأنظمة متكاملة
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            تصفح نماذج من الأنظمة التي صممناها ونفذناها في مختلف التخصصات الهندسية والتطبيقية
          </p>
        </div>

        {/* Minimal Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 rounded-2xl border border-border/80 bg-card p-1.5 shadow-xs">
          <button
            onClick={() => handleCategoryChange("all")}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${
              activeCategory === "all"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            الكل ({toArabicDigits(projects.length)})
          </button>
          {categories.slice(0, 4).map((cat) => {
            const Icon = categoryIconMap[cat.slug] || Bot;
            const count = projects.filter((p) => p.categories.includes(cat.slug)).length;
            if (count === 0) return null;
            return (
              <button
                key={cat.slug}
                onClick={() => handleCategoryChange(cat.slug)}
                className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
                  activeCategory === cat.slug
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Split Showcase: Featured Showcase Left + Quick List Right */}
      {currentProject && (
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          {/* Main Visual Feature Spotlight */}
          <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border/90 bg-card p-6 sm:p-8 shadow-sm transition-all duration-300 hover:border-primary/40">
            {/* Image Preview & Badges */}
            <div className="space-y-6">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-muted">
                <img
                  src={currentProject.coverImage}
                  alt={currentProject.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

                {/* Top Overlay Meta */}
                <div className="absolute inset-x-4 top-4 flex items-center justify-between">
                  <span className="rounded-full border border-white/20 bg-black/60 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
                    {uni?.name || "مشروع تطبيقي"} • {toArabicDigits(currentProject.year)}
                  </span>
                  <span className="rounded-full bg-primary/90 px-3 py-1 text-[11px] font-semibold text-primary-foreground backdrop-blur-md">
                    {toArabicDigits(activeSlide + 1)} / {toArabicDigits(total)}
                  </span>
                </div>

                {/* Bottom Overlay Title on Image */}
                <div className="absolute inset-x-4 bottom-4">
                  <div className="inline-flex items-center gap-1.5 rounded-lg bg-background/90 px-2.5 py-1 text-xs font-bold text-primary backdrop-blur-md">
                    <Sparkles className="h-3 w-3" />
                    <span>مشروع مميز</span>
                  </div>
                </div>
              </div>

              {/* Text Info */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                  {currentProject.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {currentProject.description || currentProject.shortDescription}
                </p>
              </div>

              {/* Technologies / Specs Tag Cloud */}
              <div className="space-y-2 pt-2">
                <div className="text-xs font-semibold text-foreground">التقنيات والمكونات الأساسية:</div>
                <div className="flex flex-wrap gap-2">
                  {currentProject.technologies?.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center rounded-lg border border-border/80 bg-secondary/50 px-2.5 py-1 font-mono text-xs font-medium text-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                  {currentProject.hardware?.slice(0, 3).map((hw) => (
                    <span
                      key={hw}
                      className="inline-flex items-center rounded-lg border border-primary/20 bg-primary/5 px-2.5 py-1 text-xs text-primary"
                    >
                      {hw}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions and Navigation Controls */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border/70 pt-6">
              <Link
                to={`/projects/${currentProject.slug}`}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-xs transition-all hover:bg-primary/90"
              >
                <span>استعراض ملف المشروع الكامل</span>
                <ArrowUpLeft className="h-4 w-4" />
              </Link>

              {/* Prev / Next controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  aria-label="المشروع السابق"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-secondary/50 text-foreground transition-colors hover:border-primary/50 hover:bg-secondary"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="المشروع التالي"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-secondary/50 text-foreground transition-colors hover:border-primary/50 hover:bg-secondary"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick List Side Panel (Minimalist and organized) */}
          <div className="flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  قائمة المشاريع المنجزة ({toArabicDigits(filteredProjects.length)})
                </span>
                <Link
                  to="/projects"
                  className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
                >
                  <span>كافة المشاريع</span>
                  <ArrowUpLeft className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="space-y-2.5">
                {filteredProjects.slice(0, 4).map((p, idx) => {
                  const isSelected = activeSlide === idx;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setActiveSlide(idx)}
                      className={`flex w-full items-start gap-3.5 rounded-2xl border p-3.5 text-right transition-all duration-200 ${
                        isSelected
                          ? "border-primary/60 bg-card ring-2 ring-primary/20 shadow-xs"
                          : "border-border/70 bg-card/60 hover:border-border hover:bg-card"
                      }`}
                    >
                      <img
                        src={p.coverImage}
                        alt={p.title}
                        className="h-16 w-20 shrink-0 rounded-xl object-cover bg-muted"
                      />
                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-[11px] font-semibold text-primary">
                            {toArabicDigits(p.year)}
                          </span>
                          {isSelected && (
                            <span className="h-2 w-2 rounded-full bg-primary" />
                          )}
                        </div>
                        <h4 className="text-xs font-bold text-foreground line-clamp-1">
                          {p.title}
                        </h4>
                        <p className="text-[11px] text-muted-foreground line-clamp-1 leading-normal">
                          {p.shortDescription}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Link to Gallery */}
            <div className="rounded-2xl border border-border/80 bg-secondary/30 p-4 text-center">
              <p className="text-xs text-muted-foreground mb-3">
                هل تبحث عن فكرة مخصصة أو مشروع تخرج محدد؟
              </p>
              <Link
                to="/contact"
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-border bg-card px-4 py-2.5 text-xs font-semibold text-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                <span>طلب استشارة أو فكرة مشروع</span>
                <ArrowUpLeft className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
