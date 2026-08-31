import { Link } from 'react-router-dom'
import { Trophy, TrendingUp, Users, Rocket, ArrowUpLeft } from 'lucide-react'
import { Container, Section, Eyebrow, Badge, LinkButton } from '../components/ui/primitives'
import { stats } from '../data/stats'
import { liveProjects } from '../data/liveProjects'
import { toArabicDigits, formatStat } from '../lib/utils'
import { useSeo } from '../lib/seo'

const REPORT_YEAR = 2025

// Milestones are illustrative content for the presentation page (replaceable by backend data).
const milestones = [
  { period: 'الربع الأول', title: 'إطلاق منصّات جديدة', body: 'تشغيل عدة منصّات ويب حية لعملاء ومشاريع تخرّج، من أنظمة ERP إلى أدوات المطوّرين.' },
  { period: 'الربع الثاني', title: 'توسّع مجالات الروبوتيك', body: 'مشاريع تخرّج في الملاحة الذاتية والتحكّم، مع مختبر Arduino للتجارب التطبيقية.' },
  { period: 'الربع الثالث', title: 'محتوى تقني موسّع', body: 'نشر سلسلة مقالات شارحة تغطّي الذكاء الاصطناعي وإنترنت الأشياء والأنظمة المدمجة.' },
  { period: 'الربع الرابع', title: 'مشاريع تجارية حيّة', body: 'إطلاق متاجر ومواقع تعريفية تعمل الآن على نطاقات حقيقية لعلامات تجارية متنوّعة.' },
]

const achievements = [
  { icon: Rocket, title: 'مشاريع تعمل الآن', desc: 'منصّات ومتاجر حيّة على الإنترنت يستخدمها أصحابها فعليًا.' },
  { icon: TrendingUp, title: 'تنوّع تقني', desc: 'من الذكاء الاصطناعي إلى الأنظمة المدمجة والتجارة الإلكترونية.' },
  { icon: Users, title: 'مجتمع مساهمين', desc: 'مهندسون وباحثون يثرون المحتوى بخبراتهم ومقالاتهم.' },
]

export default function AnnualReport() {
  useSeo('التقرير السنوي', 'نظرة على أبرز إنجازات ومحطّات تكنو إنجاز خلال العام.')
  const liveCount = liveProjects.filter((p) => p.live).length

  return (
    <>
      {/* Cover */}
      <div className="border-b border-border bg-blueprint">
        <Container className="py-20 text-center sm:py-28">
          <Badge className="mx-auto">التقرير السنوي</Badge>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            عام من الإنجاز التقني
          </h1>
          <p className="mt-4 font-mono text-lg text-primary">{toArabicDigits(REPORT_YEAR)}</p>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            جولة موجزة في أبرز محطّات تكنو إنجاز: المشاريع الحيّة، المحتوى التقني، والمجتمع الذي يقف خلفها.
          </p>
        </Container>
      </div>

      {/* Key stats */}
      <Section>
        <Container>
          <Eyebrow>بالأرقام</Eyebrow>
          <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">لمحة عامة</h2>
          <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-border bg-card p-6 text-center">
                <div className="font-mono text-3xl font-bold text-primary sm:text-4xl">{formatStat(s.value)}</div>
                <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Trophy className="h-5.5 w-5.5" />
            </span>
            <p className="text-sm leading-relaxed">
              <span className="font-semibold">{toArabicDigits(liveCount)} مشاريع تعمل الآن</span> على نطاقات حقيقية —
              منصّات ومتاجر ومواقع تعريفية يمكنك زيارتها مباشرة من{' '}
              <Link to="/projects" className="text-primary hover:underline">
                صفحة المشاريع
              </Link>
              .
            </p>
          </div>
        </Container>
      </Section>

      {/* Achievements */}
      <Section className="border-y border-border bg-secondary/30">
        <Container>
          <Eyebrow>أبرز الإنجازات</Eyebrow>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {achievements.map((a) => (
              <div key={a.title} className="rounded-2xl border border-border bg-card p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <a.icon className="h-5.5 w-5.5" />
                </span>
                <h3 className="mt-4 font-semibold">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Timeline */}
      <Section>
        <Container className="max-w-3xl">
          <Eyebrow>محطّات العام</Eyebrow>
          <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">الخط الزمني</h2>
          <ol className="mt-10 space-y-8 border-r-2 border-border pr-6">
            {milestones.map((m) => (
              <li key={m.period} className="relative">
                <span className="absolute -right-[31px] top-1 h-4 w-4 rounded-full border-2 border-primary bg-background" aria-hidden />
                <span className="font-mono text-xs text-primary">{m.period}</span>
                <h3 className="mt-1 text-lg font-semibold">{m.title}</h3>
                <p className="mt-1.5 leading-relaxed text-muted-foreground">{m.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-14 flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-blueprint p-8">
            <div className="flex-1">
              <h3 className="text-lg font-bold">هل لديك فكرة مشروع للعام القادم؟</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">لنحوّلها معًا إلى مشروع حقيقي يعمل على الإنترنت.</p>
            </div>
            <LinkButton to="/contact">
              تواصل معنا
              <ArrowUpLeft className="h-4 w-4" />
            </LinkButton>
          </div>
        </Container>
      </Section>
    </>
  )
}
