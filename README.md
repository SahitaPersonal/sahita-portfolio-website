# Portfolio Website

A modern, responsive portfolio website built with Next.js and Node.js/Express.

## Project Structure

- `frontend/` - Next.js frontend application with TypeScript and Tailwind CSS
- `backend/` - Node.js/Express backend API with TypeScript and Prisma ORM

## Getting Started

### Prerequisites

- Node.js 20.16+ 
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository
2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

4. Set up environment variables:
   - Copy `backend/.env.example` to `backend/.env`
   - Update database connection string and other variables

5. Set up the database:
   ```bash
   cd backend
   npm run prisma:migrate
   npm run prisma:generate
   ```

### Development

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Features

- Modern, responsive design with animations
- Professional portfolio showcase
- Technology skills visualization
- Professional journey timeline
- LinkedIn recommendations display
- Resume viewer and download
- SEO optimized
- Accessibility compliant

## Tech Stack

### Frontend
- Next.js 14+ with App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React Icons

### Backend
- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL

### Testing
- Jest
- React Testing Library
- Fast-check (Property-based testing)

## License

MIT License