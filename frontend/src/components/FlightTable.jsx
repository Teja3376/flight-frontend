import React from "react";

export default function FlightTable({ flights }) {
  if (!flights.length)
    return <div className="text-center text-gray-500 py-8">No flights found.</div>;
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded shadow text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Start Time</th>
            <th className="p-2 text-left">Duration (min)</th>
            <th className="p-2 text-left">Pilot Name</th>
            <th className="p-2 text-left">Location</th>
          </tr>
        </thead>
        <tbody>
          {flights.map(f => (
            <tr key={f._id} className="border-t">
              <td className="p-2">{new Date(f.startTime).toLocaleString()}</td>
              <td className="p-2">{f.duration}</td>
              <td className="p-2">{f.pilotName}</td>
              <td className="p-2">{f.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}