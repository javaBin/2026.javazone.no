import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import WaveBackground from "./components/WaveBackground.tsx";
import MainPage from "./pages/MainPage.tsx";
import PartnerPage from "./pages/PartnerPage.tsx";
import HistoryPage from "./pages/HistoryPage.tsx";
import SpeakerRoutes from "./pages/speaker/Routes.tsx";

const App = () => {
  return (
    <>
      <WaveBackground />
        <div className="flex w-screen fixed z-50 backdrop-blur-sm p-4">
            <div className="flex px-2 mx-auto sm:mx-0">
                <a className="btn-ghost font-semibold text-md md:text-xl py-2 px-3 md:px-4 rounded-3xl transition-transform transition-opacity duration-200 hover:opacity-90" href={"/"}>
                    Info
                </a>
                <a className="btn-ghost font-semibold text-md md:text-xl py-2 px-3 md:px-4 rounded-3xl transition-transform transition-opacity duration-200 hover:opacity-90" href={"/history"}>
                    History
                </a>
                <a className="btn-ghost font-semibold text-md md:text-xl py-2 px-3 md:px-4 rounded-3xl transition-transform transition-opacity duration-200 hover:opacity-90" href={"/partner"}>
                    Partners
                </a>
                <a className="btn-ghost font-semibold text-md md:text-xl py-2 px-3 md:px-4 rounded-3xl transition-transform transition-opacity duration-200 hover:opacity-90" href={"/speaker"}>
                    Speakers
                </a>
            </div>
            <div className="flex-none ml-auto px-2 hidden sm:flex items-center justify-center">
                <h1 className="font-bold">JavaZone</h1>
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

      <div className="dock dock-xs bg-(--abyss-navy)/50 backdrop-blur-sm">
        <a href={"https://www.java.no"}>Made by javaBin</a>
        <a href={"https://java.no/principles"}>Code of conduct</a>
      </div>
    </>
  );
}

export default App;
