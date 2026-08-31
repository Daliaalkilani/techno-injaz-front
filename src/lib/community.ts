import { useCallback, useEffect, useMemo, useState } from 'react'
import { seedComments, type Comment } from '../data/comments'

const COMMENTS_KEY = 'te-comments'
const LIKES_KEY = 'te-comment-likes'
const NEWSLETTER_KEY = 'te-newsletter'
const CHANGED = 'te-community-changed'

function readLocal<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function emitChange() {
  window.dispatchEvent(new Event(CHANGED))
}

/** All comments for a target (`project:slug` / `article:slug`), newest first. */
export function useComments(targetId: string) {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const sync = () => setTick((t) => t + 1)
    window.addEventListener(CHANGED, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(CHANGED, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  const comments = useMemo(() => {
    const local = readLocal<Comment[]>(COMMENTS_KEY, [])
    const likes = readLocal<Record<string, boolean>>(LIKES_KEY, {})
    return [...seedComments, ...local]
      .filter((c) => c.targetId === targetId)
      .map((c) => ({ ...c, likes: c.likes + (likes[c.id] ? 1 : 0) }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetId, tick])

  const likedIds = readLocal<Record<string, boolean>>(LIKES_KEY, {})

  const addComment = useCallback(
    (input: { userId: string; body: string; rating?: number }) => {
      const local = readLocal<Comment[]>(COMMENTS_KEY, [])
      const comment: Comment = {
        id: `local-${Date.now()}`,
        targetId,
        userId: input.userId,
        body: input.body,
        rating: input.rating,
        date: new Date().toISOString().slice(0, 10),
        likes: 0,
      }
      localStorage.setItem(COMMENTS_KEY, JSON.stringify([...local, comment]))
      emitChange()
    },
    [targetId],
  )

  const toggleLike = useCallback((id: string) => {
    const likes = readLocal<Record<string, boolean>>(LIKES_KEY, {})
    likes[id] = !likes[id]
    localStorage.setItem(LIKES_KEY, JSON.stringify(likes))
    emitChange()
  }, [])

  const rated = comments.filter((c) => typeof c.rating === 'number')
  const ratingAverage = rated.length
    ? Math.round((rated.reduce((s, c) => s + (c.rating ?? 0), 0) / rated.length) * 10) / 10
    : 0

  return { comments, addComment, toggleLike, likedIds, ratingCount: rated.length, ratingAverage }
}

/* ---- Newsletter --------------------------------------------------------- */
export function subscribeNewsletter(email: string) {
  const list = readLocal<string[]>(NEWSLETTER_KEY, [])
  if (!list.includes(email)) {
    localStorage.setItem(NEWSLETTER_KEY, JSON.stringify([...list, email]))
  }
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}
