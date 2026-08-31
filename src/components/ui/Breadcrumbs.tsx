import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { Container } from './primitives'

export interface Crumb {
  label: string
  to?: string
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="مسار التنقل" className="border-b border-border bg-secondary/30">
      <Container>
        <ol className="flex flex-wrap items-center gap-1 py-3 text-sm text-muted-foreground">
          {items.map((item, i) => {
            const last = i === items.length - 1
            return (
              <li key={i} className="flex items-center gap-1">
                {item.to && !last ? (
                  <Link to={item.to} className="transition-colors hover:text-primary">
                    {item.label}
                  </Link>
                ) : (
                  <span className={last ? 'font-medium text-foreground' : undefined} aria-current={last ? 'page' : undefined}>
                    {item.label}
                  </span>
                )}
                {!last && <ChevronLeft className="h-4 w-4 opacity-50" aria-hidden />}
              </li>
            )
          })}
        </ol>
      </Container>
    </nav>
  )
}
