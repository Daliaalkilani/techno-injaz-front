import { useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Clock, ArrowUpLeft } from 'lucide-react'
import { Container, Section, Badge, LinkButton, Eyebrow } from '../components/ui/primitives'
import { Breadcrumbs } from '../components/ui/Breadcrumbs'
import { ShareArticle } from '../components/content/ShareArticle'
import { ReadingProgress } from '../components/content/ReadingProgress'
import { Comments } from '../components/content/Comments'
import { articleBySlug, articleCategories } from '../data/articles'
import { projectBySlug } from '../data/projects'
import { userById } from '../data/users'
import { categoryName } from '../data/categories'
import { formatArabicDate, toArabicDigits } from '../lib/utils'
import { useSeo } from '../lib/seo'
import NotFound from './NotFound'

function slugify(heading: string, i: number) {
  return `sec-${i}`
}

export default function ArticleDetails() {
  const { slug } = useParams()
  const article = slug ? articleBySlug(slug) : undefined
  useSeo(article?.title ?? 'مقال', article?.excerpt)

  const bodyRef = useRef<HTMLDivElement>(null)

  if (!article) return <NotFound />

  const project = article.projectSlug ? projectBySlug(article.projectSlug) : undefined
  const author = article.authorId ? userById(article.authorId) : undefined
  const cats = articleCategories(article)

  return (
    <>
      <ReadingProgress targetRef={bodyRef} />
      <Breadcrumbs
        items={[
          { label: 'الرئيسية', to: '/' },
          { label: 'المقالات', to: '/articles' },
          { label: article.title },
        ]}
      />

      <article>
        <Section className="pb-6 pt-10 sm:pt-14">
          <Container className="max-w-3xl">
            <div className="flex flex-wrap gap-2">
              {cats.map((c) => (
                <Link key={c} to={`/category/${c}`}>
                  <Badge className={c === article.category ? '' : 'bg-secondary text-secondary-foreground hover:bg-secondary/70'}>
                    {categoryName(c)}
                  </Badge>
                </Link>
              ))}
            </div>
            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">{article.title}</h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{article.excerpt}</p>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6 text-sm text-muted-foreground">
              <div className="flex flex-wrap items-center gap-4">
                {author && (
                  <span>
                    كتب بواسطة:{' '}
                    <Link to={`/profile/${author.id}`} className="font-medium text-foreground hover:text-primary">
                      {author.name}
                    </Link>
                  </span>
                )}
                <span>{formatArabicDate(article.date)}</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {toArabicDigits(article.readingMinutes)} دقائق قراءة
                </span>
              </div>
              <ShareArticle title={article.title} />
            </div>
          </Container>
        </Section>

        <Container className="max-w-3xl pb-4">
          <div className="overflow-hidden rounded-2xl border border-border bg-muted">
            <img src={article.coverImage} alt={article.title} className="aspect-[16/9] w-full object-cover" />
          </div>
        </Container>

        <Section className="pt-8">
          <Container className="max-w-5xl">
            <div ref={bodyRef} className="grid gap-12 lg:grid-cols-[1fr_220px]">
              <div className="max-w-2xl">
                {article.sections.map((s, i) => (
                  <section key={i} id={slugify(s.heading, i)} className="mb-9 scroll-mt-24">
                    <h2 className="text-2xl font-bold tracking-tight">{s.heading}</h2>
                    {s.body.map((p, j) => (
                      <p key={j} className="mt-4 text-lg leading-loose text-foreground/85">
                        {p}
                      </p>
                    ))}
                  </section>
                ))}
              </div>

              {/* Sticky table of contents (desktop) */}
              <aside className="hidden lg:block">
                <div className="sticky top-24">
                  <Eyebrow>محتويات المقال</Eyebrow>
                  <nav className="mt-4 space-y-2 border-r border-border pr-4">
                    {article.sections.map((s, i) => (
                      <a
                        key={i}
                        href={`#${slugify(s.heading, i)}`}
                        className="block text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {s.heading}
                      </a>
                    ))}
                  </nav>
                </div>
              </aside>
            </div>
          </Container>
        </Section>

        {project && (
          <Section className="py-8">
            <Container className="max-w-5xl">
              <div className="grid items-center gap-6 overflow-hidden rounded-2xl border border-border bg-card sm:grid-cols-[200px_1fr]">
                <img src={project.coverImage} alt={project.title} className="h-full w-full object-cover sm:aspect-square" />
                <div className="p-6">
                  <Eyebrow>المشروع المرتبط</Eyebrow>
                  <h3 className="mt-3 text-xl font-bold">{project.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{project.shortDescription}</p>
                  <div className="mt-5">
                    <LinkButton to={`/projects/${project.slug}`} variant="outline">
                      استكشف المشروع
                      <ArrowUpLeft className="h-4 w-4" />
                    </LinkButton>
                  </div>
                </div>
              </div>
            </Container>
          </Section>
        )}

        <Section className="pt-4">
          <Container className="max-w-3xl">
            <Comments targetId={`article:${article.slug}`} />
          </Container>
        </Section>
      </article>
    </>
  )
}
