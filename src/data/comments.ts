export interface Comment {
  id: string
  targetId: string // `${kind}:${slug}` e.g. "project:autonomous-delivery-robot"
  userId: string
  body: string
  rating?: number // 1-5
  date: string
  likes: number
}

// Seed community comments. User-authored comments are layered on top from
// localStorage at runtime (see lib/community.ts).
export const seedComments: Comment[] = [
  {
    id: 'c1',
    targetId: 'project:autonomous-delivery-robot',
    userId: 'u-anas',
    body: 'عمل متكامل، خصوصًا معالجة إعادة تخطيط المسار عند ظهور عائق مفاجئ. أتمنى رؤية اختبار على مسافات أطول.',
    rating: 5,
    date: '2024-06-02',
    likes: 12,
  },
  {
    id: 'c2',
    targetId: 'project:autonomous-delivery-robot',
    userId: 'u-samar',
    body: 'دمج الليدار مع كاميرا العمق فكرة موفّقة. ما هو استهلاك الطاقة أثناء الملاحة المستمرة؟',
    rating: 4,
    date: '2024-06-10',
    likes: 5,
  },
  {
    id: 'c3',
    targetId: 'article:how-slam-navigation-works',
    userId: 'u-abdalgani',
    body: 'شرح مبسّط وواضح لمفهوم SLAM. مناسب جدًا للطلاب المبتدئين في الروبوتيك.',
    rating: 5,
    date: '2024-05-20',
    likes: 8,
  },
  {
    id: 'c4',
    targetId: 'article:cnn-image-classification',
    userId: 'u-samar',
    body: 'مقال مرجعي ممتاز. لو أُضيف مثال كود قصير لكان أفضل.',
    rating: 4,
    date: '2024-04-15',
    likes: 3,
  },
]
