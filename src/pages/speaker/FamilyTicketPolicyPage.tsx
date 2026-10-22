import type { Topic } from '@/components'
import { Card, Container, PageHeader, TopicRows } from '@/components'
import pageMeta from '@/data/pageMeta.json'
import { useOpenGraph } from '@/hooks/useOpenGraph'

const topics: Topic[] = [
  {
    title: 'Who can apply?',
    body: (
      <>
        <p>
          Family tickets are available <strong>only</strong> to speakers who have had <strong>a full presentation or a workshop accepted</strong> for
          JavaZone. Lightning talk speakers are not included in this scheme.
        </p>
        <p>
          Family tickets are intended for <strong>close family members</strong>, such as a partner, spouse, or other immediate family. The scheme is
          not meant for colleagues.
        </p>
        <p>
          Each eligible speaker can request <strong>one</strong> family ticket of each type (see below).
        </p>
      </>
    ),
  },
  {
    title: 'What we offer',
    body: (
      <>
        <p>We offer two different kinds of family tickets:</p>
        <Card title="Short visit family pass" subtitle="Free">
          <p>This option is for family members who just want to "see what JavaZone is like" and maybe watch your talk.</p>
          <ul className="mt-4 list-disc pl-5 space-y-2">
            <li>
              Free badge with <strong>4 hour access</strong> to the conference area on one of the conference days.
            </li>
            <li>
              The visitor may attend <strong>your session</strong> and walk around the expo area.
            </li>
            <li>
              The pass <strong>does not</strong> include:
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>Access to workshops</li>
                <li>Evening events</li>
              </ul>
            </li>
          </ul>
          <p className="mt-4">Details about where to pick up the badge and exact time limits will be communicated upon acceptance of request.</p>
        </Card>
        <Card title="Full conference family ticket" subtitle="50% discount">
          <p>
            If you want your family member to join as a <strong>full participant</strong>, we offer a discounted conference ticket:
          </p>
          <ul className="mt-4 list-disc pl-5 space-y-2">
            <li>
              <strong>50% discount</strong> on the regular conference ticket price.
            </li>
            <li>
              The ticket gives the family member the <strong>same access as a regular attendee.</strong>
            </li>
          </ul>
          <p className="mt-4">
            The family member will be registered as a <strong>regular participant</strong> (not as a speaker) and will not be eligible for speaker
            benefits such as Speakers dinner or reimbursements.
          </p>
        </Card>
      </>
    ),
  },
  {
    title: 'How to request a family ticket',
    body: (
      <>
        <p>To request a family ticket, please:</p>
        <ol>
          <li>
            Wait until your <strong>presentation or workshop has been accepted</strong>.
          </li>
          <li>
            Send an email to <a href="mailto:refund@java.no?subject=Family ticket request – [Your Name]">refund@java.no</a> with the subject line:
            <br />
            <em>Family ticket request – [Your Name]</em>
          </li>
          <li>
            Clearly state:
            <ul className="mt-2">
              <li>Your name and the title of your accepted talk/workshop</li>
              <li>
                Which option(s) you are requesting:
                <ul className="mt-2">
                  <li>Short visit family pass (free)</li>
                  <li>Full conference family ticket (50% discount)</li>
                </ul>
              </li>
              <li>Name and email of the family member</li>
            </ul>
          </li>
        </ol>
        <p>We will confirm your request by email. The deadline for requests is TBA, so we have time to handle registration and badges.</p>
      </>
    ),
  },
  {
    title: 'Important notes',
    body: (
      <ul>
        <li>
          Family tickets are offered <strong>subject to capacity</strong>. We reserve the right to decline or adjust requests if needed to keep the
          conference logistics manageable.
        </li>
        <li>
          The scheme is intended as a <strong>nice extra</strong> for speakers and their families, not as a way to add more professional participants
          at reduced prices.
        </li>
        <li>
          We may adjust the practical details (time windows, pickup locations, etc.) and will communicate this clearly to accepted speakers before the
          conference.
        </li>
        <li>
          <strong>Misuse:</strong> If the terms of this scheme are breached or there is an attempt to circumvent them (e.g., using a short-visit pass
          as a full-day badge, transferring or reselling a pass, or registering a colleague as "family"), JavaZone may cancel access and{' '}
          <strong>invoice the full regular participant ticket price</strong> for the person in question. Repeated violations may result in loss of
          eligibility for this scheme in future years.
        </li>
      </ul>
    ),
  },
]

const FamilyTicketPolicyPage = () => {
  useOpenGraph(pageMeta.speakerFamilyTicket)

  return (
    <>
      <PageHeader eyebrow="Speakers" title="Family ticket policy">
        <p>
          We know that speaking at JavaZone can be a big thing for both you and your loved ones, and some of you would like to share a bit of that
          experience with your family. To keep this fair and sustainable, we offer a limited "family ticket" scheme for speakers.
        </p>
      </PageHeader>
      <Container className="pb-24 lg:pb-32">
        <TopicRows topics={topics} />
      </Container>
    </>
  )
}

export default FamilyTicketPolicyPage
