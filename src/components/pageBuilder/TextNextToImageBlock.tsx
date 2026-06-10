import { PortableText } from '@portabletext/react'

import { urlFor } from '@/sanity/imageUrl'
import type { TextNextToImageBlockData } from '@/sanity/types'

import { portableTextComponents } from './portableTextComponents'

export function TextNextToImageBlock({ content, image, imageCaption, imagePosition = 'right' }: TextNextToImageBlockData) {
  const imageUrl = image ? urlFor(image).width(800).url() : undefined
  const isImageLeft = imagePosition === 'left'

  return (
    <section className="px-6 py-12 max-w-5xl mx-auto w-full">
      <div className={`flex flex-col gap-8 md:flex-row md:items-center ${isImageLeft ? 'md:flex-row-reverse' : ''}`}>
        <div className="flex-1">{content?.length ? <PortableText value={content} components={portableTextComponents} /> : null}</div>
        {imageUrl && (
          <figure className="flex-1">
            <img src={imageUrl} alt={imageCaption ?? ''} className="w-full rounded-xl object-cover" />
            {imageCaption && <figcaption className="mt-2 text-sm text-base-content/60 text-center">{imageCaption}</figcaption>}
          </figure>
        )}
      </div>
    </section>
  )
}
