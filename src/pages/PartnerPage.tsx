function PartnerPage() {
  return (
    <div className="min-h-screen flex justify-center p-8 pt-20">
      <div className="max-w-2xl text-center space-y-30">
        <h1 className="text-5xl font-bold mb-20">Partner page</h1>
        <div>
          <h2 className="text-2xl font-bold mb-4">First partner meeting</h2>
          <p>
            The first partner meeting will take place in December at{" "}
            <a
              className="text-blue-500 underline"
              href="https://maps.app.goo.gl/mApJFGsv4ERNFS7T8"
            >
              Rebel
            </a>
            . The exact date will be announced later. If you're unable to
            attend, the meeting will be recorded.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p>
            If you have any questions or concerns, please reach out to us at{" "}
            <a
              className="text-blue-500 underline"
              href="mailto:partner@java.no"
            >
              partner@java.no
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

export default PartnerPage;
