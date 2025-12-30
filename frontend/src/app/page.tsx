'use client'

import { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import TechnologyShowcase from '@/components/sections/TechnologyShowcase'
import Expertise from '@/components/sections/Expertise'
import JourneyTimeline from '@/components/sections/JourneyTimeline'
import Academic from '@/components/sections/Academic'
import Recommendations from '@/components/sections/Recommendations'
import Achievements from '@/components/sections/Achievements'
import ResumeViewer from '@/components/sections/ResumeViewer'
import Connect from '@/components/sections/Connect'
import { apiClient } from '@/lib/api'
import { PersonalInfo, SocialLink, Technology, TechCategory, Experience, Education, Recommendation, Certification, Award, ProjectHighlight } from '@/types/api'

export default function Home() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null)
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([])
  const [technologies, setTechnologies] = useState<Technology[]>([])
  const [techCategories, setTechCategories] = useState<TechCategory[]>([])
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [education, setEducation] = useState<Education[]>([])
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [certifications, setCertifications] = useState<Certification[]>([])
  const [awards, setAwards] = useState<Award[]>([])
  const [projects, setProjects] = useState<ProjectHighlight[]>([])
  const [resumeUrl, setResumeUrl] = useState<string | undefined>(undefined)
  const [resumeAvailable, setResumeAvailable] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Test API connectivity first
        console.log('Testing API connectivity...')
        
        // Fetch profile data
        const profileData = await apiClient.getProfile()
        console.log('Profile data received:', profileData)
        setPersonalInfo(profileData.personalInfo)
        setSocialLinks(profileData.socialLinks)
        setResumeUrl(profileData.resume?.url)
        setResumeAvailable(profileData.resume?.available || false)
        
        // Fetch technologies data
        const technologiesData = await apiClient.getTechnologies()
        console.log('Technologies data received:', technologiesData)
        setTechnologies(technologiesData.technologies)
        setTechCategories(technologiesData.categories)
        
        // Fetch experience data
        const experienceData = await apiClient.getExperience()
        console.log('Experience data received:', experienceData)
        setExperiences(experienceData.experiences)
        setEducation(experienceData.education)
        
        // Fetch recommendations data
        const recommendationsData = await apiClient.getRecommendations()
        console.log('Recommendations data received:', recommendationsData)
        setRecommendations(recommendationsData.recommendations)
        
        // Fetch achievements data
        const achievementsData = await apiClient.getAchievements()
        console.log('Achievements data received:', achievementsData)
        setCertifications(achievementsData.certifications)
        setAwards(achievementsData.awards)
        setProjects(achievementsData.projects)
        
      } catch (err) {
        console.error('Failed to fetch data:', err)
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
        setError(errorMessage)
        
        // Fallback data for development
        console.log('Using fallback data due to API error')
        setPersonalInfo({
          id: 1,
          name: 'Sahita',
          title: 'Full-Stack Engineer',
          yearsExperience: 6,
          tagline: 'Passionate about building scalable web applications with modern technologies.',
          aboutText: 'With 6+ years of experience in full-stack development, I specialize in creating scalable web applications that deliver exceptional user experiences. My journey in technology has been driven by a passion for solving complex problems and building solutions that make a real impact.',
          profileImageUrl: '/images/profile.svg'
        })
        setSocialLinks([
          { id: 1, platform: 'LinkedIn', url: 'https://www.linkedin.com/in/sahita-m-b01956213/', icon: 'linkedin', displayOrder: 1 },
          { id: 2, platform: 'GitHub', url: 'https://github.com/SahitaPersonal', icon: 'github', displayOrder: 2 },
          { id: 3, platform: 'Email', url: 'mailto:contact@sahita.dev', icon: 'email', displayOrder: 3 },
        ])
        
        // Mock resume data
        setResumeUrl('/api/files/resume/Sahita_Resume.pdf')
        setResumeAvailable(true)
        
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
        
        // Mock recommendations data
        setRecommendations([
          {
            id: 1,
            recommenderName: 'Sarah Johnson',
            recommenderTitle: 'Senior Product Manager',
            recommenderCompany: 'Tech Solutions Inc.',
            relationship: 'Worked directly with Sahita',
            recommendationText: 'Sahita is an exceptional full-stack developer who consistently delivers high-quality solutions. Their technical expertise in React and Node.js, combined with strong problem-solving skills, made them invaluable to our team. They have a unique ability to translate complex requirements into elegant, scalable code.',
            linkedinUrl: 'https://www.linkedin.com/in/sahita-m-b01956213/',
            addedDate: '2023-08-15',
            isFeatured: true
          },
          {
            id: 2,
            recommenderName: 'Michael Chen',
            recommenderTitle: 'Lead Software Engineer',
            recommenderCompany: 'Digital Innovations Ltd.',
            relationship: 'Managed Sahita directly',
            recommendationText: 'I had the pleasure of working with Sahita for over two years. Their dedication to writing clean, maintainable code and their collaborative approach made them a standout team member. Sahita consistently went above and beyond to ensure project success and was always willing to mentor junior developers.',
            linkedinUrl: 'https://www.linkedin.com/in/sahita-m-b01956213/',
            addedDate: '2022-01-20',
            isFeatured: true
          },
          {
            id: 3,
            recommenderName: 'Emily Rodriguez',
            recommenderTitle: 'UX Designer',
            recommenderCompany: 'StartupCo',
            relationship: 'Collaborated with Sahita',
            recommendationText: 'Sahita has an excellent eye for detail and user experience. Working with them on multiple projects was always a pleasure - they understood design requirements perfectly and implemented them with pixel-perfect precision. Their frontend skills are truly impressive.',
            addedDate: '2021-11-10',
            isFeatured: false
          },
          {
            id: 4,
            recommenderName: 'David Park',
            recommenderTitle: 'CTO',
            recommenderCompany: 'InnovateTech',
            relationship: 'Sahita reported to David',
            recommendationText: 'Sahita is a talented developer with strong technical skills and excellent communication abilities. They played a key role in several critical projects and consistently delivered results on time. I would highly recommend Sahita for any full-stack development role.',
            linkedinUrl: 'https://www.linkedin.com/in/sahita-m-b01956213/',
            addedDate: '2023-03-05',
            isFeatured: false
          },
          {
            id: 5,
            recommenderName: 'Lisa Thompson',
            recommenderTitle: 'Project Manager',
            recommenderCompany: 'Tech Solutions Inc.',
            relationship: 'Worked with Sahita on multiple projects',
            recommendationText: 'Sahita is not only technically proficient but also an excellent team player. Their ability to break down complex problems and communicate solutions clearly made project management much smoother. They are reliable, professional, and always deliver quality work.',
            addedDate: '2023-06-18',
            isFeatured: true
          }
        ])
        
        // Mock certifications data
        setCertifications([
          {
            id: 1,
            name: 'AWS Certified Solutions Architect - Professional',
            issuer: 'Amazon Web Services',
            issueDate: '2023-03-15',
            expiryDate: '2026-03-15',
            credentialId: 'AWS-SAP-2023-001234',
            verificationUrl: 'https://aws.amazon.com/verification/AWS-SAP-2023-001234',
            category: 'Cloud'
          },
          {
            id: 2,
            name: 'Certified Kubernetes Administrator (CKA)',
            issuer: 'Cloud Native Computing Foundation',
            issueDate: '2023-01-20',
            expiryDate: '2026-01-20',
            credentialId: 'CKA-2023-567890',
            verificationUrl: 'https://training.linuxfoundation.org/certification/verify',
            category: 'DevOps'
          },
          {
            id: 3,
            name: 'Google Cloud Professional Developer',
            issuer: 'Google Cloud',
            issueDate: '2022-11-10',
            expiryDate: '2024-11-10',
            credentialId: 'GCP-PD-2022-112233',
            category: 'Cloud'
          },
          {
            id: 4,
            name: 'MongoDB Certified Developer Associate',
            issuer: 'MongoDB Inc.',
            issueDate: '2023-06-05',
            credentialId: 'MDB-DEV-2023-445566',
            verificationUrl: 'https://university.mongodb.com/certification/verify',
            category: 'Database'
          },
          {
            id: 5,
            name: 'React Developer Certification',
            issuer: 'Meta (Facebook)',
            issueDate: '2023-08-12',
            credentialId: 'META-REACT-2023-778899',
            category: 'Frontend'
          }
        ])
        
        // Mock awards data
        setAwards([
          {
            id: 1,
            title: 'Employee of the Year 2023',
            issuer: 'Tech Solutions Inc.',
            dateAwarded: '2023-12-15',
            description: 'Recognized for outstanding performance, leadership, and contribution to multiple successful projects throughout the year.',
            category: 'Performance'
          },
          {
            id: 2,
            title: 'Innovation Award - Best Technical Solution',
            issuer: 'Digital Innovations Ltd.',
            dateAwarded: '2022-09-20',
            description: 'Awarded for developing an innovative microservices architecture that improved system performance by 40%.',
            category: 'Innovation'
          },
          {
            id: 3,
            title: 'Hackathon Winner - Best Full-Stack Application',
            issuer: 'TechCorp Annual Hackathon',
            dateAwarded: '2023-04-08',
            description: 'First place winner for developing a complete e-commerce platform in 48 hours using React, Node.js, and MongoDB.',
            category: 'Competition'
          },
          {
            id: 4,
            title: 'Mentor of the Year',
            issuer: 'StartupCo',
            dateAwarded: '2021-11-30',
            description: 'Recognized for exceptional mentoring of junior developers and contributing to team growth and knowledge sharing.',
            category: 'Leadership'
          }
        ])
        
        // Mock projects data
        setProjects([
          {
            id: 1,
            title: 'E-Commerce Platform with Microservices',
            description: 'Built a scalable e-commerce platform using microservices architecture with React frontend, Node.js backend, and MongoDB. Implemented features like user authentication, product catalog, shopping cart, payment processing, and order management.',
            technologies: ['React', 'Node.js', 'MongoDB', 'Docker', 'Kubernetes', 'Redis', 'Stripe API'],
            projectUrl: 'https://ecommerce-demo.sahita.dev',
            githubUrl: 'https://github.com/SahitaPersonal/ecommerce-platform',
            startDate: '2023-01-15',
            endDate: '2023-06-30',
            isFeatured: true
          },
          {
            id: 2,
            title: 'Real-Time Chat Application',
            description: 'Developed a real-time chat application with WebSocket support, featuring multiple chat rooms, file sharing, emoji reactions, and user presence indicators. Built with modern web technologies and deployed on AWS.',
            technologies: ['Next.js', 'Socket.io', 'PostgreSQL', 'Prisma', 'AWS', 'TypeScript'],
            projectUrl: 'https://chat-app.sahita.dev',
            githubUrl: 'https://github.com/SahitaPersonal/realtime-chat',
            startDate: '2022-08-01',
            endDate: '2022-11-15',
            isFeatured: true
          },
          {
            id: 3,
            title: 'Task Management Dashboard',
            description: 'Created a comprehensive task management dashboard with drag-and-drop functionality, team collaboration features, time tracking, and detailed analytics. Includes mobile-responsive design and offline capabilities.',
            technologies: ['Vue.js', 'Express.js', 'MySQL', 'Chart.js', 'PWA', 'WebSockets'],
            projectUrl: 'https://taskmanager.sahita.dev',
            githubUrl: 'https://github.com/SahitaPersonal/task-dashboard',
            startDate: '2022-03-10',
            endDate: '2022-07-20',
            isFeatured: false
          },
          {
            id: 4,
            title: 'AI-Powered Code Review Tool',
            description: 'Developed an AI-powered code review tool that analyzes code quality, suggests improvements, and detects potential bugs. Integrated with popular version control systems and CI/CD pipelines.',
            technologies: ['Python', 'FastAPI', 'TensorFlow', 'React', 'PostgreSQL', 'Docker', 'GitHub API'],
            githubUrl: 'https://github.com/SahitaPersonal/ai-code-review',
            startDate: '2023-07-01',
            endDate: '2023-10-15',
            isFeatured: true
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
    <Layout socialLinks={socialLinks}>
      {personalInfo && (
        <>
          <Hero personalInfo={personalInfo} />
          <About personalInfo={personalInfo} />
          <TechnologyShowcase technologies={technologies} categories={techCategories} />
          <Expertise technologies={technologies} />
          <JourneyTimeline experiences={experiences} />
          <Academic education={education} />
          <Recommendations recommendations={recommendations} />
          <Achievements 
            certifications={certifications}
            awards={awards}
            projects={projects}
          />
          <ResumeViewer 
            resumeUrl={resumeUrl}
            available={resumeAvailable}
          />
          <Connect 
            linkedinUrl="https://www.linkedin.com/in/sahita-m-b01956213/"
            email="contact@sahita.dev"
          />
        </>
      )}
    </Layout>
  )
}
