import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage.tsx";
import PartnerPage from "./pages/PartnerPage.tsx";
import HistoryPage from "./pages/HistoryPage.tsx";
function App() {
  return (
    <>
      <div className="navbar bg-base-100 shadow-sm fixed z-50">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl" href={"/"}>
            Info
          </a>
          <a className="btn btn-ghost text-xl" href={"/history"}>
            History
          </a>
          <a className="btn btn-ghost text-xl" href={"/partner"}>
            Partners
          </a>
        </div>
        <div className="flex-none">
          <h1>JavaZone</h1>
        </div>
      </div>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/partner" element={<PartnerPage />} />
          <Route path="/history" element={<HistoryPage />} />
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
