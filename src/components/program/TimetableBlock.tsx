import { Link, useLocation } from 'react-router-dom'

import FavoriteButton from '@/components/program/FavoriteButton'
import { LanguageIcon } from '@/components/program/icons'
import KeywordTags from '@/components/program/KeywordTags'
import { type Session } from '@/lib/fetchProgram'
import { formatTime, getKeywords, getSessionStart, getSessionTiming, LANGUAGE_LABEL } from '@/lib/program'

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
  const keywords = getKeywords(session)

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
        className="absolute inset-0 z-0 outline-none rounded-xl focus-visible:ring-2 focus-visible:ring-accent-primary"
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
        <div className="relative z-10 pointer-events-auto shrink-0">
          <FavoriteButton sessionId={session.sessionId} isFavorite={isFavorite} onToggle={onToggleFavorite} size="sm" />
        </div>
      </div>

      <h4 id={titleId} className="m-0 text-base font-bold leading-snug pointer-events-none text-primary line-clamp-2">
        {session.title}
        {isConflict && <span className="sr-only"> — overlaps another favorite</span>}
      </h4>

      <div className="flex flex-col gap-1 mt-auto pointer-events-none">
        {session.speakers.length > 0 && (
          <p className="m-0 text-sm italic leading-snug truncate text-primary/90">{session.speakers.map((s) => s.name).join(', ')}</p>
        )}
        <KeywordTags keywords={keywords} maxVisible={3} maxCombinedLength={27} alwaysShowFirst={false} />
      </div>
    </article>
  )
}

export default TimetableBlock
