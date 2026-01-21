import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Footer, Header, WaveBackground} from "./components";
import MainPage from "./pages/MainPage.tsx";
import PartnerPage from "./pages/PartnerPage.tsx";
import HistoryPage from "./pages/HistoryPage.tsx";
import SpeakerRoutes from "./pages/speaker/Routes.tsx";
import TestPage from "./pages/TestPage.tsx";

const App = () => {
  return (
    <>
      <WaveBackground />
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/partner" element={<PartnerPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/speaker/*" element={<SpeakerRoutes />} />
            <Route path="/testpage" element={<TestPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
