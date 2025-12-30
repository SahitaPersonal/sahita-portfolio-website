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

export default function Expertise({ technologies }: ExpertiseProps) {
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
          tech.name.toLowerCase().includes('vue') ||
          tech.name.toLowerCase().includes('angular') ||
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
          tech.name.toLowerCase().includes('nest') ||
          tech.name.toLowerCase().includes('python') ||
          tech.name.toLowerCase().includes('java') ||
          tech.name.toLowerCase().includes('spring')
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
          tech.name.toLowerCase().includes('postgres') ||
          tech.name.toLowerCase().includes('mysql') ||
          tech.name.toLowerCase().includes('mongo') ||
          tech.name.toLowerCase().includes('redis') ||
          tech.name.toLowerCase().includes('prisma')
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
      skills: category.skills.sort((a, b) => b.proficiency - a.proficiency)
    }))

  const getSkillLevel = (proficiency: number) => {
    if (proficiency >= 90) return { label: 'Expert', color: 'text-green-600 dark:text-green-400' }
    if (proficiency >= 80) return { label: 'Advanced', color: 'text-blue-600 dark:text-blue-400' }
    if (proficiency >= 70) return { label: 'Proficient', color: 'text-yellow-600 dark:text-yellow-400' }
    if (proficiency >= 60) return { label: 'Intermediate', color: 'text-purple-600 dark:text-purple-400' }
    return { label: 'Learning', color: 'text-gray-600 dark:text-gray-400' }
  }

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
                      const skillLevel = getSkillLevel(skill.proficiency)
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
                          
                          <div className="flex items-center gap-3">
                            <span className={`text-xs font-medium ${skillLevel.color}`}>
                              {skillLevel.label}
                            </span>
                            <div className="flex items-center gap-1">
                              <div className="w-16 bg-neutral-200 dark:bg-neutral-600 rounded-full h-1.5">
                                <motion.div
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${skill.proficiency}%` }}
                                  transition={{ 
                                    duration: 1, 
                                    delay: categoryIndex * 0.2 + skillIndex * 0.1 
                                  }}
                                  className={`h-1.5 bg-gradient-to-r ${category.color} rounded-full`}
                                />
                              </div>
                              <span className="text-xs text-neutral-500 dark:text-neutral-400 min-w-[2rem] text-right">
                                {skill.proficiency}%
                              </span>
                            </div>
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
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-neutral-900 dark:text-white">
                          {category.skills.length}
                        </div>
                        <div className="text-xs text-neutral-500 dark:text-neutral-400">
                          Technologies
                        </div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-neutral-900 dark:text-white">
                          {Math.round(category.skills.reduce((sum, skill) => sum + skill.proficiency, 0) / category.skills.length)}%
                        </div>
                        <div className="text-xs text-neutral-500 dark:text-neutral-400">
                          Avg Proficiency
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
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                    {technologies.filter(tech => tech.proficiency >= 90).length}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    Expert Skills
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary-600 dark:text-secondary-400 mb-1">
                    {technologies.filter(tech => tech.proficiency >= 80).length}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    Advanced Skills
                  </div>
                </div>
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