const SearchToolbar = ({
  query,
  onQueryChange,
  filterPanelOpen,
  onToggleFilterPanel,
  filterCount,
}: {
  query: string
  onQueryChange: (query: string) => void
  filterPanelOpen: boolean
  onToggleFilterPanel: () => void
  filterCount: number
}) => (
  <div className="flex items-center gap-3 mb-6">
    <input
      type="search"
      value={query}
      onChange={(e) => onQueryChange(e.target.value)}
      placeholder="Search talks, speakers, keywords…"
      aria-label="Search sessions"
      className="flex-1 min-w-0 px-4 py-2 text-sm rounded-2xl bg-base-200 text-primary placeholder:text-secondary/60 focus:outline-none focus:ring-2 focus:ring-accent-primary/50"
    />
    <button
      type="button"
      onClick={onToggleFilterPanel}
      aria-expanded={filterPanelOpen}
      title={filterPanelOpen ? 'Hide filters' : 'Show format, room, and language filters'}
      className={`flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors rounded-2xl shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-accent-primary ${
        filterPanelOpen ? 'bg-accent-primary/20 text-accent-primary' : 'bg-base-200 text-secondary hover:text-primary'
      }`}
    >
      Filters
      {filterCount > 0 && <span className="px-2 py-0.5 text-[11px] rounded-full bg-accent-primary/30 text-accent-primary">{filterCount}</span>}
    </button>
  </div>
)

export default SearchToolbar
