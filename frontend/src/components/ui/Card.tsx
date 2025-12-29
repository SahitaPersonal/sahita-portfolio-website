'use client'

import { ReactNode, forwardRef } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/utils/cn'

interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode
  variant?: 'default' | 'glass' | 'gradient' | 'outline'
  hover?: boolean
  className?: string
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant = 'default', hover = true, className, ...props }, ref) => {
    const baseClasses = 'rounded-xl transition-all duration-300'
    
    const variantClasses = {
      default: 'bg-white/5 border border-white/10 backdrop-blur-sm',
      glass: 'card-glass',
      gradient: 'bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-md',
      outline: 'border-2 border-white/20 bg-transparent backdrop-blur-sm'
    }

    const hoverClasses = hover 
      ? 'hover:shadow-card-hover hover:scale-[1.02] hover:border-white/30' 
      : ''

    return (
      <motion.div
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          hoverClasses,
          className
        )}
        whileHover={hover ? { y: -2 } : undefined}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

Card.displayName = 'Card'

export default Card