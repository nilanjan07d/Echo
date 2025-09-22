import React, { useState } from "react";
import { Music, Clock, Calendar, Heart, Download, MoreHorizontal, Play } from "lucide-react";
import MusicCard from "../components/MusicCard";
import { PlayerState } from "../PlayerState";
import shapeOfYou from "../assets/shape_of_you.mp3";
import oceanEyes from "../assets/ocean_eyes.mp3";
import loseYourself from "../assets/lose_yourself.mp3";
import heatWaves from "../assets/heat_waves.mp3";
import levitating from "../assets/levitating.mp3";
import starboy from "../assets/starboy.mp3";
import badGuy from "../assets/bad_guy.mp3";
import sunflower from "../assets/sunflower.mp3";
import blindinglight from "../assets/blinding_lights.mp3";
import stay from "../assets/stay.mp3";
import creep from "../assets/creep.mp3";
import hotelcalifornia from "../assets/hotel_california.mp3";
import bohemain from "../assets/bohemian.mp3";
import rolling from "../assets/rolling.mp3";
import asitwas from "../assets/asitwas.mp3";
import oceaneye from "../assets/oceaneyepic.jpg";
import eminem from "../assets/Eminem.jpg";
import shapeofyoued from "../assets/Edshapeofyou.jpeg";
import glassanimals from "../assets/glassanimals.jpeg";
import lavitatingpic from "../assets/dualipa.jpg";
import starboypic from "../assets/starboypic.webp";
import badguypic from "../assets/billieElish.jpg";
import sunflowerpic from "../assets/sunfloerpic.webp";
import blindinglightpic from "../assets/blindinglight.jpeg";
import staypic from "../assets/staypic.png";
import creepimg from "../assets/creepimg.jpg";
import asitwaspic from "../assets/asitwaspic.jpeg";
import queen from "../assets/queen.png";
import adele from "../assets/adele.png";
import eagles from "../assets/eagles.jpg";

const LibraryPage = () => {
  const [activeTab, setActiveTab] = useState("recent");

  // User library data with real songs from assets
  const recentlyPlayed = [
    { 
      id: 'blinding-lights-lib', 
      title: "Blinding Lights", 
      artist: "The Weeknd", 
      subtitle: "The Weeknd",
      genre: "Pop",
      lastPlayed: "2 hours ago", 
      plays: 23,
      audio: blindinglight,
      image: blindinglightpic
    },
    { 
      id: 'shape-of-you-lib', 
      title: "Shape of You", 
      artist: "Ed Sheeran", 
      subtitle: "Ed Sheeran",
      genre: "Pop",
      lastPlayed: "5 hours ago", 
      plays: 15,
      audio: shapeOfYou,
      image: shapeofyoued
    },
    { 
      id: 'levitating-lib', 
      title: "Levitating", 
      artist: "Dua Lipa", 
      subtitle: "Dua Lipa",
      genre: "Pop",
      lastPlayed: "1 day ago", 
      plays: 31,
      audio: levitating,
      image: lavitatingpic
    },
    { 
      id: 'bad-guy-lib', 
      title: "Bad Guy", 
      artist: "Billie Eilish", 
      subtitle: "Billie Eilish",
      genre: "Alternative",
      lastPlayed: "2 days ago", 
      plays: 8,
      audio: badGuy,
      image: badguypic
    },
    { 
      id: 'starboy-lib', 
      title: "Starboy", 
      artist: "The Weeknd", 
      subtitle: "The Weeknd",
      genre: "Pop",
      lastPlayed: "3 days ago", 
      plays: 42,
      audio: starboy,
      image: starboypic
    }
  ];

  const likedSongs = [
    { 
      id: 'ocean-eyes-lib', 
      title: "Ocean Eyes", 
      artist: "Billie Eilish", 
      subtitle: "Billie Eilish",
      genre: "Alternative", 
      duration: "3:20",
      audio: oceanEyes,
      image: oceaneye
    },
    { 
      id: 'as-it-was-lib', 
      title: "As It Was", 
      artist: "Harry Styles", 
      subtitle: "Harry Styles",
      genre: "Pop", 
      duration: "2:47",
      audio: asitwas,
      image: asitwaspic
    },
    { 
      id: 'heat-waves-lib', 
      title: "Heat Waves", 
      artist: "Glass Animals", 
      subtitle: "Glass Animals",
      genre: "Indie", 
      duration: "3:58",
      audio: heatWaves,
      image: glassanimals
    },
    { 
      id: 'rolling-lib', 
      title: "Rolling in the Deep", 
      artist: "Adele", 
      subtitle: "Adele",
      genre: "Pop", 
      duration: "3:48",
      audio: rolling,
      image: adele
    },
    { 
      id: 'sunflower-lib', 
      title: "Sunflower", 
      artist: "Post Malone, Swae Lee", 
      subtitle: "Post Malone, Swae Lee",
      genre: "Hip-Hop", 
      duration: "2:38",
      audio: sunflower,
      image: sunflowerpic
    }
  ];

  const playlists = [
    { id: 'chill-vibes', name: "Chill Vibes", trackCount: 24, duration: "1h 32m", color: "from-blue-500 to-purple-500" },
    { id: 'workout-energy', name: "Workout Energy", trackCount: 18, duration: "58m", color: "from-red-500 to-orange-500" },
    { id: 'night-drive', name: "Night Drive", trackCount: 31, duration: "2h 15m", color: "from-purple-500 to-pink-500" },
    { id: 'focus-flow', name: "Focus Flow", trackCount: 16, duration: "1h 8m", color: "from-green-500 to-teal-500" }
  ];

  const tabs = [
    { id: 'recent', name: 'Recently Played', icon: Clock },
    { id: 'liked', name: 'Liked Songs', icon: Heart },
    { id: 'playlists', name: 'Playlists', icon: Music },
    { id: 'downloaded', name: 'Downloaded', icon: Download }
  ];

  const handlePlayTrack = (track) => {
    PlayerState.playTrack(track);
  };

  return (
    <main className="flex-grow p-6 overflow-y-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2 text-white">Your Library</h1>
        <p className="text-gray-400">Your music collection and preferences</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-8 bg-gray-800/30 rounded-xl p-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/30'
              }`}
            >
              <Icon size={18} />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div>
        {/* Recently Played Tab */}
        {activeTab === 'recent' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Recently Played</h2>
              <button className="text-gray-400 hover:text-white transition-colors">
                <MoreHorizontal size={20} />
              </button>
            </div>
            
            <div className="space-y-3">
              {recentlyPlayed.map((track, index) => (
                <div
                  key={track.id}
                  className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-900/30 to-gray-800/20 backdrop-blur-sm border border-gray-700/20 rounded-xl hover:border-gray-600/40 hover:bg-gray-800/30 transition-all duration-300 group cursor-pointer"
                  onClick={() => handlePlayTrack(track)}
                >
                  {/* Track Number */}
                  <div className="w-6 text-center">
                    <span className="text-gray-400 group-hover:hidden">{index + 1}</span>
                    <button className="hidden group-hover:block text-white hover:text-purple-400">
                      <Play size={16} />
                    </button>
                  </div>
                  
                  {/* Album Art */}
                  <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    {track.image ? (
                      <img src={track.image} alt={track.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <Music size={20} className="text-white" />
                      </div>
                    )}
                  </div>
                  
                  {/* Track Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white truncate">{track.title}</p>
                    <p className="text-sm text-gray-400 truncate">{track.artist}</p>
                  </div>
                  
                  {/* Play Count */}
                  <div className="hidden md:block text-sm text-gray-400">
                    {track.plays} plays
                  </div>
                  
                  {/* Last Played */}
                  <div className="text-sm text-gray-400 w-24 text-right">
                    {track.lastPlayed}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Liked Songs Tab */}
        {activeTab === 'liked' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Heart size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">Liked Songs</h2>
                  <p className="text-sm text-gray-400">{likedSongs.length} songs</p>
                </div>
              </div>
              <button 
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full hover:scale-105 transition-transform"
                onClick={() => handlePlayTrack(likedSongs[0])}
              >
                <Play size={16} />
                <span>Play All</span>
              </button>
            </div>
            
            <div className="space-y-2">
              {likedSongs.map((track, index) => (
                <div
                  key={track.id}
                  className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-800/30 transition-all duration-300 group cursor-pointer"
                  onClick={() => handlePlayTrack(track)}
                >
                  {/* Track Number */}
                  <div className="w-6 text-center">
                    <span className="text-gray-400 group-hover:hidden">{index + 1}</span>
                    <button className="hidden group-hover:block text-white hover:text-purple-400">
                      <Play size={16} />
                    </button>
                  </div>
                  
                  {/* Track Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white truncate">{track.title}</p>
                    <p className="text-sm text-gray-400 truncate">{track.artist} • {track.genre}</p>
                  </div>
                  
                  {/* Duration */}
                  <div className="text-sm text-gray-400">
                    {track.duration}
                  </div>
                  
                  {/* Heart Icon */}
                  <button className="text-purple-400 hover:text-purple-300 transition-colors">
                    <Heart size={16} className="fill-current" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Playlists Tab */}
        {activeTab === 'playlists' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Your Playlists</h2>
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform">
                Create Playlist
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {playlists.map((playlist) => (
                <div
                  key={playlist.id}
                  className="group bg-gradient-to-br from-gray-900/40 to-gray-800/20 backdrop-blur-sm border border-gray-700/20 rounded-xl p-6 hover:border-gray-600/40 hover:scale-105 transition-all duration-300 cursor-pointer relative"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${playlist.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Music size={24} className="text-white" />
                  </div>
                  
                  <h3 className="font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {playlist.name}
                  </h3>
                  <p className="text-sm text-gray-400 mb-1">
                    {playlist.trackCount} tracks
                  </p>
                  <p className="text-xs text-gray-500">
                    {playlist.duration}
                  </p>
                  
                  {/* Play Button Overlay */}
                  <button className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110">
                    <Play size={16} className="text-white ml-0.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Downloaded Tab */}
        {activeTab === 'downloaded' && (
          <div className="text-center py-12">
            <Download size={48} className="text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Downloaded Music</h3>
            <p className="text-gray-400 mb-6">Download songs to listen offline</p>
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:scale-105 transition-transform">
              Browse Music
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default LibraryPage;