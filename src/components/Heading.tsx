import React from 'react'

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

interface HeadingProps {
  level: HeadingLevel
  children: React.ReactNode
  className?: string
  id?: string
}

// Type scale from style.md §3. Hero/display text uses the .text-display class directly.
const defaultClasses: Record<HeadingLevel, string> = {
  h1: 'text-section text-ink',
  h2: 'text-subsection text-ink',
  h3: 'text-xl md:text-2xl font-semibold leading-snug tracking-tight text-ink',
  h4: 'text-lg md:text-xl font-semibold leading-snug text-ink',
  h5: 'text-base md:text-lg font-semibold leading-snug text-ink',
  h6: 'eyebrow',
}

const Heading = ({ level = 'h1', children, className = '', id }: HeadingProps) => {
  const Tag = level
  return (
    <Tag id={id} className={`${defaultClasses[level]} ${className}`.trim()}>
      {children}
    </Tag>
  )
}

export default Heading
