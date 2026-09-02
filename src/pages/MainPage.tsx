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
          <LinkButton title="See Program" size="large" variant="pop" link="/program" className="mt-6 max-w-md min-w-[320px] pointer-events-auto" />
          <a
            href="/in-memoriam"
            className="mt-8 px-4 py-2 text-sm text-primary underline pointer-events-auto rounded-3xl border border-primary/40 hover:border-primary hover:no-underline"
          >
            JavaZone following the passing of King Harald V
          </a>
        </div>
      </div>
    </div>
  )
}

export default MainPage
