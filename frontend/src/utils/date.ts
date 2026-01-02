/**
 * Format a date string to a readable format
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

/**
 * Format a date string to month/year format
 */
export function formatMonthYear(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short'
  })
}

/**
 * Calculate duration between two dates
 */
export function calculateDuration(startDate: string, endDate?: string): string {
  const start = new Date(startDate)
  const end = endDate ? new Date(endDate) : new Date()
  
  const diffTime = Math.abs(end.getTime() - start.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  const years = Math.floor(diffDays / 365)
  const months = Math.floor((diffDays % 365) / 30)
  
  if (years > 0 && months > 0) {
    return `${years} yr${years > 1 ? 's' : ''} ${months} mo${months > 1 ? 's' : ''}`
  } else if (years > 0) {
    return `${years} yr${years > 1 ? 's' : ''}`
  } else if (months > 0) {
    return `${months} mo${months > 1 ? 's' : ''}`
  } else {
    return 'Less than 1 month'
  }
}

/**
 * Check if a date is in the future
 */
export function isFutureDate(dateString: string): boolean {
  return new Date(dateString) > new Date()
}

/**
 * Check if a certification is active (not expired)
 */
export function isCertificationActive(expiryDate?: string): boolean {
  if (!expiryDate) return true // No expiry date means it doesn't expire
  return new Date(expiryDate) > new Date()
}