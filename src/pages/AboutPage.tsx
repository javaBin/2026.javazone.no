import type { Topic } from '@/components'
import { Container, LinkButton, PageHeader, TopicRows } from '@/components'
import pageMeta from '@/data/pageMeta.json'
import { useOpenGraph } from '@/hooks/useOpenGraph'

const topics: Topic[] = [
  {
    title: 'About javaBin',
    body: (
      <>
        <p>
          JavaBin is one of the largest communities in Norway. It is driven by volunteer enthusiasts from across the country. We have branches
          throughout the country – in Stavanger, Bergen, Trondheim, Vestfold, Sogn, Tromsø, Southern Norway and Oslo.
        </p>
        <p>
          We organize events almost every month in all branches of javaBin, including meetups, events for students, events for kids, and other
          exciting stuff!
        </p>
        <LinkButton title="Read more about us" link="https://www.java.no/" variant="secondary" />
      </>
    ),
  },
  {
    title: 'A few very important principles',
    body: (
      <>
        <p>
          JavaZone is a 100% community-organized conference created by javaBin. The program is chosen by our independent program committee, and they
          operate under the principle that no-one is paid to hold a presentation, and likewise, that no-one can pay us to get their presentation
          accepted.
        </p>
        <p>
          We as organizers strive to create the best possible learning experience for all our speakers and participants, and we expect you to do the
          same. Everyone is welcome at JavaZone, but we do require that you treat your fellow conference participants with respect.
        </p>
        <p>
          We reserve the right to take any action necessary to make sure this principle is upheld. For more details, see our Code of Conduct that
          applies to all events organized by javaBin.
        </p>
        <LinkButton title="Read more about our principles" link="https://www.java.no/principles" variant="secondary" />
      </>
    ),
  },
  {
    title: 'Should any unwanted event occur, we’re here to help',
    body: (
      <>
        <p>
          <strong>Before the conference:</strong> you can contact us by email: <a href="mailto:javazone@java.no">javazone@java.no</a> (this goes to a
          small group of people, the core organizers of JavaZone), or <a href="mailto:styret@java.no">styret@java.no</a> (this goes to the javaBin
          board).
        </p>
        <p>
          <strong>During the conference:</strong> Ask at the info stand, and we’ll be in touch. Contact information will also be available at the info
          stand.
        </p>
      </>
    ),
  },
  {
    title: 'Food',
    body: (
      <>
        <p>
          JavaZone promises to tantalize your taste buds and satisfy your cravings throughout the conference. For attendees with allergies or dietary
          restrictions, rest assured that each restaurant is committed to providing a safe and enjoyable dining experience.
        </p>
        <p>
          Our chefs are well-versed in accommodating gluten, nut, dairy, and other common allergies. Simply inform the restaurant staff of your
          dietary needs, and they will guide you through the menu or offer personalized suggestions.
        </p>
      </>
    ),
  },
  {
    title: 'Sustainable waste management and recycling',
    body: (
      <>
        <p>
          At a time when sustainability and environmental awareness are high on the agenda, responsible waste management is an important part of
          hosting events. Through close collaboration with Norsk Gjenvinning, we ensure that waste from JavaZone is not only handled properly but also
          utilized as a resource—contributing to a more circular and sustainable future.
        </p>
        <p>
          For attendees, what happens behind the scenes is not always visible. However, the moment waste is discarded, a well-planned and structured
          process is set in motion. A comprehensive sorting system has been established to ensure a high degree of source separation, with materials
          such as paper, plastic, glass, and metal separated and sent for recycling.
        </p>
        <p>
          A key element is also the collection and sorting of beverage containers. Bottles and cans are systematically collected and returned for
          recycling through Norway’s deposit-return system—a concrete and visible measure that helps reduce waste and improve resource utilization.
        </p>
        <h3>Where does the waste go?</h3>
        <p>
          A large portion of the waste generated during JavaZone is sent for material recycling. In cooperation with Norsk Gjenvinning, we ensure the
          efficient handling and processing of the various waste streams.
        </p>
        <p>
          Residual waste is further processed for energy recovery, where it is used as a resource in energy production. Organic food and biodegradable
          waste is either composted (to improve soil quality), converted into feedstock for biogas facilities, or recovered for energy production.
        </p>
        <p>
          This holistic approach helps reduce the environmental footprint of the event while also setting a clear standard for the sustainable
          execution of large conferences and events.
        </p>
      </>
    ),
  },
]

const AboutPage = () => {
  useOpenGraph(pageMeta.about)

  return (
    <>
      <PageHeader eyebrow="About" title="About JavaZone" actions={<LinkButton title="Previous JavaZones" link="/history" variant="secondary" />}>
        <p>
          JavaZone is the biggest community-driven developer conference that has been organized in Oslo, Norway since 2001. It is organized on a
          voluntary basis by a group of people from javaBin, the Norwegian Java User Group, working around the year and putting many hours to create
          an amazing conference experience for you.
        </p>
      </PageHeader>
      <Container className="pb-24 lg:pb-32">
        <TopicRows topics={topics} />
      </Container>
    </>
  )
}

export default AboutPage
