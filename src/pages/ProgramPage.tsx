import { useEffect, useState } from 'react'

import { Heading } from '@/components'

interface Speaker {
  name: string
}

interface Session {
  sessionId: string
  title: string
  format: string
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

  return (
    <div className="min-h-screen flex flex-col items-center p-8 pt-20 relative space-y-8 mb-20">
      <Heading level="h1">Program</Heading>

      {loading && <p className="text-secondary">Laster program...</p>}

      {error && <p className="text-accent-tertiary">Feil: {error}</p>}

      {!loading &&
        !error &&
        sortedGroups.map(([format, formatSessions]) => (
          <section key={format} className="w-full max-w-3xl space-y-4">
            <Heading level="h2">{formatLabel(format)}</Heading>
            <ul className="space-y-3">
              {formatSessions.map((session) => (
                <li key={session.sessionId} className="bg-base-200 rounded-2xl p-4">
                  <p className="text-primary font-semibold">{session.title}</p>
                  <p className="text-tertiary text-sm">{session.speakers.map((sp) => sp.name).join(', ')}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
    </div>
  )
}

export default ProgramPage
