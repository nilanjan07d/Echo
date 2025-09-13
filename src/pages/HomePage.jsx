import React, { useState } from "react";
import MusicCard from "../components/MusicCard";

// Import all audio files from src/assets
import shapeOfYou from "../assets/shape_of_you.mp3";
import oceanEyes from "../assets/ocean_eyes.mp3";
import loseYourself from "../assets/lose_yourself.mp3";
import heatWaves from "../assets/heat_waves.mp3";
import levitating from "../assets/levitating.mp3";
import starboy from "../assets/starboy.mp3";
import badGuy from "../assets/bad_guy.mp3";
import sunflower from "../assets/sunflower.mp3";

const HomePage = () => {
  const [selectedDiscovery, setSelectedDiscovery] = useState(null);

  return (
    <main className="flex-grow p-6 overflow-y-auto">
      {/* Split into main content and sidebar */}
      <div className="flex gap-6">
        
        {/* Main Content - Left Side */}
        <div className="flex-1">
          
          {/* Hero Section */}
          <section className="mb-8">
            <div className="relative bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-2xl p-8 flex flex-col justify-end h-80 overflow-hidden">
              
              {/* Animated Waveform */}
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <div className="flex items-end space-x-1">
                  <div className="w-1 h-16 bg-white rounded-full animate-pulse" style={{animationDelay: '0s'}}></div>
                  <div className="w-1 h-24 bg-white rounded-full animate-pulse" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-1 h-12 bg-white rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-1 h-32 bg-white rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
                  <div className="w-1 h-8 bg-white rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                  <div className="w-1 h-20 bg-white rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                  <div className="w-1 h-16 bg-white rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
                  <div className="w-1 h-28 bg-white rounded-full animate-pulse" style={{animationDelay: '0.7s'}}></div>
                </div>
              </div>
              
              {/* Play Button */}
              <div className="absolute top-6 right-6">
                <button 
                  className="w-14 h-14 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 group"
                  onClick={() => PlayerState.playTrack({
                    id: 'blinding',
                    title: "Blinding Lights",
                    subtitle: "The Weeknd",
                    audio: blindingLights
                  })}
                >
                  <div className="w-0 h-0 border-l-[10px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1 group-hover:scale-110 transition-transform"></div>
                </button>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-2">Blinding Lights</h3>
                <p className="text-lg text-gray-200">The Weeknd</p>
              </div>
            </div>
          </section>

          {/* Your Vibe Section */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">Your Vibe</h2>
            <div className="grid grid-cols-4 gap-4">
              {[
                { id: 1, title: "Ocean Eyes", subtitle: "Billie Eilish", audio: oceanEyes },
                { id: 2, title: "Lose Yourself", subtitle: "Eminem", audio: loseYourself },
                { id: 3, title: "Shape of You", subtitle: "Ed Sheeran", audio: shapeOfYou },
                { id: 4, title: "Heat Waves", subtitle: "Glass Animals", audio: heatWaves },
                { id: 5, title: "Levitating", subtitle: "Dua Lipa", audio: levitating },
                { id: 6, title: "Starboy", subtitle: "The Weeknd ft. Daft Punk", audio: starboy },
                { id: 7, title: "Bad Guy", subtitle: "Billie Eilish", audio: badGuy },
                { id: 8, title: "Sunflower", subtitle: "Post Malone & Swae Lee", audio: sunflower }
              ].map((card) => (
                <div key={card.id} className="h-48">
                  <MusicCard 
                    title={card.title} 
                    subtitle={card.subtitle} 
                    track={card}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Featured Artists Row */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">Featured Artists</h2>
            <div className="flex space-x-6 overflow-x-auto pb-4">
              {[
                { name: "The Weeknd", color: "from-purple-500 to-pink-500" },
                { name: "Billie Eilish", color: "from-blue-500 to-cyan-500" },
                { name: "Ed Sheeran", color: "from-green-500 to-teal-500" },
                { name: "Dua Lipa", color: "from-orange-500 to-red-500" },
                { name: "Post Malone", color: "from-indigo-500 to-purple-500" }
              ].map((artist, index) => (
                <div key={index} className="flex-shrink-0 text-center group cursor-pointer">
                  <div className={`w-20 h-20 bg-gradient-to-br ${artist.color} rounded-full mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center`}>
                    <span className="text-white font-bold text-lg">{artist.name.split(' ').map(w => w[0]).join('')}</span>
                  </div>
                  <p className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
                    {artist.name}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Discovery Flow Sidebar - Right Side */}
        <div className="hidden lg:block w-80">
          <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/40 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-6 h-fit">
            
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-500">Top Charts</h2>
            </div>
                        
            {/* More Tracks */}
            <div className="space-y-3">
              {[
                { id: 'shape', title: "Shape of You", artist: "Ed Sheeran", color: "from-blue-500 to-cyan-500", initials: "SY", audio: shapeOfYou },
                { id: 'badguy', title: "Bad Guy", artist: "Billie Eilish", color: "from-green-500 to-teal-500", initials: "BG", audio: badGuy },
                { id: 'sunflower', title: "Sunflower", artist: "Post Malone & Swae Lee", color: "from-indigo-500 to-purple-500", initials: "SF", audio: sunflower }
              ].map((track) => (
                <div 
                  key={track.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 cursor-pointer group ${
                    selectedDiscovery === track.id
                      ? 'bg-white/10 border border-white/20 shadow-md' 
                      : 'hover:bg-white/5'
                  }`}
                  onClick={() => {
                    setSelectedDiscovery(track.id);
                    PlayerState.playTrack(track);
                  }}
                >
                  <div className={`w-10 h-10 bg-gradient-to-br ${track.color} rounded-lg flex items-center justify-center transition-transform ${
                    selectedDiscovery === track.id ? 'scale-110' : ''
                  }`}>
                    <span className="text-white font-semibold text-xs">{track.initials}</span>
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium transition-colors ${
                      selectedDiscovery === track.id 
                        ? 'text-purple-300' 
                        : 'group-hover:text-purple-300'
                    }`}>
                      {track.title}
                    </p>
                    <p className="text-xs text-gray-400">{track.artist}</p>
                  </div>
                  
                  {/* Selection indicator */}
                  {selectedDiscovery === track.id && (
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;