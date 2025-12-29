import {
  ApiResponse,
  ProfileResponse,
  TechnologiesResponse,
  ExperienceResponse,
  RecommendationsResponse,
  AchievementsResponse,
} from '@/types/api'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public response?: any
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

async function fetchApi<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new ApiError(
        `HTTP error! status: ${response.status}`,
        response.status,
        response
      )
    }

    const data: ApiResponse<T> = await response.json()

    if (data.error) {
      throw new ApiError(data.error, response.status, data)
    }

    return data.data as T
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    
    // Network or other errors
    throw new ApiError(
      error instanceof Error ? error.message : 'Unknown error occurred',
      0
    )
  }
}

export const api = {
  // Profile endpoints
  async getProfile(): Promise<ProfileResponse> {
    return fetchApi<ProfileResponse>('/api/profile')
  },

  // Technologies endpoints
  async getTechnologies(): Promise<TechnologiesResponse> {
    return fetchApi<TechnologiesResponse>('/api/technologies')
  },

  // Experience endpoints
  async getExperience(): Promise<ExperienceResponse> {
    return fetchApi<ExperienceResponse>('/api/experience')
  },

  // Recommendations endpoints
  async getRecommendations(): Promise<RecommendationsResponse> {
    return fetchApi<RecommendationsResponse>('/api/recommendations')
  },

  // Achievements endpoints
  async getAchievements(): Promise<AchievementsResponse> {
    return fetchApi<AchievementsResponse>('/api/achievements')
  },

  // Resume download
  async downloadResume(): Promise<Blob> {
    const response = await fetch(`${API_BASE_URL}/api/resume/download`)
    
    if (!response.ok) {
      throw new ApiError(
        `Failed to download resume: ${response.status}`,
        response.status
      )
    }

    return response.blob()
  },

  // Resume view URL
  getResumeViewUrl(): string {
    return `${API_BASE_URL}/api/resume/view`
  },
}

// Utility functions for error handling
export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError
}

export function getErrorMessage(error: unknown): string {
  if (isApiError(error)) {
    return error.message
  }
  
  if (error instanceof Error) {
    return error.message
  }
  
  return 'An unexpected error occurred'
}