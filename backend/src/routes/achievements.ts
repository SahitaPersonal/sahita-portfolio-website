import { Router } from 'express'
import { prisma } from '../index'
import { ResponseUtil } from '../utils/response'
import { AchievementsResponse, Certification, Award, ProjectHighlight } from '../types/api'

const router = Router()

/**
 * GET /api/achievements
 * Get all achievements including certifications, awards, and project highlights
 */
router.get('/', async (req, res) => {
  try {
    // Get all achievements data
    const [certifications, awards, projects] = await Promise.all([
      prisma.certification.findMany({
        orderBy: { issueDate: 'desc' }
      }),
      prisma.award.findMany({
        orderBy: { dateAwarded: 'desc' }
      }),
      prisma.projectHighlight.findMany({
        orderBy: [
          { isFeatured: 'desc' },
          { startDate: 'desc' }
        ]
      })
    ])

    // Format certifications
    const formattedCertifications: Certification[] = certifications.map(cert => ({
      id: cert.id,
      name: cert.name,
      issuer: cert.issuer,
      issueDate: cert.issueDate.toISOString().split('T')[0],
      expiryDate: cert.expiryDate ? cert.expiryDate.toISOString().split('T')[0] : undefined,
      credentialId: cert.credentialId || undefined,
      verificationUrl: cert.verificationUrl || undefined,
      logoUrl: cert.logoUrl || undefined,
      category: cert.category || undefined
    }))

    // Format awards
    const formattedAwards: Award[] = awards.map(award => ({
      id: award.id,
      title: award.title,
      issuer: award.issuer,
      dateAwarded: award.dateAwarded.toISOString().split('T')[0],
      description: award.description || undefined,
      category: award.category || undefined,
      logoUrl: award.logoUrl || undefined
    }))

    // Format project highlights
    const formattedProjects: ProjectHighlight[] = projects.map(project => ({
      id: project.id,
      title: project.title,
      description: project.description,
      technologies: JSON.parse(project.technologies || '[]'),
      projectUrl: project.projectUrl || undefined,
      githubUrl: project.githubUrl || undefined,
      imageUrl: project.imageUrl || undefined,
      startDate: project.startDate.toISOString().split('T')[0],
      endDate: project.endDate ? project.endDate.toISOString().split('T')[0] : undefined,
      isFeatured: project.isFeatured
    }))

    const response: AchievementsResponse = {
      certifications: formattedCertifications,
      awards: formattedAwards,
      projects: formattedProjects
    }

    return ResponseUtil.success(res, response, 'Achievements retrieved successfully')
  } catch (error) {
    console.error('Error fetching achievements:', error)
    return ResponseUtil.internalError(res, 'Failed to fetch achievements')
  }
})

/**
 * GET /api/achievements/certifications
 * Get only certifications
 */
router.get('/certifications', async (req, res) => {
  try {
    const category = req.query.category as string
    const active = req.query.active === 'true'

    // Build where clause
    const where: any = {}
    if (category) {
      where.category = category
    }
    if (active) {
      where.OR = [
        { expiryDate: null },
        { expiryDate: { gt: new Date() } }
      ]
    }

    const certifications = await prisma.certification.findMany({
      where,
      orderBy: { issueDate: 'desc' }
    })

    const formattedCertifications: Certification[] = certifications.map(cert => ({
      id: cert.id,
      name: cert.name,
      issuer: cert.issuer,
      issueDate: cert.issueDate.toISOString().split('T')[0],
      expiryDate: cert.expiryDate ? cert.expiryDate.toISOString().split('T')[0] : undefined,
      credentialId: cert.credentialId || undefined,
      verificationUrl: cert.verificationUrl || undefined,
      logoUrl: cert.logoUrl || undefined,
      category: cert.category || undefined
    }))

    return ResponseUtil.success(res, formattedCertifications, 'Certifications retrieved successfully')
  } catch (error) {
    console.error('Error fetching certifications:', error)
    return ResponseUtil.internalError(res, 'Failed to fetch certifications')
  }
})

/**
 * GET /api/achievements/awards
 * Get only awards
 */
router.get('/awards', async (req, res) => {
  try {
    const category = req.query.category as string

    const where = category ? {
      category: category
    } : {}

    const awards = await prisma.award.findMany({
      where,
      orderBy: { dateAwarded: 'desc' }
    })

    const formattedAwards: Award[] = awards.map(award => ({
      id: award.id,
      title: award.title,
      issuer: award.issuer,
      dateAwarded: award.dateAwarded.toISOString().split('T')[0],
      description: award.description || undefined,
      category: award.category || undefined,
      logoUrl: award.logoUrl || undefined
    }))

    return ResponseUtil.success(res, formattedAwards, 'Awards retrieved successfully')
  } catch (error) {
    console.error('Error fetching awards:', error)
    return ResponseUtil.internalError(res, 'Failed to fetch awards')
  }
})

/**
 * GET /api/achievements/projects
 * Get project highlights
 */
router.get('/projects', async (req, res) => {
  try {
    const featured = req.query.featured === 'true'
    const limit = parseInt(req.query.limit as string) || undefined

    const where = featured ? { isFeatured: true } : {}

    const projects = await prisma.projectHighlight.findMany({
      where,
      orderBy: [
        { isFeatured: 'desc' },
        { startDate: 'desc' }
      ],
      ...(limit && { take: limit })
    })

    const formattedProjects: ProjectHighlight[] = projects.map(project => ({
      id: project.id,
      title: project.title,
      description: project.description,
      technologies: JSON.parse(project.technologies || '[]'),
      projectUrl: project.projectUrl || undefined,
      githubUrl: project.githubUrl || undefined,
      imageUrl: project.imageUrl || undefined,
      startDate: project.startDate.toISOString().split('T')[0],
      endDate: project.endDate ? project.endDate.toISOString().split('T')[0] : undefined,
      isFeatured: project.isFeatured
    }))

    return ResponseUtil.success(res, formattedProjects, 'Project highlights retrieved successfully')
  } catch (error) {
    console.error('Error fetching project highlights:', error)
    return ResponseUtil.internalError(res, 'Failed to fetch project highlights')
  }
})

/**
 * GET /api/achievements/summary
 * Get achievement summary statistics
 */
router.get('/summary', async (req, res) => {
  try {
    const [certCount, awardCount, projectCount, activeCertCount] = await Promise.all([
      prisma.certification.count(),
      prisma.award.count(),
      prisma.projectHighlight.count(),
      prisma.certification.count({
        where: {
          OR: [
            { expiryDate: null },
            { expiryDate: { gt: new Date() } }
          ]
        }
      })
    ])

    const summary = {
      totalCertifications: certCount,
      activeCertifications: activeCertCount,
      totalAwards: awardCount,
      totalProjects: projectCount,
      featuredProjects: await prisma.projectHighlight.count({ where: { isFeatured: true } })
    }

    return ResponseUtil.success(res, summary, 'Achievement summary retrieved successfully')
  } catch (error) {
    console.error('Error fetching achievement summary:', error)
    return ResponseUtil.internalError(res, 'Failed to fetch achievement summary')
  }
})

export default router