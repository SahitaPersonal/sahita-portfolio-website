'use client'

import { motion } from 'framer-motion'
import { PersonalInfo } from '@/types/api'
import { CodeStructure, GeometricShapes, FloatingIcons } from '@/components/ui/CoderGraphics'

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
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Floating code symbols */}
        <FloatingIcons />
        
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            x: [-50, 50, -50],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-20 right-20 w-64 h-64 bg-gradient-secondary rounded-full blur-3xl opacity-10"
        />
        <motion.div 
          animate={{ 
            scale: [1.1, 1, 1.1],
            y: [-30, 30, -30],
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-accent rounded-full blur-4xl opacity-8"
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
              About Me
            </span>
            <h2 className="text-responsive-lg font-bold text-white mb-6">
              Passionate About Building
              <span className="block gradient-text">
                Digital Experiences
              </span>
            </h2>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
              Crafting innovative solutions with modern technologies and user-centered design principles.
            </p>
          </motion.div>

          {/* Enhanced About Content */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Main About Text */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="card-modern p-8 space-y-6 relative overflow-hidden">
                {/* Code structure visualization */}
                <div className="absolute -top-4 -right-4 opacity-20">
                  <CodeStructure className="w-32 h-32" />
                </div>
                
                <h3 className="text-2xl font-semibold text-white mb-4 relative z-10">My Journey</h3>
                <div className="space-y-4 text-neutral-300 leading-relaxed relative z-10">
                  <p>
                    {personalInfo.aboutText || `With ${personalInfo.yearsExperience}+ years of experience in full-stack development, I specialize in creating scalable web applications that deliver exceptional user experiences. My journey in technology has been driven by a passion for solving complex problems and building solutions that make a real impact.`}
                  </p>
                  
                  <p>
                    I believe in writing clean, maintainable code and staying current with the latest technologies and best practices. My approach combines technical expertise with strong communication skills, enabling me to work effectively with cross-functional teams and deliver projects that exceed expectations.
                  </p>
                </div>
              </div>

              {/* Enhanced Key Highlights */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="card-modern p-6 text-center relative overflow-hidden"
                >
                  {/* Geometric shapes decoration */}
                  <div className="absolute -top-2 -right-2">
                    <GeometricShapes variant="inline" size="sm" />
                  </div>
                  <div className="text-3xl font-bold gradient-text mb-2 relative z-10">
                    {personalInfo.yearsExperience}+
                  </div>
                  <div className="text-sm text-neutral-400 relative z-10">
                    Years Experience
                  </div>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="card-modern p-6 text-center relative overflow-hidden"
                >
                  {/* Code symbols decoration */}
                  <div className="absolute top-2 right-2 text-primary-400/20 font-mono text-lg">
                    &lt;/&gt;
                  </div>
                  <div className="text-3xl font-bold gradient-text mb-2 relative z-10">
                    Full-Stack
                  </div>
                  <div className="text-sm text-neutral-400 relative z-10">
                    Development
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Enhanced Skills & Values */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Core Values */}
              <div className="card-modern p-8">
                <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-sm" />
                  </div>
                  Core Values
                </h3>
                <div className="space-y-4">
                  {[
                    { label: 'Clean, maintainable code', color: 'bg-primary-500' },
                    { label: 'User-centered design', color: 'bg-secondary-500' },
                    { label: 'Continuous learning', color: 'bg-accent-500' },
                    { label: 'Team collaboration', color: 'bg-primary-500' }
                  ].map((value, index) => (
                    <motion.div 
                      key={value.label}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 group"
                    >
                      <div className={`w-3 h-3 ${value.color} rounded-full group-hover:scale-125 transition-transform`} />
                      <span className="text-neutral-300 group-hover:text-white transition-colors">
                        {value.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Current Focus */}
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-primary opacity-10 rounded-2xl" />
                <div className="card-modern p-8 relative">
                  <h3 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-secondary rounded-lg flex items-center justify-center">
                      <div className="w-4 h-4 bg-white rounded-full animate-pulse" />
                    </div>
                    Current Focus
                  </h3>
                  <p className="text-neutral-300 leading-relaxed">
                    Exploring modern web technologies, cloud architecture, and AI integration to build next-generation applications that solve real-world problems.
                  </p>
                  
                  {/* Tech Stack Preview */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {['React', 'TypeScript', 'Node.js', 'GCP'].map((tech) => (
                      <span 
                        key={tech}
                        className="px-3 py-1 glass-card text-xs text-neutral-300 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}