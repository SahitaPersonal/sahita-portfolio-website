'use client'

import { motion } from 'framer-motion'

interface CoderGraphicsProps {
  variant?: 'floating' | 'background' | 'inline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function CodeBlock({ className = '' }: { className?: string }) {
  const codeLines = [
    'const developer = {',
    '  name: "Sahita",',
    '  skills: ["React", "Node.js"],',
    '  passion: "Building amazing apps",',
    '  status: "Available for hire"',
    '};'
  ]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`glass-card p-6 font-mono text-sm ${className}`}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="flex gap-1">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <div className="w-3 h-3 bg-yellow-500 rounded-full" />
          <div className="w-3 h-3 bg-green-500 rounded-full" />
        </div>
        <span className="text-neutral-400 text-xs">developer.js</span>
      </div>
      <div className="space-y-1">
        {codeLines.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.2 }}
            className="flex items-center gap-3"
          >
            <span className="text-neutral-500 text-xs w-4 text-right">
              {index + 1}
            </span>
            <span className="text-neutral-300">
              {line}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export function TerminalWindow({ className = '' }: { className?: string }) {
  const commands = [
    { command: '$ npm install awesome-portfolio', status: 'success' },
    { command: '$ git commit -m "Added new features"', status: 'success' },
    { command: '$ npm run build', status: 'loading' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`glass-card p-6 font-mono text-sm bg-neutral-900/80 ${className}`}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="flex gap-1">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <div className="w-3 h-3 bg-yellow-500 rounded-full" />
          <div className="w-3 h-3 bg-green-500 rounded-full" />
        </div>
        <span className="text-neutral-400 text-xs">terminal</span>
      </div>
      <div className="space-y-2">
        {commands.map((cmd, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.3 + 0.5 }}
            className="flex items-center gap-2"
          >
            <span className="text-green-400">{cmd.command}</span>
            {cmd.status === 'loading' && (
              <motion.div
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-2 h-4 bg-green-400"
              />
            )}
            {cmd.status === 'success' && (
              <span className="text-green-400">✓</span>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export function GeometricShapes({ variant = 'floating', size = 'md', className = '' }: CoderGraphicsProps) {
  const shapes = [
    { type: 'square', color: 'bg-primary-500', delay: 0 },
    { type: 'circle', color: 'bg-secondary-500', delay: 0.2 },
    { type: 'triangle', color: 'bg-accent-500', delay: 0.4 },
    { type: 'hexagon', color: 'bg-primary-400', delay: 0.6 },
  ]

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }

  return (
    <div className={`flex gap-4 ${className}`}>
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{ 
            opacity: 0.7, 
            scale: 1, 
            rotate: variant === 'floating' ? [0, 180, 360] : 0 
          }}
          transition={{ 
            delay: shape.delay,
            duration: variant === 'floating' ? 10 : 0.5,
            repeat: variant === 'floating' ? Infinity : 0,
            ease: 'linear'
          }}
          className={`${sizeClasses[size]} ${shape.color} ${
            shape.type === 'circle' ? 'rounded-full' : 
            shape.type === 'triangle' ? 'clip-path-triangle' : 
            shape.type === 'hexagon' ? 'clip-path-hexagon' : 
            'rounded-lg'
          } opacity-70`}
        />
      ))}
    </div>
  )
}

export function BinaryRain({ className = '' }: { className?: string }) {
  const binaryChars = ['0', '1']
  const columns = 20
  
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {Array.from({ length: columns }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-0 font-mono text-green-400/20 text-xs"
          style={{ left: `${(i / columns) * 100}%` }}
          animate={{
            y: ['0vh', '100vh'],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'linear'
          }}
        >
          {Array.from({ length: 20 }).map((_, j) => (
            <div key={j} className="mb-2">
              {binaryChars[Math.floor(Math.random() * 2)]}
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  )
}

export function CodeStructure({ className = '' }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={`relative ${className}`}
    >
      {/* Main container representing a component */}
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="glass-card p-6 border-2 border-primary-500/30"
      >
        <div className="text-primary-300 text-sm font-mono mb-4">
          &lt;Portfolio /&gt;
        </div>
        
        {/* Nested components */}
        <div className="space-y-3 ml-4">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-3 border border-secondary-500/30"
          >
            <span className="text-secondary-300 text-xs font-mono">
              &lt;Hero /&gt;
            </span>
          </motion.div>
          
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="glass-card p-3 border border-accent-500/30"
          >
            <span className="text-accent-300 text-xs font-mono">
              &lt;About /&gt;
            </span>
          </motion.div>
          
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="glass-card p-3 border border-primary-400/30"
          >
            <span className="text-primary-300 text-xs font-mono">
              &lt;Projects /&gt;
            </span>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Connection lines */}
      <svg className="absolute inset-0 pointer-events-none" width="100%" height="100%">
        <motion.path
          d="M 20 60 Q 40 80 60 100"
          stroke="rgba(59, 130, 246, 0.3)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
        />
        <motion.path
          d="M 20 100 Q 40 120 60 140"
          stroke="rgba(217, 70, 239, 0.3)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 1.2 }}
        />
      </svg>
    </motion.div>
  )
}

export function FloatingIcons({ className = '' }: { className?: string }) {
  const icons = [
    { symbol: '{ }', color: 'text-primary-400', delay: 0 },
    { symbol: '</>', color: 'text-secondary-400', delay: 0.5 },
    { symbol: '( )', color: 'text-accent-400', delay: 1 },
    { symbol: '[ ]', color: 'text-primary-300', delay: 1.5 },
    { symbol: '=>', color: 'text-secondary-300', delay: 2 },
  ]

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {icons.map((icon, index) => (
        <motion.div
          key={index}
          className={`absolute font-mono text-2xl ${icon.color} opacity-30`}
          style={{
            left: `${20 + (index * 15)}%`,
            top: `${30 + (index * 10)}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            rotate: [-5, 5, -5],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4 + index,
            repeat: Infinity,
            delay: icon.delay,
            ease: 'easeInOut'
          }}
        >
          {icon.symbol}
        </motion.div>
      ))}
    </div>
  )
}

export default function CoderGraphics({ variant = 'floating', size = 'md', className = '' }: CoderGraphicsProps) {
  if (variant === 'background') {
    return (
      <div className={`absolute inset-0 ${className}`}>
        <BinaryRain />
        <FloatingIcons />
      </div>
    )
  }

  if (variant === 'inline') {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <GeometricShapes variant="inline" size={size} />
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <GeometricShapes variant={variant} size={size} />
    </div>
  )
}