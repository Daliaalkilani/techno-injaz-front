import { useMemo, useState } from 'react'
import { Container, Section, Eyebrow } from '../components/ui/primitives'
import { SearchInput } from '../components/ui/fields'
import { Tabs } from '../components/ui/overlay'
import { ProjectCard } from '../components/content/ProjectCard'
import { ArticleCard } from '../components/content/ArticleCard'
import { VideoCard } from '../components/content/VideoCard'
import { VideoModal } from '../components/content/VideoModal'
import { NoResultsState, EmptyState } from '../components/ui/states'
import { projects } from '../data/projects'
import { articles } from '../data/articles'
import { videos } from '../data/videos'
import { categoryName } from '../data/categories'
import type { Video } from '../data/types'
import { useSeo } from '../lib/seo'

export default function Search() {
  useSeo('البحث', 'ابحث في مشاريع ومقالات وفيديوهات تكنو إنجاز.')
  const [q, setQ] = useState('')
  const [tab, setTab] = useState('projects')
  const [active, setActive] = useState<Video | null>(null)
  const query = q.trim()

  const p = useMemo(
    () =>
      query
        ? projects.filter((x) => `${x.title} ${x.shortDescription} ${x.technologies.join(' ')} ${categoryName(x.category)}`.includes(query))
        : [],
    [query],
  )
  const a = useMemo(() => (query ? articles.filter((x) => `${x.title} ${x.excerpt}`.includes(query)) : []), [query])
  const v = useMemo(() => (query ? videos.filter((x) => x.title.includes(query)) : []), [query])

  const total = p.length + a.length + v.length

  return (
    <>
      <Section className="border-b border-border bg-blueprint py-14 sm:py-16">
        <Container className="max-w-2xl text-center">
          <Eyebrow className="justify-center">البحث المتقدّم</Eyebrow>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">ابحث في مشاريع تكنو إنجاز</h1>
          <div className="mt-8">
            <SearchInput value={q} onChange={setQ} placeholder="ابحث عن مشروع، مقال، أو تقنية..." autoFocus />
          </div>
          {query && (
            <p className="mt-4 text-sm text-muted-foreground">
              {total > 0 ? `${total} نتيجة لـ «${query}»` : `لا نتائج لـ «${query}»`}
            </p>
          )}
        </Container>
      </Section>

      <Container className="py-10">
        {!query ? (
          <EmptyState title="ابدأ البحث" message="اكتب كلمة للبحث في المشاريع والمقالات والفيديوهات." />
        ) : total === 0 ? (
          <NoResultsState />
        ) : (
          <>
            <Tabs
              active={tab}
              onChange={setTab}
              tabs={[
                { id: 'projects', label: 'المشاريع', count: p.length },
                { id: 'articles', label: 'المقالات', count: a.length },
                { id: 'videos', label: 'الفيديوهات', count: v.length },
              ]}
            />
            <div className="mt-8">
              {tab === 'projects' &&
                (p.length ? (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {p.map((x) => (
                      <ProjectCard key={x.id} project={x} />
                    ))}
                  </div>
                ) : (
                  <NoResultsState />
                ))}
              {tab === 'articles' &&
                (a.length ? (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {a.map((x) => (
                      <ArticleCard key={x.slug} article={x} />
                    ))}
                  </div>
                ) : (
                  <NoResultsState />
                ))}
              {tab === 'videos' &&
                (v.length ? (
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {v.map((x) => (
                      <VideoCard key={x.id} video={x} onPlay={setActive} />
                    ))}
                  </div>
                ) : (
                  <NoResultsState />
                ))}
            </div>
          </>
        )}
      </Container>

      <VideoModal open={!!active} onClose={() => setActive(null)} youtubeId={active?.youtubeId ?? null} title={active?.title} />
    </>
  )
}
