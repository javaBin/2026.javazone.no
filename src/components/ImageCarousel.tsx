import { useRef, useState } from 'react'

interface CarouselImage {
  src: string
  alt: string
  credit?: string
}

interface ImageCarouselProps {
  images: CarouselImage[]
  className?: string
}

const SWIPE_THRESHOLD = 50

const ImageCarousel = ({ images, className = '' }: ImageCarouselProps) => {
  const [index, setIndex] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const touchStartX = useRef<number | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  if (images.length === 0) return null

  const total = images.length

  const goTo = (newIndex: number) => {
    setIndex(((newIndex % total) + total) % total)
  }

  const goPrev = () => goTo(index - 1)
  const goNext = () => goTo(index + 1)

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    setIsDragging(true)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    setDragOffset(e.touches[0].clientX - touchStartX.current)
  }

  const onTouchEnd = () => {
    if (dragOffset > SWIPE_THRESHOLD) {
      goPrev()
    } else if (dragOffset < -SWIPE_THRESHOLD) {
      goNext()
    }
    touchStartX.current = null
    setIsDragging(false)
    setDragOffset(0)
  }

  const containerWidth = containerRef.current?.offsetWidth ?? 1
  const dragPercent = (dragOffset / containerWidth) * 100

  return (
    <div className={`relative w-full select-none ${className}`}>
      <div
        ref={containerRef}
        className="relative h-64 overflow-hidden md:h-96 rounded-2xl"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex h-full"
          style={{
            transform: `translateX(calc(${-index * 100}% + ${dragPercent}%))`,
            transition: isDragging ? 'none' : 'transform 450ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          {images.map((image) => (
            <div key={image.src} className="flex flex-col items-center justify-center flex-shrink-0 w-full h-full gap-1 rounded-2xl">
              <img src={image.src} alt={image.alt} className="flex-1 w-full min-h-0 object-contain rounded-2xl" draggable={false} />
              {image.credit && <span className="text-xs text-base-content/70">{image.credit}</span>}
            </div>
          ))}
        </div>

        <button
          type="button"
          aria-label="Previous image"
          onClick={goPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-2xl bg-base-100/70 hover:bg-base-100 text-base-content shadow-md transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          type="button"
          aria-label="Next image"
          onClick={goNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-2xl bg-base-100/70 hover:bg-base-100 text-base-content shadow-md transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-3 rounded-2xl">
        {images.map((image, i) => (
          <button
            key={image.src}
            type="button"
            aria-label={`Go to image ${i + 1}`}
            onClick={() => goTo(i)}
            className={`w-2.5 h-2.5 rounded-2xl transition-colors ${i === index ? 'bg-primary' : 'bg-base-content/30'}`}
          />
        ))}
      </div>
    </div>
  )
}

export default ImageCarousel
