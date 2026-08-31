import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User as UserIcon, LogOut, Pencil, FileText, ChevronDown } from 'lucide-react'
import { useAuth } from '../../lib/auth'
import { cn } from '../../lib/utils'

export function UserMenu() {
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    window.addEventListener('mousedown', onClick)
    return () => window.removeEventListener('mousedown', onClick)
  }, [open])

  if (!user) {
    return (
      <div className="flex items-center gap-1">
        <Link
          to="/login"
          className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
        >
          تسجيل الدخول
        </Link>
        <Link
          to="/register"
          className="rounded-md border border-border px-3 py-2 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
        >
          إنشاء حساب
        </Link>
      </div>
    )
  }

  const items = [
    { label: 'ملفي الشخصي', icon: UserIcon, to: `/profile/${user.id}` },
    { label: 'تعديل الملف الشخصي', icon: Pencil, to: `/profile/${user.id}?edit=1` },
    { label: 'مقالاتي', icon: FileText, to: `/profile/${user.id}#articles` },
  ]

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full border border-border p-0.5 pl-2.5 transition-colors hover:border-primary/50"
        aria-label="قائمة المستخدم"
      >
        <img src={user.avatar} alt="" className="h-8 w-8 rounded-full object-cover" />
        <span className="hidden max-w-24 truncate text-sm font-medium sm:inline">{user.name}</span>
        <ChevronDown className={cn('h-4 w-4 text-muted-foreground transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-40 mt-2 w-56 overflow-hidden rounded-xl border border-border bg-card p-1.5 shadow-xl animate-fade-up">
          <div className="border-b border-border px-3 py-2.5">
            <div className="truncate text-sm font-semibold">{user.name}</div>
            <div className="truncate text-xs text-muted-foreground" dir="ltr">
              {user.email}
            </div>
          </div>
          {items.map((it) => (
            <Link
              key={it.label}
              to={it.to}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm transition-colors hover:bg-secondary"
            >
              <it.icon className="h-4.5 w-4.5 text-muted-foreground" />
              {it.label}
            </Link>
          ))}
          <button
            onClick={() => {
              logout()
              setOpen(false)
              navigate('/')
            }}
            className="flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-sm text-destructive transition-colors hover:bg-destructive/10"
          >
            <LogOut className="h-4.5 w-4.5" />
            تسجيل الخروج
          </button>
        </div>
      )}
    </div>
  )
}
