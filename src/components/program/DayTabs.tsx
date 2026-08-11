import { formatDayLabel } from '@/lib/program'

const DayTabs = ({ days, activeDay, onSelect }: { days: string[]; activeDay: string | null; onSelect: (day: string) => void }) => (
  <div role="tablist" aria-label="Conference day" className="flex gap-2 mb-8 overflow-x-auto">
    {days.map((d) => (
      <button
        key={d}
        role="tab"
        aria-selected={activeDay === d}
        type="button"
        onClick={() => onSelect(d)}
        className={`shrink-0 px-4 py-1.5 text-xs font-semibold rounded-full transition-colors ${
          activeDay === d ? 'bg-accent-primary text-base-200' : 'bg-base-200 text-secondary hover:text-primary'
        }`}
      >
        {formatDayLabel(d)}
      </button>
    ))}
  </div>
)

export default DayTabs
