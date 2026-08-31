import { Container, LinkButton } from '../components/ui/primitives'
import { useSeo } from '../lib/seo'

export default function NotFound() {
  useSeo('الصفحة غير موجودة')
  return (
    <div className="flex min-h-[70vh] items-center bg-blueprint">
      <Container className="text-center">
        <div className="font-mono text-7xl font-bold tracking-tight text-primary sm:text-8xl">٤٠٤</div>
        <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">يبدو أن هذه الصفحة خرجت عن المسار</h1>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          الصفحة التي تبحث عنها غير موجودة أو تم نقلها. يمكنك العودة إلى الرئيسية أو استكشاف مشاريعنا.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <LinkButton to="/" size="lg">
            العودة للرئيسية
          </LinkButton>
          <LinkButton to="/projects" variant="outline" size="lg">
            استكشف المشاريع
          </LinkButton>
        </div>
      </Container>
    </div>
  )
}
