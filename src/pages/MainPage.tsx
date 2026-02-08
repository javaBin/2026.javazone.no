import { BubbleSimple, Heading, LinkButton, Submarine } from '@/components'

const MainPage = () => {
  return (
    <div className="hero bg-abyss-navy min-h-screen">
      <BubbleSimple />
      <Submarine />
      <div className="hero-content z-40">
        <div className="max-w-md text-center">
          <Heading level="h1">JavaZone 2026</Heading>
          <Heading level="h2" className="mt-3 mb-6">
            September 2nd - 3rd, 2026, NOVA Spektrum, Lillestrøm
          </Heading>
          <p className={'text-xl md:text-2xl font-semibold center-text'}>Ticket sales open March 2nd</p>

          <LinkButton title="Register as partner" size="large" link="https://event.checkin.no/215047/javazone-2026-partnership" className="mt-6" />

          <div className="pt-12 pb-8">
            <p className="text-lg md:text-xl font-semibold center-text pb-4"> Want to volunteer at this years Javazone?</p>
            <a href="/volunteer" className="btn btn-primary btn-md text-xl px-8">
              Take a look here!
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainPage
