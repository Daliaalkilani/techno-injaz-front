import { useMemo, useState, useEffect } from 'react'
import { SlidersHorizontal, Video as VideoIcon, FileText } from 'lucide-react'
import { Container, PageHeader, Button, Section, Eyebrow } from '../components/ui/primitives'
import { SearchInput, Select, Label } from '../components/ui/fields'
import { ProjectCard } from '../components/content/ProjectCard'
import { LiveProjectsCarousel, ProjectTypeCards } from '../components/content/LiveProjects'
import { ProjectCardSkeleton, NoResultsState } from '../components/ui/states'
import { Drawer } from '../components/ui/overlay'
import { projects } from '../data/projects'
import { liveProjects, liveCategories } from '../data/liveProjects'
import { categories } from '../data/categories'
import { universities } from '../data/universities'
import { projectTypeLabels, type ProjectType } from '../data/types'
import { cn, toArabicDigits } from '../lib/utils'
import { useSeo } from '../lib/seo'

const types: ProjectType[] = ['graduation', 'semester', 'research', 'company']
const years = Array.from(new Set(projects.map((p) => p.year))).sort((a, b) => b - a)
type Sort = 'newest' | 'views' | 'alpha'

const emptyFilters = {
  query: '',
  categories: [] as string[],
  type: '' as '' | ProjectType,
  university: '',
  year: '',
  hasVideo: false,
  hasPdf: false,
}

function FilterControls({
  filters,
  set,
}: {
  filters: typeof emptyFilters
  set: (patch: Partial<typeof emptyFilters>) => void
}) {
  const toggleCategory = (slug: string) =>
    set({
      categories: filters.categories.includes(slug)
        ? filters.categories.filter((c) => c !== slug)
        : [...filters.categories, slug],
    })

  return (
    <div className="space-y-7">
      <div>
        <Label>المجال</Label>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c.slug}
              onClick={() => toggleCategory(c.slug)}
              className={cn(
                'rounded-full border px-3 py-1.5 text-sm transition-colors',
                filters.categories.includes(c.slug)
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border text-muted-foreground hover:border-primary/40',
              )}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label>نوع المشروع</Label>
        <div className="flex flex-wrap gap-2">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => set({ type: filters.type === t ? '' : t })}
              className={cn(
                'rounded-full border px-3 py-1.5 text-sm transition-colors',
                filters.type === t
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border text-muted-foreground hover:border-primary/40',
              )}
            >
              {projectTypeLabels[t]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="uni">الجامعة</Label>
          <Select id="uni" value={filters.university} onChange={(e) => set({ university: e.target.value })}>
            <option value="">الكل</option>
            {universities.map((u) => (
              <option key={u.slug} value={u.slug}>
                {u.name}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="year">السنة</Label>
          <Select id="year" value={filters.year} onChange={(e) => set({ year: e.target.value })}>
            <option value="">الكل</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {toArabicDigits(y)}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="space-y-3">
        <label className="flex cursor-pointer items-center gap-2.5 text-sm">
          <input
            type="checkbox"
            checked={filters.hasVideo}
            onChange={(e) => set({ hasVideo: e.target.checked })}
            className="h-4 w-4 accent-[var(--primary)]"
          />
          <VideoIcon className="h-4 w-4 text-muted-foreground" />
          يحتوي فيديو
        </label>
        <label className="flex cursor-pointer items-center gap-2.5 text-sm">
          <input
            type="checkbox"
            checked={filters.hasPdf}
            onChange={(e) => set({ hasPdf: e.target.checked })}
            className="h-4 w-4 accent-[var(--primary)]"
          />
          <FileText className="h-4 w-4 text-muted-foreground" />
          يحتوي تقرير
        </label>
      </div>
    </div>
  )
}

export default function Projects() {
  useSeo('المشاريع', 'استكشف مجموعة من المشاريع الهندسية والتقنية التي نفّذها مكتب تكنو إنجاز.')
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState(emptyFilters)
  const [sort, setSort] = useState<Sort>('newest')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [liveCat, setLiveCat] = useState('') // '' = جميع المشاريع

  const liveShown = useMemo(
    () => (liveCat ? liveProjects.filter((p) => p.category === liveCat) : liveProjects),
    [liveCat],
  )

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(t)
  }, [])

  const set = (patch: Partial<typeof emptyFilters>) => setFilters((f) => ({ ...f, ...patch }))
  const reset = () => setFilters(emptyFilters)

  const results = useMemo(() => {
    let list = projects.filter((p) => {
      if (filters.query && !`${p.title} ${p.shortDescription} ${p.technologies.join(' ')}`.includes(filters.query))
        return false
      if (filters.categories.length && !filters.categories.some((c) => p.categories.includes(c))) return false
      if (filters.type && p.type !== filters.type) return false
      if (filters.university && p.university !== filters.university) return false
      if (filters.year && p.year !== Number(filters.year)) return false
      if (filters.hasVideo && p.videos.length === 0) return false
      if (filters.hasPdf && !p.hasPdf) return false
      return true
    })
    list = [...list].sort((a, b) => {
      if (sort === 'views') return b.views - a.views
      if (sort === 'alpha') return a.title.localeCompare(b.title, 'ar')
      return b.year - a.year
    })
    return list
  }, [filters, sort])

  const activeCount =
    filters.categories.length +
    (filters.type ? 1 : 0) +
    (filters.university ? 1 : 0) +
    (filters.year ? 1 : 0) +
    (filters.hasVideo ? 1 : 0) +
    (filters.hasPdf ? 1 : 0)

  return (
    <>
      <PageHeader
        eyebrow="أعمالنا"
        title="مشاريعنا"
        description="استكشف مجموعة من المشاريع الهندسية والتقنية التي تم تنفيذها وتطويرها بمعايير دقيقة."
      />

      {/* ---- Live projects showcase ---- */}
      <Section className="pb-4 pt-12">
        <Container>
          <div className="mb-8 flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">مشاريع تعمل الآن</h2>
          </div>

          {/* Category filter (default: جميع المشاريع) */}
          <div className="mb-8 flex flex-wrap gap-2">
            <button
              onClick={() => setLiveCat('')}
              className={cn(
                'rounded-full border px-3.5 py-1.5 text-sm transition-colors',
                liveCat === '' ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:border-primary/40',
              )}
            >
              جميع المشاريع
            </button>
            {liveCategories.map((c) => (
              <button
                key={c.slug}
                onClick={() => setLiveCat(c.slug)}
                className={cn(
                  'rounded-full border px-3.5 py-1.5 text-sm transition-colors',
                  liveCat === c.slug ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:border-primary/40',
                )}
              >
                <span className="me-1">{c.emoji}</span>
                {c.name}
              </button>
            ))}
          </div>

          <LiveProjectsCarousel key={liveCat} projects={liveShown} />
        </Container>
      </Section>

      {/* ---- Project types ---- */}
      <Section className="py-8">
        <Container>
          <Eyebrow>أنواع المشاريع</Eyebrow>
          <h2 className="mb-8 mt-4 text-2xl font-bold tracking-tight sm:text-3xl">ماذا ننفّذ؟</h2>
          <ProjectTypeCards />
        </Container>
      </Section>

      {/* ---- Full catalog with filters ---- */}
      <Container className="border-t border-border pb-10 pt-12">
        <div className="mb-8">
          <Eyebrow>الأرشيف الكامل</Eyebrow>
          <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">المشاريع</h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            استكشف جميع المشاريع الحية والمشاريع السابقة، وصفّها حسب المجال والنوع والجامعة والسنة.
          </p>
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-3">
          <SearchInput
            value={filters.query}
            onChange={(v) => set({ query: v })}
            placeholder="ابحث عن مشروع..."
            className="flex-1 min-w-[220px]"
          />
          <Button variant="outline" onClick={() => setDrawerOpen(true)} className="lg:hidden">
            <SlidersHorizontal className="h-4 w-4" />
            الفلاتر
            {activeCount > 0 && <span className="font-mono text-xs text-primary">({toArabicDigits(activeCount)})</span>}
          </Button>
          <Select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="w-40">
            <option value="newest">الأحدث</option>
            <option value="views">الأكثر مشاهدة</option>
            <option value="alpha">أبجديًا</option>
          </Select>
        </div>

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-xl border border-border bg-card p-5">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="font-semibold">الفلاتر</h2>
                {activeCount > 0 && (
                  <button onClick={reset} className="text-sm text-primary hover:underline">
                    مسح الكل
                  </button>
                )}
              </div>
              <FilterControls filters={filters} set={set} />
            </div>
          </aside>

          <div>
            <div className="mb-5 text-sm text-muted-foreground">
              {toArabicDigits(results.length)} مشروع
            </div>
            {loading ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <ProjectCardSkeleton key={i} />
                ))}
              </div>
            ) : results.length === 0 ? (
              <NoResultsState onClear={reset} />
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {results.map((p) => (
                  <ProjectCard key={p.id} project={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} label="فلاتر المشاريع" side="bottom">
        <div className="p-6 pt-14">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold">الفلاتر</h2>
            {activeCount > 0 && (
              <button onClick={reset} className="text-sm text-primary hover:underline">
                مسح الكل
              </button>
            )}
          </div>
          <FilterControls filters={filters} set={set} />
          <Button className="mt-7 w-full" onClick={() => setDrawerOpen(false)}>
            عرض {toArabicDigits(results.length)} مشروع
          </Button>
        </div>
      </Drawer>
    </>
  )
}
