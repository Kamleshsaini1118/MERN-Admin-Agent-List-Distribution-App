import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function AgentForm({ token, onAgentAdded }) {
  const [form, setForm] = useState({ name: "", email: "", mobile: "", password: "" });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/agents", form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Agent added!");
      setForm({ name: "", email: "", mobile: "", password: "" });
      if (onAgentAdded) onAgentAdded(); // Notify parent to refresh agent list
    } catch (err) {
      toast.error(err.response?.data?.msg || "Error adding agent");
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Add Agent</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input name="name" placeholder="Name" className="w-full px-2 py-1 border rounded" value={form.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" className="w-full px-2 py-1 border rounded" value={form.email} onChange={handleChange} required />
        <input name="mobile" placeholder="Mobile (+91...)" className="w-full px-2 py-1 border rounded" value={form.mobile} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" className="w-full px-2 py-1 border rounded" value={form.password} onChange={handleChange} required />
        <button className="px-4 py-1 bg-green-600 text-white rounded">Add</button>
      </form>
    </div>
  );
}