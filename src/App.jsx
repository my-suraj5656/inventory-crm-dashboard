import { BrowserRouter, Routes, Route } from "react-router-dom";
import InventoryPage from "./pages/InventoryPage";
import InstallationPage from "./pages/InstallationPage";
import Layout from "./components/Layout/Layout";
import ServicePage from "./pages/ServicePage";
import AmcCmcTrackerPage from "./pages/AmcCmcTrackerPage";
import AlertsPage from "./pages/AlertsPage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/install" element={<InstallationPage />} />
          <Route path="/services" element={<ServicePage />} />
          <Route path="/amccmctracker" element={<AmcCmcTrackerPage />} />
          <Route path="/alerts" element={<AlertsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
