'use client'

import { ReactNode } from 'react'
import Navigation from './Navigation'
import Footer from './Footer'
import { SocialLink } from '@/types/api'

interface LayoutProps {
  children: ReactNode
  socialLinks?: SocialLink[]
}

export default function Layout({ children, socialLinks }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[length:20px_20px]" />
      </div>

      {/* Navigation */}
      <Navigation socialLinks={socialLinks} />

      {/* Main Content */}
      <main className="relative z-10">
        {children}
      </main>

      {/* Footer */}
      <Footer socialLinks={socialLinks} />
    </div>
  )
}