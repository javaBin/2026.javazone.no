import { BubbleSimple, Heading, LinkButton, Submarine } from '@/components'

const MainPage = () => {
  return (
    <div className="hero">
      <BubbleSimple />
      <Submarine />
      <div className="hero-content">
        <div className="max-w-xl text-center flex flex-col items-center justify-center">
          <Heading level="h1">JavaZone 2026</Heading>
          <Heading level="h2" className="my-2">
            September 2<sup className="font-semibold">nd</sup> <span className="font-semibold">–</span> 3<sup className="font-semibold">rd</sup> 2026{' '}
            NOVA Spektrum, Lillestrøm
          </Heading>
          <Heading level="h3">
            Ticket sales open March 2<sup className="font-medium">nd</sup>
          </Heading>

          <LinkButton
            title="Register as partner"
            size="large"
            link="https://event.checkin.no/215047/javazone-2026-partnership"
            className="mt-6 max-w-md"
          />
          <LinkButton title="Become a volunteer" size="large" variant="primary-outline" link="/volunteer" className="mt-6 max-w-md" />
        </div>
      </div>
    </div>
  )
}

export default MainPage
