import { useEffect, useState } from 'react'

// Ticks every second, independent of the page's shared (60s-resolution) `now` clock —
// a countdown needs second-level granularity that the rest of the program view doesn't.
function useTickingNow(): Date {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  return now
}

const UNIT_MS = { days: 86_400_000, hours: 3_600_000, minutes: 60_000, seconds: 1_000 } as const

function splitDuration(remainingMs: number) {
  let rest = Math.max(0, remainingMs)
  const days = Math.floor(rest / UNIT_MS.days)
  rest -= days * UNIT_MS.days
  const hours = Math.floor(rest / UNIT_MS.hours)
  rest -= hours * UNIT_MS.hours
  const minutes = Math.floor(rest / UNIT_MS.minutes)
  rest -= minutes * UNIT_MS.minutes
  const seconds = Math.floor(rest / UNIT_MS.seconds)
  return { days, hours, minutes, seconds }
}

const LiveCountdown = ({ target }: { target: Date }) => {
  const now = useTickingNow()
  const { days, hours, minutes, seconds } = splitDuration(target.getTime() - now.getTime())

  return (
    <div className="px-5 py-12 text-center rounded-3xl bg-base-200">
      <p className="m-0 font-semibold text-primary">The conference hasn&apos;t started yet</p>

      <div
        role="timer"
        aria-live="off"
        aria-label={`Starts in ${days} days, ${hours} hours and ${minutes} minutes`}
        className="flex items-center justify-center gap-4 mt-6 sm:gap-8"
      >
        {[
          { label: 'days', value: days },
          { label: 'hours', value: hours },
          { label: 'minutes', value: minutes },
          { label: 'seconds', value: seconds },
        ].map(({ label, value }) => (
          <div key={label} className="flex flex-col items-center min-w-14 sm:min-w-16">
            <span className="text-3xl font-bold tabular-nums text-accent-primary sm:text-4xl">{String(value).padStart(2, '0')}</span>
            <span className="text-xs tracking-widest uppercase text-secondary">{label}</span>
          </div>
        ))}
      </div>

      <p className="m-0 mt-6 text-sm text-secondary">Check back once the doors open to see what&apos;s happening live.</p>
    </div>
  )
}

export default LiveCountdown
