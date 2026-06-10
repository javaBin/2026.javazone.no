import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import AboutPage from '@/pages/AboutPage'
import HistoryPage from '@/pages/HistoryPage.tsx'
import MainPage from '@/pages/MainPage.tsx'
import PartnerPage from '@/pages/PartnerPage.tsx'
import ProgramPage from '@/pages/ProgramPage'
import SanityPage from '@/pages/SanityPage'
import StatusPage from '@/pages/StatusPage'
import TalkPage from '@/pages/TalkPage'
import TicketsPage from '@/pages/TicketsPage.tsx'
import VolunteerPage from '@/pages/VolunteerPage'
import { SpeakerRoutes } from '@/routes'

const StudioPage = lazy(() => import('@/pages/StudioPage'))

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/program" element={<ProgramPage />} />
      <Route path="/program/:id" element={<TalkPage />} />
      <Route path="/tickets" element={<TicketsPage />} />
      <Route path="/partner" element={<PartnerPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/speaker/*" element={<SpeakerRoutes />} />
      <Route path="/volunteer" element={<VolunteerPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/status" element={<StatusPage />} />
      <Route
        path="/studio/*"
        element={
          <Suspense fallback={null}>
            <StudioPage />
          </Suspense>
        }
      />
      <Route path="/pages/:slug" element={<SanityPage />} />
    </Routes>
  )
}

export default AppRoutes
