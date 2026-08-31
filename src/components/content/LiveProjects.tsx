import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpLeft, ExternalLink, ChevronLeft, ChevronRight, Globe, Smartphone, Cpu, FlaskConical, Eye } from 'lucide-react'
import type { LiveProject, LiveProjectType } from '../../data/types'
import { liveProjectTypeLabels } from '../../data/types'
import { liveCategoryName } from '../../data/liveProjects'
import { cn } from '../../lib/utils'
import { ProjectQuickPreviewModal } from './ProjectQuickPreviewModal'
export { LiveProjectsShowcase } from './LiveProjectsShowcase'

/* ---- Live / offline status ---------------------------------------------- */
export function LiveStatus({ live }: { live: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium',
        live
          ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
          : 'border-border bg-secondary/60 text-muted-foreground',
      )}
    >
      <span className={cn('h-2 w-2 rounded-full', live ? 'bg-emerald-500 animate-pulse' : 'bg-muted-foreground/60')} aria-hidden />
      {live ? 'يعمل الآن' : 'مشروع سابق'}
    </span>
  )
}

/* ---- Project-type featured cards (spec §25) ----------------------------- */
const typeMeta: Record<LiveProjectType, { icon: typeof Globe; desc: string }> = {
  website: { icon: Globe, desc: 'منصات ومواقع ويب تفاعلية' },
  mobile: { icon: Smartphone, desc: 'تطبيقات جوال للمستخدم النهائي' },
  hardware: { icon: Cpu, desc: 'أنظمة إلكترونية ومدمجة' },
  research: { icon: FlaskConical, desc: 'أبحاث ودراسات علمية' },
}
const typeOrder: LiveProjectType[] = ['website', 'mobile', 'hardware', 'research']

export function ProjectTypeCards() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {typeOrder.map((t) => {
        const { icon: Icon, desc } = typeMeta[t]
        return (
          <div
            key={t}
            className="group rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:-translate-y-1"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
              <Icon className="h-5.5 w-5.5" />
            </span>
            <h3 className="mt-4 font-bold text-foreground">{liveProjectTypeLabels[t]}</h3>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{desc}</p>
          </div>
        )
      })}
    </div>
  )
}

/* ---- Live project card -------------------------------------------------- */
export function LiveProjectCard({ project, wide = false }: { project: LiveProject; wide?: boolean }) {
  const [showPreview, setShowPreview] = useState(false)

  const inner = (
    <>
      <div className={cn('relative overflow-hidden bg-muted', wide ? 'aspect-[16/10]' : 'aspect-[4/3]')}>
        <img
          src={project.image}
          alt={project.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3 z-10">
          <LiveStatus live={project.live} />
          <span className="rounded-full bg-background/85 px-2.5 py-1 font-mono text-[11px] text-primary backdrop-blur">
            {liveProjectTypeLabels[project.type]}
          </span>
        </div>

        {/* Quick Peek Button */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100 z-10">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setShowPreview(true)
            }}
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold text-slate-900 shadow-xl transition-transform hover:scale-105"
          >
            <Eye className="h-3.5 w-3.5 text-primary" />
            <span>معاينة سريعة</span>
          </button>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="mb-1.5 font-mono text-xs font-semibold text-primary">{liveCategoryName(project.category)}</span>
        <h3 className="text-lg font-bold leading-snug transition-colors group-hover:text-primary">{project.name}</h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
        <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-sm font-semibold text-primary">
          {project.live && project.url ? (
            <span className="flex items-center gap-1.5">
              انقر للمشاهدة
              <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          ) : (
            <span className="flex items-center gap-1.5">
              اقرأ المزيد
              <ArrowUpLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-0.5" />
            </span>
          )}
        </div>
      </div>
    </>
  )

  const cls =
    'group flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl'

  return (
    <>
      {project.live && project.url ? (
        <a href={project.url} target="_blank" rel="noreferrer" className={cls}>
          {inner}
        </a>
      ) : (
        <Link to={`/projects/${project.slug}`} className={cls}>
          {inner}
        </Link>
      )}

      <ProjectQuickPreviewModal
        item={project}
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
      />
    </>
  )
}

/* ---- "مشاريع تعمل الآن" carousel ---------------------------------------- */
export function LiveProjectsCarousel({ projects }: { projects: LiveProject[] }) {
  const scroller = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const scrollBy = (dir: 1 | -1) => {
    const el = scroller.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('[data-card]')
    const amount = (card?.offsetWidth ?? 320) + 24
    // In RTL, positive scrollLeft moves toward the start — invert direction.
    el.scrollBy({ left: dir * -amount, behavior: 'smooth' })
  }

  useEffect(() => {
    const el = scroller.current
    if (!el) return
    const onScroll = () => {
      const card = el.querySelector<HTMLElement>('[data-card]')
      const w = (card?.offsetWidth ?? 320) + 24
      setActive(Math.round(Math.abs(el.scrollLeft) / w))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="relative">
      <div className="mb-4 flex justify-end gap-2">
        <button
          onClick={() => scrollBy(-1)}
          aria-label="السابق"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card transition-colors hover:border-primary hover:text-primary"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <button
          onClick={() => scrollBy(1)}
          aria-label="التالي"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card transition-colors hover:border-primary hover:text-primary"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      </div>

      <div
        ref={scroller}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((p) => (
          <div
            key={p.id}
            data-card
            className="w-[86%] shrink-0 snap-start sm:w-[420px]"
          >
            <LiveProjectCard project={p} wide />
          </div>
        ))}
      </div>

      <div className="mt-2 flex justify-center gap-1.5">
        {projects.map((p, i) => (
          <span
            key={p.id}
            className={cn(
              'h-1.5 rounded-full transition-all',
              i === active ? 'w-6 bg-primary' : 'w-1.5 bg-border',
            )}
            aria-hidden
          />
        ))}
      </div>
    </div>
  )
}
