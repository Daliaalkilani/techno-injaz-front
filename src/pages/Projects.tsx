import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  SlidersHorizontal,
  Video as VideoIcon,
  FileText,
  ArrowUpDown,
  RotateCcw,
  Check,
  Building2,
  Calendar,
  Layers,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import {
  Container,
  PageHeader,
  Button,
  Section,
  Badge,
} from "../components/ui/primitives";
import { ProjectCard } from "../components/content/ProjectCard";
import {
  LiveProjectsShowcase,
  ProjectTypeCards,
} from "../components/content/LiveProjects";
import { ProjectCardSkeleton, NoResultsState } from "../components/ui/states";
import { Drawer } from "../components/ui/overlay";
import { ModernSearchBar } from "../components/ui/ModernSearchBar";
import { ModernFilterTabs, type FilterTabItem } from "../components/ui/ModernFilterTabs";
import { ActiveFilterPills, type ActiveFilterItem } from "../components/ui/ActiveFilterPills";
import { ViewToggle, type ViewMode } from "../components/ui/ViewToggle";
import { projects } from "../data/projects";
import { liveProjects } from "../data/liveProjects";
import { categories, categoryName } from "../data/categories";
import { universities, universityBySlug } from "../data/universities";
import { projectTypeLabels, type ProjectType } from "../data/types";
import { cn, toArabicDigits } from "../lib/utils";
import { useSeo } from "../lib/seo";

const projectTypes: ProjectType[] = [
  "graduation",
  "semester",
  "research",
  "company",
];
const years = Array.from(new Set(projects.map((p) => p.year))).sort(
  (a, b) => b - a
);
type Sort = "newest" | "views" | "alpha" | "oldest";

const emptyFilters = {
  query: "",
  categories: [] as string[],
  type: "" as "" | ProjectType,
  university: "",
  year: "",
  hasVideo: false,
  hasPdf: false,
};

function ModernFilterControls({
  filters,
  set,
  onReset,
}: {
  filters: typeof emptyFilters;
  set: (patch: Partial<typeof emptyFilters>) => void;
  onReset: () => void;
}) {
  const toggleCategory = (slug: string) =>
    set({
      categories: filters.categories.includes(slug)
        ? filters.categories.filter((c) => c !== slug)
        : [...filters.categories, slug],
    });

  // Calculate counts for categories
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    projects.forEach((p) => {
      p.categories.forEach((cat) => {
        counts[cat] = (counts[cat] || 0) + 1;
      });
    });
    return counts;
  }, []);

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <label className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 mb-2.5">
          <Layers className="h-3.5 w-3.5 text-primary" />
          <span>المجال الهندسي</span>
        </label>
        <div className="flex flex-wrap gap-1.5">
          {categories.map((c) => {
            const isSelected = filters.categories.includes(c.slug);
            const count = categoryCounts[c.slug] || 0;
            return (
              <button
                key={c.slug}
                type="button"
                onClick={() => toggleCategory(c.slug)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-xl px-2.5 py-1 text-xs font-semibold transition-all duration-150 cursor-pointer",
                  isSelected
                    ? "border border-primary bg-primary text-primary-foreground font-bold shadow-xs"
                    : "border border-border/80 bg-secondary/50 text-muted-foreground hover:border-primary/40 hover:text-foreground hover:bg-secondary"
                )}
              >
                <span>{c.name}</span>
                {count > 0 && (
                  <span
                    className={cn(
                      "font-mono text-[10px] px-1 rounded-md",
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-background text-muted-foreground"
                    )}
                  >
                    {toArabicDigits(count)}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Project Type */}
      <div>
        <label className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 mb-2.5">
          <GraduationCap className="h-3.5 w-3.5 text-primary" />
          <span>نوع المشروع</span>
        </label>
        <div className="flex flex-wrap gap-1.5">
          {projectTypes.map((t) => {
            const isSelected = filters.type === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => set({ type: filters.type === t ? "" : t })}
                className={cn(
                  "rounded-xl px-3 py-1.5 text-xs font-semibold transition-all duration-150 cursor-pointer",
                  isSelected
                    ? "border border-primary bg-primary/15 text-primary font-bold shadow-xs"
                    : "border border-border/80 bg-secondary/40 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                )}
              >
                {projectTypeLabels[t]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Year selection */}
      <div>
        <label className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 mb-2.5">
          <Calendar className="h-3.5 w-3.5 text-primary" />
          <span>سنة الإنجاز</span>
        </label>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => set({ year: "" })}
            className={cn(
              "rounded-xl px-2.5 py-1 text-xs font-semibold transition-all duration-150 cursor-pointer",
              filters.year === ""
                ? "bg-primary text-primary-foreground font-bold"
                : "border border-border/80 bg-secondary/40 text-muted-foreground hover:text-foreground"
            )}
          >
            الكل
          </button>
          {years.map((y) => (
            <button
              key={y}
              type="button"
              onClick={() => set({ year: filters.year === String(y) ? "" : String(y) })}
              className={cn(
                "rounded-xl px-2.5 py-1 text-xs font-semibold transition-all duration-150 cursor-pointer",
                filters.year === String(y)
                  ? "bg-primary text-primary-foreground font-bold"
                  : "border border-border/80 bg-secondary/40 text-muted-foreground hover:text-foreground"
              )}
            >
              {toArabicDigits(y)}
            </button>
          ))}
        </div>
      </div>

      {/* University */}
      <div>
        <label className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 mb-2">
          <Building2 className="h-3.5 w-3.5 text-primary" />
          <span>الجامعة أو الجهة</span>
        </label>
        <select
          value={filters.university}
          onChange={(e) => set({ university: e.target.value })}
          className="h-10 w-full rounded-xl border border-border/80 bg-background px-3 text-xs sm:text-sm text-foreground transition-colors hover:border-primary/50 focus:border-primary focus:outline-none cursor-pointer"
        >
          <option value="">جميع الجامعات والمراكز</option>
          {universities.map((u) => (
            <option key={u.slug} value={u.slug}>
              {u.name}
            </option>
          ))}
        </select>
      </div>

      {/* Features toggle */}
      <div className="pt-2 border-t border-border/60 space-y-2.5">
        <label className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground block mb-1">
          المحتوى المرفق
        </label>
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => set({ hasVideo: !filters.hasVideo })}
            className={cn(
              "flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-all cursor-pointer",
              filters.hasVideo
                ? "border border-primary/40 bg-primary/10 text-primary font-bold"
                : "border border-border/60 bg-secondary/30 text-muted-foreground hover:text-foreground"
            )}
          >
            <span className="flex items-center gap-2">
              <VideoIcon className="h-3.5 w-3.5" />
              <span>يحتوي فيديو توضيحي</span>
            </span>
            {filters.hasVideo && <Check className="h-3.5 w-3.5 text-primary" />}
          </button>

          <button
            type="button"
            onClick={() => set({ hasPdf: !filters.hasPdf })}
            className={cn(
              "flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-all cursor-pointer",
              filters.hasPdf
                ? "border border-primary/40 bg-primary/10 text-primary font-bold"
                : "border border-border/60 bg-secondary/30 text-muted-foreground hover:text-foreground"
            )}
          >
            <span className="flex items-center gap-2">
              <FileText className="h-3.5 w-3.5" />
              <span>يحتوي تقرير ومخططات</span>
            </span>
            {filters.hasPdf && <Check className="h-3.5 w-3.5 text-primary" />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  useSeo(
    "المشاريع والأنظمة الهندسية",
    "استكشف مجموعة من المشاريع الهندسية والتقنية التي نفّذها مكتب تكنو إنجاز."
  );
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(emptyFilters);
  const [sort, setSort] = useState<Sort>("newest");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(t);
  }, []);

  const set = (patch: Partial<typeof emptyFilters>) =>
    setFilters((f) => ({ ...f, ...patch }));
  const reset = () => setFilters(emptyFilters);

  // Filter and sort results
  const results = useMemo(() => {
    let list = projects.filter((p) => {
      if (
        filters.query &&
        !`${p.title} ${p.shortDescription} ${p.technologies.join(" ")}`
          .toLowerCase()
          .includes(filters.query.toLowerCase())
      )
        return false;
      if (
        filters.categories.length &&
        !filters.categories.some((c) => p.categories.includes(c))
      )
        return false;
      if (filters.type && p.type !== filters.type) return false;
      if (filters.university && p.university !== filters.university) return false;
      if (filters.year && p.year !== Number(filters.year)) return false;
      if (filters.hasVideo && p.videos.length === 0) return false;
      if (filters.hasPdf && !p.hasPdf) return false;
      return true;
    });

    list = [...list].sort((a, b) => {
      if (sort === "views") return b.views - a.views;
      if (sort === "alpha") return a.title.localeCompare(b.title, "ar");
      if (sort === "oldest") return a.year - b.year;
      return b.year - a.year;
    });
    return list;
  }, [filters, sort]);

  const activeCount =
    filters.categories.length +
    (filters.type ? 1 : 0) +
    (filters.university ? 1 : 0) +
    (filters.year ? 1 : 0) +
    (filters.hasVideo ? 1 : 0) +
    (filters.hasPdf ? 1 : 0) +
    (filters.query.trim() ? 1 : 0);

  // Active filter items for pills
  const activeFilterList: ActiveFilterItem[] = useMemo(() => {
    const items: ActiveFilterItem[] = [];

    if (filters.query.trim()) {
      items.push({
        id: "query",
        label: "البحث",
        valueDisplay: `«${filters.query}»`,
        onRemove: () => set({ query: "" }),
      });
    }

    filters.categories.forEach((catSlug) => {
      items.push({
        id: `cat-${catSlug}`,
        label: "المجال",
        valueDisplay: categoryName(catSlug),
        onRemove: () =>
          set({
            categories: filters.categories.filter((c) => c !== catSlug),
          }),
      });
    });

    if (filters.type) {
      items.push({
        id: "type",
        label: "النوع",
        valueDisplay: projectTypeLabels[filters.type],
        onRemove: () => set({ type: "" }),
      });
    }

    if (filters.university) {
      const u = universityBySlug(filters.university);
      items.push({
        id: "university",
        label: "الجهة",
        valueDisplay: u?.name || filters.university,
        onRemove: () => set({ university: "" }),
      });
    }

    if (filters.year) {
      items.push({
        id: "year",
        label: "السنة",
        valueDisplay: toArabicDigits(Number(filters.year)),
        onRemove: () => set({ year: "" }),
      });
    }

    if (filters.hasVideo) {
      items.push({
        id: "video",
        label: "المحتوى",
        valueDisplay: "فيديو توضيحي",
        onRemove: () => set({ hasVideo: false }),
      });
    }

    if (filters.hasPdf) {
      items.push({
        id: "pdf",
        label: "المحتوى",
        valueDisplay: "تقرير PDF",
        onRemove: () => set({ hasPdf: false }),
      });
    }

    return items;
  }, [filters]);

  return (
    <>
      <PageHeader
        title="معرض المشاريع والأنظمة الهندسية"
        description="استكشف مجموعة المشاريع الهندسية والتقنية المطورة في الروبوتيك، الذكاء الاصطناعي، إنترنت الأشياء، والمنصات السحابية."
      />

      {/* ---- Live projects showcase ---- */}
      <Section className="pb-8 pt-12">
        <Container>
          <div className="mb-6 flex items-center gap-2.5">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
            </span>
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              منصات ومشاريع حية تعمل الآن
            </h2>
          </div>

          <LiveProjectsShowcase projects={liveProjects} />
        </Container>
      </Section>

      {/* ---- Project types ---- */}
      <Section className="py-8">
        <Container>
          <div className="mb-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              أنواع وتصنيفات المشاريع
            </h2>
          </div>
          <ProjectTypeCards />
        </Container>
      </Section>

      {/* ---- Full catalog with modern filters ---- */}
      <Container className="border-t border-border/80 pb-12 pt-12">
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              جميع المشاريع والأنظمة
            </h2>
            <p className="mt-2 max-w-xl text-sm sm:text-base text-muted-foreground">
              تصفح وفلتر المشاريع حسب التخصص، نوع المشروع، الجامعة وسنة التنفيذ.
            </p>
          </div>
        </div>

        {/* Top Control Bar */}
        <div className="mb-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <ModernSearchBar
            value={filters.query}
            onChange={(v) => set({ query: v })}
            placeholder="ابحث عن مشروع، تقنية، أو متحكم..."
            className="flex-1"
          />

          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            {/* Mobile Filter Button */}
            <Button
              variant="outline"
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden rounded-2xl h-11 px-3.5"
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span>الفلاتر</span>
              {activeCount > 0 && (
                <span className="ms-1 inline-flex items-center justify-center rounded-full bg-primary px-1.5 py-0.2 font-mono text-[11px] font-bold text-primary-foreground">
                  {toArabicDigits(activeCount)}
                </span>
              )}
            </Button>

            {/* Sort Selector */}
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="h-11 rounded-2xl border border-border/80 bg-card px-3.5 pe-8 text-xs sm:text-sm font-semibold text-foreground shadow-2xs transition-colors hover:border-primary/50 focus:border-primary focus:outline-none cursor-pointer appearance-none"
                aria-label="ترتيب المشاريع"
              >
                <option value="newest">الأحدث سنةً</option>
                <option value="views">الأكثر تفاعلاً</option>
                <option value="alpha">أبجديًا (أ-ي)</option>
                <option value="oldest">الأقدم سنةً</option>
              </select>
              <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <ArrowUpDown className="h-3.5 w-3.5" />
              </div>
            </div>

            {/* View Mode Toggle */}
            <ViewToggle mode={viewMode} onChange={setViewMode} />
          </div>
        </div>

        {/* Active Filter Pills Bar */}
        {activeFilterList.length > 0 && (
          <div className="mb-6">
            <ActiveFilterPills
              filters={activeFilterList}
              onClearAll={reset}
              resultCount={results.length}
              totalCount={projects.length}
              itemLabel="مشروع"
            />
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-3xl border border-border/80 bg-card p-6 shadow-xs">
              <div className="mb-5 flex items-center justify-between border-b border-border/60 pb-3">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-primary" />
                  <h3 className="font-bold text-foreground text-sm">
                    تصفية متقدمة
                  </h3>
                </div>
                {activeCount > 0 && (
                  <button
                    type="button"
                    onClick={reset}
                    className="text-xs font-bold text-primary hover:underline cursor-pointer"
                  >
                    مسح الفلاتر
                  </button>
                )}
              </div>
              <ModernFilterControls
                filters={filters}
                set={set}
                onReset={reset}
              />
            </div>
          </aside>

          {/* Results Grid / List */}
          <div>
            {loading ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <ProjectCardSkeleton key={i} />
                ))}
              </div>
            ) : results.length === 0 ? (
              <NoResultsState onClear={reset} />
            ) : (
              <motion.div
                layout
                className={cn(
                  "transition-all duration-300",
                  viewMode === "grid"
                    ? "grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
                    : "flex flex-col gap-4"
                )}
              >
                <AnimatePresence mode="popLayout">
                  {results.map((p) => (
                    <motion.div
                      key={p.id}
                      layout
                      initial={{ opacity: 0, y: 15, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                      <ProjectCard project={p} variant={viewMode} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        label="فلاتر المشاريع"
        side="bottom"
      >
        <div className="p-6 pt-14">
          <div className="mb-5 flex items-center justify-between border-b border-border/60 pb-3">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-primary" />
              <h3 className="text-base font-bold">فلاتر المشاريع</h3>
            </div>
            {activeCount > 0 && (
              <button
                type="button"
                onClick={reset}
                className="text-xs font-bold text-primary hover:underline cursor-pointer"
              >
                مسح الكل
              </button>
            )}
          </div>
          <ModernFilterControls filters={filters} set={set} onReset={reset} />
          <Button
            className="mt-7 w-full rounded-2xl"
            onClick={() => setDrawerOpen(false)}
          >
            عرض {toArabicDigits(results.length)} مشروع
          </Button>
        </div>
      </Drawer>
    </>
  );
}
