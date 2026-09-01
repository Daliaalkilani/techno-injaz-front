import { useState, type FormEvent } from "react";
import {
  MapPin,
  Phone,
  MessageCircle,
  CheckCircle2,
  ExternalLink,
  Send,
} from "lucide-react";
import { InstagramIcon } from "../components/content/BrandIcons";
import {
  Container,
  Section,
  PageHeader,
  Button,
} from "../components/ui/primitives";
import { Input, Textarea, Select, Label } from "../components/ui/fields";
import { officeInfo } from "../data/stats";
import { universities } from "../data/universities";
import { projectTypeLabels, type ProjectType } from "../data/types";
import { toArabicDigits } from "../lib/utils";
import { useSeo } from "../lib/seo";

interface FormState {
  name: string;
  phone: string;
  university: string;
  major: string;
  projectType: string;
  message: string;
}

const initial: FormState = {
  name: "",
  phone: "",
  university: "",
  major: "",
  projectType: "",
  message: "",
};
const types = Object.keys(projectTypeLabels) as ProjectType[];

export default function Contact() {
  useSeo(
    "تواصل معنا | مكتب تكنو إنجاز للحلول الهندسية",
    "تواصل مع مكتب تكنو إنجاز الهندسي في حماة، ساحة العاصي لمناقشة فكرة مشروعك، بناء نموذجك الأولي (MVP)، أو استفسارك التقني.",
  );
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [sent, setSent] = useState(false);

  const set = (k: keyof FormState, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = () => {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = "الرجاء إدخال الاسم";
    const normalizedPhone = form.phone.replace(/[\s()-]/g, "");
    if (!/^\+?[0-9]{7,15}$/.test(normalizedPhone))
      e.phone = "الرجاء إدخال رقم هاتف صحيح من 7 إلى 15 رقمًا";
    if (!form.message.trim()) e.message = "الرجاء كتابة رسالتك";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev: FormEvent) => {
    ev.preventDefault();
    if (validate()) setSent(true);
  };

  const contactCards = [
    {
      icon: MapPin,
      label: "الموقع الجغرافي",
      value: officeInfo.address,
      href: officeInfo.mapsUrl,
    },
    {
      icon: Phone,
      label: "رقم الهاتف",
      value: toArabicDigits(officeInfo.phone),
      href: `tel:${officeInfo.phone}`,
      ltr: true,
    },
    {
      icon: InstagramIcon,
      label: "حساب إنستغرام",
      value: `@${officeInfo.instagram}`,
      href: officeInfo.instagramUrl,
      ltr: true,
    },
    {
      icon: MessageCircle,
      label: "محادثة واتساب",
      value: "تواصل مباشر وفوري",
      href: `https://wa.me/${officeInfo.phoneIntl}`,
    },
  ];

  return (
    <>
      <PageHeader
        title="لنبدأ تنفيذ فكرتك الهندسية أو نظامك التقني"
        description="تواصل مباشرة مع مهندسينا لمناقشة متطلبات مشروعك، بناء نموذجك الأولي (MVP)، تحليل التكلفة والمدة الزمنية، وتحديد خطة العمل."
      />

      <Section className="py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
            {/* Contact info & map */}
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {contactCards.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="group rounded-2xl border border-border/80 bg-card p-5 transition-all hover:border-primary/50 hover:shadow-sm"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                      <c.icon className="h-5 w-5" />
                    </span>
                    <div className="mt-4 text-xs font-semibold text-muted-foreground">
                      {c.label}
                    </div>
                    <div
                      className={`mt-1 text-sm font-bold text-foreground transition-colors group-hover:text-primary ${c.ltr ? "font-mono" : ""}`}
                      dir={c.ltr ? "ltr" : undefined}
                    >
                      {c.value}
                    </div>
                  </a>
                ))}
              </div>

              {/* Map container */}
              <div className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-xs">
                <iframe
                  title="موقع مكتب تكنو إنجاز على الخريطة"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=36.72%2C35.12%2C36.77%2C35.15&layer=mapnik&marker=35.1353%2C36.7518"
                  className="h-64 w-full border-0"
                  loading="lazy"
                />
                <a
                  href={officeInfo.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 border-t border-border/70 bg-card py-3.5 text-sm font-bold text-primary transition-colors hover:bg-secondary"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>فتح الموقع المباشر في خرائط Google</span>
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="rounded-3xl border border-border/80 bg-card p-7 shadow-xs sm:p-9">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-14 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                    <CheckCircle2 className="h-9 w-9" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-foreground">
                    تم استلام استفسارك بنجاح
                  </h3>
                  <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                    شكرًا لتواصلك مع مكتب تكنو إنجاز. سيقوم فريقنا الهندسي بمراجعة تفاصيل رسالتك والرد عليك في أقرب وقت.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-6"
                    onClick={() => {
                      setForm(initial);
                      setSent(false);
                    }}
                  >
                    إرسال استفسار آخر
                  </Button>
                </div>
              ) : (
                <form onSubmit={submit} noValidate>
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-foreground">
                      نموذج الاستشارة والتواصل
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      املأ البيانات وسيقوم أحد مهندسينا بالتواصل معك
                    </p>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="name">الاسم الكامل أو اسم الجهة</Label>
                      <Input
                        id="name"
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                        placeholder="اسمك الكامل أو اسم شركتك"
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-xs text-destructive">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="phone">رقم الهاتف أو الواتساب</Label>
                      <Input
                        id="phone"
                        dir="ltr"
                        value={form.phone}
                        onChange={(e) => set("phone", e.target.value)}
                        placeholder="09xxxxxxxx"
                      />
                      {errors.phone && (
                        <p className="mt-1.5 text-xs text-destructive">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="uni">الجهة / الجامعة / الشركة</Label>
                      <Select
                        id="uni"
                        value={form.university}
                        onChange={(e) => set("university", e.target.value)}
                      >
                        <option value="">اختر الجهة (اختياري)</option>
                        <option value="startup">شركة ناشئة / ريادة أعمال</option>
                        <option value="enterprise">شركة تجارية أو صناعية</option>
                        <option value="freelance">مطور / باحث مستقل</option>
                        {universities.map((u) => (
                          <option key={u.slug} value={u.slug}>
                            جامعة {u.name}
                          </option>
                        ))}
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="major">التخصص أو مجال النشاط</Label>
                      <Input
                        id="major"
                        value={form.major}
                        onChange={(e) => set("major", e.target.value)}
                        placeholder="مثال: هندسة معلوماتية / تجارة / صناعة"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="ptype">نوع المشروع أو الخدمة المطلوبة</Label>
                      <Select
                        id="ptype"
                        value={form.projectType}
                        onChange={(e) => set("projectType", e.target.value)}
                      >
                        <option value="">اختر نوع المشروع (اختياري)</option>
                        {types.map((t) => (
                          <option key={t} value={t}>
                            {projectTypeLabels[t]}
                          </option>
                        ))}
                      </Select>
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="msg">تفاصيل الفكرة أو المتطلبات</Label>
                      <Textarea
                        id="msg"
                        rows={4}
                        value={form.message}
                        onChange={(e) => set("message", e.target.value)}
                        placeholder="اشرح باختصار فكرة مشروعك، المتطلبات الرئيسية (هاردوير / برمجيات)، أو أي استفسار لديك..."
                      />
                      {errors.message && (
                        <p className="mt-1.5 text-xs text-destructive">
                          {errors.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="mt-6 w-full gap-2">
                    <span>إرسال الاستفسار والبدء الآن</span>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              )}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
