import type { IndexRow } from '@/components'
import { Container, IndexRows, PageHeader } from '@/components'
import pageMeta from '@/data/pageMeta.json'
import { useOpenGraph } from '@/hooks/useOpenGraph'

const years = [2026, 2025, 2024, 2023, 2022]

const rows: IndexRow[] = years.map((year) => ({
  title: String(year),
  description: `${year}.javazone.no`,
  href: `https://${year}.javazone.no`,
}))

const HistoryPage = () => {
  useOpenGraph(pageMeta.history)

  return (
    <>
      <PageHeader eyebrow="Archive" title="JavaZone through the ages">
        <p>Previous JavaZone conferences, each with its own site and program.</p>
      </PageHeader>
      <Container className="pb-24 lg:pb-32">
        <IndexRows rows={rows} size="large" />
      </Container>
    </>
  )
}

export default HistoryPage
