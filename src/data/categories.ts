import type { Category } from './types'
import { img, photos } from './images'

export const categories: Category[] = [
  {
    slug: 'robotics',
    name: 'الروبوتيك',
    nameEn: 'Robotics',
    description:
      'أنظمة روبوتية متكاملة تجمع بين الميكانيك والتحكم والبرمجة — من الأذرع الآلية إلى الروبوتات المتنقلة ذاتية القيادة.',
    icon: 'bot',
    image: img(photos.robotics[0], 900, 600),
  },
  {
    slug: 'ai',
    name: 'الذكاء الاصطناعي',
    nameEn: 'Artificial Intelligence',
    description: 'حلول تعلّم الآلة ورؤية الحاسب ومعالجة اللغة لبناء أنظمة قادرة على التحليل واتخاذ القرار.',
    icon: 'brain',
    image: img(photos.ai[0], 900, 600),
  },
  {
    slug: 'iot',
    name: 'إنترنت الأشياء',
    nameEn: 'IoT',
    description: 'ربط الأجهزة والحساسات بالسحابة لبناء أنظمة مراقبة وتحكم ذكية عن بُعد.',
    icon: 'radio',
    image: img(photos.electronics[1], 900, 600),
  },
  {
    slug: 'embedded',
    name: 'الأنظمة المدمجة',
    nameEn: 'Embedded Systems',
    description: 'تصميم وبرمجة المتحكمات الدقيقة مثل Arduino وESP32 وSTM32 لتطبيقات الزمن الحقيقي.',
    icon: 'cpu',
    image: img(photos.electronics[0], 900, 600),
  },
  {
    slug: 'web',
    name: 'تطوير الويب',
    nameEn: 'Web Development',
    description: 'منصات وتطبيقات ويب حديثة قابلة للتوسّع بواجهات سريعة وأنظمة خلفية موثوقة.',
    icon: 'code',
    image: img(photos.lab[0], 900, 600),
  },
  {
    slug: 'mobile',
    name: 'تطبيقات الموبايل',
    nameEn: 'Mobile Applications',
    description: 'تطبيقات جوال أصيلة ومتعددة المنصات موجّهة للمستخدم النهائي.',
    icon: 'smartphone',
    image: img(photos.lab[2], 900, 600),
  },
  {
    slug: 'networks',
    name: 'الشبكات والاتصالات',
    nameEn: 'Networks',
    description: 'تصميم وتحليل الشبكات وأنظمة الاتصالات وبروتوكولاتها.',
    icon: 'network',
    image: img(photos.electronics[2], 900, 600),
  },
  {
    slug: 'vision',
    name: 'رؤية الحاسب',
    nameEn: 'Computer Vision',
    description: 'معالجة الصور والفيديو للكشف والتتبّع والتعرّف على الأنماط في الزمن الحقيقي.',
    icon: 'eye',
    image: img(photos.ai[1], 900, 600),
  },
]

export function categoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}

export function categoryName(slug: string): string {
  return categoryBySlug(slug)?.name ?? slug
}
