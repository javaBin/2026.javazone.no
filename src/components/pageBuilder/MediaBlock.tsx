import { urlFor } from '@/sanity/imageUrl'
import type { MediaBlockData } from '@/sanity/types'

export function MediaBlock({ mediaType = 'image', image, videoUrl, caption }: MediaBlockData) {
  return (
    <section className="px-6 py-12 max-w-4xl mx-auto w-full">
      <figure>
        {mediaType === 'image' && image && (
          <img src={urlFor(image).width(1200).url()} alt={caption ?? ''} className="w-full rounded-xl object-cover" />
        )}
        {mediaType === 'video' && videoUrl && (
          <div className="relative w-full aspect-video rounded-xl overflow-hidden">
            <iframe src={videoUrl} title={caption ?? 'Video'} className="absolute inset-0 w-full h-full" allowFullScreen />
          </div>
        )}
        {caption && <figcaption className="mt-3 text-sm text-base-content/60 text-center">{caption}</figcaption>}
      </figure>
    </section>
  )
}
