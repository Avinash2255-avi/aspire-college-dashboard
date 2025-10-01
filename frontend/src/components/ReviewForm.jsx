
import React, { useState } from "react";

export default function ReviewForm({ colleges = [], onSubmit }) {
  const [form, setForm] = useState({
    collegeId: "",
    rating: 5,
    comment: "",
  });
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const ratingNum = Number(form.rating);
    if (!form.collegeId) return setError("Please select a college.");
    if (!ratingNum || ratingNum < 1 || ratingNum > 5)
      return setError("Rating must be between 1 and 5.");

    
    onSubmit?.({
      collegeId: Number(form.collegeId),
      rating: ratingNum,
      comment: form.comment?.trim() || "",
    });

    
    setForm({ collegeId: "", rating: 5, comment: "" });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 p-4 border rounded-lg bg-white dark:bg-gray-900 dark:border-gray-700"
    >
      <h3 className="text-lg font-semibold">Add a Review</h3>

      {error && (
        <div className="p-2 text-sm rounded bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </div>
      )}

      
      <label className="block text-sm">
        <span className="mb-1 block">College</span>
        <select
          name="collegeId"
          value={form.collegeId}
          onChange={handleChange}
          required
          className="w-full p-2 rounded border dark:border-gray-700 dark:bg-gray-900"
        >
          <option value="">Select a college</option>
          {colleges.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </label>

      
      <label className="block text-sm">
        <span className="mb-1 block">Rating (1–5)</span>
        <input
          type="number"
          name="rating"
          value={form.rating}
          onChange={handleChange}
          min={1}
          max={5}
          required
          className="w-full p-2 rounded border dark:border-gray-700 dark:bg-gray-900"
        />
      </label>

      
      <label className="block text-sm">
        <span className="mb-1 block">Comment (optional)</span>
        <textarea
          name="comment"
          value={form.comment}
          onChange={handleChange}
          rows={3}
          placeholder="Share your experience..."
          className="w-full p-2 rounded border dark:border-gray-700 dark:bg-gray-900"
        />
      </label>

      <button
        type="submit"
        className="w-full py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
      >
        Submit Review
      </button>
    </form>
  );
}
