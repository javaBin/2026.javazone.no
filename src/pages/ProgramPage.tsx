import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { Heading } from '@/components'

interface Speaker {
  name: string
  bio?: string
}

interface Session {
  sessionId: string
  title: string
  format: string
  abstract?: string
  speakers: Speaker[]
}

interface ApiResponse {
  sessions: Session[]
}

function formatLabel(format: string): string {
  return format
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const ProgramPage = () => {
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set())

  useEffect(() => {
    fetch('https://sleepingpill.javazone.no/public/conference/ffbdc06b-b570-4409-bf2f-7d3b5dd2aed3/session')
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch program (${res.status})`)
        return res.json() as Promise<ApiResponse>
      })
      .then((data) => setSessions(data.sessions))
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Unknown error'))
      .finally(() => setLoading(false))
  }, [])

  const grouped = sessions.reduce<Map<string, Session[]>>((acc, session) => {
    const key = session.format ?? 'other'
    const existing = acc.get(key)
    if (existing) {
      existing.push(session)
    } else {
      acc.set(key, [session])
    }
    return acc
  }, new Map())

  const sortedGroups = [...grouped.entries()].sort(([a], [b]) => a.localeCompare(b))

  const toggle = (format: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev)
      if (next.has(format)) {
        next.delete(format)
      } else {
        next.add(format)
      }
      return next
    })
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-8 pt-20 relative space-y-8 mb-20">
      <Heading level="h1">Program</Heading>

      {loading && <p className="text-secondary">Laster program...</p>}

      {error && <p className="text-accent-tertiary">Feil: {error}</p>}

      {!loading &&
        !error &&
        sortedGroups.map(([format, formatSessions]) => {
          const isCollapsed = collapsed.has(format)
          return (
            <section key={format} className="w-full max-w-3xl space-y-4">
              <button
                type="button"
                onClick={() => toggle(format)}
                className="flex items-center gap-3 w-full text-left bg-transparent cursor-pointer group"
              >
                <Heading level="h2">{formatLabel(format)}</Heading>
                <span className="text-tertiary text-sm">({formatSessions.length})</span>
                <span className={`ml-auto text-tertiary transition-transform duration-300 ${isCollapsed ? '' : 'rotate-180'}`}>▲</span>
              </button>
              <ul className={`space-y-3 overflow-hidden transition-all duration-300 ${isCollapsed ? 'max-h-0' : 'max-h-[9999px]'}`}>
                {formatSessions.map((session) => (
                  <li key={session.sessionId}>
                    <Link
                      to={`/program/${session.sessionId}`}
                      className="block bg-base-200 rounded-2xl p-4 no-underline hover:bg-base-300 transition-colors duration-200"
                    >
                      <p className="text-primary font-semibold">{session.title}</p>
                      <p className="text-tertiary text-sm">{session.speakers.map((sp) => sp.name).join(', ')}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
    </div>
  )
}

export default ProgramPage
