import { useEffect, useState, type FormEvent } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { GraduationCap, BriefcaseBusiness, FileText, Sparkles, Pencil, Check, X } from 'lucide-react'
import { Container, Section, Button, Eyebrow } from '../components/ui/primitives'
import { Input, Textarea, Label } from '../components/ui/fields'
import { SocialLinks } from '../components/content/SocialLinks'
import { SocialAccountsEditor } from '../components/content/SocialAccountsEditor'
import { ArticleCard } from '../components/content/ArticleCard'
import { userById } from '../data/users'
import type { SocialAccount, User } from '../data/users'
import { universities } from '../data/universities'
import { articlesByAuthor } from '../data/articles'
import { useAuth, statusLabels } from '../lib/auth'
import { toArabicDigits } from '../lib/utils'
import { useSeo } from '../lib/seo'

function universityName(slug?: string) {
  return universities.find((u) => u.slug === slug)?.name
}

export default function Profile() {
  const { id = '' } = useParams()
  const { user: current, updateProfile } = useAuth()
  const [params, setParams] = useSearchParams()

  // Resolve the profile: seed users first, else the signed-in user (demo / newly registered).
  const profile: User | undefined = userById(id) ?? (current && current.id === id ? current : undefined)
  const isOwner = !!current && current.id === id

  useSeo(profile ? profile.name : 'ملف غير موجود', profile?.bio)

  const [editing, setEditing] = useState(params.get('edit') === '1')
  useEffect(() => {
    if (params.get('edit') === '1') setEditing(true)
  }, [params])

  if (!profile) {
    return (
      <Section>
        <Container className="max-w-lg text-center">
          <h1 className="text-2xl font-bold">هذا الملف غير موجود</h1>
          <p className="mt-3 text-muted-foreground">قد يكون الرابط غير صحيح أو أن الحساب لم يعد متاحًا.</p>
          <Link to="/contributors" className="mt-6 inline-block text-primary hover:underline">
            تصفّح أبرز المساهمين
          </Link>
        </Container>
      </Section>
    )
  }

  const published = articlesByAuthor(profile.id)

  const closeEdit = () => {
    setEditing(false)
    if (params.get('edit')) {
      params.delete('edit')
      setParams(params, { replace: true })
    }
  }

  return (
    <>
      {/* Profile header */}
      <div className="border-b border-border bg-blueprint">
        <Container className="py-12 sm:py-16">
          <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:text-right">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="h-28 w-28 shrink-0 rounded-2xl border border-border object-cover shadow-sm sm:h-32 sm:w-32"
            />
            <div className="flex-1">
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{profile.name}</h1>
              {profile.specialty && <p className="mt-1.5 text-primary">{profile.specialty}</p>}
              <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground sm:justify-start">
                {profile.university && (
                  <span className="inline-flex items-center gap-1.5">
                    <GraduationCap className="h-4 w-4" />
                    {universityName(profile.university)}
                    {profile.graduationYear ? ` · ${toArabicDigits(profile.graduationYear)}` : ''}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5">
                  <FileText className="h-4 w-4" />
                  {toArabicDigits(published.length)} مقالة منشورة
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <BriefcaseBusiness className="h-4 w-4" />
                  {toArabicDigits(profile.contributionCount)} مساهمة
                </span>
              </div>
              {profile.bio && <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-foreground/90 sm:mx-0">{profile.bio}</p>}
              {profile.social.length > 0 && (
                <div className="mt-5 flex justify-center sm:justify-start">
                  <SocialLinks social={profile.social} />
                </div>
              )}
              {isOwner && (
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                  {!editing && (
                    <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
                      <Pencil className="h-4 w-4" />
                      تعديل الملف الشخصي
                    </Button>
                  )}
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs text-primary">
                    <Sparkles className="h-3.5 w-3.5" />
                    {statusLabels[profile.status]}
                  </span>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>

      {isOwner && editing && <EditProfile user={profile} onSave={updateProfile} onClose={closeEdit} />}

      {/* Published articles */}
      <Section id="articles">
        <Container>
          <Eyebrow>المحتوى المنشور</Eyebrow>
          <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
            {isOwner ? 'مقالاتي' : `مقالات ${profile.name}`}
          </h2>
          {published.length ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {published.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          ) : (
            <p className="mt-6 text-muted-foreground">
              {isOwner ? 'لم تنشر أي مقالة بعد.' : 'لا توجد مقالات منشورة حتى الآن.'}
            </p>
          )}
        </Container>
      </Section>
    </>
  )
}

function EditProfile({
  user,
  onSave,
  onClose,
}: {
  user: User
  onSave: (patch: Partial<User>) => void
  onClose: () => void
}) {
  const [name, setName] = useState(user.name)
  const [specialty, setSpecialty] = useState(user.specialty)
  const [bio, setBio] = useState(user.bio)
  const [social, setSocial] = useState<SocialAccount[]>(user.social)

  const save = (e: FormEvent) => {
    e.preventDefault()
    onSave({
      name: name.trim() || user.name,
      specialty: specialty.trim(),
      bio: bio.trim(),
      social: social.filter((s) => s.url.trim()),
    })
    onClose()
  }

  return (
    <Section className="border-b border-border !py-12">
      <Container className="max-w-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">تعديل الملف الشخصي</h2>
          <button
            onClick={onClose}
            aria-label="إغلاق"
            className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={save} className="mt-6 space-y-5 rounded-2xl border border-border bg-card p-6 sm:p-8">
          <div>
            <Label htmlFor="p-name">الاسم</Label>
            <Input id="p-name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="p-spec">الاختصاص</Label>
            <Input id="p-spec" value={specialty} onChange={(e) => setSpecialty(e.target.value)} placeholder="مثال: هندسة معلوماتية" />
          </div>
          <div>
            <Label htmlFor="p-bio">نبذة عنك</Label>
            <Textarea id="p-bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={4} />
          </div>
          <div className="border-t border-border pt-5">
            <SocialAccountsEditor value={social} onChange={setSocial} />
          </div>
          <div className="flex gap-3">
            <Button type="submit">
              <Check className="h-4 w-4" />
              حفظ التغييرات
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              إلغاء
            </Button>
          </div>
        </form>
      </Container>
    </Section>
  )
}
