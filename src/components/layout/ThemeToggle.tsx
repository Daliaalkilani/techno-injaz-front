import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../lib/hooks'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <button
      onClick={toggle}
      aria-label={theme === 'dark' ? 'التبديل إلى الوضع النهاري' : 'التبديل إلى الوضع الليلي'}
      className="flex h-10 w-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-secondary"
    >
      {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  )
}
