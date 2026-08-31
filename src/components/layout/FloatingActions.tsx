import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { officeInfo } from '../../data/stats'

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .105 5.358.104 11.892c0 2.096.549 4.14 1.595 5.945L0 24l6.304-1.654a11.88 11.88 0 005.71 1.454h.005c6.582 0 11.94-5.358 11.94-11.893a11.82 11.82 0 00-3.44-8.458" />
    </svg>
  )
}

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed bottom-5 left-5 z-40 flex flex-col items-center gap-3">
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="العودة للأعلى"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-lg transition-transform hover:-translate-y-0.5"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
      <a
        href={`https://wa.me/${officeInfo.phoneIntl}`}
        target="_blank"
        rel="noreferrer"
        aria-label="تواصل معنا عبر واتساب"
        className="group relative flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-transform hover:-translate-y-0.5"
      >
        <WhatsAppIcon className="h-6 w-6" />
        <span className="pointer-events-none absolute left-full ms-3 hidden whitespace-nowrap rounded-md bg-foreground px-3 py-1.5 text-sm font-medium text-background opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 lg:block">
          تواصل معنا عبر واتساب
        </span>
      </a>
    </div>
  )
}
