import { Router } from 'express'
import { prisma } from '../index'
import { ResponseUtil } from '../utils/response'
import { ProfileResponse } from '../types/api'

const router = Router()

/**
 * GET /api/profile
 * Get complete profile information including personal info, social links, and resume
 */
router.get('/', async (req, res) => {
  try {
    // Get profile with social links
    const profile = await prisma.profile.findFirst({
      include: {
        socialLinks: {
          orderBy: { displayOrder: 'asc' }
        }
      }
    })

    if (!profile) {
      return ResponseUtil.notFound(res, 'Profile')
    }

    // Format response
    const response: ProfileResponse = {
      personalInfo: {
        id: profile.id,
        name: profile.name,
        title: profile.title,
        yearsExperience: profile.yearsExperience,
        tagline: profile.tagline || undefined,
        aboutText: profile.aboutText || undefined,
        profileImageUrl: profile.profileImageUrl || undefined
      },
      socialLinks: profile.socialLinks.map(link => ({
        id: link.id,
        platform: link.platform,
        url: link.url,
        icon: link.icon || undefined,
        displayOrder: link.displayOrder
      })),
      resume: {
        url: profile.resumeUrl || undefined,
        available: !!profile.resumeUrl
      }
    }

    return ResponseUtil.success(res, response, 'Profile retrieved successfully')
  } catch (error) {
    console.error('Error fetching profile:', error)
    return ResponseUtil.internalError(res, 'Failed to fetch profile')
  }
})

/**
 * GET /api/profile/about
 * Get only the about section information
 */
router.get('/about', async (req, res) => {
  try {
    const profile = await prisma.profile.findFirst({
      select: {
        id: true,
        name: true,
        title: true,
        yearsExperience: true,
        tagline: true,
        aboutText: true,
        profileImageUrl: true
      }
    })

    if (!profile) {
      return ResponseUtil.notFound(res, 'Profile')
    }

    return ResponseUtil.success(res, profile, 'About information retrieved successfully')
  } catch (error) {
    console.error('Error fetching about information:', error)
    return ResponseUtil.internalError(res, 'Failed to fetch about information')
  }
})

/**
 * GET /api/profile/social-links
 * Get only social media links
 */
router.get('/social-links', async (req, res) => {
  try {
    const socialLinks = await prisma.socialLink.findMany({
      orderBy: { displayOrder: 'asc' }
    })

    const formattedLinks = socialLinks.map(link => ({
      id: link.id,
      platform: link.platform,
      url: link.url,
      icon: link.icon || undefined,
      displayOrder: link.displayOrder
    }))

    return ResponseUtil.success(res, formattedLinks, 'Social links retrieved successfully')
  } catch (error) {
    console.error('Error fetching social links:', error)
    return ResponseUtil.internalError(res, 'Failed to fetch social links')
  }
})

export default router