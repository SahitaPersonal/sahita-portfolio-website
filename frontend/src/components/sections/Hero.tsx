'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { PersonalInfo } from '@/types/api'
import { ArrowDownIcon, DownloadIcon, EyeIcon } from 'lucide-react'
import { CodeBlock, TerminalWindow, GeometricShapes, FloatingIcons } from '@/components/ui/CoderGraphics'

interface HeroProps {
  personalInfo: PersonalInfo
}

export default function Hero({ personalInfo }: HeroProps) {
  const handleViewWork = () => {
    const element = document.querySelector('#achievements')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleDownloadResume = () => {
    // Download resume from local file
    const resumeUrl = '/files/resume.pdf'
    window.open(resumeUrl, '_blank')
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Icons Background */}
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
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-primary rounded-full blur-3xl opacity-20"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-secondary rounded-full blur-3xl opacity-15"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            x: [-20, 20, -20],
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-accent rounded-full blur-4xl opacity-10"
        />
        
        {/* Circuit board pattern overlay */}
        <div className="absolute inset-0 circuit-pattern opacity-5" />
      </div>
      
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Enhanced Profile Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left space-y-8"
          >
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 glass-card text-primary-300 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Available for opportunities
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-4"
            >
              <h1 className="text-responsive-xl font-bold text-white leading-tight">
                Hi, I'm{' '}
                <span className="gradient-text">
                  {personalInfo.name}
                </span>
              </h1>
              <h2 className="text-responsive-lg text-neutral-300 font-medium">
                {personalInfo.title}
              </h2>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="text-lg text-neutral-400 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {personalInfo.tagline || `${personalInfo.yearsExperience}+ years of experience crafting exceptional digital experiences with modern technologies and scalable architectures.`}
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button 
                onClick={handleViewWork}
                className="group btn-modern flex items-center gap-2 justify-center"
              >
                <EyeIcon className="w-5 h-5" />
                View My Work
                <ArrowDownIcon className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </button>
              <button 
                onClick={handleDownloadResume}
                className="glass-button px-8 py-4 text-white rounded-xl font-semibold flex items-center gap-2 justify-center"
              >
                <DownloadIcon className="w-5 h-5" />
                Download Resume
              </button>
            </motion.div>

            {/* Enhanced Experience Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0"
            >
              <div className="glass-card p-4 text-center lg:text-left rounded-2xl">
                <div className="text-3xl font-bold gradient-text">{personalInfo.yearsExperience}+</div>
                <div className="text-sm text-neutral-400 mt-1">Years Experience</div>
              </div>
              <div className="glass-card p-4 text-center lg:text-left rounded-2xl">
                <div className="text-3xl font-bold gradient-text">10+</div>
                <div className="text-sm text-neutral-400 mt-1">Projects</div>
              </div>
              <div className="glass-card p-4 text-center lg:text-left rounded-2xl">
                <div className="text-3xl font-bold gradient-text">15+</div>
                <div className="text-sm text-neutral-400 mt-1">Technologies</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Enhanced Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="flex justify-center lg:justify-end relative"
          >
            {/* Code Block Background - More prominent */}
            <div className="absolute -top-32 -left-32 hidden lg:block z-0">
              <CodeBlock className="w-72 opacity-95 drop-shadow-2xl" />
            </div>
            
            {/* Terminal Window - More prominent */}
            <div className="absolute -bottom-24 -right-24 hidden lg:block z-0">
              <TerminalWindow className="w-64 opacity-95 drop-shadow-2xl" />
            </div>
            
            <div className="relative z-10">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-primary rounded-full blur-3xl opacity-30 scale-110 animate-pulse-slow" />
              
              {/* Main image container - Original size with reduced opacity */}
              <div className="relative w-80 h-80 lg:w-96 lg:h-96 opacity-75">
                <div className="card-modern w-full h-full rounded-full overflow-hidden p-2 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm border-2 border-white/20">
                  <div className="w-full h-full rounded-full overflow-hidden bg-gradient-dark shadow-2xl">
                    {personalInfo.profileImageUrl ? (
                      <Image
                        src={personalInfo.profileImageUrl}
                        alt={personalInfo.name}
                        fill
                        className="object-cover"
                        priority
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-primary flex items-center justify-center">
                        <span className="text-6xl font-bold text-white">
                          {personalInfo.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Enhanced Floating Elements with Coder Theme */}
              <motion.div
                animate={{ 
                  y: [-10, 10, -10],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute -top-6 -right-6 w-20 h-20 glass-card rounded-2xl flex items-center justify-center"
              >
                <span className="text-secondary-300 font-mono text-lg">&lt;/&gt;</span>
              </motion.div>
              
              <motion.div
                animate={{ 
                  y: [10, -10, 10],
                  rotate: [360, 180, 0]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute -bottom-6 -left-6 w-16 h-16 glass-card rounded-xl flex items-center justify-center"
              >
                <span className="text-accent-300 font-mono text-sm">{ }</span>
              </motion.div>
              
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 90, 180, 270, 360]
                }}
                transition={{ 
                  duration: 10, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="absolute top-1/2 -right-8 w-12 h-12 glass-card rounded-lg flex items-center justify-center"
              >
                <span className="text-primary-300 font-mono text-xs">=&gt;</span>
              </motion.div>
              
              {/* Geometric Shapes */}
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                <GeometricShapes variant="floating" size="sm" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="glass-card w-8 h-12 rounded-full flex justify-center items-start pt-2"
        >
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="w-1 h-3 bg-gradient-primary rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}