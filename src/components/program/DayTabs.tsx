import { type KeyboardEvent, useRef } from 'react'

import { ALL_DAYS, formatDayLabel } from '@/lib/program'

const DayTabs = ({
  days,
  activeDay,
  onSelect,
  counts,
}: {
  days: string[]
  activeDay: string | null
  onSelect: (day: string) => void
  // Result counts per day, e.g. while searching/filtering — omit to hide the badges entirely.
  counts?: Map<string, number>
}) => {
  const tabs = [ALL_DAYS, ...days]
  const tabRefs = useRef<Partial<Record<string, HTMLButtonElement | null>>>({})

  const countFor = (d: string): number | null => {
    if (!counts) return null
    if (d === ALL_DAYS) return Array.from(counts.values()).reduce((sum, c) => sum + c, 0)
    return counts.get(d) ?? 0
  }

  // Standard ARIA tabs keyboard pattern: only the active tab sits in the normal tab
  // order (tabIndex 0), the rest are reachable via arrow keys (roving tabindex).
  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
    e.preventDefault()
    const nextIndex = e.key === 'ArrowRight' ? (index + 1) % tabs.length : (index - 1 + tabs.length) % tabs.length
    const nextTab = tabs[nextIndex]
    tabRefs.current[nextTab]?.focus()
    onSelect(nextTab)
  }

  return (
    <div role="tablist" aria-label="Conference day" className="flex gap-2 mb-8 overflow-x-auto no-scrollbar">
      {tabs.map((d, index) => {
        const label = d === ALL_DAYS ? 'All' : formatDayLabel(d)
        const count = countFor(d)
        return (
          <button
            key={d}
            id={`day-tab-${d}`}
            ref={(el) => {
              tabRefs.current[d] = el
            }}
            role="tab"
            title={
              count === null
                ? d === ALL_DAYS
                  ? 'Show sessions from every day'
                  : `Show sessions from ${formatDayLabel(d)}`
                : `${count} matching session${count === 1 ? '' : 's'} ${d === ALL_DAYS ? 'across every day' : `on ${formatDayLabel(d)}`}`
            }
            aria-selected={activeDay === d}
            aria-controls="program-panel"
            tabIndex={activeDay === d ? 0 : -1}
            type="button"
            onClick={() => onSelect(d)}
            onKeyDown={(e) => onKeyDown(e, index)}
            className={`shrink-0 px-4 py-1.5 text-xs font-semibold rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent-primary ${
              activeDay === d ? 'bg-accent-primary text-base-300' : 'bg-base-200 text-secondary hover:text-primary'
            }`}
          >
            {label}
            {count !== null && <span className="ml-1 opacity-70">({count})</span>}
          </button>
        )
      })}
    </div>
  )
}

export default DayTabs
