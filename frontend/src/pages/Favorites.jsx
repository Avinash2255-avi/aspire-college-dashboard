
import React, { useEffect, useState } from "react";
import { api } from "../api";

export default function Favorites() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const USER_ID = "demo"; 

  function load() {
    setLoading(true);
    setErr("");
    api
      .get("/favorites", { params: { userId: USER_ID } })
      .then((res) => setItems(res.data))
      .catch(() => setErr("Failed to load favorites."))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, []);

  function removeFavorite(favId) {
    
    const prev = items;
    setItems((list) => list.filter((i) => i.id !== favId));

    api
      .delete(`/favorites/${favId}`)
      .catch(() => {
        
        setItems(prev);
        alert("Failed to remove. Please try again.");
      });
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <h2 className="text-xl font-semibold">Your Favorites</h2>

      {loading && <p>Loading favorites...</p>}
      {!loading && err && <p className="text-red-600">{err}</p>}

      {!loading && !err && items.length === 0 && (
        <div className="p-6 text-center border rounded-lg dark:border-gray-700">
          No favorites yet. Go add some from the Colleges page!
        </div>
      )}

      <div className="space-y-3">
        {items.map((it) => (
          <div
            key={it.id}
            className="p-3 border rounded-lg flex items-center justify-between bg-white dark:bg-gray-900 dark:border-gray-700"
          >
            <div>
              <div className="font-medium">{it.name}</div>
              <div className="text-sm opacity-80">
                {it.location} • {it.course} • ₹ {Number(it.fee).toLocaleString()}
              </div>
            </div>
            <button
              onClick={() => removeFavorite(it.id)}
              className="px-3 py-1 rounded border hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
