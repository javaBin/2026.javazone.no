import { type MouseEvent, useRef } from 'react'

import FavoriteButton from '@/components/program/FavoriteButton'
import { ClockIcon, LanguageIcon, RoomIcon } from '@/components/program/icons'
import KeywordTags from '@/components/program/KeywordTags'
import MetaBadge from '@/components/program/MetaBadge'
import { type Session } from '@/lib/fetchProgram'
import { formatDuration, getDurationMinutes, getFormatLabel, getKeywords } from '@/lib/program'

const SessionCard = ({
  session,
  isFavorite,
  isConflict,
  onToggleFavorite,
  onOpen,
}: {
  session: Session
  isFavorite: boolean
  isConflict: boolean
  onToggleFavorite: () => void
  onOpen: () => void
}) => {
  const ref = useRef<HTMLElement | null>(null)

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--glow-x', `${e.clientX - rect.left}px`)
    el.style.setProperty('--glow-y', `${e.clientY - rect.top}px`)
    el.style.setProperty('--glow-opacity', '1')
  }
  const onLeave = () => ref.current?.style.setProperty('--glow-opacity', '0')

  const duration = formatDuration(getDurationMinutes(session))
  const formatLabel = getFormatLabel(session)
  const languageLabel = session.language.slice(0, 2).toUpperCase()
  const keywords = getKeywords(session)

  return (
    <article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onOpen}
      className={`flex flex-col h-full gap-3 px-5 py-4 shadow-xl cursor-pointer glow-card rounded-3xl bg-base-200 ${
        isConflict ? 'ring-1 ring-accent-secondary/30' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-nowrap min-w-0 gap-1.5 overflow-x-auto">
          {session.room && <MetaBadge icon={<RoomIcon />} label={session.room} />}
          {duration && <MetaBadge icon={<ClockIcon />} label={duration} />}
          {formatLabel && <MetaBadge label={formatLabel} accent />}
          {languageLabel && <MetaBadge icon={<LanguageIcon />} label={languageLabel} />}
        </div>
        <FavoriteButton sessionId={session.sessionId} isFavorite={isFavorite} onToggle={onToggleFavorite} />
      </div>

      <h3 className="flex-1 m-0 text-base font-bold leading-snug text-primary">{session.title}</h3>

      <div className="relative flex flex-col gap-0.5">
        {session.speakers.map((s) => (
          <p key={s.name} className="m-0 text-sm italic text-left text-primary/80">
            {s.name}
          </p>
        ))}

        {isConflict && (
          <p className="absolute right-0 bottom-0 px-2 py-0.5 m-0 text-sm font-semibold rounded-full text-pop">Overlaps another favorite</p>
        )}
      </div>

      <KeywordTags keywords={keywords} />
    </article>
  )
}

export default SessionCard
