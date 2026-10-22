import React from 'react'

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

// Centered page container: max 1280px with the responsive outer gutters from style.md §4.
const Container = ({ children, className = '' }: ContainerProps) => {
  return <div className={`page-container ${className}`.trim()}>{children}</div>
}

export default Container
