import '@/App.css'

import { BrowserRouter } from 'react-router-dom'

import { Footer, Header, WaveBackground } from '@/components'
import { AppRoutes, ScrollManager } from '@/routes'

const App = () => {
  return (
    <>
      <WaveBackground />
      <BrowserRouter>
        <ScrollManager />
        <a
          href="#main-content"
          className="absolute top-3 left-3 -translate-y-20 focus:translate-y-0 z-[60] px-4 py-2 bg-base-100 text-primary font-semibold rounded-3xl ring-2 ring-primary outline-none no-underline"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" tabIndex={-1}>
          <AppRoutes />
        </main>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
