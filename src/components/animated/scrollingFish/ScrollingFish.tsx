// animation from https://frontend.horse/articles/swimming-on-scroll-with-gsap/
'use client'

import '@/components/animated/scrollingFish/scrollingFish.css'

import { useLayoutEffect, useRef } from 'react'

import { init } from '@/components/animated/scrollingFish/index.ts'

interface ScrollingFishProps {
  scrollLength?: number // amount of sections worth of scroll
}

const ScrollingFish = ({ scrollLength = 9 }: ScrollingFishProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    return init(rootRef, scrollLength)
  }, [scrollLength])

  return (
    <div ref={rootRef} className="scrolling-fish-animation" style={{ ['--scrollLength' as `--${string}`]: scrollLength }}>
      <div className="scrolling-fish-animation__fish-wrapper">
        <div className="scrolling-fish-animation__fish">
          <div className="fish__skeleton" />
          <div className="fish__body">
            <div className="fish__body-segment" />
            <div className="fish__body-segment" />
            <div className="fish__body-segment" />
            <div className="fish__body-segment" />
            <div className="fish__body-segment" />
            <div className="fish__body-segment" />
            <div className="fish__body-segment" />
            <div className="fish__body-segment" />

            <div className="fish__head" />
            <div className="fish__head fish__head--2" />
            <div className="fish__head fish__head--3" />
            <div className="fish__head fish__head--4" />

            <div className="fish__tail-main" />
            <div className="fish__tail-fork" />

            <div className="fish__fin" />
            <div className="fish__fin fish__fin--2" />
          </div>
        </div>
      </div>

      <div className="scrolling-fish-animation__bubbles-wrapper">
        <div className="scrolling-fish-animation__bubbles">
          <div className="bubbles__bubble" />
          <div className="bubbles__bubble" />
          <div className="bubbles__bubble" />
        </div>
      </div>

      <div className="scrolling-fish-animation__lights-wrapper">
        <div className="scrolling-fish-animation__lights" data-lights="1">
          <div className="lights__light" />
          <div className="lights__light" />
          <div className="lights__light" />
          <div className="lights__light" />
          <div className="lights__light" />
          <div className="lights__light" />
          <div className="lights__light" />
          <div className="lights__light" />
        </div>
      </div>

      <div className="scrolling-fish-animation__spacer" />
    </div>
  )
}

export default ScrollingFish
