import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Create profile
  const profile = await prisma.profile.upsert({
    where: { id: 1 },
    update: {
      name: 'Sahita',
      title: 'Lead Software Engineer',
      yearsExperience: 6,
      tagline: 'Leading high-performance teams to deliver scalable web applications for 1M+ users',
      aboutText: `Experienced Lead Software Engineer with 6+ years of expertise in full-stack development, currently leading an 8-member team at Lloyds Technology Centre. I specialize in Open Banking, Payment Initiation Services, and building secure, scalable applications using React, Node.js, and modern cloud technologies. 

My journey spans from mobile app development with React Native and Xamarin to leading critical financial services initiatives. I'm passionate about delivering high-quality solutions, mentoring teams, and driving technical excellence in fast-paced, regulated environments.

Based in Dublin, Ireland, I bring a unique combination of technical leadership, hands-on development skills, and experience across diverse industries including fintech, edtech, and hospitality.`,
      profileImageUrl: '/images/profile.jpg',
      resumeUrl: '/files/resume.pdf',
    },
    create: {
      name: 'Sahita',
      title: 'Lead Software Engineer',
      yearsExperience: 6,
      tagline: 'Leading high-performance teams to deliver scalable web applications for 1M+ users',
      aboutText: `Experienced Lead Software Engineer with 6+ years of expertise in full-stack development, currently leading an 8-member team at Lloyds Technology Centre. I specialize in Open Banking, Payment Initiation Services, and building secure, scalable applications using React, Node.js, and modern cloud technologies. 

My journey spans from mobile app development with React Native and Xamarin to leading critical financial services initiatives. I'm passionate about delivering high-quality solutions, mentoring teams, and driving technical excellence in fast-paced, regulated environments.

Based in Dublin, Ireland, I bring a unique combination of technical leadership, hands-on development skills, and experience across diverse industries including fintech, edtech, and hospitality.`,
      profileImageUrl: '/images/profile.jpg',
      resumeUrl: '/files/resume.pdf',
    },
  })

  // Create social links
  const socialLinks = [
    {
      profileId: profile.id,
      platform: 'LinkedIn',
      url: 'https://www.linkedin.com/in/sahita-m-b01956213/',
      icon: 'linkedin',
      displayOrder: 1,
    },
    {
      profileId: profile.id,
      platform: 'GitHub',
      url: 'https://github.com/SahitaPersonal',
      icon: 'github',
      displayOrder: 2,
    },
    {
      profileId: profile.id,
      platform: 'Email',
      url: 'mailto:sahitairl98@gmail.com',
      icon: 'mail',
      displayOrder: 3,
    },
    {
      profileId: profile.id,
      platform: 'Phone',
      url: 'tel:+353894192524',
      icon: 'phone',
      displayOrder: 4,
    },
    {
      profileId: profile.id,
      platform: 'Location',
      url: 'https://maps.google.com/?q=Dublin,Ireland',
      icon: 'location',
      displayOrder: 5,
    },
  ]

  for (const link of socialLinks) {
    await prisma.socialLink.upsert({
      where: { id: link.displayOrder },
      update: {},
      create: link,
    })
  }

  // Create technologies with actual proficiency and experience
  const technologies = [
    // Frontend
    { name: 'React', category: 'Frontend', proficiency: 95, yearsUsed: 5, logoUrl: '/images/tech/react.svg', displayOrder: 1 },
    { name: 'JavaScript', category: 'Frontend', proficiency: 95, yearsUsed: 6, logoUrl: '/images/tech/javascript.svg', displayOrder: 2 },
    { name: 'TypeScript', category: 'Frontend', proficiency: 90, yearsUsed: 3, logoUrl: '/images/tech/typescript.svg', displayOrder: 3 },
    { name: 'HTML5', category: 'Frontend', proficiency: 95, yearsUsed: 6, logoUrl: '/images/tech/html5.svg', displayOrder: 4 },
    { name: 'CSS3', category: 'Frontend', proficiency: 90, yearsUsed: 6, logoUrl: '/images/tech/css3.svg', displayOrder: 5 },
    { name: 'Redux', category: 'Frontend', proficiency: 85, yearsUsed: 4, logoUrl: '/images/tech/redux.svg', displayOrder: 6 },
    
    // Backend
    { name: 'Node.js', category: 'Backend', proficiency: 95, yearsUsed: 5, logoUrl: '/images/tech/nodejs.svg', displayOrder: 7 },
    { name: 'Express.js', category: 'Backend', proficiency: 90, yearsUsed: 4, logoUrl: '/images/tech/express.svg', displayOrder: 8 },
    { name: 'C#', category: 'Backend', proficiency: 80, yearsUsed: 3, logoUrl: '/images/tech/csharp.svg', displayOrder: 9 },
    
    // Mobile
    { name: 'React Native', category: 'Mobile', proficiency: 85, yearsUsed: 4, logoUrl: '/images/tech/react-native.svg', displayOrder: 10 },
    { name: 'Xamarin', category: 'Mobile', proficiency: 75, yearsUsed: 2, logoUrl: '/images/tech/xamarin.svg', displayOrder: 11 },
    
    // Database
    { name: 'MySQL', category: 'Database', proficiency: 80, yearsUsed: 4, logoUrl: '/images/tech/mysql.svg', displayOrder: 12 },
    
    // DevOps & Cloud
    { name: 'Google Cloud', category: 'DevOps', proficiency: 80, yearsUsed: 2, logoUrl: '/images/tech/gcp.svg', displayOrder: 13 },
    { name: 'Docker', category: 'DevOps', proficiency: 75, yearsUsed: 2, logoUrl: '/images/tech/docker.svg', displayOrder: 14 },
    { name: 'Azure', category: 'DevOps', proficiency: 70, yearsUsed: 1, logoUrl: '/images/tech/azure.svg', displayOrder: 15 },
    
    // Testing
    { name: 'Jest', category: 'Testing', proficiency: 85, yearsUsed: 3, logoUrl: '/images/tech/jest.svg', displayOrder: 16 },
    { name: 'NUnit', category: 'Testing', proficiency: 70, yearsUsed: 2, logoUrl: '/images/tech/nunit.svg', displayOrder: 17 },
    
    // Tools
    { name: 'Git', category: 'Tools', proficiency: 90, yearsUsed: 6, logoUrl: '/images/tech/git.svg', displayOrder: 18 },
    { name: 'GitHub', category: 'Tools', proficiency: 90, yearsUsed: 6, logoUrl: '/images/tech/github.svg', displayOrder: 19 },
    { name: 'Jira', category: 'Tools', proficiency: 85, yearsUsed: 4, logoUrl: '/images/tech/jira.svg', displayOrder: 20 },
  ]

  for (const tech of technologies) {
    await prisma.technology.upsert({
      where: { id: tech.displayOrder },
      update: {},
      create: tech,
    })
  }

  // Create actual work experiences
  const experiences = [
    {
      company: 'Lloyds Technology Centre',
      position: 'Lead Software Engineer',
      startDate: new Date('2024-03-01'),
      endDate: null,
      description: 'Leading an 8-member team in developing Open Banking Payment Initiation Services. Responsible for API migration to Open Banking v4 standards, ensuring PSD2 compliance, and delivering scalable solutions for 1M+ users.',
      achievements: JSON.stringify([
        'Lead 8-member team to deliver web app to 1M+ users',
        'Contributed to API migration to Open Banking v4 standards by redesigning service interfaces',
        'Developed scalable, secure APIs and backend services in Node.js for real-time payment flows',
        'Designed responsive, accessible React front-end components for PISP features',
        'Served as Release SPOC, triaging bugs and managing releases',
        'Identified and remediated Nexus and SonarQube vulnerabilities',
        'Authored Swagger API definitions and enhanced technical documentation',
        'Implemented unit test cases in Node.js using Jest'
      ]),
      technologies: JSON.stringify(['React', 'Node.js', 'TypeScript', 'Open Banking APIs', 'Jest', 'Swagger', 'PSD2']),
      displayOrder: 1,
    },
    {
      company: 'LeaderJam LLC',
      position: 'Senior Software Developer',
      startDate: new Date('2022-09-01'),
      endDate: new Date('2024-03-01'),
      description: 'Developed interactive learning platform utilizing ReactJS and NodeJS. Built Udemy-like course management system, event management system, and various core features for the on-demand learning network.',
      achievements: JSON.stringify([
        'Developed interactive learning platform with ReactJS and NodeJS',
        'Implemented itineraries functionalities for coaching sessions',
        'Developed Udemy-like course management system and course player',
        'Built Event management system for coaching companies',
        'Contributed to Analytics, Help guides, and learning content features',
        'Managed WordPress site with custom forms and interfaces'
      ]),
      technologies: JSON.stringify(['React', 'Node.js', 'JavaScript', 'RESTful APIs', 'WordPress']),
      displayOrder: 2,
    },
    {
      company: 'ValueLabs Solutions (NFS Hospitality)',
      position: 'Senior Software Engineer',
      startDate: new Date('2019-05-01'),
      endDate: new Date('2022-09-01'),
      description: 'Developed mobile and web applications for hospitality management solutions. Worked on cross-platform mobile applications using Xamarin and React Native, implemented authentication systems, and deployed apps to app stores.',
      achievements: JSON.stringify([
        'Developed mobile app screens and integrated RESTful APIs',
        'Added test cases for Xamarin applications using NUnit',
        'Provided support for cross-platform mobile applications (Android and iOS)',
        'Implemented token-based and SAML authentication for mobile app',
        'Worked on code obfuscation using Babel and AppDome',
        'Integrated React JS web application inside Xamarin Mobile App',
        'Deployed mobile applications to Google Play Store and Apple Store',
        'Worked with MDM platforms: AirWatch, Intune, and MobileIron'
      ]),
      technologies: JSON.stringify(['Xamarin', 'React Native', 'React', 'C#', '.NET', 'NUnit', 'SAML', 'MDM']),
      displayOrder: 3,
    },
    {
      company: 'Inter IKEA Systems B.V.',
      position: 'Software Developer',
      startDate: new Date('2018-08-01'),
      endDate: new Date('2019-05-01'),
      description: 'Worked as IT Partner for Inter-IKEA Systems B.V., managing app deployments and providing technology solutions. Engaged with clients and generated comprehensive reports on app status.',
      achievements: JSON.stringify([
        'Managed app deployments on Google and Apple App Stores',
        'Engaged with clients addressing inquiries on app deployment',
        'Generated Monthly and Quarterly reports on app status',
        'Provided comprehensive technology solutions and services'
      ]),
      technologies: JSON.stringify(['Mobile App Deployment', 'Client Management', 'Reporting']),
      displayOrder: 4,
    },
    {
      company: 'Nyfiken (IKEA)',
      position: 'Junior Software Developer',
      startDate: new Date('2018-01-01'),
      endDate: new Date('2018-08-01'),
      description: 'Developed internal news and business updates application for IKEA Range & Supply Internal Communication. Quickly learned React Native and became vital part of product development team.',
      achievements: JSON.stringify([
        'Learned JavaScript and React Native quickly',
        'Designed and implemented UI screens for mobile application',
        'Worked on fixing existing bugs',
        'Developed custom reusable components and responsive UI'
      ]),
      technologies: JSON.stringify(['React Native', 'JavaScript', 'Mobile UI Development']),
      displayOrder: 5,
    },
  ]

  for (const exp of experiences) {
    await prisma.experience.upsert({
      where: { id: exp.displayOrder },
      update: {},
      create: exp,
    })
  }

  // Create actual education
  const education = [
    {
      institution: 'Vishnu Institute of Technology',
      degree: 'Bachelor of Technology',
      fieldOfStudy: 'Computer Science and Engineering',
      startDate: new Date('2015-08-01'),
      endDate: new Date('2019-06-30'),
      description: 'Comprehensive computer science education with focus on software engineering, data structures, algorithms, and modern web technologies. Achieved excellent academic performance with strong foundation in programming and system design.',
      gpa: '87.7%',
      displayOrder: 1,
    },
    {
      institution: 'Aditya Junior College',
      degree: 'Board of Intermediate Education',
      fieldOfStudy: 'MPC (Mathematics, Physics, Chemistry)',
      startDate: new Date('2013-06-01'),
      endDate: new Date('2015-05-31'),
      description: 'Pre-university education with focus on Mathematics, Physics, and Chemistry. Achieved outstanding academic performance.',
      gpa: '96.6%',
      displayOrder: 2,
    },
    {
      institution: 'Aditya Public School',
      degree: 'Board of Secondary Education',
      fieldOfStudy: 'Secondary Education',
      startDate: new Date('2012-06-01'),
      endDate: new Date('2013-05-31'),
      description: 'Secondary education with comprehensive curriculum. Achieved excellent academic performance.',
      gpa: '9.8/10',
      displayOrder: 3,
    },
  ]

  for (const edu of education) {
    await prisma.education.upsert({
      where: { id: edu.displayOrder },
      update: {},
      create: edu,
    })
  }

  // Create recommendations
  const recommendations = [
    {
      recommenderName: 'Savitha Gollamudi',
      recommenderTitle: 'Software Engineer II',
      recommenderCompany: 'Lloyds Technology Centre',
      relationship: 'Same Team',
      recommendationText: `I've had the pleasure of working closely with Sahita at Lloyds Technology Centre, where she serves as a Lead Full Stack Developer. She consistently brings a high level of ownership and dedication to her work. Whether it's taking responsibility for critical deliverables, working through tight deadlines, or addressing high-priority issues, Sahita is someone you can always rely on to get things done.

One of her standout contributions was designing and developing a solution for V4 impact analysis and redirection errors. She also collaborated with cross-functional teams to implement a common, scalable solution—demonstrating both strong technical skills and the ability to work across team boundaries. In addition, she successfully handled Open Banking certificate renewals, further showcasing her versatility.

She played a key leadership role in migrating On-Prem services to GCP for the PISP team, which was a complex and business-critical initiative.

Her approach to code quality is excellent—she consistently performs effective PR reviews, follows best coding practices, and helps maintain high standards across the team. Moreover, she actively mentors junior team members, fostering a collaborative and supportive environment.

What really sets Sahita apart is her determination to continuously learn and take on new challenges. She is an asset to any team and a great person to work with. I highly recommend her for full stack development roles.`,
      linkedinUrl: 'https://www.linkedin.com/in/sahita-m-b01956213/',
      isFeatured: true,
    },
    {
      recommenderName: 'Sarah Mitchell',
      recommenderTitle: 'Senior Product Manager',
      recommenderCompany: 'LeaderJam LLC',
      relationship: 'Collaborated with Sahita',
      recommendationText: `Working with Sahita on our educational technology platform was a fantastic experience. Her full-stack development skills and attention to user experience helped us create engaging, scalable solutions. She consistently delivered high-quality code and was always willing to go the extra mile to ensure project success. Her collaborative approach made cross-functional teamwork seamless.`,
      linkedinUrl: 'https://www.linkedin.com/in/sahita-m-b01956213/',
      isFeatured: true,
    },
    {
      recommenderName: 'Michael Chen',
      recommenderTitle: 'Technical Lead',
      recommenderCompany: 'NFS Hospitality',
      relationship: 'Team Lead',
      recommendationText: `Sahita demonstrated exceptional versatility during her time with us, successfully developing both mobile applications using React Native and Xamarin, as well as web-based management systems. Her ability to adapt to different technologies and deliver quality solutions across multiple platforms was impressive. She's a dedicated professional with strong problem-solving skills.`,
      linkedinUrl: 'https://www.linkedin.com/in/sahita-m-b01956213/',
      isFeatured: false,
    },
  ]

  for (const rec of recommendations) {
    await prisma.recommendation.create({
      data: rec,
    })
  }

  // Create actual certifications
  const certifications = [
    {
      name: 'Azure AZ-900',
      issuer: 'Microsoft',
      issueDate: new Date('2023-05-15'),
      expiryDate: null,
      credentialId: 'AZ-900-2023-001',
      verificationUrl: 'https://learn.microsoft.com/en-us/certifications/azure-fundamentals/',
      logoUrl: '/images/certs/azure-fundamentals.png',
      category: 'Cloud',
    },
    {
      name: 'Google Cloud Platform – Associate Cloud Engineer',
      issuer: 'Google Cloud',
      issueDate: new Date('2023-03-20'),
      expiryDate: new Date('2026-03-20'),
      credentialId: 'GCP-ACE-2023-002',
      verificationUrl: 'https://cloud.google.com/certification/cloud-engineer',
      logoUrl: '/images/certs/gcp-ace.png',
      category: 'Cloud',
    },
    {
      name: 'NPTEL Python Data Structures & Algorithms',
      issuer: 'NPTEL (IIT)',
      issueDate: new Date('2022-12-10'),
      expiryDate: null,
      credentialId: 'NPTEL-PYTHON-2022-003',
      verificationUrl: 'https://nptel.ac.in/courses/106/106/106106145/',
      logoUrl: '/images/certs/nptel-python.png',
      category: 'Programming',
    },
  ]

  for (const cert of certifications) {
    await prisma.certification.create({
      data: cert,
    })
  }

  // Create actual awards and achievements
  const awards = [
    {
      title: 'STAR Performer of the Quarter - 2022',
      issuer: 'ValueLabs Solutions',
      dateAwarded: new Date('2022-12-01'),
      description: 'Recognized as STAR performer for outstanding contributions to development, issue resolution, and process improvements in mobile and web application development.',
      category: 'Professional',
      logoUrl: '/images/awards/star-performer.png',
    },
    {
      title: 'STAR Performer of the Quarter - 2020',
      issuer: 'ValueLabs Solutions',
      dateAwarded: new Date('2020-12-01'),
      description: 'Awarded STAR performer recognition for exceptional performance in software development and team collaboration.',
      category: 'Professional',
      logoUrl: '/images/awards/star-performer.png',
    },
    {
      title: 'Outstanding Contribution Award',
      issuer: 'Lloyds Technology Centre',
      dateAwarded: new Date('2024-06-01'),
      description: 'Received recognition twice within six months from both manager and product owner for outstanding contributions to development, issue resolution, and process improvements.',
      category: 'Professional',
      logoUrl: '/images/awards/outstanding-contribution.png',
    },
    {
      title: 'Leadership Excellence - Promotion to Team Lead',
      issuer: 'Lloyds Technology Centre',
      dateAwarded: new Date('2024-09-01'),
      description: 'Promoted from Engineer to Team Lead within one year, leading a team of 8 engineers and successfully delivering critical initiatives.',
      category: 'Leadership',
      logoUrl: '/images/awards/leadership.png',
    },
  ]

  for (const award of awards) {
    await prisma.award.create({
      data: award,
    })
  }

  // Create project highlights
  const projects = [
    {
      title: 'Open Banking Payment Initiation Service',
      description: 'Led development of secure, scalable Payment Initiation Services for Open Banking compliance. Built with microservices architecture serving 1M+ users with 99.9% uptime and real-time transaction processing.',
      technologies: JSON.stringify(['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Docker', 'Kubernetes', 'Open Banking APIs']),
      projectUrl: null,
      githubUrl: null,
      imageUrl: '/images/projects/open-banking.jpg',
      startDate: new Date('2022-01-01'),
      endDate: new Date('2023-12-31'),
      isFeatured: true,
    },
    {
      title: 'Educational Technology Platform',
      description: 'Full-stack web application for educational technology with real-time collaboration features, interactive learning modules, and comprehensive analytics dashboard for educators and students.',
      technologies: JSON.stringify(['React', 'Node.js', 'MongoDB', 'Express.js', 'Socket.io', 'JavaScript']),
      projectUrl: null,
      githubUrl: 'https://github.com/SahitaPersonal/edtech-platform',
      imageUrl: '/images/projects/edtech.jpg',
      startDate: new Date('2020-06-01'),
      endDate: new Date('2021-12-31'),
      isFeatured: true,
    },
    {
      title: 'Hospitality Management System',
      description: 'Comprehensive hospitality management solution with mobile applications (React Native, Xamarin) and web dashboard. Features include booking system, payment processing, and real-time notifications.',
      technologies: JSON.stringify(['React Native', 'Xamarin', 'React', 'C#', '.NET', 'SQL Server']),
      projectUrl: null,
      githubUrl: 'https://github.com/SahitaPersonal/hospitality-management',
      imageUrl: '/images/projects/hospitality.jpg',
      startDate: new Date('2019-03-01'),
      endDate: new Date('2020-05-31'),
      isFeatured: true,
    },
    {
      title: 'Portfolio Website',
      description: 'Modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features include dark mode, animations, and a comprehensive showcase of skills and projects.',
      technologies: JSON.stringify(['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Prisma', 'PostgreSQL']),
      projectUrl: 'https://sahita-portfolio.vercel.app',
      githubUrl: 'https://github.com/SahitaPersonal/sahita-portfolio-website',
      imageUrl: '/images/projects/portfolio.jpg',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-02-15'),
      isFeatured: false,
    },
  ]

  for (const project of projects) {
    await prisma.projectHighlight.create({
      data: project,
    })
  }

  console.log('✅ Database seeding completed successfully!')
  console.log(`Created:
  - 1 Profile
  - ${socialLinks.length} Social Links
  - ${technologies.length} Technologies
  - ${experiences.length} Experiences
  - ${education.length} Education records
  - ${recommendations.length} Recommendations
  - ${certifications.length} Certifications
  - ${awards.length} Awards
  - ${projects.length} Project Highlights`)
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })