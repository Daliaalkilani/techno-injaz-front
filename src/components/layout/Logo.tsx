import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'

/**
 * TECHNO ENJAZ mark — a hexagonal "engineering node" enclosing a stylized
 * circuit/arrow motion, paired with the Arabic + Latin wordmark.
 */
export function Logo({ className, showText = true }: { className?: string; showText?: boolean }) {
  return (
    <Link to="/" className={cn('group flex items-center gap-2.5', className)} aria-label="تكنو إنجاز — الصفحة الرئيسية">
      <svg viewBox="0 0 40 40" className="h-9 w-9 shrink-0" role="img" aria-hidden>
        <path
          d="M20 2.5 34.5 11v18L20 37.5 5.5 29V11L20 2.5Z"
          className="fill-none stroke-primary"
          strokeWidth="2"
        />
        <path
          d="M13 25.5 19 14l5 7 3-5"
          className="fill-none stroke-primary transition-transform duration-300 group-hover:translate-x-[-1px]"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="19" cy="14" r="2" className="fill-primary" />
      </svg>
      {showText && (
        <span className="flex flex-col leading-none">
          <span className="text-lg font-bold tracking-tight">تكنو إنجاز</span>
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Techno Enjaz
          </span>
        </span>
      )}
    </Link>
  )
}
