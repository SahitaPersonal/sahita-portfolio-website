# Portfolio Data Update Guide

## 📝 How to Update Your Portfolio with Resume Information

### Step 1: Add Your Resume File
1. Save your resume as `resume.pdf`
2. Copy it to: `backend/public/files/resume.pdf`
3. Restart backend server: `npm run dev` (in backend directory)

### Step 2: Update Profile Information
Edit `backend/prisma/seed.ts` - Profile section:

```typescript
const profile = await prisma.profile.upsert({
  where: { id: 1 },
  update: {},
  create: {
    name: 'Your Full Name',                    // From resume header
    title: 'Your Professional Title',         // From resume header
    yearsExperience: 6,                       // Calculate from resume
    tagline: 'Your professional tagline',     // From resume summary
    aboutText: `Your detailed bio...`,        // From resume summary/objective
    profileImageUrl: '/images/profile.jpg',   // Your photo
    resumeUrl: '/files/resume.pdf',          // Keep this as is
  },
})
```

### Step 3: Update Experience Section
Find the experiences array and replace with your actual work history:

```typescript
const experiences = [
  {
    profileId: profile.id,
    company: 'Company Name',
    position: 'Job Title',
    startDate: new Date('2022-01-01'),
    endDate: new Date('2024-01-01'),    // null for current job
    description: 'Job description and achievements',
    technologies: ['React', 'Node.js', 'AWS'],
    location: 'City, Country',
    isCurrentRole: false,               // true for current job
  },
  // Add more experiences...
]
```

### Step 4: Update Education Section
Replace with your actual education:

```typescript
const educations = [
  {
    profileId: profile.id,
    institution: 'University Name',
    degree: 'Bachelor of Science',
    fieldOfStudy: 'Computer Science',
    startDate: new Date('2015-09-01'),
    endDate: new Date('2019-05-01'),
    gpa: '3.8',
    description: 'Relevant coursework, projects, honors',
  },
  // Add more education entries...
]
```

### Step 5: Update Technologies/Skills
Replace with technologies from your resume:

```typescript
const technologies = [
  {
    profileId: profile.id,
    name: 'React',
    category: 'Frontend',
    proficiency: 90,        // 1-100 scale
    yearsUsed: 4,
    logoUrl: '/images/tech/react.svg',
  },
  // Add all your technologies...
]
```

### Step 6: Update Certifications
Add your actual certifications:

```typescript
const certifications = [
  {
    profileId: profile.id,
    name: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    issueDate: new Date('2023-06-15'),
    expiryDate: new Date('2026-06-15'),
    credentialId: 'ABC123XYZ',
    verificationUrl: 'https://aws.amazon.com/verification/ABC123XYZ',
    category: 'Cloud',
    logoUrl: '/images/certs/aws.png',
  },
  // Add more certifications...
]
```

### Step 7: Apply Changes
After updating the seed file:

1. **Reset database**: `npx prisma db push --force-reset` (in backend directory)
2. **Run seed**: `npx prisma db seed`
3. **Restart servers**: Both frontend and backend
4. **Verify changes**: Check your portfolio at http://localhost:3000

### Step 8: Update Contact Information
Don't forget to update:
- Email address in social links
- LinkedIn URL (already updated to yours)
- GitHub URL (already updated to yours)
- Phone number if you want to add it

## 📊 Data Extraction Tips from Resume

### From Resume Header:
- Full name → `profile.name`
- Professional title → `profile.title`
- Contact info → `socialLinks`

### From Resume Summary/Objective:
- Professional tagline → `profile.tagline`
- Detailed bio → `profile.aboutText`
- Years of experience → `profile.yearsExperience`

### From Work Experience:
- Each job → `experiences` array entry
- Job responsibilities → `description`
- Technologies used → `technologies` array

### From Education:
- Degrees → `educations` array
- Certifications → `certifications` array

### From Skills Section:
- Technical skills → `technologies` array
- Proficiency levels → estimate 1-100 scale
- Years of experience → calculate from resume

## 🔄 Quick Update Script

You can also create a script to quickly update your data:

```bash
# In backend directory
npm run db:reset    # Reset database
npm run db:seed     # Apply new data
npm run dev         # Restart server
```

This will apply all your resume changes to the portfolio!