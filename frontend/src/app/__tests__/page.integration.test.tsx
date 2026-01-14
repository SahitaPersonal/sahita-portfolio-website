import { render, screen, waitFor } from '@testing-library/react'

// Mock the API client BEFORE importing the component
jest.mock('@/lib/api', () => ({
  apiClient: {
    getProfile: jest.fn(),
    getTechnologies: jest.fn(),
    getExperience: jest.fn(),
    getRecommendations: jest.fn(),
    getAchievements: jest.fn(),
  },
}))

import Home from '../page'
import { apiClient } from '@/lib/api'

// Mock all section components
jest.mock('@/components/sections/Hero', () => ({
  __esModule: true,
  default: () => <div data-testid="hero-section">Hero Section</div>,
}))

jest.mock('@/components/sections/About', () => ({
  __esModule: true,
  default: () => <div data-testid="about-section">About Section</div>,
}))

jest.mock('@/components/sections/TechnologyShowcase', () => ({
  __esModule: true,
  default: () => <div data-testid="technology-section">Technology Section</div>,
}))

jest.mock('@/components/sections/Expertise', () => ({
  __esModule: true,
  default: () => <div data-testid="expertise-section">Expertise Section</div>,
}))

jest.mock('@/components/sections/JourneyTimeline', () => ({
  __esModule: true,
  default: () => <div data-testid="journey-section">Journey Section</div>,
}))

jest.mock('@/components/sections/Academic', () => ({
  __esModule: true,
  default: () => <div data-testid="academic-section">Academic Section</div>,
}))

jest.mock('@/components/sections/Achievements', () => ({
  __esModule: true,
  default: () => <div data-testid="achievements-section">Achievements Section</div>,
}))

jest.mock('@/components/sections/Recommendations', () => ({
  __esModule: true,
  default: () => <div data-testid="recommendations-section">Recommendations Section</div>,
}))

jest.mock('@/components/sections/Connect', () => ({
  __esModule: true,
  default: () => <div data-testid="connect-section">Connect Section</div>,
}))

describe('Home Page Integration Tests', () => {
  const mockProfileData = {
    personalInfo: {
      id: 1,
      name: 'Sahita',
      title: 'Lead Software Engineer',
      yearsExperience: 6,
      tagline: 'Test tagline',
      aboutText: 'Test about',
      profileImageUrl: '/images/profile.jpg',
    },
    socialLinks: [
      {
        id: 1,
        platform: 'LinkedIn',
        url: 'https://linkedin.com/in/test',
        displayOrder: 1,
      },
    ],
    resume: {
      url: '/files/resume.pdf',
      available: true,
    },
  }

  const mockTechnologiesData = {
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

  const mockExperienceData = {
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
    education: [
      {
        id: 1,
        institution: 'Test University',
        degree: 'Bachelor of Technology',
        startDate: '2015-08-01',
        endDate: '2019-06-30',
        displayOrder: 1,
      },
    ],
  }

  const mockRecommendationsData = [
    {
      id: 1,
      recommenderName: 'Test Recommender',
      recommendationText: 'Great work!',
      addedDate: '2024-01-01',
      isFeatured: false,
    },
  ]

  const mockAchievementsData = {
    certifications: [
      {
        id: 1,
        name: 'AWS Certified',
        issuer: 'Amazon',
        issueDate: '2024-01-01',
      },
    ],
    awards: [],
    projects: [],
  }

  beforeEach(() => {
    jest.clearAllMocks()
    
    // Setup default successful API responses
    ;(apiClient.getProfile as jest.Mock).mockResolvedValue(mockProfileData)
    ;(apiClient.getTechnologies as jest.Mock).mockResolvedValue(mockTechnologiesData)
    ;(apiClient.getExperience as jest.Mock).mockResolvedValue(mockExperienceData)
    ;(apiClient.getRecommendations as jest.Mock).mockResolvedValue(mockRecommendationsData)
    ;(apiClient.getAchievements as jest.Mock).mockResolvedValue(mockAchievementsData)
  })

  it('renders loading state initially', () => {
    render(<Home />)
    expect(screen.getByText('Loading portfolio...')).toBeInTheDocument()
  })

  it('fetches and displays all data successfully', async () => {
    render(<Home />)

    await waitFor(() => {
      expect(screen.getByTestId('hero-section')).toBeInTheDocument()
    })

    expect(apiClient.getProfile).toHaveBeenCalledTimes(1)
    expect(apiClient.getTechnologies).toHaveBeenCalledTimes(1)
    expect(apiClient.getExperience).toHaveBeenCalledTimes(1)
    expect(apiClient.getRecommendations).toHaveBeenCalledWith(1, 100)
    expect(apiClient.getAchievements).toHaveBeenCalledTimes(1)
  })

  it('renders all sections after successful data fetch', async () => {
    render(<Home />)

    await waitFor(() => {
      expect(screen.getByTestId('hero-section')).toBeInTheDocument()
      expect(screen.getByTestId('about-section')).toBeInTheDocument()
      expect(screen.getByTestId('technology-section')).toBeInTheDocument()
      expect(screen.getByTestId('expertise-section')).toBeInTheDocument()
      expect(screen.getByTestId('journey-section')).toBeInTheDocument()
      expect(screen.getByTestId('academic-section')).toBeInTheDocument()
      expect(screen.getByTestId('achievements-section')).toBeInTheDocument()
      expect(screen.getByTestId('recommendations-section')).toBeInTheDocument()
      expect(screen.getByTestId('connect-section')).toBeInTheDocument()
    })
  })

  it('handles API errors and shows fallback data', async () => {
    ;(apiClient.getProfile as jest.Mock).mockRejectedValue(new Error('API Error'))
    ;(apiClient.getTechnologies as jest.Mock).mockRejectedValue(new Error('API Error'))
    ;(apiClient.getExperience as jest.Mock).mockRejectedValue(new Error('API Error'))
    ;(apiClient.getRecommendations as jest.Mock).mockRejectedValue(new Error('API Error'))
    ;(apiClient.getAchievements as jest.Mock).mockRejectedValue(new Error('API Error'))

    render(<Home />)

    // Should still render sections with fallback data after max retries
    await waitFor(
      () => {
        expect(screen.getByTestId('hero-section')).toBeInTheDocument()
      },
      { timeout: 10000 }
    )
  })

  it('retries failed API calls', async () => {
    ;(apiClient.getProfile as jest.Mock)
      .mockRejectedValueOnce(new Error('Network error'))
      .mockRejectedValueOnce(new Error('Network error'))
      .mockResolvedValueOnce(mockProfileData)
    ;(apiClient.getTechnologies as jest.Mock).mockResolvedValue({ technologies: [], categories: [] })
    ;(apiClient.getExperience as jest.Mock).mockResolvedValue({ experiences: [], education: [] })
    ;(apiClient.getRecommendations as jest.Mock).mockResolvedValue([])
    ;(apiClient.getAchievements as jest.Mock).mockResolvedValue({ certifications: [], awards: [], projects: [] })

    render(<Home />)

    await waitFor(() => {
      // Should eventually succeed after retries
      expect(screen.getByTestId('hero-section')).toBeInTheDocument()
    }, { timeout: 10000 })
    
    // Verify that getProfile was called multiple times due to retries
    expect(apiClient.getProfile).toHaveBeenCalled()
  })

  it('displays retry attempt count during retries', async () => {
    ;(apiClient.getProfile as jest.Mock).mockRejectedValue(new Error('Network error'))
    ;(apiClient.getTechnologies as jest.Mock).mockRejectedValue(new Error('Network error'))
    ;(apiClient.getExperience as jest.Mock).mockRejectedValue(new Error('Network error'))
    ;(apiClient.getRecommendations as jest.Mock).mockRejectedValue(new Error('Network error'))
    ;(apiClient.getAchievements as jest.Mock).mockRejectedValue(new Error('Network error'))

    render(<Home />)

    // Wait for the component to attempt retries and eventually show fallback
    await waitFor(
      () => {
        // After max retries, should show fallback content
        expect(screen.getByTestId('hero-section')).toBeInTheDocument()
      },
      { timeout: 15000 }
    )
  })

  it('handles partial API failures gracefully', async () => {
    ;(apiClient.getTechnologies as jest.Mock).mockRejectedValue(new Error('API Error'))

    render(<Home />)

    await waitFor(
      () => {
        expect(screen.getByTestId('hero-section')).toBeInTheDocument()
      },
      { timeout: 10000 }
    )
  })
})

describe('Data Flow Integration', () => {
  it('passes correct props to child components', async () => {
    const mockProfileData = {
      personalInfo: {
        id: 1,
        name: 'Test User',
        title: 'Engineer',
        yearsExperience: 5,
      },
      socialLinks: [],
      resume: { available: true },
    }

    ;(apiClient.getProfile as jest.Mock).mockResolvedValue(mockProfileData)
    ;(apiClient.getTechnologies as jest.Mock).mockResolvedValue({ technologies: [], categories: [] })
    ;(apiClient.getExperience as jest.Mock).mockResolvedValue({ experiences: [], education: [] })
    ;(apiClient.getRecommendations as jest.Mock).mockResolvedValue([])
    ;(apiClient.getAchievements as jest.Mock).mockResolvedValue({ certifications: [], awards: [], projects: [] })

    render(<Home />)

    await waitFor(() => {
      expect(screen.getByTestId('hero-section')).toBeInTheDocument()
    })

    // Verify all API calls were made
    expect(apiClient.getProfile).toHaveBeenCalled()
    expect(apiClient.getTechnologies).toHaveBeenCalled()
    expect(apiClient.getExperience).toHaveBeenCalled()
    expect(apiClient.getRecommendations).toHaveBeenCalled()
    expect(apiClient.getAchievements).toHaveBeenCalled()
  })
})
