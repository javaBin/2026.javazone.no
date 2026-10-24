import { Container, LinkButton, PageHeader } from '@/components'
import { PartnerBanner } from '@/components/PartnerBanner.tsx'
import pageMeta from '@/data/pageMeta.json'
import { useOpenGraph } from '@/hooks/useOpenGraph'

const PartnerPage = () => {
  useOpenGraph(pageMeta.partner)

  return (
    <>
      <PageHeader
        eyebrow="Partners"
        title="JavaZone 2027 partners"
        actions={<LinkButton title="Info for partners" link="/partner/info" variant="primary" />}
      >
        <p>
          If you&apos;re interested in becoming a JavaZone partner, please email us at <a href="mailto:partner@java.no">partner@java.no</a>.
        </p>
      </PageHeader>
      <Container className="pb-24 lg:pb-32">
        <PartnerBanner />
      </Container>
    </>
  )
}

export default PartnerPage
