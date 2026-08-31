import { Link } from 'react-router-dom'
import { FileText, BriefcaseBusiness, ArrowUpLeft } from 'lucide-react'
import { Container, Section, PageHeader } from '../components/ui/primitives'
import { SocialLinks } from '../components/content/SocialLinks'
import { topContributors } from '../data/users'
import { toArabicDigits } from '../lib/utils'
import { useSeo } from '../lib/seo'

export default function Contributors() {
  useSeo('أبرز المساهمين', 'تعرّف على المهندسين والباحثين الذين يثرون محتوى تكنو إنجاز بمقالاتهم ومساهماتهم التقنية.')
  const contributors = topContributors()

  return (
    <>
      <PageHeader
        eyebrow="مجتمع تكنو إنجاز"
        title="أبرز المساهمين"
        description="خلف كل مشروع ومقال أشخاص يشاركون خبرتهم بسخاء. هؤلاء هم الأكثر إسهامًا في محتوى المنصّة."
      />
      <Section>
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {contributors.map((c) => (
              <div
                key={c.id}
                className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={c.avatar}
                    alt={c.name}
                    className="h-16 w-16 shrink-0 rounded-full border border-border object-cover"
                  />
                  <div className="min-w-0">
                    <h3 className="truncate font-semibold leading-tight">{c.name}</h3>
                    <p className="mt-0.5 truncate text-sm text-primary">{c.specialty}</p>
                  </div>
                </div>

                <p className="mt-4 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">{c.bio}</p>

                <div className="mt-5 flex items-center gap-4 border-t border-border pt-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <FileText className="h-4 w-4" />
                    {toArabicDigits(c.articleCount)} مقالة
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <BriefcaseBusiness className="h-4 w-4" />
                    {toArabicDigits(c.contributionCount)} مساهمة
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <SocialLinks social={c.social} />
                  <Link
                    to={`/profile/${c.id}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:gap-1.5"
                  >
                    عرض الملف
                    <ArrowUpLeft className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
