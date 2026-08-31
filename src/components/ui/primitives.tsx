import { type ReactNode, type ButtonHTMLAttributes, forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'

/* ---- Container & Section ------------------------------------------------ */
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('mx-auto w-full max-w-7xl px-5 sm:px-8', className)}>{children}</div>
}

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode
  className?: string
  id?: string
}) {
  return (
    <section id={id} className={cn('py-16 sm:py-24', className)}>
      {children}
    </section>
  )
}

/* ---- Section heading eyebrow ------------------------------------------- */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.18em] text-primary',
        className,
      )}
    >
      <span className="h-px w-6 bg-primary/60" aria-hidden />
      {children}
    </span>
  )
}

/* ---- Button ------------------------------------------------------------- */
type Variant = 'primary' | 'secondary' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const variantClasses: Record<Variant, string> = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/70',
  outline: 'border border-border bg-transparent text-foreground hover:bg-secondary/60',
  ghost: 'bg-transparent text-foreground hover:bg-secondary/60',
}
const sizeClasses: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-sm gap-1.5',
  md: 'h-11 px-5 text-sm gap-2',
  lg: 'h-12 px-7 text-base gap-2.5',
}

const baseButton =
  'inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap select-none'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, ...props }, ref) => (
    <button ref={ref} className={cn(baseButton, variantClasses[variant], sizeClasses[size], className)} {...props} />
  ),
)
Button.displayName = 'Button'

export function LinkButton({
  to,
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
}: {
  to?: string
  href?: string
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}) {
  const classes = cn(baseButton, variantClasses[variant], sizeClasses[size], className)
  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  }
  return (
    <Link to={to ?? '#'} className={classes}>
      {children}
    </Link>
  )
}

/* ---- Badge & Tag -------------------------------------------------------- */
export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full bg-primary/10 px-3 py-1 font-mono text-[11px] font-medium tracking-wide text-primary',
        className,
      )}
    >
      {children}
    </span>
  )
}

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border border-border bg-secondary/50 px-2.5 py-1 font-mono text-xs text-muted-foreground',
        className,
      )}
    >
      {children}
    </span>
  )
}

/* ---- Card --------------------------------------------------------------- */
export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('rounded-xl border border-border bg-card text-card-foreground', className)}>{children}</div>
  )
}

/* ---- Page header -------------------------------------------------------- */
export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string
  title: string
  description?: string
  children?: ReactNode
}) {
  return (
    <div className="border-b border-border bg-blueprint">
      <Container className="py-14 sm:py-20">
        {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
        <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">{title}</h1>
        {description && <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{description}</p>}
        {children && <div className="mt-6">{children}</div>}
      </Container>
    </div>
  )
}
