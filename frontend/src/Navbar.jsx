import React from "react";
import { NavLink } from "react-router-dom";
import { Calendar, PlusCircle, Home, LayoutList } from "lucide-react";

const Navbar = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center space-x-1.5 px-3 py-2 rounded-lg transition-all duration-200 ${
      isActive
        ? "bg-gray-100 text-gray-900 font-semibold"
        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
    }`;

  return (
    <nav className="bg-white border-b border-gray-200 text-gray-900 sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="flex items-center space-x-2 text-xl font-bold tracking-wide text-gray-900 hover:text-gray-700 transition-colors">
          <Calendar className="w-6 h-6" />
          <span>EventRoster</span>
        </NavLink>

        {/* Links */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <NavLink to="/" className={linkClass}>
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Home</span>
          </NavLink>
          <NavLink to="/events" className={linkClass}>
            <LayoutList className="w-4 h-4" />
            <span className="hidden sm:inline">All Events</span>
          </NavLink>
          <NavLink to="/add" className={linkClass}>
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Add Event</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;