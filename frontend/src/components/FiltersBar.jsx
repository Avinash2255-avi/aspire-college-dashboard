
import React, { useState } from "react";

const LOCATIONS = ["Hyderabad", "Bangalore", "Chennai"];
const COURSES = ["Computer Science", "Electronics", "MBA", "MBBS"];

export default function FiltersBar({ onChange, initial }) {
  const [state, setState] = useState(
    initial || { location: "", course: "", feeMin: "", feeMax: "", search: "", sort: "" }
  );

  function emit(update) {
    const next = { ...state, ...update };
    setState(next);
    onChange?.(next);
  }

  return (
    <div className="grid md:grid-cols-6 gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border dark:border-gray-700">
      
      <select
        value={state.location}
        onChange={(e) => emit({ location: e.target.value })}
        className="p-2 rounded border dark:bg-gray-900"
      >
        <option value="">Location</option>
        {LOCATIONS.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>

      
      <select
        value={state.course}
        onChange={(e) => emit({ course: e.target.value })}
        className="p-2 rounded border dark:bg-gray-900"
      >
        <option value="">Course</option>
        {COURSES.map((course) => (
          <option key={course} value={course}>
            {course}
          </option>
        ))}
      </select>

      
      <input
        type="number"
        placeholder="Min Fee"
        value={state.feeMin}
        onChange={(e) => emit({ feeMin: e.target.value })}
        className="p-2 rounded border dark:bg-gray-900"
      />

     
      <input
        type="number"
        placeholder="Max Fee"
        value={state.feeMax}
        onChange={(e) => emit({ feeMax: e.target.value })}
        className="p-2 rounded border dark:bg-gray-900"
      />

      
      <input
        type="text"
        placeholder="Search by name"
        value={state.search}
        onChange={(e) => emit({ search: e.target.value })}
        className="p-2 rounded border col-span-2 md:col-span-1 dark:bg-gray-900"
      />

      
      <select
        value={state.sort}
        onChange={(e) => emit({ sort: e.target.value })}
        className="p-2 rounded border dark:bg-gray-900"
      >
        <option value="">Sort</option>
        <option value="fee_asc">Fee: Low → High</option>
        <option value="fee_desc">Fee: High → Low</option>
      </select>
    </div>
  );
}
