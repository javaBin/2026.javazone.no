import { useEffect } from 'react'
import { NavigationType, useLocation, useNavigationType } from 'react-router-dom'

const ScrollManager: () => null = () => {
  const location = useLocation()
  const navigationType = useNavigationType()
  // Opening a talk as a modal (see AppRoutes' background-location routing) is a real
  // navigation, but it shouldn't reset the scroll position of the page underneath it.
  const isModalNavigation = !!(location.state as { background?: unknown } | null)?.background

  useEffect(() => {
    if (isModalNavigation) return
    if (navigationType === NavigationType.Push || navigationType === NavigationType.Replace) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }
  }, [location.key, navigationType, isModalNavigation])

  return null
}

export default ScrollManager
