import { useEffect, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { cn } from '../../lib/utils'
import { toArabicDigits } from '../../lib/utils'

export function Gallery({ images, title }: { images: string[]; title: string }) {
  const [index, setIndex] = useState<number | null>(null)
  const [zoom, setZoom] = useState(false)

  const close = useCallback(() => {
    setIndex(null)
    setZoom(false)
  }, [])
  const prev = useCallback(() => {
    setZoom(false)
    setIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length))
  }, [images.length])
  const next = useCallback(() => {
    setZoom(false)
    setIndex((i) => (i === null ? i : (i + 1) % images.length))
  }, [images.length])

  useEffect(() => {
    if (index === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      // RTL: right arrow -> previous
      if (e.key === 'ArrowRight') prev()
      if (e.key === 'ArrowLeft') next()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [index, close, prev, next])

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {images.map((src, i) => (
          <button
            key={src + i}
            onClick={() => setIndex(i)}
            className="group relative block w-full overflow-hidden rounded-lg border border-border bg-muted"
            aria-label={`عرض صورة ${toArabicDigits(i + 1)}`}
          >
            <img
              src={src}
              alt={`${title} — صورة ${i + 1}`}
              loading="lazy"
              draggable={false}
              className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/30">
              <ZoomIn className="h-7 w-7 text-white opacity-0 transition-opacity group-hover:opacity-100" />
            </span>
          </button>
        ))}
      </div>

      {index !== null &&
        createPortal(
          <div className="fixed inset-0 z-[110] flex flex-col bg-black/95" role="dialog" aria-modal="true" aria-label="معرض الصور">
            <div className="flex items-center justify-between p-4 text-white">
              <span className="font-mono text-sm">
                {toArabicDigits(index + 1)} / {toArabicDigits(images.length)}
              </span>
              <button onClick={close} aria-label="إغلاق" className="rounded-full p-2 hover:bg-white/10">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 pb-4">
              <button
                onClick={prev}
                aria-label="السابق"
                className="absolute right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              <img
                src={images[index]}
                alt={`${title} — صورة ${index + 1}`}
                onClick={() => setZoom((z) => !z)}
                draggable={false}
                className={cn(
                  'max-h-full max-w-full cursor-zoom-in rounded-lg object-contain transition-transform duration-300',
                  zoom && 'scale-150 cursor-zoom-out',
                )}
              />
              <button
                onClick={next}
                aria-label="التالي"
                className="absolute left-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}
