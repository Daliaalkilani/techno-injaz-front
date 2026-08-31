import { ArrowUpLeft } from 'lucide-react'
import { Container, Section, PageHeader, Eyebrow, LinkButton } from '../components/ui/primitives'
import { CategoryCard } from '../components/content/CategoryCard'
import { categories } from '../data/categories'
import { stats } from '../data/stats'
import { StatCard } from '../components/content/StatCard'
import { img, photos } from '../data/images'
import { toArabicDigits } from '../lib/utils'
import { useSeo } from '../lib/seo'

const process = [
  { n: '01', title: 'فهم الفكرة', desc: 'نستمع لفكرتك ونحدّد نطاقها بوضوح.' },
  { n: '02', title: 'تحليل المتطلبات', desc: 'نحدّد المتطلبات التقنية والوظيفية.' },
  { n: '03', title: 'التصميم', desc: 'نصمّم البنية والمخططات الأولية.' },
  { n: '04', title: 'التطوير', desc: 'ننفّذ المشروع مرحلة بمرحلة.' },
  { n: '05', title: 'الاختبار', desc: 'نختبر ونضبط الأداء والجودة.' },
  { n: '06', title: 'التوثيق', desc: 'نوثّق المشروع بتقرير متكامل.' },
  { n: '07', title: 'التسليم', desc: 'نسلّم المشروع جاهزًا مع الدعم.' },
]

export default function About() {
  useSeo('من نحن', 'تعرّف على مكتب تكنو إنجاز الهندسي ومنهجيته في تنفيذ المشاريع التقنية.')
  return (
    <>
      <PageHeader
        eyebrow="من نحن"
        title="نبني الجسر بين الفكرة الهندسية والتنفيذ"
        description="تكنو إنجاز مكتب هندسي وتقني متخصّص في تصميم وتنفيذ مشاريع التخرّج والمشاريع التقنية للطلاب والشركات."
      />

      {/* Intro + image */}
      <Section>
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Eyebrow>قصّتنا</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold tracking-tight">خبرة هندسية في خدمة الأفكار</h2>
              <p className="mt-4 leading-loose text-muted-foreground">
                نجمع بين المعرفة الأكاديمية والخبرة العملية لمساعدة الطلاب والشركات على تحويل أفكارهم إلى مشاريع تقنية واضحة وقابلة للتنفيذ، مع توثيق دقيق يرافق كل مرحلة.
              </p>
              <p className="mt-4 leading-loose text-muted-foreground">
                من الروبوتيك والذكاء الاصطناعي إلى الأنظمة المدمجة وإنترنت الأشياء، نرافق كل مشروع من الفكرة حتى التسليم.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src={img(photos.lab[0], 500, 620)} alt="فريق العمل" className="rounded-xl border border-border object-cover" />
              <img src={img(photos.robotics[2], 500, 620)} alt="مشروع روبوتيك" className="mt-8 rounded-xl border border-border object-cover" />
            </div>
          </div>
        </Container>
      </Section>

      {/* Vision */}
      <Section className="bg-secondary/30 py-14">
        <Container className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-8">
            <Eyebrow>رؤيتنا</Eyebrow>
            <p className="mt-4 text-lg leading-loose">
              أن نكون المرجع الأول للطلاب والشركات في تنفيذ المشاريع التقنية بجودة هندسية عالية وموثوقية تُبنى عليها الثقة.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8">
            <Eyebrow>ماذا نقدّم؟</Eyebrow>
            <ul className="mt-4 space-y-2.5 text-muted-foreground">
              {['تصميم وتنفيذ مشاريع التخرّج', 'تطوير الأنظمة المدمجة والروبوتيك', 'حلول الذكاء الاصطناعي ورؤية الحاسب', 'تطبيقات الويب والموبايل', 'التوثيق التقني الكامل'].map((s) => (
                <li key={s} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Stats */}
      <Section className="py-14">
        <Container>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((s) => (
              <StatCard key={s.label} stat={s} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Process */}
      <Section className="bg-secondary/30">
        <Container>
          <div className="mb-10">
            <Eyebrow>منهجية العمل</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold tracking-tight">من الفكرة إلى التسليم</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step) => (
              <div key={step.n} className="rounded-xl border border-border bg-card p-6">
                <div className="font-mono text-2xl font-bold text-primary">{toArabicDigits(step.n)}</div>
                <h3 className="mt-3 font-semibold">{step.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Domains */}
      <Section>
        <Container>
          <div className="mb-10">
            <Eyebrow>تخصّصاتنا</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold tracking-tight">المجالات التي نعمل بها</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c) => (
              <CategoryCard key={c.slug} category={c} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <LinkButton to="/contact" size="lg">
              ابدأ مشروعك معنا
              <ArrowUpLeft className="h-5 w-5" />
            </LinkButton>
          </div>
        </Container>
      </Section>
    </>
  )
}
