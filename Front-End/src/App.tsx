import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminDashboard from "./pages/AdminDashboard";
import PublicProfilePage from "./pages/PublicProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- Public Routes --- */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/:username" element={<PublicProfilePage />} />

        {/* --- Protected Routes --- */}
        {/* This wrapper route uses our ProtectedRoute component */}
        <Route element={<ProtectedRoute />}>
          {/* Any route nested inside here is now protected */}
          <Route path="/admin" element={<AdminDashboard />} />
          {/* You can add more protected routes here later, like /settings, etc. */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
