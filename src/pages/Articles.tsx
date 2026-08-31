import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BookOpen,
  Clock,
  Sparkles,
  SlidersHorizontal,
  ArrowUpDown,
  FileText,
  RotateCcw,
} from "lucide-react";
import { PageHeader, Container } from "../components/ui/primitives";
import { ArticleCard } from "../components/content/ArticleCard";
import { EmptyState } from "../components/ui/states";
import { ModernFilterTabs, type FilterTabItem } from "../components/ui/ModernFilterTabs";
import { ModernSearchBar } from "../components/ui/ModernSearchBar";
import { ActiveFilterPills, type ActiveFilterItem } from "../components/ui/ActiveFilterPills";
import { ViewToggle, type ViewMode } from "../components/ui/ViewToggle";
import { articles } from "../data/articles";
import { categories, categoryName } from "../data/categories";
import { cn, toArabicDigits } from "../lib/utils";
import { useSeo } from "../lib/seo";

type ReadTimeFilter = "all" | "quick" | "medium" | "deep";
type SortOption = "newest" | "oldest" | "longest" | "shortest" | "alpha";

export default function Articles() {
  useSeo(
    "المقالات التقنية والأدلة المعمارية",
    "شروحات تطبيقية، تحليلات معمارية، وتوصيفات هندسية تشرح الأفكار خلف مشاريعنا والتقنيات المستخدمة."
  );

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [readTimeFilter, setReadTimeFilter] = useState<ReadTimeFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    articles.forEach((a) => {
      counts[a.category] = (counts[a.category] || 0) + 1;
    });
    return counts;
  }, []);

  const filterTabs: FilterTabItem[] = useMemo(() => {
    const tabs: FilterTabItem[] = [
      { id: "all", label: "جميع المقالات", count: articles.length },
    ];

    categories.forEach((c) => {
      if (categoryCounts[c.slug]) {
        tabs.push({
          id: c.slug,
          label: c.name,
          count: categoryCounts[c.slug],
        });
      }
    });

    return tabs;
  }, [categoryCounts]);

  // Filter and sort articles
  const filteredArticles = useMemo(() => {
    let result = articles.filter((a) => {
      // Category filter
      if (activeCategory !== "all" && a.category !== activeCategory) {
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = a.title.toLowerCase().includes(q);
        const matchesExcerpt = a.excerpt.toLowerCase().includes(q);
        const matchesCat = categoryName(a.category).toLowerCase().includes(q);
        if (!matchesTitle && !matchesExcerpt && !matchesCat) return false;
      }

      // Read time filter
      if (readTimeFilter === "quick" && a.readingMinutes >= 5) return false;
      if (
        readTimeFilter === "medium" &&
        (a.readingMinutes < 5 || a.readingMinutes > 10)
      )
        return false;
      if (readTimeFilter === "deep" && a.readingMinutes <= 10) return false;

      return true;
    });

    // Sorting
    result = [...result].sort((a, b) => {
      if (sortBy === "oldest") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      if (sortBy === "longest") {
        return b.readingMinutes - a.readingMinutes;
      }
      if (sortBy === "shortest") {
        return a.readingMinutes - b.readingMinutes;
      }
      if (sortBy === "alpha") {
        return a.title.localeCompare(b.title, "ar");
      }
      // newest
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return result;
  }, [activeCategory, searchQuery, readTimeFilter, sortBy]);

  // Active filters list for chips
  const activeFilterList: ActiveFilterItem[] = useMemo(() => {
    const list: ActiveFilterItem[] = [];

    if (activeCategory !== "all") {
      list.push({
        id: "cat",
        label: "التصنيف",
        valueDisplay: categoryName(activeCategory),
        onRemove: () => setActiveCategory("all"),
      });
    }

    if (searchQuery.trim()) {
      list.push({
        id: "search",
        label: "البحث",
        valueDisplay: `«${searchQuery}»`,
        onRemove: () => setSearchQuery(""),
      });
    }

    if (readTimeFilter !== "all") {
      const labels: Record<ReadTimeFilter, string> = {
        all: "",
        quick: "سريعة (< 5 د)",
        medium: "متوسطة (5-10 د)",
        deep: "دسمة (> 10 د)",
      };
      list.push({
        id: "readTime",
        label: "وقت القراءة",
        valueDisplay: labels[readTimeFilter],
        onRemove: () => setReadTimeFilter("all"),
      });
    }

    return list;
  }, [activeCategory, searchQuery, readTimeFilter]);

  const handleClearAllFilters = () => {
    setActiveCategory("all");
    setSearchQuery("");
    setReadTimeFilter("all");
  };

  return (
    <>
      <PageHeader
        title="المقالات والأدلة التقنية"
        description="شروحات تطبيقية، تحليلات معمارية، وتوصيفات هندسية تشرح الأفكار خلف مشاريعنا والتقنيات المستخدمة."
      />

      <Container className="py-8 sm:py-12">
        {/* =========================================================================
            Modern Interactive Filter & Control Center
            ========================================================================= */}
        <div className="space-y-4 mb-8">
          {/* Top Row: Search & View Switcher */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <ModernSearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="ابحث في عناوين وشروحات المقالات..."
              className="flex-1"
            />

            <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
              {/* Sort Selector */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="h-11 rounded-2xl border border-border/80 bg-card px-3.5 pe-8 text-xs sm:text-sm font-semibold text-foreground shadow-2xs transition-colors hover:border-primary/50 focus:border-primary focus:outline-none cursor-pointer appearance-none"
                  aria-label="ترتيب المقالات"
                >
                  <option value="newest">الأحدث نشرًا</option>
                  <option value="longest">الأطول قراءة</option>
                  <option value="shortest">الأقصر قراءة</option>
                  <option value="alpha">أبجديًا (أ-ي)</option>
                  <option value="oldest">الأقدم نشرًا</option>
                </select>
                <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <ArrowUpDown className="h-3.5 w-3.5" />
                </div>
              </div>

              {/* View Toggle */}
              <ViewToggle mode={viewMode} onChange={setViewMode} />
            </div>
          </div>

          {/* Categories Sliding Filter Bar */}
          <div className="pt-1">
            <ModernFilterTabs
              tabs={filterTabs}
              activeId={activeCategory}
              onChange={setActiveCategory}
              size="md"
            />
          </div>

          {/* Sub-Filters: Reading Time Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-bold text-muted-foreground flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-primary" />
              <span>مدة القراءة:</span>
            </span>

            {[
              { id: "all", label: "الكل" },
              { id: "quick", label: "سريعة (< 5 د)" },
              { id: "medium", label: "متوسطة (5-10 د)" },
              { id: "deep", label: "موسعة (> 10 د)" },
            ].map((item) => {
              const isSelected = readTimeFilter === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setReadTimeFilter(item.id as ReadTimeFilter)}
                  className={cn(
                    "rounded-xl px-3 py-1 text-xs font-semibold transition-all duration-200 cursor-pointer select-none",
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-xs font-bold"
                      : "bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary border border-border/60"
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Active Filter Chips Strip */}
          {activeFilterList.length > 0 && (
            <ActiveFilterPills
              filters={activeFilterList}
              onClearAll={handleClearAllFilters}
              resultCount={filteredArticles.length}
              totalCount={articles.length}
              itemLabel="مقال"
            />
          )}
        </div>

        {/* =========================================================================
            Articles Grid / List with Motion Fluid Transitions
            ========================================================================= */}
        {filteredArticles.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border/80 bg-card/50 p-10 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-muted-foreground">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-base font-bold text-foreground">
              لم نعثر على مقالات تطابق خيارات البحث
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              جرب تغيير كلمات البحث أو إعادة ضبط الفلاتر للاطلاع على باقي المقالات.
            </p>
            <button
              onClick={handleClearAllFilters}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-xs hover:bg-primary/90 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>إعادة ضبط جميع الفلاتر</span>
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className={cn(
              "transition-all duration-300",
              viewMode === "grid"
                ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                : "flex flex-col gap-4 max-w-4xl mx-auto"
            )}
          >
            <AnimatePresence mode="popLayout">
              {filteredArticles.map((article) => (
                <motion.div
                  key={article.slug}
                  layout
                  initial={{ opacity: 0, y: 15, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <ArticleCard article={article} variant={viewMode} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </Container>
    </>
  );
}
