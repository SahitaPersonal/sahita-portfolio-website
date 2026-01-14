import { render, screen, fireEvent } from '@testing-library/react'

// Mock CoderGraphics components BEFORE importing the component
jest.mock('@/components/ui/CoderGraphics', () => ({
  GeometricShapes: () => <div>GeometricShapes</div>,
  FloatingIcons: () => <div>FloatingIcons</div>,
  BinaryRain: () => <div>BinaryRain</div>,
}))

import Achievements from '../Achievements'
import { Certification, Award, ProjectHighlight } from '@/types/api'

describe('Achievements Component', () => {
  const mockCertifications: Certification[] = [
    {
      id: 1,
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      issueDate: '2024-01-01',
      category: 'Cloud',
      logoUrl: 'https://example.com/aws.png',
    },
    {
      id: 2,
      name: 'Google Cloud Professional',
      issuer: 'Google',
      issueDate: '2024-12-01',
      expiryDate: '2027-12-01',
      category: 'Cloud',
    },
  ]

  const mockAwards: Award[] = [
    {
      id: 1,
      title: 'Employee of the Year',
      issuer: 'Test Company',
      dateAwarded: '2024-01-01',
      description: 'Outstanding performance',
      category: 'Professional',
    },
  ]

  const mockProjects: ProjectHighlight[] = [
    {
      id: 1,
      title: 'Portfolio Website',
      description: 'Personal portfolio built with Next.js',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      startDate: '2024-01-01',
      isFeatured: true,
      projectUrl: 'https://example.com',
      githubUrl: 'https://github.com/test/repo',
    },
  ]

  it('renders the achievements section', () => {
    render(
      <Achievements
        certifications={mockCertifications}
        awards={mockAwards}
        projects={mockProjects}
      />
    )
    expect(screen.getByText('Certifications &')).toBeInTheDocument()
    expect(screen.getByText('Accomplishments')).toBeInTheDocument()
  })

  it('displays tab navigation with correct counts', () => {
    render(
      <Achievements
        certifications={mockCertifications}
        awards={mockAwards}
        projects={mockProjects}
      />
    )
    expect(screen.getByText('Certifications')).toBeInTheDocument()
    const twoElements = screen.getAllByText('2')
    expect(twoElements.length).toBeGreaterThan(0) // 2 certifications
    expect(screen.getByText('Awards')).toBeInTheDocument()
    const oneElements = screen.getAllByText('1')
    expect(oneElements.length).toBeGreaterThan(0) // 1 award
    expect(screen.getByText('Projects')).toBeInTheDocument()
  })

  it('shows certifications by default', () => {
    render(
      <Achievements
        certifications={mockCertifications}
        awards={mockAwards}
        projects={mockProjects}
      />
    )
    expect(screen.getByText('AWS Certified Solutions Architect')).toBeInTheDocument()
    expect(screen.getByText('Amazon Web Services')).toBeInTheDocument()
  })

  it('switches to awards tab when clicked', () => {
    render(
      <Achievements
        certifications={mockCertifications}
        awards={mockAwards}
        projects={mockProjects}
      />
    )
    
    const awardsButton = screen.getByRole('button', { name: /Awards/i })
    fireEvent.click(awardsButton)
    
    expect(screen.getByText('Employee of the Year')).toBeInTheDocument()
    expect(screen.getByText('Test Company')).toBeInTheDocument()
  })

  it('switches to projects tab when clicked', () => {
    render(
      <Achievements
        certifications={mockCertifications}
        awards={mockAwards}
        projects={mockProjects}
      />
    )
    
    const projectsButton = screen.getByRole('button', { name: /Projects/i })
    fireEvent.click(projectsButton)
    
    expect(screen.getByText('Portfolio Website')).toBeInTheDocument()
    expect(screen.getByText('Personal portfolio built with Next.js')).toBeInTheDocument()
  })

  it('displays certification status badges', () => {
    render(
      <Achievements
        certifications={mockCertifications}
        awards={mockAwards}
        projects={mockProjects}
      />
    )
    
    // Should show Active for non-expired cert
    const activeElements = screen.getAllByText('Active')
    expect(activeElements.length).toBeGreaterThan(0)
  })

  it('displays certification categories', () => {
    render(
      <Achievements
        certifications={mockCertifications}
        awards={mockAwards}
        projects={mockProjects}
      />
    )
    
    const cloudCategories = screen.getAllByText('Cloud')
    expect(cloudCategories.length).toBeGreaterThan(0)
  })

  it('displays project technologies', () => {
    render(
      <Achievements
        certifications={mockCertifications}
        awards={mockAwards}
        projects={mockProjects}
      />
    )
    
    const projectsButton = screen.getByRole('button', { name: /Projects/i })
    fireEvent.click(projectsButton)
    
    expect(screen.getByText('Next.js')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('Tailwind CSS')).toBeInTheDocument()
  })

  it('displays summary statistics', () => {
    render(
      <Achievements
        certifications={mockCertifications}
        awards={mockAwards}
        projects={mockProjects}
      />
    )
    
    expect(screen.getByText('Active Certifications')).toBeInTheDocument()
    expect(screen.getByText('Awards Received')).toBeInTheDocument()
    expect(screen.getByText('Featured Projects')).toBeInTheDocument()
    expect(screen.getByText('Categories')).toBeInTheDocument()
  })

  it('handles empty certifications array', () => {
    render(
      <Achievements
        certifications={[]}
        awards={mockAwards}
        projects={mockProjects}
      />
    )
    
    const zeroElements = screen.getAllByText('0')
    expect(zeroElements.length).toBeGreaterThan(0) // 0 certifications
  })

  it('displays verification links for certifications', () => {
    const certWithVerification: Certification[] = [
      {
        id: 1,
        name: 'Test Cert',
        issuer: 'Test Issuer',
        issueDate: '2024-01-01',
        verificationUrl: 'https://verify.example.com',
      },
    ]
    
    render(
      <Achievements
        certifications={certWithVerification}
        awards={[]}
        projects={[]}
      />
    )
    
    expect(screen.getByText('Verify Certificate')).toBeInTheDocument()
  })

  it('displays project links correctly', () => {
    render(
      <Achievements
        certifications={[]}
        awards={[]}
        projects={mockProjects}
      />
    )
    
    const projectsButton = screen.getByRole('button', { name: /Projects/i })
    fireEvent.click(projectsButton)
    
    expect(screen.getByText('Live Demo')).toBeInTheDocument()
    expect(screen.getByText('Source Code')).toBeInTheDocument()
  })

  it('formats dates correctly', () => {
    render(
      <Achievements
        certifications={mockCertifications}
        awards={mockAwards}
        projects={mockProjects}
      />
    )
    
    // Check if date is formatted (should be like "Jan 2024")
    expect(screen.getByText(/Jan 2024/i)).toBeInTheDocument()
  })

  it('shows featured badge for featured projects', () => {
    render(
      <Achievements
        certifications={[]}
        awards={[]}
        projects={mockProjects}
      />
    )
    
    const projectsButton = screen.getByRole('button', { name: /Projects/i })
    fireEvent.click(projectsButton)
    
    // Featured projects should have a star badge
    const starBadges = screen.getAllByText('★')
    expect(starBadges.length).toBeGreaterThan(0)
  })
})

// Unit tests for date formatting
describe('Date Formatting', () => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    })
  }

  it('formats dates correctly', () => {
    expect(formatDate('2024-01-15')).toBe('Jan 2024')
    expect(formatDate('2024-12-25')).toBe('Dec 2024')
  })
})

// Unit tests for certification status
describe('Certification Status', () => {
  const isCertificationActive = (cert: Certification) => {
    if (!cert.expiryDate) return true
    return new Date(cert.expiryDate) > new Date()
  }

  it('returns true for certifications without expiry date', () => {
    const cert: Certification = {
      id: 1,
      name: 'Test',
      issuer: 'Test',
      issueDate: '2024-01-01',
    }
    expect(isCertificationActive(cert)).toBe(true)
  })

  it('returns true for non-expired certifications', () => {
    const futureDate = new Date()
    futureDate.setFullYear(futureDate.getFullYear() + 1)
    
    const cert: Certification = {
      id: 1,
      name: 'Test',
      issuer: 'Test',
      issueDate: '2024-01-01',
      expiryDate: futureDate.toISOString(),
    }
    expect(isCertificationActive(cert)).toBe(true)
  })

  it('returns false for expired certifications', () => {
    const pastDate = new Date()
    pastDate.setFullYear(pastDate.getFullYear() - 1)
    
    const cert: Certification = {
      id: 1,
      name: 'Test',
      issuer: 'Test',
      issueDate: '2024-01-01',
      expiryDate: pastDate.toISOString(),
    }
    expect(isCertificationActive(cert)).toBe(false)
  })
})
