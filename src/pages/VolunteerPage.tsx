import type { Topic } from '@/components'
import { Container, PageHeader, TopicRows } from '@/components'
import pageMeta from '@/data/pageMeta.json'
import { useOpenGraph } from '@/hooks/useOpenGraph'

const faq = [
  {
    q: "I don't speak Norwegian, what about me?",
    a: 'You need to be able to communicate in both Norwegian and English to be a volunteer at JavaZone.',
  },
  {
    q: 'Who can be a volunteer at JavaZone?',
    a: 'All students who are fluent in both Norwegian and English can become volunteers at JavaZone.',
  },
  {
    q: 'What will I do as a volunteer?',
    a: 'Tasks include hall monitoring, information desk duty, and handing out headsets, among others.',
  },
  {
    q: 'How many volunteers participate at JavaZone?',
    a: "Over 50 volunteers participate each year. Interest is high, but it's worth applying!",
  },
  {
    q: 'Will I get to attend sessions as a volunteer?',
    a: 'You get about 50% free time to attend talks, eat great food, and network with IT professionals.',
  },
  {
    q: 'What about travel if I don’t live in the area?',
    a: 'JavaZone does not cover travel or accommodation, but check with your university about travel support.',
  },
  {
    q: 'Can I join AweZone?',
    a: 'Yes! No work in the evening – just party and fun!',
  },
  {
    q: 'When do I need to show up as a volunteer?',
    a: 'Training and info will be given the day before the conference, and you need to show up on both conference days. Dates TBA.',
  },
  {
    q: 'When is the application deadline?',
    a: 'TBA.',
  },
]

const topics: Topic[] = faq.map((item) => ({ title: item.q, body: <p>{item.a}</p> }))

const VolunteerPage = () => {
  useOpenGraph(pageMeta.volunteer)

  return (
    <>
      <PageHeader eyebrow="Volunteers" title="Volunteer at JavaZone">
        <p>
          JavaZone is the world's largest community-driven developer conference, with more than 3000 developers attending every year. Would you like
          to contribute to making this event an amazing experience? Volunteer sign-up for JavaZone 2027 opens later — check back here!
        </p>
      </PageHeader>
      <Container className="pb-24 lg:pb-32">
        <h2 className="m-0 mb-6 eyebrow">Frequently asked questions</h2>
        <TopicRows topics={topics} as="h3" />
      </Container>
    </>
  )
}

export default VolunteerPage
