import { type ReactNode } from 'react'
import { SearchX, AlertTriangle, Inbox } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Button } from './primitives'

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded-md bg-muted', className)} />
}

export function ProjectCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      <div className="space-y-3 p-5">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-5 w-4/5" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex gap-2 pt-1">
          <Skeleton className="h-6 w-14" />
          <Skeleton className="h-6 w-14" />
        </div>
      </div>
    </div>
  )
}

function StateShell({
  icon,
  title,
  message,
  children,
}: {
  icon: ReactNode
  title: string
  message?: string
  children?: ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/40 px-6 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-muted-foreground">
        {icon}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      {message && <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">{message}</p>}
      {children && <div className="mt-5">{children}</div>}
    </div>
  )
}

export function EmptyState({
  title = 'لا توجد نتائج',
  message,
  actionLabel,
  onAction,
}: {
  title?: string
  message?: string
  actionLabel?: string
  onAction?: () => void
}) {
  return (
    <StateShell icon={<Inbox className="h-6 w-6" />} title={title} message={message}>
      {actionLabel && onAction && (
        <Button variant="outline" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </StateShell>
  )
}

export function NoResultsState({ onClear }: { onClear?: () => void }) {
  return (
    <StateShell
      icon={<SearchX className="h-6 w-6" />}
      title="لم نجد نتائج مطابقة"
      message="جرّب تعديل كلمات البحث أو تغيير الفلاتر المختارة."
    >
      {onClear && (
        <Button variant="outline" onClick={onClear}>
          مسح الفلاتر
        </Button>
      )}
    </StateShell>
  )
}

export function ErrorState({ message = 'تعذّر تحميل البيانات.', onRetry }: { message?: string; onRetry?: () => void }) {
  return (
    <StateShell icon={<AlertTriangle className="h-6 w-6 text-destructive" />} title="حدث خطأ" message={message}>
      {onRetry && <Button onClick={onRetry}>إعادة المحاولة</Button>}
    </StateShell>
  )
}
