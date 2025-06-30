import React, { useState } from "react";

export default function AddFlightForm({ onAdd, loading }) {
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState("");
  const [pilotName, setPilotName] = useState("");
  const [location, setLocation] = useState("");

  return (
    <form
      className="space-y-3 bg-gray-50 p-4 rounded shadow"
      onSubmit={e => {
        e.preventDefault();
        onAdd({
          startTime: new Date(startTime).toISOString(),
          duration: Number(duration),
          pilotName,
          location,
        });
      }}
    >
      <div>
        <label className="block text-xs mb-1">Start Time</label>
        <input
          type="datetime-local"
          className="w-full p-2 border rounded"
          value={startTime}
          onChange={e => setStartTime(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-xs mb-1">Duration (minutes)</label>
        <input
          type="number"
          className="w-full p-2 border rounded"
          value={duration}
          onChange={e => setDuration(e.target.value)}
          min={1}
          required
        />
      </div>
      <div>
        <label className="block text-xs mb-1">Pilot Name</label>
        <input
          className="w-full p-2 border rounded"
          value={pilotName}
          onChange={e => setPilotName(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-xs mb-1">Location</label>
        <input
          className="w-full p-2 border rounded"
          value={location}
          onChange={e => setLocation(e.target.value)}
          required
        />
      </div>
      <button
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer"
        type="submit"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Flight"}
      </button>
    </form>
  );
}