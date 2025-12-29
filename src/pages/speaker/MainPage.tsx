import { Link } from "react-router-dom";

function SpeakerMainPage() {
  return (
    <div className="min-h-screen flex justify-center p-8 pt-20 relative z-0">
      <div className="max-w-2xl text-center space-y-12">
        <h1 className="text-5xl font-bold mb-20">Call for Speakers</h1>

        <div className="text-left space-y-4">
          <p>
            JavaZone 2026 will be the 24th physical JavaZone conference and will
            consist of a day of pre-conference workshops, followed by two days
            of lightning talks and presentations in September.
          </p>

          <p>
            The conference is usually sold out, with more than 3200 attendees
            enjoying well over 100 sessions from both Norwegian and
            international speakers. We'd love to have you join us this coming
            September! JavaZone hosts both international and Norwegian speakers.
          </p>

          <p><strong>Submissions opens January 1st!</strong></p>

          <div className="text-center pt-4">
            <a
              href="https://talks.javazone.no/"
              className="btn btn-primary btn-lg"
            >
              Submit talk
            </a>
          </div>
        </div>

        <div className="text-left space-y-4">
          <h2 className="text-3xl font-bold mb-6">
            What is it like speaking at JavaZone?
          </h2>

          <p>
            Over the last decade JavaZone has grown to become one of the most
            important Java events in Europe! You can see for yourself - over
            1500 videos from previous years' talks are available for free at
            Vimeo, and the full program from JavaZone 2025 is also available.
          </p>

          <p>
            We can brag as much as we want, but JavaZone would be nothing
            without all the great speakers! That's why we need your help to make
            sure that JavaZone 2026 will be at least as awesome as the earlier
            events. If you think you have something interesting to share, please
            submit your talk or workshop.
          </p>

          <p>
            JavaZone is committed to diversity, and we are especially interested
            in quality submissions from groups that are under-represented in
            tech. This year we also invite speakers to our JavaZone Kids.
          </p>

          <div className="text-center pt-4">
            <a
              href="https://vimeo.com/javazone"
              className="btn btn-primary btn-lg"
            >
              Watch Videos
            </a>
          </div>


          
        </div>

        <div className="text-left space-y-4">
          <h2 className="text-3xl font-bold mb-6">Formats and durations</h2>

          <p>
            You should think about which format your talk will work best in. Are
            you presenting a new idea, or do you require more time to elaborate
            on your subject? How hands-on do you want to be? We have three
            formats you can present your material in.
          </p>

          <div className="space-y-6 mt-6">
            <section className="rounded-lg border border-base-300 p-6 bg-base-100">
              <h3 className="text-2xl font-bold">
                Lightning talks (10 or 20 minutes)
              </h3>
              <p className="mt-4">
                Are you presenting a great new idea, or want to give the
                audience a teaser for a cool topic? Then you should strongly
                consider the lightning talk format. Note that the 10-20 minute
                time limit is strictly enforced!
              </p>
            </section>

            <section className="rounded-lg border border-base-300 p-6 bg-base-100">
              <h3 className="text-2xl font-bold">
                Presentations (45 or 60 minutes)
              </h3>
              <p className="mt-4">
                Presentations at JavaZone can be either 45 or 60 minutes long.
                This gives you room to elaborate on an idea. When submitting
                your talk, please indicate clearly in the outline how much time
                is reserved for questions.
              </p>
            </section>

            <section className="rounded-lg border border-base-300 p-6 bg-base-100">
              <h3 className="text-2xl font-bold">
                Workshops (2 hours, 4 hours, 8 hours)
              </h3>
              <p className="mt-4">
                We will continue the popular workshop concept with a range of
                sessions on Tuesday, September 1st. The format for the workshops
                is in-depth, hands-on and interactive.
              </p>
            </section>

            <section className="rounded-lg border border-base-300 p-6 bg-base-100">
              <h3 className="text-2xl font-bold">JavaZone Kids</h3>
              <p className="mt-4">
                For those interested in bringing the magic of software
                development to kids, we have a mini conference for kids the
                weekend before JavaZone. Please see their separate call for
                speakers for more information.
              </p>
            </section>
          </div>
        </div>

        <div className="text-left space-y-4">
          <h2 className="text-3xl font-bold mb-6">Audience and topics</h2>

          <p>
            JavaZone is a conference for developers and technical architects,
            with an emphasis on technical talks. However, we are open to talks
            about other topics related to programming as well, like methodology
            or project management.
          </p>

          <p>
            Despite our conference name, we do not limit our content to Java
            technology. We will consider all talks based on their relevance to
            developers and technical architects. We do, however, focus on
            technology surrounding the JVM when selecting talks.
          </p>

          <p>
            Over the years, we have gathered some{" "}
            <Link to="/speaker/tips" className="text-blue-500 underline">
              submission tips
            </Link>
            , which may be useful to both new and experienced speakers.
          </p>
        </div>

        <div className="text-left space-y-4">
          <h2 className="text-3xl font-bold mb-6">Ongoing evaluation of talks</h2>

          <p>
            Each year we receive hundreds of submissions, and we consider each
            submission as it arrives. We answer all submissions and will do so
            no later than end of June.
          </p>

          <p>
            Our advice to you is simple. Submit early! The earlier you submit,
            the more likely you are to be noticed. Avoid drowning in the
            end-of-Call-for-Speakers tsunami!
          </p>
        </div>

        <div className="text-left space-y-4">
          <h2 className="text-3xl font-bold mb-6">Location</h2>

          <p>
            Our usual venue, Oslo Spektrum, is closed for renovation and
            expansion so we have moved JavaZone to NOVA Spektrum, a huge arena
            in Lillestrøm, a town just outside Oslo. We are working hard to make
            the venue just as magical as our usual venue.
          </p>

          <p>
            Traveling to Lillestrøm is just as easy as traveling to Oslo,
            because both the Airport Express train and regular trains stop here
            on their way from Oslo airport to Oslo city center. For those based
            in Oslo, Lillestrøm is just 10 minutes away, with very frequent
            train departures.
          </p>
        </div>

        <div className="text-left space-y-4">
          <h2 className="text-3xl font-bold mb-6">What's in it for me?</h2>

          <div className="space-y-6">
            <section className="rounded-lg border border-base-300 p-6 bg-base-100">
              <h3 className="text-2xl font-bold">
                Accepted presentations, lightning talks, and workshops
              </h3>
              <p className="mt-4">
                As a JavaZone speaker, you get free admission to the conference.
                Additionally, you are also invited to the speakers' dinner, held
                on September 1st.</p>
              <p className="mt-4">
                All accepted speakers can apply to join us at
                JourneyZone, our famous speakers' tour into the Norwegian
                wilderness. More details will be available soon.
              </p>
            </section>

            <section className="rounded-lg border border-base-300 p-6 bg-base-100">
              <h3 className="text-2xl font-bold">Coverage of expenses</h3>
              <p className="mt-4">
                Please see our{" "}
                <Link
                  to="/speaker/reimbursement"
                  className="text-blue-500 underline"
                >
                  reimbursement policy
                </Link>{" "}
                if you have any questions regarding coverage of other expenses. Starting this year, we also have a new <Link to="/speaker/family-ticket" className="text-blue-500 underline">
              family ticket policy
            </Link>.
              </p>
            </section>

            <section className="rounded-lg border border-base-300 p-6 bg-base-100">
              <h3 className="text-2xl font-bold">Important principles</h3>
              <p className="mt-4">
                JavaZone is proud to be an independent and community-driven
                conference. It is organized by volunteers from javaBin (the
                Norwegian Java User Group) and is run as a non-profit
                organization. This means that we have three important principles
                for selecting talks:
              </p>
              <ul className="mt-4 list-disc pl-6 space-y-2">
                <li>We do not sell speaker slots.</li>
                <li>We do not accept sales pitches masked as presentations.</li>
                <li>
                  We do not differentiate between speakers from partners and
                  independent speakers.
                </li>
              </ul>
            </section>
          </div>

          <p className="mt-6">
            If your talk adheres to these very important principles, you are
            more than welcome to submit it to our Call for Speakers!
          </p>

          <p>
            We hope to see you at JavaZone 2026 - please feel free to spread the
            word to your local community!
          </p>

          <p className="italic">
            Best regards,
            <br />
            the JavaZone Program Committee
          </p>
        </div>

        <div className="h-24" aria-hidden="true" />
      </div>
    </div>
  );
}

export default SpeakerMainPage;
