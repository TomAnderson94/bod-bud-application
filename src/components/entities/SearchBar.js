import React, { useState } from "react";
import './SearchBar.css';

function SearchBar({ onSearch }) {
  
  // State -------------------------------------------------
  const [searchQuery, setSearchQuery] = useState("");

  // Handlers ----------------------------------------------
  const handleSearch = () => {
    onSearch(searchQuery);
  };

  // View --------------------------------------------------
  return (
    <div className="search-bar-container">
      <input
      className="search-input"
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search profiles..."
      />
      <button className="search-button" onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;
