import { useEffect, useState } from 'react'

// A shared "current time" ticking on an interval, so "happening now"/"starting soon"
// indicators stay correct for a long-lived open tab without needing a page reload.
export function useNow(intervalMs = 60_000): Date {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])

  return now
}
