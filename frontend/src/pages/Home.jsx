
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-center">
      <h1 className="text-4xl font-extrabold tracking-tight">
        Welcome to the College Dashboard
      </h1>
      <p className="mt-3 text-base md:text-lg opacity-80">
        Explore colleges, filter by location, course, and fees, add favorites, and
        share reviews — all in one place.
      </p>

      <div className="mt-8 flex items-center justify-center gap-3">
        <Link
          to="/colleges"
          className="inline-block px-6 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          Get Started
        </Link>
        <a
          href="https://tailwindcss.com/"
          target="_blank"
          rel="noreferrer"
          className="inline-block px-6 py-3 rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          Learn More
        </a>
      </div>

      <div className="mt-12 grid sm:grid-cols-3 gap-4 text-left">
        <Feature title="Powerful Filters" desc="Filter by location, course, fee range, and sort by fee." />
        <Feature title="Favorites" desc="Save colleges you like and manage them anytime." />
        <Feature title="Reviews" desc="Add ratings and comments to help others decide." />
      </div>
    </div>
  );
}

function Feature({ title, desc }) {
  return (
    <div className="p-4 rounded-xl border bg-white dark:bg-gray-900 dark:border-gray-800">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm opacity-80 mt-1">{desc}</p>
    </div>
  );
}
