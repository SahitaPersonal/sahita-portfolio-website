import { Router } from 'express'
import { prisma } from '../index'
import { ResponseUtil } from '../utils/response'
import { ExperienceResponse, Experience, Education } from '../types/api'

const router = Router()

/**
 * GET /api/experience
 * Get complete experience information including work experience and education
 */
router.get('/', async (req, res) => {
  try {
    // Get work experiences
    const experiences = await prisma.experience.findMany({
      orderBy: { displayOrder: 'asc' }
    })

    // Get education
    const education = await prisma.education.findMany({
      orderBy: { displayOrder: 'asc' }
    })

    // Format experiences
    const formattedExperiences: Experience[] = experiences.map(exp => ({
      id: exp.id,
      company: exp.company,
      position: exp.position,
      startDate: exp.startDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
      endDate: exp.endDate ? exp.endDate.toISOString().split('T')[0] : undefined,
      description: exp.description || undefined,
      achievements: exp.achievements,
      technologies: exp.technologies,
      displayOrder: exp.displayOrder
    }))

    // Format education
    const formattedEducation: Education[] = education.map(edu => ({
      id: edu.id,
      institution: edu.institution,
      degree: edu.degree,
      fieldOfStudy: edu.fieldOfStudy || undefined,
      startDate: edu.startDate.toISOString().split('T')[0],
      endDate: edu.endDate ? edu.endDate.toISOString().split('T')[0] : undefined,
      description: edu.description || undefined,
      gpa: edu.gpa || undefined,
      displayOrder: edu.displayOrder
    }))

    const response: ExperienceResponse = {
      experiences: formattedExperiences,
      education: formattedEducation
    }

    return ResponseUtil.success(res, response, 'Experience information retrieved successfully')
  } catch (error) {
    console.error('Error fetching experience:', error)
    return ResponseUtil.internalError(res, 'Failed to fetch experience information')
  }
})

/**
 * GET /api/experience/work
 * Get only work experiences
 */
router.get('/work', async (req, res) => {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { displayOrder: 'asc' }
    })

    const formattedExperiences: Experience[] = experiences.map(exp => ({
      id: exp.id,
      company: exp.company,
      position: exp.position,
      startDate: exp.startDate.toISOString().split('T')[0],
      endDate: exp.endDate ? exp.endDate.toISOString().split('T')[0] : undefined,
      description: exp.description || undefined,
      achievements: exp.achievements,
      technologies: exp.technologies,
      displayOrder: exp.displayOrder
    }))

    return ResponseUtil.success(res, formattedExperiences, 'Work experiences retrieved successfully')
  } catch (error) {
    console.error('Error fetching work experiences:', error)
    return ResponseUtil.internalError(res, 'Failed to fetch work experiences')
  }
})

/**
 * GET /api/experience/education
 * Get only education information
 */
router.get('/education', async (req, res) => {
  try {
    const education = await prisma.education.findMany({
      orderBy: { displayOrder: 'asc' }
    })

    const formattedEducation: Education[] = education.map(edu => ({
      id: edu.id,
      institution: edu.institution,
      degree: edu.degree,
      fieldOfStudy: edu.fieldOfStudy || undefined,
      startDate: edu.startDate.toISOString().split('T')[0],
      endDate: edu.endDate ? edu.endDate.toISOString().split('T')[0] : undefined,
      description: edu.description || undefined,
      gpa: edu.gpa || undefined,
      displayOrder: edu.displayOrder
    }))

    return ResponseUtil.success(res, formattedEducation, 'Education information retrieved successfully')
  } catch (error) {
    console.error('Error fetching education:', error)
    return ResponseUtil.internalError(res, 'Failed to fetch education information')
  }
})

/**
 * GET /api/experience/timeline
 * Get chronological timeline of all experiences and education
 */
router.get('/timeline', async (req, res) => {
  try {
    const experiences = await prisma.experience.findMany()
    const education = await prisma.education.findMany()

    // Combine and sort by start date (most recent first)
    const timeline = [
      ...experiences.map(exp => ({
        id: exp.id,
        type: 'experience' as const,
        title: exp.position,
        organization: exp.company,
        startDate: exp.startDate.toISOString().split('T')[0],
        endDate: exp.endDate ? exp.endDate.toISOString().split('T')[0] : undefined,
        description: exp.description,
        details: {
          achievements: exp.achievements,
          technologies: exp.technologies
        }
      })),
      ...education.map(edu => ({
        id: edu.id,
        type: 'education' as const,
        title: edu.degree,
        organization: edu.institution,
        startDate: edu.startDate.toISOString().split('T')[0],
        endDate: edu.endDate ? edu.endDate.toISOString().split('T')[0] : undefined,
        description: edu.description,
        details: {
          fieldOfStudy: edu.fieldOfStudy,
          gpa: edu.gpa
        }
      }))
    ].sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())

    return ResponseUtil.success(res, timeline, 'Timeline retrieved successfully')
  } catch (error) {
    console.error('Error fetching timeline:', error)
    return ResponseUtil.internalError(res, 'Failed to fetch timeline')
  }
})

export default router