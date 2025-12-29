import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Create profile
  const profile = await prisma.profile.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Sahita Dev',
      title: 'Full Stack Engineer',
      yearsExperience: 6,
      tagline: 'Building scalable web applications with modern technologies',
      aboutText: `Passionate full-stack engineer with 6+ years of experience building scalable web applications. 
      I specialize in React, Node.js, and cloud technologies, with a focus on creating exceptional user experiences 
      and robust backend systems. I love solving complex problems and continuously learning new technologies.`,
      profileImageUrl: '/images/profile.jpg',
      resumeUrl: '/files/resume.pdf',
    },
  })

  // Create social links
  const socialLinks = [
    {
      profileId: profile.id,
      platform: 'LinkedIn',
      url: 'https://linkedin.com/in/sahitadev',
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
      url: 'mailto:sahita@example.com',
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
      company: 'Tech Solutions Inc.',
      position: 'Senior Full Stack Engineer',
      startDate: new Date('2022-01-01'),
      endDate: null,
      description: 'Leading development of scalable web applications using React, Node.js, and AWS.',
      achievements: JSON.stringify([
        'Architected and built a microservices platform serving 100k+ users',
        'Reduced application load time by 40% through performance optimization',
        'Mentored 3 junior developers and established code review processes',
        'Implemented CI/CD pipelines reducing deployment time by 60%'
      ]),
      technologies: JSON.stringify(['React', 'Node.js', 'TypeScript', 'AWS', 'PostgreSQL', 'Docker']),
      displayOrder: 1,
    },
    {
      company: 'Digital Innovations Ltd.',
      position: 'Full Stack Developer',
      startDate: new Date('2020-03-01'),
      endDate: new Date('2021-12-31'),
      description: 'Developed and maintained multiple client-facing web applications.',
      achievements: JSON.stringify([
        'Built 5+ responsive web applications from scratch',
        'Integrated third-party APIs and payment systems',
        'Improved application security implementing OAuth 2.0',
        'Collaborated with design team to implement pixel-perfect UIs'
      ]),
      technologies: JSON.stringify(['Vue.js', 'Express.js', 'MongoDB', 'JavaScript', 'CSS3']),
      displayOrder: 2,
    },
    {
      company: 'StartupXYZ',
      position: 'Frontend Developer',
      startDate: new Date('2019-01-01'),
      endDate: new Date('2020-02-28'),
      description: 'Focused on creating exceptional user experiences for early-stage startup.',
      achievements: JSON.stringify([
        'Developed responsive SPA with React and Redux',
        'Implemented real-time features using WebSocket',
        'Optimized bundle size reducing initial load by 50%',
        'Created reusable component library'
      ]),
      technologies: JSON.stringify(['React', 'Redux', 'JavaScript', 'SCSS', 'Webpack']),
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
      institution: 'University of Technology',
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Computer Science',
      startDate: new Date('2015-09-01'),
      endDate: new Date('2019-05-31'),
      description: 'Focused on software engineering, algorithms, and data structures.',
      gpa: '3.8/4.0',
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
      recommenderName: 'John Smith',
      recommenderTitle: 'Engineering Manager',
      recommenderCompany: 'Tech Solutions Inc.',
      relationship: 'Direct Manager',
      recommendationText: `Sahita is an exceptional full-stack engineer who consistently delivers high-quality solutions. 
      Her technical expertise in React and Node.js, combined with her problem-solving abilities, makes her invaluable to any team. 
      She has a great eye for detail and always considers the user experience in her implementations.`,
      linkedinUrl: 'https://linkedin.com/in/johnsmith',
      isFeatured: true,
    },
    {
      recommenderName: 'Sarah Johnson',
      recommenderTitle: 'Senior Frontend Developer',
      recommenderCompany: 'Digital Innovations Ltd.',
      relationship: 'Colleague',
      recommendationText: `Working with Sahita was a pleasure. She brings both technical excellence and collaborative spirit to every project. 
      Her ability to translate complex requirements into elegant solutions is remarkable. I would highly recommend her for any full-stack role.`,
      linkedinUrl: 'https://linkedin.com/in/sarahjohnson',
      isFeatured: true,
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
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      issueDate: new Date('2023-06-15'),
      expiryDate: new Date('2026-06-15'),
      credentialId: 'AWS-SAA-123456',
      verificationUrl: 'https://aws.amazon.com/verification/123456',
      logoUrl: '/images/certs/aws-saa.png',
      category: 'Cloud',
    },
    {
      name: 'React Developer Certification',
      issuer: 'Meta',
      issueDate: new Date('2022-11-20'),
      expiryDate: null,
      credentialId: 'META-REACT-789',
      verificationUrl: 'https://coursera.org/verify/123456',
      logoUrl: '/images/certs/meta-react.png',
      category: 'Frontend',
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
      title: 'Employee of the Year',
      issuer: 'Tech Solutions Inc.',
      dateAwarded: new Date('2023-12-01'),
      description: 'Recognized for outstanding technical contributions and leadership.',
      category: 'Professional',
      logoUrl: '/images/awards/employee-year.png',
    },
    {
      title: 'Best Innovation Award',
      issuer: 'Digital Innovations Ltd.',
      dateAwarded: new Date('2021-08-15'),
      description: 'Awarded for developing an innovative solution that improved client satisfaction by 30%.',
      category: 'Innovation',
      logoUrl: '/images/awards/innovation.png',
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
      title: 'E-commerce Platform',
      description: 'Full-stack e-commerce platform with real-time inventory management, payment processing, and admin dashboard.',
      technologies: JSON.stringify(['React', 'Node.js', 'PostgreSQL', 'Stripe API', 'AWS']),
      projectUrl: 'https://ecommerce-demo.com',
      githubUrl: 'https://github.com/sahitadev/ecommerce-platform',
      imageUrl: '/images/projects/ecommerce.jpg',
      startDate: new Date('2023-01-01'),
      endDate: new Date('2023-06-30'),
      isFeatured: true,
    },
    {
      title: 'Task Management App',
      description: 'Collaborative task management application with real-time updates, team collaboration features, and analytics dashboard.',
      technologies: JSON.stringify(['Vue.js', 'Express.js', 'MongoDB', 'Socket.io', 'Docker']),
      projectUrl: 'https://taskmanager-demo.com',
      githubUrl: 'https://github.com/sahitadev/task-manager',
      imageUrl: '/images/projects/taskmanager.jpg',
      startDate: new Date('2022-08-01'),
      endDate: new Date('2022-12-31'),
      isFeatured: true,
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