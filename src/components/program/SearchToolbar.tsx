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
    <label htmlFor="program-search" className="sr-only">
      Search sessions
    </label>
    <input
      id="program-search"
      type="search"
      value={query}
      onChange={(e) => onQueryChange(e.target.value)}
      placeholder="Search talks, speakers, keywords…"
      className="flex-1 min-w-0 px-4 py-2 text-sm rounded-2xl bg-surface text-ink placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-brand/50"
    />
    <button
      type="button"
      onClick={onToggleFilterPanel}
      aria-expanded={filterPanelOpen}
      title={filterPanelOpen ? 'Hide filters' : 'Show format, room, and language filters'}
      className={`flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors rounded-2xl shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-brand ${
        filterPanelOpen ? 'bg-brand/20 text-brand' : 'bg-surface text-muted hover:text-ink'
      }`}
    >
      Filters
      {filterCount > 0 && <span className="px-2 py-0.5 text-[11px] rounded-full bg-brand/30 text-brand">{filterCount}</span>}
    </button>
  </div>
)

export default SearchToolbar
