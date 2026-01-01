'use client'

import { motion } from 'framer-motion'
import { Technology, TechCategory } from '@/types/api'
import { BinaryRain, GeometricShapes, FloatingIcons } from '@/components/ui/CoderGraphics'

interface TechnologyShowcaseProps {
  technologies: Technology[]
  categories: TechCategory[]
}

export default function TechnologyShowcase({ technologies = [], categories = [] }: TechnologyShowcaseProps) {
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
    visible: { opacity: 1, y: 0 }
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  }

  // Get technology icon/emoji based on name
  const getTechIcon = (name: string) => {
    const icons: Record<string, string> = {
      'react': '⚛️',
      'typescript': '🔷',
      'javascript': '🟨',
      'node.js': '🟢',
      'nodejs': '🟢',
      'mysql': '🐬',
      'docker': '🐳',
      'git': '📝',
      'github': '🐙',
      'express': '🚂',
      'tailwind': '🎨',
      'css': '💅',
      'html': '📄',
      'xamarin': '📱',
      'reactnative': '📱',
      'googlecloud': '☁️',
      'gcp': '☁️',
      'azuredevops': '🔵',
      'azure': '🔵',
      'jira': '📋',
      'confluence': '📚',
      'agile': '🔄',
      'csharp': '🔷',
      'c#': '🔷'
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
  const groupedTechnologies = (technologies || []).reduce((acc, tech) => {
    if (!acc[tech.category]) {
      acc[tech.category] = []
    }
    acc[tech.category].push(tech)
    return acc
  }, {} as Record<string, Technology[]>)

  return (
    <section id="technologies" className="section-padding relative overflow-hidden" aria-labelledby="technologies-heading">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <BinaryRain className="opacity-30" />
        <FloatingIcons />
        
        {/* Animated gradient orbs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-primary rounded-full blur-3xl opacity-10"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [-50, 50, -50],
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-secondary rounded-full blur-3xl opacity-15"
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
              Technologies & Skills
            </span>
            <h2 id="technologies-heading" className="text-responsive-lg font-bold text-white mb-6">
              My Technical
              <span className="block gradient-text">
                Arsenal
              </span>
            </h2>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
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
                {/* Enhanced Category Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-1 h-8 bg-gradient-to-b ${getCategoryColor(categoryName)} rounded-full`} />
                  <h3 className="text-2xl font-bold text-white capitalize">
                    {categoryName}
                  </h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-neutral-600 to-transparent" />
                  {/* Geometric shapes decoration */}
                  <GeometricShapes variant="inline" size="sm" />
                </div>

                {/* Technology Cards */}
                <motion.div
                  variants={containerVariants}
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                >
                  {categoryTechs
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
                        className="group relative card-modern p-6 transition-all duration-300 cursor-pointer overflow-hidden"
                      >
                        {/* Technology Icon */}
                        <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                          {tech.logoUrl ? (
                            <img 
                              src={tech.logoUrl} 
                              alt={`${tech.name} logo`}
                              className="w-8 h-8 object-contain"
                              loading="lazy"
                            />
                          ) : (
                            <span>{getTechIcon(tech.name)}</span>
                          )}
                        </div>

                        {/* Technology Name */}
                        <h4 className="font-semibold text-white mb-3 text-sm relative z-10">
                          {tech.name}
                        </h4>

                        {/* Code symbol decoration */}
                        <div className="absolute top-2 right-2 text-primary-400/20 font-mono text-sm">
                          {categoryName === 'frontend' && '</>'}
                          {categoryName === 'backend' && '{ }'}
                          {categoryName === 'database' && '[ ]'}
                          {categoryName === 'devops' && '( )'}
                          {!['frontend', 'backend', 'database', 'devops'].includes(categoryName) && '=>'}
                        </div>

                        {/* Enhanced Hover Effect Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </motion.div>
                    ))}
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Enhanced Summary Stats */}
          <motion.div
            variants={itemVariants}
            className="mt-20 grid grid-cols-2 md:grid-cols-2 gap-6"
          >
            <div className="text-center card-modern p-6 relative overflow-hidden">
              <div className="absolute top-2 right-2 text-primary-400/20 font-mono text-xs">
                ++
              </div>
              <div className="text-3xl font-bold gradient-text mb-2 relative z-10">
                {technologies.length}
              </div>
              <div className="text-sm text-neutral-400 relative z-10">
                Technologies
              </div>
            </div>
            
            <div className="text-center card-modern p-6 relative overflow-hidden">
              <div className="absolute top-2 right-2 text-secondary-400/20 font-mono text-xs">
                { }
              </div>
              <div className="text-3xl font-bold gradient-text mb-2 relative z-10">
                {Object.keys(groupedTechnologies).length}
              </div>
              <div className="text-sm text-neutral-400 relative z-10">
                Categories
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}