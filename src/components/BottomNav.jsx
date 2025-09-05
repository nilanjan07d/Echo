import React from "react";
import { Home, Search, Library } from "lucide-react";

const BottomNav = ({ currentPage, changePage }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-[#1e1e1e] p-4 flex justify-around items-center md:hidden">
      {/* Home */}
      <button 
        onClick={() => changePage("home")}
        className={`flex flex-col items-center text-xs ${
          currentPage === "home" ? "text-[#b490f2]" : "text-gray-400"
        }`}
      >
        <Home size={24} />
        <span>Home</span>
      </button>

      {/* Search */}
      <button 
        onClick={() => changePage("search")}
        className={`flex flex-col items-center text-xs ${
          currentPage === "search" ? "text-[#b490f2]" : "text-gray-400"
        }`}
      >
        <Search size={24} />
        <span>Search</span>
      </button>

      {/* Library */}
      <button 
        onClick={() => changePage("library")}
        className={`flex flex-col items-center text-xs ${
          currentPage === "library" ? "text-[#b490f2]" : "text-gray-400"
        }`}
      >
        <Library size={24} />
        <span>Library</span>
      </button>
    </nav>
  );
};

export default BottomNav;