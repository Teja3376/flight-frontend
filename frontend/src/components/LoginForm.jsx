import React, { useState } from "react";
import Spinner from "./Spinner";

export default function LoginForm({ onLogin, loading }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <form
      className="bg-white/30 backdrop-blur-md rounded-2xl shadow-xl px-8 py-10 space-y-6 border border-white/30"
      onSubmit={e => {
        e.preventDefault();
        onLogin({ username, password });
      }}
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="login-username">
          Username
        </label>
        <input
          id="login-username"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/70"
          placeholder="Enter your username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          autoComplete="username"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="login-password">
          Password
        </label>
        <input
          id="login-password"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/70"
          placeholder="Enter your password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
      </div>
      <button
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-60 flex items-center justify-center cursor-pointer"
        type="submit"
        disabled={loading}
      >
        {loading ? <Spinner /> : "Login"}
      </button>
    </form>
  );
}