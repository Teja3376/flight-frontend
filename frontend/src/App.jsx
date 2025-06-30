import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/signup" element={isLoggedIn ? <Navigate to="/" /> : <SignupPage />} />
        <Route path="/" element={isLoggedIn ? <DashboardPage /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
