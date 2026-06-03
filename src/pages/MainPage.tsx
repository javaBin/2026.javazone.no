import { BubbleSimple, Heading, LinkButton, Submarine, WaveBackground } from '@/components'

const MainPage = () => {
  return (
    <div className="flex items-center justify-center flex-1 text-base-content">
      <BubbleSimple />
      <Submarine />
      <WaveBackground />
      <div className="z-40 p-4 max-w-7xl">
        <div className="max-w-[34rem] text-center flex flex-col items-center justify-center">
          <Heading level="h1" className="hero-heading">
            JavaZone 2026
          </Heading>
          <Heading level="h2" className="my-2">
            September 2<sup className="font-semibold">nd</sup>
            <span className="font-semibold"> – </span>3<sup className="font-semibold">rd</sup> 2026
            <br />
            NOVA Spektrum, Lillestrøm
          </Heading>
          <Heading level="h3" className="my-2 text-secondary">
            Ticket sales are now open — dive in and secure your spot!
          </Heading>

          <LinkButton title="Buy tickets" size="large" link="/tickets" className="mt-6 max-w-md min-w-[320px]" />
          <LinkButton
            title="Register as partner"
            size="large"
            link="https://event.checkin.no/215047/javazone-2026-partnership"
            className="mt-3 max-w-md min-w-[320px]"
          />
          <LinkButton title="Become a volunteer" size="large" variant="primary-outline" link="/volunteer" className="mt-3 max-w-md min-w-[320px]" />
        </div>
      </div>
    </div>
  )
}

export default MainPage
