import { useSyncExternalStore } from 'react'

const FAV_KEY = 'jz-program-favorites-v1'

function loadFavorites(): Set<string> {
  try {
    const raw = localStorage.getItem(FAV_KEY)
    return new Set(raw ? (JSON.parse(raw) as string[]) : [])
  } catch {
    return new Set()
  }
}

function persistFavorites(favorites: Set<string>) {
  try {
    localStorage.setItem(FAV_KEY, JSON.stringify(Array.from(favorites)))
  } catch {
    // storage unavailable (private mode / quota) — favorites just won't persist
  }
}

// Module-level store so every useFavorites() instance — including the program list and the
// talk modal rendered on top of it — shares one source of truth instead of drifting apart.
let favorites = loadFavorites()
const listeners = new Set<() => void>()

function emitChange() {
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getSnapshot(): ReadonlySet<string> {
  return favorites
}

// The native `storage` event only fires in OTHER tabs/windows when localStorage changes here,
// which is exactly what's needed to pick up favorites saved elsewhere.
window.addEventListener('storage', (event) => {
  if (event.key !== FAV_KEY) return
  favorites = loadFavorites()
  emitChange()
})

function toggleFavorite(id: string) {
  const next = new Set(favorites)
  if (next.has(id)) next.delete(id)
  else next.add(id)
  favorites = next
  persistFavorites(next)
  emitChange()
}

export function useFavorites() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot)

  return { favorites: snapshot, toggle: toggleFavorite }
}
