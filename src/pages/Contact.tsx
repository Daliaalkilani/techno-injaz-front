import { useState, type FormEvent } from 'react'
import { MapPin, Phone, MessageCircle, CheckCircle2, ExternalLink } from 'lucide-react'
import { InstagramIcon } from '../components/content/BrandIcons'
import { Container, Section, PageHeader, Button, Eyebrow } from '../components/ui/primitives'
import { Input, Textarea, Select, Label } from '../components/ui/fields'
import { officeInfo } from '../data/stats'
import { universities } from '../data/universities'
import { projectTypeLabels, type ProjectType } from '../data/types'
import { toArabicDigits } from '../lib/utils'
import { useSeo } from '../lib/seo'

interface FormState {
  name: string
  phone: string
  university: string
  major: string
  projectType: string
  message: string
}

const initial: FormState = { name: '', phone: '', university: '', major: '', projectType: '', message: '' }
const types = Object.keys(projectTypeLabels) as ProjectType[]

export default function Contact() {
  useSeo('تواصل معنا', 'تواصل مع مكتب تكنو إنجاز — حماة، ساحة العاصي. لديك فكرة مشروع أو استفسار؟')
  const [form, setForm] = useState<FormState>(initial)
  const [errors, setErrors] = useState<Partial<FormState>>({})
  const [sent, setSent] = useState(false)

  const set = (k: keyof FormState, v: string) => {
    setForm((f) => ({ ...f, [k]: v }))
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }))
  }

  const validate = () => {
    const e: Partial<FormState> = {}
    if (!form.name.trim()) e.name = 'الرجاء إدخال الاسم'
    if (!/^[0-9\s+]{7,}$/.test(form.phone.trim())) e.phone = 'الرجاء إدخال رقم هاتف صحيح'
    if (!form.message.trim()) e.message = 'الرجاء كتابة رسالتك'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = (ev: FormEvent) => {
    ev.preventDefault()
    if (validate()) setSent(true)
  }

  const contactCards = [
    { icon: MapPin, label: 'الموقع', value: officeInfo.address, href: officeInfo.mapsUrl },
    { icon: Phone, label: 'الهاتف', value: toArabicDigits(officeInfo.phone), href: `tel:${officeInfo.phone}`, ltr: true },
    { icon: InstagramIcon, label: 'إنستغرام', value: `@${officeInfo.instagram}`, href: officeInfo.instagramUrl, ltr: true },
    { icon: MessageCircle, label: 'واتساب', value: 'تواصل مباشر', href: `https://wa.me/${officeInfo.phoneIntl}` },
  ]

  return (
    <>
      <PageHeader eyebrow="تواصل معنا" title="لنبدأ مشروعك القادم" description="لديك فكرة مشروع أو استفسار؟ تواصل معنا وسنعود إليك في أقرب وقت." />

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
            {/* Contact info */}
            <div>
              <div className="grid gap-4 sm:grid-cols-2">
                {contactCards.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <c.icon className="h-5 w-5" />
                    </span>
                    <div className="mt-4 text-sm text-muted-foreground">{c.label}</div>
                    <div
                      className={`mt-1 font-medium transition-colors group-hover:text-primary ${c.ltr ? 'font-mono' : ''}`}
                      dir={c.ltr ? 'ltr' : undefined}
                    >
                      {c.value}
                    </div>
                  </a>
                ))}
              </div>

              {/* Map */}
              <div className="mt-6 overflow-hidden rounded-xl border border-border">
                <iframe
                  title="موقع المكتب على الخريطة"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=36.72%2C35.12%2C36.77%2C35.15&layer=mapnik&marker=35.1353%2C36.7518"
                  className="h-64 w-full"
                  loading="lazy"
                />
                <a
                  href={officeInfo.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 bg-card py-3 text-sm font-medium text-primary transition-colors hover:bg-secondary/50"
                >
                  <ExternalLink className="h-4 w-4" />
                  فتح الموقع في الخرائط
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="rounded-2xl border border-border bg-card p-7 sm:p-9">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-14 text-center">
                  <CheckCircle2 className="h-16 w-16 text-primary" />
                  <h3 className="mt-5 text-xl font-bold">تم إرسال رسالتك بنجاح</h3>
                  <p className="mt-2 max-w-sm text-muted-foreground">شكرًا لتواصلك مع تكنو إنجاز. سنعود إليك قريبًا.</p>
                  <Button
                    variant="outline"
                    className="mt-6"
                    onClick={() => {
                      setForm(initial)
                      setSent(false)
                    }}
                  >
                    إرسال رسالة أخرى
                  </Button>
                </div>
              ) : (
                <form onSubmit={submit} noValidate>
                  <Eyebrow>أرسل استفسارك</Eyebrow>
                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="name">الاسم</Label>
                      <Input id="name" value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="اسمك الكامل" />
                      {errors.name && <p className="mt-1.5 text-xs text-destructive">{errors.name}</p>}
                    </div>
                    <div>
                      <Label htmlFor="phone">رقم الهاتف</Label>
                      <Input id="phone" dir="ltr" value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="09xxxxxxxx" />
                      {errors.phone && <p className="mt-1.5 text-xs text-destructive">{errors.phone}</p>}
                    </div>
                    <div>
                      <Label htmlFor="uni">الجامعة</Label>
                      <Select id="uni" value={form.university} onChange={(e) => set('university', e.target.value)}>
                        <option value="">اختر (اختياري)</option>
                        {universities.map((u) => (
                          <option key={u.slug} value={u.slug}>
                            {u.name}
                          </option>
                        ))}
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="major">الاختصاص</Label>
                      <Input id="major" value={form.major} onChange={(e) => set('major', e.target.value)} placeholder="مثال: هندسة حاسوب" />
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="ptype">نوع المشروع</Label>
                      <Select id="ptype" value={form.projectType} onChange={(e) => set('projectType', e.target.value)}>
                        <option value="">اختر (اختياري)</option>
                        {types.map((t) => (
                          <option key={t} value={t}>
                            {projectTypeLabels[t]}
                          </option>
                        ))}
                      </Select>
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="msg">رسالتك</Label>
                      <Textarea id="msg" value={form.message} onChange={(e) => set('message', e.target.value)} placeholder="اكتب فكرة مشروعك أو استفسارك..." />
                      {errors.message && <p className="mt-1.5 text-xs text-destructive">{errors.message}</p>}
                    </div>
                  </div>
                  <Button type="submit" size="lg" className="mt-6 w-full">
                    إرسال الاستفسار
                  </Button>
                </form>
              )}
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
