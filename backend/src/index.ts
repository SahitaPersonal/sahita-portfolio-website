import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

// Load environment variables
dotenv.config()

const app = express()
const port = process.env.PORT || 3001
const prisma = new PrismaClient()

// Middleware
app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}))
app.use(morgan('combined'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// API Routes
app.get('/api/profile', async (req, res) => {
  try {
    // For now, return mock data since database might not be set up
    const mockProfile = {
      data: {
        personalInfo: {
          id: 1,
          name: 'Sahita',
          title: 'Full-Stack Engineer',
          yearsExperience: 6,
          tagline: 'Passionate about building scalable web applications with modern technologies.',
          aboutText: 'With 6+ years of experience in full-stack development, I specialize in creating scalable web applications that deliver exceptional user experiences. My journey in technology has been driven by a passion for solving complex problems and building solutions that make a real impact.',
          profileImageUrl: null
        },
        socialLinks: [
          { id: 1, platform: 'LinkedIn', url: 'https://linkedin.com/in/sahita', icon: 'linkedin', displayOrder: 1 },
          { id: 2, platform: 'GitHub', url: 'https://github.com/SahitaPersonal', icon: 'github', displayOrder: 2 },
          { id: 3, platform: 'Email', url: 'mailto:contact@sahita.dev', icon: 'email', displayOrder: 3 }
        ],
        resume: {
          url: '/api/resume/view',
          available: true
        }
      },
      timestamp: new Date().toISOString()
    }
    
    res.json(mockProfile)
  } catch (error) {
    console.error('Error fetching profile:', error)
    res.status(500).json({
      error: 'Failed to fetch profile data',
      timestamp: new Date().toISOString()
    })
  }
})

app.get('/api/technologies', async (req, res) => {
  try {
    const mockTechnologies = {
      data: {
        technologies: [
          { id: 1, name: 'React', category: 'Frontend', proficiency: 95, yearsUsed: 5, logoUrl: null, displayOrder: 1 },
          { id: 2, name: 'TypeScript', category: 'Language', proficiency: 90, yearsUsed: 4, logoUrl: null, displayOrder: 2 },
          { id: 3, name: 'Node.js', category: 'Backend', proficiency: 88, yearsUsed: 6, logoUrl: null, displayOrder: 3 },
          { id: 4, name: 'PostgreSQL', category: 'Database', proficiency: 85, yearsUsed: 5, logoUrl: null, displayOrder: 4 }
        ],
        categories: [
          { name: 'Frontend', technologies: [] },
          { name: 'Backend', technologies: [] },
          { name: 'Database', technologies: [] },
          { name: 'Language', technologies: [] }
        ]
      },
      timestamp: new Date().toISOString()
    }
    
    res.json(mockTechnologies)
  } catch (error) {
    console.error('Error fetching technologies:', error)
    res.status(500).json({
      error: 'Failed to fetch technologies data',
      timestamp: new Date().toISOString()
    })
  }
})

app.get('/api/experience', async (req, res) => {
  try {
    const mockExperience = {
      data: {
        experiences: [
          {
            id: 1,
            company: 'Tech Company',
            position: 'Senior Full-Stack Engineer',
            startDate: '2022-01-01',
            endDate: null,
            description: 'Leading development of scalable web applications',
            achievements: ['Improved performance by 40%', 'Led team of 5 developers'],
            technologies: ['React', 'Node.js', 'PostgreSQL'],
            displayOrder: 1
          }
        ],
        education: [
          {
            id: 1,
            institution: 'University',
            degree: 'Bachelor of Technology',
            fieldOfStudy: 'Computer Science',
            startDate: '2015-01-01',
            endDate: '2019-01-01',
            description: 'Computer Science and Engineering',
            gpa: '8.5',
            displayOrder: 1
          }
        ]
      },
      timestamp: new Date().toISOString()
    }
    
    res.json(mockExperience)
  } catch (error) {
    console.error('Error fetching experience:', error)
    res.status(500).json({
      error: 'Failed to fetch experience data',
      timestamp: new Date().toISOString()
    })
  }
})

app.get('/api/recommendations', async (req, res) => {
  try {
    const mockRecommendations = {
      data: {
        recommendations: [
          {
            id: 1,
            recommenderName: 'John Doe',
            recommenderTitle: 'Engineering Manager',
            recommenderCompany: 'Tech Company',
            relationship: 'Manager',
            recommendationText: 'Sahita is an exceptional developer with strong technical skills and great team collaboration.',
            linkedinUrl: 'https://linkedin.com/in/johndoe',
            addedDate: '2024-01-01T00:00:00Z',
            isFeatured: true
          }
        ],
        totalCount: 1
      },
      timestamp: new Date().toISOString()
    }
    
    res.json(mockRecommendations)
  } catch (error) {
    console.error('Error fetching recommendations:', error)
    res.status(500).json({
      error: 'Failed to fetch recommendations data',
      timestamp: new Date().toISOString()
    })
  }
})

app.get('/api/achievements', async (req, res) => {
  try {
    const mockAchievements = {
      data: {
        certifications: [
          {
            id: 1,
            name: 'AWS Certified Developer',
            issuer: 'Amazon Web Services',
            issueDate: '2023-01-01',
            expiryDate: '2026-01-01',
            credentialId: 'AWS-123456',
            verificationUrl: 'https://aws.amazon.com/verification',
            logoUrl: null,
            category: 'Cloud'
          }
        ],
        awards: [
          {
            id: 1,
            title: 'Employee of the Month',
            issuer: 'Tech Company',
            dateAwarded: '2023-06-01',
            description: 'Recognized for outstanding performance',
            category: 'Performance',
            logoUrl: null
          }
        ],
        projects: [
          {
            id: 1,
            title: 'E-commerce Platform',
            description: 'Built a scalable e-commerce platform serving 10k+ users',
            technologies: ['React', 'Node.js', 'PostgreSQL'],
            projectUrl: 'https://example.com',
            githubUrl: 'https://github.com/example',
            imageUrl: null,
            startDate: '2023-01-01',
            endDate: '2023-06-01',
            isFeatured: true
          }
        ]
      },
      timestamp: new Date().toISOString()
    }
    
    res.json(mockAchievements)
  } catch (error) {
    console.error('Error fetching achievements:', error)
    res.status(500).json({
      error: 'Failed to fetch achievements data',
      timestamp: new Date().toISOString()
    })
  }
})

// Resume endpoints
app.get('/api/resume/view', (req, res) => {
  res.json({
    message: 'Resume viewing not implemented yet',
    timestamp: new Date().toISOString()
  })
})

app.get('/api/resume/download', (req, res) => {
  res.json({
    message: 'Resume download not implemented yet',
    timestamp: new Date().toISOString()
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    timestamp: new Date().toISOString()
  })
})

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err)
  res.status(500).json({
    error: 'Internal server error',
    timestamp: new Date().toISOString()
  })
})

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...')
  await prisma.$disconnect()
  process.exit(0)
})

process.on('SIGTERM', async () => {
  console.log('Shutting down gracefully...')
  await prisma.$disconnect()
  process.exit(0)
})

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`)
  console.log(`📊 Health check: http://localhost:${port}/health`)
})

export default app