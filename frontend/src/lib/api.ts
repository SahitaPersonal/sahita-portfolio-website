import { 
  ProfileResponse, 
  TechnologiesResponse, 
  ExperienceResponse, 
  RecommendationsResponse, 
  AchievementsResponse,
  ApiResponse 
} from '@/types/api'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

class ApiClient {
  private cache = new Map<string, { data: any; timestamp: number }>()
  private readonly CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

  private getCacheKey(endpoint: string): string {
    return `api_${endpoint}`
  }

  private isValidCache(timestamp: number): boolean {
    return Date.now() - timestamp < this.CACHE_DURATION
  }

  private async request<T>(endpoint: string, useCache: boolean = false): Promise<T> {
    try {
      // Validate inputs
      if (!endpoint) {
        throw new Error('Endpoint is required')
      }

      // Check cache if enabled
      if (useCache) {
        const cacheKey = this.getCacheKey(endpoint)
        const cached = this.cache.get(cacheKey)
        if (cached && this.isValidCache(cached.timestamp)) {
          console.log(`Using cached data for ${endpoint}`)
          return cached.data
        }
      }
      
      if (!API_BASE_URL) {
        throw new Error('No backend API configured - using fallback data')
      }

      // Ensure endpoint starts with /
      const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
      const url = `${API_BASE_URL}${normalizedEndpoint}`
      
      console.log(`Making API request to: ${url}`)
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        cache: useCache ? 'default' : 'no-store',
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`)
      }

      const data: ApiResponse<T> = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }

      // Cache the result if caching is enabled
      if (useCache) {
        const cacheKey = this.getCacheKey(endpoint)
        this.cache.set(cacheKey, {
          data: data.data,
          timestamp: Date.now()
        })
      }

      return data.data as T
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error)
      // Re-throw with more context
      if (error instanceof TypeError) {
        const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
        throw new Error(`Network error: No backend API available. Using fallback data.`)
      }
      throw error
    }
  }

  // Cache management methods
  clearCache(): void {
    this.cache.clear()
    console.log('API cache cleared')
  }

  clearCacheForEndpoint(endpoint: string): void {
    const cacheKey = this.getCacheKey(endpoint)
    this.cache.delete(cacheKey)
    console.log(`Cache cleared for ${endpoint}`)
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
  async getRecommendations(page: number = 1, limit: number = 100): Promise<any[]> {
    const response = await this.request<any>(`/api/recommendations?page=${page}&limit=${limit}`)
    return response // The backend returns the array directly in the data field
  }

  async getFeaturedRecommendations(limit: number = 5): Promise<any[]> {
    return this.request(`/api/recommendations/featured?limit=${limit}`)
  }

  // Force refresh methods - bypass cache and get fresh data
  async refreshProfile(): Promise<ProfileResponse> {
    this.clearCacheForEndpoint('/api/profile')
    return this.getProfile()
  }

  async refreshTechnologies(): Promise<TechnologiesResponse> {
    this.clearCacheForEndpoint('/api/technologies')
    return this.getTechnologies()
  }

  async refreshExperience(): Promise<ExperienceResponse> {
    this.clearCacheForEndpoint('/api/experience')
    return this.getExperience()
  }

  async refreshRecommendations(page: number = 1, limit: number = 100): Promise<any[]> {
    this.clearCacheForEndpoint(`/api/recommendations?page=${page}&limit=${limit}`)
    return this.getRecommendations(page, limit)
  }

  async refreshAchievements(): Promise<AchievementsResponse> {
    this.clearCacheForEndpoint('/api/achievements')
    return this.getAchievements()
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