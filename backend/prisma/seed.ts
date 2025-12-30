import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Create profile
  const profile = await prisma.profile.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Sahita M',
      title: 'Lead Software Engineer',
      yearsExperience: 5,
      tagline: 'Leading high-performance teams to deliver scalable web applications for 1M+ users',
      aboutText: `Experienced Lead Software Engineer with 5+ years of expertise in full-stack development, currently leading an 8-member team at Lloyds Technology Centre. I specialize in Open Banking, Payment Initiation Services, and building secure, scalable applications using React, Node.js, and modern cloud technologies. 

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
  ]

  for (const link of socialLinks) {
    await prisma.socialLink.upsert({
      where: { id: link.displayOrder },
      update: {},
      create: link,
    })
  }

  // Create technologies
  const technologies = [
    // Frontend
    { name: 'React', category: 'Frontend', proficiency: 95, yearsUsed: 5, logoUrl: '/images/tech/react.svg', displayOrder: 1 },
    { name: 'Next.js', category: 'Frontend', proficiency: 90, yearsUsed: 3, logoUrl: '/images/tech/nextjs.svg', displayOrder: 2 },
    { name: 'TypeScript', category: 'Frontend', proficiency: 90, yearsUsed: 4, logoUrl: '/images/tech/typescript.svg', displayOrder: 3 },
    { name: 'JavaScript', category: 'Frontend', proficiency: 95, yearsUsed: 5, logoUrl: '/images/tech/javascript.svg', displayOrder: 4 },
    { name: 'HTML5', category: 'Frontend', proficiency: 95, yearsUsed: 5, logoUrl: '/images/tech/html5.svg', displayOrder: 5 },
    { name: 'CSS3', category: 'Frontend', proficiency: 90, yearsUsed: 5, logoUrl: '/images/tech/css3.svg', displayOrder: 6 },
    { name: 'Tailwind CSS', category: 'Frontend', proficiency: 85, yearsUsed: 3, logoUrl: '/images/tech/tailwind.svg', displayOrder: 7 },
    { name: 'Vue.js', category: 'Frontend', proficiency: 80, yearsUsed: 2, logoUrl: '/images/tech/vue.svg', displayOrder: 8 },
    
    // Backend
    { name: 'Node.js', category: 'Backend', proficiency: 90, yearsUsed: 5, logoUrl: '/images/tech/nodejs.svg', displayOrder: 9 },
    { name: 'Express.js', category: 'Backend', proficiency: 85, yearsUsed: 4, logoUrl: '/images/tech/express.svg', displayOrder: 10 },
    { name: 'Python', category: 'Backend', proficiency: 80, yearsUsed: 3, logoUrl: '/images/tech/python.svg', displayOrder: 11 },
    { name: 'Java', category: 'Backend', proficiency: 75, yearsUsed: 2, logoUrl: '/images/tech/java.svg', displayOrder: 12 },
    { name: 'C#', category: 'Backend', proficiency: 70, yearsUsed: 2, logoUrl: '/images/tech/csharp.svg', displayOrder: 13 },
    { name: '.NET', category: 'Backend', proficiency: 70, yearsUsed: 2, logoUrl: '/images/tech/dotnet.svg', displayOrder: 14 },
    { name: 'Spring Boot', category: 'Backend', proficiency: 65, yearsUsed: 1, logoUrl: '/images/tech/spring.svg', displayOrder: 15 },
    
    // Database
    { name: 'PostgreSQL', category: 'Database', proficiency: 85, yearsUsed: 4, logoUrl: '/images/tech/postgresql.svg', displayOrder: 16 },
    { name: 'MongoDB', category: 'Database', proficiency: 80, yearsUsed: 3, logoUrl: '/images/tech/mongodb.svg', displayOrder: 17 },
    { name: 'MySQL', category: 'Database', proficiency: 80, yearsUsed: 4, logoUrl: '/images/tech/mysql.svg', displayOrder: 18 },
    { name: 'SQL Server', category: 'Database', proficiency: 75, yearsUsed: 2, logoUrl: '/images/tech/sqlserver.svg', displayOrder: 19 },
    { name: 'Redis', category: 'Database', proficiency: 70, yearsUsed: 2, logoUrl: '/images/tech/redis.svg', displayOrder: 20 },
    
    // Mobile
    { name: 'React Native', category: 'Mobile', proficiency: 80, yearsUsed: 2, logoUrl: '/images/tech/react-native.svg', displayOrder: 21 },
    { name: 'Xamarin', category: 'Mobile', proficiency: 70, yearsUsed: 1, logoUrl: '/images/tech/xamarin.svg', displayOrder: 22 },
    
    // DevOps & Cloud
    { name: 'AWS', category: 'DevOps', proficiency: 85, yearsUsed: 4, logoUrl: '/images/tech/aws.svg', displayOrder: 23 },
    { name: 'Google Cloud', category: 'DevOps', proficiency: 80, yearsUsed: 3, logoUrl: '/images/tech/gcp.svg', displayOrder: 24 },
    { name: 'Azure', category: 'DevOps', proficiency: 75, yearsUsed: 2, logoUrl: '/images/tech/azure.svg', displayOrder: 25 },
    { name: 'Docker', category: 'DevOps', proficiency: 80, yearsUsed: 3, logoUrl: '/images/tech/docker.svg', displayOrder: 26 },
    { name: 'Kubernetes', category: 'DevOps', proficiency: 70, yearsUsed: 2, logoUrl: '/images/tech/kubernetes.svg', displayOrder: 27 },
    
    // Tools & Others
    { name: 'Git', category: 'Tools', proficiency: 95, yearsUsed: 5, logoUrl: '/images/tech/git.svg', displayOrder: 28 },
    { name: 'GitHub', category: 'Tools', proficiency: 90, yearsUsed: 5, logoUrl: '/images/tech/github.svg', displayOrder: 29 },
    { name: 'Jira', category: 'Tools', proficiency: 85, yearsUsed: 4, logoUrl: '/images/tech/jira.svg', displayOrder: 30 },
    { name: 'Confluence', category: 'Tools', proficiency: 80, yearsUsed: 3, logoUrl: '/images/tech/confluence.svg', displayOrder: 31 },
  ]

  for (const tech of technologies) {
    await prisma.technology.upsert({
      where: { id: tech.displayOrder },
      update: {},
      create: tech,
    })
  }

  // Create experiences
  const experiences = [
    {
      company: 'Lloyds Technology Centre',
      position: 'Lead Software Engineer',
      startDate: new Date('2022-01-01'),
      endDate: null,
      description: 'Leading an 8-member development team in building secure, scalable applications for Open Banking and Payment Initiation Services. Responsible for technical architecture decisions, code reviews, and mentoring team members.',
      achievements: JSON.stringify([
        'Led development of Open Banking APIs serving 1M+ users daily',
        'Implemented Payment Initiation Services with 99.9% uptime',
        'Mentored 8 team members and improved code quality by 40%',
        'Architected microservices infrastructure reducing deployment time by 60%',
        'Delivered critical financial services features on time and within budget'
      ]),
      technologies: JSON.stringify(['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Docker', 'Kubernetes', 'Open Banking APIs']),
      displayOrder: 1,
    },
    {
      company: 'LeaderJam LLC',
      position: 'Senior Full Stack Developer',
      startDate: new Date('2020-06-01'),
      endDate: new Date('2021-12-31'),
      description: 'Developed and maintained full-stack web applications for educational technology platform. Focused on creating engaging user experiences and scalable backend systems.',
      achievements: JSON.stringify([
        'Built responsive web applications using React and Node.js',
        'Implemented real-time collaboration features for educational platform',
        'Optimized database queries improving application performance by 35%',
        'Integrated third-party APIs for enhanced functionality',
        'Collaborated with cross-functional teams to deliver user-centric solutions'
      ]),
      technologies: JSON.stringify(['React', 'Node.js', 'JavaScript', 'MongoDB', 'Express.js', 'Socket.io']),
      displayOrder: 2,
    },
    {
      company: 'NFS Hospitality',
      position: 'Software Developer',
      startDate: new Date('2019-03-01'),
      endDate: new Date('2020-05-31'),
      description: 'Developed mobile and web applications for hospitality management system. Worked on both frontend and backend components to deliver comprehensive solutions.',
      achievements: JSON.stringify([
        'Developed mobile applications using React Native and Xamarin',
        'Created web-based management dashboard for hospitality operations',
        'Implemented booking and reservation system with real-time updates',
        'Integrated payment processing and notification systems',
        'Improved user experience through responsive design and optimization'
      ]),
      technologies: JSON.stringify(['React Native', 'Xamarin', 'React', 'C#', '.NET', 'SQL Server']),
      displayOrder: 3,
    },
    {
      company: 'Inter IKEA',
      position: 'Junior Software Developer',
      startDate: new Date('2018-08-01'),
      endDate: new Date('2019-02-28'),
      description: 'Started career as junior developer working on internal tools and customer-facing applications. Gained experience in software development lifecycle and agile methodologies.',
      achievements: JSON.stringify([
        'Contributed to development of internal management tools',
        'Assisted in building customer-facing web applications',
        'Learned modern development practices and frameworks',
        'Participated in code reviews and agile development processes',
        'Gained experience in retail technology solutions'
      ]),
      technologies: JSON.stringify(['JavaScript', 'HTML5', 'CSS3', 'Java', 'Spring Boot', 'MySQL']),
      displayOrder: 4,
    },
  ]

  for (const exp of experiences) {
    await prisma.experience.upsert({
      where: { id: exp.displayOrder },
      update: {},
      create: exp,
    })
  }

  // Create education
  const education = [
    {
      institution: 'Jawaharlal Nehru Technological University',
      degree: 'Bachelor of Technology',
      fieldOfStudy: 'Computer Science & Engineering',
      startDate: new Date('2014-08-01'),
      endDate: new Date('2018-06-30'),
      description: 'Focused on software engineering, data structures, algorithms, and web technologies. Achieved excellent academic performance with strong foundation in computer science principles.',
      gpa: '87.7%',
      displayOrder: 1,
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
      recommenderName: 'James Wilson',
      recommenderTitle: 'Engineering Manager',
      recommenderCompany: 'Lloyds Technology Centre',
      relationship: 'Direct Manager',
      recommendationText: `Sahita is an exceptional Lead Software Engineer who has consistently delivered outstanding results while leading our 8-member development team. Her expertise in Open Banking and Payment Initiation Services has been instrumental in serving our 1M+ users with 99.9% uptime. She combines strong technical skills with excellent leadership abilities, making her an invaluable asset to our organization.`,
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

  // Create certifications
  const certifications = [
    {
      name: 'Microsoft Azure Fundamentals (AZ-900)',
      issuer: 'Microsoft',
      issueDate: new Date('2023-05-15'),
      expiryDate: null,
      credentialId: 'AZ-900-2023-001',
      verificationUrl: 'https://learn.microsoft.com/en-us/certifications/azure-fundamentals/',
      logoUrl: '/images/certs/azure-fundamentals.png',
      category: 'Cloud',
    },
    {
      name: 'Google Cloud Associate Cloud Engineer',
      issuer: 'Google Cloud',
      issueDate: new Date('2023-03-20'),
      expiryDate: new Date('2026-03-20'),
      credentialId: 'GCP-ACE-2023-002',
      verificationUrl: 'https://cloud.google.com/certification/cloud-engineer',
      logoUrl: '/images/certs/gcp-ace.png',
      category: 'Cloud',
    },
    {
      name: 'Programming, Data Structures and Algorithms using Python',
      issuer: 'NPTEL (IIT Madras)',
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

  // Create awards
  const awards = [
    {
      title: 'Outstanding Performance Award',
      issuer: 'Lloyds Technology Centre',
      dateAwarded: new Date('2023-12-01'),
      description: 'Recognized for exceptional leadership in delivering critical Open Banking features and maintaining 99.9% system uptime while leading an 8-member development team.',
      category: 'Professional',
      logoUrl: '/images/awards/performance.png',
    },
    {
      title: 'Innovation Excellence Award',
      issuer: 'LeaderJam LLC',
      dateAwarded: new Date('2021-08-15'),
      description: 'Awarded for developing innovative educational technology solutions that improved user engagement and platform scalability.',
      category: 'Innovation',
      logoUrl: '/images/awards/innovation.png',
    },
    {
      title: 'Academic Excellence Award',
      issuer: 'Jawaharlal Nehru Technological University',
      dateAwarded: new Date('2018-06-30'),
      description: 'Graduated with distinction achieving 87.7% in Bachelor of Technology - Computer Science & Engineering program.',
      category: 'Academic',
      logoUrl: '/images/awards/academic.png',
    },
    {
      title: 'Best Team Player Award',
      issuer: 'NFS Hospitality',
      dateAwarded: new Date('2020-03-20'),
      description: 'Recognized for exceptional collaboration and contribution to successful delivery of mobile and web applications for hospitality management.',
      category: 'Teamwork',
      logoUrl: '/images/awards/teamwork.png',
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