# Resume Storage Instructions

## How to Add Your Resume

1. **Save your resume as PDF**: Make sure your resume is in PDF format for best compatibility
2. **Name the file**: Rename your resume file to `resume.pdf`
3. **Place in this directory**: Copy `resume.pdf` to this `backend/public/files/` directory
4. **Restart the backend server**: After adding the file, restart the backend server to ensure it's served properly

## File Structure
```
backend/public/files/
├── resume.pdf          # Your actual resume file (add this)
├── README.md          # This instruction file
└── .gitkeep           # Git placeholder file
```

## Accessing Your Resume
- **Download URL**: http://localhost:3001/files/resume.pdf
- **View in Browser**: The resume viewer component will display it in a new tab
- **Download Button**: Users can download it directly from your portfolio

## Security Notes
- Only PDF files are recommended for resumes
- The file will be publicly accessible via the web server
- Make sure your resume doesn't contain sensitive information you don't want public

## Updating Resume Data in Portfolio
After adding your resume, you should also update:
1. **Database seed data** (`backend/prisma/seed.ts`) with your actual information
2. **Profile information** with details from your resume
3. **Experience, education, and skills** sections with resume content