const FilterGroup = ({
  title,
  options,
  selected,
  onToggle,
  labels,
}: {
  title: string
  options: string[]
  selected: Set<string>
  onToggle: (value: string) => void
  labels?: Record<string, string>
}) => {
  if (!options.length) return null

  return (
    <div className="flex flex-col gap-2">
      <h3 className="m-0 text-xs font-semibold tracking-widest uppercase text-muted">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((value) => {
          const active = selected.has(value)
          return (
            <button
              key={value}
              type="button"
              onClick={() => onToggle(value)}
              aria-pressed={active}
              className={`px-3 py-1 text-xs font-medium transition-colors rounded-full border outline-none focus-visible:ring-2 focus-visible:ring-brand ${
                active ? 'bg-brand/20 border-brand text-brand' : 'bg-canvas/40 border-line text-muted hover:border-brand/50'
              }`}
            >
              {labels?.[value] ?? value}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default FilterGroup
