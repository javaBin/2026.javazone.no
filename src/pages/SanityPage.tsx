import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { HeroBlock } from '@/components/pageBuilder/HeroBlock'
import { PageBuilder } from '@/components/pageBuilder/PageBuilder'
import { client } from '@/sanity/client'
import type { PageData } from '@/sanity/types'

const PAGE_QUERY = `*[_type == "page" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  showInHeader,
  heading,
  subheading,
  backgroundImage,
  ctaText,
  ctaUrl,
  pageBuilder[] {
    _type,
    _key,
    ...
  }
}`

export default function SanityPage() {
  const { slug } = useParams<{ slug: string }>()
  const [page, setPage] = useState<PageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) return

    setLoading(true)
    client
      .fetch<PageData | null>(PAGE_QUERY, { slug })
      .then((data) => {
        if (!data) {
          setNotFound(true)
        } else {
          setPage(data)
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <span className="text-base-content/60">Loading…</span>
      </div>
    )
  }

  if (notFound || !page) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <h1 className="text-4xl font-bold text-primary">404</h1>
        <p className="text-base-content/60">Page not found.</p>
        <a href="/" className="text-primary hover:underline">
          Back to home
        </a>
      </div>
    )
  }

  const hasHero = Boolean(page.heading)

  return (
    <div>
      {hasHero && (
        <HeroBlock
          heading={page.heading}
          subheading={page.subheading}
          backgroundImage={page.backgroundImage}
          ctaText={page.ctaText}
          ctaUrl={page.ctaUrl}
        />
      )}
      {page.pageBuilder?.length ? (
        <PageBuilder blocks={page.pageBuilder} />
      ) : (
        !hasHero && (
          <div className="flex items-center justify-center min-h-[40vh]">
            <p className="text-base-content/40">This page has no content yet.</p>
          </div>
        )
      )}
    </div>
  )
}
