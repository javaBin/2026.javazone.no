import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { BubbleField, Heading } from '@/components'
import { fetchProgram, type Session } from '@/lib/fetchProgram'

// ── constants ─────────────────────────────────────────────────────────────────

const FORMAT_ORDER = ['lightning-talk', 'presentation', 'workshop'] as const
type KnownFormat = (typeof FORMAT_ORDER)[number]

const FORMAT_LABEL: Record<string, string> = {
  'lightning-talk': 'Lightning Talks',
  presentation: 'Presentations',
  workshop: 'Workshops',
}

const LANGUAGE_LABEL: Record<string, string> = { no: 'Norwegian', en: 'English' }

// ── helpers ───────────────────────────────────────────────────────────────────

function groupByFormat(sessions: Session[]): { format: string; label: string; sessions: Session[] }[] {
  const buckets = new Map<string, Session[]>(FORMAT_ORDER.map((f) => [f, []]))

  for (const s of sessions) {
    const key: string = (FORMAT_ORDER as readonly string[]).includes(s.format) ? s.format : 'presentation'
    buckets.get(key)!.push(s)
  }

  return FORMAT_ORDER.map((format: KnownFormat) => ({
    format,
    label: FORMAT_LABEL[format],
    sessions: buckets.get(format) ?? [],
  })).filter((g) => g.sessions.length > 0)
}

// ── SessionCard ───────────────────────────────────────────────────────────────

const SessionCard = ({ session, onClick }: { session: Session; onClick: () => void }) => {
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

  const meta = [FORMAT_LABEL[session.format] ?? session.format, LANGUAGE_LABEL[session.language] ?? session.language].filter(Boolean).join(' · ')

  return (
    <article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      className="flex flex-col h-full gap-3 px-5 py-4 shadow-xl cursor-pointer glow-card rounded-3xl bg-base-200"
    >
      <p className="m-0 text-xs font-medium text-left text-secondary">{meta}</p>

      <h3 className="flex-1 m-0 text-base font-bold leading-snug text-primary">{session.title}</h3>

      <div className="flex flex-col gap-0.5">
        {session.speakers.map((s) => (
          <p key={s.name} className="m-0 text-sm italic text-left text-primary/80">
            {s.name}
          </p>
        ))}
      </div>
    </article>
  )
}

// ── Loading skeleton ──────────────────────────────────────────────────────────

const Skeleton = () => (
  <div className="flex flex-col gap-10">
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="flex flex-col gap-4">
        <div className="w-32 h-8 rounded-full bg-base-100/60 animate-pulse" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, j) => (
            <div key={j} className="flex flex-col gap-3 px-5 py-4 rounded-3xl bg-base-200 animate-pulse h-32">
              <div className="h-2.5 w-1/2 rounded-full bg-base-300/60" />
              <div className="w-5/6 h-4 rounded-full bg-base-300/40" />
              <div className="h-2.5 w-1/3 rounded-full bg-base-300/30" />
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
)

// ── ProgramPage ───────────────────────────────────────────────────────────────

const ProgramPage = () => {
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetchProgram()
      .then((data) => {
        setSessions(data)
        setLoading(false)
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Unknown error')
        setLoading(false)
      })
  }, [])

  const groups = groupByFormat(sessions)

  return (
    <div className="min-h-screen pt-20 pb-24">
      <BubbleField variant="subtle" />
      <div className="px-4 mx-auto max-w-7xl md:px-8">
        <div className="py-8">
          <Heading level="h1">Program</Heading>
        </div>

        {loading && <Skeleton />}

        {error && (
          <div className="px-5 py-12 text-center rounded-3xl bg-base-200">
            <p className="m-0 font-semibold text-primary">Could not load program</p>
            <p className="m-0 mt-2 text-sm text-center text-secondary">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="flex flex-col gap-16">
            {groups.map((group) => (
              <section key={group.format}>
                <div className="flex items-center gap-4 mb-8">
                  <Heading level="h2">{group.label}</Heading>
                  <div className="flex-1 h-px bg-primary/20" />
                  <span className="text-xs text-secondary">{group.sessions.length}</span>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {group.sessions.map((s) => (
                    <SessionCard key={s.sessionId} session={s} onClick={() => navigate(`/program/${s.sessionId}`)} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProgramPage
