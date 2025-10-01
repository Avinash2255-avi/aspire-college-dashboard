
import React, { useEffect, useState } from "react";
import { api } from "../api";
import CollegeCard from "../components/CollegeCard";
import FiltersBar from "../components/FiltersBar";

export default function Colleges() {
  const [colleges, setColleges] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  
  useEffect(() => {
    setLoading(true);
    setError("");
    api
      .get("/colleges", { params: filters })
      .then((res) => setColleges(res.data))
      .catch(() => setError("Failed to load colleges."))
      .finally(() => setLoading(false));
  }, [JSON.stringify(filters)]);

  
  function addFav(college) {
    api
      .post("/favorites", { collegeId: college.id, userId: "demo" })
      .then(() => alert(`${college.name} added to favorites!`))
      .catch((e) => {
        const msg = e.response?.data?.error || "Failed to add favorite.";
        alert(msg);
      });
  }

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-4">
      
      <FiltersBar onChange={setFilters} />

      
      {loading && <p>Loading colleges...</p>}
      {!loading && error && <p className="text-red-600">{error}</p>}
      {!loading && !error && colleges.length === 0 && (
        <div className="p-6 text-center border rounded-lg dark:border-gray-700">
          No colleges match your filters.
        </div>
      )}

      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {colleges.map((c) => (
          <CollegeCard key={c.id} college={c} onFav={addFav} />
        ))}
      </div>
    </div>
  );
}
