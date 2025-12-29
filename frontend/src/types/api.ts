// API Response Types (matching backend)
export interface ApiResponse<T = any> {
  data?: T
  error?: string
  message?: string
  timestamp: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Profile Types
export interface ProfileResponse {
  personalInfo: PersonalInfo
  socialLinks: SocialLink[]
  resume: ResumeInfo
}

export interface PersonalInfo {
  id: number
  name: string
  title: string
  yearsExperience: number
  tagline?: string
  aboutText?: string
  profileImageUrl?: string
}

export interface SocialLink {
  id: number
  platform: string
  url: string
  icon?: string
  displayOrder: number
}

export interface ResumeInfo {
  url?: string
  available: boolean
}

// Technologies Types
export interface TechnologiesResponse {
  technologies: Technology[]
  categories: TechCategory[]
}

export interface Technology {
  id: number
  name: string
  category: string
  proficiency: number
  yearsUsed?: number
  logoUrl?: string
  displayOrder: number
}

export interface TechCategory {
  name: string
  technologies: Technology[]
}

// Experience Types
export interface ExperienceResponse {
  experiences: Experience[]
  education: Education[]
}

export interface Experience {
  id: number
  company: string
  position: string
  startDate: string
  endDate?: string
  description?: string
  achievements: string[]
  technologies: string[]
  displayOrder: number
}

export interface Education {
  id: number
  institution: string
  degree: string
  fieldOfStudy?: string
  startDate: string
  endDate?: string
  description?: string
  gpa?: string
  displayOrder: number
}

// Recommendations Types
export interface RecommendationsResponse {
  recommendations: Recommendation[]
  totalCount: number
}

export interface Recommendation {
  id: number
  recommenderName: string
  recommenderTitle?: string
  recommenderCompany?: string
  relationship?: string
  recommendationText: string
  linkedinUrl?: string
  addedDate: string
  isFeatured: boolean
}

// Achievements Types
export interface AchievementsResponse {
  certifications: Certification[]
  awards: Award[]
  projects: ProjectHighlight[]
}

export interface Certification {
  id: number
  name: string
  issuer: string
  issueDate: string
  expiryDate?: string
  credentialId?: string
  verificationUrl?: string
  logoUrl?: string
  category?: string
}

export interface Award {
  id: number
  title: string
  issuer: string
  dateAwarded: string
  description?: string
  category?: string
  logoUrl?: string
}

export interface ProjectHighlight {
  id: number
  title: string
  description: string
  technologies: string[]
  projectUrl?: string
  githubUrl?: string
  imageUrl?: string
  startDate: string
  endDate?: string
  isFeatured: boolean
}