import { BubbleIcons, Heading } from '@/components'

interface CharityCompany {
  name: string
  englishName: string
  link: string
  logo: string
}
const charityCompanies: CharityCompany[] = [
  { name: 'Endometrioseforeningen', englishName: 'Endometriosis Association', link: 'fsdfs', logo: 'src/assets/graphics/fish-1.svg' },
  { name: 'Kreftforeningen', englishName: 'Norwegian Cancer Society', link: 'fsdfs', logo: 'src/assets/graphics/fish-2.svg' },
  { name: 'Leger Uten Grenser', englishName: 'Medecins Sans Frontieres', link: 'fsdfs', logo: 'src/assets/graphics/fish-3.svg' },
]

const AweZonePage = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-8 pt-20 mb-20 space-y-8">
      <BubbleIcons />
      <Heading level="h1">AweZone Party</Heading>

      <section className="w-full max-w-2xl space-y-4 text-left">
        <Heading level="h2">AweZone is JavaZone's traditional party which takes place on Wednesday evening.</Heading>
        <p>
          We will stay at Nova Spektrum the entire evening and the party offers a great chance to catch up with old friends, meet new ones, and also
          experience a great lineup of entertainment!
        </p>
        <p>The bars open at 6:00 PM and we will be starting the party at 7:20 PM.</p>
      </section>

      <section className="w-full max-w-2xl space-y-4 text-left">
        <Heading level="h4" className={'test-class'}>
          Partner bands
        </Heading>

        <p>Our concert room for the evening is Overflow, kicking it off with our partner bands in the following order:</p>
        <ul className={'aweZone-list pl-6 space-y-2'}>
          <li>8:00 PM - Kanban</li>
          <li>8:30 PM - Endure</li>
          <li>9:00 PM - Carsten Anker Band</li>
        </ul>
      </section>

      <section className="w-full max-w-2xl space-y-4 text-left">
        <Heading level="h4">Expo DJ</Heading>
        <p>DJ Sebastian Emes is playing in Expo from 7:20 PM – closing time. Feel free to ask for your favourite song.</p>
      </section>

      <section className="w-full max-w-2xl space-y-4 text-left">
        <Heading level="h4">Headliner band</Heading>
        <p>This year's headliner band is Ylvis, known for "The Fox", "The Cabin" and many more. Join us for an epic show!</p>
      </section>

      <section className="w-full max-w-2xl space-y-4 text-left">
        <Heading level="h4">Cæsars Palace</Heading>
        <p>
          Enjoy a small taste of Cæsars Palace as we open tables of Black Jack, Poker and Roulette for you to enjoy. In order to play you must visit
          our partners during the day to collect Duke Dosh.
        </p>
        <p>If you are lucky enough to win, or have Duke Dosh to spare, you can donate your winnings to one or several of our selected charities:</p>

        <div className={'flex flex-row justify-center gap-5 flex-wrap my-4'}>
          {charityCompanies.map((company) => (
            <a target={'_blank'} key={company.name} href={company.link} className={'w-auto mb-4 no-underline'}>
              <div className={'flex flex-col items-center p-2 bg-base-200 rounded-lg hover:bg-base-300 transition-colors'}>
                <img src={company.logo} alt={`${company.englishName} logo`} className={'w-[60px] h-[60px] object-contain'} />
                <p className={'text-center mt-2 font-medium text-base'}>{company.name}</p>
                <p className={'text-center text-blue-300 mt-0.5 text-xs'}>{company.englishName}</p>
              </div>
            </a>
          ))}
        </div>

        <p>
          You will be able to enjoy the drinks, stay in the chill-out areas, participate in activities, as well as mingle with the conference
          organizers, speakers, other participants, and our partners!
        </p>

        <p>Oh, and one more thing! We will be serving good food in the evening as well. Some drinks are on us, some will be on our partners!</p>
      </section>
    </div>
  )
}

export default AweZonePage
