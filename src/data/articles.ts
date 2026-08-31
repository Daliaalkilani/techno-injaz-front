import type { Article } from './types'
import { img, photos } from './images'

export const articles: Article[] = [
  {
    slug: 'how-slam-navigation-works',
    title: 'كيف يتنقّل الروبوت بمفرده؟ شرح مبسّط لتقنية SLAM',
    excerpt: 'نستعرض كيف يبني الروبوت خريطة للمكان ويحدّد موقعه فيها في آنٍ واحد، وكيف يخطّط مساره ويتجنّب العوائق.',
    category: 'robotics',
    categories: ['robotics', 'ai', 'embedded'],
    authorId: 'u-anas',
    coverImage: img(photos.robotics[0], 1200, 700),
    readingMinutes: 7,
    date: '2024-05-12',
    projectSlug: 'autonomous-delivery-robot',
    sections: [
      {
        heading: 'المقدمة',
        body: [
          'الملاحة الذاتية من أصعب التحديات في الروبوتات المتنقلة. لكي يتحرّك الروبوت بأمان عليه أن يعرف أين هو، وكيف يبدو المكان من حوله، وإلى أين يريد الذهاب.',
          'تجيب تقنية SLAM — أي التموضع وبناء الخريطة في آنٍ واحد — عن السؤالين الأولين معًا.',
        ],
      },
      {
        heading: 'كيف تعمل؟',
        body: [
          'يجمع الروبوت قراءات من حساسات مثل الليدار والكاميرا، ويقارنها عبر الزمن ليقدّر حركته ويبني خريطة تدريجية للبيئة.',
          'كلما تحرّك الروبوت أكثر، تحسّنت دقّة الخريطة وموقعه ضمنها من خلال تصحيح الأخطاء المتراكمة.',
        ],
      },
      {
        heading: 'تخطيط المسار وتجنّب العوائق',
        body: [
          'بعد بناء الخريطة، تُستخدم خوارزميات التخطيط لإيجاد أقصر مسار آمن نحو الهدف.',
          'وعند ظهور عائق مفاجئ، تعيد طبقة التخطيط المحلي حساب المسار فورًا لتفادي الاصطدام.',
        ],
      },
      { heading: 'الخلاصة', body: ['SLAM هي حجر الأساس لأي روبوت متنقل ذكي، وفهمها يفتح الباب لتطبيقات لا حصر لها.'] },
    ],
  },
  {
    slug: 'iot-mqtt-basics',
    title: 'بروتوكول MQTT: العمود الفقري لإنترنت الأشياء',
    excerpt: 'لماذا يُعدّ MQTT الخيار الأمثل لربط آلاف الأجهزة منخفضة الموارد بالسحابة؟',
    category: 'iot',
    categories: ['iot', 'embedded', 'networks'],
    authorId: 'u-samar',
    coverImage: img(photos.electronics[1], 1200, 700),
    readingMinutes: 5,
    date: '2023-11-03',
    projectSlug: 'smart-irrigation-iot',
    sections: [
      {
        heading: 'ما هو MQTT؟',
        body: [
          'MQTT بروتوكول خفيف قائم على مبدأ النشر والاشتراك، صُمّم خصيصًا للأجهزة محدودة الطاقة والاتصال غير المستقر.',
        ],
      },
      {
        heading: 'النشر والاشتراك',
        body: [
          'بدلًا من الاتصال المباشر بين الأجهزة، ترسل الأجهزة رسائلها إلى وسيط مركزي (Broker) على مواضيع محدّدة.',
          'يشترك أي جهاز مهتم بموضوع معيّن ليصله كل جديد فيه دون معرفة مصدره.',
        ],
      },
      { heading: 'لماذا يناسب إنترنت الأشياء؟', body: ['استهلاك ضئيل للنطاق والطاقة، ودعم لجودة التسليم، وقابلية توسّع عالية.'] },
    ],
  },
  {
    slug: 'computer-vision-hand-tracking',
    title: 'تتبّع اليد بالكاميرا: من البكسل إلى الإشارة',
    excerpt: 'كيف نحوّل صورة يد إلى مجموعة نقاط قابلة للتحليل ثم إلى أمر أو حرف؟',
    category: 'vision',
    categories: ['vision', 'ai'],
    authorId: 'u-reem',
    coverImage: img(photos.ai[1], 1200, 700),
    readingMinutes: 6,
    date: '2024-02-20',
    projectSlug: 'sign-language-recognition',
    sections: [
      {
        heading: 'استخراج نقاط اليد',
        body: ['تعتمد الحلول الحديثة على نماذج جاهزة تُخرج إحداثيات نقاط المفاصل الرئيسية لليد من كل إطار فيديو.'],
      },
      {
        heading: 'من النقاط إلى المعنى',
        body: [
          'بعد الحصول على النقاط، نُطبّع إحداثياتها ثم نمرّرها إلى نموذج تصنيف يتعرّف على الإشارة أو الحرف.',
          'يمكن بعد ذلك تجميع الحروف لتكوين كلمات وجُمل كاملة.',
        ],
      },
      { heading: 'تحديات عملية', body: ['الإضاءة، وزوايا الكاميرا، وتشابه بعض الإشارات، كلها عوامل تتطلّب معالجة دقيقة.'] },
    ],
  },
  {
    slug: 'cnn-image-classification',
    title: 'الشبكات الالتفافية CNN وتصنيف الصور',
    excerpt: 'لماذا أحدثت الشبكات الالتفافية ثورة في معالجة الصور، وكيف نبني نموذجًا فعّالًا؟',
    category: 'ai',
    categories: ['ai', 'vision'],
    authorId: 'u-reem',
    coverImage: img(photos.ai[3], 1200, 700),
    readingMinutes: 8,
    date: '2024-04-01',
    projectSlug: 'crop-disease-detection',
    sections: [
      { heading: 'فكرة الالتفاف', body: ['تتعلّم الشبكة مرشّحات تكتشف الحواف والأنماط تدريجيًا من البسيط إلى المعقّد عبر طبقاتها.'] },
      {
        heading: 'التدريب والتحقّق',
        body: ['نقسّم البيانات إلى تدريب واختبار، ونراقب الدقّة والخطأ لتفادي فرط التخصيص.'],
      },
      { heading: 'النشر على الأجهزة', body: ['يمكن ضغط النموذج وتحويله ليعمل على الهاتف مباشرة دون خادم.'] },
    ],
  },
  {
    slug: 'scalable-web-architecture',
    title: 'بناء تطبيقات ويب قابلة للتوسّع',
    excerpt: 'مبادئ معمارية تساعدك على بناء منصّات تتحمّل النمو دون إعادة كتابة كاملة.',
    category: 'web',
    categories: ['web', 'networks'],
    authorId: 'u-abdalgani',
    coverImage: img(photos.lab[0], 1200, 700),
    readingMinutes: 6,
    date: '2024-06-15',
    projectSlug: 'ecommerce-platform',
    sections: [
      { heading: 'الفصل بين الطبقات', body: ['فصل الواجهة عن منطق العمل عن قاعدة البيانات يسهّل الصيانة والتوسّع.'] },
      { heading: 'التخزين المؤقت', body: ['طبقات التخزين المؤقت الذكية تقلّل الحمل على قاعدة البيانات وتسرّع الاستجابة.'] },
      { heading: 'المراقبة', body: ['لا يمكن توسيع ما لا تقيسه؛ المراقبة والتسجيل أساس أي نظام موثوق.'] },
    ],
  },
  {
    slug: 'pid-control-explained',
    title: 'التحكم PID بلغة مفهومة',
    excerpt: 'ثلاثة حدود بسيطة تقف خلف استقرار معظم الأنظمة من الروبوتات إلى الطائرات.',
    category: 'embedded',
    categories: ['embedded', 'robotics'],
    authorId: 'u-abdalgani',
    coverImage: img(photos.electronics[0], 1200, 700),
    readingMinutes: 5,
    date: '2023-09-22',
    projectSlug: 'line-follower-robot',
    sections: [
      { heading: 'الحدّ التناسبي', body: ['يستجيب للخطأ الحالي: كلما زاد الانحراف زادت قوة التصحيح.'] },
      { heading: 'الحدّان التكاملي والتفاضلي', body: ['يعالج التكاملي الأخطاء المتراكمة، ويخفّف التفاضلي الاهتزاز عبر توقّع التغيّر.'] },
      { heading: 'الضبط العملي', body: ['ضبط المعاملات تجريبيًا هو مفتاح الوصول إلى استجابة سريعة ومستقرة.'] },
    ],
  },
  {
    slug: 'esp32-getting-started',
    title: 'ابدأ مع ESP32: بوّابتك إلى الأنظمة المدمجة',
    excerpt: 'دليل مختصر يعرّفك بإمكانات هذا المتحكّم الشهير ولماذا يتصدّر مشاريع الطلاب.',
    category: 'embedded',
    categories: ['embedded', 'iot'],
    authorId: 'u-abdalgani',
    coverImage: img(photos.electronics[3], 1200, 700),
    readingMinutes: 4,
    date: '2023-07-10',
    sections: [
      { heading: 'لماذا ESP32؟', body: ['يجمع بين معالج قوي واتصال واي فاي وبلوتوث بسعر منخفض، ما يجعله مثاليًا لإنترنت الأشياء.'] },
      { heading: 'أول مشروع', body: ['يمكنك البدء بمشروع بسيط لقراءة حساس وإرسال قراءته عبر الشبكة خلال دقائق.'] },
    ],
  },
  {
    slug: 'network-security-basics',
    title: 'أساسيات أمن الشبكات لمشاريع التخرج',
    excerpt: 'مفاهيم لا غنى عنها لأي مشروع يتعامل مع الشبكات والبيانات الحسّاسة.',
    category: 'networks',
    categories: ['networks', 'web'],
    authorId: 'u-anas',
    coverImage: img(photos.electronics[2], 1200, 700),
    readingMinutes: 6,
    date: '2023-12-05',
    projectSlug: 'campus-network-design',
    sections: [
      { heading: 'التقسيم والعزل', body: ['تقسيم الشبكة إلى مناطق منطقية يحدّ من انتشار أي اختراق محتمل.'] },
      { heading: 'التحكم بالوصول', body: ['سياسات وصول واضحة تضمن أن كل جهاز يصل فقط لما يحتاجه.'] },
    ],
  },
]

export function articleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}

/** All topic slugs for an article, primary first, de-duplicated. */
export function articleCategories(article: Article): string[] {
  return Array.from(new Set([article.category, ...(article.categories ?? [])]))
}

export function articlesByAuthor(authorId: string): Article[] {
  return articles.filter((a) => a.authorId === authorId)
}
