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
      <h3 className="m-0 text-xs font-semibold tracking-widest uppercase text-secondary">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((value) => {
          const active = selected.has(value)
          return (
            <button
              key={value}
              type="button"
              onClick={() => onToggle(value)}
              aria-pressed={active}
              className={`px-3 py-1 text-xs font-medium transition-colors rounded-full border outline-none focus-visible:ring-2 focus-visible:ring-accent-primary ${
                active
                  ? 'bg-accent-primary/20 border-accent-primary text-accent-primary'
                  : 'bg-base-100/40 border-base-content/10 text-secondary hover:border-accent-primary/50'
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
