import { Route, Routes } from 'react-router-dom'

import FamilyTicketPolicyPage from './FamilyTicketPolicyPage'
import SpeakerMainPage from './MainPage'
import ReimbursementPolicyPage from './ReimbursementPolicyPage'
import SubmissionTipsPage from './SubmissionTipsPage'

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
