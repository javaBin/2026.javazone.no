import React, { useEffect, useRef, useState } from 'react'

import { Heading } from '@/components'
import statusData from '@/data/statusData.json'

interface Talk {
  id: string
  room: string
  title: string
  speakers: string[]
  startTime: string
  endTime: string
  track: string
}

const TalkCard = ({ talk, dim = false }: { talk: Talk; dim?: boolean }) => {
  const ref = useRef<HTMLElement | null>(null)

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--glow-x', `${e.clientX - rect.left}px`)
    el.style.setProperty('--glow-y', `${e.clientY - rect.top}px`)
    el.style.setProperty('--glow-opacity', '1')
  }

  const onLeave = () => ref.current?.style.setProperty('--glow-opacity', '0')

  return (
    <article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`glow-card shadow-xl p-4 rounded-3xl bg-base-200 flex flex-col gap-2 transition-opacity ${dim ? 'opacity-50' : ''}`}
    >
      <div className="flex items-start justify-between gap-2 flex-wrap">
        <span className="text-xs font-bold text-tertiary uppercase tracking-widest">{talk.room}</span>
        <span className="badge badge-outline text-xs shrink-0">{talk.track}</span>
      </div>
      <p className="text-secondary text-sm font-semibold leading-snug line-clamp-2 flex-1 m-0 text-left">{talk.title}</p>
      <p className="text-tertiary text-sm m-0 text-left">{talk.speakers.join(', ')}</p>
      <p className="text-tertiary text-xs font-mono mt-auto m-0 text-left">
        {talk.startTime} – {talk.endTime}
      </p>
    </article>
  )
}

const StatusPage = () => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const hh = String(time.getHours()).padStart(2, '0')
  const mm = String(time.getMinutes()).padStart(2, '0')
  const ss = String(time.getSeconds()).padStart(2, '0')

  const { banner, currentTalks, upcomingTalks } = statusData

  return (
    <div className="h-screen flex flex-col overflow-hidden px-8 py-6 gap-5 z-10 relative">
      {/* Top bar */}
      <header className="flex items-center justify-between shrink-0">
        <Heading level="h2">JavaZone 2026</Heading>
        <div className="font-mono text-5xl font-bold tabular-nums text-primary leading-none">
          {hh}:{mm}
          <span className="text-tertiary">:{ss}</span>
        </div>
      </header>

      {/* Banner */}
      {banner.active && banner.message && (
        <div className="shrink-0 rounded-2xl px-6 py-3 bg-base-100 border border-accent-primary/30">
          <p className="text-center text-accent-primary font-semibold m-0">{banner.message}</p>
        </div>
      )}

      {/* Now on stage */}
      <section className="flex flex-col gap-3 flex-1 min-h-0">
        <div className="flex items-center gap-3 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-accent-secondary animate-pulse shrink-0" />
          <Heading level="h3">Now on stage</Heading>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
            {currentTalks.map((talk) => (
              <TalkCard key={talk.id} talk={talk} />
            ))}
          </div>
        </div>
      </section>

      {/* Up next */}
      <section className="flex flex-col gap-3 flex-1 min-h-0">
        <Heading level="h4">Up next</Heading>
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
            {upcomingTalks.map((talk) => (
              <TalkCard key={talk.id} talk={talk} dim />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default StatusPage
