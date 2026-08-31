export interface Stat {
  value: number
  suffix?: string
  label: string
}

export const stats: Stat[] = [
  { value: 130, label: 'مشروعًا منفّذًا' },
  { value: 100, label: 'مشروع تخرّج' },
  { value: 20, label: 'مجالًا تقنيًا' },
  { value: 2700, label: 'صورة وفيديو' },
]

export const officeInfo = {
  name: 'تكنو إنجاز',
  nameEn: 'TECHNO ENJAZ',
  tagline: 'مكتب هندسي وتقني',
  phone: '0958794195',
  phoneIntl: '963958794195',
  instagram: 'TECHNO_ENJAZ',
  instagramUrl: 'https://instagram.com/TECHNO_ENJAZ',
  address: 'حماة – ساحة العاصي – بناء الخاني – بجوار أفران السلام – الطابق الرابع',
  mapsUrl:
    "https://www.google.com/maps/place/35%C2%B007'44.4%22N+36%C2%B045'14.4%22E/@35.1289918,36.7561901,17z/data=!3m1!4b1!4m4!3m3!8m2!3d35.1289918!4d36.7540014?hl=ar",
}
