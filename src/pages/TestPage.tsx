// animation from https://frontend.horse/articles/swimming-on-scroll-with-gsap/
'use client'

import '@/test.css'

import { gsap } from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'

import { Heading } from '@/components'

interface Point {
  x: number
  y: number
}

const FAQ = [
  /*todo: review text*/
  {
    q: "I don't speak Norwegian, what about me?",
    a: 'You need to be able to communicate in both Norwegian and English to be a volunteer at JavaZone.',
  },
  { q: 'Who can be a volunteer at JavaZone?', a: 'All students who are fluent in both Norwegian and English can become volunteers at JavaZone.' },
  { q: 'What will I do as a volunteer?', a: 'Tasks include hall monitoring, information desk duty, and handing out headsets, among others.' },
  { q: 'How many volunteers participate at JavaZone?', a: "Over 50 volunteers participate each year. Interest is high, but it's worth applying!" },
  {
    q: 'Will I get to attend sessions as a volunteer?',
    a: 'You get about 50% free time to attend talks, eat great food, and network with IT professionals.',
  },
  {
    q: 'What about travel if I don’t live in Oslo?',
    a: 'JavaZone does not cover travel or accommodation, but check with your university about travel support.',
  },
  { q: 'Can I join AweZone?', a: 'Yes! No work in the evening – just party and fun!' },
  {
    q: 'When do I need to show up as a volunteer?',
    a: 'Training and info will be given on the 1st of September, and you need to show up both the 2nd and the 3rd for the conference.',
  },
  { q: 'When is the application deadline?', a: 'The application deadline is TBD.' },
]

const TestPage = () => {
  const rootRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

    const ctx = gsap.context(() => {
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

      const q = gsap.utils.selector(root)
      const bubblesWrapper = q<HTMLElement>('.scrolling-fish-animation__bubbles-wrapper')[0]
      const fishContainer = q<HTMLElement>('.scrolling-fish-animation__fish')[0]

      if (!fishContainer || !bubblesWrapper) return

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
          scrub: 1.5,
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
      tl.pause()

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

        if (i <= FAQ.length) bubblesTl.restart()
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

    return () => ctx.revert()
  }, [])

  return (
    <div ref={rootRef} className="scrolling-fish-animation">
      <div className="scrolling-fish-animation__fish-wrapper">
        <div className="scrolling-fish-animation__fish">
          <div className="fish__skeleton" />
          <div className="fish__body">
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

      <div className="scrolling-fish-animation__content-wrapper">
        {FAQ.map((pair, i) => (
          <section key={i} className={'scrolling-fish-animation__content'}>
            <div className="content-inner">
              <Heading level="h2" className="text-center">
                {pair.q}
              </Heading>
              <Heading level="h3" className="text-center">
                {pair.a}
              </Heading>
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

export default TestPage
