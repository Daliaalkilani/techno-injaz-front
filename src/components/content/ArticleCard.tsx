import { Link } from 'react-router-dom'
import { Clock, ArrowUpLeft } from 'lucide-react'
import type { Article } from '../../data/types'
import { categoryName } from '../../data/categories'
import { Badge } from '../ui/primitives'
import { formatArabicDate, toArabicDigits } from '../../lib/utils'

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      to={`/articles/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={article.coverImage}
          alt={article.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute right-3 top-3">
          <Badge className="bg-background/85 backdrop-blur">{categoryName(article.category)}</Badge>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold leading-snug transition-colors group-hover:text-primary">{article.title}</h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">{article.excerpt}</p>
        <div className="mt-4 flex items-center gap-3 border-t border-border pt-4 text-xs text-muted-foreground">
          <span>{formatArabicDate(article.date)}</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {toArabicDigits(article.readingMinutes)} دقائق قراءة
          </span>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-sm font-medium text-primary">
          اقرأ المزيد
          <ArrowUpLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </Link>
  )
}
