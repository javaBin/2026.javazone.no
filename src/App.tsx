import '@/App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Footer, Header, WaveBackground } from '@/components'
import HistoryPage from '@/pages/HistoryPage.tsx'
import MainPage from '@/pages/MainPage.tsx'
import PartnerPage from '@/pages/PartnerPage.tsx'
import SpeakerRoutes from '@/pages/speaker/Routes.tsx'

const App = () => {
  return (
    <>
      <WaveBackground />
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/partner" element={<PartnerPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/speaker/*" element={<SpeakerRoutes />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
