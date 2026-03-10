import { Heading, LinkButton } from '@/components'

const AboutPage = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-8 pt-20 mb-20 space-y-8">
      <Heading level="h1">About JavaZone</Heading>

      <section className="w-full max-w-2xl space-y-4 text-left">
        <p>
          JavaZone is the biggest community-driven Java conference that has been organized in Oslo, Norway since 2001. It is organized on a voluntary
          basis by a group of people from javaBin, the Norwegian Java User Group, working around the year and putting many hours to create an amazing
          conference experience for you.
        </p>
        <div className="pt-4 text-center">
          <LinkButton title="Check previous JavaZones" link="/history" />
        </div>
      </section>

      <section className="w-full max-w-2xl space-y-4 text-left">
        <Heading level="h2">About javaBin</Heading>
        <p>
          JavaBin is one of the largest communities in Norway. It is driven by volunteer enthusiasts from across the country. We have branches
          throughout the country – in Stavanger, Bergen, Trondheim, Vestfold, Sogn, Tromsø, Southern Norway and Oslo.
        </p>
        <p>
          We organize events almost every month in all branches of javaBin, including meetups, events for students, events for kids, and other
          exciting stuff!
        </p>
        <div className="pt-4 text-center">
          <LinkButton title="Read more about us" link="https://www.java.no/" />
        </div>
      </section>

      <section className="w-full max-w-2xl space-y-4 text-left">
        <Heading level="h2">A few very important principles</Heading>

        <p>
          JavaZone is a 100% community-organized conference created by javaBin. The program is chosen by our independent program committee, and they
          operate under the principle that no-one is paid to hold a presentation, and likewise, that no-one can pay us to get their presentation
          accepted.
        </p>
        <div className="pt-4 text-center">
          <LinkButton title="Read more about our principles" link="https://www.java.no/principles" size="small" className="mx-auto" />
        </div>

        <p>
          We as organizers strive to create the best possible learning experience for all our speakers and participants, and we expect you to do the
          same. Everyone is welcome at JavaZone, but we do require that you treat your fellow conference participants with respect.
        </p>
        <p>
          We reserve the right to take any action necessary to make sure this principle is upheld. For more details, see our Code of Conduct that
          applies to all events organized by javaBin.
        </p>
      </section>

      <section className="w-full max-w-2xl space-y-4 text-left">
        <h3 className="text-xl font-semibold">Should any unwanted event occur, we’re here to help!</h3>
        <p>
          <span className="font-bold">Before the conference:</span> you can contact us by email:{' '}
          <a href="mailto:javazone@java.no" className="underline">
            javazone@java.no
          </a>{' '}
          (this goes to a small group of people, the core organizers of JavaZone), or{' '}
          <a href="mailto:styret@java.no" className="underline">
            styret@java.no
          </a>{' '}
          (this goes to the javaBin board).
        </p>
        <p>
          <span className="font-bold">During the conference:</span> Ask at the info stand, and we’ll be in touch. Contact information will also be
          available at the info stand.
        </p>
      </section>

      <section className="w-full max-w-2xl space-y-4 text-left">
        <Heading level="h2">Food</Heading>
        <p>
          JavaZone promises to tantalize your taste buds and satisfy your cravings throughout the conference. For attendees with allergies or dietary
          restrictions, rest assured that each restaurant is committed to providing a safe and enjoyable dining experience.
        </p>
        <p>
          Our chefs are well-versed in accommodating gluten, nut, dairy, and other common allergies. Simply inform the restaurant staff of your
          dietary needs, and they will guide you through the menu or offer personalized suggestions.
        </p>
      </section>

      <section className="w-full max-w-2xl space-y-4 text-left">
        <Heading level="h2">Sustainable waste management and recycling at JavaZone</Heading>
        <p>
          In an era where environmental consciousness is at the forefront, responsible waste management practices have become imperative. At Oslo
          Spektrum, an innovative partnership with Oslo Municipality and Franzefoss ensures that waste is not just disposed of, but actively sorted
          and recycled, promoting a greener future.
        </p>

        <p>
          Upon entering JavaZone, attendees may not be immediately aware of the meticulous waste management system that operates behind the scenes.
          Once waste is discarded, the process of responsible disposal begins. A comprehensive sorting mechanism is in place, designed to separate
          recyclables from non-recyclable materials.
        </p>
        <p>
          One notable aspect of this waste management initiative is the sorting and collection of beverage containers for deposit refund, known as
          &quot;pant&quot; in Norway. The bottles and cans are systematically collected, sorted, and sent for recycling, embodying the ethos of
          resource efficiency.
        </p>
        <h3 className="text-lg font-semibold">Where does it all end up?</h3>
        <p>
          Considerable portions of waste generated during JavaZone are earmarked for recycling. Through a blend of advanced waste separation
          technology and dedicated staff, materials like paper, plastic, glass, and metal are carefully segregated.
        </p>
        <p>
          The residual waste is further sorted at the Franzefoss plant in Haraldsrud and the remaining 70% is ground up and converted into FOB
          (refined waste fuel). Franzefoss has an agreement with Norcem for the delivery of FOB and this is used by Norcem as a high-value fuel for
          cement production.
        </p>
        <p>
          The food waste/wet organic waste delivered is used for biogas and fertilizer on grain fields. This not only reduces the environmental impact
          of JavaZone but also sets an example for attendees and the wider community.
        </p>
      </section>
    </div>
  )
}

export default AboutPage
