import { Router } from 'express'
import { prisma } from '../index'
import { ResponseUtil } from '../utils/response'
import { TechnologiesResponse, Technology, TechCategory } from '../types/api'

const router = Router()

/**
 * GET /api/technologies
 * Get all technologies organized by categories
 */
router.get('/', async (req, res) => {
  try {
    const technologies = await prisma.technology.findMany({
      orderBy: { displayOrder: 'asc' }
    })

    // Format technologies
    const formattedTechnologies: Technology[] = technologies.map(tech => ({
      id: tech.id,
      name: tech.name,
      category: tech.category,
      proficiency: tech.proficiency,
      yearsUsed: tech.yearsUsed || undefined,
      logoUrl: tech.logoUrl || undefined,
      displayOrder: tech.displayOrder
    }))

    // Group by categories
    const categoriesMap = new Map<string, Technology[]>()
    formattedTechnologies.forEach(tech => {
      if (!categoriesMap.has(tech.category)) {
        categoriesMap.set(tech.category, [])
      }
      categoriesMap.get(tech.category)!.push(tech)
    })

    // Convert to categories array
    const categories: TechCategory[] = Array.from(categoriesMap.entries()).map(([name, techs]) => ({
      name,
      technologies: techs.sort((a, b) => b.proficiency - a.proficiency) // Sort by proficiency desc
    }))

    const response: TechnologiesResponse = {
      technologies: formattedTechnologies,
      categories: categories.sort((a, b) => {
        // Custom category order
        const order = ['Frontend', 'Backend', 'Database', 'DevOps']
        const aIndex = order.indexOf(a.name)
        const bIndex = order.indexOf(b.name)
        if (aIndex === -1 && bIndex === -1) return a.name.localeCompare(b.name)
        if (aIndex === -1) return 1
        if (bIndex === -1) return -1
        return aIndex - bIndex
      })
    }

    return ResponseUtil.success(res, response, 'Technologies retrieved successfully')
  } catch (error) {
    console.error('Error fetching technologies:', error)
    return ResponseUtil.internalError(res, 'Failed to fetch technologies')
  }
})

/**
 * GET /api/technologies/category/:category
 * Get technologies by specific category
 */
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params

    const technologies = await prisma.technology.findMany({
      where: {
        category: {
          equals: category,
          mode: 'insensitive' as const
        }
      },
      orderBy: [
        { proficiency: 'desc' },
        { displayOrder: 'asc' }
      ]
    })

    const formattedTechnologies: Technology[] = technologies.map(tech => ({
      id: tech.id,
      name: tech.name,
      category: tech.category,
      proficiency: tech.proficiency,
      yearsUsed: tech.yearsUsed || undefined,
      logoUrl: tech.logoUrl || undefined,
      displayOrder: tech.displayOrder
    }))

    return ResponseUtil.success(
      res, 
      formattedTechnologies, 
      `Technologies in ${category} category retrieved successfully`
    )
  } catch (error) {
    console.error('Error fetching technologies by category:', error)
    return ResponseUtil.internalError(res, 'Failed to fetch technologies by category')
  }
})

/**
 * GET /api/technologies/featured
 * Get top technologies (highest proficiency)
 */
router.get('/featured', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 8

    const technologies = await prisma.technology.findMany({
      where: {
        proficiency: {
          gte: 80 // Only technologies with 80%+ proficiency
        }
      },
      orderBy: [
        { proficiency: 'desc' },
        { yearsUsed: 'desc' }
      ],
      take: limit
    })

    const formattedTechnologies: Technology[] = technologies.map(tech => ({
      id: tech.id,
      name: tech.name,
      category: tech.category,
      proficiency: tech.proficiency,
      yearsUsed: tech.yearsUsed || undefined,
      logoUrl: tech.logoUrl || undefined,
      displayOrder: tech.displayOrder
    }))

    return ResponseUtil.success(
      res, 
      formattedTechnologies, 
      'Featured technologies retrieved successfully'
    )
  } catch (error) {
    console.error('Error fetching featured technologies:', error)
    return ResponseUtil.internalError(res, 'Failed to fetch featured technologies')
  }
})

export default router