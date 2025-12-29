'use client'

import { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import TechnologyShowcase from '@/components/sections/TechnologyShowcase'
import Expertise from '@/components/sections/Expertise'
import JourneyTimeline from '@/components/sections/JourneyTimeline'
import Academic from '@/components/sections/Academic'
import { apiClient } from '@/lib/api'
import { PersonalInfo, SocialLink, Technology, TechCategory, Experience, Education } from '@/types/api'

export default function Home() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null)
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([])
  const [technologies, setTechnologies] = useState<Technology[]>([])
  const [techCategories, setTechCategories] = useState<TechCategory[]>([])
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [education, setEducation] = useState<Education[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Fetch profile data
        const profileData = await apiClient.getProfile()
        setPersonalInfo(profileData.personalInfo)
        setSocialLinks(profileData.socialLinks)
        
        // Fetch technologies data
        const technologiesData = await apiClient.getTechnologies()
        setTechnologies(technologiesData.technologies)
        setTechCategories(technologiesData.categories)
        
        // Fetch experience data
        const experienceData = await apiClient.getExperience()
        setExperiences(experienceData.experiences)
        setEducation(experienceData.education)
        
      } catch (err) {
        console.error('Failed to fetch data:', err)
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
        setError(errorMessage)
        
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
          { id: 1, platform: 'LinkedIn', url: 'https://linkedin.com/in/sahita', icon: 'linkedin', displayOrder: 1 },
          { id: 2, platform: 'GitHub', url: 'https://github.com/SahitaPersonal', icon: 'github', displayOrder: 2 },
          { id: 3, platform: 'Email', url: 'mailto:contact@sahita.dev', icon: 'email', displayOrder: 3 },
        ])
        
        // Mock technologies data
        setTechnologies([
          { id: 1, name: 'React', category: 'Frontend', proficiency: 95, yearsUsed: 5, logoUrl: undefined, displayOrder: 1 },
          { id: 2, name: 'TypeScript', category: 'Language', proficiency: 90, yearsUsed: 4, logoUrl: undefined, displayOrder: 2 },
          { id: 3, name: 'Node.js', category: 'Backend', proficiency: 88, yearsUsed: 6, logoUrl: undefined, displayOrder: 3 },
          { id: 4, name: 'Next.js', category: 'Frontend', proficiency: 92, yearsUsed: 3, logoUrl: undefined, displayOrder: 4 },
          { id: 5, name: 'PostgreSQL', category: 'Database', proficiency: 85, yearsUsed: 5, logoUrl: undefined, displayOrder: 5 },
          { id: 6, name: 'Express', category: 'Backend', proficiency: 87, yearsUsed: 5, logoUrl: undefined, displayOrder: 6 },
          { id: 7, name: 'Tailwind CSS', category: 'Frontend', proficiency: 93, yearsUsed: 3, logoUrl: undefined, displayOrder: 7 },
          { id: 8, name: 'Prisma', category: 'Database', proficiency: 82, yearsUsed: 2, logoUrl: undefined, displayOrder: 8 },
          { id: 9, name: 'Docker', category: 'DevOps', proficiency: 78, yearsUsed: 4, logoUrl: undefined, displayOrder: 9 },
          { id: 10, name: 'AWS', category: 'Cloud', proficiency: 75, yearsUsed: 3, logoUrl: undefined, displayOrder: 10 },
          { id: 11, name: 'Git', category: 'Tools', proficiency: 90, yearsUsed: 6, logoUrl: undefined, displayOrder: 11 },
          { id: 12, name: 'JavaScript', category: 'Language', proficiency: 94, yearsUsed: 6, logoUrl: undefined, displayOrder: 12 },
        ])
        
        setTechCategories([
          { name: 'Frontend', technologies: [] },
          { name: 'Backend', technologies: [] },
          { name: 'Database', technologies: [] },
          { name: 'DevOps', technologies: [] },
          { name: 'Language', technologies: [] },
          { name: 'Tools', technologies: [] },
          { name: 'Cloud', technologies: [] },
        ])
        
        // Mock experience data
        setExperiences([
          {
            id: 1,
            company: 'Tech Solutions Inc.',
            position: 'Senior Full-Stack Developer',
            startDate: '2022-01-01',
            endDate: undefined,
            description: 'Leading development of scalable web applications using modern technologies. Responsible for architecture decisions and mentoring junior developers.',
            achievements: [
              'Improved application performance by 40% through optimization',
              'Led migration to microservices architecture',
              'Mentored 3 junior developers',
              'Implemented CI/CD pipeline reducing deployment time by 60%'
            ],
            technologies: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'AWS'],
            displayOrder: 1
          },
          {
            id: 2,
            company: 'Digital Innovations Ltd.',
            position: 'Full-Stack Developer',
            startDate: '2020-03-01',
            endDate: '2021-12-31',
            description: 'Developed and maintained multiple client projects using React and Node.js. Collaborated with design and product teams to deliver high-quality solutions.',
            achievements: [
              'Delivered 8 successful client projects',
              'Reduced bug reports by 35% through improved testing',
              'Implemented responsive design patterns',
              'Optimized database queries improving load times by 25%'
            ],
            technologies: ['React', 'Express', 'MongoDB', 'JavaScript', 'Tailwind CSS'],
            displayOrder: 2
          },
          {
            id: 3,
            company: 'StartupCo',
            position: 'Frontend Developer',
            startDate: '2018-06-01',
            endDate: '2020-02-28',
            description: 'Built user interfaces for a fast-growing startup. Worked closely with UX designers to create intuitive and engaging user experiences.',
            achievements: [
              'Developed the company\'s main product interface',
              'Increased user engagement by 50%',
              'Implemented A/B testing framework',
              'Created reusable component library'
            ],
            technologies: ['React', 'Redux', 'JavaScript', 'SCSS', 'Jest'],
            displayOrder: 3
          }
        ])
        
        // Mock education data
        setEducation([
          {
            id: 1,
            institution: 'University of Technology',
            degree: 'Bachelor of Science in Computer Science',
            fieldOfStudy: 'Computer Science',
            startDate: '2014-09-01',
            endDate: '2018-05-31',
            description: 'Focused on software engineering, algorithms, and data structures. Participated in various programming competitions and hackathons.',
            gpa: '3.8',
            displayOrder: 1
          },
          {
            id: 2,
            institution: 'Tech Institute',
            degree: 'Certificate in Full-Stack Web Development',
            fieldOfStudy: 'Web Development',
            startDate: '2017-01-01',
            endDate: '2017-06-30',
            description: 'Intensive program covering modern web development technologies including React, Node.js, and database design.',
            displayOrder: 2
          }
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
          <TechnologyShowcase technologies={technologies} categories={techCategories} />
          <Expertise technologies={technologies} />
          <JourneyTimeline experiences={experiences} />
          <Academic education={education} />
        </>
      )}
    </Layout>
  )
}
