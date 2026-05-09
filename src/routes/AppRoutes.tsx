import { Route, Routes } from 'react-router-dom'

import AboutPage from '@/pages/AboutPage'
import HistoryPage from '@/pages/HistoryPage.tsx'
import MainPage from '@/pages/MainPage.tsx'
import PartnerPage from '@/pages/PartnerPage.tsx'
import ProgramPage from '@/pages/ProgramPage'
import StatusPage from '@/pages/StatusPage'
import TicketsPage from '@/pages/TicketsPage.tsx'
import VolunteerPage from '@/pages/VolunteerPage'
import { SpeakerRoutes } from '@/routes'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/program" element={<ProgramPage />} />
      <Route path="/tickets" element={<TicketsPage />} />
      <Route path="/partner" element={<PartnerPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/speaker/*" element={<SpeakerRoutes />} />
      <Route path="/volunteer" element={<VolunteerPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/status" element={<StatusPage />} />
    </Routes>
  )
}

export default AppRoutes
