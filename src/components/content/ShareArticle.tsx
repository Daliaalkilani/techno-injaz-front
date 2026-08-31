import { useEffect, useRef, useState } from 'react'
import { Share2, Link2, MessageCircle } from 'lucide-react'
import { FacebookIcon } from './BrandIcons'
import { SocialIcon } from './SocialIcons'
import { Button } from '../ui/primitives'
import { toast } from '../ui/toast'

/**
 * "مشاركة المقالة" — uses the native Web Share API when available, otherwise
 * opens a small menu of platforms plus copy-link.
 */
export function ShareArticle({ title }: { title: string }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const url = typeof window !== 'undefined' ? window.location.href : ''
  const shareText = `${title} — تكنو إنجاز`
  const enc = encodeURIComponent(url)
  const encText = encodeURIComponent(shareText)

  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    window.addEventListener('mousedown', onClick)
    return () => window.removeEventListener('mousedown', onClick)
  }, [open])

  const share = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: shareText, url })
        return
      } catch {
        /* user cancelled — fall through to menu */
      }
    }
    setOpen((o) => !o)
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      toast('تم نسخ رابط المقالة')
    } catch {
      /* ignore */
    }
    setOpen(false)
  }

  const links: { label: string; href: string; node: React.ReactNode }[] = [
    { label: 'واتساب', href: `https://wa.me/?text=${encText}%20${enc}`, node: <MessageCircle className="h-4.5 w-4.5" /> },
    { label: 'فيسبوك', href: `https://www.facebook.com/sharer/sharer.php?u=${enc}`, node: <FacebookIcon className="h-4.5 w-4.5" /> },
    { label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc}`, node: <SocialIcon platform="linkedin" className="h-4.5 w-4.5" /> },
    { label: 'Telegram', href: `https://t.me/share/url?url=${enc}&text=${encText}`, node: <SocialIcon platform="telegram" className="h-4.5 w-4.5" /> },
  ]

  return (
    <div ref={ref} className="relative">
      <Button variant="outline" size="sm" onClick={share}>
        <Share2 className="h-4 w-4" />
        مشاركة المقالة
      </Button>
      {open && (
        <div className="absolute left-0 top-full z-30 mt-2 w-52 overflow-hidden rounded-xl border border-border bg-card p-1.5 shadow-xl animate-fade-up">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors hover:bg-secondary"
            >
              <span className="text-primary">{l.node}</span>
              {l.label}
            </a>
          ))}
          <button
            onClick={copy}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors hover:bg-secondary"
          >
            <span className="text-primary">
              <Link2 className="h-4.5 w-4.5" />
            </span>
            نسخ الرابط
          </button>
        </div>
      )}
    </div>
  )
}
