import type { PageBlock } from '@/sanity/types'

import { MediaBlock } from './MediaBlock'
import { PlainTextBlock } from './PlainTextBlock'
import { TextInBoxBlock } from './TextInBoxBlock'
import { TextNextToImageBlock } from './TextNextToImageBlock'

interface PageBuilderProps {
  blocks: PageBlock[]
}

export function PageBuilder({ blocks }: PageBuilderProps) {
  return (
    <>
      {blocks.map((block) => {
        switch (block._type) {
          case 'plainTextBlock':
            return <PlainTextBlock key={block._key} {...block} />
          case 'textInBoxBlock':
            return <TextInBoxBlock key={block._key} {...block} />
          case 'textNextToImageBlock':
            return <TextNextToImageBlock key={block._key} {...block} />
          case 'mediaBlock':
            return <MediaBlock key={block._key} {...block} />
        }
      })}
    </>
  )
}
