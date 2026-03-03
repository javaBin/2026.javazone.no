'use client'

import '@/components/animated/scrollingFish/scrollingFish.css'

import { BubbleSimple, Heading, LinkButton, ScrollingFish, Submarine } from '@/components'

const SCROLL_SECTIONS = 7 // amount of sections worth of scroll

const TestPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <BubbleSimple />
      <Submarine />
      <ScrollingFish scrollLength={SCROLL_SECTIONS} />

      <div className="fixed top-1/3 z-50 max-w-[34rem] place-self-center justify-self-center text-center flex flex-col items-center justify-center">
        <Heading level="h1">JavaZone 2026</Heading>
        <Heading level="h2" className="my-2">
          September 2<sup className="font-semibold">nd</sup>
          <span className="font-semibold"> – </span>3<sup className="font-semibold">rd</sup> 2026 NOVA Spektrum, Lillestrøm
        </Heading>
        <Heading level="h3" className="my-2 text-secondary">
          Ticket sales open March 2<sup className="font-medium">nd</sup>
        </Heading>

        <LinkButton
          title="Register as partner"
          size="large"
          link="https://event.checkin.no/215047/javazone-2026-partnership"
          className="mt-6 max-w-md"
        />
        <LinkButton title="Become a volunteer" size="large" variant="primary-outline" link="/volunteer" className="mt-3 max-w-md" />
      </div>
    </div>
  )
}

export default TestPage
