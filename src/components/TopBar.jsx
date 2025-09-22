import React, { useState } from "react";
import { Search, User, X, Settings, LogOut, User as UserIcon, Crown } from "lucide-react";
import EchoLogo from "./EchoLogo";

const TopBar = ({ setShowProfile }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
    if (showSearch) setSearchQuery("");
  };

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleMenuItemClick = (action) => {
    setShowProfileMenu(false);
    if (action === "profile") {
      setShowProfile(true); 
    }
    console.log(`Clicked: ${action}`);
  };

  const handlePremiumClick = () => {
    console.log("Explore Premium clicked");
  };

  return (
    <header className="flex items-center justify-between p-4 bg-[#141414] border-b border-[#2a2a2a] relative">
      <EchoLogo />
      
      <div className="flex items-center space-x-4">
        {/* Explore Premium Button */}
        <button
          onClick={handlePremiumClick}
          className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-4 py-2 
          rounded-full font-medium hover:from-yellow-400 hover:to-orange-400 transition-all duration-300 shadow-lg hover:shadow-yellow-500/25"
        >
          <Crown size={16} className="fill-current" />
          <span>Explore Premium</span>
        </button>

        {/* Profile Button with Dropdown */}
        <div className="relative">
          <button 
            onClick={handleProfileClick}
            className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-[#2a2a2a]"
          >
            <User className="w-5 h-5" />
          </button>

          {/* Profile Dropdown Menu */}
          {showProfileMenu && (
            <div className="absolute right-0 top-12 w-48 bg-[#1e1e1e] border border-[#2a2a2a] rounded-lg shadow-lg z-50 overflow-hidden">
              <div className="p-4 border-b border-[#2a2a2a]">
                <p className="text-white font-medium">Welcome User</p>
                <p className="text-sm text-gray-400">user@example.com</p>
              </div>
              
              <div className="py-2">
                <button
                  onClick={() => handleMenuItemClick("profile")}
                  className="w-full flex items-center space-x-3 px-4 py-2 text-left text-gray-300 hover:bg-[#2a2a2a] hover:text-white transition-colors"
                >
                  <UserIcon size={18} />
                  <span>Your Profile</span>
                </button>
                
                <button
                  onClick={() => handleMenuItemClick("settings")}
                  className="w-full flex items-center space-x-3 px-4 py-2 text-left text-gray-300 hover:bg-[#2a2a2a] hover:text-white transition-colors"
                >
                  <Settings size={18} />
                  <span>Settings</span>
                </button>

                {/* Premium Option in Menu */}
                <button
                  onClick={() => handleMenuItemClick("premium")}
                  className="w-full flex items-center space-x-3 px-4 py-2 text-left text-yellow-300 hover:bg-yellow-500/10 transition-colors"
                >
                  <Crown size={18} className="fill-current" />
                  <span>Go Premium</span>
                </button>
                
                <button
                  onClick={() => handleMenuItemClick("logout")}
                  className="w-full flex items-center space-x-3 px-4 py-2 text-left text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                >
                  <LogOut size={18} />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Overlay to close menu when clicking outside */}
      {showProfileMenu && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setShowProfileMenu(false)}
        />
      )}
    </header>
  );
};

export default TopBar;