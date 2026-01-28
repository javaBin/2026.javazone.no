import { Route, Routes } from 'react-router-dom'

import FamilyTicketPolicyPage from '@/pages/speaker/FamilyTicketPolicyPage.tsx'
import SpeakerMainPage from '@/pages/speaker/MainPage.tsx'
import ReimbursementPolicyPage from '@/pages/speaker/ReimbursementPolicyPage.tsx'
import SubmissionTipsPage from '@/pages/speaker/SubmissionTipsPage.tsx'

const SpeakerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SpeakerMainPage />} />
      <Route path="/family-ticket" element={<FamilyTicketPolicyPage />} />
      <Route path="/reimbursement" element={<ReimbursementPolicyPage />} />
      <Route path="/tips" element={<SubmissionTipsPage />} />
    </Routes>
  )
}

export default SpeakerRoutes
