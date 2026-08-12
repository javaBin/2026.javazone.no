import { type Location, Route, Routes, useLocation } from 'react-router-dom'

import TalkModal from '@/components/program/TalkModal'
import AboutPage from '@/pages/AboutPage'
import HistoryPage from '@/pages/HistoryPage.tsx'
import MainPage from '@/pages/MainPage.tsx'
import PartnerInfoPage from '@/pages/PartnerInfoPage.tsx'
import PartnerPage from '@/pages/PartnerPage.tsx'
import ProgramPage from '@/pages/ProgramPage'
import StatusPage from '@/pages/StatusPage'
import TalkPage from '@/pages/TalkPage'
import TicketsPage from '@/pages/TicketsPage.tsx'
import VolunteerPage from '@/pages/VolunteerPage'
import { SpeakerRoutes } from '@/routes'

interface NavigationState {
  background?: Location
}

const AppRoutes = () => {
  const location = useLocation()
  // Set by SessionCard when opening a talk from within the app, so the talk renders as a
  // modal over whatever page was already showing instead of navigating away from it. Absent
  // on direct navigation/deep links/reloads, where TalkPage renders as an ordinary full page.
  const background = (location.state as NavigationState | null)?.background

  return (
    <>
      <Routes location={background ?? location}>
        <Route path="/" element={<MainPage />} />
        <Route path="/program" element={<ProgramPage />} />
        <Route path="/program/:id" element={<TalkPage />} />
        <Route path="/tickets" element={<TicketsPage />} />
        <Route path="/partner" element={<PartnerPage />} />
        <Route path="/partner/info" element={<PartnerInfoPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/speaker/*" element={<SpeakerRoutes />} />
        <Route path="/volunteer" element={<VolunteerPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/status" element={<StatusPage />} />
      </Routes>

      {background && (
        <Routes>
          <Route path="/program/:id" element={<TalkModal />} />
        </Routes>
      )}
    </>
  )
}

export default AppRoutes
