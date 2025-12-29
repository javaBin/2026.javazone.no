import { Routes, Route } from "react-router-dom";
import SpeakerMainPage from "./MainPage";
import FamilyTicketPolicyPage from "./FamilyTicketPolicyPage";
import ReimbursementPolicyPage from "./ReimbursementPolicyPage";
import SubmissionTipsPage from "./SubmissionTipsPage";

function SpeakerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SpeakerMainPage />} />
      <Route path="/family-ticket" element={<FamilyTicketPolicyPage />} />
      <Route path="/reimbursement" element={<ReimbursementPolicyPage />} />
      <Route path="/tips" element={<SubmissionTipsPage />} />
    </Routes>
  );
}

export default SpeakerRoutes;
