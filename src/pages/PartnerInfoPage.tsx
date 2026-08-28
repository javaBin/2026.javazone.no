import { Heading, Packages } from '@/components'
import { useOpenGraph } from '@/hooks/useOpenGraph'

const PartnerInfoPage = () => {
  useOpenGraph({
    title: 'Partner Information | JavaZone 2026',
    description:
      'Detailed information for JavaZone 2026 partners — the first partner meeting recording, available packages and tickets, and how to contact the partner team.',
  })

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-8 pt-20 mb-20 space-y-8">
      <section className="w-full max-w-2xl space-y-4 text-left">
        <Heading level="h1">Partner information</Heading>
        <Heading level="h2">The first partner meeting</Heading>
        <div className="w-full overflow-hidden bg-black rounded-lg" style={{ position: 'relative', paddingTop: '56.25%' }}>
          {' '}
          <iframe
            src="https://player.vimeo.com/video/1146207302"
            title="Partner meeting video"
            allow="autoplay; fullscreen; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 0,
            }}
            allowFullScreen
          />
        </div>
      </section>

      <section className="w-full max-w-2xl space-y-4 text-left">
        <Heading level="h2">Packages and tickets</Heading>
        <Packages />
      </section>

      <section className="w-full max-w-2xl space-y-4 text-left">
        <Heading level="h2">Contact us</Heading>
        <p>
          If you have any questions or concerns, please reach out to us at{' '}
          <a className="underline text-sunbeam-gold" href="mailto:partner@java.no">
            partner@java.no
          </a>
          .
        </p>
      </section>
    </div>
  )
}

export default PartnerInfoPage
