import { useState, useCallback } from "react";
import AgentForm from "./AgentForm";
import AgentList from "./AgentList";
import UploadList from "./UploadList";
import DistributedLists from "./DistributedLists";
import axios from "axios";

export default function Dashboard({ token, onLogout }) {
  const [agents, setAgents] = useState([]);
  const [lists, setLists] = useState([]);

  // Refresh agents list
  const refreshAgents = useCallback(() => {
    axios
      .get("http://localhost:3000/api/agents", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setAgents(res.data));
  }, [token]);

  // Refresh distributed lists
  const refreshDistributedLists = useCallback(() => {
    axios
      .get("http://localhost:3000/api/lists", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setLists(res.data));
  }, [token]);

  // Initial load
  useState(() => {
    refreshAgents();
    refreshDistributedLists();
  }, [refreshAgents, refreshDistributedLists]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 gap-4">
          <h1 className="text-4xl font-extrabold text-indigo-800 tracking-tight drop-shadow">
            Admin Dashboard
          </h1>
          <button
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold shadow transition"
            onClick={onLogout}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
              />
            </svg>
            Logout
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div className="bg-white/80 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">
              <AgentForm token={token} onAgentAdded={refreshAgents} />
            </div>
            <div className="bg-white/80 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">
              <AgentList token={token} agents={agents} setAgents={setAgents} />
            </div>
          </div>
          <div className="space-y-8">
            <div className="bg-white/80 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">
              <UploadList token={token} onUploaded={refreshDistributedLists} />
            </div>
            <div className="bg-white/80 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">
              <DistributedLists token={token} lists={lists} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}