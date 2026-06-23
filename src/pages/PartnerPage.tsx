import { BubbleField, Heading, LinkButton, Packages } from '@/components'
import { PartnerBanner } from '@/components/PartnerBanner.tsx'

const PartnerPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 pt-20 relative space-y-8 mb-20">
      <BubbleField variant="subtle" />
      <Heading level="h1" className="mb-20">
        JavaZone 2026 partner
      </Heading>
      <section className="text-center max-w-2xl w-full space-y-4">
        <div className="flex items-center justify-center mt-4">
          <LinkButton title="Register as partner" size="medium" variant="pop" link="https://event.checkin.no/215047/javazone-2026-partnership" />
        </div>
      </section>

      <section className="text-center max-w-2xl w-full space-y-4">
        <div className="flex items-center justify-center mt-4">
          <LinkButton title="Info for partners" variant="primary-outline" size="medium" link="/partner/info" />
        </div>
      </section>

      <PartnerBanner />
    </div>
  )
}

export default PartnerPage
