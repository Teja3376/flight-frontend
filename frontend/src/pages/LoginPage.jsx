import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import api from "../api";
import toast from "react-hot-toast";

const FLIGHT_IMAGE =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin({ username, password }) {
    setError("");
    try {
      setLoading(true);
      const res = await api.post("/login", { username, password });
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful! Redirecting...");
      navigate("/dashboard");
    } catch (e) {
      setError(e.response?.data?.message || "Login failed");
      toast.error(e.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${FLIGHT_IMAGE})`,
      }}
    >
      <div className="w-full bg-gradient-to-b from-black/60 to-transparent absolute top-0 left-0 h-64 z-0"></div>
      <div className="relative z-10 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-white drop-shadow-lg">
          Flight Dashboard Login
        </h2>
        {error && (
          <div className="mb-2 text-red-600 text-sm text-center">{error}</div>
        )}
        <LoginForm onLogin={handleLogin} loading={loading} />
        <div className="mt-4 text-center text-sm text-white">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-200 underline hover:text-blue-400"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
