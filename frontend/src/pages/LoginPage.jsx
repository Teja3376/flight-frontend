import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import api from "../api";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin({ username, password }) {
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/auth/login", { username, password });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (e) {
      setError(e.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Flight Dashboard Login</h2>
        {error && <div className="mb-2 text-red-600 text-sm">{error}</div>}
        <LoginForm onLogin={handleLogin} loading={loading} />
        <div className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}