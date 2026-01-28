import { useEffect } from 'react'
import { NavigationType, useLocation, useNavigationType } from 'react-router-dom'

const ScrollManager: () => null = () => {
  const location = useLocation()
  const navigationType = useNavigationType()

  useEffect(() => {
    if (navigationType === NavigationType.Push || navigationType === NavigationType.Replace) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }
  }, [location.key, navigationType])

  return null
}

export default ScrollManager
