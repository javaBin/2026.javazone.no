import { useEffect, useState } from 'react'

import { fetchProgram, type Session } from '@/lib/fetchProgram'

const CACHE_KEY = 'jz-program-cache-v1'

let cache: Session[] | null = null
let inFlight: Promise<Session[]> | null = null

function readCache(): Session[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    return raw ? (JSON.parse(raw) as Session[]) : null
  } catch {
    return null
  }
}

function writeCache(sessions: Session[]) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(sessions))
  } catch {
    // storage unavailable (private mode / quota) — safe to skip caching
  }
}

export function useProgram() {
  const [sessions, setSessions] = useState<Session[]>(cache ?? [])
  const [loading, setLoading] = useState(!cache)
  const [error, setError] = useState<string | null>(null)
  const [stale, setStale] = useState(false)

  const load = () => {
    setLoading(true)
    inFlight ??= fetchProgram()

    inFlight
      .then((data) => {
        cache = data
        writeCache(data)
        setSessions(data)
        setError(null)
        setStale(false)
      })
      .catch((err: unknown) => {
        const cached = readCache()
        if (cached) {
          cache = cached
          setSessions(cached)
          setStale(true)
        } else {
          setError(err instanceof Error ? err.message : 'Unknown error')
        }
      })
      .finally(() => {
        inFlight = null
        setLoading(false)
      })
  }

  useEffect(() => {
    if (cache) return
    load()
  }, [])

  return { sessions, loading, error, stale, retry: load }
}
