import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { AccountStatus, SocialAccount, User } from '../data/users'
import { img, photos } from '../data/images'

const KEY = 'te-account'

export interface RegisterInput {
  name: string
  email: string
  password: string
  avatar?: string
  bio?: string
  specialty?: string
  university?: string
  graduationYear?: number
  social?: SocialAccount[]
}

interface AuthValue {
  user: User | null
  register: (input: RegisterInput) => void
  login: (email: string, password: string) => { ok: boolean; error?: string }
  loginAsDemo: () => void
  logout: () => void
  updateProfile: (patch: Partial<User>) => void
  setStatus: (status: AccountStatus) => void // demo helper to simulate admin review
}

const AuthContext = createContext<AuthValue | null>(null)

function read(): User | null {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as User) : null
  } catch {
    return null
  }
}

function write(user: User | null) {
  if (user) localStorage.setItem(KEY, JSON.stringify(user))
  else localStorage.removeItem(KEY)
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(read)

  useEffect(() => {
    const sync = () => setUser(read())
    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [])

  const persist = useCallback((next: User | null) => {
    write(next)
    setUser(next)
  }, [])

  const register = useCallback(
    (input: RegisterInput) => {
      const next: User = {
        id: `u-${Date.now()}`,
        name: input.name,
        email: input.email,
        avatar: input.avatar || img(photos.people[1], 240, 240),
        bio: input.bio || '',
        specialty: input.specialty || '',
        university: input.university,
        graduationYear: input.graduationYear,
        status: 'pending',
        social: input.social ?? [],
        articleCount: 0,
        contributionCount: 0,
      }
      persist(next)
    },
    [persist],
  )

  const login = useCallback(
    (email: string, _password: string) => {
      const existing = read()
      if (existing && existing.email === email) {
        setUser(existing)
        return { ok: true }
      }
      return { ok: false, error: 'لا يوجد حساب مطابق. يرجى إنشاء حساب جديد أو تجربة الدخول التجريبي.' }
    },
    [],
  )

  const loginAsDemo = useCallback(() => {
    const demo: User = {
      id: 'u-demo',
      name: 'مستخدم تجريبي',
      email: 'demo@techno-enjaz.com',
      avatar: img(photos.people[1], 240, 240),
      bio: 'حساب تجريبي معتمد لاستعراض ميزات المجتمع من تعليقات وتقييمات.',
      specialty: 'هندسة معلوماتية',
      university: 'aleppo',
      graduationYear: 2025,
      status: 'approved',
      social: [{ platform: 'github', url: 'https://github.com/' }],
      articleCount: 0,
      contributionCount: 0,
    }
    persist(demo)
  }, [persist])

  const logout = useCallback(() => persist(null), [persist])

  const updateProfile = useCallback(
    (patch: Partial<User>) => setUser((u) => (u ? (write({ ...u, ...patch }), { ...u, ...patch }) : u)),
    [],
  )

  const setStatus = useCallback(
    (status: AccountStatus) => setUser((u) => (u ? (write({ ...u, status }), { ...u, status }) : u)),
    [],
  )

  const value = useMemo<AuthValue>(
    () => ({ user, register, login, loginAsDemo, logout, updateProfile, setStatus }),
    [user, register, login, loginAsDemo, logout, updateProfile, setStatus],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export const statusLabels: Record<AccountStatus, string> = {
  pending: 'حسابك قيد المراجعة.',
  approved: 'تم تفعيل حسابك ويمكنك الآن المشاركة في الموقع.',
  rejected: 'لم تتم الموافقة على الحساب حاليًا.',
  suspended: 'تم تعليق الحساب مؤقتًا.',
}
