import React, { useState, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { PlayerState } from '../PlayerState';

const PlayerBar = () => {
  const [currentTrack, setCurrentTrack] = useState(PlayerState.getCurrentTrack());
  const [isPlaying, setIsPlaying] = useState(PlayerState.getIsPlaying());
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(PlayerState.getVolume() * 100);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTrack(PlayerState.getCurrentTrack());
      setIsPlaying(PlayerState.getIsPlaying());
      setCurrentTime(PlayerState.getCurrentTime());
      setDuration(PlayerState.getDuration());
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e) => {
    if (!duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    PlayerState.seekTo(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    PlayerState.setVolume(newVolume / 100);
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <footer className="p-3 bg-[#141414] border-t border-[#2a2a2a] flex justify-between items-center z-50">
      {/* Track Info */}
      <div className="flex items-center space-x-3 w-1/4 min-w-[160px]">
        <div className="h-10 w-10 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-lg flex items-center justify-center">
          {currentTrack?.title ? (
            <span className="text-white text-xs font-bold">
              {currentTrack.title.split(' ').map(w => w[0]).join('').slice(0, 2)}
            </span>
          ) : (
            <span className="text-white text-xs">♪</span>
          )}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium truncate">
            {currentTrack?.title || "No track selected"}
          </p>
          <p className="text-[10px] text-gray-400 truncate">
            {currentTrack?.artist || "Choose a song"}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center space-y-1 w-2/4 max-w-[400px]">
        <div className="flex items-center justify-center space-x-4">
          <button className="text-gray-400 hover:text-white transition-colors">
            <SkipBack size={16} />
          </button>
          
          <button
            onClick={PlayerState.togglePlay}
            disabled={!currentTrack}
            className={`text-white p-2 rounded-full shadow-lg transition-colors ${
              currentTrack 
                ? 'bg-[#7637ff] hover:bg-[#9333ea]' 
                : 'bg-gray-600 cursor-not-allowed'
            }`}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
          </button>
          
          <button className="text-gray-400 hover:text-white transition-colors">
            <SkipForward size={16} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center space-x-2 w-full max-w-[350px]">
          <span className="text-[10px] text-gray-400 min-w-[30px] text-right">
            {formatTime(currentTime)}
          </span>
          <div 
            className="relative w-full h-1 rounded-full bg-gray-700 cursor-pointer"
            onClick={handleProgressClick}
          >
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#7637ff] to-[#e600ff] rounded-full transition-all duration-100"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <span className="text-[10px] text-gray-400 min-w-[30px]">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Volume Control */}
      <div className="hidden md:flex items-center space-x-2 w-1/4 justify-end min-w-[100px]">
        <Volume2 size={14} className="text-gray-400" />
        <div className="w-16">
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #7637ff 0%, #7637ff ${volume}%, #374151 ${volume}%, #374151 100%)`
            }}
          />
        </div>
      </div>
    </footer>
  );
};

export default PlayerBar;