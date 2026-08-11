import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { BubbleField, Heading } from '@/components'
import DayTabs from '@/components/program/DayTabs'
import { type FilterKey } from '@/components/program/FilterPanel'
import FilterPanel from '@/components/program/FilterPanel'
import ProgramSkeleton from '@/components/program/ProgramSkeleton'
import ScheduleList from '@/components/program/ScheduleList'
import SearchToolbar from '@/components/program/SearchToolbar'
import ViewTabs from '@/components/program/ViewTabs'
import { useFavorites } from '@/hooks/useFavorites'
import { useNow } from '@/hooks/useNow'
import { useProgram } from '@/hooks/useProgram'
import {
  activeFilterCount,
  ALL_DAYS,
  computeConflicts,
  createEmptyFilters,
  getDays,
  getFacets,
  groupSessionsByTime,
  matchesFilters,
  type ProgramFilters,
  type ProgramView,
  sortSessionsByStart,
} from '@/lib/program'

const ProgramPage = () => {
  const { sessions, loading, error, stale, retry } = useProgram()
  const { favorites, toggle: toggleFavorite } = useFavorites()
  const navigate = useNavigate()
  const now = useNow()

  const [view, setView] = useState<ProgramView>('schedule')
  const [filterPanelOpen, setFilterPanelOpen] = useState(false)
  const [filters, setFilters] = useState<ProgramFilters>(createEmptyFilters)

  const days = useMemo(() => getDays(sessions), [sessions])
  const facets = useMemo(() => getFacets(sessions), [sessions])
  const conflicts = useMemo(() => computeConflicts(sessions, favorites), [sessions, favorites])

  useEffect(() => {
    if (!days.length) return
    if (!filters.day || (filters.day !== ALL_DAYS && !days.includes(filters.day))) {
      setFilters((f) => ({ ...f, day: days[0] }))
    }
  }, [days, filters.day])

  const filtered = useMemo(() => sessions.filter((s) => matchesFilters(s, filters, view, favorites)), [sessions, filters, view, favorites])
  const showTimeHeaders = filters.day !== ALL_DAYS
  const groups = useMemo(
    () => (showTimeHeaders ? groupSessionsByTime(filtered) : [{ time: 'all', sessions: sortSessionsByStart(filtered) }]),
    [filtered, showTimeHeaders],
  )
  const filterCount = activeFilterCount(filters)

  const toggleFilterValue = (key: FilterKey, value: string) => {
    setFilters((f) => {
      const next = new Set(f[key])
      if (next.has(value)) next.delete(value)
      else next.add(value)
      return { ...f, [key]: next }
    })
  }

  const clearFilters = () => setFilters((f) => ({ ...f, formats: new Set(), rooms: new Set(), languages: new Set() }))

  return (
    <div className="min-h-screen pt-20 pb-24">
      <BubbleField variant="subtle" />
      <div className="relative z-20 px-4 mx-auto max-w-7xl md:px-8">
        <div className="py-8">
          <Heading level="h1">Program</Heading>
        </div>

        <ViewTabs view={view} favoriteCount={favorites.size} onChange={setView} />

        <SearchToolbar
          query={filters.query}
          onQueryChange={(query) => setFilters((f) => ({ ...f, query }))}
          filterPanelOpen={filterPanelOpen}
          onToggleFilterPanel={() => setFilterPanelOpen((v) => !v)}
          filterCount={filterCount}
        />

        {filterPanelOpen && (
          <FilterPanel facets={facets} filters={filters} filterCount={filterCount} onToggle={toggleFilterValue} onClear={clearFilters} />
        )}

        {days.length > 1 && <DayTabs days={days} activeDay={filters.day} onSelect={(day) => setFilters((f) => ({ ...f, day }))} />}

        {loading && <ProgramSkeleton />}

        {stale && !loading && (
          <div className="flex items-center justify-between gap-3 px-4 py-3 mb-6 text-sm rounded-2xl bg-accent-secondary/10 text-accent-secondary">
            <span>Showing the last loaded program — couldn't reach the live schedule just now.</span>
            <button type="button" onClick={retry} className="font-semibold underline shrink-0 hover:opacity-80">
              Retry
            </button>
          </div>
        )}

        {error && !loading && (
          <div className="px-5 py-12 text-center rounded-3xl bg-base-200">
            <p className="m-0 font-semibold text-primary">Could not load program</p>
            <p className="m-0 mt-2 text-sm text-secondary">{error}</p>
            <button
              type="button"
              onClick={retry}
              className="px-4 py-2 mt-4 text-sm font-semibold rounded-2xl bg-accent-primary/20 text-accent-primary hover:bg-accent-primary/30"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="px-5 py-12 text-center rounded-3xl bg-base-200">
            <p className="m-0 text-secondary">
              {view === 'my-schedule'
                ? 'No favorites yet. Tap the favorite icon on any session to add it to your schedule.'
                : 'No sessions match your filters.'}
            </p>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <ScheduleList
            groups={groups}
            favorites={favorites}
            conflicts={conflicts}
            onToggleFavorite={toggleFavorite}
            onOpenSession={(session) => navigate(`/program/${session.sessionId}`)}
            showTimeHeaders={showTimeHeaders}
            now={now}
          />
        )}
      </div>
    </div>
  )
}

export default ProgramPage
