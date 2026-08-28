import { BubbleField, Heading, LinkButton } from '@/components'
import { PartnerBanner } from '@/components/PartnerBanner.tsx'
import { useOpenGraph } from '@/hooks/useOpenGraph'

const PartnerPage = () => {
  useOpenGraph({
    title: 'Partner with Us | JavaZone 2026',
    description:
      'Become a JavaZone 2026 partner. Learn about partnership packages and how to get in touch with the team about sponsoring the conference.',
  })

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 pt-20 relative space-y-8 mb-20">
      <BubbleField variant="subtle" />
      <Heading level="h1" className="mb-20">
        JavaZone 2026 partner
      </Heading>

      <section className="text-center max-w-2xl w-full space-y-4">
        <div className="flex items-center justify-center mt-4">
          <LinkButton title="Info for partners" variant="primary-outline" size="medium" link="/partner/info" />
        </div>
      </section>

      <PartnerBanner />

      <p className="text-center max-w-2xl w-full">
        If you&apos;re interested in becoming a JavaZone partner, please email us at{' '}
        <a className="text-sunbeam-gold underline" href="mailto:partner@java.no">
          partner@java.no
        </a>
      </p>
    </div>
  )
}

export default PartnerPage
