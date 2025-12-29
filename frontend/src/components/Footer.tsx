'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ExternalLink, Heart } from 'lucide-react'
import { SocialLink } from '@/types/api'

interface FooterProps {
  socialLinks?: SocialLink[]
}

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  email: Mail,
} as const

export default function Footer({ socialLinks = [] }: FooterProps) {
  const currentYear = new Date().getFullYear()

  const getSocialIcon = (platform: string, iconName?: string) => {
    const key = (iconName || platform).toLowerCase() as keyof typeof iconMap
    const IconComponent = iconMap[key] || ExternalLink
    return IconComponent
  }

  const quickLinks = [
    { href: '#about', label: 'About' },
    { href: '#technologies', label: 'Technologies' },
    { href: '#experience', label: 'Experience' },
    { href: '#recommendations', label: 'Recommendations' },
    { href: '#achievements', label: 'Achievements' },
  ]

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-black/50 backdrop-blur-md border-t border-white/10">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold gradient-text">Portfolio</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Full-stack engineer passionate about building scalable web applications 
              with modern technologies and exceptional user experiences.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((link, index) => {
                const IconComponent = getSocialIcon(link.platform, link.icon)
                return (
                  <motion.a
                    key={link.id}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
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
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-white">Get In Touch</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Interested in working together? Feel free to reach out for 
              collaborations or just a friendly hello.
            </p>
            
            {/* Email Link */}
            {socialLinks.find(link => link.platform.toLowerCase().includes('mail') || link.platform.toLowerCase().includes('email')) && (
              <motion.a
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                href={socialLinks.find(link => link.platform.toLowerCase().includes('mail') || link.platform.toLowerCase().includes('email'))?.url}
                className="inline-flex items-center space-x-2 text-primary-400 hover:text-primary-300 transition-colors duration-200"
              >
                <Mail size={16} />
                <span className="text-sm">Send a message</span>
              </motion.a>
            )}
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0"
        >
          <p className="text-gray-400 text-sm">
            © {currentYear} Portfolio. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-1 text-gray-400 text-sm">
            <span>Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
            >
              <Heart size={14} className="text-red-500 fill-current" />
            </motion.div>
            <span>using Next.js & TypeScript</span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}