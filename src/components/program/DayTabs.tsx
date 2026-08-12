import { type KeyboardEvent, useRef } from 'react'

import { ALL_DAYS, formatDayLabel } from '@/lib/program'

const DayTabs = ({ days, activeDay, onSelect }: { days: string[]; activeDay: string | null; onSelect: (day: string) => void }) => {
  const tabs = [ALL_DAYS, ...days]
  const tabRefs = useRef<Partial<Record<string, HTMLButtonElement | null>>>({})

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
    <div role="tablist" aria-label="Conference day" className="flex gap-2 mb-8 overflow-x-auto">
      {tabs.map((d, index) => (
        <button
          key={d}
          id={`day-tab-${d}`}
          ref={(el) => {
            tabRefs.current[d] = el
          }}
          role="tab"
          title={d === ALL_DAYS ? 'Show sessions from every day' : `Show sessions from ${formatDayLabel(d)}`}
          aria-selected={activeDay === d}
          aria-controls="program-panel"
          tabIndex={activeDay === d ? 0 : -1}
          type="button"
          onClick={() => onSelect(d)}
          onKeyDown={(e) => onKeyDown(e, index)}
          className={`shrink-0 px-4 py-1.5 text-xs font-semibold rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent-primary ${
            activeDay === d ? 'bg-accent-primary text-base-200' : 'bg-base-200 text-secondary hover:text-primary'
          }`}
        >
          {d === ALL_DAYS ? 'All' : formatDayLabel(d)}
        </button>
      ))}
    </div>
  )
}

export default DayTabs
