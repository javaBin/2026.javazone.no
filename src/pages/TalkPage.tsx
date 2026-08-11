import { useNavigate, useParams } from 'react-router-dom'

import { BubbleField, Heading } from '@/components'
import FavoriteButton from '@/components/program/FavoriteButton'
import { ClockIcon, LanguageIcon, RoomIcon } from '@/components/program/icons'
import MetaBadge from '@/components/program/MetaBadge'
import { useFavorites } from '@/hooks/useFavorites'
import { useProgram } from '@/hooks/useProgram'
import { formatDuration, getDurationMinutes, getFormatLabel, getKeywords, getLanguageLabel } from '@/lib/program'

// ── TalkPage ──────────────────────────────────────────────────────────────────

const TalkPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { sessions, loading, error: loadError } = useProgram()
  const { favorites, toggle: toggleFavorite } = useFavorites()

  const session = sessions.find((s) => s.sessionId === id) ?? null
  const error = loadError ?? (!loading && !session ? 'Talk not found' : null)

  const keywords = session ? getKeywords(session) : []
  const duration = session ? formatDuration(getDurationMinutes(session)) : null

  return (
    <div className="min-h-screen pt-20 pb-24">
      <BubbleField variant="subtle" />
      <div className="px-4 mx-auto max-w-3xl md:px-8">
        <div className="py-8">
          <div className="flex items-center justify-between mb-10">
            <button
              type="button"
              onClick={() => navigate('/program')}
              className="flex items-center gap-2 text-sm font-medium transition-opacity text-secondary hover:opacity-70"
            >
              ← Back to program
            </button>

            {session && (
              <FavoriteButton
                sessionId={session.sessionId}
                isFavorite={favorites.has(session.sessionId)}
                onToggle={() => toggleFavorite(session.sessionId)}
              />
            )}
          </div>

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
              <Heading level="h1" className="!text-left">
                {session.title}
              </Heading>

              {/* Format / room / duration / language badges */}
              <div className="flex flex-wrap gap-2">
                {session.room && <MetaBadge size="md" icon={<RoomIcon className="w-4 h-4 shrink-0" />} label={session.room} />}
                {duration && <MetaBadge size="md" icon={<ClockIcon className="w-4 h-4 shrink-0" />} label={duration} />}
                <MetaBadge size="md" label={getFormatLabel(session)} accent />
                <MetaBadge size="md" icon={<LanguageIcon className="w-4 h-4 shrink-0" />} label={getLanguageLabel(session)} />
              </div>

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

              {/* Divider */}
              <div className="h-px bg-base-content/10" />

              {/* Speakers */}
              {session.speakers.length > 0 && (
                <div className="flex flex-col gap-6">
                  {session.speakers.map((speaker) => (
                    <div key={speaker.name} className="flex flex-col gap-1.5">
                      <p className="m-0 text-lg font-semibold text-primary">{speaker.name}</p>
                      {speaker.bio && <p className="m-0 text-sm leading-relaxed text-secondary whitespace-pre-wrap">{speaker.bio}</p>}
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
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TalkPage
