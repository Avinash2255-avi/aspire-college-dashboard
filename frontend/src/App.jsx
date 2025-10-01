
import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Colleges from "./pages/Colleges";
import Reviews from "./pages/Reviews";
import Favorites from "./pages/Favorites";
import Logout from "./pages/Logout";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <Navbar />

      <main className="py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/colleges" element={<Colleges />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/logout" element={<Logout />} />
          {/* Optional catch-all */}
          <Route
            path="*"
            element={
              <div className="max-w-2xl mx-auto p-6 text-center">
                <h2 className="text-2xl font-bold mb-2">Page not found</h2>
                <p className="opacity-80">The page you’re looking for doesn’t exist.</p>
              </div>
            }
          />
        </Routes>
      </main>

      <footer className="py-6 text-center opacity-60">
        Built for AspireNext
      </footer>
    </div>
  );
}
