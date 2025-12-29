function ReimbursementPolicyPage() {
  return (
    <div className="min-h-screen flex justify-center p-8 pt-20 relative z-0">
      <div className="max-w-2xl text-center space-y-12">
        <h1 className="text-5xl font-bold mb-20">Reimbursement Policy</h1>

        <div className="text-left space-y-4">
          <h2 className="text-3xl font-bold mb-6">What & How</h2>
          <p>
            If your presentation or a workshop is accepted, you may apply for a
            refund for travel and accommodation. Read below to find out if you
            are eligible.
          </p>
          <p>
            Applications for speaker reimbursements must be submitted before{" "}
            <strong>August 1st, 2026</strong>.
          </p>
        </div>

        <div className="text-left space-y-4">
          <h2 className="text-3xl font-bold mb-6">How to apply</h2>
          <p>
            The first thing to note is that you need to apply for reimbursement
            of costs. This is necessary for our budget planning. If you require
            financial support, please reach out to{" "}
            <a
              href="mailto:refund@java.no"
              className="text-blue-500 underline"
            >
              refund@java.no
            </a>{" "}
            after your session or workshop is accepted.
          </p>
          <p>
            In this mail, provide an estimate of your travel expenses and the
            days you will be visiting Oslo during the conference.
          </p>
          <p>
            We have a deal with a hotel, so if you need accommodation, we will
            reserve a room for you. Please state in your application which days
            you are planning to stay. We do not refund travel costs above the
            cost of a reasonably priced economy ticket.
          </p>
          <p>
            Please also note that we do not refund travel expenses for those
            holding lightning talks. However, speakers (including the ones
            holding lightning talks) will receive a free conference ticket.
          </p>
        </div>

        <div className="text-left space-y-4">
          <h2 className="text-3xl font-bold mb-6">Confirmation & Reimbursement</h2>
          <p>
            Applications must be confirmed explicitly via{" "}
            <a
              href="mailto:refund@java.no"
              className="text-blue-500 underline"
            >
              refund@java.no
            </a>{" "}
            and are only accepted prior to our conference. Reimbursements are
            provided after the conference. For this, we require you to send us
            copies of all receipts, the name of your bank and international
            account numbers (IBAN, BIC/SWIFT, if available). We reserve the
            right to decline a refund application. Speakers living in proximity
            to Oslo are not eligible.
          </p>
          <p>
            Reimbursements are processed and paid after the conference. We will
            reach out to speakers who applied for reimbursement and process the
            payments once payment details are provided.
          </p>
        </div>

        <div className="h-24" aria-hidden="true" />
      </div>
    </div>
  );
}

export default ReimbursementPolicyPage;
