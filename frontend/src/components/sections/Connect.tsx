'use client'

import { motion } from 'framer-motion'
import { LinkedinIcon, MessageCircleIcon, MailIcon, ArrowRightIcon } from 'lucide-react'

interface ConnectProps {
  linkedinUrl?: string
  email?: string
}

export default function Connect({ linkedinUrl, email }: ConnectProps) {
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

  const handleLinkedInConnect = () => {
    if (linkedinUrl) {
      window.open(linkedinUrl, '_blank', 'noopener,noreferrer')
    }
  }

  const handleEmailContact = () => {
    if (email) {
      window.open(`mailto:${email}`, '_self')
    }
  }

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-secondary-400/20 rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-accent-400/15 rounded-full blur-lg" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="mb-12">
            <span className="inline-block px-4 py-2 bg-white/20 text-white/90 rounded-full text-sm font-medium mb-6">
              Let's Connect
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Build Something
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                Amazing Together?
              </span>
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              I'm always excited to connect with fellow developers, potential collaborators, and innovative companies. 
              Let's discuss how we can create exceptional digital experiences together.
            </p>
          </motion.div>

          {/* Connection Options */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              {/* Primary LinkedIn Button */}
              <button
                onClick={handleLinkedInConnect}
                className="group flex items-center gap-4 px-8 py-4 bg-white text-primary-700 rounded-xl font-semibold text-lg hover:bg-white/95 hover:scale-105 transition-all duration-300 shadow-2xl"
              >
                <LinkedinIcon className="w-6 h-6 text-blue-600" />
                Connect on LinkedIn
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>

              {/* Secondary Email Button */}
              <button
                onClick={handleEmailContact}
                className="group flex items-center gap-4 px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              >
                <MailIcon className="w-6 h-6" />
                Send Email
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </motion.div>

          {/* Value Proposition */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageCircleIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Open to Opportunities
              </h3>
              <p className="text-white/80">
                Always interested in discussing new projects, collaborations, and career opportunities.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Quick Response
              </h3>
              <p className="text-white/80">
                I typically respond to messages within 24 hours and love discussing technical challenges.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Collaborative Spirit
              </h3>
              <p className="text-white/80">
                Passionate about knowledge sharing, mentoring, and building great teams.
              </p>
            </div>
          </motion.div>

          {/* Call to Action Text */}
          <motion.div variants={itemVariants} className="text-center">
            <p className="text-lg text-white/90 mb-4">
              Whether you're looking for a skilled developer, want to discuss a project, or just connect with a fellow tech enthusiast...
            </p>
            <p className="text-2xl font-semibold text-white">
              I'd love to hear from you! 🚀
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}