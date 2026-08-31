import { Link } from "react-router-dom";
import { Phone, MapPin, MessageCircle } from "lucide-react";
import { InstagramIcon } from "../content/BrandIcons";
import { Container } from "../ui/primitives";
import { NewsletterInline } from "../content/Newsletter";
import { Logo } from "./Logo";
import { officeInfo } from "../../data/stats";
import { categories } from "../../data/categories";
import { toArabicDigits } from "../../lib/utils";

const siteLinks = [
  { to: "/projects", label: "المشاريع" },
  { to: "/articles", label: "المقالات" },
  { to: "/videos", label: "الفيديوهات" },
  { to: "/about", label: "من نحن" },
  { to: "/contact", label: "تواصل معنا" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/80 bg-card">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1 space-y-4">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              مكتب هندسي متكامل لتصميم وتنفيذ النماذج الأولية للشركات الناشئة (MVPs)، الأنظمة الصناعية وحلول الأتمتة، ومشاريع التخرج والبحث العلمي المتقدمة.
            </p>
            <div className="pt-2 max-w-xs">
              <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-foreground">النشرة البريدية</h4>
              <NewsletterInline />
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold text-foreground">روابط المنصة</h4>
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
            <h4 className="mb-4 text-sm font-bold text-foreground">المجالات الهندسية</h4>
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
            <h4 className="mb-4 text-sm font-bold text-foreground">المكتب والتواصل</h4>
            <ul className="space-y-3.5 text-sm text-muted-foreground">
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4.5 w-4.5 shrink-0 text-primary" />
                <span className="leading-relaxed">{officeInfo.address}</span>
              </li>
              <li>
                <a
                  href={`tel:${officeInfo.phone}`}
                  className="flex items-center gap-2.5 transition-colors hover:text-primary"
                >
                  <Phone className="h-4.5 w-4.5 shrink-0 text-primary" />
                  <span dir="ltr" className="font-mono">
                    {toArabicDigits(officeInfo.phone)}
                  </span>
                </a>
              </li>
              <li className="flex items-center gap-3 pt-1">
                <a
                  href={officeInfo.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="إنستغرام"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-secondary/50 text-foreground transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <InstagramIcon className="h-4.5 w-4.5" />
                </a>
                <a
                  href={`https://wa.me/${officeInfo.phoneIntl}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="واتساب"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-secondary/50 text-foreground transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <MessageCircle className="h-4.5 w-4.5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border/80 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {toArabicDigits(new Date().getFullYear())} تكنو إنجاز. جميع الحقوق محفوظة.
          </p>
          <p className="font-mono text-[11px] font-semibold text-muted-foreground">
            Techno Enjaz Engineering Hub
          </p>
        </div>
      </Container>
    </footer>
  );
}
