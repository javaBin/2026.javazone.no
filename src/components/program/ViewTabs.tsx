import { type ProgramView } from '@/lib/program'

const TABS: ProgramView[] = ['schedule', 'my-schedule']

const ViewTabs = ({ view, favoriteCount, onChange }: { view: ProgramView; favoriteCount: number; onChange: (view: ProgramView) => void }) => (
  <div role="tablist" aria-label="Program view" className="flex gap-6 mb-6 border-b border-base-content/10">
    {TABS.map((v) => (
      <button
        key={v}
        type="button"
        role="tab"
        aria-selected={view === v}
        onClick={() => onChange(v)}
        className={`flex items-center gap-2 pb-3 -mb-px text-sm font-semibold transition-colors border-b-2 ${
          view === v ? 'border-accent-primary text-primary' : 'border-transparent text-secondary hover:text-primary'
        }`}
      >
        {v === 'schedule' ? 'Program' : 'My schedule'}
        {v === 'my-schedule' && <span className="px-2 py-0.5 text-[11px] rounded-full bg-base-200 text-secondary">{favoriteCount}</span>}
      </button>
    ))}
  </div>
)

export default ViewTabs
