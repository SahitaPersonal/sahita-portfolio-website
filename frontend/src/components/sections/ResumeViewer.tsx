'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { DownloadIcon, ExternalLinkIcon, FileTextIcon } from 'lucide-react'

interface ResumeViewerProps {
  resumeUrl?: string
  available: boolean
}

export default function ResumeViewer({ resumeUrl, available }: ResumeViewerProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

  // Handle resume download
  const handleDownload = () => {
    if (!resumeUrl || !available) return

    try {
      setIsLoading(true)
      setError(null)

      // Open in new tab which will trigger download
      window.open(resumeUrl, '_blank')
    } catch (err) {
      console.error('Download failed:', err)
      setError(err instanceof Error ? err.message : 'Download failed')
    } finally {
      setIsLoading(false)
    }
  }

  // Handle view in new tab
  const handleViewNewTab = () => {
    if (!resumeUrl || !available) return
    window.open(resumeUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <section className="py-20 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="mb-12">
            <span className="inline-block px-4 py-2 bg-primary-500/20 text-primary-300 rounded-full text-sm font-medium mb-4">
              Professional Resume
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Download My
              <span className="block text-transparent bg-clip-text bg-gradient-primary">
                Resume
              </span>
            </h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
              Get a comprehensive overview of my professional experience, skills, and achievements in a downloadable format.
            </p>
          </motion.div>

          {/* Resume Card */}
          <motion.div
            variants={itemVariants}
            className="bg-neutral-800/50 backdrop-blur-sm rounded-2xl p-8 border border-neutral-700/50 shadow-2xl"
          >
            {available && resumeUrl ? (
              <>
                {/* Resume Preview */}
                <div className="mb-8">
                  <div className="w-24 h-24 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <FileTextIcon className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Sahita - Full-Stack Engineer
                  </h3>
                  <p className="text-neutral-400 mb-6">
                    Professional resume with complete work history, skills, and achievements
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button
                    onClick={handleDownload}
                    disabled={isLoading}
                    className="flex items-center gap-3 px-8 py-4 bg-gradient-primary text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <DownloadIcon className="w-5 h-5" />
                    {isLoading ? 'Downloading...' : 'Download PDF'}
                  </button>

                  <button
                    onClick={handleViewNewTab}
                    className="flex items-center gap-3 px-8 py-4 border border-neutral-600 text-neutral-300 rounded-xl font-semibold hover:bg-neutral-700 hover:border-neutral-500 transition-all duration-300"
                  >
                    <ExternalLinkIcon className="w-5 h-5" />
                    View Resume
                  </button>
                </div>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                {/* Resume Info */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div className="p-4 bg-neutral-700/30 rounded-xl">
                    <div className="text-2xl font-bold text-primary-400 mb-1">6+</div>
                    <div className="text-sm text-neutral-400">Years Experience</div>
                  </div>
                  <div className="p-4 bg-neutral-700/30 rounded-xl">
                    <div className="text-2xl font-bold text-secondary-400 mb-1">15+</div>
                    <div className="text-sm text-neutral-400">Technologies</div>
                  </div>
                  <div className="p-4 bg-neutral-700/30 rounded-xl">
                    <div className="text-2xl font-bold text-accent-400 mb-1">50+</div>
                    <div className="text-sm text-neutral-400">Projects</div>
                  </div>
                </div>
              </>
            ) : (
              /* Resume Not Available */
              <div className="text-center">
                <div className="w-24 h-24 bg-neutral-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <FileTextIcon className="w-12 h-12 text-neutral-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Resume Currently Unavailable
                </h3>
                <p className="text-neutral-400 mb-6">
                  The resume is being updated. Please check back soon or contact me directly for the latest version.
                </p>
                <button
                  disabled
                  className="px-8 py-4 bg-neutral-700 text-neutral-500 rounded-xl font-semibold cursor-not-allowed"
                >
                  <DownloadIcon className="w-5 h-5 inline mr-2" />
                  Download Unavailable
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}