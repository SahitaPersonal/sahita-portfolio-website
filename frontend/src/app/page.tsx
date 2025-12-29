'use client'

import { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import { api, getErrorMessage } from '@/lib/api'
import { PersonalInfo, SocialLink } from '@/types/api'

export default function Home() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null)
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const profileData = await api.getProfile()
        setPersonalInfo(profileData.personalInfo)
        setSocialLinks(profileData.socialLinks)
      } catch (err) {
        console.error('Failed to fetch profile data:', err)
        setError(getErrorMessage(err))
        
        // Fallback data for development
        setPersonalInfo({
          id: 1,
          name: 'Sahita',
          title: 'Full-Stack Engineer',
          yearsExperience: 6,
          tagline: 'Passionate about building scalable web applications with modern technologies.',
          aboutText: 'With 6+ years of experience in full-stack development, I specialize in creating scalable web applications that deliver exceptional user experiences. My journey in technology has been driven by a passion for solving complex problems and building solutions that make a real impact.',
        })
        setSocialLinks([
          { id: 1, platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin', displayOrder: 1 },
          { id: 2, platform: 'GitHub', url: 'https://github.com', icon: 'github', displayOrder: 2 },
          { id: 3, platform: 'Email', url: 'mailto:contact@example.com', icon: 'email', displayOrder: 3 },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-300">Loading portfolio...</p>
        </div>
      </div>
    )
  }

  if (error && !personalInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-900">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-white mb-4">Unable to Load Portfolio</h1>
          <p className="text-neutral-400 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <Layout>
      {personalInfo && (
        <>
          <Hero personalInfo={personalInfo} />
          <About personalInfo={personalInfo} />
        </>
      )}
    </Layout>
  )
}
