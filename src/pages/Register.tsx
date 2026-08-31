import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Clock } from 'lucide-react'
import { Container, Section, Button, Eyebrow } from '../components/ui/primitives'
import { Input, Textarea, Select, Label } from '../components/ui/fields'
import { SocialAccountsEditor } from '../components/content/SocialAccountsEditor'
import { universities } from '../data/universities'
import type { SocialAccount } from '../data/users'
import { useAuth } from '../lib/auth'
import { isValidEmail } from '../lib/community'
import { useSeo } from '../lib/seo'

export default function Register() {
  useSeo('إنشاء حساب', 'انضم إلى مجتمع تكنو إنجاز للمشاركة بالتعليقات والتقييمات والمحتوى التقني.')
  const { register, user } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
    avatar: '',
    bio: '',
    specialty: '',
    university: '',
    graduationYear: '',
  })
  const [social, setSocial] = useState<SocialAccount[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const set = (k: keyof typeof form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }))
    if (errors[k]) setErrors((e) => ({ ...e, [k]: '' }))
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const err: Record<string, string> = {}
    if (!form.name.trim()) err.name = 'الرجاء إدخال الاسم الكامل'
    if (!isValidEmail(form.email)) err.email = 'يرجى إدخال بريد إلكتروني صحيح.'
    if (form.password.length < 6) err.password = 'كلمة المرور يجب أن تكون ٦ أحرف على الأقل'
    if (form.password !== form.confirm) err.confirm = 'كلمتا المرور غير متطابقتين'
    setErrors(err)
    if (Object.keys(err).length) return

    register({
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
      avatar: form.avatar.trim() || undefined,
      bio: form.bio.trim(),
      specialty: form.specialty.trim(),
      university: form.university || undefined,
      graduationYear: form.graduationYear ? Number(form.graduationYear) : undefined,
      social: social.filter((s) => s.url.trim()),
    })
    setSubmitted(true)
  }

  if (submitted || (user && user.status === 'pending')) {
    return (
      <Section>
        <Container className="max-w-lg text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/10 text-amber-500">
            <Clock className="h-8 w-8" />
          </span>
          <h1 className="mt-6 text-2xl font-bold">حسابك قيد المراجعة من إدارة الموقع.</h1>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            شكرًا لتسجيلك في تكنو إنجاز. ستتمكن من المشاركة بالتعليقات والتقييمات بعد موافقة الإدارة على حسابك.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button onClick={() => navigate(`/profile/${user?.id}`)}>عرض ملفي الشخصي</Button>
            <Link
              to="/"
              className="inline-flex h-11 items-center justify-center rounded-md border border-border px-5 text-sm font-medium transition-colors hover:bg-secondary/60"
            >
              العودة للرئيسية
            </Link>
          </div>
        </Container>
      </Section>
    )
  }

  return (
    <Section>
      <Container className="max-w-2xl">
        <Eyebrow>انضم إلينا</Eyebrow>
        <h1 className="mt-4 text-3xl font-bold tracking-tight">إنشاء حساب جديد</h1>
        <p className="mt-2 text-muted-foreground">
          لديك حساب؟{' '}
          <Link to="/login" className="text-primary hover:underline">
            تسجيل الدخول
          </Link>
        </p>

        <form onSubmit={submit} noValidate className="mt-8 space-y-6 rounded-2xl border border-border bg-card p-6 sm:p-8">
          <div>
            <h2 className="mb-4 font-semibold">المعلومات الأساسية</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">الاسم الكامل</Label>
                <Input id="name" value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="اسمك الكامل" />
                {errors.name && <p className="mt-1.5 text-xs text-destructive">{errors.name}</p>}
              </div>
              <div>
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input id="email" dir="ltr" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="you@example.com" className="text-right" />
                {errors.email && <p className="mt-1.5 text-xs text-destructive">{errors.email}</p>}
              </div>
              <div>
                <Label htmlFor="password">كلمة المرور</Label>
                <Input id="password" type="password" value={form.password} onChange={(e) => set('password', e.target.value)} placeholder="••••••••" />
                {errors.password && <p className="mt-1.5 text-xs text-destructive">{errors.password}</p>}
              </div>
              <div>
                <Label htmlFor="confirm">تأكيد كلمة المرور</Label>
                <Input id="confirm" type="password" value={form.confirm} onChange={(e) => set('confirm', e.target.value)} placeholder="••••••••" />
                {errors.confirm && <p className="mt-1.5 text-xs text-destructive">{errors.confirm}</p>}
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="avatar">رابط صورة شخصية (اختياري)</Label>
                <Input id="avatar" dir="ltr" value={form.avatar} onChange={(e) => set('avatar', e.target.value)} placeholder="https://..." className="text-right" />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="bio">نبذة عنك</Label>
                <Textarea id="bio" value={form.bio} onChange={(e) => set('bio', e.target.value)} placeholder="اكتب نبذة مختصرة عن اهتماماتك التقنية..." rows={3} />
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <h2 className="mb-4 font-semibold">التخصص</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="specialty">الاختصاص</Label>
                <Input id="specialty" value={form.specialty} onChange={(e) => set('specialty', e.target.value)} placeholder="مثال: هندسة معلوماتية" />
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
                <Label htmlFor="gy">سنة التخرج / السنة الدراسية</Label>
                <Input id="gy" dir="ltr" value={form.graduationYear} onChange={(e) => set('graduationYear', e.target.value)} placeholder="2026" className="text-right" />
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <SocialAccountsEditor value={social} onChange={setSocial} />
          </div>

          <Button type="submit" size="lg" className="w-full">
            إنشاء الحساب
          </Button>
        </form>
      </Container>
    </Section>
  )
}
