'use client'

import { motion } from 'framer-motion'
import { Education } from '@/types/api'
import { formatDate } from '@/utils/date'

interface AcademicProps {
  education: Education[]
}

export default function Academic({ education = [] }: AcademicProps) {
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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  }

  // Sort education by start date (most recent first)
  const sortedEducation = [...education].sort((a, b) => {
    const dateA = new Date(a.startDate).getTime()
    const dateB = new Date(b.startDate).getTime()
    return dateB - dateA
  })

  const getDegreeIcon = (degree: string) => {
    const degreeType = degree.toLowerCase()
    if (degreeType.includes('phd') || degreeType.includes('doctorate')) return '🎓'
    if (degreeType.includes('master') || degreeType.includes('msc') || degreeType.includes('mba')) return '📚'
    if (degreeType.includes('bachelor') || degreeType.includes('bsc') || degreeType.includes('ba')) return '🎓'
    if (degreeType.includes('diploma') || degreeType.includes('certificate')) return '📜'
    return '🎓' // default
  }

  const getDegreeLevel = (degree: string) => {
    const degreeType = degree.toLowerCase()
    if (degreeType.includes('phd') || degreeType.includes('doctorate')) return 'Doctorate'
    if (degreeType.includes('master') || degreeType.includes('msc') || degreeType.includes('mba')) return 'Master\'s'
    if (degreeType.includes('bachelor') || degreeType.includes('bsc') || degreeType.includes('ba')) return 'Bachelor\'s'
    if (degreeType.includes('diploma')) return 'Diploma'
    if (degreeType.includes('certificate')) return 'Certificate'
    return 'Degree'
  }

  const getDegreeColor = (degree: string) => {
    const degreeType = degree.toLowerCase()
    if (degreeType.includes('phd') || degreeType.includes('doctorate')) return 'from-purple-500 to-indigo-600'
    if (degreeType.includes('master') || degreeType.includes('msc') || degreeType.includes('mba')) return 'from-blue-500 to-cyan-600'
    if (degreeType.includes('bachelor') || degreeType.includes('bsc') || degreeType.includes('ba')) return 'from-green-500 to-emerald-600'
    if (degreeType.includes('diploma')) return 'from-orange-500 to-red-600'
    if (degreeType.includes('certificate')) return 'from-pink-500 to-rose-600'
    return 'from-gray-500 to-slate-600'
  }

  const getYearsDuration = (startDate: string, endDate?: string) => {
    const start = new Date(startDate)
    const end = endDate ? new Date(endDate) : new Date()
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365))
  }

  return (
    <section className="py-20 bg-neutral-900">
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
            <span className="inline-block px-4 py-2 bg-green-900/30 text-green-400 rounded-full text-sm font-medium mb-4">
              Academic Background
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Educational
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-600">
                Foundation
              </span>
            </h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
              The academic journey that laid the groundwork for my technical expertise and professional development.
            </p>
          </motion.div>

          {/* Education Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {sortedEducation.map((edu) => (
              <motion.div
                key={edu.id}
                variants={cardVariants}
                transition={{ duration: 0.5, ease: "easeOut" }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative bg-gradient-to-br from-neutral-800 to-neutral-700 rounded-2xl p-8 shadow-card hover:shadow-card-hover border border-neutral-600 transition-all duration-300"
              >
                {/* Degree Level Badge */}
                <div className="absolute top-6 right-6">
                  <span className={`px-3 py-1 bg-gradient-to-r ${getDegreeColor(edu.degree)} text-white text-xs font-medium rounded-full shadow-sm`}>
                    {getDegreeLevel(edu.degree)}
                  </span>
                </div>

                {/* Institution Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${getDegreeColor(edu.degree)} rounded-xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {getDegreeIcon(edu.degree)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {edu.institution}
                    </h3>
                    <div className="text-sm text-neutral-400">
                      {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Present'}
                    </div>
                  </div>
                </div>

                {/* Degree Information */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">
                      {edu.degree}
                    </h4>
                    {edu.fieldOfStudy && (
                      <p className="text-neutral-300 font-medium">
                        {edu.fieldOfStudy}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  {edu.description && (
                    <p className="text-neutral-300 text-sm leading-relaxed">
                      {edu.description}
                    </p>
                  )}

                  {/* GPA */}
                  {edu.gpa && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-neutral-300">
                        GPA:
                      </span>
                      <span className="text-sm font-bold text-primary-400">
                        {edu.gpa}
                      </span>
                    </div>
                  )}

                  {/* Duration */}
                  <div className="flex items-center gap-2 text-sm text-neutral-400">
                    <span>📅</span>
                    <span>{getYearsDuration(edu.startDate, edu.endDate)} year{getYearsDuration(edu.startDate, edu.endDate) !== 1 ? 's' : ''}</span>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>

          {/* Academic Achievements Summary */}
          <motion.div
            variants={itemVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-gradient-to-br from-blue-900/20 to-green-900/20 rounded-2xl p-8 border border-blue-800"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Academic Highlights
              </h3>
              <p className="text-neutral-300 max-w-2xl mx-auto">
                Key academic achievements and qualifications that contribute to my professional expertise.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {education.length}
                </div>
                <div className="text-sm text-neutral-400">
                  Qualifications
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">
                  {new Set(education.map(edu => edu.institution)).size}
                </div>
                <div className="text-sm text-neutral-400">
                  Institutions
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  {education.reduce((total, edu) => total + getYearsDuration(edu.startDate, edu.endDate), 0)}
                </div>
                <div className="text-sm text-neutral-400">
                  Years Studied
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400 mb-2">
                  {education.filter(edu => edu.gpa).length > 0 ? 
                    (education.filter(edu => edu.gpa).reduce((sum, edu) => sum + parseFloat(edu.gpa!), 0) / education.filter(edu => edu.gpa).length).toFixed(1) 
                    : 'N/A'}
                </div>
                <div className="text-sm text-neutral-400">
                  Avg GPA
                </div>
              </div>
            </div>
          </motion.div>

          {/* Skills Developed */}
          <motion.div
            variants={itemVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-12 text-center"
          >
            <h3 className="text-xl font-bold text-white mb-6">
              Core Skills Developed
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'Problem Solving',
                'Analytical Thinking',
                'Research Methods',
                'Technical Writing',
                'Project Management',
                'Team Collaboration',
                'Critical Analysis',
                'Innovation',
                'Leadership',
                'Communication'
              ].map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="px-4 py-2 bg-neutral-800 text-neutral-300 rounded-full border border-neutral-600 text-sm font-medium hover:shadow-md transition-shadow duration-200"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}