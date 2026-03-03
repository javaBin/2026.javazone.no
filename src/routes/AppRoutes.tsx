import { Route, Routes } from 'react-router-dom'

import HistoryPage from '@/pages/HistoryPage.tsx'
import MainPage from '@/pages/MainPage.tsx'
import PartnerPage from '@/pages/PartnerPage.tsx'
import TicketsPage from '@/pages/TicketsPage.tsx'
import VolunteerPage from '@/pages/VolunteerPage'
import { SpeakerRoutes } from '@/routes'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/tickets" element={<TicketsPage />} />
      <Route path="/partner" element={<PartnerPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/speaker/*" element={<SpeakerRoutes />} />
      <Route path="/volunteer" element={<VolunteerPage />} />
    </Routes>
  )
}

export default AppRoutes
