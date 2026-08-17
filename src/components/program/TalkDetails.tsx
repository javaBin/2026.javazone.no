import type { ReactNode } from 'react'
import { useParams } from 'react-router-dom'

import { Heading, LinkButton } from '@/components'
import FavoriteCallToAction from '@/components/program/FavoriteCallToAction'
import { ClockIcon, LanguageIcon, RoomIcon } from '@/components/program/icons'
import MetaBadge from '@/components/program/MetaBadge'
import { useFavorites } from '@/hooks/useFavorites'
import { useProgram } from '@/hooks/useProgram'
import {
  formatDayLabel,
  formatDuration,
  formatKeywordTag,
  formatTime,
  getDayKey,
  getDurationMinutes,
  getFormatLabel,
  getKeywords,
  getSessionStart,
  isLightningTalk,
  isWorkshop,
  LANGUAGE_LABEL,
  LIGHTNING_TALK_LABEL,
  WORKSHOP_SIGNUP_URL,
} from '@/lib/program'

// Shared talk-detail content — rendered both by the full-page TalkPage (direct navigation,
// deep links) and TalkModal (opened over the program list). Only the "close/back" control
// in the header (and optionally the title size) differs between the two, so they're passed
// in rather than hardcoded here.
const TalkDetails = ({ closeControl, titleClassName = '', titleId }: { closeControl: ReactNode; titleClassName?: string; titleId?: string }) => {
  const { id } = useParams<{ id: string }>()
  const { sessions, loading, error: loadError } = useProgram()
  const { favorites, toggle: toggleFavorite } = useFavorites()

  const session = sessions.find((s) => s.sessionId === id) ?? null
  const error = loadError ?? (!loading && !session ? 'Talk not found' : null)

  const keywords = session ? getKeywords(session) : []
  const duration = session ? formatDuration(getDurationMinutes(session)) : null
  const sessionStart = session ? getSessionStart(session) : null
  const startTime = sessionStart && session ? `${formatTime(sessionStart)} ${formatDayLabel(getDayKey(session))}` : null

  return (
    <>
      <div className="flex items-center justify-between mb-4 sm:mb-8">
        {closeControl}

        {session && (
          <FavoriteCallToAction
            sessionId={session.sessionId}
            isFavorite={favorites.has(session.sessionId)}
            onToggle={() => toggleFavorite(session.sessionId)}
          />
        )}
      </div>

      {loading && (
        <div className="flex flex-col gap-5 animate-pulse">
          <div className="flex gap-2">
            <div className="h-6 rounded-full w-28 bg-base-200" />
            <div className="w-20 h-6 rounded-full bg-base-200" />
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
          <Heading level="h1" id={titleId} className={`!pt-0 !text-left ${titleClassName}`}>
            {isLightningTalk(session) && <span className="text-accent-primary">{LIGHTNING_TALK_LABEL}</span>}
            {session.title}
          </Heading>

          {startTime && <p className="m-0 -mt-6 text-lg font-semibold text-accent-primary">{startTime}</p>}

          {/* Format / room / duration / language badges */}
          <div className="flex flex-wrap gap-2">
            {session.room && <MetaBadge size="md" icon={<RoomIcon className="w-4 h-4 shrink-0" />} label={session.room} />}
            {duration && <MetaBadge size="md" icon={<ClockIcon className="w-4 h-4 shrink-0" />} label={duration} />}
            {isWorkshop(session) && <MetaBadge size="md" label={getFormatLabel(session)} tone="accent" />}
            <MetaBadge
              size="md"
              icon={<LanguageIcon className="w-4 h-4 shrink-0" />}
              label={session.language.slice(0, 2).toUpperCase()}
              title={`Language: ${LANGUAGE_LABEL[session.language] ?? session.language}`}
            />
          </div>

          {/* Workshop sign-up */}
          {isWorkshop(session) && <LinkButton title="Sign up here!" link={WORKSHOP_SIGNUP_URL} size="small" className="self-start" />}

          {/* Keywords */}
          {keywords.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {keywords.map((k) => (
                <span key={k} className="text-xs badge badge-outline">
                  {formatKeywordTag(k)}
                </span>
              ))}
            </div>
          )}

          {/* Abstract */}
          {session.abstract && (
            <div className="flex flex-col gap-3">
              <p className="m-0 text-xs font-semibold tracking-widest uppercase text-secondary">About this talk</p>
              <p className="m-0 text-base leading-relaxed whitespace-pre-wrap text-primary/90">{session.abstract}</p>
            </div>
          )}

          {/* Intended audience */}
          {session.intendedAudience && (
            <div className="flex flex-col gap-2">
              <p className="m-0 text-xs font-semibold tracking-widest uppercase text-secondary">Intended audience</p>
              <p className="m-0 text-sm leading-relaxed text-primary/80">{session.intendedAudience}</p>
            </div>
          )}

          {/* Workshop prerequisites */}
          {session.workshopPrerequisites && (
            <div className="flex flex-col gap-2">
              <p className="m-0 text-xs font-semibold tracking-widest uppercase text-secondary">Prerequisites</p>
              <p className="m-0 text-sm leading-relaxed whitespace-pre-wrap text-primary/80">{session.workshopPrerequisites}</p>
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
                  {speaker.bio && <p className="m-0 text-sm leading-relaxed whitespace-pre-wrap text-secondary">{speaker.bio}</p>}
                  <div className="flex gap-3 mt-0.5">
                    {speaker.twitter && (
                      <a
                        href={`https://twitter.com/${speaker.twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`${speaker.name} on Twitter (opens in a new tab)`}
                        className="inline-block py-1.5 -my-1.5 text-xs underline rounded-sm outline-none text-secondary hover:text-primary focus-visible:ring-2 focus-visible:ring-accent-primary"
                      >
                        Twitter
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    )}
                    {speaker.linkedin && (
                      <a
                        href={speaker.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`${speaker.name} on LinkedIn (opens in a new tab)`}
                        className="inline-block py-1.5 -my-1.5 text-xs underline rounded-sm outline-none text-secondary hover:text-primary focus-visible:ring-2 focus-visible:ring-accent-primary"
                      >
                        LinkedIn
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    )}
                    {speaker.bluesky && (
                      <a
                        href={`https://bsky.app/profile/${speaker.bluesky}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`${speaker.name} on Bluesky (opens in a new tab)`}
                        className="inline-block py-1.5 -my-1.5 text-xs underline rounded-sm outline-none text-secondary hover:text-primary focus-visible:ring-2 focus-visible:ring-accent-primary"
                      >
                        Bluesky
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default TalkDetails
