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
      profileImageUrl: '/images/profile_main.jpg',
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
      profileImageUrl: '/images/profile_main.jpg',
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

  // Create technologies with actual proficiency and experience
  const technologies = [
    // Frontend
    { name: 'React', category: 'Frontend', proficiency: 95, yearsUsed: 5, logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', displayOrder: 1 },
    { name: 'JavaScript', category: 'Frontend', proficiency: 95, yearsUsed: 6, logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', displayOrder: 2 },
    { name: 'TypeScript', category: 'Frontend', proficiency: 90, yearsUsed: 3, logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', displayOrder: 3 },
    { name: 'HTML5', category: 'Frontend', proficiency: 95, yearsUsed: 6, logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', displayOrder: 4 },
    { name: 'CSS3', category: 'Frontend', proficiency: 90, yearsUsed: 6, logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', displayOrder: 5 },
    { name: 'Redux', category: 'Frontend', proficiency: 85, yearsUsed: 4, logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg', displayOrder: 6 },
    
    // Backend
    { name: 'Node.js', category: 'Backend', proficiency: 95, yearsUsed: 5, logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', displayOrder: 7 },
    { name: 'Express.js', category: 'Backend', proficiency: 90, yearsUsed: 4, logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', displayOrder: 8 },
    { name: 'C#', category: 'Backend', proficiency: 80, yearsUsed: 3, logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg', displayOrder: 9 },
    
    // Mobile
    { name: 'React Native', category: 'Mobile', proficiency: 85, yearsUsed: 4, logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', displayOrder: 10 },
    { name: 'Xamarin', category: 'Mobile', proficiency: 75, yearsUsed: 2, logoUrl: undefined, displayOrder: 11 },
    
    // Database
    { name: 'MySQL', category: 'Database', proficiency: 80, yearsUsed: 4, logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', displayOrder: 12 },
    
    // DevOps & Cloud
    { name: 'Google Cloud', category: 'DevOps', proficiency: 80, yearsUsed: 2, logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg', displayOrder: 13 },
    { name: 'Docker', category: 'DevOps', proficiency: 75, yearsUsed: 2, logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', displayOrder: 14 },
    { name: 'Azure', category: 'DevOps', proficiency: 70, yearsUsed: 1, logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg', displayOrder: 15 },
    
    // Testing
    { name: 'Jest', category: 'Testing', proficiency: 85, yearsUsed: 3, logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg', displayOrder: 16 },
    { name: 'NUnit', category: 'Testing', proficiency: 70, yearsUsed: 2, logoUrl: undefined, displayOrder: 17 },
    
    // Tools
    { name: 'Git', category: 'Tools', proficiency: 90, yearsUsed: 6, logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', displayOrder: 18 },
    { name: 'GitHub', category: 'Tools', proficiency: 90, yearsUsed: 6, logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', displayOrder: 19 },
    { name: 'Jira', category: 'Tools', proficiency: 85, yearsUsed: 4, logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg', displayOrder: 20 },
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
      startDate: new Date('2024-03-18'),
      endDate: new Date('2025-09-03'),
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
      startDate: new Date('2022-09-12'),
      endDate: new Date('2024-03-08'),
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
      startDate: new Date('2019-05-20'),
      endDate: new Date('2022-09-05'),
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
      startDate: new Date('2020-01-10'),
      endDate: new Date('2022-05-25'),
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
      startDate: new Date('2019-05-13'),
      endDate: new Date('2019-12-31'),
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
      recommenderTitle: 'SSE',
      recommenderCompany: 'Lloyds technology Centre',
      relationship: 'Worked on different teams',
      recommendationText: `I've had the pleasure of working closely with Sahita at Lloyds Technology Centre, where she serves as a Lead Full Stack Developer. She consistently brings a high level of ownership and dedication to her work. Whether it's taking responsibility for critical deliverables, working through tight deadlines, or addressing high-priority issues, Sahita is someone you can always rely on to get things done.

One of her standout contributions was designing and developing a solution for V4 impact analysis and redirection errors. She also collaborated with cross-functional teams to implement a common, scalable solution—demonstrating both strong technical skills and the ability to work across team boundaries. In addition, she successfully handled Open Banking certificate renewals, further showcasing her versatility.

She played a key leadership role in migrating On-Prem services to GCP for the PISP team, which was a complex and business-critical initiative.

Her approach to code quality is excellent—she consistently performs effective PR reviews, follows best coding practices, and helps maintain high standards across the team. Moreover, she actively mentors junior team members, fostering a collaborative and supportive environment.

What really sets Sahita apart is her determination to continuously learn and take on new challenges. She is an asset to any team and a great person to work with. I highly recommend her for full stack development roles.`,
      linkedinUrl: 'https://www.linkedin.com/in/sahita-m-b01956213/',
      isFeatured: true,
    },
    {
      recommenderName: 'Ravi Teja Dandu',
      recommenderTitle: 'Vice President of Engineering',
      recommenderCompany: 'LeaderJam',
      relationship: 'Managed Sahita directly',
      recommendationText: `I had the pleasure of managing Sahita during her time at LeaderJam, and I can confidently say she was one of the most hardworking developers in the team.

Even though she joined as a frontend developer, she quickly learned NodeJS and played an important role in building several core features of our platform. She is very dedicated and often worked extra hours to meet tight deadlines and make sure that work was completed with great quality. She was an asset to our team. I strongly recommend Sahita for any team looking for a reliable and hardworking full stack developer.`,
      linkedinUrl: 'https://www.linkedin.com/in/sahita-m-b01956213/',
      isFeatured: true,
    },
    {
      recommenderName: 'Jerry Cogliano',
      recommenderTitle: 'Co-Founder & Chief Customer Officer/Chief Operating Officer',
      recommenderCompany: 'LeaderJam',
      relationship: 'Worked with Sahita but didn\'t manage directly',
      recommendationText: `I had the pleasure of working with Sahita Mudunuri for nearly two years at LeaderJam, where she served as a Senior Software Developer and was a key member of our technical team. Sahita consistently demonstrated strong dedication, a conscientious work ethic, and a proactive approach to learning and growth. During her time with us, she made significant contributions to the development of our interactive learning SaaS platform using ReactJS and NodeJS, integrated RESTful APIs, and implemented key features such as course management, itineraries, event scheduling, and platform analytics. She also played a vital role in enhancing our overall user experience and assisted with WordPress site management. Sahita's eagerness to take on new challenges and her ability to deliver high-quality work made her a valued and respected team member. I highly recommend her and am confident she will be an asset to any organization.`,
      linkedinUrl: 'https://www.linkedin.com/in/sahita-m-b01956213/',
      isFeatured: true,
    },
    {
      recommenderName: 'Surya Teja',
      recommenderTitle: 'SSE',
      recommenderCompany: 'Lloyds technology Centre',
      relationship: 'Worked on same team at Lloyds',
      recommendationText: `I had the chance to work with Sahita on the same project, and I was impressed by her energy and dedication. She is a very quick learner with a strong curiosity that drives her to continuously expand her knowledge. Sahita has an excellent ability to understand business requirements, thanks to her clear communication skills and proactive approach to gathering information. Technically, she is strong in Node.js and React.js, and she combines that expertise with a genuine enthusiasm for solving problems. She is the kind of teammate who uplifts the team with her eagerness to learn and her ability to deliver with quality.`,
      linkedinUrl: 'https://www.linkedin.com/in/sahita-m-b01956213/',
      isFeatured: false,
    },
    {
      recommenderName: 'Naresh Vatti',
      recommenderTitle: 'Delivery Manager',
      recommenderCompany: 'Valuelabs Solutions',
      relationship: 'Worked on same team',
      recommendationText: `Sahita reported to me a few years ago while working on a mobile app development project, and it was a pleasure having her on the team. She was hardworking, often went the extra mile to meet tight deadlines, and her attention to detail showed in the quality of her work. She was also a great team player, easy to work with, and brought a positive attitude to everything she did.`,
      linkedinUrl: 'https://www.linkedin.com/in/sahita-m-b01956213/',
      isFeatured: false,
    },
    {
      recommenderName: 'Madhu Kiran Varma',
      recommenderTitle: 'Software Engineer',
      recommenderCompany: 'Valuelabs Solutions',
      relationship: 'Worked on different teams',
      recommendationText: `Sahita is an amazing problem solver and one of the best mobile developers I've seen. Sahita, shows complete dedication to any task and tops any technology paradigm with ease. Takes complete responsibility and is a true team player. Sahita is strong in problem solving and has expertise in scaling systems end-to-end. I'd highly recommend Sahita for SDE and Mobile Application Developer Roles.`,
      linkedinUrl: 'https://www.linkedin.com/in/sahita-m-b01956213/',
      isFeatured: false,
    },
    {
      recommenderName: 'Radhika Murikinati',
      recommenderTitle: 'Program Manager',
      recommenderCompany: 'Valuelabs Solutions',
      relationship: 'Managed Sahita directly',
      recommendationText: `Lakshmi sahitha is a good resource. She is proactive and is quick learner. Working and mentoring her is great pleasure for me. She is an asset to our team.`,
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
      name: 'Google Cloud Associate',
      issuer: 'Google',
      issueDate: new Date('2024-12-01'),
      expiryDate: undefined,
      credentialId: undefined,
      verificationUrl: undefined,
      logoUrl: 'https://placehold.co/100x100/4285F4/FFFFFF/png?text=GCP',
      category: 'Cloud',
    },
    {
      name: 'Azure AZ-900',
      issuer: 'Microsoft',
      issueDate: new Date('2021-05-01'),
      expiryDate: undefined,
      credentialId: undefined,
      verificationUrl: undefined,
      logoUrl: 'https://placehold.co/100x100/0078D4/FFFFFF/png?text=Azure',
      category: 'Cloud',
    },
    {
      name: 'Certified Senior System Architect',
      issuer: 'Pega',
      issueDate: new Date('2019-06-01'),
      expiryDate: undefined,
      credentialId: undefined,
      verificationUrl: undefined,
      logoUrl: 'https://placehold.co/100x100/FF6B35/FFFFFF/png?text=Pega',
      category: 'Pega',
    },
    {
      name: 'Certified System Architect',
      issuer: 'Pega',
      issueDate: new Date('2018-11-01'),
      expiryDate: undefined,
      credentialId: undefined,
      verificationUrl: undefined,
      logoUrl: 'https://placehold.co/100x100/FF6B35/FFFFFF/png?text=Pega',
      category: 'Pega',
    },
    {
      name: 'Data Structures using Python',
      issuer: 'NPTEL',
      issueDate: new Date('2017-12-01'),
      expiryDate: undefined,
      credentialId: undefined,
      verificationUrl: undefined,
      logoUrl: 'https://placehold.co/100x100/3776AB/FFFFFF/png?text=NPTEL',
      category: 'NPTEL',
    },
    {
      name: 'British Council certification for English',
      issuer: 'British Council',
      issueDate: new Date('2017-09-01'),
      expiryDate: undefined,
      credentialId: undefined,
      verificationUrl: undefined,
      logoUrl: 'https://placehold.co/100x100/003366/FFFFFF/png?text=BC',
      category: 'British Council',
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
      logoUrl: 'https://placehold.co/100x100/FFD700/000000/png?text=STAR',
    },
    {
      title: 'STAR Performer of the Quarter - 2020',
      issuer: 'ValueLabs Solutions',
      dateAwarded: new Date('2020-12-01'),
      description: 'Awarded STAR performer recognition for exceptional performance in software development and team collaboration.',
      category: 'Professional',
      logoUrl: 'https://placehold.co/100x100/FFD700/000000/png?text=STAR',
    },
    {
      title: 'Outstanding Contribution Award',
      issuer: 'Lloyds Technology Centre',
      dateAwarded: new Date('2024-06-01'),
      description: 'Received recognition twice within six months from both manager and product owner for outstanding contributions to development, issue resolution, and process improvements.',
      category: 'Professional',
      logoUrl: 'https://placehold.co/100x100/006341/FFFFFF/png?text=LTC',
    },
    {
      title: 'Leadership Excellence - Promotion to Team Lead',
      issuer: 'Lloyds Technology Centre',
      dateAwarded: new Date('2024-09-01'),
      description: 'Promoted from Engineer to Team Lead within one year, leading a team of 8 engineers and successfully delivering critical initiatives.',
      category: 'Leadership',
      logoUrl: 'https://placehold.co/100x100/006341/FFFFFF/png?text=LEAD',
    },
  ]

  for (const award of awards) {
    await prisma.award.create({
      data: award,
    })
  }

  // Create project highlights
  const projects: any[] = []

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