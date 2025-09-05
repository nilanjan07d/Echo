import React, { useState } from "react";
import { Search, User, X } from "lucide-react";
import EchoLogo from "./EchoLogo";

const TopBar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
    if (showSearch) setSearchQuery(""); // Clear search when closing
  };

  return (
    <header className="flex items-center justify-between p-4 bg-[#141414] border-b border-[#2a2a2a]">
      {/* Logo */}
      <EchoLogo />

      {/* Search Bar - Shows conditionally */}
      {showSearch && (
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search songs, artists, albums..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#2a2a2a] text-white py-2 px-4 pl-10 pr-10 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              autoFocus
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Search + Profile */}
      <div className="flex items-center space-x-4">
        <button
          onClick={handleSearchToggle}
          className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-[#2a2a2a]"
        >
          {showSearch ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
        </button>
        <button className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-[#2a2a2a]">
          <User className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default TopBar;
