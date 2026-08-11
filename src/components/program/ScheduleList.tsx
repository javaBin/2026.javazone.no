import { Heading } from '@/components'
import SessionCard from '@/components/program/SessionCard'
import { type Session } from '@/lib/fetchProgram'
import { type SessionGroup } from '@/lib/program'

const ScheduleList = ({
  groups,
  favorites,
  conflicts,
  onToggleFavorite,
  onOpenSession,
}: {
  groups: SessionGroup[]
  favorites: Set<string>
  conflicts: Set<string>
  onToggleFavorite: (sessionId: string) => void
  onOpenSession: (session: Session) => void
}) => (
  <div className="flex flex-col gap-10">
    {groups.map((group) => (
      <section key={group.time}>
        <div className="flex items-center gap-4 mb-4">
          <Heading level="h2">{group.time}</Heading>
          <div className="flex-1 h-px bg-primary/20" />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {group.sessions.map((s) => (
            <SessionCard
              key={s.sessionId}
              session={s}
              isFavorite={favorites.has(s.sessionId)}
              isConflict={conflicts.has(s.sessionId)}
              onToggleFavorite={() => onToggleFavorite(s.sessionId)}
              onOpen={() => onOpenSession(s)}
            />
          ))}
        </div>
      </section>
    ))}
  </div>
)

export default ScheduleList
