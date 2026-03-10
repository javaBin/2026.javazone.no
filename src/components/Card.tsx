// glow effect inspired by https://github.com/justalever/tailwind-mouse-glow/tree/main
import React, { useRef } from 'react'

import { Heading } from '@/components'

interface CardProps {
  title: string
  subtitle?: React.ReactNode
  children: React.ReactNode
  glowColor?: string
  gradientColors?: [string, string]
  className?: string
}

const Card = ({
  title,
  subtitle,
  children,
  glowColor = 'var(--glow-color)',
  gradientColors = ['rgb(10,56,90)', 'rgb(7,49,81)'],
  className = '',
}: CardProps) => {
  const ref = useRef<HTMLElement | null>(null)
  const gradient = gradientColors && gradientColors.length > 0 ? `linear-gradient(to bottom, ${gradientColors.join(', ')})` : undefined

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!glowColor) return
    const el = ref.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    el.style.setProperty('--glow-x', `${e.clientX - rect.left}px`)
    el.style.setProperty('--glow-y', `${e.clientY - rect.top}px`)
    el.style.setProperty('--glow-opacity', '1')
    el.style.setProperty('--glow-color', glowColor)
  }

  const onLeave = () => {
    if (!glowColor) return
    ref.current?.style.setProperty('--glow-opacity', '0')
  }

  return (
    <article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`
        glow-card shadow-xl p-6 my-8 rounded-3xl
        bg-base-200
        ${className}
      `.trim()}
      style={gradient ? { backgroundImage: gradient } : undefined}
    >
      <div className="flex flex-col justify-center w-full md:px-4 text-base md:text-lg">
        {title.length === 0 ? null : <Heading level="h3">{title}</Heading>}
        {subtitle ? (
          <Heading level="h4" className="mt-2">
            {subtitle}
          </Heading>
        ) : null}
        <div className="mt-4 space-y-2">{children}</div>
      </div>
    </article>
  )
}

export default Card
