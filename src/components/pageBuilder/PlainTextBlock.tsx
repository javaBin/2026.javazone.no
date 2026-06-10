import { PortableText } from '@portabletext/react'

import type { PlainTextBlockData } from '@/sanity/types'

import { portableTextComponents } from './portableTextComponents'

export function PlainTextBlock({ content }: PlainTextBlockData) {
  if (!content?.length) return null

  return (
    <section className="px-6 py-12 max-w-3xl mx-auto w-full">
      <PortableText value={content} components={portableTextComponents} />
    </section>
  )
}
