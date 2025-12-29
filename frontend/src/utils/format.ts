/**
 * Format a proficiency percentage to a readable string
 */
export function formatProficiency(proficiency: number): string {
  if (proficiency >= 90) return 'Expert'
  if (proficiency >= 80) return 'Advanced'
  if (proficiency >= 70) return 'Proficient'
  if (proficiency >= 60) return 'Intermediate'
  return 'Beginner'
}

/**
 * Get proficiency color class for Tailwind
 */
export function getProficiencyColor(proficiency: number): string {
  if (proficiency >= 90) return 'text-green-600'
  if (proficiency >= 80) return 'text-blue-600'
  if (proficiency >= 70) return 'text-yellow-600'
  if (proficiency >= 60) return 'text-orange-600'
  return 'text-red-600'
}

/**
 * Get proficiency background color class for progress bars
 */
export function getProficiencyBgColor(proficiency: number): string {
  if (proficiency >= 90) return 'bg-green-500'
  if (proficiency >= 80) return 'bg-blue-500'
  if (proficiency >= 70) return 'bg-yellow-500'
  if (proficiency >= 60) return 'bg-orange-500'
  return 'bg-red-500'
}

/**
 * Truncate text to a specified length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

/**
 * Convert a string to title case
 */
export function toTitleCase(str: string): string {
  return str.replace(/\w\S*/g, (txt) => 
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  )
}

/**
 * Generate initials from a name
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .substring(0, 2)
}

/**
 * Format a list of technologies as a readable string
 */
export function formatTechnologies(technologies: string[]): string {
  if (technologies.length === 0) return ''
  if (technologies.length === 1) return technologies[0]
  if (technologies.length === 2) return technologies.join(' and ')
  
  const lastTech = technologies[technologies.length - 1]
  const otherTechs = technologies.slice(0, -1)
  return `${otherTechs.join(', ')}, and ${lastTech}`
}