export interface SanityImage {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
  hotspot?: { x: number; y: number; height: number; width: number }
  crop?: { top: number; bottom: number; left: number; right: number }
}

interface PortableTextContent {
  _type: string
  [key: string]: unknown
}

export interface PlainTextBlockData {
  _type: 'plainTextBlock'
  _key: string
  content?: PortableTextContent[]
}

export interface TextInBoxBlockData {
  _type: 'textInBoxBlock'
  _key: string
  content?: PortableTextContent[]
  backgroundColor?: 'primary' | 'secondary' | 'accent' | 'neutral'
}

export interface TextNextToImageBlockData {
  _type: 'textNextToImageBlock'
  _key: string
  content?: PortableTextContent[]
  image?: SanityImage
  imageCaption?: string
  imagePosition?: 'left' | 'right'
}

export interface MediaBlockData {
  _type: 'mediaBlock'
  _key: string
  mediaType?: 'image' | 'video'
  image?: SanityImage
  videoUrl?: string
  caption?: string
}

export type PageBlock = PlainTextBlockData | TextInBoxBlockData | TextNextToImageBlockData | MediaBlockData

export interface PageData {
  _id: string
  title: string
  slug: { current: string }
  showInHeader: boolean
  heading?: string
  subheading?: string
  backgroundImage?: SanityImage
  ctaText?: string
  ctaUrl?: string
  pageBuilder?: PageBlock[]
}

export interface HeaderPage {
  title: string
  slug: { current: string }
}
