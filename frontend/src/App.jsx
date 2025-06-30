import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        {/* Login page at /login */}
        <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <LoginPage />} />
        {/* Signup page at /signup */}
        <Route path="/signup" element={isLoggedIn ? <Navigate to="/dashboard" /> : <SignupPage />} />
        {/* Dashboard page at /dashboard */}
        <Route path="/dashboard" element={isLoggedIn ? <DashboardPage /> : <Navigate to="/login" />} />
        {/* Default: redirect root to login or dashboard */}
        <Route path="/" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} />
        {/* Catch-all: redirect to root */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
