import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpLeft, Eye, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type { Project } from "../../data/types";
import { projectTypeLabels } from "../../data/types";
import { categories, categoryName } from "../../data/categories";
import { universityBySlug } from "../../data/universities";
import { toArabicDigits } from "../../lib/utils";
import { FavoriteButton } from "./FavoriteButton";
import { ProjectQuickPreviewModal } from "./ProjectQuickPreviewModal";

export function InteractiveProjectMatrix({
  projects,
}: {
  projects: Project[];
}) {
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [quickPreviewProject, setQuickPreviewProject] =
    useState<Project | null>(null);

  const filtered =
    selectedCat === "all"
      ? projects
      : projects.filter((p) => p.categories.includes(selectedCat));

  return (
    <div className="space-y-8">
      {/* Category Tabs Filter */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/70 pb-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCat("all")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              selectedCat === "all"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "border border-border/80 bg-card text-muted-foreground hover:text-foreground hover:border-primary/40"
            }`}
          >
            الكل ({toArabicDigits(projects.length)})
          </button>

          {categories.slice(0, 5).map((cat) => {
            const isSel = selectedCat === cat.slug;
            const count = projects.filter((p) =>
              p.categories.includes(cat.slug),
            ).length;
            if (count === 0) return null;
            return (
              <button
                key={cat.slug}
                onClick={() => setSelectedCat(cat.slug)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  isSel
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "border border-border/80 bg-card text-muted-foreground hover:text-foreground hover:border-primary/40"
                }`}
              >
                {cat.name} ({toArabicDigits(count)})
              </button>
            );
          })}
        </div>

        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          <span>استعراض الأرشيف بالكامل</span>
          <ArrowUpLeft className="h-4 w-4" />
        </Link>
      </div>

      {/* Clean, Balanced 3-Column Project Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCat}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.slice(0, 6).map((proj) => {
            const uni = universityBySlug(proj.university);
            return (
              <div
                key={proj.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-border/80 bg-card p-5 transition-all duration-300 hover:border-primary/50 hover:shadow-lg"
              >
                {/* Visual Thumbnail */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-muted">
                  <img
                    src={proj.coverImage}
                    alt={proj.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute inset-x-3 top-3 flex items-center justify-between pointer-events-none">
                    <span className="rounded-full bg-slate-900/85 px-3 py-1 font-mono text-[11px] font-semibold text-white backdrop-blur border border-white/10">
                      {projectTypeLabels[proj.type]}
                    </span>
                    <div className="pointer-events-auto">
                      <FavoriteButton slug={proj.slug} variant="overlay" />
                    </div>
                  </div>

                  <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between text-[11px] font-mono text-slate-200 pointer-events-none">
                    <span>{uni?.name || "مشروع هندسي"}</span>
                    <span>{toArabicDigits(proj.year)}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="mt-4 flex-1 space-y-2">
                  <span className="font-mono text-xs font-semibold text-primary">
                    {categoryName(proj.category)}
                  </span>
                  <h4 className="text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                    <Link to={`/projects/${proj.slug}`}>
                      {proj.title}
                    </Link>
                  </h4>
                  <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                    {proj.shortDescription}
                  </p>
                </div>

                {/* Tech tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {proj.technologies.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-border/80 bg-secondary/50 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                  {proj.technologies.length > 3 && (
                    <span className="font-mono text-[11px] text-muted-foreground self-center">
                      +{toArabicDigits(proj.technologies.length - 3)}
                    </span>
                  )}
                </div>

                {/* Action Bar */}
                <div className="mt-4 flex items-center justify-between border-t border-border/70 pt-3.5">
                  <button
                    onClick={() => setQuickPreviewProject(proj)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-primary"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <span>معاينة سريعة</span>
                  </button>

                  <Link
                    to={`/projects/${proj.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                  >
                    <span>تفاصيل المشروع</span>
                    <ArrowUpLeft className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Quick Preview Modal */}
      <ProjectQuickPreviewModal
        item={quickPreviewProject}
        isOpen={!!quickPreviewProject}
        onClose={() => setQuickPreviewProject(null)}
      />
    </div>
  );
}
