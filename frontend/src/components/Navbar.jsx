
import React from "react";
import { Link, NavLink } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

export default function Navbar() {
  const links = [
    { to: "/", label: "Home" },
    { to: "/colleges", label: "Colleges" },
    { to: "/reviews", label: "Reviews" },
    { to: "/favorites", label: "Favorites" },
    { to: "/logout", label: "Logout" }
  ];

  return (
    <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link to="/" className="font-bold text-xl select-none">
          🎓 AspireNext
        </Link>

        
        <nav className="flex items-center gap-3">
          <ul className="hidden sm:flex items-center gap-1">
            {links.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    [
                      "px-3 py-1 rounded transition",
                      "hover:bg-gray-100 dark:hover:bg-gray-800",
                      isActive ? "font-semibold underline" : ""
                    ].join(" ")
                  }
                  end={to === "/"}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          
          <div className="sm:hidden">
            <select
              className="p-1 rounded border dark:border-gray-700 dark:bg-gray-900"
              onChange={(e) => {
                const path = e.target.value;
                if (path) window.location.href = path;
              }}
              defaultValue=""
            >
              <option value="" disabled>
                Menu
              </option>
              {links.map(({ to, label }) => (
                <option key={to} value={to}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <DarkModeToggle />
        </nav>
      </div>
    </header>
  );
}
