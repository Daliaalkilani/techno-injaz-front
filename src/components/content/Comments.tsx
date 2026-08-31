import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ThumbsUp, MessageSquare } from 'lucide-react'
import { useAuth } from '../../lib/auth'
import { useComments } from '../../lib/community'
import { userById } from '../../data/users'
import { Button } from '../ui/primitives'
import { Textarea } from '../ui/fields'
import { RatingDisplay, RatingInput } from './RatingStars'
import { toast } from '../ui/toast'
import { formatArabicDate, toArabicDigits } from '../../lib/utils'

export function Comments({ targetId }: { targetId: string }) {
  const { user } = useAuth()
  const { comments, addComment, toggleLike, likedIds, ratingAverage, ratingCount } = useComments(targetId)
  const [body, setBody] = useState('')
  const [rating, setRating] = useState(0)

  const canParticipate = user?.status === 'approved'

  const submit = () => {
    if (!user || !canParticipate || !body.trim()) return
    addComment({ userId: user.id, body: body.trim(), rating: rating || undefined })
    setBody('')
    setRating(0)
    toast(rating ? 'تم تسجيل تقييمك. شكرًا لمشاركتك.' : 'تم نشر تعليقك.')
  }

  return (
    <section className="mt-4">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          <MessageSquare className="h-6 w-6 text-primary" />
          التعليقات
          <span className="font-mono text-lg text-muted-foreground">({toArabicDigits(comments.length)})</span>
        </h2>
        {ratingCount > 0 && <RatingDisplay value={ratingAverage} count={ratingCount} />}
      </div>

      {/* Composer / permission states */}
      {canParticipate ? (
        <div className="mb-8 rounded-xl border border-border bg-card p-5">
          <div className="mb-4 flex items-center gap-3">
            <img src={user!.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
            <div>
              <div className="text-sm font-semibold">{user!.name}</div>
              <div className="text-xs text-muted-foreground">شارك رأيك مع المجتمع</div>
            </div>
          </div>
          <div className="mb-4">
            <span className="mb-2 block text-sm text-muted-foreground">تقييمك (اختياري)</span>
            <RatingInput value={rating} onChange={setRating} />
          </div>
          <Textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="اكتب تعليقك..."
            rows={3}
          />
          <div className="mt-3 flex justify-end">
            <Button onClick={submit} disabled={!body.trim()}>
              نشر التعليق
            </Button>
          </div>
        </div>
      ) : user ? (
        <div className="mb-8 rounded-xl border border-amber-500/30 bg-amber-500/5 p-5 text-sm">
          حسابك قيد المراجعة. ستتمكن من المشاركة بعد موافقة إدارة الموقع.
        </div>
      ) : (
        <div className="mb-8 flex flex-col items-start gap-3 rounded-xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="font-semibold">هل تريد المشاركة؟</div>
            <p className="text-sm text-muted-foreground">سجّل الدخول للتعليق والتقييم.</p>
          </div>
          <Link
            to="/login"
            className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            تسجيل الدخول
          </Link>
        </div>
      )}

      {/* List */}
      {comments.length === 0 ? (
        <p className="text-sm text-muted-foreground">لا توجد تعليقات بعد. كن أول من يشارك رأيه.</p>
      ) : (
        <div className="space-y-5">
          {comments.map((c) => {
            const author = userById(c.userId)
            return (
              <div key={c.id} className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-start gap-3">
                  <img
                    src={author?.avatar}
                    alt=""
                    className="h-10 w-10 shrink-0 rounded-full bg-muted object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      {author ? (
                        <Link to={`/profile/${author.id}`} className="font-semibold hover:text-primary">
                          {author.name}
                        </Link>
                      ) : (
                        <span className="font-semibold">مستخدم</span>
                      )}
                      <span className="text-xs text-muted-foreground">{formatArabicDate(c.date)}</span>
                      {typeof c.rating === 'number' && <RatingDisplay value={c.rating} size="sm" />}
                    </div>
                    <p className="mt-2 leading-relaxed text-foreground/85">{c.body}</p>
                    <button
                      onClick={() => toggleLike(c.id)}
                      className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                      aria-pressed={!!likedIds[c.id]}
                    >
                      <ThumbsUp className={likedIds[c.id] ? 'h-4 w-4 fill-primary text-primary' : 'h-4 w-4'} />
                      {toArabicDigits(c.likes)}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
