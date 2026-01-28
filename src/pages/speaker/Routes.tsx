import { Route, Routes } from 'react-router-dom'

import SpeakerMainPage from '@/pages/MainPage'
import FamilyTicketPolicyPage from '@/pages/speaker/FamilyTicketPolicyPage'
import ReimbursementPolicyPage from '@/pages/speaker/ReimbursementPolicyPage'
import SubmissionTipsPage from '@/pages/speaker/SubmissionTipsPage'

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
