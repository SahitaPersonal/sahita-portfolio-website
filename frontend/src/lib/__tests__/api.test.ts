import { apiClient } from '../api'
import { ProfileResponse, TechnologiesResponse, ExperienceResponse, AchievementsResponse } from '@/types/api'

// Mock fetch globally
global.fetch = jest.fn()

describe('API Client', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
    // Clear cache
    apiClient.clearCache()
  })

  describe('Profile API', () => {
    it('fetches profile data successfully', async () => {
      const mockProfileData: ProfileResponse = {
        personalInfo: {
          id: 1,
          name: 'Test User',
          title: 'Software Engineer',
          yearsExperience: 5,
          tagline: 'Test tagline',
        },
        socialLinks: [],
        resume: {
          available: true,
        },
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: mockProfileData }),
      })

      const result = await apiClient.getProfile()
      expect(result).toEqual(mockProfileData)
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/profile'),
        expect.any(Object)
      )
    })

    it('handles profile API errors', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      })

      await expect(apiClient.getProfile()).rejects.toThrow()
    })
  })

  describe('Technologies API', () => {
    it('fetches technologies data successfully', async () => {
      const mockTechnologiesData: TechnologiesResponse = {
        technologies: [
          {
            id: 1,
            name: 'React',
            category: 'Frontend',
            proficiency: 90,
            displayOrder: 1,
          },
        ],
        categories: [
          {
            name: 'Frontend',
            technologies: [],
          },
        ],
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: mockTechnologiesData }),
      })

      const result = await apiClient.getTechnologies()
      expect(result).toEqual(mockTechnologiesData)
    })
  })

  describe('Experience API', () => {
    it('fetches experience data successfully', async () => {
      const mockExperienceData: ExperienceResponse = {
        experiences: [
          {
            id: 1,
            company: 'Test Company',
            position: 'Software Engineer',
            startDate: '2020-01-01',
            achievements: [],
            technologies: [],
            displayOrder: 1,
          },
        ],
        education: [],
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: mockExperienceData }),
      })

      const result = await apiClient.getExperience()
      expect(result).toEqual(mockExperienceData)
    })
  })

  describe('Achievements API', () => {
    it('fetches achievements data successfully', async () => {
      const mockAchievementsData: AchievementsResponse = {
        certifications: [],
        awards: [],
        projects: [],
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: mockAchievementsData }),
      })

      const result = await apiClient.getAchievements()
      expect(result).toEqual(mockAchievementsData)
    })
  })

  describe('Recommendations API', () => {
    it('fetches recommendations with pagination', async () => {
      const mockRecommendations = [
        {
          id: 1,
          recommenderName: 'Test Recommender',
          recommendationText: 'Great work!',
          addedDate: '2024-01-01',
          isFeatured: false,
        },
      ]

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: mockRecommendations }),
      })

      const result = await apiClient.getRecommendations(1, 10)
      expect(result).toEqual(mockRecommendations)
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('page=1&limit=10'),
        expect.any(Object)
      )
    })
  })

  describe('Error Handling', () => {
    it('handles network errors', async () => {
      ;(global.fetch as jest.Mock).mockRejectedValueOnce(new TypeError('Failed to fetch'))

      await expect(apiClient.getProfile()).rejects.toThrow('Network error')
    })

    it('handles API errors with error field', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ error: 'API Error', data: null }),
      })

      await expect(apiClient.getProfile()).rejects.toThrow('API Error')
    })

    it('handles HTTP error responses', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      })

      await expect(apiClient.getProfile()).rejects.toThrow('HTTP error')
    })
  })

  describe('Cache Management', () => {
    it('clears cache successfully', () => {
      apiClient.clearCache()
      // Should not throw any errors
      expect(true).toBe(true)
    })

    it('clears cache for specific endpoint', () => {
      apiClient.clearCacheForEndpoint('/api/profile')
      // Should not throw any errors
      expect(true).toBe(true)
    })
  })

  describe('Refresh Methods', () => {
    it('refreshes profile data', async () => {
      const mockProfileData: ProfileResponse = {
        personalInfo: {
          id: 1,
          name: 'Test User',
          title: 'Software Engineer',
          yearsExperience: 5,
        },
        socialLinks: [],
        resume: {
          available: true,
        },
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: mockProfileData }),
      })

      const result = await apiClient.refreshProfile()
      expect(result).toEqual(mockProfileData)
    })

    it('refreshes technologies data', async () => {
      const mockTechnologiesData: TechnologiesResponse = {
        technologies: [],
        categories: [],
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: mockTechnologiesData }),
      })

      const result = await apiClient.refreshTechnologies()
      expect(result).toEqual(mockTechnologiesData)
    })
  })

  describe('Query Parameters', () => {
    it('handles certifications with category filter', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: [] }),
      })

      await apiClient.getCertifications('cloud', true)
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('category=cloud'),
        expect.any(Object)
      )
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('active=true'),
        expect.any(Object)
      )
    })

    it('handles awards with category filter', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: [] }),
      })

      await apiClient.getAwards('professional')
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('category=professional'),
        expect.any(Object)
      )
    })

    it('handles projects with featured filter', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: [] }),
      })

      await apiClient.getProjects(true, 5)
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('featured=true'),
        expect.any(Object)
      )
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('limit=5'),
        expect.any(Object)
      )
    })
  })
})
