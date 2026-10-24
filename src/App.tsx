import '@/App.css'

import { BrowserRouter } from 'react-router-dom'

import { Footer, Header } from '@/components'
import { AppRoutes, ScrollManager } from '@/routes'

const AppLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollManager />
      <a
        href="#main-content"
        className="absolute top-3 left-3 -translate-y-20 focus:translate-y-0 z-[60] inline-flex items-center min-h-11 px-5 rounded-full bg-brand text-white font-medium no-underline hover:text-white"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" tabIndex={-1} className="relative z-10 flex flex-1 flex-col focus:outline-none">
        <AppRoutes />
      </main>
      <Footer />
    </div>
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
