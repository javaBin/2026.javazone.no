import type { Topic } from '@/components'
import { Container, PageHeader, TopicRows } from '@/components'
import pageMeta from '@/data/pageMeta.json'
import { useOpenGraph } from '@/hooks/useOpenGraph'

const faq: Topic[] = [
  {
    title: 'When do ticket sales open?',
    body: <p>TBA.</p>,
  },
  {
    title: 'How much does a ticket cost?',
    body: <p>Ticket prices for JavaZone 2027 are TBA.</p>,
  },
  {
    title: 'What is included in the ticket?',
    body: (
      <p>
        Your ticket covers all talks on both conference days, as well as the workshops on the day before. Workshops are included in the ticket price,
        but seating is limited. Food and drinks during the conference and access to the AweZone evening party are also included.
      </p>
    ),
  },
  {
    title: 'Where is JavaZone 2027 held?',
    body: <p>Dates and venue for JavaZone 2027 are TBA.</p>,
  },
  {
    title: 'Can I transfer my ticket to someone else?',
    body: (
      <p>
        Yes, tickets can be transferred to another person. Contact us if you need help with a transfer. This can be done until you claim your badge at
        the entrance to the conference. After that you can not transfer the ticket.
      </p>
    ),
  },
  {
    title: 'Are tickets refundable?',
    body: <p>Refund terms for JavaZone 2027 are TBA.</p>,
  },
  {
    title: 'Are there group discounts?',
    body: <p>We do not offer group discounts, but organisations are welcome to purchase multiple tickets.</p>,
  },
  {
    title: 'I work for one of the JavaZone partners — do I order tickets here?',
    body: (
      <p>
        No. If your employer is a JavaZone partner, your partner contact will handle ticket ordering on your behalf. Please do not order tickets
        through this page. See the <a href="/partner">partner page</a> for more information.
      </p>
    ),
  },
  {
    title: 'I have more questions — who do I contact?',
    body: (
      <p>
        Reach out to us at <a href="mailto:javazone@java.no">javazone@java.no</a> and we will get back to you as soon as possible.
      </p>
    ),
  },
]

const TicketsPage = () => {
  useOpenGraph(pageMeta.tickets)

  return (
    <>
      <PageHeader eyebrow="Tickets" title="Ticket sales for JavaZone 2027 have not opened yet">
        <p>Dates and venue for JavaZone 2027 are TBA. Check back here for ticket sales.</p>
        <p className="text-base">
          If you're buying tickets on behalf of one of our partners, see the <a href="/partner">partner page</a> instead.
        </p>
      </PageHeader>
      <Container className="pb-24 lg:pb-32">
        <h2 className="eyebrow m-0 mb-6">Frequently asked questions</h2>
        <TopicRows topics={faq} as="h3" />
      </Container>
    </>
  )
}

export default TicketsPage
