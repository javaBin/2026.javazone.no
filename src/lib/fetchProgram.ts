export interface Speaker {
  name: string
  bio?: string
  twitter?: string
  linkedin?: string
  bluesky?: string
}

export interface Session {
  id: string
  sessionId: string
  conferenceId: string
  title: string
  abstract: string
  format: string
  language: string
  length: string
  intendedAudience: string
  suggestedKeywords: string
  workshopPrerequisites?: string
  speakers: Speaker[]
  room?: string
  startTime?: string
  endTime?: string
  startTimeZulu?: string
  endTimeZulu?: string
  startSlot?: string
  startSlotZulu?: string
  video?: string
  feedback_url?: string
}

function isSessionsResponse(value: unknown): value is { sessions: Session[] } {
  return !!value && typeof value === 'object' && Array.isArray((value as { sessions?: unknown }).sessions)
}

export async function fetchProgram(): Promise<Session[]> {
  const res = await fetch('https://sleepingpill.javazone.no/public/allSessions/javazone_2026')
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data: unknown = await res.json()
  if (!isSessionsResponse(data)) throw new Error('Unexpected response shape')
  return data.sessions.filter((s) => s.title)
}
