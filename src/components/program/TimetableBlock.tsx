import { Link, useLocation } from 'react-router-dom'

import FavoriteButton from '@/components/program/FavoriteButton'
import { LanguageIcon } from '@/components/program/icons'
import { type Session } from '@/lib/fetchProgram'
import { formatTime, getSessionStart, getSessionTiming, LANGUAGE_LABEL } from '@/lib/program'

// Compact session card for the Gantt-style timetable, where width is proportional to
// duration and can be quite narrow (a 15min lightning talk vs. a 3hr workshop) — but there's
// enough lane height to carry the same text sizes the regular cards use. Format is skipped
// here since the whole day is one format (see the "Workshops" title above the timetable),
// and room/duration are already conveyed by the lane and the block's width.
const TimetableBlock = ({
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
  const location = useLocation()
  const titleId = `timetable-title-${session.sessionId}`
  const timing = getSessionTiming(session, now)
  const languageLabel = session.language.slice(0, 2).toUpperCase()

  return (
    <article
      className={`relative flex flex-col h-full gap-1 px-2.5 py-2 overflow-hidden rounded-xl shadow-md bg-base-200 ${
        isConflict ? 'ring-1 ring-accent-secondary/40' : ''
      }`}
    >
      <Link
        to={`/program/${session.sessionId}`}
        state={{ background: location }}
        aria-labelledby={titleId}
        className="absolute inset-0 z-0 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
      />

      <div className="flex items-start justify-between gap-1 pointer-events-none">
        <div className="flex items-center min-w-0 gap-1.5">
          <span className={`text-[11px] font-semibold whitespace-nowrap ${timing ? 'text-pop' : 'text-secondary'}`}>
            {timing ? (timing === 'now' ? 'Now' : 'Soon') : formatTime(getSessionStart(session))}
          </span>
          <span
            title={`Language: ${LANGUAGE_LABEL[session.language] ?? session.language}`}
            className="inline-flex items-center gap-0.5 text-[11px] font-semibold whitespace-nowrap pointer-events-auto text-secondary"
          >
            <LanguageIcon className="w-3 h-3 shrink-0" />
            {languageLabel}
          </span>
        </div>
        <div className="relative z-10 shrink-0 pointer-events-auto">
          <FavoriteButton sessionId={session.sessionId} isFavorite={isFavorite} onToggle={onToggleFavorite} size="sm" />
        </div>
      </div>

      <h4 id={titleId} className="m-0 text-base font-bold leading-snug text-primary pointer-events-none line-clamp-2">
        {session.title}
        {isConflict && <span className="sr-only"> — overlaps another favorite</span>}
      </h4>

      {session.speakers.length > 0 && (
        <p className="m-0 mt-auto text-sm italic leading-snug truncate text-primary/90 pointer-events-none">
          {session.speakers.map((s) => s.name).join(', ')}
        </p>
      )}
    </article>
  )
}

export default TimetableBlock
