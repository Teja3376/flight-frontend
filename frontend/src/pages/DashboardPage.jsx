import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FlightTable from "../components/FlightTable";
import AddFlightForm from "../components/AddFlightForm";
import api from "../api";

export default function DashboardPage() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [search, setSearch] = useState("");
  const [pilot, setPilot] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  async function fetchFlights() {
    setLoading(true);
    setError("");
    try {
      const params = {};
      if (search) params.search = search;
      if (pilot) params.pilot = pilot;
      if (location) params.location = location;
      const res = await api.get("/flights", { params });
      setFlights(res.data);
    } catch (e) {
      setError(e.response?.data?.message || "Error loading flights");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchFlights();
    // eslint-disable-next-line
  }, [search, pilot, location]);

  async function handleAddFlight(flight) {
    setAddLoading(true);
    setError("");
    setSuccess("");
    try {
      await api.post("/flights", flight);
      setSuccess("Flight added!");
      setTimeout(() => setSuccess(""), 1500);
      fetchFlights();
    } catch (e) {
      setError(e.response?.data?.message || "Error adding flight");
    } finally {
      setAddLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-700 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Flight Dashboard</h1>
        <button
          className="bg-blue-900 px-3 py-1 rounded text-sm hover:bg-blue-800"
          onClick={logout}
        >
          Logout
        </button>
      </header>
      <main className="flex-1 p-4 max-w-2xl mx-auto w-full">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:gap-4">
          <input
            className="p-2 border rounded flex-1"
            placeholder="Search by pilot or location"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <input
            className="p-2 border rounded flex-1"
            placeholder="Filter by pilot"
            value={pilot}
            onChange={e => setPilot(e.target.value)}
          />
          <input
            className="p-2 border rounded flex-1"
            placeholder="Filter by location"
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
        </div>
        {error && <div className="mb-2 text-red-600 text-sm">{error}</div>}
        {success && <div className="mb-2 text-green-600 text-sm">{success}</div>}
        <FlightTable flights={flights} />
        <div className="mt-6">
          <h2 className="font-semibold mb-2">Add New Flight</h2>
          <AddFlightForm onAdd={handleAddFlight} loading={addLoading} />
        </div>
      </main>
    </div>
  );
}