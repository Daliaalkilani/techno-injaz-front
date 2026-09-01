import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search as SearchIcon, Sparkles, Filter } from "lucide-react";
import { Container, Section, Eyebrow } from "../components/ui/primitives";
import { ModernSearchBar } from "../components/ui/ModernSearchBar";
import { ModernFilterTabs, type FilterTabItem } from "../components/ui/ModernFilterTabs";
import { ProjectCard } from "../components/content/ProjectCard";
import { ArticleCard } from "../components/content/ArticleCard";
import { VideoCard } from "../components/content/VideoCard";
import { VideoModal } from "../components/content/VideoModal";
import { NoResultsState, EmptyState } from "../components/ui/states";
import { projects } from "../data/projects";
import { articles } from "../data/articles";
import { videos } from "../data/videos";
import { categoryName } from "../data/categories";
import type { Video } from "../data/types";
import { toArabicDigits } from "../lib/utils";
import { useSeo } from "../lib/seo";

const popularKeywords = [
  "ROS 2",
  "STM32",
  "ذكاء اصطناعي",
  "إنترنت الأشياء",
  "روبوت",
  "ESP32",
  "طاقة شمسية",
  "Computer Vision",
];

export default function Search() {
  useSeo("البحث الهندسي المتقدم", "ابحث في مشاريع ومقالات وفيديوهات تكنو إنجاز.");
  const [q, setQ] = useState("");
  const [tab, setTab] = useState("projects");
  const [active, setActive] = useState<Video | null>(null);
  const query = q.trim();

  const p = useMemo(
    () =>
      query
        ? projects.filter((x) =>
            `${x.title} ${x.shortDescription} ${x.technologies.join(" ")} ${categoryName(x.category)}`
              .toLowerCase()
              .includes(query.toLowerCase())
          )
        : [],
    [query]
  );
  const a = useMemo(
    () =>
      query
        ? articles.filter((x) =>
            `${x.title} ${x.excerpt} ${categoryName(x.category)}`
              .toLowerCase()
              .includes(query.toLowerCase())
          )
        : [],
    [query]
  );
  const v = useMemo(
    () =>
      query
        ? videos.filter((x) =>
            `${x.title} ${categoryName(x.category)}`
              .toLowerCase()
              .includes(query.toLowerCase())
          )
        : [],
    [query]
  );

  const total = p.length + a.length + v.length;

  const searchTabs: FilterTabItem[] = useMemo(() => {
    return [
      { id: "projects", label: "المشاريع والأنظمة", count: p.length },
      { id: "articles", label: "المقالات والأدلة", count: a.length },
      { id: "videos", label: "التجارب المرئية", count: v.length },
    ];
  }, [p.length, a.length, v.length]);

  return (
    <>
      <Section className="border-b border-border/80 bg-blueprint py-12 sm:py-16">
        <Container className="max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs font-bold text-primary mb-3">
            <SearchIcon className="h-3.5 w-3.5" />
            <span>محرك البحث الهندسي</span>
          </span>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            ابحث في منظومة تكنو إنجاز
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
            ابحث فورياً في أكثر من 40 مشروعاً هندسياً، مقالات تقنية، وفيديوهات اختبار ميدانية.
          </p>

          <div className="mt-6 max-w-xl mx-auto">
            <ModernSearchBar
              value={q}
              onChange={setQ}
              placeholder="ابحث عن مشروع، متحكم، تقنية، أو مقال..."
              autoFocus
            />
          </div>

          {/* Quick Keywords Chips */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5">
            <span className="text-[11px] font-bold text-muted-foreground me-1">
              شائع:
            </span>
            {popularKeywords.map((kw) => (
              <button
                key={kw}
                type="button"
                onClick={() => setQ(kw)}
                className="rounded-lg border border-border/70 bg-card/80 px-2 py-0.5 text-[11px] text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                {kw}
              </button>
            ))}
          </div>

          {query && (
            <p className="mt-4 text-xs font-semibold text-muted-foreground">
              {total > 0
                ? `تم العثور على ${toArabicDigits(total)} نتيجة بحث لـ «${query}»`
                : `لم يتم العثور على نتائج تطابق «${query}»`}
            </p>
          )}
        </Container>
      </Section>

      <Container className="py-10">
        {!query ? (
          <EmptyState
            title="ابدأ البحث الآن"
            message="اكتب كلمة مفتاحية للبحث الفوري في المشاريع والمقالات والتجارب المرئية."
          />
        ) : total === 0 ? (
          <NoResultsState onClear={() => setQ("")} />
        ) : (
          <>
            <div className="flex justify-center mb-8">
              <ModernFilterTabs
                tabs={searchTabs}
                activeId={tab}
                onChange={setTab}
                size="md"
              />
            </div>

            <div>
              {tab === "projects" && (
                <div>
                  {p.length > 0 ? (
                    <motion.div
                      layout
                      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                    >
                      <AnimatePresence mode="popLayout">
                        {p.map((x) => (
                          <motion.div
                            key={x.id}
                            layout
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ProjectCard project={x} />
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </motion.div>
                  ) : (
                    <NoResultsState onClear={() => setQ("")} />
                  )}
                </div>
              )}

              {tab === "articles" && (
                <div>
                  {a.length > 0 ? (
                    <motion.div
                      layout
                      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                    >
                      <AnimatePresence mode="popLayout">
                        {a.map((x) => (
                          <motion.div
                            key={x.slug}
                            layout
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ArticleCard article={x} />
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </motion.div>
                  ) : (
                    <NoResultsState onClear={() => setQ("")} />
                  )}
                </div>
              )}

              {tab === "videos" && (
                <div>
                  {v.length > 0 ? (
                    <motion.div
                      layout
                      className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
                    >
                      <AnimatePresence mode="popLayout">
                        {v.map((x) => (
                          <motion.div
                            key={x.id}
                            layout
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                          >
                            <VideoCard
                              video={x}
                              onPlay={setActive}
                            />
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </motion.div>
                  ) : (
                    <NoResultsState onClear={() => setQ("")} />
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </Container>

      <VideoModal
        open={!!active}
        onClose={() => setActive(null)}
        youtubeId={active?.youtubeId ?? null}
        title={active?.title}
      />
    </>
  );
}
