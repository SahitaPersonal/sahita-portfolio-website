'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeftIcon, ChevronRightIcon, ExternalLinkIcon } from 'lucide-react'
import { Recommendation } from '@/types/api'

interface RecommendationsProps {
  recommendations: Recommendation[]
}

export default function Recommendations({ recommendations = [] }: RecommendationsProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 3
  const totalPages = Math.ceil(recommendations.length / itemsPerPage)

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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1
    }
  }

  // Get current page recommendations
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentRecommendations = recommendations.slice(startIndex, startIndex + itemsPerPage)

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    })
  }

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  // Handle pagination
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  if (!recommendations || recommendations.length === 0) {
    return null
  }

  return (
    <section id="recommendations" className="py-20 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900" aria-labelledby="recommendations-heading">
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
            <span className="inline-block px-4 py-2 bg-primary-500/20 text-primary-300 rounded-full text-sm font-medium mb-4">
              Professional Network
            </span>
            <h2 id="recommendations-heading" className="text-4xl lg:text-5xl font-bold text-white mb-6">
              What Others
              <span className="block text-transparent bg-clip-text bg-gradient-primary">
                Say About Me
              </span>
            </h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
              Testimonials and recommendations from colleagues, clients, and industry professionals I've had the pleasure to work with.
            </p>
          </motion.div>

          {/* Recommendations Grid */}
          <div
            key={`recommendations-page-${currentPage}`}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          >
            {currentRecommendations.map((recommendation, index) => (
              <motion.div
                key={`${recommendation.id}-${currentPage}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-neutral-800/50 backdrop-blur-sm rounded-xl p-6 border border-neutral-700/50 hover:border-primary-500/30 transition-all duration-300 overflow-hidden"
              >
                {/* LinkedIn Verification Badge */}
                <div className="absolute -top-2 -right-2 z-10">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-xs font-bold">in</span>
                  </div>
                </div>

                {/* Authenticity Ribbon */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                  <div className="absolute top-3 right-[-32px] w-20 h-6 bg-gradient-to-r from-green-500 to-emerald-600 transform rotate-45 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">REAL</span>
                  </div>
                </div>

                {/* Quote Icon */}
                <div className="absolute top-4 left-4 text-primary-500/30 text-2xl">
                  "
                </div>

                {/* Recommender Info */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold">
                    {getInitials(recommendation.recommenderName)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white text-sm">
                      {recommendation.recommenderName}
                    </h4>
                    {recommendation.recommenderTitle && (
                      <p className="text-xs text-neutral-400">
                        {recommendation.recommenderTitle}
                      </p>
                    )}
                    {recommendation.recommenderCompany && (
                      <p className="text-xs text-neutral-500">
                        {recommendation.recommenderCompany}
                      </p>
                    )}
                  </div>
                </div>

                {/* Relationship */}
                {recommendation.relationship && (
                  <div className="mb-4">
                    <span className="inline-block px-2 py-1 bg-secondary-500/20 text-secondary-300 rounded text-xs">
                      {recommendation.relationship}
                    </span>
                  </div>
                )}

                {/* Recommendation Text */}
                <blockquote className="text-neutral-300 text-sm leading-relaxed mb-4 line-clamp-6">
                  {recommendation.recommendationText}
                </blockquote>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-neutral-700/50">
                  <span className="text-xs text-neutral-500">
                    {formatDate(recommendation.addedDate)}
                  </span>
                  
                  {recommendation.linkedinUrl && (
                    <a
                      href={recommendation.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-primary-400 hover:text-primary-300 transition-colors"
                    >
                      <ExternalLinkIcon className="w-3 h-3" />
                      LinkedIn
                    </a>
                  )}
                </div>

                {/* Featured Badge */}
                {recommendation.isFeatured && (
                  <div className="absolute -top-2 -left-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">★</span>
                    </div>
                  </div>
                )}

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-4"
            >
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-4 py-2 bg-neutral-800 text-neutral-300 rounded-lg hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Go to previous page"
              >
                <ChevronLeftIcon className="w-4 h-4" />
                Previous
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                      page === currentPage
                        ? 'bg-primary-600 text-white'
                        : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-neutral-300'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 px-4 py-2 bg-neutral-800 text-neutral-300 rounded-lg hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Go to next page"
              >
                Next
                <ChevronRightIcon className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* Summary Stats */}
          <motion.div
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-400 mb-2">
                  {recommendations.length}
                </div>
                <div className="text-sm text-neutral-400">
                  Total Recommendations
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary-400 mb-2">
                  {recommendations.filter(r => r.isFeatured).length}
                </div>
                <div className="text-sm text-neutral-400">
                  Featured
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-400 mb-2">
                  {new Set(recommendations.map(r => r.recommenderCompany)).size}
                </div>
                <div className="text-sm text-neutral-400">
                  Companies
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">
                  {recommendations.filter(r => r.linkedinUrl).length}
                </div>
                <div className="text-sm text-neutral-400">
                  Verified
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}