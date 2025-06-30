import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import SignupForm from "../components/SignupForm";
import api from "../api";

export default function SignupPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSignup({ username, password }) {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await api.post("/auth/signup", { username, password });
      setSuccess("Signup successful! Please log in.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (e) {
      setError(e.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        {error && <div className="mb-2 text-red-600 text-sm">{error}</div>}
        {success && <div className="mb-2 text-green-600 text-sm">{success}</div>}
        <SignupForm onSignup={handleSignup} loading={loading} />
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}