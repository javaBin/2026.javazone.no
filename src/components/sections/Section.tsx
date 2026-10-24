import React from 'react'

import Container from '@/components/layout/Container'

interface SectionProps {
  children: React.ReactNode
  /** Draws a hairline rule above the section, aligned to the container. */
  rule?: boolean
  /** Use the soft surface colour for intentional grouping (style.md §6) — not as a default. */
  surface?: boolean
  className?: string
  id?: string
  'aria-labelledby'?: string
}

// Page section with the standard vertical rhythm (style.md §4): 64–88px mobile, 96–144px desktop.
const Section = ({ children, rule = false, surface = false, className = '', ...rest }: SectionProps) => {
  return (
    <section className={`${surface ? 'bg-surface' : ''} ${className}`.trim()} {...rest}>
      <Container>
        <div className={`py-16 md:py-20 lg:py-28 ${rule ? 'border-t border-line' : ''}`.trim()}>{children}</div>
      </Container>
    </section>
  )
}

export default Section
