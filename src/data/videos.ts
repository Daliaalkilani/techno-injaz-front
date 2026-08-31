import type { Video } from './types'
import { img, photos } from './images'

const DEMO_VIDEO = 'aqz-KE-bpKQ'

export const videos: Video[] = [
  {
    id: 'v1',
    title: 'روبوت التوصيل الذاتي أثناء الملاحة',
    youtubeId: DEMO_VIDEO,
    category: 'robotics',
    duration: '3:12',
    year: 2024,
    thumbnail: img(photos.robotics[0], 640, 400),
  },
  {
    id: 'v2',
    title: 'الذراع الآلية بستة محاور',
    youtubeId: DEMO_VIDEO,
    category: 'robotics',
    duration: '2:36',
    year: 2023,
    thumbnail: img(photos.robotics[2], 640, 400),
  },
  {
    id: 'v3',
    title: 'ترجمة لغة الإشارة في الزمن الحقيقي',
    youtubeId: DEMO_VIDEO,
    category: 'vision',
    duration: '1:48',
    year: 2024,
    thumbnail: img(photos.ai[1], 640, 400),
  },
  {
    id: 'v4',
    title: 'قيادة طائرة مسيّرة بالإيماءات',
    youtubeId: DEMO_VIDEO,
    category: 'ai',
    duration: '2:14',
    year: 2024,
    thumbnail: img(photos.ai[0], 640, 400),
  },
  {
    id: 'v5',
    title: 'لوحة تحكم نظام الري الذكي',
    youtubeId: DEMO_VIDEO,
    category: 'iot',
    duration: '2:05',
    year: 2023,
    thumbnail: img(photos.electronics[1], 640, 400),
  },
  {
    id: 'v6',
    title: 'روبوت تتبّع المسار عالي السرعة',
    youtubeId: DEMO_VIDEO,
    category: 'embedded',
    duration: '0:58',
    year: 2022,
    thumbnail: img(photos.robotics[3], 640, 400),
  },
  {
    id: 'v7',
    title: 'تشخيص أمراض النبات من الصورة',
    youtubeId: DEMO_VIDEO,
    category: 'ai',
    duration: '1:10',
    year: 2024,
    thumbnail: img(photos.ai[3], 640, 400),
  },
  {
    id: 'v8',
    title: 'التحكم بالمنزل الذكي عبر التطبيق',
    youtubeId: DEMO_VIDEO,
    category: 'iot',
    duration: '1:22',
    year: 2023,
    thumbnail: img(photos.electronics[3], 640, 400),
  },
]
