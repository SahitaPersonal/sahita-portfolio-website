'use client'

import { motion } from 'framer-motion'
import { Technology, TechCategory } from '@/types/api'

interface TechnologyShowcaseProps {
  technologies: Technology[]
  categories: TechCategory[]
}

export default function TechnologyShowcase({ technologies, categories }: TechnologyShowcaseProps) {
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
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] // easeOutQuart
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] // easeOutQuart
      }
    }
  }

  // Get technology icon/emoji based on name
  const getTechIcon = (name: string) => {
    const icons: Record<string, string> = {
      'react': '⚛️',
      'typescript': '🔷',
      'javascript': '🟨',
      'node.js': '🟢',
      'nodejs': '🟢',
      'python': '🐍',
      'java': '☕',
      'postgresql': '🐘',
      'mysql': '🐬',
      'mongodb': '🍃',
      'redis': '🔴',
      'docker': '🐳',
      'kubernetes': '☸️',
      'aws': '☁️',
      'azure': '🔵',
      'git': '📝',
      'github': '🐙',
      'next.js': '▲',
      'nextjs': '▲',
      'vue': '💚',
      'angular': '🅰️',
      'express': '🚂',
      'nestjs': '🦅',
      'graphql': '💜',
      'tailwind': '🎨',
      'sass': '💅',
      'webpack': '📦',
      'vite': '⚡',
      'jest': '🃏',
      'cypress': '🌲',
      'figma': '🎨',
      'photoshop': '🖼️'
    }
    
    const key = name.toLowerCase().replace(/[.\s]/g, '')
    return icons[key] || '🔧'
  }

  // Get proficiency color based on level
  const getProficiencyColor = (proficiency: number) => {
    if (proficiency >= 90) return 'from-green-500 to-emerald-600'
    if (proficiency >= 80) return 'from-blue-500 to-cyan-600'
    if (proficiency >= 70) return 'from-yellow-500 to-orange-600'
    if (proficiency >= 60) return 'from-purple-500 to-pink-600'
    return 'from-gray-500 to-slate-600'
  }

  // Get category color
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'frontend': 'from-blue-500 to-cyan-500',
      'backend': 'from-green-500 to-emerald-500',
      'database': 'from-purple-500 to-violet-500',
      'devops': 'from-orange-500 to-red-500',
      'language': 'from-pink-500 to-rose-500',
      'tools': 'from-indigo-500 to-blue-500',
      'cloud': 'from-sky-500 to-blue-500',
      'mobile': 'from-teal-500 to-cyan-500'
    }
    
    return colors[category.toLowerCase()] || 'from-gray-500 to-slate-500'
  }

  // Group technologies by category
  const groupedTechnologies = technologies.reduce((acc, tech) => {
    if (!acc[tech.category]) {
      acc[tech.category] = []
    }
    acc[tech.category].push(tech)
    return acc
  }, {} as Record<string, Technology[]>)

  return (
    <section className="py-20 bg-gradient-to-br from-neutral-50 via-white to-neutral-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-sm font-medium mb-4">
              Technologies & Skills
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-6">
              My Technical
              <span className="block text-transparent bg-clip-text bg-gradient-primary">
                Arsenal
              </span>
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
              A comprehensive overview of the technologies, frameworks, and tools I use to build exceptional digital experiences.
            </p>
          </motion.div>

          {/* Technology Categories */}
          <div className="space-y-12">
            {Object.entries(groupedTechnologies).map(([categoryName, categoryTechs], categoryIndex) => (
              <motion.div
                key={categoryName}
                variants={itemVariants}
                className="space-y-6"
              >
                {/* Category Header */}
                <div className="flex items-center gap-4">
                  <div className={`w-1 h-8 bg-gradient-to-b ${getCategoryColor(categoryName)} rounded-full`} />
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-white capitalize">
                    {categoryName}
                  </h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-neutral-300 to-transparent dark:from-neutral-600" />
                </div>

                {/* Technology Cards */}
                <motion.div
                  variants={containerVariants}
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                >
                  {categoryTechs
                    .sort((a, b) => b.proficiency - a.proficiency)
                    .map((tech, techIndex) => (
                      <motion.div
                        key={tech.id}
                        variants={cardVariants}
                        whileHover={{ 
                          scale: 1.05, 
                          y: -5,
                          transition: { duration: 0.2 }
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative bg-white dark:bg-neutral-800 rounded-xl p-4 shadow-card hover:shadow-card-hover border border-neutral-200 dark:border-neutral-700 transition-all duration-300 cursor-pointer"
                      >
                        {/* Technology Icon */}
                        <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                          {tech.logoUrl ? (
                            <img 
                              src={tech.logoUrl} 
                              alt={tech.name}
                              className="w-8 h-8 object-contain"
                            />
                          ) : (
                            <span>{getTechIcon(tech.name)}</span>
                          )}
                        </div>

                        {/* Technology Name */}
                        <h4 className="font-semibold text-neutral-900 dark:text-white mb-2 text-sm">
                          {tech.name}
                        </h4>

                        {/* Proficiency Bar */}
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-neutral-600 dark:text-neutral-400">
                              Proficiency
                            </span>
                            <span className="font-medium text-neutral-900 dark:text-white">
                              {tech.proficiency}%
                            </span>
                          </div>
                          <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${tech.proficiency}%` }}
                              transition={{ duration: 1, delay: categoryIndex * 0.1 + techIndex * 0.05 }}
                              className={`h-2 bg-gradient-to-r ${getProficiencyColor(tech.proficiency)} rounded-full`}
                            />
                          </div>
                        </div>

                        {/* Years of Experience */}
                        {tech.yearsUsed && (
                          <div className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">
                            {tech.yearsUsed} year{tech.yearsUsed !== 1 ? 's' : ''} experience
                          </div>
                        )}

                        {/* Hover Effect Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </motion.div>
                    ))}
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Summary Stats */}
          <motion.div
            variants={itemVariants}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            <div className="text-center p-6 bg-white dark:bg-neutral-800 rounded-xl shadow-card border border-neutral-200 dark:border-neutral-700">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                {technologies.length}
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                Technologies
              </div>
            </div>
            
            <div className="text-center p-6 bg-white dark:bg-neutral-800 rounded-xl shadow-card border border-neutral-200 dark:border-neutral-700">
              <div className="text-3xl font-bold text-secondary-600 dark:text-secondary-400 mb-2">
                {Object.keys(groupedTechnologies).length}
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                Categories
              </div>
            </div>
            
            <div className="text-center p-6 bg-white dark:bg-neutral-800 rounded-xl shadow-card border border-neutral-200 dark:border-neutral-700">
              <div className="text-3xl font-bold text-accent-600 dark:text-accent-400 mb-2">
                {Math.round(technologies.reduce((sum, tech) => sum + tech.proficiency, 0) / technologies.length)}%
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                Avg Proficiency
              </div>
            </div>
            
            <div className="text-center p-6 bg-white dark:bg-neutral-800 rounded-xl shadow-card border border-neutral-200 dark:border-neutral-700">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                {technologies.filter(tech => tech.proficiency >= 80).length}
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                Expert Level
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}