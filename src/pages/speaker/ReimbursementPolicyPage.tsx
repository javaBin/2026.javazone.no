import { Heading } from '@/components'

const ReimbursementPolicyPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 pt-20 relative space-y-8 mb-20">
      <Heading level="h1">Reimbursement Policy</Heading>

      <section className="text-left max-w-2xl w-full space-y-4">
        <Heading level="h2">What & How</Heading>
        <p className="text-base md:text-lg">
          If your presentation or a workshop is accepted, you may apply for a refund for travel and accommodation. Read below to find out if you are
          eligible.
        </p>
        <p className="text-base md:text-lg">
          Applications for speaker reimbursements must be submitted before{' '}
          <strong>
            August 1<sup>st</sup>, 2026
          </strong>
          .
        </p>
      </section>

      <section className="text-left max-w-2xl w-full space-y-4">
        <Heading level="h2">How to apply</Heading>
        <p className="text-base md:text-lg">
          The first thing to note is that you need to apply for reimbursement of costs. This is necessary for our budget planning. If you require
          financial support, please reach out to{' '}
          <a href="mailto:refund@java.no" className="text-sunbeam-gold underline">
            refund@java.no
          </a>{' '}
          after your session or workshop is accepted.
        </p>
        <p className="text-base md:text-lg">
          In this mail, provide an estimate of your travel expenses and the days you will be visiting Oslo during the conference.
        </p>
        <p className="text-base md:text-lg">
          We have a deal with a hotel, so if you need accommodation, we will reserve a room for you. Please state in your application which days you
          are planning to stay. We do not refund travel costs above the cost of a reasonably priced economy ticket.
        </p>
        <p className="text-base md:text-lg">
          Please also note that we do not refund travel expenses for those holding lightning talks. However, speakers (including the ones holding
          lightning talks) will receive a free conference ticket.
        </p>
      </section>

      <section className="text-left max-w-2xl w-full space-y-4">
        <Heading level="h2">Confirmation & Reimbursement</Heading>
        <p className="text-base md:text-lg">
          Applications must be confirmed explicitly via{' '}
          <a href="mailto:refund@java.no" className="text-sunbeam-gold underline">
            refund@java.no
          </a>{' '}
          and are only accepted prior to our conference. Reimbursements are provided after the conference. For this, we require you to send us copies
          of all receipts, the name of your bank and international account numbers (IBAN, BIC/SWIFT, if available). We reserve the right to decline a
          refund application. Speakers living in proximity to Oslo are not eligible.
        </p>
        <p className="text-base md:text-lg">
          Reimbursements are processed and paid after the conference. We will reach out to speakers who applied for reimbursement and process the
          payments once payment details are provided.
        </p>
      </section>
    </div>
  )
}

export default ReimbursementPolicyPage
