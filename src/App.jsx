import React, { useState } from "react";
import TopBar from "./components/TopBar";
import BottomNav from "./components/BottomNav";
import PlayerBar from "./components/PlayerBar";
import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import LibraryPage from "./pages/LibraryPage";

const App = () => {
  // Simple state to track current page
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-[#1e1e1e] via-[#2a1f3d] to-[#000000]">
      <TopBar />
      <div className="flex flex-grow overflow-hidden">
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        
        {/* Show different pages based on currentPage state */}
        <main className="flex-1 overflow-y-auto">
          {currentPage === "home" && <HomePage />}
          {currentPage === "search" && <SearchPage />}
          {currentPage === "library" && <LibraryPage />}
        </main>
      </div>
      <div>
        <PlayerBar />
        <BottomNav currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
};

export default App;