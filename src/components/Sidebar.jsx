import React from "react";
import { Home, Search, Library } from "lucide-react";

const Sidebar = ({ currentPage, setCurrentPage }) => {
  // Simple menu items
  const menuItems = [
    { id: "home", name: "Home", icon: <Home size={20} /> },
    { id: "search", name: "Search", icon: <Search size={20} /> },
    { id: "library", name: "Library", icon: <Library size={20} /> },
  ];

  return (
    <aside className="hidden md:flex flex-col w-60 h-screen bg-[#1e1e1e] text-white p-6">
      {/* Logo */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-[#b490f2]">Echo</h1>
      </div>

      {/* Navigation - Simple buttons that change the page */}
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)} // This changes the page!
            className={`flex items-center gap-3 p-3 rounded-lg text-left ${
              currentPage === item.id
                ? "bg-[#b490f2] bg-opacity-20 text-[#b490f2]" // Active style
                : "text-gray-400 hover:text-white hover:bg-[#2a2a2a]" // Normal style
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </button>
        ))}
      </nav>

      {/* Extra space */}
      <div className="flex-grow"></div>

      {/* Footer */}
      <div className="text-sm text-gray-500">
        <p>© 2025 Echo</p>
      </div>
    </aside>
  );
};

export default Sidebar;