import { Link } from 'react-router-dom'
import { Phone, MapPin, MessageCircle } from 'lucide-react'
import { InstagramIcon } from '../content/BrandIcons'
import { Container } from '../ui/primitives'
import { NewsletterInline } from '../content/Newsletter'
import { Logo } from './Logo'
import { officeInfo } from '../../data/stats'
import { categories } from '../../data/categories'
import { toArabicDigits } from '../../lib/utils'

const siteLinks = [
  { to: '/projects', label: 'المشاريع' },
  { to: '/articles', label: 'المقالات' },
  { to: '/videos', label: 'الفيديوهات' },
  { to: '/about', label: 'من نحن' },
  { to: '/contact', label: 'تواصل معنا' },
]

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-card">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              مكتب هندسي وتقني متخصّص في تنفيذ وتطوير مشاريع التخرّج والمشاريع التقنية للطلاب والشركات.
            </p>
            <div className="mt-6 max-w-xs">
              <h4 className="mb-3 text-sm font-semibold">ابقَ على اطلاع</h4>
              <NewsletterInline />
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">الموقع</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {siteLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="transition-colors hover:text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">المجالات</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {categories.slice(0, 5).map((c) => (
                <li key={c.slug}>
                  <Link to={`/category/${c.slug}`} className="transition-colors hover:text-primary">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">تواصل معنا</h4>
            <ul className="space-y-3.5 text-sm text-muted-foreground">
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4.5 w-4.5 shrink-0 text-primary" />
                <span className="leading-relaxed">{officeInfo.address}</span>
              </li>
              <li>
                <a href={`tel:${officeInfo.phone}`} className="flex items-center gap-2.5 transition-colors hover:text-primary">
                  <Phone className="h-4.5 w-4.5 shrink-0 text-primary" />
                  <span dir="ltr" className="font-mono">
                    {toArabicDigits(officeInfo.phone)}
                  </span>
                </a>
              </li>
              <li className="flex items-center gap-4 pt-1">
                <a
                  href={officeInfo.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="إنستغرام"
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-border transition-colors hover:border-primary hover:text-primary"
                >
                  <InstagramIcon className="h-4.5 w-4.5" />
                </a>
                <a
                  href={`https://wa.me/${officeInfo.phoneIntl}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="واتساب"
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-border transition-colors hover:border-primary hover:text-primary"
                >
                  <MessageCircle className="h-4.5 w-4.5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {toArabicDigits(new Date().getFullYear())} تكنو إنجاز — جميع الحقوق محفوظة.
          </p>
          <p className="font-mono uppercase tracking-widest">Engineering Portfolio</p>
        </div>
      </Container>
    </footer>
  )
}
