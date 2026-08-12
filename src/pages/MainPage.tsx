import { Assets } from '@/Assets'
import { BubbleField, Heading, LinkButton, Submarine, WaveBackground } from '@/components'
import { useMetaDescription } from '@/hooks/useMetaDescription'

const MainPage = () => {
  useMetaDescription(
    'JavaZone 2026 takes place September 2–3 at NOVA Spektrum, Lillestrøm, Norway. Explore the program and get your ticket to the biggest community-driven Java conference.',
  )

  return (
    <div className="flex items-center justify-center flex-1 mt-14 text-base-content">
      <BubbleField variant="big" />
      <Submarine />
      <WaveBackground />
      <div className="z-40 p-4 pointer-events-none max-w-7xl">
        <div className="flex flex-col items-center justify-center text-center">
          <img src={Assets.images.dukeLogo} alt="JavaZone 2026 Duke logo" className="w-64 mb-2 sm:w-80 md:w-96 drop-shadow-xl" />
          <Heading level="h2" className="my-2">
            September 2–3, 2026
            <br />
            NOVA Spektrum, Lillestrøm
          </Heading>
          <Heading level="h3" className="my-2 text-secondary">
            Program is now ready! Check out the schedule and start planning your conference experience.
          </Heading>
          <LinkButton title="See Program" size="large" variant="pop" link="/program" className="mt-6 max-w-md min-w-[320px] pointer-events-auto" />
          <LinkButton
            title="Buy tickets"
            size="large"
            variant="primary"
            link="/tickets"
            className="mt-6 max-w-md min-w-[320px] pointer-events-auto"
          />
        </div>
      </div>
    </div>
  )
}

export default MainPage
