# 🚀 Portfolio Website - Complete Setup & Run Guide

## Quick Start (Recommended)

### 1. Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies  
cd ../frontend
npm install
```

### 2. Setup Database (SQLite - No external setup needed!)

```bash
# Go to backend directory
cd ../backend

# Generate Prisma client
npx prisma generate

# Create and migrate database
npx prisma migrate dev --name init

# Seed database with sample data
npx prisma db seed
```

### 3. Start Both Servers

**Option A: Manual (2 terminals)**

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend  
npm run dev
```

**Option B: Using npm scripts (1 terminal)**
```bash
# From root directory
npm run dev:all
```

### 4. Open Your Browser

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **API Health Check**: http://localhost:3001/health

## 🎯 What You'll See

The portfolio website includes:

✅ **Hero Section** - Profile picture, name, title, experience
✅ **About Section** - Personal introduction and professional summary  
✅ **Technology Showcase** - Interactive tech cards with proficiency indicators
✅ **Expertise Section** - Skills organized by categories (Frontend, Backend, etc.)
✅ **Journey Timeline** - Career progression with achievements and technologies
✅ **Academic Section** - Education background with visual representations

## 🔧 Troubleshooting

### Database Issues
```bash
# Reset database if needed
cd backend
npx prisma migrate reset
npx prisma db seed
```

### Port Conflicts
- Backend runs on port 3001
- Frontend runs on port 3000
- Change ports in `.env` files if needed

### Dependencies Issues
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

## 📊 API Endpoints Available

- `GET /api/profile` - Profile and social links
- `GET /api/technologies` - Technologies and categories  
- `GET /api/experience` - Work experience and education
- `GET /api/recommendations` - Professional recommendations
- `GET /api/achievements` - Certifications, awards, projects

## 🎨 Features Implemented

- **Responsive Design** - Works on desktop, tablet, mobile
- **Dark/Light Theme** - Automatic theme switching
- **Smooth Animations** - Framer Motion animations throughout
- **Modern UI** - Glassmorphism effects, gradients, card layouts
- **Interactive Elements** - Hover effects, progress indicators
- **Professional Timeline** - Visual career progression
- **Technology Showcase** - Interactive skill displays

## 📝 Sample Data Included

The database is pre-populated with:
- Complete profile information
- 15+ technologies across different categories
- 3 work experiences with achievements
- Educational background
- Professional recommendations
- Certifications and awards
- Project highlights

## 🚀 Next Steps

Ready to continue development? The next tasks are:
- Task 9: Recommendations and achievements sections
- Task 10: Resume functionality  
- Task 11: LinkedIn connection features
- Task 12: Visual design enhancements
- Task 13: Animations and interactive effects

Enjoy exploring your portfolio website! 🎉