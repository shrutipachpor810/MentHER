// src/components/Navbar.jsx
import React, { useState } from 'react';
import ProfileCorner from './ProfileCorner'; // ✅ import here!

const Navbar = ({ name, greeting, onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === '') return;
    onSearch(query);
  };

  return (
    <div className="flex justify-between items-center p-4 border-b bg-white shadow-sm sticky top-0 z-10">
      {/* Left side: greeting */}
      <div>
        <h2 className="text-lg font-semibold">{greeting}, {name}!</h2>
        <p className="text-sm text-mutedmauve">
          Empowering women in tech, one connection at a time.
        </p>
      </div>

      {/* Right side: Search + Profile */}
      <div className="flex items-center gap-4">
        <form 
          onSubmit={handleSubmit} 
          className="flex items-center border border-peonypink rounded-full overflow-hidden shadow-md"
        >
          <input
            type="text"
            placeholder="Search mentors by name or skill..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-4 py-2 outline-none text-deepcocoa placeholder:text-mutedmauve w-48 md:w-64"
          />
          <button
            type="submit"
            className="bg-peonypink hover:bg-blossompink text-softwhite px-4 py-2 transition-colors"
          >
            Search
          </button>
        </form>

        {/* ✅ Profile Corner sits next to the Search */}
        <ProfileCorner />
      </div>
    </div>
  );
};

export default Navbar;
