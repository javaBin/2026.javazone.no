import { BubbleField, Heading, LinkButton } from '@/components'
import { useMetaDescription } from '@/hooks/useMetaDescription'

const AwezonePage = () => {
  useMetaDescription(
    'AweZone, the JavaZone evening party — live performances from Matoma and partner bands, activities, and proper JavaZone party energy.',
  )

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-8 pt-20 mb-20 space-y-8">
      <BubbleField variant="subtle" />
      <Heading level="h1">AweZone Party</Heading>

      <section className="w-full max-w-2xl space-y-4 text-left">
        <p>
          When the talks are done for the day, JavaZone is far from over. It's time to swap code for music, grab your conference friends, and join us
          for an evening of live performances, activities, and proper JavaZone party energy.
        </p>
      </section>

      <section className="w-full max-w-2xl space-y-4 text-left">
        <Heading level="h2">Matoma takes the stage 🎶</Heading>
        <p>We're incredibly excited to welcome Matoma to JavaZone!</p>
        <p>
          Norwegian DJ and producer Matoma has made his mark far beyond Norway with his signature feel-good blend of electronic, tropical house and
          pop. Known for bringing huge energy and good vibes to the stage, he's the perfect headliner for a night where the JavaZone community gets to
          celebrate together.
        </p>
        <p>Expect a packed dance floor.</p>
      </section>

      <section className="w-full max-w-2xl space-y-4 text-left">
        <Heading level="h2">Partner bands</Heading>
        <p>One of our favourite JavaZone traditions is putting the spotlight on the musical talent hiding in the tech community.</p>
        <p>
          Throughout the evening, amazing bands from our JavaZone partners will take the stage. These are people you might normally meet talking about
          architecture, platforms, Java or cloud – but tonight, they're bringing guitars, drums and microphones instead.
        </p>
        <p>Come early, cheer them on, and discover just how much musical talent there is in our community.</p>
      </section>

      <section className="w-full max-w-2xl space-y-4 text-left">
        <Heading level="h2">More than music</Heading>
        <p>Not a dance-floor person? No problem.</p>
        <p>
          The JavaZone Party will have activities throughout the venue, giving you plenty of ways to hang out, have fun and meet people between
          concerts. Whether you want to challenge your colleagues, try something new, or simply find a good spot for a chat, there'll be more to
          explore than just the main stage.
        </p>
        <p>More details about the activities will be announced as we get closer to JavaZone.</p>
      </section>

      <section className="w-full max-w-2xl space-y-4 text-left">
        <Heading level="h2">Food @ the party!</Heading>
        <p>Yes, there will be food at the pary. We will serve Chilli Con Carne and Chilli Sin Carne</p>
      </section>

      <section className="w-full max-w-2xl space-y-4 text-left">
          <Heading level="h2">In summary</Heading>
        <p>The AweZone is about bringing the community together after a full day of learning, discussions and inspiration.</p>
        <p>Come for the partner bands. Stay for Matoma. Try the activities. Meet old friends and make some new ones.</p>
          <p>We will party until midnight (Bar closes at 23:30)</p>
        <p className="font-semibold">See you at AweZone! 💃🕺</p>
        <div className="pt-4 text-center">
          <LinkButton title="Get your ticket" link="/tickets" variant="pop" />
        </div>
      </section>
    </div>
  )
}

export default AwezonePage
