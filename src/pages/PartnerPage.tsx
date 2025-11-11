function PartnerPage() {
  return (
    <div className="min-h-screen flex justify-center p-8 pt-20">
      <div className="max-w-2xl text-center space-y-30">
        <h1 className="text-5xl font-bold mb-20">JavaZone 2026 partner</h1>
        <div>
          <div className="text-left space-y-4">
            <h2 className="text-3xl font-bold mb-6">
              First partner meeting for JavaZone 2026
            </h2>
            <p>
              It's time to start planning the next JavaZone. If you're
              interested in being a partner, we'll be holding a meeting to give
              general information about what it means to be a partner with
              JavaZone. We'll be going through some practical details such as
              pricing and important dates throughout 2026. And of course we'll
              answer any questions you might have.
            </p>
            <p>
              <strong>Time:</strong> December 9th 2025 at 14:00
              <br />
              <strong>Place:</strong>
              <a
                className="text-blue-500 underline"
                href="https://maps.app.goo.gl/mApJFGsv4ERNFS7T8"
              >
                Rebel
              </a>
              , Universitetsgata 2, 0164 Oslo
            </p>
            <p>
              Even if you've been a partner before, we have some interesting
              news to share. As is tradition, we'll be serving Christmas
              porridge.
            </p>
            <p>Please let us know if you'll be attending.</p>
            <p>
              We'll also publish all information on our website after the
              meeting.
            </p>
            <div className="mt-6 text-center">
              <a href={"https://forms.gle/SLHUdVqC1toU6bcw9"}

                className="btn bg-gray-400 text-gray-200 font-bold py-3 px-6 rounded-lg text-lg"
              >
                Register here
              </a>
            </div>
          </div>
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
