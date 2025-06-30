import React from "react";

export default function FlightTable({ flights }) {
  if (!flights.length)
    return <div className="text-center text-gray-700 py-8">No flights found.</div>;
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white/40 backdrop-blur-md rounded-xl shadow text-sm border border-white/30">
        <thead>
          <tr className="bg-white/60">
            <th className="p-3 text-left">Start Time</th>
            <th className="p-3 text-left">Duration (min)</th>
            <th className="p-3 text-left">Pilot Name</th>
            <th className="p-3 text-left">Location</th>
          </tr>
        </thead>
        <tbody  className="">
          {flights.map(f => (
            <tr key={f._id || `${f.startTime}-${f.pilotName}-${f.location}`}>
              <td className="p-3">{new Date(f.startTime).toLocaleString()}</td>
              <td className="p-3">{f.duration}</td>
              <td className="p-3">{f.pilotName}</td>
              <td className="p-3">{f.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}