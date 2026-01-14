import '@testing-library/jest-dom'

// Set environment variables for tests
process.env.NEXT_PUBLIC_API_URL = 'http://localhost:3001'

// Mock framer-motion globally to avoid animation issues in tests
jest.mock('framer-motion', () => {
  const React = require('react')
  return {
    motion: new Proxy(
      {},
      {
        get: (target, prop) => {
          return React.forwardRef(({ children, ...props }, ref) => {
            // Filter out framer-motion specific props
            const {
              initial,
              animate,
              exit,
              transition,
              variants,
              whileHover,
              whileTap,
              whileInView,
              viewport,
              onAnimationStart,
              onAnimationComplete,
              ...domProps
            } = props
            
            return React.createElement(prop, { ...domProps, ref }, children)
          })
        },
      }
    ),
    AnimatePresence: ({ children }) => children,
    useAnimation: () => ({
      start: jest.fn(),
      stop: jest.fn(),
      set: jest.fn(),
    }),
    useInView: () => true,
  }
})