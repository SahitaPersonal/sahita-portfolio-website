'use client'

import { motion } from 'framer-motion'
import { PersonalInfo } from '@/types/api'

interface AboutProps {
  personalInfo: PersonalInfo
}

export default function About({ personalInfo }: AboutProps) {
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

  return (
    <section className="py-20 bg-neutral-50 dark:bg-neutral-900">
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
            <span className="inline-block px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-sm font-medium mb-4">
              About Me
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-6">
              Passionate About Building
              <span className="block text-transparent bg-clip-text bg-gradient-primary">
                Digital Experiences
              </span>
            </h2>
          </motion.div>

          {/* About Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Main About Text */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {personalInfo.aboutText || `With ${personalInfo.yearsExperience}+ years of experience in full-stack development, I specialize in creating scalable web applications that deliver exceptional user experiences. My journey in technology has been driven by a passion for solving complex problems and building solutions that make a real impact.`}
                </p>
                
                <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  I believe in writing clean, maintainable code and staying current with the latest technologies and best practices. My approach combines technical expertise with strong communication skills, enabling me to work effectively with cross-functional teams and deliver projects that exceed expectations.
                </p>
              </div>

              {/* Key Highlights */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700">
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                    {personalInfo.yearsExperience}+
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    Years Experience
                  </div>
                </div>
                <div className="p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700">
                  <div className="text-2xl font-bold text-secondary-600 dark:text-secondary-400 mb-1">
                    Full-Stack
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    Development
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Skills & Values */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Core Values */}
              <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-card border border-neutral-200 dark:border-neutral-700">
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
                  Core Values
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full" />
                    <span className="text-neutral-600 dark:text-neutral-300">
                      Clean, maintainable code
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-secondary-500 rounded-full" />
                    <span className="text-neutral-600 dark:text-neutral-300">
                      User-centered design
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent-500 rounded-full" />
                    <span className="text-neutral-600 dark:text-neutral-300">
                      Continuous learning
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full" />
                    <span className="text-neutral-600 dark:text-neutral-300">
                      Team collaboration
                    </span>
                  </div>
                </div>
              </div>

              {/* Current Focus */}
              <div className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl p-6 border border-primary-200 dark:border-primary-800">
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
                  Current Focus
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  Exploring modern web technologies, cloud architecture, and AI integration to build next-generation applications that solve real-world problems.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-16"
          >
            <div className="inline-flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-gradient-primary text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
                Let's Work Together
              </button>
              <button className="px-8 py-4 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-300">
                View My Projects
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}