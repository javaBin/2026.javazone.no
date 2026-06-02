import React, { useEffect, useRef, useState } from 'react'

import { Heading } from '@/components'
import { fetchProgram, type Session } from '@/lib/fetchProgram'

// ── helpers ───────────────────────────────────────────────────────────────────

function toOslo(iso: string, opts: Intl.DateTimeFormatOptions): string {
  try {
    return new Date(iso).toLocaleString('en-GB', { timeZone: 'Europe/Oslo', ...opts })
  } catch {
    return ''
  }
}

function slotTime(iso: string) {
  return toOslo(iso, { hour: '2-digit', minute: '2-digit' })
}

function slotDay(iso: string) {
  return toOslo(iso, { weekday: 'long', month: 'long', day: 'numeric' })
}

function slotDayKey(iso: string) {
  return toOslo(iso, { year: 'numeric', month: '2-digit', day: '2-digit' })
}

interface TimeGroup {
  slotKey: string
  time: string
  sessions: Session[]
}
interface DayGroup {
  dayKey: string
  dayLabel: string
  timeGroups: TimeGroup[]
}

function groupSessions(sessions: Session[]): { scheduled: DayGroup[]; unscheduled: Session[] } {
  const unscheduled: Session[] = []
  const byDay = new Map<string, Map<string, Session[]>>()

  for (const s of sessions) {
    const iso = s.startSlotZulu ?? s.startTimeZulu
    if (!iso) {
      unscheduled.push(s)
      continue
    }
    const dayKey = slotDayKey(iso)
    if (!byDay.has(dayKey)) byDay.set(dayKey, new Map())
    const bySlot = byDay.get(dayKey)!
    if (!bySlot.has(iso)) bySlot.set(iso, [])
    bySlot.get(iso)!.push(s)
  }

  const scheduled: DayGroup[] = [...byDay.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([dayKey, bySlot]) => {
      const firstIso = [...bySlot.keys()][0]
      return {
        dayKey,
        dayLabel: slotDay(firstIso),
        timeGroups: [...bySlot.entries()]
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([slotKey, slotSessions]) => ({
            slotKey,
            time: slotTime(slotKey),
            sessions: slotSessions.sort((a, b) => (a.room ?? '').localeCompare(b.room ?? '')),
          })),
      }
    })

  return { scheduled, unscheduled }
}

// ── SessionCard ───────────────────────────────────────────────────────────────

const FORMAT_LABEL: Record<string, string> = {
  presentation: 'Presentation',
  'lightning-talk': 'Lightning Talk',
  workshop: 'Workshop',
}

const LANGUAGE_LABEL: Record<string, string> = { no: 'Norwegian', en: 'English' }

const SessionCard = ({ session }: { session: Session }) => {
  const ref = useRef<HTMLElement | null>(null)
  const [expanded, setExpanded] = useState(false)

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--glow-x', `${e.clientX - rect.left}px`)
    el.style.setProperty('--glow-y', `${e.clientY - rect.top}px`)
    el.style.setProperty('--glow-opacity', '1')
  }
  const onLeave = () => ref.current?.style.setProperty('--glow-opacity', '0')

  const meta = [
    session.room && `Room ${session.room}`,
    session.length && `${session.length} min`,
    FORMAT_LABEL[session.format] ?? session.format,
    LANGUAGE_LABEL[session.language] ?? session.language,
  ]
    .filter(Boolean)
    .join(' · ')

  const keywords = session.suggestedKeywords
    ? session.suggestedKeywords
        .split(',')
        .map((k) => k.trim())
        .filter(Boolean)
    : []

  return (
    <article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={() => setExpanded((v) => !v)}
      className="flex flex-col h-full gap-3 px-5 py-4 shadow-xl cursor-pointer glow-card rounded-3xl bg-base-200"
    >
      <p className="m-0 text-xs font-medium text-left text-secondary">{meta}</p>

      <h3 className="flex-1 m-0 text-base font-bold leading-snug text-primary">{session.title}</h3>

      <div className="flex flex-col gap-0.5">
        {session.speakers.map((s) => (
          <p key={s.name} className="m-0 text-sm italic text-left text-primary">
            {s.name}
          </p>
        ))}
      </div>

      {expanded && session.abstract && (
        <p className="pt-3 m-0 text-sm leading-relaxed text-left border-t text-primary/80 border-base-content/10">{session.abstract}</p>
      )}

      {keywords.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {keywords.map((k) => (
            <span key={k} className="text-xs badge badge-outline">
              {k}
            </span>
          ))}
        </div>
      )}
    </article>
  )
}

// ── Loading skeleton ──────────────────────────────────────────────────────────

const Skeleton = () => (
  <div className="flex flex-col gap-10">
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="flex flex-col gap-4">
        <div className="w-24 h-6 rounded-full bg-base-100/60 animate-pulse" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, j) => (
            <div key={j} className="flex flex-col gap-3 px-5 py-4 rounded-3xl bg-base-200 animate-pulse h-36">
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

  const { scheduled, unscheduled } = groupSessions(sessions)

  return (
    <div className="min-h-screen pt-20 pb-24">
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
            {/* Scheduled sessions grouped by day → time */}
            {scheduled.map((day) => (
              <section key={day.dayKey}>
                {/* Day header */}
                <div className="flex items-center gap-4 mb-8">
                  <Heading level="h2">{day.dayLabel}</Heading>
                  <div className="flex-1 h-px bg-primary/20" />
                </div>

                <div className="flex flex-col gap-10">
                  {day.timeGroups.map((group) => (
                    <div key={group.slotKey}>
                      {/* Time slot header */}
                      <div className="flex items-center gap-3 mb-4">
                        <span className="font-mono text-xl font-bold text-primary">{group.time}</span>
                        <div className="flex-1 h-px bg-base-content/10" />
                        <span className="text-xs text-secondary">{group.sessions.length} sessions</span>
                      </div>

                      {/* Session grid */}
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {group.sessions.map((s) => (
                          <SessionCard key={s.id} session={s} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}

            {/* Unscheduled sessions */}
            {unscheduled.length > 0 && (
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <Heading level="h2">To Be Scheduled</Heading>
                  <div className="flex-1 h-px bg-primary/20" />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {unscheduled.map((s) => (
                    <SessionCard key={s.id} session={s} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProgramPage
