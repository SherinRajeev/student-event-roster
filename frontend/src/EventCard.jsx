import React from "react";
import { Link } from "react-router-dom";

const EventCard = ({ id, title, description, date, estimatedAttendance }) => {
  // Format the date so it reads nicely on the screen
  const formattedDate = new Date(date).toLocaleDateString(undefined, { 
    weekday: 'short', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });

  return (
    <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition duration-200 flex flex-col h-full">
      <div className="flex flex-col p-5 gap-3 flex-grow justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 uppercase tracking-wider">
              {formattedDate}
            </span>
          </div>
          <h2 className="text-gray-900 font-bold text-lg leading-tight line-clamp-2">{title}</h2>
          <p className="text-gray-500 text-sm mt-2 line-clamp-3">{description}</p>
        </div>
        
        <div className="mt-4">
          <div className="text-sm font-semibold text-gray-700 mb-4 bg-gray-50 p-2 rounded text-center">
            Est. Attendance: {estimatedAttendance}
          </div>
          <button className="block w-full text-center bg-gray-900 text-white px-4 py-2.5 rounded-lg hover:bg-black transition cursor-pointer font-semibold">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;