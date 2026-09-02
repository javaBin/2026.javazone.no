import { BubbleField, Heading, ImageCarousel } from '@/components'
import pageMeta from '@/data/pageMeta.json'
import { useOpenGraph } from '@/hooks/useOpenGraph'

const AboutPage = () => {
  useOpenGraph(pageMeta.about)

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-8 pt-20 mb-20 space-y-8">
      <BubbleField variant="subtle" />
      <Heading level="h1">javaBin is 30!</Heading>

      <section className="w-full max-w-2xl space-y-4 text-left">
        <p>
          javaBin is one of Norway´s largest community-groups, driven by volunteers from all over Norway. We have local groups in Stavanger, Bergen,
          Trondheim, Vestfold, Sørlandet, Sogndal og Oslo.
        </p>

        <p>Every region has their own meetups, so there is always something happening in javaBin all over the country.</p>
      </section>

      <section className="w-full max-w-2xl space-y-4 text-left">
        <Heading level="h2">What is javaBin?</Heading>
        <p>
          Java User group in Norway was first started in the summer of 1996 as a cooperation between Skrivervik Data, Radio 1 and Schibsted Nett. The
          goal was to be an organizer of a Norwegian applet-competition after a similar international competition organized by SunSoft. The UserGroup
          died out after until enthusiasts founded the User Group with a formal meeting on the 23rd April 1998.
        </p>
      </section>

      <section className="w-full max-w-2xl space-y-4 text-left">
        <Heading level="h2">The board of javaBin and coordinators of JavaZone</Heading>
        <p>
          In addition to the board, there is a group of coordinators that focuses on JavaZone. They each have their own responsibilities and meet once
          a month during the year and once a week in August.
        </p>
      </section>

      <section className="w-full max-w-2xl space-y-4 text-left">
        <Heading level="h2">Workshops and meetings</Heading>

        <p>There are 3 workshops each year during the spring. This happens on Saturdays, in January, March and May.</p>

        <p>
          In addition to the workshops, we meet every Tuesday in Oslo to work with the conference program, coding and other things that need to be
          planned before the conference.
        </p>
      </section>

      <section className="w-full max-w-2xl space-y-4 text-left">
        <Heading level="h2">Kids</Heading>
        <p>javaBin has a long tradition of making events for kids and youths. javaBin Kids is always a huge success for those that get a place. </p>
      </section>

      <section className="w-full max-w-2xl space-y-4 text-left">
        <Heading level="h2">JavaBin gives back</Heading>
        <p>
          javaBin wishes to contribute to a vibrant community for developers in Norway. Through its grant scheme, javaBin supports initiatives that
          promote knowledge sharing. Read more{' '}
          <a target={'_blank'} href="https://javabin.atlassian.net/wiki/spaces/javabin/pages/3083567105/javaBin+gir+tilbake">
            here (Norwegian)
          </a>
        </p>
      </section>

      <section>
        <Heading level="h1" className={'mb-10'}>
          JavaZone is 25!
        </Heading>
      </section>

      <section className="w-full max-w-2xl space-y-4 text-left">
        <Heading level="h2">26th September 2002</Heading>
        <p>The first JavaZone, a day with lectures and networking at Chateau Neuf in Oslo. The lectures were streamed from JavaOne.</p>
        <img className={'rounded-2xl'} src="/public/javaBin30JavaZone25years/javaZone2002.png" alt="First JavaZone" />
      </section>

      <section className="w-full max-w-2xl space-y-4 text-left">
        <Heading level="h2">18th - 19th September 2003</Heading>
        <p>
          First JavaZone as a conference. There were about 400-500 participants at Chateau Neuf. The program had about 30 speakers, among them: Kent
          Beck, Joshua Bloch, Ward Cunningham, Rickard Öberg and Neal Gafter. It marked the start of Norway's biggest conference for developers.
        </p>
        <img className={'rounded-2xl'} src="/public/javaBin30JavaZone25years/javaZone2003.png" alt="First JavaZone" />
      </section>

      <section className="w-full max-w-2xl space-y-4 text-left">
        <Heading level="h2">Planning</Heading>
        <p>
          javaBin works through the year to plan the conference. After the conference we take a short break before we start again with the next one.
          The group of coordinators, program committee, the coding group and more - all the small and big groups work through the season to make the
          best conference possible.
        </p>
      </section>

      <section className="w-full max-w-2xl space-y-4 text-left">
        <Heading level="h2">Details from the history on the javaBin-stand</Heading>
        <p>
          Have you noticed some things from earlier JavaZone that have gotten under the Sea? You can find the Throne from 2014, Balloons from 2019,
          Clock-tower from 2024 and Roman columns.
        </p>
      </section>

      <section className="w-full max-w-2xl space-y-4 text-left">
        <ImageCarousel
          images={[
            { src: '/javaBin30JavaZone25years/Screenshot%202025-12-22%20010229.png', alt: 'JavaZone memory' },
            { src: '/javaBin30JavaZone25years/Foto%20Runhild%20Heggem-12.jpg', alt: 'JavaZone memory', credit: 'Runhild Heggem / javaBin' },
            { src: '/javaBin30JavaZone25years/Foto-%20Runhild%20Heggem-34.jpg', alt: 'JavaZone memory', credit: 'Runhild Heggem / javaBin' },
            { src: '/javaBin30JavaZone25years/Foto-%20Runhild%20Heggem-22.jpg', alt: 'JavaZone memory', credit: 'Runhild Heggem / javaBin' },
          ]}
        />
      </section>

      <b className={'text-[1.2rem]'}>
        Please contact us at{' '}
        <a target={'_blank'} href="javabin.no">
          javaBin
        </a>
        , if you want to know more about the User Group or JavaZone!
      </b>
    </div>
  )
}

export default AboutPage
