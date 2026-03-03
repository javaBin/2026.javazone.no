import { gsap } from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type React from 'react'

interface Point {
  x: number
  y: number
}

export const init = (rootRef: React.RefObject<HTMLDivElement | null>, scrollLength: number) => {
  const root = rootRef.current
  if (!root) return

  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

  const context = gsap.context(() => {
    const q = gsap.utils.selector(root)

    const fishContainer = q<HTMLElement>('.scrolling-fish-animation__fish')[0]
    const bubblesWrapper = q<HTMLElement>('.scrolling-fish-animation__bubbles-wrapper')[0]
    if (!fishContainer || !bubblesWrapper) return

    const rx = window.innerWidth < 1000 ? window.innerWidth / 1200 : 1
    const ry = window.innerHeight < 700 ? window.innerHeight / 1200 : 1

    const path: Point[] = [
      // 1
      { x: 800, y: 200 },
      { x: 900, y: 20 },
      { x: 1100, y: 100 },
      // 2
      { x: 1000, y: 200 },
      { x: 900, y: 20 },
      { x: 10, y: 500 },
      // 3
      { x: 100, y: 300 },
      { x: 500, y: 400 },
      { x: 1000, y: 200 },
      // 4
      { x: 1100, y: 300 },
      { x: 400, y: 400 },
      { x: 200, y: 250 },
      // 5
      { x: 100, y: 300 },
      { x: 500, y: 450 },
      { x: 1100, y: 500 },
    ]

    const scaledPath: Point[] = path.map(({ x, y }) => ({ x: x * rx, y: y * ry }))
    const scrollDistancePx = scrollLength * window.innerHeight
    const fish = q<HTMLElement>('.fish__body')[0]
    const fishSkeleton = q<HTMLElement>('.fish__skeleton')[0]
    const fishHeadAndBody = [...q<HTMLElement>('.fish__head'), ...q<HTMLElement>('.fish__body-segment')]
    const lights = q<HTMLElement>('[data-lights]')
    const bubbles = q<HTMLElement>('.bubbles__bubble')

    gsap.set(bubblesWrapper, { autoAlpha: 0, display: 'none' }) // autoAlpha = opacity + visibility
    gsap.set(bubbles, { opacity: 0, scale: 0, y: 100 })

    // bubbles timeline
    const bubblesTl = gsap.timeline({
      paused: true,
      onStart: () => {
        gsap.set(bubblesWrapper, { display: 'block' })
        gsap.to(bubblesWrapper, { autoAlpha: 1, duration: 0.2 })
      },
      onComplete: () => {
        gsap.to(bubblesWrapper, {
          autoAlpha: 0,
          duration: 0.2,
          onComplete: () => {
            gsap.set(bubblesWrapper, { display: 'none' })
          },
        })
      },
    })
    bubblesTl.set(bubbles, { y: 100 })
    bubblesTl.to(bubbles, {
      scale: 1.2,
      y: -300,
      opacity: 1,
      duration: 2,
      stagger: 0.2,
    })
    bubblesTl.to(
      bubbles,
      {
        scale: 1,
        opacity: 0,
        duration: 1,
      },
      '-=1',
    )
    bubblesTl.pause()

    // fish motion timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: 'top top',
        end: `+=${scrollDistancePx}`,
        scrub: 1.5,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          gsap.to(fishContainer, {
            rotationY: self.direction === -1 ? 180 : 0,
            duration: 0.2,
            overwrite: 'auto',
          })
        },
      },
    })

    tl.to(fishContainer, {
      motionPath: {
        path: scaledPath,
        align: 'self',
        alignOrigin: [0.5, 0.5],
        autoRotate: true,
      },
      duration: 10,
      immediateRender: true,
    })

    tl.to(fishContainer, { rotateX: 180 }, 1)
    tl.to(fishContainer, { rotateX: 0 }, 2.5)
    tl.to(fishContainer, { z: -500, duration: 2 }, 2.5)

    tl.to(fishContainer, { rotateX: 180 }, 4)
    tl.to(fishContainer, { rotateX: 0 }, 5.5)
    tl.to(fishContainer, { z: -50, duration: 2 }, 5)

    tl.to(fishContainer, { rotate: 0, duration: 1 }, '-=1')

    tl.to(fishSkeleton, { opacity: 0.6, duration: 0.1, repeat: 4 }, '-=3')
    tl.to(fishHeadAndBody, { opacity: 0, duration: 0.1, repeat: 4 }, '-=3')
    tl.to(fish, { opacity: 0.1, duration: 1 }, '-=1')
    tl.to(fishSkeleton, { opacity: 0.1, duration: 1 }, '-=1')

    //bubblesTl.play()
    //tl.pause()

    // lights timeline
    if (lights[0]) {
      const lightsTl = gsap.timeline({
        scrollTrigger: { scrub: 6 },
      })

      lightsTl.from(
        lights[0],
        {
          x: window.innerWidth * -1,
          y: window.innerHeight,
          ease: 'power4.out',
          duration: 80,
        },
        0,
      )

      lightsTl.to(
        lights[0],
        {
          x: window.innerWidth,
          y: window.innerHeight * -1,
          ease: 'power4.out',
          duration: 80,
        },
        '-=5',
      )
    }

    const rotateFish = (self: ScrollTrigger): void => {
      gsap.to(fishContainer, { rotationY: self.direction === -1 ? 180 : 0, duration: 0.4 })
    }

    const makeBubbles = (div: HTMLDivElement | null, i: number): void => {
      if (!div) return

      const { top, left } = fishContainer.getBoundingClientRect()
      gsap.to(div, { opacity: 1, duration: 1 })

      gsap.set(bubblesWrapper, { x: left, y: top })

      if (i <= scrollLength) bubblesTl.restart()
      else gsap.set(bubblesWrapper, { autoAlpha: 0, display: 'none' })
    }

    const hideText = (div: HTMLDivElement | null): void => {
      if (!div) return
      gsap.to(div, { opacity: 0, duration: 1 })
    }

    const sections = gsap.utils.toArray<HTMLElement>('.scrolling-fish-animation__content')
    sections.forEach((section, i) => {
      const content = section.querySelector<HTMLDivElement>('.content-inner')
      if (content) gsap.set(content, { opacity: 0 }) // start hidden

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        onEnter: () => makeBubbles(content, i),
        onEnterBack: () => makeBubbles(content, i),
        onLeave: () => hideText(content),
        onLeaveBack: () => hideText(content),
        onUpdate: rotateFish,
      })
    })
  }, rootRef)

  return () => context.revert()
}
