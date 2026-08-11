import FilterGroup from '@/components/program/FilterGroup'
import { type ProgramFacets, type ProgramFilters } from '@/lib/program'

export type FilterKey = 'formats' | 'rooms' | 'keywords' | 'languages'

const FilterPanel = ({
  facets,
  filters,
  filterCount,
  onToggle,
  onClear,
}: {
  facets: ProgramFacets
  filters: ProgramFilters
  filterCount: number
  onToggle: (key: FilterKey, value: string) => void
  onClear: () => void
}) => (
  <div className="grid grid-cols-1 gap-6 p-5 mb-6 sm:grid-cols-2 rounded-3xl bg-base-200">
    <FilterGroup title="Format" options={facets.formats} selected={filters.formats} onToggle={(v) => onToggle('formats', v)} />
    <FilterGroup title="Language" options={facets.languages} selected={filters.languages} onToggle={(v) => onToggle('languages', v)} />
    <FilterGroup title="Room" options={facets.rooms} selected={filters.rooms} onToggle={(v) => onToggle('rooms', v)} />
    {filterCount > 0 && (
      <div className="sm:col-span-2">
        <button type="button" onClick={onClear} className="text-xs font-medium underline text-secondary hover:text-primary">
          Clear all filters
        </button>
      </div>
    )}
  </div>
)

export default FilterPanel
