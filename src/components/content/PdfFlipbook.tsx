import { forwardRef, useRef, useState, useCallback, useEffect } from 'react'
// react-pageflip has no bundled types; treat the default export loosely.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import HTMLFlipBookImport from 'react-pageflip'

const HTMLFlipBook = HTMLFlipBookImport as any
import { BookOpen, ChevronLeft, ChevronRight, FileText } from 'lucide-react'
import type { Project } from '../../data/types'
import { Modal } from '../ui/overlay'
import { Button } from '../ui/primitives'
import { toArabicDigits } from '../../lib/utils'

/**
 * A 3D page-flip viewer for the project report.
 *
 * The office reports are not exposed as downloadable PDFs; instead the report
 * content is rendered directly into flip pages (canvas-like styled pages).
 * To render a *real* PDF here, load its pages with `pdfjs-dist`, draw each to a
 * canvas / image, and map those images to <FlipPage> children in `buildPages`.
 * The download affordance is intentionally omitted (see spec §33) — this
 * discourages, but does not technically prevent, saving.
 */

interface PageContent {
  kind: 'cover' | 'content'
  eyebrow?: string
  heading?: string
  body?: string[]
  tags?: string[]
}

const FlipPage = forwardRef<HTMLDivElement, { children: React.ReactNode; number?: number }>(
  ({ children, number }, ref) => (
    <div ref={ref} className="relative h-full w-full overflow-hidden bg-[#fbfbf7] text-[#1a1a1a]">
      {/* subtle page grid + watermark */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            'linear-gradient(to left, rgba(14,116,144,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(14,116,144,0.04) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden
      />
      <span className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 select-none font-mono text-[10px] uppercase tracking-[0.3em] text-black/15">
        TECHNO ENJAZ
      </span>
      <div className="relative flex h-full flex-col p-7 sm:p-9">{children}</div>
      {number !== undefined && (
        <span className="absolute bottom-4 right-6 font-mono text-xs text-black/40">{toArabicDigits(number)}</span>
      )}
    </div>
  ),
)
FlipPage.displayName = 'FlipPage'

function buildPages(project: Project): PageContent[] {
  return [
    { kind: 'cover', eyebrow: 'التقرير الكامل للمشروع', heading: project.title },
    { kind: 'content', heading: 'مقدمة المشروع', body: [project.description] },
    { kind: 'content', heading: 'المشكلة', body: [project.problem] },
    { kind: 'content', heading: 'الحل المقترح', body: [project.solution] },
    { kind: 'content', heading: 'أهداف المشروع', body: [project.goal] },
    {
      kind: 'content',
      heading: 'التقنيات المستخدمة',
      body: ['اعتمد المشروع على مجموعة من التقنيات والأدوات الحديثة:'],
      tags: project.technologies,
    },
  ]
}

export function PdfFlipbook({ project }: { project: Project }) {
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(0)
  const bookRef = useRef<any>(null)
  const pages = buildPages(project)

  const flipNext = useCallback(() => bookRef.current?.pageFlip()?.flipNext(), [])
  const flipPrev = useCallback(() => bookRef.current?.pageFlip()?.flipPrev(), [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') flipNext()
      if (e.key === 'ArrowRight') flipPrev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, flipNext, flipPrev])

  return (
    <>
      <div className="flex flex-col items-start gap-4 rounded-xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <FileText className="h-6 w-6" />
          </span>
          <div>
            <h3 className="font-semibold">التقرير الكامل للمشروع</h3>
            <p className="text-sm text-muted-foreground">استعرض التقرير ككتاب تفاعلي بتقليب الصفحات.</p>
          </div>
        </div>
        <Button onClick={() => setOpen(true)} size="lg">
          <BookOpen className="h-5 w-5" />
          فتح التقرير
        </Button>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} label="عارض التقرير" fullscreen>
        <div
          className="flex h-full flex-col bg-neutral-900"
          onContextMenu={(e) => e.preventDefault()}
        >
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-white">
            <span className="ps-12 text-sm font-medium">{project.title}</span>
            <span className="font-mono text-sm text-white/70">
              {toArabicDigits(Math.min(page + 1, pages.length))} / {toArabicDigits(pages.length)}
            </span>
          </div>

          <div className="flex flex-1 items-center justify-center overflow-hidden p-3 sm:p-6">
            <HTMLFlipBook
              ref={bookRef}
              width={420}
              height={594}
              size="stretch"
              minWidth={280}
              maxWidth={560}
              minHeight={400}
              maxHeight={760}
              maxShadowOpacity={0.4}
              showCover
              mobileScrollSupport
              className="shadow-2xl"
              onFlip={(e: any) => setPage(e.data)}
            >
              {pages.map((p, i) =>
                p.kind === 'cover' ? (
                  <FlipPage key={i}>
                    <div className="flex h-full flex-col justify-between">
                      <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#0e7490]">Techno Enjaz</span>
                      <div>
                        <span className="font-mono text-xs text-black/50">{p.eyebrow}</span>
                        <h2 className="mt-3 text-2xl font-bold leading-tight sm:text-3xl">{p.heading}</h2>
                        <div className="mt-5 h-1 w-16 bg-[#0e7490]" />
                      </div>
                      <div className="font-mono text-xs text-black/45">
                        تقرير مشروع ({toArabicDigits(project.year)})
                      </div>
                    </div>
                  </FlipPage>
                ) : (
                  <FlipPage key={i} number={i}>
                    <h3 className="text-xl font-bold text-[#0e7490]">{p.heading}</h3>
                    <div className="mt-4 space-y-3 text-[15px] leading-loose text-black/80">
                      {p.body?.map((para, j) => <p key={j}>{para}</p>)}
                    </div>
                    {p.tags && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {p.tags.map((t) => (
                          <span key={t} className="rounded-md border border-[#0e7490]/30 bg-[#0e7490]/8 px-2.5 py-1 font-mono text-xs text-[#0e7490]">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </FlipPage>
                ),
              )}
            </HTMLFlipBook>
          </div>

          <div className="flex items-center justify-center gap-4 border-t border-white/10 py-3">
            <button
              onClick={flipPrev}
              aria-label="الصفحة السابقة"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <button
              onClick={flipNext}
              aria-label="الصفحة التالية"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}
