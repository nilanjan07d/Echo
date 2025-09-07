import React, { useState, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { PlayerState } from '../PlayerState';

const PlayerBar = () => {
  const [currentTrack, setCurrentTrack] = useState(PlayerState.getCurrentTrack());
  const [isPlaying, setIsPlaying] = useState(PlayerState.getIsPlaying());
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(200); 

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTrack(PlayerState.getCurrentTrack());
      setIsPlaying(PlayerState.getIsPlaying());
      
      if (isPlaying && currentTime < duration) {
        setCurrentTime(prev => Math.min(prev + 1, duration));
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, currentTime, duration]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = (currentTime / duration) * 100;

  return (
    <footer className="p-3 bg-[#141414] border-t border-[#2a2a2a] flex justify-between items-center z-50">
      <div className="flex items-center space-x-3 w-1/4 min-w-[160px]">
        <img
          src={currentTrack?.image || "https://placehold.co/400x400/7637ff/ffffff?text=E"}
          alt="Album Art"
          className="h-10 w-10 rounded-lg object-cover"
        />
        <div className="min-w-0">
          <p className="text-xs font-medium truncate">
            {currentTrack?.title || "No track selected"}
          </p>
          <p className="text-[10px] text-gray-400 truncate">
            {currentTrack?.artist || "Choose a song"}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-1 w-2/4 max-w-[400px]">
        <div className="flex items-center justify-center space-x-4">
          <button className="text-gray-400 hover:text-white transition-colors">
            <SkipBack size={16} />
          </button>
          
          <button
            onClick={PlayerState.togglePlay}
            className="text-white bg-[#7637ff] hover:bg-[#9333ea] transition-colors p-2 rounded-full shadow-lg"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
          </button>
          
          <button className="text-gray-400 hover:text-white transition-colors">
            <SkipForward size={16} />
          </button>
        </div>

        <div className="flex items-center space-x-2 w-full max-w-[350px]">
          <span className="text-[10px] text-gray-400 min-w-[30px] text-right">
            {formatTime(currentTime)}
          </span>
          <div className="relative w-full h-1 rounded-full bg-gray-700">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#7637ff] to-[#e600ff] rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <span className="text-[10px] text-gray-400 min-w-[30px]">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      <div className="hidden md:flex items-center space-x-2 w-1/4 justify-end min-w-[100px]">
        <Volume2 size={14} className="text-gray-400" />
        <div className="w-16">
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="80"
            className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
      </div>
    </footer>
  );
};

export default PlayerBar;