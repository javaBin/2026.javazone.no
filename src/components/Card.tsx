// glow effect inspired by https://github.com/justalever/tailwind-mouse-glow/tree/main
import React, { useRef } from 'react'

import { Heading } from '@/components'

interface CardProps {
  title: string
  subtitle?: React.ReactNode
  children: React.ReactNode
  glowColor?: string
  className?: string
}

const Card = ({ title, subtitle, children, glowColor = 'var(--glow-color)', className = '' }: CardProps) => {
  const ref = useRef<HTMLElement | null>(null)

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
        glow-card shadow-xl
        rounded-3xl bg-base-100 border border-base-300
        p-6 my-8
        ${className}
      `.trim()}
    >
      <div className="flex flex-col justify-center w-full md:px-4">
        {title.length === 0 ? null : <Heading level="h3">{title}</Heading>}
        {subtitle ? <p className="mt-2 font-semibold text-tertiary md:text-lg">{subtitle}</p> : null}
        {children}
      </div>
    </article>
  )
}

export default Card
