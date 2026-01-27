import { BubbleSimple, Heading } from '../components'

const MainPage = () => {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <BubbleSimple />
      <div className="hero-content z-40 text-center">
        <div className="max-w-md text-center">
          <Heading level="h1">JavaZone 2026</Heading>
          <Heading level="h2" className="mt-3 mb-6">
            September 2nd - 3rd, 2026, NOVA Spektrum, Lillestrøm
          </Heading>
          <p className={'text-xl md:text-2xl font-semibold center-text'}>Ticket sales open March 2nd</p>

          <div className="pt-6 pb-8">
            <a href="https://event.checkin.no/215047/javazone-2026-partnership" className="btn btn-primary btn-lg text-2xl px-12">
              Register as partner
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainPage
