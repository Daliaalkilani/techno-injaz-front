import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Eye, Maximize2, ArrowUpLeft, Cpu, Wrench, Code2 } from 'lucide-react'
import { Container, Section, LinkButton, Tag, Badge, Eyebrow } from '../components/ui/primitives'
import { Breadcrumbs } from '../components/ui/Breadcrumbs'
import { ShareButtons } from '../components/content/ShareButtons'
import { FavoriteButton } from '../components/content/FavoriteButton'
import { Gallery } from '../components/content/Gallery'
import { VideoModal } from '../components/content/VideoModal'
import { PdfFlipbook } from '../components/content/PdfFlipbook'
import { ProjectCard } from '../components/content/ProjectCard'
import { Comments } from '../components/content/Comments'
import { projectBySlug, relatedProjects } from '../data/projects'
import { categoryName } from '../data/categories'
import { universityBySlug } from '../data/universities'
import { projectTypeLabels } from '../data/types'
import { toArabicDigits } from '../lib/utils'
import { useSeo } from '../lib/seo'
import NotFound from './NotFound'

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-card px-4 py-3">
      <div className="font-mono text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-1 font-medium">{value}</div>
    </div>
  )
}

function SpecList({ icon, title, items }: { icon: React.ReactNode; title: string; items: string[] }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-4 flex items-center gap-2.5 text-primary">
        {icon}
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>
      <ul className="space-y-2.5">
        {items.map((it) => (
          <li key={it} className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
            {it}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function ProjectDetails() {
  const { id } = useParams()
  const project = id ? projectBySlug(id) : undefined
  const [activeVideo, setActiveVideo] = useState<string | null>(null)
  const [archOpen, setArchOpen] = useState(false)

  useSeo(project?.title ?? 'مشروع', project?.shortDescription)

  if (!project) return <NotFound />

  const uni = universityBySlug(project.university)
  const related = relatedProjects(project)
  const isRobotics = project.categories.includes('robotics')

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'الرئيسية', to: '/' },
          { label: 'المشاريع', to: '/projects' },
          { label: project.title },
        ]}
      />

      {/* ---- Hero ---- */}
      <Section className="pb-10 pt-10 sm:pt-14">
        <Container>
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{projectTypeLabels[project.type]}</Badge>
            <Link to={`/category/${project.category}`}>
              <Badge className="bg-secondary text-secondary-foreground hover:bg-secondary/70">
                {categoryName(project.category)}
              </Badge>
            </Link>
          </div>
          <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">{project.shortDescription}</p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <span>{uni?.name}</span>
            <span className="font-mono">{toArabicDigits(project.year)}</span>
            <span className="flex items-center gap-1.5">
              <Eye className="h-4 w-4" />
              {toArabicDigits(project.views)} مشاهدة
            </span>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <FavoriteButton slug={project.slug} variant="inline" withLabel />
            <ShareButtons title={project.title} />
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-muted">
            <img src={project.coverImage} alt={project.title} className="aspect-[16/9] w-full object-cover" />
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---- Overview ---- */}
      <Section className="py-4">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
            <div>
              <Eyebrow>عن المشروع</Eyebrow>
              <p className="mt-4 text-lg leading-loose text-foreground/90">{project.description}</p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-border bg-secondary/30 p-5">
                  <h3 className="font-semibold text-primary">المشكلة</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.problem}</p>
                </div>
                <div className="rounded-xl border border-border bg-secondary/30 p-5">
                  <h3 className="font-semibold text-primary">الحل</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.solution}</p>
                </div>
                <div className="rounded-xl border border-border bg-secondary/30 p-5">
                  <h3 className="font-semibold text-primary">الهدف</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.goal}</p>
                </div>
              </div>
            </div>

            <aside className="space-y-3">
              <InfoPill label="الجامعة" value={uni?.name ?? '—'} />
              <InfoPill label="السنة" value={toArabicDigits(project.year)} />
              <InfoPill label="الفريق" value={project.students.join('، ')} />
              <InfoPill label="الإشراف" value={project.supervisors.join('، ')} />
            </aside>
          </div>
        </Container>
      </Section>

      {/* ---- Technical spec ---- */}
      <Section className="py-8">
        <Container>
          <Eyebrow>المواصفات التقنية</Eyebrow>
          <h2 className="mt-4 mb-8 text-2xl font-bold tracking-tight sm:text-3xl">التقنيات والأدوات</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <SpecList icon={<Code2 className="h-5 w-5" />} title="التقنيات" items={project.technologies} />
            {project.hardware && <SpecList icon={<Cpu className="h-5 w-5" />} title="العتاد" items={project.hardware} />}
            {project.software && <SpecList icon={<Wrench className="h-5 w-5" />} title="البرمجيات" items={project.software} />}
          </div>
        </Container>
      </Section>

      {/* ---- Architecture ---- */}
      {project.architectureImage && (
        <Section className="py-8">
          <Container>
            <Eyebrow>البنية</Eyebrow>
            <h2 className="mt-4 mb-6 text-2xl font-bold tracking-tight sm:text-3xl">بنية النظام</h2>
            <button
              onClick={() => setArchOpen(true)}
              className="group relative w-full overflow-hidden rounded-xl border border-border bg-muted"
            >
              <img src={project.architectureImage} alt="بنية النظام" className="w-full object-cover" />
              <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-md bg-background/85 px-3 py-1.5 text-sm backdrop-blur">
                <Maximize2 className="h-4 w-4" />
                عرض بملء الشاشة
              </span>
            </button>
          </Container>
        </Section>
      )}

      {/* ---- Video ---- */}
      {project.videos.length > 0 && (
        <Section className="py-8">
          <Container>
            <Eyebrow>{isRobotics ? 'شاهد الروبوت أثناء العمل' : 'شاهد المشروع أثناء العمل'}</Eyebrow>
            <h2 className="mt-4 mb-6 text-2xl font-bold tracking-tight sm:text-3xl">{project.videos[0].title}</h2>
            <button
              onClick={() => setActiveVideo(project.videos[0].youtubeId)}
              className="group relative block w-full overflow-hidden rounded-2xl border border-border bg-muted"
            >
              <img src={project.coverImage} alt={project.videos[0].title} className="aspect-video w-full object-cover" />
              <span className="absolute inset-0 flex items-center justify-center bg-black/35 transition-colors group-hover:bg-black/50">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl">
                  <svg viewBox="0 0 24 24" className="h-7 w-7 translate-x-0.5 fill-current">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </span>
            </button>
            {project.videos[0].description && (
              <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">{project.videos[0].description}</p>
            )}
          </Container>
        </Section>
      )}

      {/* ---- Gallery ---- */}
      {project.images.length > 0 && (
        <Section className="py-8">
          <Container>
            <Eyebrow>معرض المشروع</Eyebrow>
            <h2 className="mt-4 mb-6 text-2xl font-bold tracking-tight sm:text-3xl">صور من المشروع</h2>
            <Gallery images={project.images} title={project.title} />
          </Container>
        </Section>
      )}

      {/* ---- Article link ---- */}
      {project.articleSlug && (
        <Section className="py-8">
          <Container>
            <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-border bg-secondary/30 p-6 sm:flex-row sm:items-center">
              <div>
                <h3 className="text-lg font-semibold">شرح المشروع</h3>
                <p className="mt-1 text-sm text-muted-foreground">اقرأ الشرح التقني الكامل لطريقة عمل المشروع.</p>
              </div>
              <LinkButton to={`/articles/${project.articleSlug}`} variant="outline">
                اقرأ الشرح الكامل
                <ArrowUpLeft className="h-4 w-4" />
              </LinkButton>
            </div>
          </Container>
        </Section>
      )}

      {/* ---- PDF flipbook ---- */}
      {project.hasPdf && (
        <Section className="py-8">
          <Container>
            <PdfFlipbook project={project} />
          </Container>
        </Section>
      )}

      {/* ---- Related ---- */}
      {related.length > 0 && (
        <Section className="bg-secondary/30">
          <Container>
            <Eyebrow>اكتشف المزيد</Eyebrow>
            <h2 className="mt-4 mb-8 text-2xl font-bold tracking-tight sm:text-3xl">مشاريع قد تهمّك</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* ---- Comments & rating ---- */}
      <Section className="py-8">
        <Container className="max-w-3xl">
          <Comments targetId={`project:${project.slug}`} />
        </Container>
      </Section>

      {/* ---- Final CTA ---- */}
      <Section className="py-16">
        <Container>
          <div className="flex flex-col items-center gap-5 rounded-2xl border border-border bg-card px-8 py-12 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">هل تبحث عن مشروع مشابه؟</h2>
            <p className="max-w-lg text-muted-foreground">تواصل معنا لنساعدك في تصميم وتنفيذ مشروعك التقني من الفكرة حتى التسليم.</p>
            <LinkButton to="/contact" size="lg">
              تواصل معنا
              <ArrowUpLeft className="h-5 w-5" />
            </LinkButton>
          </div>
        </Container>
      </Section>

      <VideoModal open={!!activeVideo} onClose={() => setActiveVideo(null)} youtubeId={activeVideo} title={project.videos[0]?.title} />

      {archOpen && project.architectureImage && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/95 p-4"
          onClick={() => setArchOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="بنية النظام"
        >
          <img src={project.architectureImage} alt="بنية النظام" className="max-h-full max-w-full rounded-lg object-contain" />
        </div>
      )}
    </>
  )
}
