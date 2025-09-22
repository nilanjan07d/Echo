import React from "react";
import { User, Mail, Calendar, MapPin, Music, ChevronLeft, LogOut, Edit3 } from "lucide-react";

const ProfilePage = ({ onBack }) => {
  const userData = {
    username: "alexjohnson",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    joinDate: "January 15, 2024",
    location: "New York, USA",
    favoriteGenre: "Electronic • Synthwave • Lo-Fi"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e1e1e] via-[#2a1f3d] to-[#000000] p-4">
      <div className="flex items-center mb-8">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-400 hover:text-white transition-colors p-3 rounded-lg hover:bg-[#2a2a2a]"
        >
          <ChevronLeft size={28} />
        </button>
        <h1 className="text-3xl font-bold ml-4">Your Profile</h1>
      </div>

      <div className="bg-[#1e1e1e] border-2 border-[#2a2a2a] rounded-3xl p-8 w-full">
        <div className="flex flex-col lg:flex-row items-start gap-10">
          
          <div className="flex flex-col items-center lg:items-start space-y-8 lg:w-1/3">
            <div className="w-36 h-36 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center relative">
              <User size={60} className="text-white" />
              <button className="absolute bottom-2 right-2 bg-[#7637ff] p-3 rounded-full hover:bg-[#9333ea] transition-colors">
                <Edit3 size={18} className="text-white" />
              </button>
            </div>

            <div className="text-center lg:text-left space-y-2">
              <h2 className="text-2xl font-bold">{userData.name}</h2>
              <p className="text-gray-400 text-lg">@{userData.username}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="bg-[#2a2a2a] p-4 rounded-xl text-center">
                <p className="text-xl font-bold text-[#b490f2]">128</p>
                <p className="text-sm text-gray-400">Tracks</p>
              </div>
              <div className="bg-[#2a2a2a] p-4 rounded-xl text-center">
                <p className="text-xl font-bold text-[#b490f2]">24</p>
                <p className="text-sm text-gray-400">Playlists</p>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-8">
            <h3 className="text-2xl font-semibold border-b border-[#2a2a2a] pb-4">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4 p-6 bg-[#2a2a2a] rounded-2xl min-h-[120px]">
                <Mail size={22} className="text-[#b490f2] mt-1 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm text-gray-400 mb-2">Email Address</p>
                  <p className="text-white text-lg truncate">{userData.email}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-[#2a2a2a] rounded-2xl min-h-[120px]">
                <Calendar size={22} className="text-[#b490f2] mt-1 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm text-gray-400 mb-2">Member Since</p>
                  <p className="text-white text-lg">{userData.joinDate}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-[#2a2a2a] rounded-2xl min-h-[120px]">
                <MapPin size={22} className="text-[#b490f2] mt-1 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm text-gray-400 mb-2">Location</p>
                  <p className="text-white text-lg">{userData.location}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-[#2a2a2a] rounded-2xl min-h-[120px]">
                <Music size={22} className="text-[#b490f2] mt-1 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm text-gray-400 mb-2">Favorite Genres</p>
                  <p className="text-white text-lg line-clamp-2">{userData.favoriteGenre}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-[#2a2a2a]">
              <button className="flex-1 flex items-center justify-center space-x-2 bg-[#7637ff] hover:bg-[#9333ea] py-3 rounded-xl transition-colors font-medium">
                <Edit3 size={18} />
                <span>Edit Profile</span>
              </button>
              <button className="flex-1 flex items-center justify-center space-x-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-red-400 hover:text-red-300 py-3 rounded-xl transition-colors">
                <LogOut size={18} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;