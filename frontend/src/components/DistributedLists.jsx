import { useEffect, useState } from "react";
import axios from "axios";

export default function DistributedLists({ token }) {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/lists", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setLists(res.data));
  }, [token]);

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">
        Distributed Lists
      </h2>
      {lists.length === 0 ? (
        <div className="text-gray-500">No distributed lists found.</div>
      ) : (
        lists.map((list, idx) => (
          <div
            key={list.agent?._id || idx}
            className="mb-6 rounded-xl shadow bg-white/90 p-4 border border-indigo-100"
          >
            <div className="font-semibold text-indigo-800 text-lg mb-2 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-indigo-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.657 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {list.agent?.name}{" "}
              <span className="text-sm text-gray-500">
                ({list.agent?.email})
              </span>
            </div>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-indigo-50">
                  <th className="py-2 px-3 text-left font-medium text-indigo-700">
                    First Name
                  </th>
                  <th className="py-2 px-3 text-left font-medium text-indigo-700">
                    Phone
                  </th>
                  <th className="py-2 px-3 text-left font-medium text-indigo-700">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody>
                {list.items.slice(0, 7).map((item, i) => (
                  <tr key={i} className="border-b last:border-b-0">
                    <td className="py-2 px-3">
                      {item.firstName || item.firstname}
                    </td>
                    <td className="py-2 px-3">{item.phone}</td>
                    <td className="py-2 px-3">{item.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-2 text-right text-xs text-gray-400">
              Showing {Math.min(list.items.length, 7)} of {list.items.length}{" "}
              items
            </div>
          </div>
        ))
      )}
    </div>
  );
}