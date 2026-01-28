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
        <Header />
        <main>
          <AppRoutes />
        </main>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
