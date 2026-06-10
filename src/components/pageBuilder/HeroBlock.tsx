import { urlFor } from '@/sanity/imageUrl'
import type { SanityImage } from '@/sanity/types'

interface HeroProps {
  heading?: string
  subheading?: string
  backgroundImage?: SanityImage
  ctaText?: string
  ctaUrl?: string
}

export function HeroBlock({ heading, subheading, backgroundImage, ctaText, ctaUrl }: HeroProps) {
  const imageUrl = backgroundImage ? urlFor(backgroundImage).width(1920).url() : undefined

  const sectionClass = imageUrl
    ? 'relative min-h-[60vh] flex items-center justify-center text-center px-6 py-20'
    : 'relative flex items-center justify-center text-center px-8 pt-20 pb-12'

  return (
    <section
      className={sectionClass}
      style={imageUrl ? { backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
    >
      {imageUrl && <div className="absolute inset-0 bg-black/50" />}
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-4">
        {heading && (
          <h1 className={`text-5xl md:text-6xl font-bold leading-tight tracking-tight ${imageUrl ? 'text-white' : 'text-primary'}`}>{heading}</h1>
        )}
        {subheading && (
          <p className={`text-lg md:text-xl whitespace-pre-wrap ${imageUrl ? 'text-white/80' : 'text-base-content/80'}`}>{subheading}</p>
        )}
        {ctaText && ctaUrl && (
          <a
            href={ctaUrl}
            className="mt-4 inline-flex items-center justify-center px-8 py-2 text-xl font-semibold no-underline rounded-3xl transition-all duration-200 ease-in-out bg-pop text-pop-secondary hover:brightness-110 hover:shadow-lg hover:-translate-y-0.5"
          >
            {ctaText}
          </a>
        )}
      </div>
    </section>
  )
}
