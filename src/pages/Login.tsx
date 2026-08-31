import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import { Container, Section, Button, Eyebrow } from '../components/ui/primitives'
import { Input, Label } from '../components/ui/fields'
import { useAuth, statusLabels } from '../lib/auth'
import { useSeo } from '../lib/seo'

export default function Login() {
  useSeo('تسجيل الدخول', 'سجّل الدخول إلى حسابك في تكنو إنجاز.')
  const { login, loginAsDemo, user } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const res = login(email.trim(), password)
    if (res.ok) navigate(`/profile/${user?.id ?? ''}`)
    else setError(res.error ?? 'تعذّر تسجيل الدخول')
  }

  return (
    <Section>
      <Container className="max-w-md">
        <Eyebrow>مرحبًا بعودتك</Eyebrow>
        <h1 className="mt-4 text-3xl font-bold tracking-tight">تسجيل الدخول</h1>
        <p className="mt-2 text-muted-foreground">
          ليس لديك حساب؟{' '}
          <Link to="/register" className="text-primary hover:underline">
            إنشاء حساب
          </Link>
        </p>

        {user && (
          <div className="mt-6 rounded-xl border border-primary/30 bg-primary/5 p-4 text-sm">
            أنت مسجّل الدخول باسم <span className="font-semibold">{user.name}</span>. {statusLabels[user.status]}{' '}
            <Link to={`/profile/${user.id}`} className="text-primary hover:underline">
              ملفي الشخصي
            </Link>
          </div>
        )}

        <form onSubmit={submit} noValidate className="mt-8 space-y-5 rounded-2xl border border-border bg-card p-6 sm:p-8">
          <div>
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <Input id="email" dir="ltr" value={email} onChange={(e) => { setEmail(e.target.value); setError('') }} placeholder="you@example.com" className="text-right" />
          </div>
          <div>
            <Label htmlFor="pw">كلمة المرور</Label>
            <Input id="pw" type="password" value={password} onChange={(e) => { setPassword(e.target.value); setError('') }} placeholder="••••••••" />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" size="lg" className="w-full">
            تسجيل الدخول
          </Button>
        </form>

        <div className="mt-4 rounded-xl border border-dashed border-border p-4">
          <p className="mb-3 text-sm text-muted-foreground">
            لتجربة ميزات المجتمع مباشرة (تعليق وتقييم) بدون انتظار الموافقة:
          </p>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              loginAsDemo()
              navigate('/profile/u-demo')
            }}
          >
            <Sparkles className="h-4 w-4" />
            الدخول كمستخدم معتمد (تجريبي)
          </Button>
        </div>
      </Container>
    </Section>
  )
}
