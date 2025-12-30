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
      title: 'Full Stack Developer',
      yearsExperience: 4,
      tagline: 'Passionate about building scalable web applications with modern technologies',
      aboutText: `Experienced full-stack developer with 4+ years of expertise in building scalable web applications. 
      I specialize in React, Node.js, and cloud technologies, with a strong focus on creating exceptional user experiences 
      and robust backend systems. I'm passionate about solving complex problems, writing clean code, and continuously 
      learning new technologies to deliver innovative solutions.`,
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
      url: 'mailto:sahitam.dev@gmail.com',
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
    { name: 'Tailwind CSS', category: 'Frontend', proficiency: 85, yearsUsed: 3, logoUrl: '/images/tech/tailwind.svg', displayOrder: 4 },
    { name: 'Vue.js', category: 'Frontend', proficiency: 80, yearsUsed: 2, logoUrl: '/images/tech/vue.svg', displayOrder: 5 },
    
    // Backend
    { name: 'Node.js', category: 'Backend', proficiency: 90, yearsUsed: 5, logoUrl: '/images/tech/nodejs.svg', displayOrder: 6 },
    { name: 'Express.js', category: 'Backend', proficiency: 85, yearsUsed: 4, logoUrl: '/images/tech/express.svg', displayOrder: 7 },
    { name: 'Python', category: 'Backend', proficiency: 80, yearsUsed: 3, logoUrl: '/images/tech/python.svg', displayOrder: 8 },
    { name: 'Java', category: 'Backend', proficiency: 75, yearsUsed: 2, logoUrl: '/images/tech/java.svg', displayOrder: 9 },
    
    // Database
    { name: 'PostgreSQL', category: 'Database', proficiency: 85, yearsUsed: 4, logoUrl: '/images/tech/postgresql.svg', displayOrder: 10 },
    { name: 'MongoDB', category: 'Database', proficiency: 80, yearsUsed: 3, logoUrl: '/images/tech/mongodb.svg', displayOrder: 11 },
    { name: 'Redis', category: 'Database', proficiency: 75, yearsUsed: 2, logoUrl: '/images/tech/redis.svg', displayOrder: 12 },
    
    // DevOps
    { name: 'AWS', category: 'DevOps', proficiency: 85, yearsUsed: 4, logoUrl: '/images/tech/aws.svg', displayOrder: 13 },
    { name: 'Docker', category: 'DevOps', proficiency: 80, yearsUsed: 3, logoUrl: '/images/tech/docker.svg', displayOrder: 14 },
    { name: 'Kubernetes', category: 'DevOps', proficiency: 70, yearsUsed: 2, logoUrl: '/images/tech/kubernetes.svg', displayOrder: 15 },
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
      company: 'TechCorp Solutions',
      position: 'Full Stack Developer',
      startDate: new Date('2022-06-01'),
      endDate: null,
      description: 'Developing and maintaining scalable web applications using modern technologies and best practices.',
      achievements: JSON.stringify([
        'Built responsive web applications serving 10k+ users daily',
        'Implemented RESTful APIs and database optimization strategies',
        'Collaborated with cross-functional teams to deliver projects on time',
        'Improved application performance by 35% through code optimization'
      ]),
      technologies: JSON.stringify(['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Docker']),
      displayOrder: 1,
    },
    {
      company: 'Digital Solutions Ltd.',
      position: 'Frontend Developer',
      startDate: new Date('2021-01-01'),
      endDate: new Date('2022-05-31'),
      description: 'Focused on creating exceptional user interfaces and user experiences for web applications.',
      achievements: JSON.stringify([
        'Developed 8+ responsive web applications using React and Vue.js',
        'Implemented modern UI/UX designs with pixel-perfect accuracy',
        'Integrated third-party APIs and services',
        'Mentored junior developers on frontend best practices'
      ]),
      technologies: JSON.stringify(['React', 'Vue.js', 'JavaScript', 'CSS3', 'SASS', 'Webpack']),
      displayOrder: 2,
    },
    {
      company: 'StartupHub',
      position: 'Junior Web Developer',
      startDate: new Date('2020-08-01'),
      endDate: new Date('2020-12-31'),
      description: 'Contributed to various web development projects and learned modern development practices.',
      achievements: JSON.stringify([
        'Assisted in developing company website and internal tools',
        'Learned React, Node.js, and database management',
        'Participated in code reviews and agile development processes',
        'Created documentation for development workflows'
      ]),
      technologies: JSON.stringify(['HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js', 'MySQL']),
      displayOrder: 3,
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
      institution: 'University of Engineering & Technology',
      degree: 'Bachelor of Technology',
      fieldOfStudy: 'Computer Science & Engineering',
      startDate: new Date('2016-08-01'),
      endDate: new Date('2020-06-30'),
      description: 'Focused on software engineering, data structures, algorithms, and web technologies.',
      gpa: '8.2/10.0',
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
      recommenderName: 'Rajesh Kumar',
      recommenderTitle: 'Senior Engineering Manager',
      recommenderCompany: 'TechCorp Solutions',
      relationship: 'Direct Manager',
      recommendationText: `Sahita is an outstanding full-stack developer who consistently delivers high-quality solutions. 
      Her technical expertise in React and Node.js, combined with her problem-solving abilities, makes her a valuable team member. 
      She has excellent attention to detail and always considers the user experience in her implementations. I highly recommend her for any development role.`,
      linkedinUrl: 'https://www.linkedin.com/in/sahita-m-b01956213/',
      isFeatured: true,
    },
    {
      recommenderName: 'Priya Sharma',
      recommenderTitle: 'Lead Frontend Developer',
      recommenderCompany: 'Digital Solutions Ltd.',
      relationship: 'Team Lead',
      recommendationText: `Working with Sahita was a great experience. She brings both technical excellence and collaborative spirit to every project. 
      Her ability to translate complex requirements into elegant solutions is impressive. She's always eager to learn and share knowledge with the team. 
      I would definitely recommend her for any full-stack development position.`,
      linkedinUrl: 'https://www.linkedin.com/in/sahita-m-b01956213/',
      isFeatured: true,
    },
    {
      recommenderName: 'Amit Patel',
      recommenderTitle: 'Senior Developer',
      recommenderCompany: 'StartupHub',
      relationship: 'Mentor',
      recommendationText: `Sahita showed exceptional learning ability and dedication during her time with us. 
      She quickly grasped new concepts and technologies, and her enthusiasm for web development was evident in every project. 
      She has strong fundamentals and the right attitude to succeed in any development role.`,
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
      name: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services',
      issueDate: new Date('2023-03-15'),
      expiryDate: new Date('2026-03-15'),
      credentialId: 'AWS-CCP-456789',
      verificationUrl: 'https://aws.amazon.com/verification/456789',
      logoUrl: '/images/certs/aws-ccp.png',
      category: 'Cloud',
    },
    {
      name: 'React Developer Professional Certificate',
      issuer: 'Meta',
      issueDate: new Date('2022-09-20'),
      expiryDate: null,
      credentialId: 'META-REACT-567',
      verificationUrl: 'https://coursera.org/verify/567890',
      logoUrl: '/images/certs/meta-react.png',
      category: 'Frontend',
    },
    {
      name: 'JavaScript Algorithms and Data Structures',
      issuer: 'freeCodeCamp',
      issueDate: new Date('2021-12-10'),
      expiryDate: null,
      credentialId: 'FCC-JS-789',
      verificationUrl: 'https://freecodecamp.org/certification/sahita/javascript-algorithms-and-data-structures',
      logoUrl: '/images/certs/freecodecamp.png',
      category: 'Programming',
    },
    {
      name: 'Full Stack Web Development',
      issuer: 'Coursera',
      issueDate: new Date('2021-06-15'),
      expiryDate: null,
      credentialId: 'COURSERA-FULLSTACK-123',
      verificationUrl: 'https://coursera.org/verify/123456',
      logoUrl: '/images/certs/coursera.png',
      category: 'Development',
    },
    {
      name: 'MongoDB Developer Certification',
      issuer: 'MongoDB University',
      issueDate: new Date('2022-11-05'),
      expiryDate: new Date('2025-11-05'),
      credentialId: 'MONGO-DEV-345',
      verificationUrl: 'https://university.mongodb.com/verify/345678',
      logoUrl: '/images/certs/mongodb.png',
      category: 'Database',
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
      title: 'Best Performer Award',
      issuer: 'TechCorp Solutions',
      dateAwarded: new Date('2023-12-01'),
      description: 'Recognized for exceptional performance and dedication to delivering high-quality solutions.',
      category: 'Professional',
      logoUrl: '/images/awards/best-performer.png',
    },
    {
      title: 'Innovation Excellence Award',
      issuer: 'Digital Solutions Ltd.',
      dateAwarded: new Date('2022-03-15'),
      description: 'Awarded for developing innovative frontend solutions that improved user engagement by 25%.',
      category: 'Innovation',
      logoUrl: '/images/awards/innovation.png',
    },
    {
      title: 'Academic Excellence Award',
      issuer: 'University of Engineering & Technology',
      dateAwarded: new Date('2020-06-30'),
      description: 'Graduated with distinction for maintaining excellent academic performance throughout the program.',
      category: 'Academic',
      logoUrl: '/images/awards/academic.png',
    },
    {
      title: 'Hackathon Winner',
      issuer: 'TechFest 2021',
      dateAwarded: new Date('2021-10-20'),
      description: 'First place winner in web development category for building an innovative e-learning platform.',
      category: 'Competition',
      logoUrl: '/images/awards/hackathon.png',
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
      title: 'Portfolio Website',
      description: 'Modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features include dark mode, animations, and a comprehensive showcase of skills and projects.',
      technologies: JSON.stringify(['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Prisma', 'PostgreSQL']),
      projectUrl: 'https://sahita-portfolio.vercel.app',
      githubUrl: 'https://github.com/SahitaPersonal/sahita-portfolio-website',
      imageUrl: '/images/projects/portfolio.jpg',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-02-15'),
      isFeatured: true,
    },
    {
      title: 'Task Management Dashboard',
      description: 'Full-stack task management application with real-time updates, team collaboration features, drag-and-drop functionality, and comprehensive analytics dashboard.',
      technologies: JSON.stringify(['React', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'Material-UI']),
      projectUrl: 'https://taskmanager-demo.netlify.app',
      githubUrl: 'https://github.com/SahitaPersonal/task-manager-app',
      imageUrl: '/images/projects/taskmanager.jpg',
      startDate: new Date('2023-08-01'),
      endDate: new Date('2023-11-30'),
      isFeatured: true,
    },
    {
      title: 'E-Learning Platform',
      description: 'Interactive e-learning platform with course management, video streaming, progress tracking, and quiz functionality. Built for educational institutions.',
      technologies: JSON.stringify(['Vue.js', 'Nuxt.js', 'Node.js', 'PostgreSQL', 'AWS S3', 'Stripe API']),
      projectUrl: 'https://elearning-platform-demo.com',
      githubUrl: 'https://github.com/SahitaPersonal/elearning-platform',
      imageUrl: '/images/projects/elearning.jpg',
      startDate: new Date('2023-03-01'),
      endDate: new Date('2023-07-31'),
      isFeatured: true,
    },
    {
      title: 'Weather App',
      description: 'Responsive weather application with location-based forecasts, interactive maps, and detailed weather analytics. Features clean UI and smooth animations.',
      technologies: JSON.stringify(['React', 'TypeScript', 'OpenWeather API', 'Chart.js', 'CSS Modules']),
      projectUrl: 'https://weather-app-sahita.netlify.app',
      githubUrl: 'https://github.com/SahitaPersonal/weather-app',
      imageUrl: '/images/projects/weather.jpg',
      startDate: new Date('2022-12-01'),
      endDate: new Date('2023-01-15'),
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