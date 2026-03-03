import { Card, Heading, LinkButton } from '@/components'

const VolunteerPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 pt-20 relative space-y-8 mb-20">
      <Heading level="h1" className="mb-20">
        Volunteer at Javazone?
      </Heading>

      <section className="text-left max-w-2xl w-full space-y-4">
        <p className="text-base md:text-lg">
          JavaZone is the world's largest community-driven Java conference, with more than 3000 developers attending every year. Would you like to
          contribute to making this event an amazing experience? Sign up to become a volunteer!
        </p>

        <div className="flex items-center justify-center mt-6">
          <LinkButton title="Sign up here" link="https://forms.gle/CsR71mRvs4T8wXpq8" />
        </div>
      </section>

      <section className="text-left max-w-2xl w-full space-y-4">
        <Heading level="h2">Frequently Asked Questions</Heading>
        <Card title="">
          <div className="px-2 py-6">
            <dl className="space-y-6">
              {faq.map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <dt className="text-xl md:text-2xl font-semibold text-slate-blue-gray">{item.q}</dt>
                  <dd className="text-lg md:text-xl text-justify text-cloud-dancer">{item.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Card>
      </section>
    </div>
  )
}

const faq = [
  {
    q: "I don't speak Norwegian, what about me?",
    a: 'You need to be able to communicate in both Norwegian and English to be a volunteer at JavaZone.',
  },
  {
    q: 'Who can be a volunteer at JavaZone?',
    a: 'All students who are fluent in both Norwegian and English can become volunteers at JavaZone.',
  },
  {
    q: 'What will I do as a volunteer?',
    a: 'Tasks include hall monitoring, information desk duty, and handing out headsets, among others.',
  },
  {
    q: 'How many volunteers participate at JavaZone?',
    a: "Over 50 volunteers participate each year. Interest is high, but it's worth applying!",
  },
  {
    q: 'Will I get to attend sessions as a volunteer?',
    a: 'You get about 50% free time to attend talks, eat great food, and network with IT professionals.',
  },
  {
    q: 'What about travel if I don’t live in the area?',
    a: 'JavaZone does not cover travel or accommodation, but check with your university about travel support.',
  },
  {
    q: 'Can I join AweZone?',
    a: 'Yes! No work in the evening – just party and fun!',
  },
  {
    q: 'When do I need to show up as a volunteer?',
    a: 'Training and info will be given on the 1st of September, and you need to show up both the 2nd and the 3rd for the conference.',
  },
  {
    q: 'When is the application deadline?',
    a: 'The application deadline is Sunday, June 7th.',
  },
]

export default VolunteerPage
