import type { Session } from '@/lib/fetchProgram'

export interface ProgramFilters {
  query: string
  day: string | null
  formats: Set<string>
  rooms: Set<string>
  languages: Set<string>
}

export type ProgramView = 'schedule' | 'my-schedule'

export const FORMAT_LABEL: Record<string, string> = {
  'lightning-talk': 'Lightning Talk',
  presentation: 'Presentation',
  workshop: 'Workshop',
}

export const LANGUAGE_LABEL: Record<string, string> = { no: 'Norwegian', en: 'English' }

export function getFormatLabel(session: Session): string {
  return FORMAT_LABEL[session.format] ?? session.format
}

export function getLanguageLabel(session: Session): string {
  return LANGUAGE_LABEL[session.language] ?? session.language
}

export function createEmptyFilters(): ProgramFilters {
  return { query: '', day: null, formats: new Set(), rooms: new Set(), languages: new Set() }
}

export function getSessionStart(session: Session): Date | null {
  const raw = session.startTimeZulu ?? session.startTime
  if (!raw) return null
  const date = new Date(raw)
  return isNaN(date.getTime()) ? null : date
}

export function getSessionEnd(session: Session): Date | null {
  const raw = session.endTimeZulu ?? session.endTime
  if (raw) {
    const date = new Date(raw)
    if (!isNaN(date.getTime())) return date
  }
  const start = getSessionStart(session)
  const lengthMin = Number(session.length)
  if (start && lengthMin) return new Date(start.getTime() + lengthMin * 60000)
  return null
}

// The conference is a single physical event in Lillestrøm — always render session
// times/days in Oslo's wall-clock time, regardless of the viewer's own timezone.
const CONFERENCE_TIME_ZONE = 'Europe/Oslo'

function getOsloParts(date: Date) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: CONFERENCE_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(date)

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '00'
  return { year: get('year'), month: get('month'), day: get('day'), hour: get('hour'), minute: get('minute') }
}

export function getDayKey(session: Session): string {
  const start = getSessionStart(session)
  if (!start) return 'unknown'
  const { year, month, day } = getOsloParts(start)
  return `${year}-${month}-${day}`
}

export function formatDayLabel(key: string): string {
  if (key === 'unknown') return 'Unscheduled'
  const [year, month, day] = key.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })
}

export function formatTime(date: Date | null): string {
  if (!date) return '?'
  const { hour, minute } = getOsloParts(date)
  return `${hour}:${minute}`
}

export function getDurationMinutes(session: Session): number | null {
  const start = getSessionStart(session)
  const end = getSessionEnd(session)
  if (start && end) return Math.round((end.getTime() - start.getTime()) / 60000)
  const length = Number(session.length)
  return Number.isFinite(length) && length > 0 ? length : null
}

export function formatDuration(minutes: number | null): string | null {
  return minutes ? `${minutes} min` : null
}

export function getKeywords(session: Session): string[] {
  return (
    session.suggestedKeywords
      ?.split(',')
      .map((k) => k.trim())
      .filter(Boolean) ?? []
  )
}

export function getDays(sessions: Session[]): string[] {
  const days = new Set(sessions.map(getDayKey))
  return Array.from(days).sort()
}

export interface SessionGroup {
  time: string
  sessions: Session[]
}

export function groupSessionsByTime(sessions: Session[]): SessionGroup[] {
  const sorted = [...sessions].sort((a, b) => {
    const at = getSessionStart(a)?.getTime() ?? Infinity
    const bt = getSessionStart(b)?.getTime() ?? Infinity
    return at - bt
  })

  const groups = new Map<string, Session[]>()
  for (const s of sorted) {
    const start = getSessionStart(s)
    const label = start ? formatTime(start) : 'Time TBA'
    if (!groups.has(label)) groups.set(label, [])
    groups.get(label)!.push(s)
  }

  return Array.from(groups.entries()).map(([time, sessions]) => ({ time, sessions }))
}

export interface ProgramFacets {
  formats: string[]
  rooms: string[]
  languages: string[]
}

export function getFacets(sessions: Session[]): ProgramFacets {
  const formats = new Set<string>()
  const rooms = new Set<string>()
  const languages = new Set<string>()

  for (const s of sessions) {
    if (s.format) formats.add(s.format)
    if (s.room) rooms.add(s.room)
    if (s.language) languages.add(s.language)
  }

  const sort = (set: Set<string>) => Array.from(set).sort((a, b) => a.localeCompare(b))
  return { formats: sort(formats), rooms: sort(rooms), languages: sort(languages) }
}

export function matchesFilters(session: Session, filters: ProgramFilters, view: ProgramView, favorites: Set<string>): boolean {
  if (view === 'my-schedule' && !favorites.has(session.sessionId)) return false
  if (filters.day && getDayKey(session) !== filters.day) return false
  if (filters.formats.size && !filters.formats.has(session.format)) return false
  if (filters.rooms.size && !(session.room && filters.rooms.has(session.room))) return false
  if (filters.languages.size && !filters.languages.has(session.language)) return false

  if (filters.query) {
    const haystack = [session.title, session.abstract, session.room, ...getKeywords(session), ...session.speakers.map((s) => s.name)]
      .join(' ')
      .toLowerCase()
    if (!haystack.includes(filters.query.toLowerCase())) return false
  }

  return true
}

export function activeFilterCount(filters: ProgramFilters): number {
  return filters.formats.size + filters.rooms.size + filters.languages.size
}

export function computeConflicts(sessions: Session[], favorites: Set<string>): Set<string> {
  const favSessions = sessions
    .filter((s) => favorites.has(s.sessionId))
    .map((s) => ({ session: s, start: getSessionStart(s), end: getSessionEnd(s) }))
    .filter((s): s is { session: Session; start: Date; end: Date } => s.start !== null && s.end !== null)

  const conflicts = new Set<string>()
  for (let i = 0; i < favSessions.length; i++) {
    for (let j = i + 1; j < favSessions.length; j++) {
      const a = favSessions[i]
      const b = favSessions[j]
      if (a.start < b.end && b.start < a.end) {
        conflicts.add(a.session.sessionId)
        conflicts.add(b.session.sessionId)
      }
    }
  }
  return conflicts
}
