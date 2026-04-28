import React from 'react'

import { Heading, LinkButton } from '@/components'

const faq: { q: string; a: React.ReactNode }[] = [
  {
    q: 'When do ticket sales open?',
    a: 'Ticket sales open on March 2nd at 10:00 CET.',
  },
  {
    q: 'How much does a ticket cost?',
    a: 'Early bird tickets are priced at 10 100 NOK excluding VAT, available until June 1st. After June 1st the late bird price is 10 900 NOK excluding VAT.',
  },
  {
    q: 'What is included in the ticket?',
    a: 'Your ticket covers all talks on September 2nd and 3rd, as well as workshops on September 1st. Workshops are included in the ticket price, but seating is limited — workshop registration opens in the middle of August. Food and drinks during the conference and access to the AweZone evening party are also included.',
  },
  {
    q: 'Where is JavaZone 2026 held?',
    a: 'JavaZone 2026 takes place at NOVA Spektrum in Lillestrøm, Norway, on September 2nd and 3rd.',
  },
  {
    q: 'Can I transfer my ticket to someone else?',
    a: 'Yes, tickets can be transferred to another person. Contact us if you need help with a transfer. This can be done until you claim your badge at the entrance to the conference. After that you can not transfer the ticket.',
  },
  {
    q: 'Are tickets refundable?',
    a: 'Tickets are refundable until the end of June, after that it is not refundable, but can be transferred to another attendee.',
  },
  {
    q: 'Are there group discounts?',
    a: 'We do not offer group discounts, but organisations are welcome to purchase multiple tickets.',
  },
  {
    q: 'I work for one of the JavaZone partners — do I order tickets here?',
    a: (
      <>
        No. If your employer is a JavaZone partner, your partner contact will handle ticket ordering on your behalf. Please do not order tickets
        through this page. See the{' '}
        <a href="/partner" className="underline hover:opacity-80">
          partner page
        </a>{' '}
        for more information.
      </>
    ),
  },
  {
    q: 'I have more questions — who do I contact?',
    a: 'Reach out to us at javazone@java.no and we will get back to you as soon as possible.',
  },
]

const TicketsPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 pt-20 relative space-y-8 mb-20">
      <Heading level="h1">Tickets</Heading>
      <section className="text-center max-w-2xl w-full space-y-4">
        <Heading level="h2" className="mt-2 text-left">
          Ticket sales are now open — dive in and secure your spot!
        </Heading>
        <p className="text-base md:text-lg mt-4">
          JavaZone 2026 takes place September 2<sup>nd</sup>–3<sup>rd</sup> at NOVA Spektrum, Lillestrøm. Secure your spot as soon as tickets go on
          sale.
        </p>
        <p className="text-sm md:text-base mt-4 text-cloud-dancer">
          If you're buying tickets on behalf of one of our partners this year, see the{' '}
          <a href="/partner" className="underline hover:opacity-80">
            partner page
          </a>{' '}
          instead.
        </p>
        <div className="flex items-center justify-center mt-4">
          <LinkButton title="Buy tickets" size="large" link="https://event.checkin.no/215065/javazone-2026" className="max-w-md" />
        </div>
      </section>

      <section className="text-left max-w-2xl w-full space-y-4">
        <Heading level="h2">Frequently Asked Questions</Heading>
        <dl className="space-y-6">
          {faq.map((item, idx) => (
            <div key={idx} className="space-y-2">
              <dt className="text-xl md:text-2xl font-semibold leading-snug text-primary">{item.q}</dt>
              <dd className="text-base md:text-lg text-justify text-cloud-dancer">{item.a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  )
}

export default TicketsPage
