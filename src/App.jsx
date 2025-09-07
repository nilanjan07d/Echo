import React, { useState } from "react";
import TopBar from "./components/TopBar";
import BottomNav from "./components/BottomNav";
import PlayerBar from "./components/PlayerBar";
import Sidebar from "./components/Sidebar";
import HomePage from "./pages/Homepage";
import SearchPage from "./pages/SearchPage";
import LibraryPage from "./pages/LibraryPage";
import ProfilePage from "./pages/ProfilePage";
import CategoryPage from "./pages/CategoryPage";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-[#1e1e1e] via-[#2a1f3d] to-[#000000]">
      <TopBar setShowProfile={setShowProfile} />
      
      <div className="flex flex-grow overflow-hidden">
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        
        {showProfile ? (
          <ProfilePage onBack={() => setShowProfile(false)} />
        ) : (
          <main className="flex-1 overflow-y-auto">
            {currentPage === "home" && <HomePage />}
            {currentPage === "search" && <SearchPage />}
            {currentPage === "library" && <LibraryPage />}
            {currentPage === "categories" && <CategoryPage />}  {/* Fixed this line */}
          </main>
        )}
      </div>
    
      {!showProfile && (
        <div>
          <PlayerBar />
          <BottomNav currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
      )}
    </div>
  );
};

export default App;