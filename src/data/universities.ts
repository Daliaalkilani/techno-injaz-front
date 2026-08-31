import type { University } from './types'

export const universities: University[] = [
  { slug: 'aleppo', name: 'جامعة حلب', city: 'حلب' },
  { slug: 'albaath', name: 'جامعة البعث', city: 'حمص' },
  { slug: 'npu', name: 'الجامعة الوطنية الخاصة', city: 'حماة' },
  { slug: 'tishreen', name: 'جامعة تشرين', city: 'اللاذقية' },
  { slug: 'damascus', name: 'جامعة دمشق', city: 'دمشق' },
]

export function universityBySlug(slug: string): University | undefined {
  return universities.find((u) => u.slug === slug)
}
