import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { BubbleIcons, Heading } from '@/components'
import { fetchProgram, type Session } from '@/lib/fetchProgram'

const FORMAT_LABEL: Record<string, string> = {
  'lightning-talk': 'Lightning Talk',
  presentation: 'Presentation',
  workshop: 'Workshop',
}

const LANGUAGE_LABEL: Record<string, string> = { no: 'Norwegian', en: 'English' }

// ── TalkPage ──────────────────────────────────────────────────────────────────

const TalkPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProgram()
      .then((data) => {
        const found = data.find((s) => s.sessionId === id)
        if (found) setSession(found)
        else setError('Talk not found')
        setLoading(false)
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Unknown error')
        setLoading(false)
      })
  }, [id])

  const keywords =
    session?.suggestedKeywords
      ?.split(',')
      .map((k) => k.trim())
      .filter(Boolean) ?? []

  return (
    <div className="min-h-screen pt-20 pb-24">
      <BubbleIcons />
      <div className="px-4 mx-auto max-w-3xl md:px-8">
        <div className="py-8">
          <button
            onClick={() => navigate('/program')}
            className="flex items-center gap-2 mb-10 text-sm font-medium transition-opacity text-secondary hover:opacity-70"
          >
            ← Back to program
          </button>

          {loading && (
            <div className="flex flex-col gap-5 animate-pulse">
              <div className="flex gap-2">
                <div className="h-6 w-28 rounded-full bg-base-200" />
                <div className="h-6 w-20 rounded-full bg-base-200" />
              </div>
              <div className="w-3/4 h-10 rounded-2xl bg-base-200" />
              <div className="w-1/3 h-5 rounded-full bg-base-200" />
              <div className="w-full h-40 rounded-3xl bg-base-200" />
            </div>
          )}

          {error && !loading && (
            <div className="px-5 py-12 text-center rounded-3xl bg-base-200">
              <p className="m-0 font-semibold text-primary">{error}</p>
            </div>
          )}

          {session && (
            <div className="flex flex-col gap-8">
              {/* Format / language badges */}
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">
                  {FORMAT_LABEL[session.format] ?? session.format}
                </span>
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-base-300 text-secondary">
                  {LANGUAGE_LABEL[session.language] ?? session.language}
                </span>
                {session.length && (
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-base-300 text-secondary">
                    {session.length} min
                  </span>
                )}
              </div>

              <Heading level="h1" className="!text-left">
                {session.title}
              </Heading>

              {/* Speakers */}
              {session.speakers.length > 0 && (
                <div className="flex flex-col gap-6">
                  {session.speakers.map((speaker) => (
                    <div key={speaker.name} className="flex flex-col gap-1.5">
                      <p className="m-0 text-lg font-semibold text-primary">{speaker.name}</p>
                      {speaker.bio && (
                        <p className="m-0 text-sm leading-relaxed text-secondary whitespace-pre-wrap">{speaker.bio}</p>
                      )}
                      <div className="flex gap-3 mt-0.5">
                        {speaker.twitter && (
                          <a
                            href={`https://twitter.com/${speaker.twitter}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs underline text-secondary hover:text-primary"
                          >
                            Twitter
                          </a>
                        )}
                        {speaker.linkedin && (
                          <a
                            href={speaker.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs underline text-secondary hover:text-primary"
                          >
                            LinkedIn
                          </a>
                        )}
                        {speaker.bluesky && (
                          <a
                            href={`https://bsky.app/profile/${speaker.bluesky}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs underline text-secondary hover:text-primary"
                          >
                            Bluesky
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Divider */}
              <div className="h-px bg-base-content/10" />

              {/* Abstract */}
              {session.abstract && (
                <div className="flex flex-col gap-3">
                  <p className="m-0 text-xs font-semibold tracking-widest uppercase text-secondary">About this talk</p>
                  <p className="m-0 text-base leading-relaxed text-primary/90 whitespace-pre-wrap">{session.abstract}</p>
                </div>
              )}

              {/* Intended audience */}
              {session.intendedAudience && (
                <div className="flex flex-col gap-2">
                  <p className="m-0 text-xs font-semibold tracking-widest uppercase text-secondary">Intended audience</p>
                  <p className="m-0 text-sm leading-relaxed text-primary/80">{session.intendedAudience}</p>
                </div>
              )}

              {/* Keywords */}
              {keywords.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {keywords.map((k) => (
                    <span key={k} className="text-xs badge badge-outline">
                      {k}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TalkPage
