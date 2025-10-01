
import React from "react";

export default function CollegeCard({ college, onFav }) {
  return (
    <div className="p-4 border rounded-xl shadow-sm bg-white dark:bg-gray-900 dark:border-gray-800">
      {/* Header row: name + fee */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">{college.name}</h3>
          <p className="text-sm opacity-80">
            {college.location} • {college.course}
          </p>
        </div>
        <span className="text-sm font-medium">
          ₹ {college.fee.toLocaleString()}
        </span>
      </div>

      <button
        onClick={() => onFav?.(college)}
        className="mt-3 w-full py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
      >
        ⭐ Add to Favorites
      </button>
    </div>
  );
}
