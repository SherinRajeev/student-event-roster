import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, LayoutList, PlusCircle, Users } from "lucide-react";

const Home = () => {
  const [stats, setStats] = useState({
    total: 0,
    totalAttendance: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://student-event-roster.onrender.com");
      const result = await res.json();
      
      if (result.success) {
        const data = result.data;
        const total = data.length;
        // Calculate total expected attendance for all events
        const totalAttendance = data.reduce((sum, e) => sum + (e.estimatedAttendance || 0), 0);
        
        setStats({ total, totalAttendance });
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col justify-start">
      {/* Hero Section */}
      <div className="relative overflow-hidden py-16 sm:py-24 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900 mb-6">
            CEK <span className="text-gray-500">Event Roster</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-8 leading-relaxed">
            Welcome to your student branch event dashboard. Manage upcoming eventsgit, check schedules, and track expected attendance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/events"
              className="flex items-center space-x-2 bg-gray-900 hover:bg-black text-white font-semibold px-6 py-3 rounded-lg transition duration-200"
            >
              <LayoutList className="w-5 h-5" />
              <span>View All Events</span>
            </Link>
            <Link
              to="/add"
              className="flex items-center space-x-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-900 font-semibold px-6 py-3 rounded-lg transition duration-200"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Schedule New Event</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center space-x-2">
          <Calendar className="w-6 h-6 text-gray-700" />
          <span>Dashboard Overview</span>
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-white h-32 rounded-xl border border-gray-200"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            <div className="bg-white border border-gray-200 p-6 rounded-xl relative overflow-hidden group hover:shadow-sm transition duration-200">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-500 text-sm font-medium">Total Events</span>
                <Calendar className="w-5 h-5 text-gray-700" />
              </div>
              <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
            </div>

            <div className="bg-white border border-gray-200 p-6 rounded-xl relative overflow-hidden group hover:shadow-sm transition duration-200">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-500 text-sm font-medium">Total Expected Attendance</span>
                <Users className="w-5 h-5 text-gray-700" />
              </div>
              <div className="text-3xl font-bold text-gray-900">{stats.totalAttendance}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;