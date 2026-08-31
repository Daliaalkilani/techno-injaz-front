import { useEffect, useState, type RefObject } from 'react'
import { toArabicDigits } from '../../lib/utils'

/**
 * Elegant circular reading-progress ring. Tracks scroll position across the
 * referenced article body and fills from 0% to 100%. Fixed in a corner so it
 * never covers the text; appears only once reading has begun.
 */
export function ReadingProgress({ targetRef }: { targetRef: RefObject<HTMLElement | null> }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const compute = () => {
      const el = targetRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      const scrolled = -rect.top
      const p = total > 0 ? Math.min(Math.max(scrolled / total, 0), 1) : 0
      setProgress(p)
    }
    compute()
    window.addEventListener('scroll', compute, { passive: true })
    window.addEventListener('resize', compute)
    return () => {
      window.removeEventListener('scroll', compute)
      window.removeEventListener('resize', compute)
    }
  }, [targetRef])

  const r = 20
  const c = 2 * Math.PI * r
  const pct = Math.round(progress * 100)
  const visible = progress > 0.01 && progress < 0.995

  return (
    <div
      className={`fixed bottom-24 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full border border-border bg-card/90 shadow-lg backdrop-blur transition-all duration-300 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
      }`}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="تقدّم القراءة"
    >
      <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full -rotate-90">
        <circle cx="24" cy="24" r={r} className="fill-none stroke-secondary" strokeWidth="3" />
        <circle
          cx="24"
          cy="24"
          r={r}
          className="fill-none stroke-primary transition-[stroke-dashoffset] duration-150"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - progress)}
        />
      </svg>
      <span className="font-mono text-[11px] font-semibold text-foreground">{toArabicDigits(pct)}٪</span>
    </div>
  )
}
