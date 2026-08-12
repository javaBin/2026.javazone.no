import { useCallback, useEffect, useState } from 'react'

import { fetchProgram, type Session } from '@/lib/fetchProgram'

const CACHE_KEY = 'jz-program-cache-v1'
const REVALIDATE_INTERVAL_MS = 5 * 60 * 1000 // keeps a long-lived tab fresh during the live event
const MIN_REVALIDATE_GAP_MS = 30 * 1000 // avoid refetching on every quick remount/navigation

let cache: Session[] | null = null
let liveSince: number | null = null // set once a live fetch has actually succeeded this tab session
let inFlight: Promise<Session[]> | null = null
let lastFetchAttemptAt = 0

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
  // Seed instantly from whatever we've got (in-memory this tab, or last session's
  // localStorage copy) instead of always blocking on a network round-trip.
  const [sessions, setSessions] = useState<Session[]>(() => {
    cache ??= readCache()
    return cache ?? []
  })
  const [loading, setLoading] = useState<boolean>(() => cache === null)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback((opts?: { silent?: boolean }) => {
    const silent = opts?.silent ?? false
    if (silent && Date.now() - lastFetchAttemptAt < MIN_REVALIDATE_GAP_MS) return
    lastFetchAttemptAt = Date.now()
    if (!silent) setLoading(true)

    const hadLiveData = liveSince !== null
    inFlight ??= fetchProgram()

    inFlight
      .then((data) => {
        cache = data
        liveSince = Date.now()
        writeCache(data)
        setSessions(data)
        setError(null)
      })
      .catch((err: unknown) => {
        // A background revalidation hiccup shouldn't nuke data we already confirmed live.
        if (hadLiveData) return
        const cached = cache ?? readCache()
        if (cached) {
          cache = cached
          setSessions(cached)
        } else {
          setError(err instanceof Error ? err.message : 'Unknown error')
        }
      })
      .finally(() => {
        inFlight = null
        if (!silent) setLoading(false)
      })
  }, [])

  useEffect(() => {
    load({ silent: cache !== null })

    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') load({ silent: true })
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    const interval = setInterval(() => load({ silent: true }), REVALIDATE_INTERVAL_MS)

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange)
      clearInterval(interval)
    }
  }, [load])

  return { sessions, loading, error, retry: () => load() }
}
