import React, { useState, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { PlayerState } from '../PlayerState';

const PlayerBar = () => {
  const [currentTrack, setCurrentTrack] = useState(PlayerState.getCurrentTrack());
  const [isPlaying, setIsPlaying] = useState(PlayerState.getIsPlaying());
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(200); // 3:20 in seconds

  // Update our component when the player state changes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTrack(PlayerState.getCurrentTrack());
      setIsPlaying(PlayerState.getIsPlaying());
      
      // Simulate progress if playing
      if (isPlaying && currentTime < duration) {
        setCurrentTime(prev => Math.min(prev + 1, duration));
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, currentTime, duration]);

  // Format time from seconds to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = (currentTime / duration) * 100;

  return (
    <footer className="p-4 bg-[#141414] border-t border-[#2a2a2a] flex justify-between items-center z-50">
      {/* Track Info - Shows default if no track selected */}
      <div className="flex items-center space-x-4 w-1/4 min-w-[200px]">
        <img
          src={currentTrack?.image || "https://placehold.co/600x600/7637ff/ffffff?text=Echo"}
          alt="Album Art"
          className="h-14 w-14 rounded-lg object-cover"
        />
        <div>
          <p className="text-sm font-medium">
            {currentTrack?.title || "No track selected"}
          </p>
          <p className="text-xs text-gray-400">
            {currentTrack?.artist || "Choose a song to play"}
          </p>
        </div>
      </div>

      {/* Player Controls */}
      <div className="flex flex-col items-center space-y-2 w-2/4 max-w-[500px]">
        <div className="flex items-center justify-center space-x-6">
          <button className="text-gray-400 hover:text-white transition-colors">
            <SkipBack size={20} />
          </button>
          
          <button
            onClick={PlayerState.togglePlay}
            className="text-white bg-[#7637ff] hover:bg-[#9333ea] transition-colors p-3 rounded-full shadow-lg hover:scale-105 transform duration-200"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-0.5" />}
          </button>
          
          <button className="text-gray-400 hover:text-white transition-colors">
            <SkipForward size={20} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center space-x-3 w-full max-w-[400px]">
          <span className="text-xs text-gray-400 min-w-[35px] text-right">
            {formatTime(currentTime)}
          </span>
          <div className="relative w-full h-1.5 rounded-full bg-gray-700">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#7637ff] to-[#e600ff] rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <span className="text-xs text-gray-400 min-w-[35px]">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Volume Control */}
      <div className="hidden md:flex items-center space-x-3 w-1/4 justify-end min-w-[120px]">
        <Volume2 size={18} className="text-gray-400" />
        <div className="w-20">
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="80"
            className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
      </div>
    </footer>
  );
};

export default PlayerBar;