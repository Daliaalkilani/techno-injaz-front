import { Heart } from 'lucide-react'
import { useFavorites } from '../../lib/hooks'
import { cn } from '../../lib/utils'

export function FavoriteButton({
  slug,
  variant = 'overlay',
  withLabel = false,
}: {
  slug: string
  variant?: 'overlay' | 'inline'
  withLabel?: boolean
}) {
  const { isFavorite, toggle } = useFavorites()
  const active = isFavorite(slug)

  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggle(slug)
      }}
      aria-pressed={active}
      aria-label={active ? 'إزالة من المحفوظات' : 'حفظ المشروع'}
      className={cn(
        'inline-flex items-center gap-2 transition-colors',
        variant === 'overlay'
          ? 'h-8 w-8 justify-center rounded-full bg-background/85 backdrop-blur hover:bg-background'
          : 'h-11 rounded-md border border-border px-4 text-sm font-medium hover:border-primary',
      )}
    >
      <Heart className={cn('h-4.5 w-4.5 transition-colors', active ? 'fill-destructive text-destructive' : 'text-foreground')} />
      {withLabel && <span>{active ? 'محفوظ' : 'حفظ المشروع'}</span>}
    </button>
  )
}
