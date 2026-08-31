import { useState, type FormEvent } from 'react'
import { Mail, CheckCircle2 } from 'lucide-react'
import { Container, Section, Eyebrow, Button } from '../ui/primitives'
import { Input } from '../ui/fields'
import { isValidEmail, subscribeNewsletter } from '../../lib/community'

function useSubscribe() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!isValidEmail(email)) {
      setError('يرجى إدخال بريد إلكتروني صحيح.')
      return
    }
    subscribeNewsletter(email.trim())
    setError('')
    setDone(true)
  }

  return { email, setEmail, error, setError, done, submit }
}

/** Full-width newsletter section for the homepage. */
export function NewsletterSection() {
  const { email, setEmail, error, setError, done, submit } = useSubscribe()

  return (
    <Section className="py-14">
      <Container>
        <div className="grid items-center gap-8 rounded-2xl border border-border bg-card p-8 sm:p-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <Eyebrow>النشرة البريدية</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold tracking-tight">ابقَ على اطلاع بجديد تكنو إنجاز</h2>
            <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">
              اشترك ليصلك جديد المقالات والمحتوى التقني عند نشره.
            </p>
          </div>
          {done ? (
            <div className="flex items-center gap-3 rounded-xl border border-primary/30 bg-primary/5 p-6">
              <CheckCircle2 className="h-8 w-8 shrink-0 text-primary" />
              <div>
                <div className="font-semibold">تم الاشتراك بنجاح.</div>
                <p className="text-sm text-muted-foreground">سنوافيك بكل جديد على بريدك.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Mail className="pointer-events-none absolute right-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="email"
                    dir="ltr"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (error) setError('')
                    }}
                    placeholder="you@example.com"
                    className="pr-11 text-right"
                    aria-label="البريد الإلكتروني"
                  />
                </div>
                <Button type="submit" size="lg" className="sm:w-auto">
                  اشتراك
                </Button>
              </div>
              {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
            </form>
          )}
        </div>
      </Container>
    </Section>
  )
}

/** Compact newsletter form for the footer. */
export function NewsletterInline() {
  const { email, setEmail, error, setError, done, submit } = useSubscribe()

  if (done) {
    return (
      <div className="flex items-center gap-2 text-sm text-primary">
        <CheckCircle2 className="h-4.5 w-4.5" />
        تم الاشتراك بنجاح.
      </div>
    )
  }

  return (
    <form onSubmit={submit} noValidate>
      <div className="flex gap-2">
        <Input
          type="email"
          dir="ltr"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (error) setError('')
          }}
          placeholder="بريدك الإلكتروني"
          className="h-10 text-right text-sm"
          aria-label="البريد الإلكتروني"
        />
        <Button type="submit" size="sm" className="shrink-0">
          اشتراك
        </Button>
      </div>
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </form>
  )
}
