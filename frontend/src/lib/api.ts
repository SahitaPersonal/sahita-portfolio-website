import { 
  ProfileResponse, 
  TechnologiesResponse, 
  ExperienceResponse, 
  RecommendationsResponse, 
  AchievementsResponse,
  ApiResponse 
} from '@/types/api'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

class ApiClient {
  private async request<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: ApiResponse<T> = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }

      return data.data as T
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error)
      throw error
    }
  }

  // Profile endpoints
  async getProfile(): Promise<ProfileResponse> {
    return this.request<ProfileResponse>('/api/profile')
  }

  async getAbout(): Promise<any> {
    return this.request('/api/profile/about')
  }

  async getSocialLinks(): Promise<any[]> {
    return this.request('/api/profile/social-links')
  }

  // Technologies endpoints
  async getTechnologies(): Promise<TechnologiesResponse> {
    return this.request<TechnologiesResponse>('/api/technologies')
  }

  async getTechnologiesByCategory(category: string): Promise<any[]> {
    return this.request(`/api/technologies/category/${encodeURIComponent(category)}`)
  }

  async getFeaturedTechnologies(limit: number = 8): Promise<any[]> {
    return this.request(`/api/technologies/featured?limit=${limit}`)
  }

  // Experience endpoints
  async getExperience(): Promise<ExperienceResponse> {
    return this.request<ExperienceResponse>('/api/experience')
  }

  async getWorkExperience(): Promise<any[]> {
    return this.request('/api/experience/work')
  }

  async getEducation(): Promise<any[]> {
    return this.request('/api/experience/education')
  }

  async getTimeline(): Promise<any[]> {
    return this.request('/api/experience/timeline')
  }

  // Recommendations endpoints
  async getRecommendations(page: number = 1, limit: number = 10): Promise<RecommendationsResponse> {
    return this.request<RecommendationsResponse>(`/api/recommendations?page=${page}&limit=${limit}`)
  }

  async getFeaturedRecommendations(limit: number = 5): Promise<any[]> {
    return this.request(`/api/recommendations/featured?limit=${limit}`)
  }

  // Achievements endpoints
  async getAchievements(): Promise<AchievementsResponse> {
    return this.request<AchievementsResponse>('/api/achievements')
  }

  async getCertifications(category?: string, active?: boolean): Promise<any[]> {
    const params = new URLSearchParams()
    if (category) params.append('category', category)
    if (active) params.append('active', 'true')
    
    const query = params.toString() ? `?${params.toString()}` : ''
    return this.request(`/api/achievements/certifications${query}`)
  }

  async getAwards(category?: string): Promise<any[]> {
    const query = category ? `?category=${encodeURIComponent(category)}` : ''
    return this.request(`/api/achievements/awards${query}`)
  }

  async getProjects(featured?: boolean, limit?: number): Promise<any[]> {
    const params = new URLSearchParams()
    if (featured) params.append('featured', 'true')
    if (limit) params.append('limit', limit.toString())
    
    const query = params.toString() ? `?${params.toString()}` : ''
    return this.request(`/api/achievements/projects${query}`)
  }
}

export const apiClient = new ApiClient()
export default apiClient