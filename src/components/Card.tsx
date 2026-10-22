import React from 'react'

import { Heading } from '@/components'

interface CardProps {
  title: string
  subtitle?: React.ReactNode
  children: React.ReactNode
  className?: string
}

// A titled block separated by a hairline rule rather than a filled box (style.md §6).
const Card = ({ title, subtitle, children, className = '' }: CardProps) => {
  return (
    <article className={`border-t border-line pt-6 pb-2 ${className}`.trim()}>
      {title.length === 0 ? null : <Heading level="h3">{title}</Heading>}
      {subtitle ? <p className="mt-1 text-base font-medium text-muted">{subtitle}</p> : null}
      <div className="mt-3 space-y-2 text-base md:text-lg">{children}</div>
    </article>
  )
}

export default Card
