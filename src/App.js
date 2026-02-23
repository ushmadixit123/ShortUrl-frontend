import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout";
import PrivateLayout from "./layouts/PrivateLayout";
import ProfilePage from "./pages/ProfilePage";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UrlForm from "./components/UrlForm";
import UrlsTable from "./components/UrlsTable";
import Dashboard from "./pages/Dashboard";
import QRCodeTab from "./components/QRCodeTab";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";

function App() {
  const token = localStorage.getItem("token");
  console.log("PublicLayout:", PublicLayout);
console.log("PrivateLayout:", PrivateLayout);
console.log("token: ", token);

  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route element={<PublicLayout />}>
        <Route path="/" element={<UrlForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* Private Routes */}
        {token && (
          <Route element={<PrivateLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/urls" element={<UrlsTable />} />
            <Route path="/qrcodes" element={<QRCodeTab />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />

          </Route>
        )}

      </Routes>
    </BrowserRouter>
  );
}

export default App;