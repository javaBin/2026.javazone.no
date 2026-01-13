function PartnerPage() {
  return (
    <div className="min-h-screen flex justify-center p-8 pt-20 relative z-0">
      <div className="max-w-2xl text-center space-y-30">
        <h1 className="text-5xl font-bold mb-20">JavaZone 2026 partner</h1>
        <div>
          <div className="text-left space-y-4">
            <h2 className="text-3xl font-bold mb-6">
              Partner registration open January 15th at 10:00
            </h2>
            <p>
              You need to decide what
                type of stand you want when registering. The formal contract and invoice will be sent to you later.
                Partner stands are limited and are sold first come first served.
            </p>
              <div className="pt-4 pb-8">
                  <a href="https://event.checkin.no/215047/javazone-2026-partnership" className="btn btn-primary btn-lg text-2xl px-12">
                      Register as partner
                  </a>
              </div>
              <h2 className="text-3xl font-bold mb-6">Partner meeting one</h2>
              <div className="mt-8">
                  <h3 className="text-2xl font-bold mb-4">Watch the recording here</h3>

                  <div className="w-full overflow-hidden rounded-lg bg-black">
                      <div style={{ position: "relative", paddingTop: "56.25%" }}>
                          <iframe
                              src="https://player.vimeo.com/video/1146207302"
                              title="Partner meeting video"
                              allow="autoplay; fullscreen; picture-in-picture"
                              referrerPolicy="strict-origin-when-cross-origin"
                              style={{
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                  width: "100%",
                                  height: "100%",
                                  border: 0,
                              }}
                              allowFullScreen
                          />
                      </div>
                  </div>
                  <div className="text-left mt-12">
                      <h2 className="text-3xl font-bold mb-6">Packages and tickets</h2>

                      <div className="space-y-8">
                          <section className="rounded-lg border border-base-300 p-6 bg-base-100">
                              <h3 className="text-2xl font-bold">Standard package</h3>
                              <p className="mt-2 font-semibold">Price: 100 000,- NOK ex VAT</p>
                              <ul className="mt-4 list-disc pl-6 space-y-2">
                                  <li>6 square meters (3x2) with back and side wall, in the main conference hall.</li>
                                  <li>
                                      <strong>Profiling:</strong> Logo with link on homepage and profiling in Nova Spektrum
                                  </li>
                                  <li>
                                      <strong>Stand ticket:</strong> 4 flexible tickets for stand personnel.
                                  </li>
                                  <li>
                                      <strong>Participant tickets:</strong> Partner price on tickets for your colleagues
                                  </li>
                              </ul>
                          </section>

                          <section className="rounded-lg border border-base-300 p-6 bg-base-100">
                              <h3 className="text-2xl font-bold">Restaurant stand</h3>
                              <p className="mt-2 font-semibold">Price: 190 000,- NOK ex VAT</p>
                              <ul className="mt-4 list-disc pl-6 space-y-2">
                                  <li>All the benefits of the standard package with a restaurant stand</li>
                                  <li>Approx. 80 square meters with a connected restaurant</li>
                                  <li>Continuous food serving from your stand throughout the conference.</li>
                                  <li>Menu in cooperation with event partners.</li>
                              </ul>
                          </section>

                          <section className="rounded-lg border border-base-300 p-6 bg-base-100">
                              <h3 className="text-2xl font-bold">Concept stand</h3>
                              <p className="mt-2 font-semibold">Price: 190 000,- NOK ex VAT</p>
                              <ul className="mt-4 list-disc pl-6 space-y-2">
                                  <li>All the benefits of the standard package.</li>
                                  <li>Stand of approx. 70 square meters</li>
                                  <li>Large space for showing off your own concept</li>
                              </ul>
                          </section>

                          <section className="rounded-lg border border-base-300 p-6 bg-base-100">
                              <h3 className="text-2xl font-bold">Extended package</h3>
                              <p className="mt-2 font-semibold">Price: 160 000,- NOK ex VAT</p>
                              <ul className="mt-4 list-disc pl-6 space-y-2">
                                  <li>Same as Standard upgraded to 12 square meters</li>
                              </ul>
                          </section>

                          <section className="rounded-lg border border-base-300 p-6 bg-base-100">
                              <h3 className="text-2xl font-bold">Partner tickets</h3>
                              <p className="mt-2 font-semibold">
                                  Price: 9 200,- NOK ex VAT <span className="font-normal">(incl ticket fee)</span>
                              </p>

                              <div className="mt-4 space-y-3">
                                  <p>
                                      You have four flexible stand tickets included in your partnership package. These are intended for
                                      stand personnel, and do not give access to the talks. You must order tickets for all your employees
                                      that want to attend a talk (or if you have more than four who need to be on the stand at once).
                                  </p>
                                  <ul className="list-disc pl-6 space-y-2">
                                      <li>Round robin distribution on tickets ordered by May 15th</li>
                                      <li>First come first served if tickets are still available after May 15th</li>
                                  </ul>
                                  <p className="font-medium">Tickets will be available on this page.</p>
                              </div>
                          </section>
                      </div>
                  </div>

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
            </a>.
          </p>

        </div>
          <div className="h-24" aria-hidden="true" />
      </div>
    </div>
  );
}

export default PartnerPage;
