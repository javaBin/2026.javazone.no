import { useEffect, useState } from 'react'

import { off, on } from '@/utils/scrollUtils.ts'
/**
 * useScrollingUp custom react hook
 * @returns {boolean}
 */
const useScrollingUp = (): boolean => {
  let prevScroll: number
  //if it is SSR then check you are now on the client and window object is available
  const [scrollingUp, setScrollingUp] = useState(true)
  const handleScroll = () => {
    const currScroll = window.pageYOffset
    const isScrolled = prevScroll > currScroll || currScroll === 0
    setScrollingUp(isScrolled)
    prevScroll = currScroll
  }
  useEffect(() => {
    on(window, 'scroll', handleScroll, { passive: true })
    return () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      off(window, 'scroll', handleScroll, { passive: true })
    }
  }, [])
  return scrollingUp
}

export default useScrollingUp
