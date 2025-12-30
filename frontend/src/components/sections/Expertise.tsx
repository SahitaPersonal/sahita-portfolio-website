'use client'

import { motion } from 'framer-motion'
import { Technology } from '@/types/api'

interface ExpertiseProps {
  technologies: Technology[]
}

interface SkillCategory {
  name: string
  description: string
  icon: string
  color: string
  skills: Technology[]
}

export default function Expertise({ technologies = [] }: ExpertiseProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }

  const skillVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  }

  // Categorize technologies into skill areas
  const skillCategories: SkillCategory[] = [
    {
      name: 'Frontend Development',
      description: 'Creating engaging user interfaces and experiences',
      icon: '🎨',
      color: 'from-blue-500 to-cyan-500',
      skills: technologies.filter(tech => 
        ['frontend', 'ui', 'css', 'styling'].some(keyword => 
          tech.category.toLowerCase().includes(keyword) ||
          tech.name.toLowerCase().includes('react') ||
          tech.name.toLowerCase().includes('next') ||
          tech.name.toLowerCase().includes('tailwind') ||
          tech.name.toLowerCase().includes('sass') ||
          tech.name.toLowerCase().includes('css')
        )
      )
    },
    {
      name: 'Backend Development',
      description: 'Building robust server-side applications and APIs',
      icon: '⚙️',
      color: 'from-green-500 to-emerald-500',
      skills: technologies.filter(tech => 
        ['backend', 'server', 'api'].some(keyword => 
          tech.category.toLowerCase().includes(keyword) ||
          tech.name.toLowerCase().includes('node') ||
          tech.name.toLowerCase().includes('express') ||
          tech.name.toLowerCase().includes('nest')
        )
      )
    },
    {
      name: 'Database & Storage',
      description: 'Managing data persistence and optimization',
      icon: '🗄️',
      color: 'from-purple-500 to-violet-500',
      skills: technologies.filter(tech => 
        ['database', 'storage', 'data'].some(keyword => 
          tech.category.toLowerCase().includes(keyword) ||
          tech.name.toLowerCase().includes('mysql')
        )
      )
    },
    {
      name: 'DevOps & Cloud',
      description: 'Deployment, scaling, and infrastructure management',
      icon: '☁️',
      color: 'from-orange-500 to-red-500',
      skills: technologies.filter(tech => 
        ['devops', 'cloud', 'deployment', 'infrastructure'].some(keyword => 
          tech.category.toLowerCase().includes(keyword) ||
          tech.name.toLowerCase().includes('docker') ||
          tech.name.toLowerCase().includes('kubernetes') ||
          tech.name.toLowerCase().includes('aws') ||
          tech.name.toLowerCase().includes('azure') ||
          tech.name.toLowerCase().includes('vercel') ||
          tech.name.toLowerCase().includes('git')
        )
      )
    }
  ]

  // Filter out empty categories and ensure no duplicates
  const validCategories = skillCategories
    .filter(category => category.skills.length > 0)
    .map(category => ({
      ...category,
      skills: category.skills
    }))

  return (
    <section className="py-20 bg-white dark:bg-neutral-900">
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
            <span className="inline-block px-4 py-2 bg-secondary-100 dark:bg-secondary-900/30 text-secondary-600 dark:text-secondary-400 rounded-full text-sm font-medium mb-4">
              Core Expertise
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-6">
              Areas of
              <span className="block text-transparent bg-clip-text bg-gradient-secondary">
                Specialization
              </span>
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
              Deep expertise across the full technology stack, from user-facing interfaces to scalable backend systems.
            </p>
          </motion.div>

          {/* Expertise Categories */}
          <div className="grid lg:grid-cols-2 gap-8">
            {validCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.name}
                variants={itemVariants}
                className="group"
              >
                <div className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-8 h-full border border-neutral-200 dark:border-neutral-700 hover:shadow-card-hover transition-all duration-300">
                  {/* Category Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center text-2xl shadow-lg`}>
                      {category.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                        {category.name}
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-4">
                    {category.skills.slice(0, 6).map((skill, skillIndex) => {
                      return (
                        <motion.div
                          key={skill.id}
                          variants={skillVariants}
                          className="flex items-center justify-between p-3 bg-white dark:bg-neutral-700 rounded-lg border border-neutral-200 dark:border-neutral-600 hover:border-neutral-300 dark:hover:border-neutral-500 transition-colors duration-200"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full" />
                            <span className="font-medium text-neutral-900 dark:text-white">
                              {skill.name}
                            </span>
                          </div>
                        </motion.div>
                      )
                    })}
                    
                    {category.skills.length > 6 && (
                      <div className="text-center pt-2">
                        <span className="text-sm text-neutral-500 dark:text-neutral-400">
                          +{category.skills.length - 6} more technologies
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Category Stats */}
                  <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-600">
                    <div className="text-center">
                      <div>
                        <div className="text-lg font-bold text-neutral-900 dark:text-white">
                          {category.skills.length}
                        </div>
                        <div className="text-xs text-neutral-500 dark:text-neutral-400">
                          Technologies
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Overall Expertise Summary */}
          <motion.div
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl p-8 border border-primary-200 dark:border-primary-800">
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                Full-Stack Expertise
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300 mb-6 max-w-2xl mx-auto">
                With comprehensive knowledge across all layers of modern web development, I can architect and build complete solutions from database design to user interface implementation.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent-600 dark:text-accent-400 mb-1">
                    {validCategories.length}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    Specializations
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                    6+
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    Years Experience
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}