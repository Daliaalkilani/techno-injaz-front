import { type ReactNode, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { cn } from '../../lib/utils'

function useLockBody(active: boolean) {
  useEffect(() => {
    if (!active) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [active])
}

function useEscape(active: boolean, onClose: () => void) {
  const handler = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose],
  )
  useEffect(() => {
    if (!active) return
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [active, handler])
}

/* ---- Modal -------------------------------------------------------------- */
export function Modal({
  open,
  onClose,
  children,
  label,
  fullscreen,
  className,
}: {
  open: boolean
  onClose: () => void
  children: ReactNode
  label: string
  fullscreen?: boolean
  className?: string
}) {
  useLockBody(open)
  useEscape(open, onClose)
  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-6" role="dialog" aria-modal="true" aria-label={label}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-up" onClick={onClose} aria-hidden />
      <div
        className={cn(
          'relative z-10 flex max-h-full w-full flex-col overflow-hidden bg-card shadow-2xl',
          fullscreen ? 'h-full sm:rounded-none' : 'max-w-3xl rounded-none sm:rounded-xl',
          className,
        )}
      >
        <button
          onClick={onClose}
          aria-label="إغلاق"
          className="absolute left-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur transition-colors hover:bg-secondary"
        >
          <X className="h-5 w-5" />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  )
}

/* ---- Drawer (side sheet) ------------------------------------------------ */
export function Drawer({
  open,
  onClose,
  children,
  label,
  side = 'right',
}: {
  open: boolean
  onClose: () => void
  children: ReactNode
  label: string
  side?: 'right' | 'left' | 'bottom'
}) {
  useLockBody(open)
  useEscape(open, onClose)
  if (!open) return null

  const panelPos =
    side === 'bottom'
      ? 'inset-x-0 bottom-0 max-h-[85vh] rounded-t-2xl'
      : side === 'right'
        ? 'inset-y-0 right-0 w-[86%] max-w-sm'
        : 'inset-y-0 left-0 w-[86%] max-w-sm'

  return createPortal(
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label={label}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <div className={cn('absolute flex flex-col overflow-y-auto bg-card shadow-2xl', panelPos)}>
        <button
          onClick={onClose}
          aria-label="إغلاق"
          className="absolute left-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary"
        >
          <X className="h-5 w-5" />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  )
}

/* ---- Tabs --------------------------------------------------------------- */
export function Tabs({
  tabs,
  active,
  onChange,
}: {
  tabs: { id: string; label: string; count?: number }[]
  active: string
  onChange: (id: string) => void
}) {
  return (
    <div className="flex gap-1 overflow-x-auto border-b border-border" role="tablist">
      {tabs.map((t) => (
        <button
          key={t.id}
          role="tab"
          aria-selected={active === t.id}
          onClick={() => onChange(t.id)}
          className={cn(
            'relative whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors',
            active === t.id ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {t.label}
          {typeof t.count === 'number' && <span className="ms-1.5 font-mono text-xs opacity-70">({t.count})</span>}
          {active === t.id && <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-primary" />}
        </button>
      ))}
    </div>
  )
}
