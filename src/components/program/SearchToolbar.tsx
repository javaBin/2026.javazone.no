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
  <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-center">
    <input
      type="search"
      value={query}
      onChange={(e) => onQueryChange(e.target.value)}
      placeholder="Search talks, speakers, keywords…"
      aria-label="Search sessions"
      className="flex-1 px-4 py-2 text-sm rounded-2xl bg-base-200 text-primary placeholder:text-secondary/60 focus:outline-none focus:ring-2 focus:ring-accent-primary/50"
    />
    <button
      type="button"
      onClick={onToggleFilterPanel}
      aria-expanded={filterPanelOpen}
      className={`flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-colors rounded-2xl ${
        filterPanelOpen ? 'bg-accent-primary/20 text-accent-primary' : 'bg-base-200 text-secondary hover:text-primary'
      }`}
    >
      Filters
      {filterCount > 0 && <span className="px-2 py-0.5 text-[11px] rounded-full bg-accent-primary/30 text-accent-primary">{filterCount}</span>}
    </button>
  </div>
)

export default SearchToolbar
