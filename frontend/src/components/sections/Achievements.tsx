'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLinkIcon, CalendarIcon, AwardIcon, FileTextIcon, FolderIcon, LinkIcon } from 'lucide-react'
import { Certification, Award, ProjectHighlight } from '@/types/api'
import { GeometricShapes, FloatingIcons, BinaryRain } from '@/components/ui/CoderGraphics'

interface AchievementsProps {
  certifications: Certification[]
  awards: Award[]
  projects: ProjectHighlight[]
}

export default function Achievements({ certifications = [], awards = [], projects = [] }: AchievementsProps) {
  const [activeTab, setActiveTab] = useState<'certifications' | 'awards' | 'projects'>('certifications')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1
    }
  }

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    })
  }

  // Check if certification is active (not expired)
  const isCertificationActive = (cert: Certification) => {
    if (!cert.expiryDate) return true
    return new Date(cert.expiryDate) > new Date()
  }

  // Get category color
  const getCategoryColor = (category?: string) => {
    const colors: Record<string, string> = {
      'cloud': 'from-blue-500 to-cyan-500',
      'development': 'from-green-500 to-emerald-500',
      'security': 'from-red-500 to-pink-500',
      'data': 'from-purple-500 to-violet-500',
      'design': 'from-orange-500 to-yellow-500',
      'management': 'from-indigo-500 to-blue-500',
      'frontend': 'from-cyan-500 to-blue-500',
      'backend': 'from-green-500 to-teal-500',
      'fullstack': 'from-purple-500 to-pink-500'
    }
    
    return colors[category?.toLowerCase() || ''] || 'from-gray-500 to-slate-500'
  }

  const tabs = [
    { id: 'certifications', label: 'Certifications', icon: FileTextIcon, count: certifications.length },
    { id: 'awards', label: 'Awards', icon: AwardIcon, count: awards.length },
    { id: 'projects', label: 'Projects', icon: FolderIcon, count: projects.length }
  ] as const

  return (
    <section id="achievements" className="section-padding relative overflow-hidden" aria-labelledby="achievements-heading">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <BinaryRain className="opacity-20" />
        <FloatingIcons />
        
        {/* Animated gradient orbs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, 360],
          }}
          transition={{ 
            duration: 30, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-accent rounded-full blur-3xl opacity-10"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            y: [-30, 30, -30],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-primary rounded-full blur-3xl opacity-15"
        />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-6xl mx-auto"
        >
          {/* Enhanced Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-20">
            <span className="inline-flex items-center gap-2 px-4 py-2 glass-card text-primary-300 rounded-full text-sm font-medium mb-6">
              <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
              Professional Achievements
            </span>
            <h2 id="achievements-heading" className="text-responsive-lg font-bold text-white mb-6">
              Certifications &
              <span className="block gradient-text">
                Accomplishments
              </span>
            </h2>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
              A showcase of my professional certifications, awards, and notable projects that demonstrate my expertise and commitment to excellence.
            </p>
          </motion.div>

          {/* Enhanced Tab Navigation */}
          <motion.div variants={itemVariants} className="flex justify-center mb-12">
            <div className="flex glass-card rounded-xl p-1 relative">
              {/* Geometric shapes decoration */}
              <div className="absolute -top-3 -right-3">
                <GeometricShapes variant="inline" size="sm" />
              </div>
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-neutral-700 text-primary-400 shadow-md'
                        : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      activeTab === tab.id
                        ? 'bg-primary-900/30 text-primary-400'
                        : 'bg-neutral-600 text-neutral-400'
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                )
              })}
            </div>
          </motion.div>

          {/* Content Sections */}
          <motion.div variants={containerVariants} className="min-h-[400px]">
            {/* Certifications Tab */}
            {activeTab === 'certifications' && (
              <motion.div
                key="certifications"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {certifications.map((cert) => (
                  <motion.div
                    key={cert.id}
                    variants={cardVariants}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="group relative bg-neutral-800 rounded-xl p-6 shadow-card hover:shadow-card-hover border border-neutral-700 transition-all duration-300 overflow-hidden"
                  >
                    {/* Achievement Badge */}
                    <div className="absolute -top-2 -right-2 z-10">
                      <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                    </div>

                    {/* Authenticity Ribbon */}
                    <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                      <div className="absolute top-3 right-[-32px] w-20 h-6 bg-gradient-to-r from-blue-500 to-purple-600 transform rotate-45 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">CERT</span>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        isCertificationActive(cert)
                          ? 'bg-green-900/30 text-green-400'
                          : 'bg-orange-900/30 text-orange-400'
                      }`}>
                        {isCertificationActive(cert) ? 'Active' : 'Expired'}
                      </span>
                    </div>

                    {/* Logo/Icon */}
                    <div className="mb-4">
                      {cert.logoUrl ? (
                        <img 
                          src={cert.logoUrl} 
                          alt={`${cert.issuer} logo`}
                          className="w-12 h-12 object-contain"
                          loading="lazy"
                        />
                      ) : (
                        <div className={`w-12 h-12 bg-gradient-to-r ${getCategoryColor(cert.category)} rounded-lg flex items-center justify-center`}>
                          <FileTextIcon className="w-6 h-6 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <h4 className="font-semibold text-white mb-2 text-sm leading-tight">
                      {cert.name}
                    </h4>
                    
                    <p className="text-sm text-neutral-400 mb-3">
                      {cert.issuer}
                    </p>

                    {/* Category */}
                    {cert.category && (
                      <div className="mb-3">
                        <span className={`inline-block px-2 py-1 bg-gradient-to-r ${getCategoryColor(cert.category)} text-white text-xs rounded-full`}>
                          {cert.category}
                        </span>
                      </div>
                    )}

                    {/* Dates */}
                    <div className="flex items-center gap-2 text-xs text-neutral-400 mb-4">
                      <CalendarIcon className="w-3 h-3" />
                      <span>Issued {formatDate(cert.issueDate)}</span>
                      {cert.expiryDate && (
                        <span>• Expires {formatDate(cert.expiryDate)}</span>
                      )}
                    </div>

                    {/* Credential ID */}
                    {cert.credentialId && (
                      <div className="text-xs text-neutral-400 mb-4">
                        ID: {cert.credentialId}
                      </div>
                    )}

                    {/* Verification Link */}
                    {cert.verificationUrl && (
                      <a
                        href={cert.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-primary-400 hover:text-primary-300 transition-colors"
                      >
                        <ExternalLinkIcon className="w-3 h-3" />
                        Verify Certificate
                      </a>
                    )}

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Awards Tab */}
            {activeTab === 'awards' && (
              <motion.div
                key="awards"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {awards.map((award) => (
                  <motion.div
                    key={award.id}
                    variants={cardVariants}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="group relative bg-neutral-800 rounded-xl p-6 shadow-card hover:shadow-card-hover border border-neutral-700 transition-all duration-300 overflow-hidden"
                  >
                    {/* Award Trophy Badge */}
                    <div className="absolute -top-2 -right-2 z-10">
                      <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white text-xs font-bold">🏆</span>
                      </div>
                    </div>

                    {/* Excellence Ribbon */}
                    <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                      <div className="absolute top-3 right-[-32px] w-20 h-6 bg-gradient-to-r from-purple-500 to-pink-600 transform rotate-45 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">STAR</span>
                      </div>
                    </div>
                    {/* Logo/Icon */}
                    <div className="mb-4">
                      {award.logoUrl ? (
                        <img 
                          src={award.logoUrl} 
                          alt={`${award.issuer} logo`}
                          className="w-12 h-12 object-contain"
                          loading="lazy"
                        />
                      ) : (
                        <div className={`w-12 h-12 bg-gradient-to-r ${getCategoryColor(award.category)} rounded-lg flex items-center justify-center`}>
                          <AwardIcon className="w-6 h-6 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <h4 className="font-semibold text-white mb-2 text-sm leading-tight">
                      {award.title}
                    </h4>
                    
                    <p className="text-sm text-neutral-400 mb-3">
                      {award.issuer}
                    </p>

                    {/* Category */}
                    {award.category && (
                      <div className="mb-3">
                        <span className={`inline-block px-2 py-1 bg-gradient-to-r ${getCategoryColor(award.category)} text-white text-xs rounded-full`}>
                          {award.category}
                        </span>
                      </div>
                    )}

                    {/* Description */}
                    {award.description && (
                      <p className="text-xs text-neutral-400 mb-3 line-clamp-3">
                        {award.description}
                      </p>
                    )}

                    {/* Date */}
                    <div className="flex items-center gap-2 text-xs text-neutral-400">
                      <CalendarIcon className="w-3 h-3" />
                      <span>Awarded {formatDate(award.dateAwarded)}</span>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Projects Tab */}
            {activeTab === 'projects' && (
              <motion.div
                key="projects"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid md:grid-cols-2 gap-8"
              >
                {projects.map((project) => (
                  <motion.div
                    key={project.id}
                    variants={cardVariants}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="group relative bg-neutral-800 rounded-xl overflow-hidden shadow-card hover:shadow-card-hover border border-neutral-700 transition-all duration-300"
                  >
                    {/* Project Image */}
                    {project.imageUrl && (
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={project.imageUrl} 
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6">
                      {/* Featured Badge */}
                      {project.isFeatured && (
                        <div className="absolute top-4 right-4">
                          <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">★</span>
                          </div>
                        </div>
                      )}

                      <h4 className="font-semibold text-white mb-3 text-lg">
                        {project.title}
                      </h4>
                      
                      <p className="text-sm text-neutral-400 mb-4 line-clamp-3">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 4).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 bg-neutral-700 text-neutral-300 text-xs rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="px-2 py-1 bg-neutral-700 text-neutral-400 text-xs rounded-md">
                            +{project.technologies.length - 4} more
                          </span>
                        )}
                      </div>

                      {/* Project Duration */}
                      <div className="flex items-center gap-2 text-xs text-neutral-400 mb-4">
                        <CalendarIcon className="w-3 h-3" />
                        <span>
                          {formatDate(project.startDate)}
                          {project.endDate && ` - ${formatDate(project.endDate)}`}
                        </span>
                      </div>

                      {/* Links */}
                      <div className="flex items-center gap-4">
                        {project.projectUrl && (
                          <a
                            href={project.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-primary-400 hover:text-primary-300 transition-colors"
                          >
                            <LinkIcon className="w-3 h-3" />
                            Live Demo
                          </a>
                        )}
                        
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-neutral-400 hover:text-neutral-200 transition-colors"
                          >
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            Source Code
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* Summary Stats */}
          <motion.div
            variants={itemVariants}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            <div className="text-center p-6 bg-neutral-800 rounded-xl shadow-card border border-neutral-700">
              <div className="text-3xl font-bold text-primary-400 mb-2">
                {certifications.filter(cert => isCertificationActive(cert)).length}
              </div>
              <div className="text-sm text-neutral-400">
                Active Certifications
              </div>
            </div>
            
            <div className="text-center p-6 bg-neutral-800 rounded-xl shadow-card border border-neutral-700">
              <div className="text-3xl font-bold text-secondary-400 mb-2">
                {awards.length}
              </div>
              <div className="text-sm text-neutral-400">
                Awards Received
              </div>
            </div>
            
            <div className="text-center p-6 bg-neutral-800 rounded-xl shadow-card border border-neutral-700">
              <div className="text-3xl font-bold text-accent-400 mb-2">
                {projects.filter(p => p.isFeatured).length}
              </div>
              <div className="text-sm text-neutral-400">
                Featured Projects
              </div>
            </div>
            
            <div className="text-center p-6 bg-neutral-800 rounded-xl shadow-card border border-neutral-700">
              <div className="text-3xl font-bold text-green-400 mb-2">
                {new Set(certifications.map(c => c.category)).size + new Set(awards.map(a => a.category)).size}
              </div>
              <div className="text-sm text-neutral-400">
                Categories
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}