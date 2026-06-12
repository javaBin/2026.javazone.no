import '@/App.css'

import { BrowserRouter, useLocation } from 'react-router-dom'

import { Footer, Header } from '@/components'
import { MotionProvider } from '@/hooks/useMotion'
import { ThemeProvider } from '@/hooks/useTheme'
import { AppRoutes, ScrollManager } from '@/routes'

const STATUS_ROUTES = ['/status']

const AppLayout = () => {
  const { pathname } = useLocation()
  const isMinimalRoute = STATUS_ROUTES.includes(pathname)

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollManager />
      {!isMinimalRoute && (
        <a
          href="#main-content"
          className="absolute top-3 left-3 -translate-y-20 focus:translate-y-0 z-[60] px-4 py-2 bg-base-100 text-primary font-semibold rounded-3xl ring-2 ring-primary outline-none no-underline"
        >
          Skip to main content
        </a>
      )}
      {!isMinimalRoute && <Header />}
      <main id="main-content" tabIndex={-1} className="relative z-10 flex flex-1 flex-col">
        <AppRoutes />
      </main>
      {!isMinimalRoute && <Footer />}
    </div>
  )
}

const App = () => {
  return (
    <ThemeProvider>
      <MotionProvider>
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </MotionProvider>
    </ThemeProvider>
  )
}

export default App
