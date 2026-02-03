import { Heading, Packages } from '@/components'

const PartnerPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 pt-20 relative space-y-8 mb-20">
      <Heading level="h1" className="mb-20">
        JavaZone 2026 partner
      </Heading>

      <section className="text-left max-w-2xl w-full space-y-4">
        <Heading level="h2">Partner registration is open</Heading>
        <p>
          You need to decide what type of stand you want when registering. The formal contract and invoice will be sent to you later. Partner stands
          are limited and are sold first come first served.
        </p>
        <div className="pt-4 pb-8 flex justify-center">
          <a href="https://event.checkin.no/215047/javazone-2026-partnership" className="btn btn-primary btn-lg text-2xl px-12">
            Register as partner
          </a>
        </div>
      </section>

      <section className="text-left max-w-2xl w-full space-y-4">
        <Heading level="h2">The first partner meeting</Heading>
        <Heading level="h3">Watch the recording here</Heading>
        <div className="w-full overflow-hidden rounded-lg bg-black" style={{ position: 'relative', paddingTop: '56.25%' }}>
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

      <section className="text-left max-w-2xl w-full space-y-4">
        <Heading level="h2">Packages and tickets</Heading>
        <Packages />
      </section>

      <section className="text-left max-w-2xl w-full space-y-4">
        <Heading level="h2">Contact Us</Heading>
        <p>
          If you have any questions or concerns, please reach out to us at{' '}
          <a className="text-link underline" href="mailto:partner@java.no">
            partner@java.no
          </a>
          .
        </p>
      </section>
    </div>
  )
}

export default PartnerPage
