import { useMemo, useState } from 'react'
import { PageHeader, Container } from '../components/ui/primitives'
import { Select } from '../components/ui/fields'
import { VideoCard } from '../components/content/VideoCard'
import { VideoModal } from '../components/content/VideoModal'
import { EmptyState } from '../components/ui/states'
import { videos } from '../data/videos'
import { categories } from '../data/categories'
import type { Video } from '../data/types'
import { toArabicDigits } from '../lib/utils'
import { useSeo } from '../lib/seo'

export default function Videos() {
  useSeo('فيديوهات المشاريع', 'شاهد مشاريعنا التقنية والهندسية أثناء العمل في مكتبة الفيديو.')
  const [cat, setCat] = useState('')
  const [year, setYear] = useState('')
  const [active, setActive] = useState<Video | null>(null)

  const years = useMemo(() => Array.from(new Set(videos.map((v) => v.year))).sort((a, b) => b - a), [])
  const usedCats = useMemo(() => new Set(videos.map((v) => v.category)), [])

  const filtered = videos.filter((v) => (!cat || v.category === cat) && (!year || v.year === Number(year)))

  return (
    <>
      <PageHeader eyebrow="شاهد بنفسك" title="فيديوهات المشاريع" description="مجموعة من الفيديوهات التي توثّق مشاريعنا أثناء التشغيل والاختبار." />
      <Container className="py-10">
        <div className="mb-8 flex flex-wrap gap-3">
          <Select value={cat} onChange={(e) => setCat(e.target.value)} className="w-48">
            <option value="">كل المجالات</option>
            {categories
              .filter((c) => usedCats.has(c.slug))
              .map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
          </Select>
          <Select value={year} onChange={(e) => setYear(e.target.value)} className="w-40">
            <option value="">كل السنوات</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {toArabicDigits(y)}
              </option>
            ))}
          </Select>
        </div>

        {filtered.length === 0 ? (
          <EmptyState title="لا توجد فيديوهات" message="لا توجد فيديوهات مطابقة لاختيارك حاليًا." />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((v) => (
              <VideoCard key={v.id} video={v} onPlay={setActive} />
            ))}
          </div>
        )}
      </Container>

      <VideoModal open={!!active} onClose={() => setActive(null)} youtubeId={active?.youtubeId ?? null} title={active?.title} />
    </>
  )
}
