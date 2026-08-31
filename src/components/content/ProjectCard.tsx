import { Link } from "react-router-dom";
import { ArrowUpLeft, GraduationCap } from "lucide-react";
import type { Project } from "../../data/types";
import { projectTypeLabels } from "../../data/types";
import { categoryName } from "../../data/categories";
import { universityBySlug } from "../../data/universities";
import { Badge, Tag } from "../ui/primitives";
import { toArabicDigits } from "../../lib/utils";
import { FavoriteButton } from "./FavoriteButton";

export function ProjectCard({ project }: { project: Project }) {
  const uni = universityBySlug(project.university);
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-border/80 bg-card transition-all duration-300 hover-lift hover:border-primary/40"
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary/6 via-transparent to-accent/10 opacity-90"
        aria-hidden
      />
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={project.coverImage}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-slate-900/10 to-transparent"
          aria-hidden
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          <Badge className="gap-1 bg-background/80 backdrop-blur-md">
            <GraduationCap className="h-3.5 w-3.5" />
            {projectTypeLabels[project.type]}
          </Badge>
          <FavoriteButton slug={project.slug} variant="overlay" />
        </div>
      </div>

      <div className="relative z-10 flex flex-1 flex-col p-5">
        <span className="mb-2 font-mono text-[11px] font-medium tracking-[0.12em] text-primary">
          {categoryName(project.category)}
        </span>
        <h3 className="text-xl font-bold leading-snug transition-colors group-hover:text-primary">
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {project.shortDescription}
        </p>

        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
          <span>{uni?.name}</span>
          <span aria-hidden>•</span>
          <span className="font-mono">{toArabicDigits(project.year)}</span>
        </div>

        <div className="mt-4 flex flex-wrap items-end gap-1.5">
          {project.technologies.slice(0, 3).map((t) => (
            <Tag
              key={t}
              className="rounded-full border-primary/10 bg-secondary/70"
            >
              {t}
            </Tag>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <span className="text-sm font-medium text-primary">اقرأ المزيد</span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-secondary/70 transition-all duration-300 group-hover:-translate-x-1 group-hover:-translate-y-0.5 group-hover:border-primary/40 group-hover:bg-primary/10">
            <ArrowUpLeft className="h-4 w-4 text-primary" />
          </span>
        </div>
      </div>
    </Link>
  );
}
