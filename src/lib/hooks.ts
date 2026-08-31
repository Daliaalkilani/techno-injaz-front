import { useCallback, useEffect, useRef, useState } from 'react'

/* ---- Theme -------------------------------------------------------------- */
type Theme = 'light' | 'dark'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light',
  )

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark'
      document.documentElement.classList.toggle('dark', next === 'dark')
      localStorage.setItem('te-theme', next)
      return next
    })
  }, [])

  return { theme, toggle }
}

/* ---- Favorites (localStorage, no login) -------------------------------- */
const FAV_KEY = 'te-favorites'

function readFavorites(): string[] {
  try {
    return JSON.parse(localStorage.getItem(FAV_KEY) || '[]')
  } catch {
    return []
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(readFavorites)

  useEffect(() => {
    const sync = () => setFavorites(readFavorites())
    window.addEventListener('te-favorites-changed', sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener('te-favorites-changed', sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  const toggle = useCallback((slug: string) => {
    const current = readFavorites()
    const next = current.includes(slug) ? current.filter((s) => s !== slug) : [...current, slug]
    localStorage.setItem(FAV_KEY, JSON.stringify(next))
    window.dispatchEvent(new Event('te-favorites-changed'))
  }, [])

  const isFavorite = useCallback((slug: string) => favorites.includes(slug), [favorites])

  return { favorites, toggle, isFavorite }
}

/* ---- Count-up animation ------------------------------------------------- */
export function useCountUp(target: number, active: boolean, duration = 1400) {
  const [value, setValue] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!active || started.current) return
    started.current = true
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(target * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, target, duration])

  return value
}

/* ---- Reveal on scroll --------------------------------------------------- */
export function useInView<T extends HTMLElement = HTMLDivElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold: 0.15, ...options },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [options])

  return { ref, inView }
}
