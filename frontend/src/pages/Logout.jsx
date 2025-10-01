
import React from "react";
import { Link } from "react-router-dom";

export default function Logout() {
  return (
    <div className="max-w-2xl mx-auto p-8 text-center">
      <h2 className="text-2xl font-bold mb-3">You have been logged out</h2>
      <p className="opacity-80 mb-6">
        Thank you for using the College Dashboard. See you again soon!
      </p>
      <Link
        to="/"
        className="inline-block px-6 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
      >
        Go to Home
      </Link>
    </div>
  );
}
