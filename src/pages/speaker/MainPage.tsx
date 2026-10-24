import { Link } from 'react-router-dom'

import type { IndexRow, Topic } from '@/components'
import { Card, Container, IndexRows, LinkButton, PageHeader, TopicRows } from '@/components'
import pageMeta from '@/data/pageMeta.json'
import { useOpenGraph } from '@/hooks/useOpenGraph'

const topics: Topic[] = [
  {
    title: 'What is it like speaking at JavaZone?',
    body: (
      <>
        <p>
          Over the last decade JavaZone has grown to become one of the most important Java events in Europe! You can see for yourself - over 1500
          videos from previous years' talks are available for free at Vimeo, and the full programs from previous years are also available.
        </p>
        <p>
          We can brag as much as we want, but JavaZone would be nothing without all the great speakers! That's why we need your help to make sure that
          JavaZone 2027 will be at least as awesome as the earlier events. If you think you have something interesting to share, please submit your
          talk or workshop.
        </p>
        <p>
          JavaZone is committed to diversity, and we are especially interested in quality submissions from groups that are under-represented in tech.
        </p>
        <LinkButton title="Watch videos" link="https://vimeo.com/javazone" variant="secondary" />
      </>
    ),
  },
  {
    title: 'Formats and durations',
    body: (
      <>
        <p>
          You should think about which format your talk will work best in. Are you presenting a new idea, or do you require more time to elaborate on
          your subject? How hands-on do you want to be? We have three formats you can present your material in.
        </p>
        <Card title="Lightning talks" subtitle="10 or 20 minutes">
          <p>
            Are you presenting a great new idea, or want to give the audience a teaser for a cool topic? Then you should strongly consider the
            lightning talk format. Note that the 10-20 minute time limit is strictly enforced!
          </p>
        </Card>
        <Card title="Presentations" subtitle="45 or 60 minutes">
          <p>
            Presentations at JavaZone can be either 45 or 60 minutes long. This gives you room to elaborate on an idea. When submitting your talk,
            please indicate clearly in the outline how much time is reserved for questions.
          </p>
        </Card>
        <Card title="Workshops" subtitle="2 hours, 4 hours, 8 hours">
          <p>
            We will continue the popular workshop concept with a range of sessions on the day before the main conference. The format for the workshops
            is in-depth, hands-on and interactive.
          </p>
        </Card>
      </>
    ),
  },
  {
    title: 'Audience and topics',
    body: (
      <>
        <p>
          JavaZone is a conference for developers and technical architects, with an emphasis on technical talks. However, we are open to talks about
          other topics related to programming as well, like methodology or project management.
        </p>
        <p>
          Despite our conference name, we do not limit our content to Java technology. We will consider all talks based on their relevance to
          developers and technical architects. We do, however, focus on technology surrounding the JVM when selecting talks.
        </p>
        <p>
          Over the years, we have gathered some <Link to="/speaker/tips">submission tips</Link>, which may be useful to both new and experienced
          speakers.
        </p>
      </>
    ),
  },
  {
    title: 'Ongoing evaluation of talks',
    body: (
      <>
        <p>
          Each year we receive hundreds of submissions, and we consider each submission as it arrives. We answer all submissions and will do so no
          later than end of June.
        </p>
        <p>
          Our advice to you is simple. Submit early! The earlier you submit, the more likely you are to be noticed. Avoid drowning in the
          end-of-Call-for-Speakers tsunami!
        </p>
      </>
    ),
  },
  {
    title: 'Location',
    body: <p>Venue for JavaZone 2027: TBA.</p>,
  },
  {
    title: "What's in it for me?",
    body: (
      <>
        <Card title="Accepted presentations, lightning talks, and workshops">
          <p>
            As a JavaZone speaker, you get free admission to the conference. Additionally, you are also invited to the speakers' dinner, held the
            evening before the conference.
          </p>
        </Card>
        <Card title="Coverage of expenses">
          <p>
            Please see our <Link to="/speaker/reimbursement">reimbursement policy</Link> if you have any questions regarding coverage of other
            expenses. We also have a <Link to="/speaker/family-ticket">family ticket policy</Link>.
          </p>
        </Card>
        <Card title="Important principles">
          <p>
            JavaZone is proud to be an independent and community-driven conference. It is organized by volunteers from javaBin (the Norwegian Java
            User Group) and is run as a non-profit organization. This means that we have three important principles for selecting talks:
          </p>
          <ul className="mt-4 list-disc pl-5 space-y-2">
            <li>We do not sell speaker slots.</li>
            <li>We do not accept sales pitches masked as presentations.</li>
            <li>We do not differentiate between speakers from partners and independent speakers.</li>
          </ul>
        </Card>
      </>
    ),
  },
  {
    title: 'Ready to submit your talk?',
    body: (
      <>
        <p>If your talk adheres to these very important principles, you are more than welcome to submit it to our Call for Speakers!</p>
        <p>We hope to see you at JavaZone 2027 - please feel free to spread the word to your local community!</p>
        <p>
          Best regards,
          <br />
          <span className="italic">The JavaZone Program Committee</span>
        </p>
      </>
    ),
  },
]

const moreForSpeakers: IndexRow[] = [
  { title: 'Submission tips', description: 'How to write a strong proposal', href: '/speaker/tips' },
  { title: 'Reimbursement policy', description: 'Travel and accommodation coverage', href: '/speaker/reimbursement' },
  { title: 'Family ticket policy', description: 'Bringing close family to the conference', href: '/speaker/family-ticket' },
]

const SpeakerMainPage = () => {
  useOpenGraph(pageMeta.speakerMain)

  return (
    <>
      <PageHeader eyebrow="Speakers" title="Call for Speakers">
        <p>JavaZone 2027 will consist of a day of pre-conference workshops, followed by two days of lightning talks and presentations.</p>
        <p>
          The conference is usually sold out, with more than 3200 attendees enjoying well over 100 sessions from both Norwegian and international
          speakers. We'd love to have you join us! JavaZone hosts both international and Norwegian speakers.
        </p>
        <p className="font-semibold text-ink">The Call for Speakers for JavaZone 2027 has not opened yet. Dates TBA.</p>
      </PageHeader>
      <Container className="pb-24 lg:pb-32">
        <TopicRows topics={topics} />
        <h2 className="eyebrow m-0 mt-24 mb-6 lg:mt-32">More for speakers</h2>
        <IndexRows rows={moreForSpeakers} />
      </Container>
    </>
  )
}

export default SpeakerMainPage
