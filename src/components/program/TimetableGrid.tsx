import { Fragment } from 'react'

import TimetableBlock from '@/components/program/TimetableBlock'
import { type Session } from '@/lib/fetchProgram'
import { buildTimetableLayout, formatTime, getSessionEnd, getSessionStart } from '@/lib/program'

const MIN_BLOCK_MINUTES = 30 // width floor (as a share of the day) so short lightning talks stay legible
const LANE_HEIGHT_PX = 156
const ROOM_COLUMN_WIDTH_PX = 96

// Gantt-style room-by-time timeline for days with a lot of concurrent sessions (parallel
// workshop tracks) — rooms as horizontal lanes, sessions positioned by actual start time
// with width proportional to duration, so overlaps and gaps read at a glance. Positions are
// percentages of the day's span, so the whole thing scales to fit the available width
// instead of scrolling. Desktop only (see ProgramPage) — too cramped for a phone screen.
const TimetableGrid = ({
  sessions,
  favorites,
  conflicts,
  onToggleFavorite,
  now,
}: {
  sessions: Session[]
  favorites: Set<string>
  conflicts: Set<string>
  onToggleFavorite: (sessionId: string) => void
  now: Date
}) => {
  const layout = buildTimetableLayout(sessions)
  if (!layout) return null

  const { lanes, startMs, endMs } = layout
  const totalMinutes = Math.max((endMs - startMs) / 60000, MIN_BLOCK_MINUTES)
  const minWidthPct = (MIN_BLOCK_MINUTES / totalMinutes) * 100

  // Mark only the actual session start times, not a regular hourly grid.
  const startTimes = Array.from(new Set(lanes.flatMap((lane) => lane.sessions.map((s) => getSessionStart(s)!.getTime())))).sort((a, b) => a - b)

  return (
    <div className="hidden mx-0 mb-10 md:block">
      <div className="grid" style={{ gridTemplateColumns: `${ROOM_COLUMN_WIDTH_PX}px minmax(0, 1fr)` }}>
        <div />
        <div className="relative h-8">
          {startTimes.map((t) => (
            <span
              key={t}
              className="absolute top-0 pl-1.5 text-[14px] font-semibold text-primary"
              style={{ left: `${((t - startMs) / 60000 / totalMinutes) * 100}%` }}
            >
              {formatTime(new Date(t))}
            </span>
          ))}
        </div>

        {lanes.map((lane) => (
          <Fragment key={lane.room}>
            <div className="flex items-center px-2 text-xs font-semibold text-primary">{lane.room}</div>
            <div className="relative" style={{ height: LANE_HEIGHT_PX }}>
              {lane.sessions.map((s) => {
                const sessionStartMs = getSessionStart(s)!.getTime()
                const sessionEndMs = getSessionEnd(s)?.getTime() ?? sessionStartMs + MIN_BLOCK_MINUTES * 60000
                const leftPct = ((sessionStartMs - startMs) / 60000 / totalMinutes) * 100
                const widthPct = Math.max(((sessionEndMs - sessionStartMs) / 60000 / totalMinutes) * 100, minWidthPct)

                return (
                  <div key={s.sessionId} className="absolute top-1 bottom-1" style={{ left: `${leftPct}%`, width: `calc(${widthPct}% - 6px)` }}>
                    <TimetableBlock
                      session={s}
                      isFavorite={favorites.has(s.sessionId)}
                      isConflict={conflicts.has(s.sessionId)}
                      onToggleFavorite={() => onToggleFavorite(s.sessionId)}
                      now={now}
                    />
                  </div>
                )
              })}
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default TimetableGrid
