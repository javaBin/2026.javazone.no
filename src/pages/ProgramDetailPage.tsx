import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

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

const ProgramDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('https://sleepingpill.javazone.no/public/conference/ffbdc06b-b570-4409-bf2f-7d3b5dd2aed3/session')
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch program (${res.status})`)
        return res.json() as Promise<ApiResponse>
      })
      .then((data) => {
        const found = data.sessions.find((s) => s.sessionId === id)
        if (!found) throw new Error('Talk not found')
        setSession(found)
      })
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Unknown error'))
      .finally(() => setLoading(false))
  }, [id])

  return (
    <div className="min-h-screen flex flex-col items-center p-8 pt-20 relative mb-20">
      <div className="w-full max-w-3xl space-y-8">
        <Link
          to="/program"
          className="inline-flex items-center gap-2 text-tertiary no-underline hover:text-accent-secondary transition-colors duration-200 text-sm"
        >
          ← Tilbake til program
        </Link>

        {loading && <p className="text-secondary">Laster...</p>}

        {error && <p className="text-accent-tertiary">Feil: {error}</p>}

        {session && (
          <>
            <Heading level="h1">{session.title}</Heading>

            {session.abstract && (
              <section className="space-y-2">
                <Heading level="h3">Abstract</Heading>
                <p className="text-secondary leading-relaxed whitespace-pre-wrap">{session.abstract}</p>
              </section>
            )}

            <section className="space-y-6">
              <Heading level="h3">{session.speakers.length === 1 ? 'Speaker' : 'Speakers'}</Heading>
              {session.speakers.map((speaker, i) => (
                <div key={i} className="bg-base-200 rounded-2xl p-6 space-y-2">
                  <p className="text-primary font-semibold text-lg">{speaker.name}</p>
                  {speaker.bio && <p className="text-secondary leading-relaxed whitespace-pre-wrap">{speaker.bio}</p>}
                </div>
              ))}
            </section>
          </>
        )}
      </div>
    </div>
  )
}

export default ProgramDetailPage
