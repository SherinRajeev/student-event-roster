import React from "react";
import { Routes, Route } from "react-router-dom";
    
// Import all the components we created in the src folder
import Navbar from "./Navbar";
import Home from "./Home";
import Events from "./Events";
import AddEvent from "./AddEvent";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      {/* Navbar stays at the top of every page */}
      <Navbar />
      
      {/* The main content area changes based on the route */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/add" element={<AddEvent />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;