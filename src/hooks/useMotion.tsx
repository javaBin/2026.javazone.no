import { createContext, type ReactNode, useCallback, useContext, useEffect, useState } from 'react'

const STORAGE_KEY = 'jz-motion'

interface MotionContextValue {
  motionEnabled: boolean
  toggleMotion: () => void
}

const MotionContext = createContext<MotionContextValue | null>(null)

export const MotionProvider = ({ children }: { children: ReactNode }) => {
  const [motionEnabled, setMotionEnabled] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true
    // Read what the inline head script already set synchronously
    return document.documentElement.dataset.motion !== 'reduced'
  })

  useEffect(() => {
    document.documentElement.dataset.motion = motionEnabled ? 'full' : 'reduced'
  }, [motionEnabled])

  // Follow OS setting live, but only when the user has made no explicit choice
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setMotionEnabled(!e.matches)
      }
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const toggleMotion = useCallback(() => {
    setMotionEnabled((prev) => {
      const next = !prev
      localStorage.setItem(STORAGE_KEY, next ? 'full' : 'reduced')
      return next
    })
  }, [])

  return <MotionContext.Provider value={{ motionEnabled, toggleMotion }}>{children}</MotionContext.Provider>
}

export const useMotion = (): MotionContextValue => {
  const ctx = useContext(MotionContext)
  if (!ctx) throw new Error('useMotion must be used within MotionProvider')
  return ctx
}
