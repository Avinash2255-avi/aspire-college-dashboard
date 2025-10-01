
import React, { useEffect, useState } from "react";
import { api } from "../api";
import ReviewForm from "../components/ReviewForm";

export default function Reviews() {
  const [colleges, setColleges] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  function load() {
    setLoading(true);
    setErr("");
    Promise.all([api.get("/colleges"), api.get("/reviews")])
      .then(([c, r]) => {
        setColleges(c.data);
        setReviews(r.data);
      })
      .catch(() => setErr("Failed to load reviews."))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, []);

  function handleSubmit(form) {
    api
      .post("/reviews", { ...form, rating: Number(form.rating) })
      .then(() => load())
      .catch(() => alert("Failed to submit review."));
  }

  const collegeMap = Object.fromEntries(colleges.map((c) => [c.id, c.name]));

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      
      <ReviewForm colleges={colleges} onSubmit={handleSubmit} />

      
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Latest Reviews</h2>

        {loading && <p>Loading reviews...</p>}
        {!loading && err && <p className="text-red-600">{err}</p>}

        {!loading && !err && reviews.length === 0 && (
          <div className="p-6 text-center border rounded-lg dark:border-gray-700">
            No reviews yet. Be the first to share your feedback!
          </div>
        )}

        {reviews.map((r) => (
          <div
            key={r.id}
            className="p-4 border rounded-lg bg-white dark:bg-gray-900 dark:border-gray-700"
          >
            <div className="flex justify-between">
              <strong>{collegeMap[r.college_id] || "Unknown College"}</strong>
              <span>⭐ {r.rating}</span>
            </div>
            {r.comment && <p className="mt-2 text-sm opacity-80">{r.comment}</p>}
            <p className="text-xs opacity-60 mt-1">
              {new Date(r.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
