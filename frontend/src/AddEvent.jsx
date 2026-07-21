import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle, ArrowLeft } from "lucide-react";

const AddEvent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    description: "",
    estimatedAttendance: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    // Strict validations mimicking the product form
    if (!formData.title.trim()) return setError("Event title is required");
    if (!formData.date) return setError("Please select a date");
    if (!formData.estimatedAttendance || isNaN(formData.estimatedAttendance) || Number(formData.estimatedAttendance) < 0) {
      return setError("Please provide a valid estimated attendance");
    }

    try {
      setLoading(true);
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          estimatedAttendance: Number(formData.estimatedAttendance),
        }),
      });

      const result = await res.json();
     if (result.success) {
        navigate("/events");
      } else {
        // Now it will print the EXACT error from the backend
        setError(result.error || result.message || "Failed to create event");
      }
    } catch (err) {
      setError("Server error. Please check if backend is running.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 py-12 px-4 sm:px-6">
      <div className="container mx-auto max-w-2xl">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-500 hover:text-gray-900 transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <div className="flex items-center space-x-3 mb-8">
          <PlusCircle className="w-8 h-8 text-gray-900" />
          <h1 className="text-3xl font-bold">Schedule New Event</h1>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 bg-white border border-gray-200 p-6 sm:p-8 rounded-xl shadow-sm">
          <div className="grid grid-cols-1 gap-6">
            
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                Event Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                placeholder="e.g. CodeCraft Bootcamp"
              />
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-2">
                Event Date *
              </label>
              <input
                type="datetime-local"
                id="date"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
              />
            </div>

            <div>
              <label htmlFor="estimatedAttendance" className="block text-sm font-semibold text-gray-700 mb-2">
                Estimated Attendance *
              </label>
              <input
                type="number"
                id="estimatedAttendance"
                name="estimatedAttendance"
                required
                value={formData.estimatedAttendance}
                onChange={handleChange}
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                placeholder="50"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                placeholder="Provide details about the event..."
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 hover:bg-black disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center cursor-pointer shadow-sm"
          >
            {loading ? <span>Scheduling...</span> : <span>Save Event</span>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;