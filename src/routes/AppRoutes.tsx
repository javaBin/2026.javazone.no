import { Route, Routes } from 'react-router-dom'

import HistoryPage from '@/pages/HistoryPage.tsx'
import MainPage from '@/pages/MainPage.tsx'
import PartnerPage from '@/pages/PartnerPage.tsx'
import TestPage from '@/pages/TestPage.tsx'
import VolunteerPage from '@/pages/VolunteerPage'
import { SpeakerRoutes } from '@/routes'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/partner" element={<PartnerPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/speaker/*" element={<SpeakerRoutes />} />
      <Route path="/volunteer" element={<VolunteerPage />} />
      <Route path="/test" element={<TestPage />} /> {/*todo: delete before PR*/}
    </Routes>
  )
}

export default AppRoutes
