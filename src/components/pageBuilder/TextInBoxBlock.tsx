import { PortableText } from '@portabletext/react'
import { useRef } from 'react'

import type { TextInBoxBlockData } from '@/sanity/types'

import { portableTextComponents } from './portableTextComponents'

const bgClasses: Record<string, string> = {
  primary: 'bg-primary/10 border-primary/30',
  secondary: 'bg-secondary/10 border-secondary/30',
  accent: 'bg-accent/10 border-accent/30',
  neutral: 'bg-base-200 border-base-300',
}

export function TextInBoxBlock({ content, backgroundColor = 'neutral' }: TextInBoxBlockData) {
  const ref = useRef<HTMLDivElement>(null)

  if (!content?.length) return null

  const boxClasses = bgClasses[backgroundColor] ?? bgClasses.neutral

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--glow-x', `${e.clientX - rect.left}px`)
    el.style.setProperty('--glow-y', `${e.clientY - rect.top}px`)
    el.style.setProperty('--glow-opacity', '1')
  }

  const onLeave = () => {
    ref.current?.style.setProperty('--glow-opacity', '0')
  }

  return (
    <section className="px-6 py-12 max-w-3xl mx-auto w-full">
      <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={`glow-card rounded-2xl border p-8 ${boxClasses}`}>
        <PortableText value={content} components={portableTextComponents} />
      </div>
    </section>
  )
}
