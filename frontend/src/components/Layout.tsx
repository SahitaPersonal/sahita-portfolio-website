'use client'

import { ReactNode } from 'react'
import Navigation from './Navigation'
import Footer from './Footer'
import ScrollToTop from './ui/ScrollToTop'
import { SocialLink } from '@/types/api'

interface LayoutProps {
  children: ReactNode
  socialLinks?: SocialLink[]
}

export default function Layout({ children, socialLinks }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 relative overflow-hidden">
      {/* Skip to main content link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      {/* Enhanced Background Pattern */}
      <div className="fixed inset-0 opacity-30">
        {/* Animated mesh gradient background */}
        <div className="absolute inset-0 bg-mesh-gradient opacity-20 animate-pulse-slow" />
        
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-primary rounded-full blur-3xl opacity-20 animate-float" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-secondary rounded-full blur-2xl opacity-15 animate-float-delayed" />
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-accent rounded-full blur-4xl opacity-10 animate-float" />
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-primary rounded-full blur-3xl opacity-20 animate-float-delayed" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[length:40px_40px]" />
      </div>

      {/* Glass morphism overlay */}
      <div className="fixed inset-0 backdrop-blur-[0.5px] bg-gradient-to-b from-transparent via-black/5 to-black/20 pointer-events-none" />

      {/* Navigation */}
      <Navigation socialLinks={socialLinks} />

      {/* Main Content */}
      <main id="main-content" className="relative z-10" role="main" aria-label="Main content">
        {children}
      </main>

      {/* Footer */}
      <Footer socialLinks={socialLinks} />

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  )
}