'use client'

import { motion } from 'framer-motion'
import { Experience } from '@/types/api'
import { formatDate } from '@/utils/date'

interface JourneyTimelineProps {
  experiences: Experience[]
}

export default function JourneyTimeline({ experiences = [] }: JourneyTimelineProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  }

  const timelineVariants = {
    hidden: { scaleY: 0 },
    visible: { scaleY: 1 }
  }

  // Sort experiences by start date (most recent first)
  const sortedExperiences = [...experiences].sort((a, b) => {
    const dateA = new Date(a.startDate).getTime()
    const dateB = new Date(b.startDate).getTime()
    return dateB - dateA
  })

  const getDuration = (startDate: string, endDate?: string) => {
    const start = new Date(startDate)
    const end = endDate ? new Date(endDate) : new Date()
    
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
    const years = Math.floor(months / 12)
    const remainingMonths = months % 12
    
    if (years === 0) {
      return `${months} month${months !== 1 ? 's' : ''}`
    } else if (remainingMonths === 0) {
      return `${years} year${years !== 1 ? 's' : ''}`
    } else {
      return `${years} year${years !== 1 ? 's' : ''} ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`
    }
  }

  const getCompanyIcon = (company: string) => {
    // You can customize these icons based on actual companies
    const icons: Record<string, string> = {
      'tech company': '🏢',
      'startup': '🚀',
      'enterprise': '🏛️',
      'consulting': '💼',
      'agency': '🎨',
      'freelance': '💻',
      'remote': '🌐'
    }
    
    const key = company.toLowerCase()
    for (const [keyword, icon] of Object.entries(icons)) {
      if (key.includes(keyword)) {
        return icon
      }
    }
    return '🏢' // default icon
  }

  return (
    <section id="experience" className="py-20 bg-neutral-50 dark:bg-neutral-900">
      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 rounded-full text-sm font-medium mb-4">
              Professional Journey
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-6">
              Career
              <span className="block text-transparent bg-clip-text bg-gradient-accent">
                Progression
              </span>
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
              A timeline of my professional growth, key achievements, and the technologies that shaped my career.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <motion.div
              variants={timelineVariants}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-secondary-500 to-accent-500 origin-top"
            />

            {/* Experience Items */}
            <div className="space-y-12">
              {sortedExperiences.map((experience, index) => (
                <motion.div
                  key={experience.id}
                  variants={itemVariants}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="relative flex items-start gap-8"
                >
                  {/* Timeline Dot */}
                  <div className="relative z-10 flex-shrink-0">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="w-16 h-16 bg-white dark:bg-neutral-800 rounded-full border-4 border-primary-500 flex items-center justify-center shadow-lg"
                    >
                      <span className="text-2xl">
                        {getCompanyIcon(experience.company)}
                      </span>
                    </motion.div>
                    
                    {/* Current Position Indicator */}
                    {!experience.endDate && (
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-neutral-800"
                      />
                    )}
                  </div>

                  {/* Experience Card */}
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="flex-1 bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-card hover:shadow-card-hover border border-neutral-200 dark:border-neutral-700 transition-all duration-300"
                  >
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-1">
                          {experience.position}
                        </h3>
                        <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium">
                          <span>{experience.company}</span>
                          {!experience.endDate && (
                            <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded-full">
                              Current
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-right text-sm text-neutral-600 dark:text-neutral-400">
                        <div className="font-medium">
                          {formatDate(experience.startDate)} - {experience.endDate ? formatDate(experience.endDate) : 'Present'}
                        </div>
                        <div className="text-xs">
                          {getDuration(experience.startDate, experience.endDate)}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    {experience.description && (
                      <p className="text-neutral-600 dark:text-neutral-300 mb-4 leading-relaxed">
                        {experience.description}
                      </p>
                    )}

                    {/* Achievements */}
                    {experience.achievements && experience.achievements.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-2">
                          Key Achievements:
                        </h4>
                        <ul className="space-y-1">
                          {experience.achievements.map((achievement, achievementIndex) => (
                            <li key={achievementIndex} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-300">
                              <span className="text-primary-500 mt-1.5 flex-shrink-0">•</span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Technologies */}
                    {experience.technologies && experience.technologies.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-2">
                          Technologies Used:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {experience.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-3 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs rounded-full border border-neutral-200 dark:border-neutral-600"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Summary Stats */}
          <motion.div
            variants={itemVariants}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            <div className="text-center p-6 bg-white dark:bg-neutral-800 rounded-xl shadow-card border border-neutral-200 dark:border-neutral-700">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                {experiences.length}
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                Positions
              </div>
            </div>
            
            <div className="text-center p-6 bg-white dark:bg-neutral-800 rounded-xl shadow-card border border-neutral-200 dark:border-neutral-700">
              <div className="text-3xl font-bold text-secondary-600 dark:text-secondary-400 mb-2">
                {new Set(experiences.map(exp => exp.company)).size}
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                Companies
              </div>
            </div>
            
            <div className="text-center p-6 bg-white dark:bg-neutral-800 rounded-xl shadow-card border border-neutral-200 dark:border-neutral-700">
              <div className="text-3xl font-bold text-accent-600 dark:text-accent-400 mb-2">
                {experiences.reduce((total, exp) => total + (exp.achievements?.length || 0), 0)}
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                Achievements
              </div>
            </div>
            
            <div className="text-center p-6 bg-white dark:bg-neutral-800 rounded-xl shadow-card border border-neutral-200 dark:border-neutral-700">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                {new Set(experiences.flatMap(exp => exp.technologies || [])).size}
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                Technologies
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}