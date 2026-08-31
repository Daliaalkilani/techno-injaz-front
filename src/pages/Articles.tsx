import { useMemo, useState } from 'react'
import { PageHeader, Container } from '../components/ui/primitives'
import { ArticleCard } from '../components/content/ArticleCard'
import { EmptyState } from '../components/ui/states'
import { articles } from '../data/articles'
import { categories } from '../data/categories'
import { cn } from '../lib/utils'
import { useSeo } from '../lib/seo'

export default function Articles() {
  useSeo('المقالات التقنية', 'مقالات وشروحات تقنية حول الروبوتيك والذكاء الاصطناعي وإنترنت الأشياء والأنظمة المدمجة.')
  const [active, setActive] = useState<string>('all')

  const used = useMemo(() => new Set(articles.map((a) => a.category)), [])
  const filtered = active === 'all' ? articles : articles.filter((a) => a.category === active)

  return (
    <>
      <PageHeader
        eyebrow="المدوّنة"
        title="المقالات التقنية"
        description="شروحات وتوصيفات تقنية تشرح الأفكار خلف مشاريعنا والتقنيات التي نستخدمها."
      />
      <Container className="py-10">
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setActive('all')}
            className={cn(
              'rounded-full border px-4 py-1.5 text-sm transition-colors',
              active === 'all' ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:border-primary/40',
            )}
          >
            الكل
          </button>
          {categories
            .filter((c) => used.has(c.slug))
            .map((c) => (
              <button
                key={c.slug}
                onClick={() => setActive(c.slug)}
                className={cn(
                  'rounded-full border px-4 py-1.5 text-sm transition-colors',
                  active === c.slug ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:border-primary/40',
                )}
              >
                {c.name}
              </button>
            ))}
        </div>

        {filtered.length === 0 ? (
          <EmptyState title="لا توجد مقالات" message="لا توجد مقالات في هذا التصنيف حاليًا." />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        )}
      </Container>
    </>
  )
}
