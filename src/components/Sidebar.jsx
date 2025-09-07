import React from "react";
import { Home, Search, Library, LayoutGrid } from "lucide-react";

const Sidebar = ({ currentPage, setCurrentPage }) => {
  const menuItems = [
    { id: "home", name: "Home", icon: <Home size={20} /> },
    { id: "search", name: "Search", icon: <Search size={20} /> },
    { id: "library", name: "Library", icon: <Library size={20} /> },
    { id: "categories", name: "Categories", icon: <LayoutGrid size={20} /> },
  ];

  return (
    <aside className="hidden md:flex flex-col w-60 bg-[#1e1e1e] text-white p-6">
      {/* Logo */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-[#b490f2]">Echo</h1>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)} 
            className={`flex items-center gap-3 p-3 rounded-lg text-left ${
              currentPage === item.id
                ? "bg-[#b490f2] bg-opacity-20 text-white"
                : "text-gray-400 hover:text-white hover:bg-[#2a2a2a]"
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </button>
        ))}
      </nav>

      <div className="flex-grow"></div>

      <div className="mt-auto pt-4">
        <div className="text-xs text-gray-500 border-t border-[#2a2a2a] pt-4">
          <div className="grid grid-cols-2 gap-2 mb-3">
            <a href="#" className="hover:text-gray-300 transition-colors">About</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Contact Us</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Help</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
          </div>
          <p>© 2025 Echo</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;