import { mediaBlock } from './blocks/mediaBlock'
import { plainTextBlock } from './blocks/plainTextBlock'
import { textInBoxBlock } from './blocks/textInBoxBlock'
import { textNextToImageBlock } from './blocks/textNextToImageBlock'
import { page } from './page'

export const schemaTypes = [page, plainTextBlock, textInBoxBlock, textNextToImageBlock, mediaBlock]
