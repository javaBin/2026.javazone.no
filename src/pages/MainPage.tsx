import { Assets } from '@/Assets'
import { BubbleField, Heading, LinkButton, Submarine, WaveBackground } from '@/components'

const MainPage = () => {
  return (
    <div className="flex items-center justify-center flex-1 mt-14 text-base-content">
      <BubbleField variant="big" />
      <Submarine />
      <WaveBackground />
      <div className="z-40 p-4 max-w-7xl pointer-events-none">
        <div className="flex flex-col items-center justify-center text-center">
          <img src={Assets.images.dukeLogo} alt="JavaZone 2026 Duke logo" className="w-64 mb-2 sm:w-80 md:w-96 drop-shadow-xl" />
          <Heading level="h2" className="my-2">
            September 2–3, 2026
            <br />
            NOVA Spektrum, Lillestrøm
          </Heading>
          <Heading level="h3" className="my-2 text-secondary">
            Ticket sales are now open — dive in and secure your spot!
          </Heading>

          <LinkButton title="Buy tickets" size="large" variant="pop" link="/tickets" className="mt-6 max-w-md min-w-[320px] pointer-events-auto" />
          <LinkButton
            title="Register as partner"
            size="large"
            variant="pop"
            link="https://event.checkin.no/215047/javazone-2026-partnership"
            className="mt-3 max-w-md min-w-[320px] pointer-events-auto"
          />
          <LinkButton
            title="Become a volunteer"
            size="large"
            variant="pop-outline"
            link="/volunteer"
            className="mt-3 max-w-md min-w-[320px] pointer-events-auto"
          />
        </div>
      </div>
    </div>
  )
}

export default MainPage
