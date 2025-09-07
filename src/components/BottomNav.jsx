import React from "react";
import { Home, Search, Library, Grid } from "lucide-react"; 

const BottomNav = ({ currentPage, setCurrentPage }) => {
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "search", label: "Search", icon: Search },
    { id: "categories", label: "Browse", icon: Grid }, 
    { id: "library", label: "Library", icon: Library },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-[#1e1e1e] border-t border-[#2a2a2a] p-3 flex justify-around items-center md:hidden">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentPage === item.id;
        
        return (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className={`flex flex-col items-center text-xs transition-all duration-200 ${
              isActive 
                ? "text-[#b490f2] transform scale-105" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            <div className={`p-2 rounded-full transition-colors ${
              isActive ? "bg-[#b490f2] bg-opacity-20" : ""
            }`}>
              <Icon size={22} />
            </div>
            <span className="mt-1">{item.label}</span>
            
            {isActive && (
              <div className="w-1 h-1 bg-[#b490f2] rounded-full mt-1"></div>
            )}
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;