import React, { useState } from "react";

export default function SignupForm({ onSignup, loading }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <form
      className="space-y-4"
      onSubmit={e => {
        e.preventDefault();
        onSignup({ username, password });
      }}
    >
      <input
        className="w-full p-2 border rounded"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
      />
      <input
        className="w-full p-2 border rounded"
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        type="submit"
        disabled={loading}
      >
        {loading ? "Signing up..." : "Sign Up"}
      </button>
    </form>
  );
}