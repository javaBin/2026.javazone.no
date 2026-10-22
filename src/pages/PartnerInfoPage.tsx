import { Container, Packages, PageHeader } from '@/components'
import pageMeta from '@/data/pageMeta.json'
import { useOpenGraph } from '@/hooks/useOpenGraph'

const PartnerInfoPage = () => {
  useOpenGraph(pageMeta.partnerInfo)

  return (
    <>
      <PageHeader eyebrow="Partners" title="Partner information">
        <p>
          Packages and tickets for JavaZone 2027 partners. If you have any questions or concerns, please reach out to us at{' '}
          <a href="mailto:partner@java.no">partner@java.no</a>.
        </p>
      </PageHeader>
      <Container className="pb-24 lg:pb-32">
        <h2 className="eyebrow m-0 mb-6">Packages and tickets</h2>
        <Packages />
      </Container>
    </>
  )
}

export default PartnerInfoPage
