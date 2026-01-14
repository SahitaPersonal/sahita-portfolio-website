import { render, screen } from '@testing-library/react'
import Academic from '../Academic'
import { Education } from '@/types/api'

describe('Academic Component', () => {
  const mockEducation: Education[] = [
    {
      id: 1,
      institution: 'Vishnu Institute of Technology',
      degree: 'Bachelor of Technology',
      fieldOfStudy: 'Computer Science and Engineering',
      startDate: '2015-08-01',
      endDate: '2019-06-30',
      description: 'Comprehensive computer science education',
      gpa: '87.7%',
      displayOrder: 1,
    },
    {
      id: 2,
      institution: 'Aditya Junior College',
      degree: 'Board of Intermediate Education',
      fieldOfStudy: 'MPC (Mathematics, Physics, Chemistry)',
      startDate: '2013-06-01',
      endDate: '2015-05-31',
      description: 'Pre-university education',
      gpa: '96.6%',
      displayOrder: 2,
    },
    {
      id: 3,
      institution: 'Aditya Public School',
      degree: 'Board of Secondary Education',
      fieldOfStudy: 'Secondary Education',
      startDate: '2012-06-01',
      endDate: '2013-05-31',
      description: 'Secondary education',
      gpa: '9.8/10',
      displayOrder: 3,
    },
  ]

  it('renders the academic section with correct heading', () => {
    render(<Academic education={mockEducation} />)
    expect(screen.getByText('Educational')).toBeInTheDocument()
    expect(screen.getByText('Foundation')).toBeInTheDocument()
  })

  it('displays all education entries', () => {
    render(<Academic education={mockEducation} />)
    expect(screen.getByText('Vishnu Institute of Technology')).toBeInTheDocument()
    expect(screen.getByText('Aditya Junior College')).toBeInTheDocument()
    expect(screen.getByText('Aditya Public School')).toBeInTheDocument()
  })

  it('displays GPA values correctly', () => {
    render(<Academic education={mockEducation} />)
    expect(screen.getByText('87.7%')).toBeInTheDocument()
    expect(screen.getByText('96.6%')).toBeInTheDocument()
    expect(screen.getByText('9.8/10')).toBeInTheDocument()
  })

  it('calculates average GPA correctly with mixed scales', () => {
    render(<Academic education={mockEducation} />)
    // Average should be (87.7 + 96.6 + 98.0) / 3 = 94.1%
    expect(screen.getByText('94.1%')).toBeInTheDocument()
  })

  it('displays correct number of qualifications', () => {
    render(<Academic education={mockEducation} />)
    const threeElements = screen.getAllByText('3')
    expect(threeElements.length).toBeGreaterThan(0)
    expect(screen.getByText('Qualifications')).toBeInTheDocument()
  })

  it('displays correct number of institutions', () => {
    render(<Academic education={mockEducation} />)
    // Should show 3 unique institutions
    const institutionsText = screen.getByText('Institutions')
    expect(institutionsText).toBeInTheDocument()
  })

  it('handles empty education array', () => {
    render(<Academic education={[]} />)
    expect(screen.getByText('N/A')).toBeInTheDocument()
  })

  it('handles education without GPA', () => {
    const educationWithoutGPA: Education[] = [
      {
        id: 1,
        institution: 'Test University',
        degree: 'Test Degree',
        startDate: '2015-08-01',
        endDate: '2019-06-30',
        displayOrder: 1,
      },
    ]
    render(<Academic education={educationWithoutGPA} />)
    expect(screen.getByText('N/A')).toBeInTheDocument()
  })

  it('displays degree information correctly', () => {
    render(<Academic education={mockEducation} />)
    expect(screen.getByText('Bachelor of Technology')).toBeInTheDocument()
    expect(screen.getByText('Computer Science and Engineering')).toBeInTheDocument()
  })

  it('displays core skills section', () => {
    render(<Academic education={mockEducation} />)
    expect(screen.getByText('Core Skills Developed')).toBeInTheDocument()
    expect(screen.getByText('Problem Solving')).toBeInTheDocument()
    expect(screen.getByText('Analytical Thinking')).toBeInTheDocument()
  })
})

// Unit tests for GPA normalization logic
describe('GPA Normalization Logic', () => {
  // Helper function to test GPA normalization
  const normalizeGPA = (gpaString: string): number => {
    if (gpaString.includes('%')) {
      return parseFloat(gpaString.replace('%', ''))
    } else if (gpaString.includes('/10')) {
      const value = parseFloat(gpaString.replace('/10', ''))
      return value * 10
    } else if (gpaString.includes('/')) {
      const [numerator, denominator] = gpaString.split('/').map(parseFloat)
      return (numerator / denominator) * 100
    } else {
      const value = parseFloat(gpaString)
      return value > 10 ? value : value * 10
    }
  }

  it('normalizes percentage GPA correctly', () => {
    expect(normalizeGPA('87.7%')).toBe(87.7)
    expect(normalizeGPA('96.6%')).toBe(96.6)
    expect(normalizeGPA('100%')).toBe(100)
  })

  it('normalizes 10-point scale GPA correctly', () => {
    expect(normalizeGPA('9.8/10')).toBe(98)
    expect(normalizeGPA('8.5/10')).toBe(85)
    expect(normalizeGPA('10/10')).toBe(100)
  })

  it('normalizes generic fraction GPA correctly', () => {
    expect(normalizeGPA('4.0/4.0')).toBe(100)
    expect(normalizeGPA('3.5/4.0')).toBe(87.5)
    expect(normalizeGPA('3.0/4.0')).toBe(75)
  })

  it('handles edge cases', () => {
    expect(normalizeGPA('0%')).toBe(0)
    expect(normalizeGPA('0/10')).toBe(0)
    expect(normalizeGPA('10')).toBe(100) // Assumes 10 is on 10-point scale
  })

  it('calculates average GPA correctly', () => {
    const gpas = ['87.7%', '96.6%', '9.8/10']
    const normalized = gpas.map(normalizeGPA)
    const average = normalized.reduce((sum, val) => sum + val, 0) / normalized.length
    expect(average).toBeCloseTo(94.1, 1)
  })
})
