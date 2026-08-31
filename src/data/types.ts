export type ProjectType = 'graduation' | 'semester' | 'research' | 'company'

export const projectTypeLabels: Record<ProjectType, string> = {
  graduation: 'مشروع تخرج',
  semester: 'مشروع فصلي',
  research: 'حلقة بحث',
  company: 'عمل شركة',
}

export interface Category {
  slug: string
  name: string
  nameEn: string
  description: string
  icon: string // lucide-ish key handled in CategoryIcon
  image: string
}

export interface University {
  slug: string
  name: string
  city: string
}

export interface ProjectVideo {
  title: string
  youtubeId: string
  duration: string
  description?: string
}

export interface Project {
  id: string
  slug: string
  title: string
  shortDescription: string
  description: string
  problem: string
  solution: string
  goal: string
  category: string // primary category slug
  categories: string[]
  type: ProjectType
  year: number
  university: string // slug
  students: string[]
  supervisors: string[]
  coverImage: string
  images: string[]
  videos: ProjectVideo[]
  technologies: string[]
  hardware?: string[]
  software?: string[]
  architectureImage?: string
  articleSlug?: string
  hasPdf: boolean
  views: number
  featured: boolean
}

export interface Article {
  slug: string
  title: string
  excerpt: string
  category: string // primary category slug
  categories?: string[] // additional topic slugs (multi-category)
  coverImage: string
  readingMinutes: number
  date: string
  projectSlug?: string
  authorId?: string
  sections: { heading: string; body: string[] }[]
}

/* ---- Live projects (currently-running showcase) ------------------------ */
// The kind of deliverable — distinct from its subject-matter category.
export type LiveProjectType = 'website' | 'mobile' | 'hardware' | 'research'

export const liveProjectTypeLabels: Record<LiveProjectType, string> = {
  website: 'موقع ويب',
  mobile: 'تطبيق موبايل',
  hardware: 'هاردوير',
  research: 'بحث علمي',
}

// Subject-matter grouping used by the projects-page filter system.
export interface LiveCategory {
  slug: string
  name: string
  emoji: string
}

export interface LiveProject {
  id: string
  slug: string
  name: string
  category: string // LiveCategory slug
  type: LiveProjectType
  description: string
  image: string
  url?: string // real, live deployment; when present the project is "live"
  live: boolean
}

export interface Video {
  id: string
  title: string
  youtubeId: string
  category: string
  duration: string
  year: number
  thumbnail: string
}
