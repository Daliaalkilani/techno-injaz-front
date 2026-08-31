export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}

/** Convert Western digits to Arabic-Indic for display. */
const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩']
export function toArabicDigits(value: number | string): string {
  return String(value).replace(/[0-9]/g, (d) => arabicDigits[Number(d)])
}

/** Format a large count like 130 -> "+130". */
export function formatStat(value: number): string {
  return `+${toArabicDigits(value)}`
}

const arMonths = [
  'يناير',
  'فبراير',
  'مارس',
  'أبريل',
  'مايو',
  'يونيو',
  'يوليو',
  'أغسطس',
  'سبتمبر',
  'أكتوبر',
  'نوفمبر',
  'ديسمبر',
]

export function formatArabicDate(iso: string): string {
  const d = new Date(iso)
  return `${toArabicDigits(d.getDate())} ${arMonths[d.getMonth()]} ${toArabicDigits(d.getFullYear())}`
}
