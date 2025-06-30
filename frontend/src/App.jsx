import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";

function AppRoutes() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const location = useLocation();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, [location]);

  return (
    <Routes>
      {/* Login page at /login */}
      <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <LoginPage />} />
      {/* Signup page at /signup */}
      <Route path="/signup" element={isLoggedIn ? <Navigate to="/dashboard" /> : <SignupPage />} />
      {/* Dashboard page at /dashboard */}
      <Route path="/dashboard" element={isLoggedIn ? <DashboardPage /> : <Navigate to="/login" />} />
      {/* Default: redirect root to login or dashboard */}
      
      {/* Catch-all: redirect to root */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "rgba(255,255,255,0.8)",
            color: "#222",
            backdropFilter: "blur(8px)",
            borderRadius: "1rem",
            boxShadow: "0 8px 32px 0 rgba(31,38,135,0.37)",
            border: "1px solid rgba(255,255,255,0.18)",
            fontWeight: 500,
          },
        }}
      />
      <AppRoutes />
    </Router>
  );
}

export default App;
