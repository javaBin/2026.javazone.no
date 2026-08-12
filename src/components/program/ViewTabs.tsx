import { type KeyboardEvent, useRef } from 'react'

import { type ProgramView } from '@/lib/program'

const TABS: ProgramView[] = ['schedule', 'my-schedule', 'live']

const TAB_LABEL: Record<ProgramView, string> = {
  schedule: 'Program',
  'my-schedule': 'My schedule',
  live: 'Live',
}

const TAB_TITLE: Record<ProgramView, string> = {
  schedule: 'Browse the full conference schedule',
  'my-schedule': 'Show only the sessions you have favorited',
  live: "Show what's happening now and what's up next",
}

const ViewTabs = ({ view, favoriteCount, onChange }: { view: ProgramView; favoriteCount: number; onChange: (view: ProgramView) => void }) => {
  const tabRefs = useRef<Partial<Record<ProgramView, HTMLButtonElement | null>>>({})

  // Standard ARIA tabs keyboard pattern: only the active tab sits in the normal tab
  // order (tabIndex 0), the rest are reachable via arrow keys (roving tabindex).
  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
    e.preventDefault()
    const nextIndex = e.key === 'ArrowRight' ? (index + 1) % TABS.length : (index - 1 + TABS.length) % TABS.length
    const nextTab = TABS[nextIndex]
    tabRefs.current[nextTab]?.focus()
    onChange(nextTab)
  }

  return (
    <div role="tablist" aria-label="Program view" className="flex gap-6 mb-6 border-b border-base-content/10">
      {TABS.map((v, index) => (
        <button
          key={v}
          id={`view-tab-${v}`}
          ref={(el) => {
            tabRefs.current[v] = el
          }}
          type="button"
          role="tab"
          title={TAB_TITLE[v]}
          aria-selected={view === v}
          aria-controls="program-panel"
          tabIndex={view === v ? 0 : -1}
          onClick={() => onChange(v)}
          onKeyDown={(e) => onKeyDown(e, index)}
          className={`flex items-center gap-2 pb-3 -mb-px text-sm font-semibold transition-colors border-b-2 rounded-t outline-none focus-visible:ring-2 focus-visible:ring-accent-primary ${
            view === v ? 'border-accent-primary text-primary' : 'border-transparent text-secondary hover:text-primary'
          }`}
        >
          {TAB_LABEL[v]}
          {v === 'my-schedule' && <span className="px-2 py-0.5 text-[11px] rounded-full bg-base-200 text-secondary">{favoriteCount}</span>}
        </button>
      ))}
    </div>
  )
}

export default ViewTabs
