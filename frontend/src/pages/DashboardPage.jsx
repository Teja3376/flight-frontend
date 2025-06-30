import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FlightTable from "../components/FlightTable";
import AddFlightForm from "../components/AddFlightForm";
import Spinner from "../components/Spinner";
import api from "../api";
import toast from "react-hot-toast";

// Example flight image (you can use your own or a CDN)
const FLIGHT_IMAGE =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80";

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
    setError("");
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      if (pilot) params.pilot = pilot;
      if (location) params.location = location;
      const res = await api.get("/flights", { params });
      setFlights(res.data);
    } catch (e) {
      setError(e.response?.data?.message || "Error loading flights");
      toast.error(e.response?.data?.message || "Error loading flights");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchFlights();
    // eslint-disable-next-line
  }, [search, pilot, location]);

  async function handleAddFlight(flight) {
    setError("");
    setSuccess("");
    try {
      setAddLoading(true);
      await api.post("/flights", flight);
      setSuccess("Flight added!");
      toast.success("Flight added!");
      setTimeout(() => setSuccess(""), 1500);
      fetchFlights();
    } catch (e) {
      setError(e.response?.data?.message || "Error adding flight");
    } finally {
      setAddLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start bg-cover bg-center"
      style={{
        backgroundImage: `url(${FLIGHT_IMAGE})`,
      }}
    >
      <div className="w-full bg-gradient-to-b from-black/60 to-transparent absolute top-0 left-0 h-64 z-0"></div>
      <header className="relative z-10 w-full flex justify-between items-center px-6 py-4">
        <h1 className="text-3xl font-bold text-white drop-shadow-lg">
          ✈️ Flight Dashboard
        </h1>
        <button
          className="bg-white/30 backdrop-blur-md px-4 py-2 rounded-lg text-white font-semibold hover:bg-white/50 transition border border-white/40 cursor-pointer"
          onClick={logout}
        >
          Logout
        </button>
      </header>
      <main className="relative z-10 flex-1 w-full max-w-3xl mx-auto flex flex-col items-center px-2">
        <div className="w-full mt-8 mb-6 rounded-2xl bg-white/30 backdrop-blur-md shadow-xl p-6 border border-white/30">
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-4 mb-4">
            <input
              className="p-3 border rounded-lg flex-1 bg-white/60 placeholder-gray-500"
              placeholder="Search by pilot or location"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <input
              className="p-3 border rounded-lg flex-1 bg-white/60 placeholder-gray-500"
              placeholder="Filter by pilot"
              value={pilot}
              onChange={(e) => setPilot(e.target.value)}
            />
            <input
              className="p-3 border rounded-lg flex-1 bg-white/60 placeholder-gray-500"
              placeholder="Filter by location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          {error && <div className="mb-2 text-red-600 text-sm">{error}</div>}
          {success && <div className="mb-2 text-green-600 text-sm">{success}</div>}
          {loading ? (
            <div className="py-8">
              <Spinner />
            </div>
          ) : (
            <FlightTable flights={flights} />
          )}
        </div>
        <div className="w-full mt-6 rounded-2xl bg-white/30 backdrop-blur-md shadow-xl p-6 border border-white/30">
          <h2 className="font-semibold mb-2 text-lg text-gray-800">
            Add New Flight
          </h2>
          <AddFlightForm onAdd={handleAddFlight} loading={addLoading} />
        </div>
      </main>
    </div>
  );
}