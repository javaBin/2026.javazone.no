import { fetchProgram } from '@/lib/fetchProgram'
import {
  activeFilterCount,
  computeConflicts,
  createEmptyFilters,
  formatDayLabel,
  formatTime,
  getDayKey,
  getDays,
  getFacets,
  getKeywords,
  getSessionEnd,
  getSessionStart,
  matchesFilters,
} from '@/lib/program.ts'
import { resolveLink } from '@/lib/resolveLink.ts'

export {
  activeFilterCount,
  computeConflicts,
  createEmptyFilters,
  fetchProgram,
  formatDayLabel,
  formatTime,
  getDayKey,
  getDays,
  getFacets,
  getKeywords,
  getSessionEnd,
  getSessionStart,
  matchesFilters,
  resolveLink,
}
export type { Session, Speaker } from '@/lib/fetchProgram'
export type { ProgramFacets, ProgramFilters, ProgramView } from '@/lib/program.ts'
