import { Assets } from '@/Assets'
import { BubbleField, Heading, LinkButton, Submarine, WaveBackground } from '@/components'
import pageMeta from '@/data/pageMeta.json'
import { useOpenGraph } from '@/hooks/useOpenGraph'

const MainPage = () => {
  useOpenGraph(pageMeta.main)

  return (
    <div className="flex items-center justify-center flex-1 mt-14 text-base-content">
      <BubbleField variant="big" />
      <Submarine />
      <WaveBackground />
      <div className="z-40 p-4 pointer-events-none max-w-7xl">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="m-0">
            <img src={Assets.images.dukeLogo} alt="JavaZone 2026" className="w-64 mb-2 sm:w-80 md:w-96 drop-shadow-xl" />
          </h1>
          <Heading level="h2" className="my-2">
            September 2–3, 2026
            <br />
            NOVA Spektrum, Lillestrøm
          </Heading>
          <Heading level="h3" className="my-2 text-secondary">
            Doors open at 08:00, talks start at 09:00. Don't miss the exciting morning show at 08:30
          </Heading>
          <LinkButton title="See Program" size="large" variant="pop" link="/program" className="mt-6 max-w-md min-w-[320px] pointer-events-auto" />
          <LinkButton
            title="Sign up for Workshops"
            size="large"
            variant="pop"
            link="https://event.checkin.no/226598/java-zone-workshops-2026"
            className="mt-6 max-w-md min-w-[320px] pointer-events-auto"
          />
          <LinkButton
            title="Buy tickets"
            size="large"
            variant="primary"
            link="/tickets"
            className="mt-6 max-w-md min-w-[320px] pointer-events-auto"
          />
          <LinkButton
            title="javaBin Kids"
            size="large"
            variant="pop-outline"
            link="https://kids.java.no/arrangementer/33daa75d-660b-4921-9b05-825596211c5c"
            className="mt-6 max-w-md min-w-[320px] pointer-events-auto"
          />
        </div>
      </div>
    </div>
  )
}

export default MainPage
