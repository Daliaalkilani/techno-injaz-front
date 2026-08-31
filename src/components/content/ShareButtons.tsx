import { useState } from 'react'
import { Link2, Check, MessageCircle } from 'lucide-react'
import { FacebookIcon } from './BrandIcons'

export function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false)
  const url = typeof window !== 'undefined' ? window.location.href : ''

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* ignore */
    }
  }

  const shareText = encodeURIComponent(`${title} | تكنو إنجاز`)
  const encodedUrl = encodeURIComponent(url)

  const iconBtn =
    'flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:border-primary hover:text-primary'

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">مشاركة:</span>
      <button onClick={copy} className={iconBtn} aria-label="نسخ الرابط">
        {copied ? <Check className="h-4.5 w-4.5 text-primary" /> : <Link2 className="h-4.5 w-4.5" />}
      </button>
      <a
        href={`https://wa.me/?text=${shareText}%20${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
        className={iconBtn}
        aria-label="مشاركة عبر واتساب"
      >
        <MessageCircle className="h-4.5 w-4.5" />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
        className={iconBtn}
        aria-label="مشاركة عبر فيسبوك"
      >
        <FacebookIcon className="h-4.5 w-4.5" />
      </a>
    </div>
  )
}
