import { useEffect, useState } from 'react'
import { CheckCircle2 } from 'lucide-react'

/** Minimal imperative toast — call `toast(message)` from anywhere. */
const EVENT = 'te-toast'

export function toast(message: string) {
  window.dispatchEvent(new CustomEvent(EVENT, { detail: message }))
}

interface Item {
  id: number
  message: string
}

export function ToastHost() {
  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    const onToast = (e: Event) => {
      const message = (e as CustomEvent<string>).detail
      const id = Date.now() + Math.random()
      setItems((prev) => [...prev, { id, message }])
      setTimeout(() => setItems((prev) => prev.filter((i) => i.id !== id)), 2600)
    }
    window.addEventListener(EVENT, onToast)
    return () => window.removeEventListener(EVENT, onToast)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[200] flex flex-col items-center gap-2 px-4">
      {items.map((i) => (
        <div
          key={i.id}
          className="pointer-events-auto flex items-center gap-2.5 rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium shadow-xl animate-fade-up"
          role="status"
        >
          <CheckCircle2 className="h-5 w-5 text-primary" />
          {i.message}
        </div>
      ))}
    </div>
  )
}
