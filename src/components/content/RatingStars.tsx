import { useState } from 'react'
import { Star } from 'lucide-react'
import { cn, toArabicDigits } from '../../lib/utils'

/** Read-only star display with an optional numeric summary. */
export function RatingDisplay({
  value,
  count,
  size = 'md',
}: {
  value: number
  count?: number
  size?: 'sm' | 'md'
}) {
  const px = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'
  return (
    <div className="flex items-center gap-2">
      <div className="flex" aria-hidden>
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            className={cn(px, n <= Math.round(value) ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/40')}
          />
        ))}
      </div>
      {value > 0 && (
        <span className="font-mono text-sm font-medium">
          {toArabicDigits(value.toFixed(1))} / ٥
        </span>
      )}
      {typeof count === 'number' && (
        <span className="text-sm text-muted-foreground">({toArabicDigits(count)} تقييم)</span>
      )}
    </div>
  )
}

/** Interactive 1-5 star input. */
export function RatingInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0)
  const shown = hover || value
  return (
    <div className="flex items-center gap-1" role="radiogroup" aria-label="اختر تقييمًا من ١ إلى ٥">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          aria-label={`${n} من ٥`}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(n)}
          className="p-0.5 transition-transform hover:scale-110"
        >
          <Star className={cn('h-7 w-7', n <= shown ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/40')} />
        </button>
      ))}
    </div>
  )
}
