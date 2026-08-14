import { BubbleField, Heading } from '@/components'
import { useMetaDescription } from '@/hooks/useMetaDescription'

const InfoPage = () => {
  useMetaDescription(
    'Everything you need to know about JavaZone 2026 — venue, transportation, parking, workshops, accessibility, food, tickets, and AweZone.',
  )

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-8 pt-20 mb-20 space-y-8">
      <BubbleField variant="subtle" />
      <Heading level="h1">Everything you need to know</Heading>

      <section className="w-full max-w-2xl space-y-4 text-left">
        <p>We can't wait to see everyone at JavaZone 2026! Here's some useful info to make your visit to NOVA Spektrum smooth, safe, and fun.</p>
      </section>

      <section className="w-full max-w-2xl space-y-4 text-left">
        <Heading level="h2">🏛️ JavaZone venue</Heading>
        <p>
          NOVA Spektrum: Messeveien 6, 2004 Lillestrøm. Just a short train ride (10–12 minutes) from Oslo Central Station and only 15 minutes from
          Oslo Airport Gardermoen, it's easy to reach whether you're coming from downtown Oslo or abroad.
        </p>
        <p className="text-secondary">NOVA Spektrum, Messeveien 6, 2004 Lillestrøm, Norway</p>
      </section>

      <section className="w-full max-w-2xl space-y-4 text-left">
        <Heading level="h2">🚆🚌✈️ Public transportation</Heading>
        <h3 className="text-lg font-semibold">Train (Vy)</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>11 min from Oslo S / 12 min from Oslo Airport</li>
          <li>Take R-trains (RE11, R12, R14 etc.) for the fastest travel</li>
          <li>Use the Ruter app to plan your trip</li>
        </ul>
        <h3 className="text-lg font-semibold">Airport Express (Flytoget)</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>12 min from Oslo Airport to Lillestrøm</li>
        </ul>
        <h3 className="text-lg font-semibold">Bus</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>Lillestrøm bus terminal is an 8-minute walk to NOVA Spektrum</li>
        </ul>
      </section>

      <section className="w-full max-w-2xl space-y-4 text-left">
        <Heading level="h2">🚗 Parking</Heading>
        <p>2,200 spaces in front of the venue (paid 24/7). Pay with Autopay, card, or mobile.</p>
        <h3 className="text-lg font-semibold">Vehicles &lt; 3,500 kg</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>NOK 72/hour, max NOK 420/24h</li>
        </ul>
        <h3 className="text-lg font-semibold">Vehicles &gt; 3,500 kg</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>NOK 144/hour, max NOK 840/24h</li>
        </ul>
        <ul className="list-disc pl-6 space-y-1">
          <li>♿ Disabled parking: fields C &amp; F (paid)</li>
          <li>🔌 10 EV charging stations in field A (paid)</li>
        </ul>
      </section>

      <section className="w-full max-w-2xl space-y-4 text-left">
        <Heading level="h2">🔨 Workshops</Heading>
        <p>
          Workshops take place on Tuesday, September 1st, and are included in your conference ticket — seating is limited, and workshop registration
          opens in the middle of August.
        </p>
      </section>

      <section className="w-full max-w-2xl space-y-4 text-left">
        <Heading level="h2">♿ Accessibility</Heading>
        <p>
          NOVA Spektrum is wheelchair accessible. A limited number of wheelchairs are available – contact{' '}
          <a href="mailto:javazone@macsimum.no" className="underline">
            javazone@macsimum.no
          </a>{' '}
          in advance if you need assistance.
        </p>
      </section>

      <section className="w-full max-w-2xl space-y-4 text-left">
        <Heading level="h2">🌤️ Weather</Heading>
        <p>Expect a bit of chill in Oslo – bring a sweater/hoodie, and maybe an umbrella.</p>
      </section>

      <section className="w-full max-w-2xl space-y-4 text-left">
        <Heading level="h2">💸 Currency</Heading>
        <p>Norwegian krone (NOK). Almost all places accept Visa/Mastercard. Cash is rarely needed.</p>
      </section>

      <section className="w-full max-w-2xl space-y-4 text-left">
        <Heading level="h2">👩‍💻👨‍💻 Conference</Heading>
        <p>
          Check out the{' '}
          <a href="/program" className="underline">
            program
          </a>{' '}
          for all talks and workshops. The reception opens at 8 am – tea and coffee will be ready once you get inside!
        </p>
      </section>

      <section className="w-full max-w-2xl space-y-4 text-left">
        <Heading level="h2">🎟️ Tickets</Heading>
        <p>
          Scan your ticket to get an access badge. Once scanned, it's locked to you – but until then, tickets can be transferred. See the{' '}
          <a href="/tickets" className="underline">
            tickets page
          </a>{' '}
          for prices and more details.
        </p>
      </section>

      <section className="w-full max-w-2xl space-y-4 text-left">
        <Heading level="h2">🍲 Food</Heading>
        <p>
          We promise you will not walk around hungry. Our chefs will accommodate all food preferences and allergies. There will be some sweet stuff,
          too – but don't tell anyone!
        </p>
      </section>

      <section className="w-full max-w-2xl space-y-4 text-left">
        <Heading level="h2">🥳 AweZone: celebrating the community</Heading>
        <p>Join us Wednesday evening at NOVA Spektrum for JavaZone's traditional party – a night of music, fun, food, and community.</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Bars open: 18:00</li>
          <li>Party starts: 19:20</li>
        </ul>
      </section>

      <section className="w-full max-w-2xl space-y-4 text-left">
        <Heading level="h2">🗣️ Speakers</Heading>
        <p>Please show up in your room 10 minutes before your talk starts to make sure your equipment works.</p>
      </section>

      <section className="w-full max-w-2xl space-y-4 text-left">
        <Heading level="h2">🤗💛 Code of conduct</Heading>
        <p>
          The goal of the JavaZone conference is to be inclusive of the largest number of participants with varied and diverse backgrounds. If you
          experience any inappropriate behavior, let us know.
        </p>
      </section>

      <section className="w-full max-w-2xl space-y-4 text-left">
        <Heading level="h2">#️⃣ Social media</Heading>
        <p>
          Follow along with #javazone / #javazone2026. Our team will be active – reach out with comments &amp; questions, and join the conversation!
        </p>
      </section>

      <section className="w-full max-w-2xl space-y-4 text-left">
        <Heading level="h2">ℹ️ More info</Heading>
        <p>
          Any questions? Contact{' '}
          <a href="mailto:javazone@java.no" className="underline">
            javazone@java.no
          </a>
          , send us a DM, or catch us at the venue.
        </p>
      </section>
    </div>
  )
}

export default InfoPage
