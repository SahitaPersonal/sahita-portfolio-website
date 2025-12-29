'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Github, Linkedin, Mail, ExternalLink } from 'lucide-react'
import { SocialLink } from '@/types/api'

interface NavigationProps {
  socialLinks?: SocialLink[]
}

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  email: Mail,
} as const

export default function Navigation({ socialLinks = [] }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '#about', label: 'About' },
    { href: '#technologies', label: 'Technologies' },
    { href: '#experience', label: 'Experience' },
    { href: '#recommendations', label: 'Recommendations' },
    { href: '#achievements', label: 'Achievements' },
    { href: '#contact', label: 'Contact' },
  ]

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    
    // Smooth scroll to section
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const getSocialIcon = (platform: string, iconName?: string) => {
    const key = (iconName || platform).toLowerCase() as keyof typeof iconMap
    const IconComponent = iconMap[key] || ExternalLink
    return IconComponent
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-black/80 backdrop-blur-md border-b border-white/10' 
            : 'bg-transparent'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 px-4">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Link 
                href="#home" 
                className="text-xl font-bold gradient-text hover:scale-105 transition-transform"
                onClick={() => handleNavClick('#home')}
              >
                Portfolio
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                >
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
                  >
                    {item.label}
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="hidden md:flex items-center space-x-4">
              {socialLinks.map((link, index) => {
                const IconComponent = getSocialIcon(link.platform, link.icon)
                return (
                  <motion.div
                    key={link.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors duration-200 p-2 hover:bg-white/10 rounded-lg"
                      aria-label={`Visit ${link.platform} profile`}
                    >
                      <IconComponent size={20} />
                    </a>
                  </motion.div>
                )
              })}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-300 hover:text-white transition-colors p-2"
              aria-label="Toggle mobile menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/10"
            >
              <div className="container-custom px-4 py-6">
                <div className="flex flex-col space-y-4">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleNavClick(item.href)}
                      className="text-gray-300 hover:text-white transition-colors duration-200 font-medium text-left py-2"
                    >
                      {item.label}
                    </motion.button>
                  ))}
                  
                  {/* Mobile Social Links */}
                  <div className="flex items-center space-x-4 pt-4 border-t border-white/10">
                    {socialLinks.map((link, index) => {
                      const IconComponent = getSocialIcon(link.platform, link.icon)
                      return (
                        <motion.a
                          key={link.id}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white transition-colors duration-200 p-2 hover:bg-white/10 rounded-lg"
                          aria-label={`Visit ${link.platform} profile`}
                        >
                          <IconComponent size={20} />
                        </motion.a>
                      )
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer to prevent content from hiding behind fixed nav */}
      <div className="h-16" />
    </>
  )
}