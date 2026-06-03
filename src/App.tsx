import '@/App.css'

import { BrowserRouter, useLocation } from 'react-router-dom'

import { Footer, Header, WaveBackground } from '@/components'
import { AppRoutes, ScrollManager } from '@/routes'

const STATUS_ROUTES = ['/status']

const AppLayout = () => {
  const { pathname } = useLocation()
  const isMinimalRoute = STATUS_ROUTES.includes(pathname)

  return (
    <>
      <ScrollManager />
      {!isMinimalRoute && (
        <a
          href="#main-content"
          className="absolute top-3 left-3 -translate-y-20 focus:translate-y-0 z-[60] px-4 py-2 bg-base-100 text-primary font-semibold rounded-3xl ring-2 ring-primary outline-none no-underline"
        >
          Skip to main content
        </a>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main id="main-content" tabIndex={-1} className="flex flex-col flex-1">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}

export default App
