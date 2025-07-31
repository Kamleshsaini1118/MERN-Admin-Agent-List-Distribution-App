import { useEffect } from "react";
import axios from "axios";

export default function AgentList({ token, agents, setAgents }) {
  useEffect(() => {
    axios.get("http://localhost:3000/api/agents", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setAgents(res.data));
  }, [token, setAgents]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Agents</h2>
      <ul className="space-y-1">
        {agents.map(a => (
          <li key={a._id} className="border px-2 py-1 rounded bg-gray-50">
            <b>{a.name}</b> | {a.email} | {a.mobile}
          </li>
        ))}
      </ul>
    </div>
  );
}