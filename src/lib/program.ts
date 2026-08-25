import type { Session } from '@/lib/fetchProgram'

export interface ProgramFilters {
  query: string
  day: string | null
  formats: Set<string>
  rooms: Set<string>
  languages: Set<string>
}

export type ProgramView = 'schedule' | 'my-schedule' | 'live'

// Sentinel `day` value meaning "don't filter by day at all" — distinct from `null`,
// which means "no explicit choice yet" and gets auto-resolved to the first real day.
export const ALL_DAYS = 'all'

export const FORMAT_LABEL: Record<string, string> = {
  'lightning-talk': 'Lightning Talk',
  presentation: 'Presentation',
  workshop: 'Workshop',
}

export const LANGUAGE_LABEL: Record<string, string> = { no: 'Norwegian', en: 'English' }

export function getFormatLabel(session: Session): string {
  return FORMAT_LABEL[session.format] ?? session.format
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
  if (key === 'unknown') return 'Talks'
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
  if (!minutes) return null
  if (minutes < 60) return `${minutes} min`

  const hours = Math.floor(minutes / 60)
  const remainder = minutes % 60
  return remainder === 0 ? `${hours}h` : `${hours}h ${remainder}min`
}

// Some speakers filled the keyword field in with a single string using #, -, ;, · or ' as an
// informal separator instead of commas (the ' case is each tag individually quoted, e.g.
// "'Linux' 'Containers'" — splitting on it and dropping the now-empty bits between quotes
// recovers the tags). A single dash or apostrophe is often legitimate (e.g. "front-end",
// "O'Reilly"), so only treat a character as the real separator once it shows up more than twice.
const KEYWORD_MISUSE_DELIMITERS = ['#', '-', ';', '·', "'"]
const KEYWORD_MISUSE_THRESHOLD = 2

function splitMisusedKeyword(keyword: string): string[] {
  for (const delimiter of KEYWORD_MISUSE_DELIMITERS) {
    if (keyword.split(delimiter).length - 1 > KEYWORD_MISUSE_THRESHOLD) {
      return keyword
        .split(delimiter)
        .map((k) => k.trim())
        .filter(Boolean)
    }
  }
  return [keyword]
}

export function getKeywords(session: Session): string[] {
  return (
    session.suggestedKeywords
      ?.split(',')
      .map((k) => k.trim())
      .filter(Boolean)
      .flatMap(splitMisusedKeyword) ?? []
  )
}

// "stream api" -> "Stream Api" — capitalizes just the first letter of each word (so an
// already-uppercase acronym like "API" survives untouched), keeping the spaces between them.
export function formatKeywordTag(keyword: string): string {
  return keyword
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function getDays(sessions: Session[]): string[] {
  const days = new Set(sessions.map(getDayKey))
  return Array.from(days).sort()
}

export interface SessionGroup {
  time: string
  sessions: Session[]
}

// Sessions starting at the same time (parallel tracks) are then ordered by room, ascending
// (e.g. "Room 2" before "Room 10" — {numeric: true} keeps that natural rather than lexical).
export function sortSessionsByStart(sessions: Session[]): Session[] {
  return [...sessions].sort((a, b) => {
    const at = getSessionStart(a)?.getTime() ?? Infinity
    const bt = getSessionStart(b)?.getTime() ?? Infinity
    if (at !== bt) return at - bt
    return (a.room ?? '').localeCompare(b.room ?? '', undefined, { numeric: true })
  })
}

export const LIGHTNING_TALK_FORMAT = 'lightning-talk'
// Lightning talks are often scheduled a few minutes after the "main" slot they belong
// to, which would otherwise land them in their own sparse, single-talk time group. Fold
// a lightning-only group into the slot right before it as long as it starts soon after.
const LIGHTNING_MERGE_WINDOW_MS = 70 * 60 * 1000

export function isLightningTalk(session: Session): boolean {
  return session.format === LIGHTNING_TALK_FORMAT
}

export const WORKSHOP_FORMAT = 'workshop'
export const WORKSHOP_SIGNUP_URL = 'https://event.checkin.no/226598/java-zone-workshops-2026'

export function isWorkshop(session: Session): boolean {
  return session.format === WORKSHOP_FORMAT
}

// Lightning talks aren't called out with a format badge (see isWorkshop callers), so their
// title carries this label instead — kept as its own constant so callers can style it
// distinctly from the rest of the title (see SessionCard/TalkDetails).
export const LIGHTNING_TALK_LABEL = 'Lightning Talk: '

// Within a displayed time slot, lightning talks are folded in alongside (or after) the
// "main" sessions for that slot — see groupSessionsByTime below — so they're pushed to the
// end of the group rather than sorted purely by start time, keeping the main sessions
// together up top. Each half stays sorted by start time internally.
function sortWithLightningLast(sessions: Session[]): Session[] {
  const main = sortSessionsByStart(sessions.filter((s) => !isLightningTalk(s)))
  const lightning = sortSessionsByStart(sessions.filter(isLightningTalk))
  return [...main, ...lightning]
}

export interface DayGroup {
  day: string
  label: string
  timeGroups: SessionGroup[]
}

// My schedule view: group favorites by day (ignoring the day tab/filter entirely) with
// each day's sessions further broken down by time, same as the regular schedule view.
export function groupSessionsByDayAndTime(sessions: Session[]): DayGroup[] {
  const byDay = new Map<string, Session[]>()
  for (const s of sessions) {
    const day = getDayKey(s)
    if (!byDay.has(day)) byDay.set(day, [])
    byDay.get(day)!.push(s)
  }

  return Array.from(byDay.keys())
    .sort()
    .map((day) => ({ day, label: formatDayLabel(day), timeGroups: groupSessionsByTime(byDay.get(day)!) }))
}

export function groupSessionsByTime(sessions: Session[]): SessionGroup[] {
  const sorted = sortSessionsByStart(sessions)

  const order: string[] = []
  const byLabel = new Map<string, Session[]>()
  for (const s of sorted) {
    const start = getSessionStart(s)
    const label = start ? formatTime(start) : 'Time TBA'
    if (!byLabel.has(label)) {
      byLabel.set(label, [])
      order.push(label)
    }
    byLabel.get(label)!.push(s)
  }

  const merged: { time: string; sessions: Session[]; anchorMs: number | null }[] = []
  for (const label of order) {
    const groupSessions = byLabel.get(label)!
    const isLightningOnly = groupSessions.every(isLightningTalk)
    const startMs = getSessionStart(groupSessions[0])?.getTime() ?? null

    const prev = merged[merged.length - 1]
    if (isLightningOnly && prev?.anchorMs != null && startMs != null && startMs - prev.anchorMs <= LIGHTNING_MERGE_WINDOW_MS) {
      prev.sessions.push(...groupSessions)
    } else {
      merged.push({ time: label, sessions: groupSessions, anchorMs: startMs })
    }
  }

  return merged.map(({ time, sessions }) => ({ time, sessions: sortWithLightningLast(sessions) }))
}

const UNKNOWN_ROOM = 'Other'

export interface TimetableLane {
  room: string
  sessions: Session[]
}

export interface TimetableLayout {
  lanes: TimetableLane[]
  startMs: number
  endMs: number
}

// Room-by-time layout for a day with a lot of concurrent sessions (e.g. parallel workshop
// tracks) — one lane per room, sessions positioned by actual start time and duration so a
// caller can render a proportional Gantt-style timeline instead of a plain grouped list.
// Sessions with no resolvable start/end time are dropped, since they can't be positioned.
export function buildTimetableLayout(sessions: Session[]): TimetableLayout | null {
  const timed = sessions
    .map((s) => ({ session: s, start: getSessionStart(s), end: getSessionEnd(s) }))
    .filter((t): t is { session: Session; start: Date; end: Date } => t.start !== null && t.end !== null)

  if (!timed.length) return null

  const roomOf = (s: Session) => s.room ?? UNKNOWN_ROOM
  const rooms = Array.from(new Set(timed.map((t) => roomOf(t.session)))).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

  const lanes = rooms.map((room) => ({
    room,
    sessions: sortSessionsByStart(timed.filter((t) => roomOf(t.session) === room).map((t) => t.session)),
  }))

  const startMs = Math.min(...timed.map((t) => t.start.getTime()))
  const endMs = Math.max(...timed.map((t) => t.end.getTime()))

  return { lanes, startMs, endMs }
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

export function matchesFilters(session: Session, filters: ProgramFilters, view: ProgramView, favorites: ReadonlySet<string>): boolean {
  if (view === 'my-schedule' && !favorites.has(session.sessionId)) return false
  // Live view and My schedule both look across the whole event, not just whichever day
  // tab happens to be selected — that's unrelated UI state neither view exposes.
  if (view !== 'live' && view !== 'my-schedule' && filters.day && filters.day !== ALL_DAYS && getDayKey(session) !== filters.day) return false
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

// How many sessions match the current search/filters on each day, ignoring the day tab
// itself — lets the day tabs show a result count and lets callers detect when the selected
// day has gone empty so they can jump to a day that still has matches.
export function countSessionsByDay(
  sessions: Session[],
  filters: ProgramFilters,
  view: ProgramView,
  favorites: ReadonlySet<string>,
): Map<string, number> {
  const counts = new Map<string, number>()
  for (const session of sessions) {
    if (!matchesFilters(session, { ...filters, day: ALL_DAYS }, view, favorites)) continue
    const day = getDayKey(session)
    counts.set(day, (counts.get(day) ?? 0) + 1)
  }
  return counts
}

export type SessionTiming = 'now' | 'soon' | null

const SOON_WINDOW_MS = 30 * 60 * 1000

export function getSessionTiming(session: Session, now: Date): SessionTiming {
  const start = getSessionStart(session)
  if (!start) return null
  const end = getSessionEnd(session)
  const nowMs = now.getTime()
  const startMs = start.getTime()

  if (end && nowMs >= startMs && nowMs < end.getTime()) return 'now'
  if (nowMs < startMs && startMs - nowMs <= SOON_WINDOW_MS) return 'soon'
  return null
}

export interface LiveSessions {
  current: Session[]
  upNext: Session[]
}

// "Happening now" and "up next" for the Live view. Up-next isn't bound to a fixed lookahead
// window (unlike getSessionTiming's "soon") — it's always whatever starts earliest after now,
// so the view stays useful across breaks/gaps, not just in the last 30 minutes before a slot.
export function partitionLiveSessions(sessions: Session[], now: Date): LiveSessions {
  const nowMs = now.getTime()
  const current: Session[] = []
  let nextStartMs: number | null = null
  const upcoming: { session: Session; startMs: number }[] = []

  for (const s of sessions) {
    const start = getSessionStart(s)
    if (!start) continue
    const startMs = start.getTime()
    const end = getSessionEnd(s)

    if (end && nowMs >= startMs && nowMs < end.getTime()) {
      current.push(s)
    } else if (startMs > nowMs) {
      upcoming.push({ session: s, startMs })
      if (nextStartMs === null || startMs < nextStartMs) nextStartMs = startMs
    }
  }

  const upNext = nextStartMs === null ? [] : upcoming.filter((u) => u.startMs === nextStartMs).map((u) => u.session)
  return { current: sortSessionsByStart(current), upNext: sortSessionsByStart(upNext) }
}

// Earliest resolvable start time across the whole program — used to tell whether the
// conference has started yet at all, regardless of the currently selected day/filters.
export function getConferenceStart(sessions: Session[]): Date | null {
  let earliest: Date | null = null
  for (const s of sessions) {
    const start = getSessionStart(s)
    if (start && (!earliest || start.getTime() < earliest.getTime())) earliest = start
  }
  return earliest
}

export function computeConflicts(sessions: Session[], favorites: ReadonlySet<string>): Set<string> {
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
