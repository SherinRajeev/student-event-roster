import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "./EventCard";

const Events = () => {
  const apiUrl = "/api/events";
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(apiUrl);
        if (res.data.success) {
          setEvents(res.data.data || []);
        } else {
          setError(res.data.error || "Failed to fetch events");
        }
      } catch (err) {
        console.error("Failed to fetch events:", err);
        setError(err.response?.data?.error || err.message || "Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-12">Loading events...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-rose-600">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 py-8">
      {events.map((e) => (
        <EventCard
          key={e._id}
          id={e._id}
          title={e.title}
          description={e.description}
          date={e.date}
          estimatedAttendance={e.estimatedAttendance}
        />
      ))}
    </div>
  );
};

export default Events;