import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, Search, ChevronDown } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Container } from '../ui/primitives'
import { Drawer } from '../ui/overlay'
import { Logo } from './Logo'
import { ThemeToggle } from './ThemeToggle'
import { UserMenu } from './UserMenu'

const navItems = [
  { to: '/', label: 'الرئيسية', end: true },
  { to: '/projects', label: 'المشاريع' },
  { to: '/articles', label: 'المقالات' },
  { to: '/videos', label: 'الفيديوهات' },
  { to: '/about', label: 'من نحن' },
  { to: '/contact', label: 'تواصل معنا' },
]

const moreItems = [
  { to: '/contributors', label: 'أبرز المساهمين' },
  { to: '/annual-report', label: 'التقرير السنوي' },
]

function MoreMenu() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    window.addEventListener('mousedown', onClick)
    return () => window.removeEventListener('mousedown', onClick)
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 rounded-md px-3.5 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
      >
        المزيد
        <ChevronDown className={cn('h-4 w-4 transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-40 mt-2 w-48 overflow-hidden rounded-xl border border-border bg-card p-1.5 shadow-xl animate-fade-up">
          {moreItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  'block rounded-md px-3 py-2.5 text-sm transition-colors',
                  isActive ? 'bg-secondary text-primary' : 'hover:bg-secondary',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled ? 'border-b border-border bg-background/85 backdrop-blur-md' : 'border-b border-transparent bg-background',
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-4 sm:h-[72px]">
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="القائمة الرئيسية">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    'rounded-md px-3.5 py-2 text-sm font-medium transition-colors',
                    isActive ? 'text-primary' : 'text-foreground/80 hover:text-primary',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
            <MoreMenu />
          </nav>

          <div className="flex items-center gap-1">
            <Link
              to="/search"
              aria-label="بحث"
              className="flex h-10 w-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-secondary"
            >
              <Search className="h-5 w-5" />
            </Link>
            <ThemeToggle />
            <div className="ms-1 hidden lg:block">
              <UserMenu />
            </div>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="فتح القائمة"
              className="flex h-10 w-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-secondary lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Container>

      <Drawer open={menuOpen} onClose={() => setMenuOpen(false)} label="قائمة التنقل" side="right">
        <div className="flex flex-col p-6 pt-16">
          <Logo />
          <nav className="mt-8 flex flex-col gap-1" aria-label="قائمة الجوال">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'rounded-md px-3 py-3 text-base font-medium transition-colors',
                    isActive ? 'bg-secondary text-primary' : 'text-foreground hover:bg-secondary',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div className="my-2 border-t border-border" />
            {moreItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'rounded-md px-3 py-3 text-base font-medium transition-colors',
                    isActive ? 'bg-secondary text-primary' : 'text-foreground hover:bg-secondary',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-6 border-t border-border pt-6" onClick={() => setMenuOpen(false)}>
            <UserMenu />
          </div>

          <button
            onClick={() => {
              setMenuOpen(false)
              navigate('/contact')
            }}
            className="mt-6 inline-flex h-12 items-center justify-center rounded-md bg-primary text-base font-medium text-primary-foreground"
          >
            تواصل معنا
          </button>
        </div>
      </Drawer>
    </header>
  )
}
