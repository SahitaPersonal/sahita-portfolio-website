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
        
        // Fix resume URL if it's relative
        const resumeUrl = profileData.resume?.url
        if (resumeUrl) {
          const fullResumeUrl = resumeUrl.startsWith('http') 
            ? resumeUrl 
            : `http://localhost:3001${resumeUrl}`
          setResumeUrl(fullResumeUrl)
        }
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
        const recommendationsData = await apiClient.getRecommendations(1, 100)
        console.log('Recommendations data received:', recommendationsData)
        setRecommendations(recommendationsData || [])
        
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
          title: 'Lead Software Engineer',
          yearsExperience: 6,
          tagline: 'Leading high-performance teams to deliver scalable web applications for 1M+ users',
          aboutText: `Experienced Lead Software Engineer with 6+ years of expertise in full-stack development, currently leading an 8-member team at Lloyds Technology Centre. I specialize in Open Banking, Payment Initiation Services, and building secure, scalable applications using React, Node.js, and modern cloud technologies. 

My journey spans from mobile app development with React Native and Xamarin to leading critical financial services initiatives. I'm passionate about delivering high-quality solutions, mentoring teams, and driving technical excellence in fast-paced, regulated environments.

Based in Dublin, Ireland, I bring a unique combination of technical leadership, hands-on development skills, and experience across diverse industries including fintech, edtech, and hospitality.`,
          profileImageUrl: '/images/profile_main.jpg'
        })
        setSocialLinks([
          { id: 1, platform: 'LinkedIn', url: 'https://www.linkedin.com/in/sahita-m-b01956213/', icon: 'linkedin', displayOrder: 1 },
          { id: 2, platform: 'GitHub', url: 'https://github.com/SahitaPersonal', icon: 'github', displayOrder: 2 },
          { id: 3, platform: 'Email', url: 'mailto:sahitairl98@gmail.com', icon: 'email', displayOrder: 3 },
        ])
        
        // Mock resume data - Fixed URL
        const backendUrl = 'http://localhost:3001'
        setResumeUrl(`${backendUrl}/files/resume.pdf`)
        setResumeAvailable(true)
        
        // Mock technologies data with actual proficiency
        setTechnologies([
          { id: 1, name: 'React', category: 'Frontend', proficiency: 95, yearsUsed: 5, logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', displayOrder: 1 },
          { id: 2, name: 'JavaScript', category: 'Frontend', proficiency: 95, yearsUsed: 6, logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', displayOrder: 2 },
          { id: 3, name: 'TypeScript', category: 'Frontend', proficiency: 90, yearsUsed: 3, logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', displayOrder: 3 },
          { id: 4, name: 'HTML5', category: 'Frontend', proficiency: 95, yearsUsed: 6, logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', displayOrder: 4 },
          { id: 5, name: 'CSS3', category: 'Frontend', proficiency: 90, yearsUsed: 6, logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', displayOrder: 5 },
          { id: 6, name: 'Redux', category: 'Frontend', proficiency: 85, yearsUsed: 4, logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg', displayOrder: 6 },
          { id: 7, name: 'Node.js', category: 'Backend', proficiency: 95, yearsUsed: 5, logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', displayOrder: 7 },
          { id: 8, name: 'Express.js', category: 'Backend', proficiency: 90, yearsUsed: 4, logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', displayOrder: 8 },
          { id: 9, name: 'C#', category: 'Backend', proficiency: 80, yearsUsed: 3, logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg', displayOrder: 9 },
          { id: 10, name: 'React Native', category: 'Mobile', proficiency: 85, yearsUsed: 4, logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', displayOrder: 10 },
          { id: 11, name: 'Xamarin', category: 'Mobile', proficiency: 75, yearsUsed: 2, logoUrl: undefined, displayOrder: 11 },
          { id: 12, name: 'MySQL', category: 'Database', proficiency: 80, yearsUsed: 4, logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', displayOrder: 12 },
          { id: 13, name: 'Google Cloud', category: 'DevOps', proficiency: 80, yearsUsed: 2, logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg', displayOrder: 13 },
          { id: 14, name: 'Docker', category: 'DevOps', proficiency: 75, yearsUsed: 2, logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', displayOrder: 14 },
          { id: 15, name: 'Azure', category: 'DevOps', proficiency: 70, yearsUsed: 1, logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg', displayOrder: 15 },
          { id: 16, name: 'Jest', category: 'Testing', proficiency: 85, yearsUsed: 3, logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg', displayOrder: 16 },
          { id: 17, name: 'NUnit', category: 'Testing', proficiency: 70, yearsUsed: 2, logoUrl: undefined, displayOrder: 17 },
          { id: 18, name: 'Git', category: 'Tools', proficiency: 90, yearsUsed: 6, logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', displayOrder: 18 },
          { id: 19, name: 'GitHub', category: 'Tools', proficiency: 90, yearsUsed: 6, logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', displayOrder: 19 },
          { id: 20, name: 'Jira', category: 'Tools', proficiency: 85, yearsUsed: 4, logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg', displayOrder: 20 },
        ])
        
        setTechCategories([
          { name: 'Frontend', technologies: [] },
          { name: 'Backend', technologies: [] },
          { name: 'Mobile', technologies: [] },
          { name: 'Database', technologies: [] },
          { name: 'DevOps', technologies: [] },
          { name: 'Testing', technologies: [] },
          { name: 'Tools', technologies: [] },
        ])
        
        // Mock experience data with actual work history
        setExperiences([
          {
            id: 1,
            company: 'Lloyds Technology Centre',
            position: 'Lead Software Engineer',
            startDate: '2024-03-15',
            endDate: '2025-09-30',
            description: 'Leading an 8-member team in developing Open Banking Payment Initiation Services. Responsible for API migration to Open Banking v4 standards, ensuring PSD2 compliance, and delivering scalable solutions for 1M+ users.',
            achievements: [
              'Lead 8-member team to deliver web app to 1M+ users',
              'Contributed to API migration to Open Banking v4 standards',
              'Developed scalable, secure APIs and backend services in Node.js',
              'Designed responsive, accessible React front-end components',
              'Served as Release SPOC, triaging bugs and managing releases',
              'Identified and remediated Nexus and SonarQube vulnerabilities',
              'Authored Swagger API definitions and enhanced technical documentation'
            ],
            technologies: ['React', 'Node.js', 'TypeScript', 'Open Banking APIs', 'Jest', 'Swagger', 'PSD2'],
            displayOrder: 1
          },
          {
            id: 2,
            company: 'LeaderJam LLC',
            position: 'Senior Software Developer',
            startDate: '2022-09-12',
            endDate: '2024-03-08',
            description: 'Developed interactive learning platform utilizing ReactJS and NodeJS. Built Udemy-like course management system, event management system, and various core features for the on-demand learning network.',
            achievements: [
              'Developed interactive learning platform with ReactJS and NodeJS',
              'Implemented itineraries functionalities for coaching sessions',
              'Developed Udemy-like course management system and course player',
              'Built Event management system for coaching companies',
              'Contributed to Analytics, Help guides, and learning content features',
              'Managed WordPress site with custom forms and interfaces'
            ],
            technologies: ['React', 'Node.js', 'JavaScript', 'RESTful APIs', 'WordPress'],
            displayOrder: 2
          },
          {
            id: 3,
            company: 'ValueLabs Solutions (NFS Hospitality)',
            position: 'Senior Software Engineer',
            startDate: '2019-05-20',
            endDate: '2022-09-05',
            description: 'Developed mobile and web applications for hospitality management solutions. Worked on cross-platform mobile applications using Xamarin and React Native, implemented authentication systems, and deployed apps to app stores.',
            achievements: [
              'Developed mobile app screens and integrated RESTful APIs',
              'Added test cases for Xamarin applications using NUnit',
              'Provided support for cross-platform mobile applications (Android and iOS)',
              'Implemented token-based and SAML authentication for mobile app',
              'Integrated React JS web application inside Xamarin Mobile App',
              'Deployed mobile applications to Google Play Store and Apple Store'
            ],
            technologies: ['Xamarin', 'React Native', 'React', 'C#', '.NET', 'NUnit', 'SAML'],
            displayOrder: 3
          },
          {
            id: 4,
            company: 'ValueLabs Solutions (Inter IKEA Systems B.V.)',
            position: 'Software Developer',
            startDate: '2020-01-10',
            endDate: '2022-05-25',
            description: 'Worked as IT Partner for Inter-IKEA Systems B.V., managing app deployments and providing technology solutions. Engaged with clients and generated comprehensive reports on app status.',
            achievements: [
              'Managed app deployments on Google and Apple App Stores',
              'Engaged with clients addressing inquiries on app deployment',
              'Generated Monthly and Quarterly reports on app status',
              'Provided comprehensive technology solutions and services'
            ],
            technologies: ['Mobile App Deployment', 'Client Management', 'Reporting'],
            displayOrder: 4
          },
          {
            id: 5,
            company: 'ValueLabs Solutions (Nyfiken)',
            position: 'Junior Software Developer',
            startDate: '2019-05-13',
            endDate: '2019-12-31',
            description: 'Developed internal news and business updates application for IKEA Range & Supply Internal Communication. Quickly learned React Native and became vital part of product development team.',
            achievements: [
              'Learned JavaScript and React Native quickly',
              'Designed and implemented UI screens for mobile application',
              'Worked on fixing existing bugs',
              'Developed custom reusable components and responsive UI'
            ],
            technologies: ['React Native', 'JavaScript', 'Mobile UI Development'],
            displayOrder: 5
          }
        ])
        
        // Mock recommendations data with actual recommendations
        setRecommendations([
          {
            id: 1,
            recommenderName: 'Savitha Gollamudi',
            recommenderTitle: 'SSE',
            recommenderCompany: 'Lloyds Technology Centre',
            relationship: 'Worked on different teams',
            recommendationText: `I've had the pleasure of working closely with Sahita at Lloyds Technology Centre, where she serves as a Lead Full Stack Developer. She consistently brings a high level of ownership and dedication to her work. Whether it's taking responsibility for critical deliverables, working through tight deadlines, or addressing high-priority issues, Sahita is someone you can always rely on to get things done.

One of her standout contributions was designing and developing a solution for V4 impact analysis and redirection errors. She also collaborated with cross-functional teams to implement a common, scalable solution—demonstrating both strong technical skills and the ability to work across team boundaries. In addition, she successfully handled Open Banking certificate renewals, further showcasing her versatility.

She played a key leadership role in migrating On-Prem services to GCP for the PISP team, which was a complex and business-critical initiative.

Her approach to code quality is excellent—she consistently performs effective PR reviews, follows best coding practices, and helps maintain high standards across the team. Moreover, she actively mentors junior team members, fostering a collaborative and supportive environment.

What really sets Sahita apart is her determination to continuously learn and take on new challenges. She is an asset to any team and a great person to work with. I highly recommend her for full stack development roles.`,
            linkedinUrl: 'https://www.linkedin.com/in/sahita-m-b01956213/',
            addedDate: '2024-08-15',
            isFeatured: true
          },
          {
            id: 2,
            recommenderName: 'Ravi Teja Dandu',
            recommenderTitle: 'Vice President of Engineering',
            recommenderCompany: 'LeaderJam',
            relationship: 'Managed Sahita directly',
            recommendationText: `I had the pleasure of managing Sahita during her time at LeaderJam, and I can confidently say she was one of the most hardworking developers in the team.

Even though she joined as a frontend developer, she quickly learned NodeJS and played an important role in building several core features of our platform. She is very dedicated and often worked extra hours to meet tight deadlines and make sure that work was completed with great quality. She was an asset to our team. I strongly recommend Sahita for any team looking for a reliable and hardworking full stack developer.`,
            linkedinUrl: 'https://www.linkedin.com/in/sahita-m-b01956213/',
            addedDate: '2024-03-20',
            isFeatured: true
          },
          {
            id: 3,
            recommenderName: 'Jerry Cogliano',
            recommenderTitle: 'Co-Founder & Chief Customer Officer/Chief Operating Officer',
            recommenderCompany: 'LeaderJam',
            relationship: 'Worked with Sahita but didn\'t manage directly',
            recommendationText: `I had the pleasure of working with Sahita Mudunuri for nearly two years at LeaderJam, where she served as a Senior Software Developer and was a key member of our technical team. Sahita consistently demonstrated strong dedication, a conscientious work ethic, and a proactive approach to learning and growth. During her time with us, she made significant contributions to the development of our interactive learning SaaS platform using ReactJS and NodeJS, integrated RESTful APIs, and implemented key features such as course management, itineraries, event scheduling, and platform analytics. She also played a vital role in enhancing our overall user experience and assisted with WordPress site management. Sahita's eagerness to take on new challenges and her ability to deliver high-quality work made her a valued and respected team member. I highly recommend her and am confident she will be an asset to any organization.`,
            linkedinUrl: 'https://www.linkedin.com/in/sahita-m-b01956213/',
            addedDate: '2024-03-10',
            isFeatured: true
          },
          {
            id: 4,
            recommenderName: 'Surya Teja',
            recommenderTitle: 'SSE',
            recommenderCompany: 'Wells Fargo',
            relationship: 'Worked on same team at Lloyds',
            recommendationText: `I had the chance to work with Sahita on the same project, and I was impressed by her energy and dedication. She is a very quick learner with a strong curiosity that drives her to continuously expand her knowledge. Sahita has an excellent ability to understand business requirements, thanks to her clear communication skills and proactive approach to gathering information. Technically, she is strong in Node.js and React.js, and she combines that expertise with a genuine enthusiasm for solving problems. She is the kind of teammate who uplifts the team with her eagerness to learn and her ability to deliver with quality.`,
            linkedinUrl: 'https://www.linkedin.com/in/sahita-m-b01956213/',
            addedDate: '2024-07-15',
            isFeatured: false
          },
          {
            id: 5,
            recommenderName: 'Naresh Vatti',
            recommenderTitle: 'Delivery Manager',
            recommenderCompany: 'NFS',
            relationship: 'Worked on same team',
            recommendationText: `Sahita reported to me a few years ago while working on a mobile app development project, and it was a pleasure having her on the team. She was hardworking, often went the extra mile to meet tight deadlines, and her attention to detail showed in the quality of her work. She was also a great team player, easy to work with, and brought a positive attitude to everything she did.`,
            linkedinUrl: 'https://www.linkedin.com/in/sahita-m-b01956213/',
            addedDate: '2022-11-10',
            isFeatured: false
          },
          {
            id: 6,
            recommenderName: 'Madhu Kiran Varma',
            recommenderTitle: 'Software Engineer',
            recommenderCompany: 'Tesco',
            relationship: 'Worked on different teams',
            recommendationText: `Sahita is an amazing problem solver and one of the best mobile developers I've seen. Sahita, shows complete dedication to any task and tops any technology paradigm with ease. Takes complete responsibility and is a true team player. Sahita is strong in problem solving and has expertise in scaling systems end-to-end. I'd highly recommend Sahita for SDE and Mobile Application Developer Roles.`,
            linkedinUrl: 'https://www.linkedin.com/in/sahita-m-b01956213/',
            addedDate: '2023-05-18',
            isFeatured: false
          },
          {
            id: 7,
            recommenderName: 'Radhika Murikinati',
            recommenderTitle: 'Program Manager',
            recommenderCompany: 'ValueLabs',
            relationship: 'Managed Sahita directly',
            recommendationText: `Lakshmi sahitha is a good resource. She is proactive and is quick learner. Working and mentoring her is great pleasure for me. She is an asset to our team.`,
            linkedinUrl: 'https://www.linkedin.com/in/sahita-m-b01956213/',
            addedDate: '2021-09-25',
            isFeatured: false
          }
        ])
        
        // Mock certifications data with actual certifications
        setCertifications([
          {
            id: 1,
            name: 'Google Cloud Associate',
            issuer: 'Google',
            issueDate: '2024-12-01',
            expiryDate: undefined,
            credentialId: undefined,
            verificationUrl: undefined,
            logoUrl: 'https://placehold.co/100x100/4285F4/FFFFFF/png?text=GCP',
            category: 'Cloud'
          },
          {
            id: 2,
            name: 'Azure AZ-900',
            issuer: 'Microsoft',
            issueDate: '2021-05-01',
            expiryDate: undefined,
            credentialId: undefined,
            verificationUrl: undefined,
            logoUrl: 'https://placehold.co/100x100/0078D4/FFFFFF/png?text=Azure',
            category: 'Cloud'
          },
          {
            id: 3,
            name: 'Certified Senior System Architect',
            issuer: 'Pega',
            issueDate: '2019-06-01',
            expiryDate: undefined,
            credentialId: undefined,
            verificationUrl: undefined,
            logoUrl: 'https://placehold.co/100x100/FF6B35/FFFFFF/png?text=Pega',
            category: 'Pega'
          },
          {
            id: 4,
            name: 'Certified System Architect',
            issuer: 'Pega',
            issueDate: '2018-11-01',
            expiryDate: undefined,
            credentialId: undefined,
            verificationUrl: undefined,
            logoUrl: 'https://placehold.co/100x100/FF6B35/FFFFFF/png?text=Pega',
            category: 'Pega'
          },
          {
            id: 5,
            name: 'Data Structures using Python',
            issuer: 'NPTEL',
            issueDate: '2017-12-01',
            expiryDate: undefined,
            credentialId: undefined,
            verificationUrl: undefined,
            logoUrl: 'https://placehold.co/100x100/3776AB/FFFFFF/png?text=NPTEL',
            category: 'NPTEL'
          },
          {
            id: 6,
            name: 'British Council certification for English',
            issuer: 'British Council',
            issueDate: '2017-09-01',
            expiryDate: undefined,
            credentialId: undefined,
            verificationUrl: undefined,
            logoUrl: 'https://placehold.co/100x100/003366/FFFFFF/png?text=BC',
            category: 'British Council'
          }
        ])
        
        // Mock awards data with actual achievements
        setAwards([
          {
            id: 1,
            title: 'STAR Performer of the Quarter - 2022',
            issuer: 'ValueLabs Solutions',
            dateAwarded: '2022-12-01',
            description: 'Recognized as STAR performer for outstanding contributions to development, issue resolution, and process improvements in mobile and web application development.',
            category: 'Professional',
            logoUrl: 'https://placehold.co/100x100/FFD700/000000/png?text=STAR'
          },
          {
            id: 2,
            title: 'STAR Performer of the Quarter - 2020',
            issuer: 'ValueLabs Solutions',
            dateAwarded: '2020-12-01',
            description: 'Awarded STAR performer recognition for exceptional performance in software development and team collaboration.',
            category: 'Professional',
            logoUrl: 'https://placehold.co/100x100/FFD700/000000/png?text=STAR'
          },
          {
            id: 3,
            title: 'Outstanding Contribution Award',
            issuer: 'Lloyds Technology Centre',
            dateAwarded: '2024-06-01',
            description: 'Received recognition twice within six months from both manager and product owner for outstanding contributions to development, issue resolution, and process improvements.',
            category: 'Professional',
            logoUrl: 'https://placehold.co/100x100/006341/FFFFFF/png?text=LTC'
          },
          {
            id: 4,
            title: 'Leadership Excellence - Promotion to Team Lead',
            issuer: 'Lloyds Technology Centre',
            dateAwarded: '2024-09-01',
            description: 'Promoted from Engineer to Team Lead within one year, leading a team of 8 engineers and successfully delivering critical initiatives.',
            category: 'Leadership',
            logoUrl: 'https://placehold.co/100x100/006341/FFFFFF/png?text=LEAD'
          }
        ])
        
        // Mock projects data - Empty array
        setProjects([])
        
        // Mock education data with actual education
        setEducation([
          {
            id: 1,
            institution: 'Vishnu Institute of Technology',
            degree: 'Bachelor of Technology',
            fieldOfStudy: 'Computer Science and Engineering',
            startDate: '2015-08-01',
            endDate: '2019-06-30',
            description: 'Comprehensive computer science education with focus on software engineering, data structures, algorithms, and modern web technologies. Achieved excellent academic performance with strong foundation in programming and system design.',
            gpa: '87.7%',
            displayOrder: 1
          },
          {
            id: 2,
            institution: 'Aditya Junior College',
            degree: 'Board of Intermediate Education',
            fieldOfStudy: 'MPC (Mathematics, Physics, Chemistry)',
            startDate: '2013-06-01',
            endDate: '2015-05-31',
            description: 'Pre-university education with focus on Mathematics, Physics, and Chemistry. Achieved outstanding academic performance.',
            gpa: '96.6%',
            displayOrder: 2
          },
          {
            id: 3,
            institution: 'Aditya Public School',
            degree: 'Board of Secondary Education',
            fieldOfStudy: 'Secondary Education',
            startDate: '2012-06-01',
            endDate: '2013-05-31',
            description: 'Secondary education with comprehensive curriculum. Achieved excellent academic performance.',
            gpa: '9.8/10',
            displayOrder: 3
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
            email="sahitairl98@gmail.com"
          />
        </>
      )}
    </Layout>
  )
}
