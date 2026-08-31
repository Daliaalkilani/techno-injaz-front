import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpLeft, GraduationCap, Eye, Video as VideoIcon, FileText } from "lucide-react";
import type { Project } from "../../data/types";
import { projectTypeLabels } from "../../data/types";
import { categoryName } from "../../data/categories";
import { universityBySlug } from "../../data/universities";
import { Badge, Tag } from "../ui/primitives";
import { toArabicDigits } from "../../lib/utils";
import { FavoriteButton } from "./FavoriteButton";
import { ProjectQuickPreviewModal } from "./ProjectQuickPreviewModal";

interface ProjectCardProps {
  project: Project;
  variant?: "grid" | "list";
}

export function ProjectCard({ project, variant = "grid" }: ProjectCardProps) {
  const [showPreview, setShowPreview] = useState(false);
  const uni = universityBySlug(project.university);

  // List View Variant (Horizontal sleek engineering row)
  if (variant === "list") {
    return (
      <>
        <div className="group relative flex flex-col sm:flex-row items-stretch overflow-hidden rounded-2xl border border-border/80 bg-card p-4 sm:p-5 transition-all duration-300 hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5">
          {/* Thumbnail */}
          <div className="relative aspect-[16/10] sm:aspect-[4/3] sm:w-56 shrink-0 overflow-hidden rounded-xl bg-muted">
            <img
              src={project.coverImage}
              alt={project.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-2 right-2 z-10 flex items-center gap-1">
              <span className="inline-flex items-center rounded-lg bg-slate-950/80 px-2 py-0.5 font-mono text-[10px] font-bold text-white backdrop-blur-xs border border-white/10">
                {projectTypeLabels[project.type]}
              </span>
            </div>

            <div className="absolute bottom-2 left-2 z-10 flex items-center gap-1">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowPreview(true);
                }}
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-950/80 text-white backdrop-blur-xs hover:bg-primary transition-colors cursor-pointer"
                title="معاينة سريعة"
              >
                <Eye className="h-3.5 w-3.5" />
              </button>
              <FavoriteButton slug={project.slug} variant="overlay" />
            </div>
          </div>

          {/* Details */}
          <div className="relative z-10 flex flex-1 flex-col justify-between mt-3 sm:mt-0 sm:pe-5 sm:ps-5">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5 text-xs text-muted-foreground font-mono">
                <span className="font-bold text-primary">
                  {categoryName(project.category)}
                </span>
                <div className="flex items-center gap-2">
                  <span>{uni?.name || "مشروع هندسي"}</span>
                  <span>•</span>
                  <span>{toArabicDigits(project.year)}</span>
                </div>
              </div>

              <Link to={`/projects/${project.slug}`}>
                <h3 className="text-base sm:text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                  {project.title}
                </h3>
              </Link>

              <p className="mt-1.5 line-clamp-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                {project.shortDescription}
              </p>

              {/* Tags & Features */}
              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                {project.technologies.slice(0, 4).map((t) => (
                  <Tag
                    key={t}
                    className="rounded-md border-border/80 bg-secondary/60 text-[11px] px-2 py-0.5"
                  >
                    {t}
                  </Tag>
                ))}
                {project.videos.length > 0 && (
                  <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground font-mono bg-secondary/40 px-2 py-0.5 rounded-md">
                    <VideoIcon className="h-3 w-3 text-primary" />
                    فيديو
                  </span>
                )}
                {project.hasPdf && (
                  <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground font-mono bg-secondary/40 px-2 py-0.5 rounded-md">
                    <FileText className="h-3 w-3 text-primary" />
                    تقرير
                  </span>
                )}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3">
              <Link
                to={`/projects/${project.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary transition-transform duration-200 group-hover:-translate-x-1"
              >
                <span>استعراض المخطط والتفاصيل الهندسية</span>
                <ArrowUpLeft className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        <ProjectQuickPreviewModal
          item={project}
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
        />
      </>
    );
  }

  // Grid View Variant (Default Card)
  return (
    <>
      <div className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-border/80 bg-card transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:-translate-y-1">
        {/* Card Cover Image */}
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          <img
            src={project.coverImage}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none"
            aria-hidden
          />

          {/* Top Badges */}
          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3 z-10">
            <Badge className="gap-1 bg-slate-900/80 text-white backdrop-blur-md border border-white/10 font-mono text-[11px]">
              <GraduationCap className="h-3.5 w-3.5" />
              {projectTypeLabels[project.type]}
            </Badge>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowPreview(true);
                }}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900/80 text-white backdrop-blur-md border border-white/10 transition-colors hover:bg-primary hover:text-white cursor-pointer"
                title="معاينة سريعة"
                aria-label="معاينة سريعة"
              >
                <Eye className="h-3.5 w-3.5" />
              </button>
              <FavoriteButton slug={project.slug} variant="overlay" />
            </div>
          </div>

          {/* Bottom University / Year Bar */}
          <div className="absolute bottom-2.5 right-3 left-3 flex items-center justify-between text-[11px] font-mono text-slate-200 pointer-events-none">
            <span>{uni?.name || "مشروع هندسي"}</span>
            <span>{toArabicDigits(project.year)}</span>
          </div>
        </div>

        {/* Content Body */}
        <Link
          to={`/projects/${project.slug}`}
          className="relative z-10 flex flex-1 flex-col p-5"
        >
          <span className="mb-1 font-mono text-[11px] font-semibold tracking-wider text-primary">
            {categoryName(project.category)}
          </span>
          <h3 className="text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
            {project.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {project.shortDescription}
          </p>

          <div className="mt-3 flex flex-wrap items-end gap-1.5">
            {project.technologies.slice(0, 3).map((t) => (
              <Tag
                key={t}
                className="rounded-md border-border/80 bg-secondary/60 text-[11px]"
              >
                {t}
              </Tag>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-border/70 pt-3 text-xs font-semibold text-primary">
            <span>تفاصيل المشروع الهندسية</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/80 transition-all duration-300 group-hover:-translate-x-1 group-hover:bg-primary group-hover:text-primary-foreground">
              <ArrowUpLeft className="h-4 w-4" />
            </span>
          </div>
        </Link>
      </div>

      <ProjectQuickPreviewModal
        item={project}
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
      />
    </>
  );
}
