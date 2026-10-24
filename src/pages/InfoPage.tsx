import type { Topic } from '@/components'
import { Container, PageHeader, TopicRows } from '@/components'
import pageMeta from '@/data/pageMeta.json'
import { useOpenGraph } from '@/hooks/useOpenGraph'

const topics: Topic[] = [
  {
    title: 'Venue',
    body: <p>Venue, transportation, parking, and accessibility information: TBA.</p>,
  },
  {
    title: 'Workshops',
    body: (
      <p>
        Workshops take place the day before the main conference. The workshops are included in your conference ticket, but seating is limited so make
        sure to register early. Date and location: TBA.
      </p>
    ),
  },
  {
    title: 'Weather',
    body: <p>Expect a bit of chill in Oslo – bring a sweater/hoodie, and maybe an umbrella.</p>,
  },
  {
    title: 'Currency',
    body: <p>Norwegian krone (NOK). Almost all places accept Visa/Mastercard. Cash is rarely needed.</p>,
  },
  {
    title: 'Tickets',
    body: (
      <p>
        Scan your ticket to get an access badge. Once scanned, it's locked to you – but until then, tickets can be transferred. See the{' '}
        <a href="/tickets">tickets page</a> for more details.
      </p>
    ),
  },
  {
    title: 'Food',
    body: (
      <p>
        We promise you will not walk around hungry. Our chefs will accommodate all food preferences and allergies. There will be some sweet stuff, too
        – but don't tell anyone!
      </p>
    ),
  },
  {
    title: 'AweZone: celebrating the community',
    body: <p>JavaZone's traditional party – a night of music, fun, food, and community. Date and times: TBA.</p>,
  },
  {
    title: 'Speakers',
    body: <p>Please show up in your room 10 minutes before your talk starts to make sure your equipment works.</p>,
  },
  {
    title: 'Code of conduct',
    body: (
      <p>
        The goal of the JavaZone conference is to be inclusive of the largest number of participants with varied and diverse backgrounds. If you
        experience any inappropriate behavior, let us know.
      </p>
    ),
  },
  {
    title: 'Social media',
    body: (
      <p>
        Follow along with #javazone / #javazone2027. Our team will be active – reach out with comments &amp; questions, and join the conversation!
      </p>
    ),
  },
  {
    title: 'More info',
    body: (
      <p>
        Any questions? Contact <a href="mailto:javazone@java.no">javazone@java.no</a>, send us a DM, or catch us at the venue.
      </p>
    ),
  },
]

const InfoPage = () => {
  useOpenGraph(pageMeta.info)

  return (
    <>
      <PageHeader eyebrow="Practical info" title="Everything you need to know">
        <p>We can't wait to see everyone at JavaZone 2027! More practical info will be published here as the conference gets closer.</p>
      </PageHeader>
      <Container className="pb-24 lg:pb-32">
        <TopicRows topics={topics} />
      </Container>
    </>
  )
}

export default InfoPage
