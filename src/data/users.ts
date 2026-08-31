import { img, photos } from './images'

export type AccountStatus = 'pending' | 'approved' | 'rejected' | 'suspended'

export type SocialPlatform =
  | 'instagram'
  | 'facebook'
  | 'linkedin'
  | 'telegram'
  | 'x'
  | 'github'
  | 'website'
  | 'youtube'

export interface SocialAccount {
  platform: SocialPlatform
  url: string
}

export interface User {
  id: string
  name: string
  email: string
  avatar: string
  bio: string
  specialty: string
  university?: string
  graduationYear?: number
  status: AccountStatus
  social: SocialAccount[]
  articleCount: number
  contributionCount: number
}

export const socialPlatformLabels: Record<SocialPlatform, string> = {
  instagram: 'Instagram',
  facebook: 'Facebook',
  linkedin: 'LinkedIn',
  telegram: 'Telegram',
  x: 'X',
  github: 'GitHub',
  website: 'الموقع الشخصي',
  youtube: 'YouTube',
}

// Seed community members — article authors and top contributors.
export const users: User[] = [
  {
    id: 'u-abdalgani',
    name: 'عبد الغني',
    email: 'abdalgani@techno-enjaz.com',
    avatar: img(photos.people[0], 240, 240),
    bio: 'مهندس معلوماتية مهتم بالذكاء الاصطناعي والأنظمة المدمجة وتطوير تطبيقات الويب، ومؤسس عدد من المنصات التقنية.',
    specialty: 'هندسة معلوماتية',
    university: 'aleppo',
    graduationYear: 2022,
    status: 'approved',
    social: [
      { platform: 'github', url: 'https://github.com/' },
      { platform: 'linkedin', url: 'https://linkedin.com/' },
      { platform: 'website', url: 'https://abdalgani.com/' },
    ],
    articleCount: 3,
    contributionCount: 14,
  },
  {
    id: 'u-anas',
    name: 'د. أنس الخطيب',
    email: 'anas@techno-enjaz.com',
    avatar: img(photos.people[4], 240, 240),
    bio: 'أستاذ في هندسة التحكم والروبوتيك، مشرف على مشاريع تخرّج في الملاحة الذاتية وأنظمة SLAM.',
    specialty: 'الروبوتيك والتحكم',
    university: 'aleppo',
    status: 'approved',
    social: [{ platform: 'linkedin', url: 'https://linkedin.com/' }],
    articleCount: 2,
    contributionCount: 9,
  },
  {
    id: 'u-reem',
    name: 'د. ريم العابد',
    email: 'reem@techno-enjaz.com',
    avatar: img(photos.people[2], 240, 240),
    bio: 'باحثة في رؤية الحاسب والتعلّم العميق، مهتمة بتطبيقات الذكاء الاصطناعي في المجال الصحي والزراعي.',
    specialty: 'الذكاء الاصطناعي ورؤية الحاسب',
    university: 'npu',
    status: 'approved',
    social: [
      { platform: 'x', url: 'https://x.com/' },
      { platform: 'github', url: 'https://github.com/' },
    ],
    articleCount: 2,
    contributionCount: 7,
  },
  {
    id: 'u-samar',
    name: 'د. سمر الحلبي',
    email: 'samar@techno-enjaz.com',
    avatar: img(photos.people[3], 240, 240),
    bio: 'مهندسة أنظمة مدمجة وإنترنت أشياء، شغوفة بحلول الطاقة والزراعة الذكية منخفضة التكلفة.',
    specialty: 'الأنظمة المدمجة وإنترنت الأشياء',
    university: 'albaath',
    status: 'approved',
    social: [{ platform: 'linkedin', url: 'https://linkedin.com/' }],
    articleCount: 1,
    contributionCount: 6,
  },
  {
    id: 'u-fadi',
    name: 'د. فادي منصور',
    email: 'fadi@techno-enjaz.com',
    avatar: img(photos.people[5], 240, 240),
    bio: 'مهتم بالتحكم PID وأنظمة الطاقة الشمسية والأذرع الآلية التعليمية مفتوحة المصدر.',
    specialty: 'الميكاترونيك',
    university: 'tishreen',
    status: 'approved',
    social: [{ platform: 'github', url: 'https://github.com/' }],
    articleCount: 0,
    contributionCount: 5,
  },
]

export function userById(id: string): User | undefined {
  return users.find((u) => u.id === id)
}

export function topContributors(): User[] {
  return [...users].sort((a, b) => b.contributionCount - a.contributionCount)
}
