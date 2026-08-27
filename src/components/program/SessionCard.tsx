import { type PointerEvent, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

import FavoriteButton from '@/components/program/FavoriteButton'
import { ClockIcon, LanguageIcon, RoomIcon } from '@/components/program/icons'
import KeywordTags from '@/components/program/KeywordTags'
import MetaBadge from '@/components/program/MetaBadge'
import { type Session } from '@/lib/fetchProgram'
import {
  formatDuration,
  formatTime,
  getDurationMinutes,
  getFormatLabel,
  getKeywords,
  getSessionStart,
  getSessionTiming,
  isLightningTalk,
  isWorkshop,
  LANGUAGE_LABEL,
  LIGHTNING_TALK_LABEL,
} from '@/lib/program'

const SessionCard = ({
  session,
  isFavorite,
  isConflict,
  onToggleFavorite,
  now,
}: {
  session: Session
  isFavorite: boolean
  isConflict: boolean
  onToggleFavorite: () => void
  now: Date
}) => {
  const ref = useRef<HTMLElement | null>(null)
  const location = useLocation()
  const titleId = `session-title-${session.sessionId}`

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse') return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--glow-x', `${e.clientX - rect.left}px`)
    el.style.setProperty('--glow-y', `${e.clientY - rect.top}px`)
    el.style.setProperty('--glow-opacity', '1')
  }
  const onLeave = () => ref.current?.style.setProperty('--glow-opacity', '0')

  const duration = formatDuration(getDurationMinutes(session))
  const formatLabel = isWorkshop(session) ? getFormatLabel(session) : null
  const languageLabel = session.language.slice(0, 2).toUpperCase()
  const keywords = getKeywords(session)
  const timing = getSessionTiming(session, now)
  // Lightning talks are grouped under the time slot they follow (see groupSessionsByTime),
  // which can start earlier than the talk itself — call out its actual start time so it
  // doesn't read as starting alongside the rest of the slot.
  const startTime = isLightningTalk(session) ? formatTime(getSessionStart(session)) : null

  return (
    <article
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`relative flex flex-col h-full gap-3 px-5 py-4 shadow-xl cursor-pointer glow-card rounded-3xl bg-base-200 ${
        isConflict ? 'ring-1 ring-accent-secondary/30' : ''
      }`}
    >
      {/* The whole card is a real link (WCAG: must be programmatically exposed as clickable,
          not just styled), stretched to cover the card. Everything visible sits on top with
          pointer-events disabled so clicks pass through to this link, except the favorite
          button, which re-enables pointer-events and is stacked above via z-index so it
          intercepts its own clicks instead of triggering navigation. */}
      <Link
        to={`/program/${session.sessionId}`}
        state={{ background: location }}
        aria-labelledby={titleId}
        className="absolute inset-0 z-0 outline-none rounded-3xl focus-visible:ring-2 focus-visible:ring-accent-primary"
      />

      <div className="flex items-start justify-between gap-2 pointer-events-none">
        <div className="flex flex-nowrap min-w-0 gap-1.5 overflow-x-auto no-scrollbar">
          {timing && <MetaBadge label={timing === 'now' ? 'Now' : 'Soon'} tone={timing === 'now' ? 'pop' : 'pop-outline'} />}
          {session.room && <MetaBadge icon={<RoomIcon />} label={session.room} />}
          {duration && <MetaBadge icon={<ClockIcon />} label={duration} />}
          {formatLabel && <MetaBadge label={formatLabel} tone="accent" />}
          {languageLabel && (
            <MetaBadge
              icon={<LanguageIcon />}
              label={languageLabel}
              title={`Language: ${LANGUAGE_LABEL[session.language] ?? session.language}`}
              className="pointer-events-auto"
            />
          )}
        </div>
        <div className="relative z-10 pointer-events-auto">
          <FavoriteButton sessionId={session.sessionId} isFavorite={isFavorite} onToggle={onToggleFavorite} />
        </div>
      </div>

      <h3 id={titleId} className="flex-1 m-0 text-base font-bold leading-snug pointer-events-none text-primary line-clamp-3">
        {isLightningTalk(session) && <span className="text-accent-primary">{LIGHTNING_TALK_LABEL}</span>}
        {session.title}
      </h3>

      {startTime && <p className="m-0 text-sm font-semibold pointer-events-none text-accent-primary">Starts {startTime}</p>}

      <div className="relative flex flex-col gap-0.5 pointer-events-none">
        {session.speakers.map((s) => (
          <p key={s.name} className="m-0 text-sm italic text-left text-primary/90">
            {s.name}
          </p>
        ))}

        {isConflict && <p className="absolute right-0 bottom-0 px-2 py-0.5 m-0 text-sm font-semibold rounded-full text-pop">Favorites overlap</p>}
      </div>

      <div className="pointer-events-none">
        <KeywordTags keywords={keywords} />
      </div>
    </article>
  )
}

export default SessionCard
