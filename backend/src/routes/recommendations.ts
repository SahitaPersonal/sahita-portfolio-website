import { Router } from 'express'
import { prisma } from '../index'
import { ResponseUtil } from '../utils/response'
import { RecommendationsResponse, Recommendation } from '../types/api'

const router = Router()

/**
 * GET /api/recommendations
 * Get all recommendations with optional pagination
 */
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const featured = req.query.featured === 'true'

    const skip = (page - 1) * limit

    // Build where clause
    const where = featured ? { isFeatured: true } : {}

    // Get recommendations with pagination
    const [recommendations, totalCount] = await Promise.all([
      prisma.recommendation.findMany({
        where,
        orderBy: [
          { isFeatured: 'desc' },
          { addedDate: 'desc' }
        ],
        skip,
        take: limit
      }),
      prisma.recommendation.count({ where })
    ])

    // Format recommendations
    const formattedRecommendations: Recommendation[] = recommendations.map(rec => ({
      id: rec.id,
      recommenderName: rec.recommenderName,
      recommenderTitle: rec.recommenderTitle || undefined,
      recommenderCompany: rec.recommenderCompany || undefined,
      relationship: rec.relationship || undefined,
      recommendationText: rec.recommendationText,
      linkedinUrl: rec.linkedinUrl || undefined,
      addedDate: rec.addedDate.toISOString().split('T')[0],
      isFeatured: rec.isFeatured
    }))

    const response: RecommendationsResponse = {
      recommendations: formattedRecommendations,
      totalCount
    }

    if (limit && page) {
      return ResponseUtil.paginated(
        res,
        formattedRecommendations,
        page,
        limit,
        totalCount,
        'Recommendations retrieved successfully'
      )
    } else {
      return ResponseUtil.success(res, response, 'Recommendations retrieved successfully')
    }
  } catch (error) {
    console.error('Error fetching recommendations:', error)
    return ResponseUtil.internalError(res, 'Failed to fetch recommendations')
  }
})

/**
 * GET /api/recommendations/featured
 * Get only featured recommendations
 */
router.get('/featured', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 5

    const recommendations = await prisma.recommendation.findMany({
      where: { isFeatured: true },
      orderBy: { addedDate: 'desc' },
      take: limit
    })

    const formattedRecommendations: Recommendation[] = recommendations.map(rec => ({
      id: rec.id,
      recommenderName: rec.recommenderName,
      recommenderTitle: rec.recommenderTitle || undefined,
      recommenderCompany: rec.recommenderCompany || undefined,
      relationship: rec.relationship || undefined,
      recommendationText: rec.recommendationText,
      linkedinUrl: rec.linkedinUrl || undefined,
      addedDate: rec.addedDate.toISOString().split('T')[0],
      isFeatured: rec.isFeatured
    }))

    return ResponseUtil.success(
      res, 
      formattedRecommendations, 
      'Featured recommendations retrieved successfully'
    )
  } catch (error) {
    console.error('Error fetching featured recommendations:', error)
    return ResponseUtil.internalError(res, 'Failed to fetch featured recommendations')
  }
})

/**
 * GET /api/recommendations/:id
 * Get a specific recommendation by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const recommendationId = parseInt(id)

    if (isNaN(recommendationId)) {
      return ResponseUtil.badRequest(res, 'Invalid recommendation ID')
    }

    const recommendation = await prisma.recommendation.findUnique({
      where: { id: recommendationId }
    })

    if (!recommendation) {
      return ResponseUtil.notFound(res, 'Recommendation')
    }

    const formattedRecommendation: Recommendation = {
      id: recommendation.id,
      recommenderName: recommendation.recommenderName,
      recommenderTitle: recommendation.recommenderTitle || undefined,
      recommenderCompany: recommendation.recommenderCompany || undefined,
      relationship: recommendation.relationship || undefined,
      recommendationText: recommendation.recommendationText,
      linkedinUrl: recommendation.linkedinUrl || undefined,
      addedDate: recommendation.addedDate.toISOString().split('T')[0],
      isFeatured: recommendation.isFeatured
    }

    return ResponseUtil.success(res, formattedRecommendation, 'Recommendation retrieved successfully')
  } catch (error) {
    console.error('Error fetching recommendation:', error)
    return ResponseUtil.internalError(res, 'Failed to fetch recommendation')
  }
})

/**
 * GET /api/recommendations/stats
 * Get recommendation statistics
 */
router.get('/stats', async (req, res) => {
  try {
    const [totalCount, featuredCount, companiesCount] = await Promise.all([
      prisma.recommendation.count(),
      prisma.recommendation.count({ where: { isFeatured: true } }),
      prisma.recommendation.groupBy({
        by: ['recommenderCompany'],
        where: {
          recommenderCompany: {
            not: null
          }
        }
      }).then(groups => groups.length)
    ])

    const stats = {
      total: totalCount,
      featured: featuredCount,
      companies: companiesCount,
      averageLength: 0 // Could calculate if needed
    }

    return ResponseUtil.success(res, stats, 'Recommendation statistics retrieved successfully')
  } catch (error) {
    console.error('Error fetching recommendation stats:', error)
    return ResponseUtil.internalError(res, 'Failed to fetch recommendation statistics')
  }
})

export default router