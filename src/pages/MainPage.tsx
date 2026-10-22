import type { IndexRow } from '@/components'
import { Container, EditorialIntro, IndexRows, LinkButton, Section } from '@/components'
import pageMeta from '@/data/pageMeta.json'
import { useOpenGraph } from '@/hooks/useOpenGraph'

const facts = [
  { label: 'Dates', value: 'TBA' },
  { label: 'Venue', value: 'TBA' },
  { label: 'Organized by', value: 'javaBin' },
]

const getInvolved: IndexRow[] = [
  { label: '01', title: 'Speak', description: 'Talks, lightning talks and workshops', href: '/speaker' },
  { label: '02', title: 'Partner', description: 'Exhibit at and support the conference', href: '/partner' },
  { label: '03', title: 'Volunteer', description: 'Help make the conference happen', href: '/volunteer' },
  { label: '04', title: 'Attend', description: 'Tickets and practical information', href: '/tickets' },
]

const MainPage = () => {
  useOpenGraph(pageMeta.main)

  return (
    <>
      <section aria-labelledby="hero-title">
        <Container className="pt-16 pb-16 grid-12 gap-y-12 md:pt-24 md:pb-20 lg:pt-32 lg:pb-28">
          <div className="col-span-full lg:col-span-9">
            <p className="m-0 mb-6 eyebrow">The community-driven developer conference</p>
            <h1 id="hero-title" className="m-0 text-display">
              JavaZone
              <br />
              2027
            </h1>
            <span aria-hidden="true" className="mt-10 accent-rule" />
          </div>

          <div className="col-span-full md:col-span-4 lg:col-span-5">
            <p className="m-0 text-lg text-muted md:text-xl">
              Dates and venue will be announced. Until then, watch the talks from JavaZone 2026 or look back at earlier years.
            </p>
            <div className="flex flex-col items-start mt-4">
              <LinkButton title="Watch the 2026 talks" link="https://2026.javazone.no/program" variant="secondary" />
              <LinkButton title="Previous JavaZones" link="/history" variant="secondary" />
            </div>
          </div>

          <dl className="m-0 border-t col-span-full md:col-span-4 md:col-start-5 lg:col-span-4 lg:col-start-9 border-line">
            {facts.map((fact) => (
              <div key={fact.label} className="flex justify-between gap-4 py-3 border-b border-line">
                <dt className="text-sm text-muted">{fact.label}</dt>
                <dd className="m-0 text-sm font-medium text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <Section rule aria-labelledby="get-involved">
        <EditorialIntro id="get-involved" eyebrow="Get involved" title="Be part of JavaZone 2027" />
        <div className="mt-12 lg:mt-16">
          <IndexRows rows={getInvolved} />
        </div>
      </Section>
    </>
  )
}

export default MainPage
