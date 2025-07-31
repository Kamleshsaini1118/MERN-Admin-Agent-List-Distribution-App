import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function UploadList({ token, onUploaded }) {
  const [file, setFile] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a file");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    try {
      await axios.post("http://localhost:3000/api/lists/upload", formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
      });
      toast.success("List uploaded and distributed!");
      setFile(null);
      if (onUploaded) onUploaded(); // Refresh distributed lists
    } catch (err) {
      toast.error(err.response?.data?.msg || "Error uploading file");
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Upload List (CSV/XLSX/XLS)</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={e => setFile(e.target.files[0])}
          className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        />
        <button className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Upload</button>
      </form>
    </div>
  );
}