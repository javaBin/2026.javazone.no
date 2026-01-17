import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import WaveBackground from "./components/WaveBackground.tsx";
import MainPage from "./pages/MainPage.tsx";
import PartnerPage from "./pages/PartnerPage.tsx";
import HistoryPage from "./pages/HistoryPage.tsx";
import SpeakerRoutes from "./pages/speaker/Routes.tsx";
function App() {
  return (
    <>
      <WaveBackground />
        <div className="navbar fixed z-50 px-2">
            <div className="flex-1 overflow-x-auto">
                <a className="btn btn-ghost text-lg md:text-xl px-2 md:px-4" href={"/"}>
                    Info
                </a>
                <a className="btn btn-ghost text-lg md:text-xl px-2 md:px-4" href={"/history"}>
                    History
                </a>
                <a className="btn btn-ghost text-lg md:text-xl px-2 md:px-4" href={"/partner"}>
                    Partners
                </a>
                <a className="btn btn-ghost text-lg md:text-xl px-2 md:px-4" href={"/speaker"}>
                    Speakers
                </a>
            </div>
            <div className="flex-none px-2">
                <h1 className="font-bold hidden sm:block">JavaZone</h1>
            </div>
        </div>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/partner" element={<PartnerPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/speaker/*" element={<SpeakerRoutes />} />
        </Routes>
      </BrowserRouter>

      <div className="dock dock-xs">
        <a href={"https://www.java.no"}>Made by javaBin</a>
        <a href={"https://java.no/principles"}>Code of conduct</a>
      </div>
    </>
  );
}

export default App;
