import { useEffect, useMemo, useState } from 'react'

import { BubbleField, Heading, LinkButton } from '@/components'
import DayTabs from '@/components/program/DayTabs'
import { type FilterKey } from '@/components/program/FilterPanel'
import FilterPanel from '@/components/program/FilterPanel'
import LiveCountdown from '@/components/program/LiveCountdown'
import ProgramSkeleton from '@/components/program/ProgramSkeleton'
import ScheduleList from '@/components/program/ScheduleList'
import SearchToolbar from '@/components/program/SearchToolbar'
import TimetableGrid from '@/components/program/TimetableGrid'
import ViewTabs from '@/components/program/ViewTabs'
import { useFavorites } from '@/hooks/useFavorites'
import { useMetaDescription } from '@/hooks/useMetaDescription'
import { useNow } from '@/hooks/useNow'
import { useProgram } from '@/hooks/useProgram'
import {
  activeFilterCount,
  ALL_DAYS,
  computeConflicts,
  countSessionsByDay,
  createEmptyFilters,
  getConferenceStart,
  getDays,
  getFacets,
  groupSessionsByDayAndTime,
  groupSessionsByTime,
  matchesFilters,
  partitionLiveSessions,
  type ProgramFilters,
  type ProgramView,
  type SessionGroup,
  sortSessionsByStart,
  WORKSHOP_SIGNUP_URL,
} from '@/lib/program'

const ProgramPage = () => {
  useMetaDescription(
    "Browse the full JavaZone 2026 schedule — search and filter talks and workshops, build your personal schedule, and see what's happening live at NOVA Spektrum.",
  )

  const { sessions, loading, error, retry } = useProgram()
  const { favorites, toggle: toggleFavorite } = useFavorites()
  const now = useNow()

  const [view, setView] = useState<ProgramView>('schedule')
  const [filterPanelOpen, setFilterPanelOpen] = useState(false)
  const [filters, setFilters] = useState<ProgramFilters>(createEmptyFilters)

  const days = useMemo(() => getDays(sessions), [sessions])
  const facets = useMemo(() => getFacets(sessions), [sessions])
  const conflicts = useMemo(() => computeConflicts(sessions, favorites), [sessions, favorites])
  const conferenceStart = useMemo(() => getConferenceStart(sessions), [sessions])
  const filterCount = activeFilterCount(filters)
  const isSearchingOrFiltering = filters.query.trim().length > 0 || filterCount > 0
  const dayCounts = useMemo(() => countSessionsByDay(sessions, filters, view, favorites), [sessions, filters, view, favorites])

  useEffect(() => {
    if (!days.length) return
    if (!filters.day || (filters.day !== ALL_DAYS && !days.includes(filters.day))) {
      setFilters((f) => ({ ...f, day: days[0] }))
    }
  }, [days, filters.day])

  // If a search/filter empties out the currently selected day, jump to the first day that
  // still has a match rather than leaving the visitor stranded on an empty tab.
  useEffect(() => {
    if (!isSearchingOrFiltering) return
    if (!filters.day || filters.day === ALL_DAYS) return
    if ((dayCounts.get(filters.day) ?? 0) > 0) return
    const dayWithMatches = days.find((d) => (dayCounts.get(d) ?? 0) > 0)
    if (dayWithMatches) setFilters((f) => ({ ...f, day: dayWithMatches }))
  }, [isSearchingOrFiltering, dayCounts, days, filters.day])

  const isLiveView = view === 'live'
  const isMyScheduleView = view === 'my-schedule'
  const filtered = useMemo(() => sessions.filter((s) => matchesFilters(s, filters, view, favorites)), [sessions, filters, view, favorites])
  const isFirstDaySelected = !isLiveView && !isMyScheduleView && days.length > 0 && filters.day === days[0]
  const showTimeHeaders = filters.day !== ALL_DAYS
  const groups = useMemo(
    () => (showTimeHeaders ? groupSessionsByTime(filtered) : [{ time: 'all', sessions: sortSessionsByStart(filtered) }]),
    [filtered, showTimeHeaders],
  )
  const dayGroups = useMemo(() => (isMyScheduleView ? groupSessionsByDayAndTime(filtered) : []), [isMyScheduleView, filtered])
  const liveGroups = useMemo(() => {
    if (!isLiveView) return []
    const { current, upNext } = partitionLiveSessions(filtered, now)
    const result: SessionGroup[] = []
    if (current.length) result.push({ time: 'Happening now', sessions: current })
    if (upNext.length) result.push({ time: 'Up next', sessions: upNext })
    return result
  }, [isLiveView, filtered, now])
  const hasStarted = !conferenceStart || now.getTime() >= conferenceStart.getTime()
  const showCountdown = isLiveView && !hasStarted

  const toggleFilterValue = (key: FilterKey, value: string) => {
    setFilters((f) => {
      const next = new Set(f[key])
      if (next.has(value)) next.delete(value)
      else next.add(value)
      return { ...f, [key]: next }
    })
  }

  const clearFilters = () => setFilters((f) => ({ ...f, formats: new Set(), rooms: new Set(), languages: new Set() }))
  const isEmpty = isLiveView ? liveGroups.length === 0 : filtered.length === 0

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

        {days.length > 1 && !isLiveView && !isMyScheduleView && (
          <DayTabs
            days={days}
            activeDay={filters.day}
            onSelect={(day) => setFilters((f) => ({ ...f, day }))}
            counts={isSearchingOrFiltering ? dayCounts : undefined}
          />
        )}

        <div id="program-panel" role="tabpanel" aria-label="Program results">
          {loading && <ProgramSkeleton />}

          {error && !loading && (
            <div role="status" className="px-5 py-12 text-center rounded-3xl bg-base-200">
              <p className="m-0 font-semibold text-primary">Could not load program</p>
              <p className="m-0 mt-2 text-sm text-secondary">{error}</p>
              <button
                type="button"
                onClick={retry}
                title="Try loading the program again"
                className="px-4 py-2 mt-4 text-sm font-semibold rounded-2xl outline-none bg-accent-primary/20 text-accent-primary hover:bg-accent-primary/30 focus-visible:ring-2 focus-visible:ring-accent-primary"
              >
                Retry
              </button>
            </div>
          )}

          {!loading && !error && showCountdown && conferenceStart && <LiveCountdown target={conferenceStart} />}

          {!loading && !error && !showCountdown && isEmpty && (
            <div role="status" className="px-5 py-12 text-center rounded-3xl bg-base-200">
              <p className="m-0 text-secondary">
                {view === 'my-schedule'
                  ? 'No favorites yet. Tap the favorite icon on any session to add it to your schedule.'
                  : isLiveView
                    ? "Nothing's happening right now, and nothing's on the horizon yet."
                    : 'No sessions match your filters.'}
              </p>
            </div>
          )}

          {!loading && !error && !showCountdown && isLiveView && !isEmpty && (
            <ScheduleList groups={liveGroups} favorites={favorites} conflicts={conflicts} onToggleFavorite={toggleFavorite} now={now} />
          )}

          {!loading && !error && !isLiveView && !isEmpty && isFirstDaySelected && (
            <div className="mb-4">
              <Heading level="h2">Workshops</Heading>
            </div>
          )}

          {!loading && !error && !isLiveView && !isEmpty && isFirstDaySelected && (
            <TimetableGrid sessions={filtered} favorites={favorites} conflicts={conflicts} onToggleFavorite={toggleFavorite} now={now} />
          )}

          {!loading && !error && !isLiveView && !isEmpty && isFirstDaySelected && (
            <div className="flex justify-center mb-10">
              <LinkButton title="Sign up here!" link={WORKSHOP_SIGNUP_URL} size="medium" />
            </div>
          )}

          {!loading && !error && !isLiveView && !isMyScheduleView && !isEmpty && (
            <div className={isFirstDaySelected ? 'md:hidden' : ''}>
              <ScheduleList
                groups={groups}
                favorites={favorites}
                conflicts={conflicts}
                onToggleFavorite={toggleFavorite}
                showTimeHeaders={showTimeHeaders}
                now={now}
              />
            </div>
          )}

          {!loading && !error && isMyScheduleView && !isEmpty && (
            <div className="flex flex-col gap-10">
              {dayGroups.map((dayGroup) => (
                <section key={dayGroup.day}>
                  <Heading level="h2" className="mb-4">
                    {dayGroup.label}
                  </Heading>
                  <ScheduleList
                    groups={dayGroup.timeGroups}
                    favorites={favorites}
                    conflicts={conflicts}
                    onToggleFavorite={toggleFavorite}
                    timeHeadingLevel="h3"
                    now={now}
                  />
                </section>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProgramPage
