'use client'

import { ReactNode } from 'react'
import Navigation from './Navigation'
import Footer from './Footer'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <Navigation />
      <main className="relative">
        {children}
      </main>
      <Footer />
    </div>
  )
}