import { Link } from "react-router-dom";
import { ArrowUpLeft } from "lucide-react";
import type { Category } from "../../data/types";
import { countByCategory } from "../../data/projects";
import { CategoryIcon } from "./CategoryIcon";
import { toArabicDigits } from "../../lib/utils";

export function CategoryCard({ category }: { category: Category }) {
  const count = countByCategory(category.slug);
  return (
    <Link
      to={`/category/${category.slug}`}
      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[28px] border border-border/80 bg-card p-6 transition-all duration-300 hover-lift hover:border-primary/40"
    >
      <div
        className="absolute inset-x-4 top-0 h-24 rounded-b-full bg-gradient-to-r from-primary/10 via-accent/10 to-transparent blur-2xl"
        aria-hidden
      />
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-accent/10 text-primary shadow-inner shadow-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
            <CategoryIcon name={category.icon} className="h-6 w-6" />
          </span>
          <ArrowUpLeft className="h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:-translate-x-1 group-hover:-translate-y-0.5 group-hover:text-primary" />
        </div>
        <h3 className="mt-5 text-xl font-bold text-foreground">
          {category.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {category.description}
        </p>
      </div>
      <div className="relative z-10 mt-5 flex items-center justify-between border-t border-border pt-4">
        <div className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
          <span className="text-lg font-bold text-primary">
            {toArabicDigits(count)}
          </span>
          <span>مشروع</span>
        </div>
        <span className="rounded-full border border-border bg-secondary/60 px-2 py-1 text-[10px] font-medium text-primary">
          عرض
        </span>
      </div>
    </Link>
  );
}
