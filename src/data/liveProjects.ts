import type { LiveCategory, LiveProject } from './types'
import { img, photos } from './images'

/** Subject-matter groupings used by the projects filter system (spec §37). */
export const liveCategories: LiveCategory[] = [
  { slug: 'ai', name: 'الذكاء الاصطناعي', emoji: '🤖' },
  { slug: 'business', name: 'الأعمال والأنظمة', emoji: '💼' },
  { slug: 'engineering', name: 'الهندسة والإلكترونيات', emoji: '⚙️' },
  { slug: 'devtools', name: 'أدوات المطورين', emoji: '💻' },
  { slug: 'ecommerce', name: 'المتاجر الإلكترونية', emoji: '🛍️' },
  { slug: 'portfolio', name: 'المواقع والخدمات', emoji: '👨‍💻' },
]

export function liveCategoryBySlug(slug: string): LiveCategory | undefined {
  return liveCategories.find((c) => c.slug === slug)
}

export function liveCategoryName(slug: string): string {
  return liveCategoryBySlug(slug)?.name ?? slug
}

/**
 * Real, currently-deployed projects. URLs are used verbatim (spec §44) — live
 * projects open their real deployment in a new tab; offline projects would fall
 * back to an internal detail page.
 */
export const liveProjects: LiveProject[] = [
  {
    id: 'securecity',
    slug: 'securecity',
    name: 'SecureCity',
    category: 'ai',
    type: 'website',
    description:
      'منصة تعليمية تفاعلية للأمن السيبراني تعتمد على التلعيب والذكاء الاصطناعي، وتوفر محاكاة للهجمات والدفاع عن البنية التحتية مع تحديات فردية وجماعية لتطوير مهارات الأمن السيبراني.',
    image: img(photos.ai[0], 900, 600),
    url: 'https://taima-alwani.pages.dev/',
    live: true,
  },
  {
    id: 'ai-cv-builder',
    slug: 'ai-cv-builder',
    name: 'AI CV Builder',
    category: 'ai',
    type: 'website',
    description: 'منشئ سير ذاتية ذكي يساعد المستخدم على إنشاء وتنظيم CV احترافي باستخدام الذكاء الاصطناعي.',
    image: img(photos.ai[2], 900, 600),
    url: 'https://cv.abdalgani.com/',
    live: true,
  },
  {
    id: 'projectforge',
    slug: 'projectforge',
    name: 'ProjectForge',
    category: 'ai',
    type: 'website',
    description:
      'منصة ذكية تساعد الطلاب على اختيار أفكار مشاريع التخرج وتطويرها، مع اقتراح خطة تنفيذ ومراحل وموارد للمشروع.',
    image: img(photos.ai[3], 900, 600),
    url: 'https://projectforge-e3q.pages.dev/',
    live: true,
  },
  {
    id: 'hisab-erp',
    slug: 'hisab-erp',
    name: 'حِساب ERP',
    category: 'business',
    type: 'website',
    description: 'نظام ERP محاسبي لإدارة العمليات المالية والمحاسبية، وتنظيم الحسابات والمعاملات ضمن نظام متكامل.',
    image: img(photos.business[0], 900, 600),
    url: 'https://hisab-erp.pages.dev/',
    live: true,
  },
  {
    id: 'arduino-lab',
    slug: 'arduino-lab',
    name: 'Arduino Lab',
    category: 'engineering',
    type: 'hardware',
    description:
      'مختبر Arduino تفاعلي يحاكي بناء الدوائر الإلكترونية، ويسمح بتوصيل المكونات والحساسات والمحركات وكتابة وتشغيل كود Arduino مع عرض المخطط الكهربائي بشكل حي.',
    image: img(photos.electronics[0], 900, 600),
    url: 'https://arduino-lab.pages.dev/',
    live: true,
  },
  {
    id: 'cable-ksa',
    slug: 'cable-ksa',
    name: 'Cable KSA',
    category: 'engineering',
    type: 'website',
    description:
      'موقع خدمات متخصص في فحص وصيانة وإصلاح الكابلات الكهربائية، بما يشمل كشف الأعطال تحت الأرض، فحص العزل، إصلاح الكابلات وخدمات الطوارئ على مدار الساعة.',
    image: img(photos.electronics[2], 900, 600),
    url: 'https://cableksa.com/',
    live: true,
  },
  {
    id: 'cable-experts',
    slug: 'cable-experts',
    name: 'Cable Experts',
    category: 'engineering',
    type: 'website',
    description:
      'منصة لخدمات كشف وتشخيص وصيانة أعطال الكابلات الكهربائية باستخدام أجهزة متخصصة لتحديد أماكن الأعطال بدقة، مع خدمات الإصلاح والفحص والصيانة.',
    image: img(photos.electronics[4], 900, 600),
    url: 'https://cabltexperts.com/',
    live: true,
  },
  {
    id: 'md-2-pdf',
    slug: 'markdown-to-pdf',
    name: 'Markdown → PDF',
    category: 'devtools',
    type: 'website',
    description:
      'أداة لتحويل محتوى وملفات Markdown إلى PDF، مع دعم كامل للعربية وRTL، ورفع عدة ملفات، ومعاينة المحتوى قبل التصدير.',
    image: img(photos.web[0], 900, 600),
    url: 'https://md-2-pdf.pages.dev/',
    live: true,
  },
  {
    id: 'wpu-cover',
    slug: 'wpu-cover',
    name: 'WPU Cover',
    category: 'devtools',
    type: 'website',
    description: 'أداة لإنشاء أغلفة الكتب والأبحاث والأطروحات الأكاديمية بتنسيق جاهز للاستخدام والطباعة.',
    image: img(photos.web[3], 900, 600),
    url: 'https://wpu-cover.pages.dev/',
    live: true,
  },
  {
    id: 'dermocean',
    slug: 'dermocean',
    name: 'DERMOCÉAN',
    category: 'ecommerce',
    type: 'website',
    description:
      'موقع تجاري متخصص في منتجات العناية بالبشرة والتقشير بالطحالب البحرية، مع عرض المنتجات وتصنيف مشاكل البشرة وبروتوكولات العلاج المهنية.',
    image: img(photos.ecommerce[0], 900, 600),
    url: 'https://dermocean-site.hmsathayrt1.workers.dev/',
    live: true,
  },
  {
    id: 'dermocean-preview',
    slug: 'dermocean-preview',
    name: 'DERMOCÉAN Preview',
    category: 'ecommerce',
    type: 'website',
    description:
      'نسخة Preview من منصة DERMOCÉAN، تعرض منتجات العناية بالبشرة، ومشاكل مثل التصبغات وحب الشباب والتجاعيد والمسام، بالإضافة إلى بروتوكولات تطبيق مختلفة.',
    image: img(photos.ecommerce[3], 900, 600),
    url: 'https://dermocean-preview.pages.dev/',
    live: true,
  },
  {
    id: 'modeya',
    slug: 'modeya',
    name: 'MODEYA',
    category: 'ecommerce',
    type: 'website',
    description: 'متجر إلكتروني لعلامة أزياء، مصمم كواجهة Fashion Boutique لعرض المنتجات وتقديم تجربة تسوق رقمية.',
    image: img(photos.ecommerce[1], 900, 600),
    url: 'https://modeya.abdalgani.com/',
    live: true,
  },
  {
    id: 'khazama',
    slug: 'khazama-store',
    name: 'خزامة | Khazama Store',
    category: 'ecommerce',
    type: 'website',
    description:
      'متجر إلكتروني لجمعية خزامة لطلب الفطائر والبيتزا والمنتجات الغذائية، مع عرض المكونات وإضافة المنتجات إلى السلة وإرسال الطلب عبر واتساب.',
    image: img(photos.ecommerce[2], 900, 600),
    url: 'https://khazama-store.abdalganih2.workers.dev/',
    live: true,
  },
  {
    id: 'abdalgani-consultant',
    slug: 'abdalgani-tech-consultant',
    name: 'Abdalgani Tech Consultant',
    category: 'portfolio',
    type: 'website',
    description:
      'موقع Portfolio واستشارات تقنية يعرض مشاريع في الروبوتيك، الأنظمة المدمجة، الطاقة الشمسية، إنترنت الأشياء، الذكاء الاصطناعي، Arduino وتطبيقات الويب، مع إمكانية طلب استشارة.',
    image: img(photos.web[2], 900, 600),
    url: 'https://abdalgani-rebuild-dn9.pages.dev/',
    live: true,
  },
]

export function liveProjectsByCategory(slug: string): LiveProject[] {
  if (!slug || slug === 'all') return liveProjects
  return liveProjects.filter((p) => p.category === slug)
}
