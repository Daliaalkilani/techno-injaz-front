import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ArrowUpLeft } from 'lucide-react'
import { Container, Section, Eyebrow, LinkButton, Tag } from '../components/ui/primitives'
import { Breadcrumbs } from '../components/ui/Breadcrumbs'
import { CategoryIcon } from '../components/content/CategoryIcon'
import { ProjectCard } from '../components/content/ProjectCard'
import { ArticleCard } from '../components/content/ArticleCard'
import { VideoCard } from '../components/content/VideoCard'
import { VideoModal } from '../components/content/VideoModal'
import { categoryBySlug } from '../data/categories'
import { projectsByCategory } from '../data/projects'
import { articles } from '../data/articles'
import { videos } from '../data/videos'
import type { Video } from '../data/types'
import { toArabicDigits } from '../lib/utils'
import { useSeo } from '../lib/seo'
import NotFound from './NotFound'

export default function Category() {
  const { slug } = useParams()
  const category = slug ? categoryBySlug(slug) : undefined
  const [active, setActive] = useState<Video | null>(null)
  useSeo(category?.name ?? 'تصنيف', category?.description)

  if (!category) return <NotFound />

  const catProjects = projectsByCategory(category.slug)
  const catVideos = videos.filter((v) => v.category === category.slug)
  const catArticles = articles.filter((a) => a.category === category.slug)
  const techs = Array.from(new Set(catProjects.flatMap((p) => p.technologies)))

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'الرئيسية', to: '/' },
          { label: 'المشاريع', to: '/projects' },
          { label: category.name },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <img src={category.image} alt={category.name} className="absolute inset-0 h-full w-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-blueprint" />
        <Container className="relative py-16 sm:py-20">
          <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <CategoryIcon name={category.icon} className="h-7 w-7" />
          </span>
          <Eyebrow className="mt-6">{category.nameEn}</Eyebrow>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{category.name}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">{category.description}</p>
          <div className="mt-6 font-mono text-sm text-muted-foreground">
            <span className="text-primary">{toArabicDigits(catProjects.length)}</span> مشروع في هذا المجال
          </div>
        </Container>
      </section>

      {/* Projects */}
      <Section>
        <Container>
          <h2 className="mb-8 text-2xl font-bold tracking-tight sm:text-3xl">مشاريع {category.name}</h2>
          {catProjects.length === 0 ? (
            <p className="text-muted-foreground">لا توجد مشاريع في هذا التصنيف حاليًا.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {catProjects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          )}
        </Container>
      </Section>

      {/* Videos */}
      {catVideos.length > 0 && (
        <Section className="bg-secondary/30 py-14">
          <Container>
            <h2 className="mb-8 text-2xl font-bold tracking-tight sm:text-3xl">فيديوهات {category.name}</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {catVideos.map((v) => (
                <VideoCard key={v.id} video={v} onPlay={setActive} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Technologies */}
      {techs.length > 0 && (
        <Section className="py-14">
          <Container>
            <h2 className="mb-6 text-2xl font-bold tracking-tight sm:text-3xl">تقنيات مستخدمة</h2>
            <div className="flex flex-wrap gap-2">
              {techs.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Articles */}
      {catArticles.length > 0 && (
        <Section className="bg-secondary/30 py-14">
          <Container>
            <h2 className="mb-8 text-2xl font-bold tracking-tight sm:text-3xl">مقالات مرتبطة</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {catArticles.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* CTA */}
      <Section className="py-16">
        <Container>
          <div className="flex flex-col items-center gap-5 rounded-2xl border border-border bg-card px-8 py-12 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">مهتم بمشروع في مجال {category.name}؟</h2>
            <LinkButton to="/contact" size="lg">
              تواصل معنا
              <ArrowUpLeft className="h-5 w-5" />
            </LinkButton>
          </div>
        </Container>
      </Section>

      <VideoModal open={!!active} onClose={() => setActive(null)} youtubeId={active?.youtubeId ?? null} title={active?.title} />
    </>
  )
}
