import React, { useState, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { PlayerState } from '../PlayerState';

const PlayerBar = () => {
  const [playerState, setPlayerState] = useState({
    currentTrack: PlayerState.getCurrentTrack(),
    isPlaying: PlayerState.getIsPlaying(),
    currentTime: PlayerState.getCurrentTime(),
    duration: PlayerState.getDuration() || 200
  });

  const [volume, setVolume] = useState(80);

  useEffect(() => {
    const unsubscribe = PlayerState.addListener((newState) => {
      setPlayerState(newState);
    });
    
    // Update time more frequently for smooth progress bar
    const timeUpdateInterval = setInterval(() => {
      if (playerState.isPlaying) {
        setPlayerState(prev => ({
          ...prev,
          currentTime: PlayerState.getCurrentTime(),
          duration: PlayerState.getDuration() || prev.duration
        }));
      }
    }, 100);
    
    return () => {
      unsubscribe();
      clearInterval(timeUpdateInterval);
    };
  }, [playerState.isPlaying]);

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = playerState.duration > 0 ? 
    (playerState.currentTime / playerState.duration) * 100 : 0;

  const handleSeek = (e) => {
    const seekBar = e.currentTarget;
    const rect = seekBar.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const percentage = clickPosition / rect.width;
    const seekTime = percentage * playerState.duration;
    PlayerState.seekTo(seekTime);
  };

  const handlePreviousTrack = () => {
    PlayerState.previousTrack();
  };

  const handleNextTrack = () => {
    PlayerState.nextTrack();
  };

  const handleVolumeMouseDown = (e) => {
    e.preventDefault();
    const volumeBar = e.currentTarget;
    
    const updateVolume = (mouseEvent) => {
      const rect = volumeBar.getBoundingClientRect();
      const clickPosition = mouseEvent.clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (clickPosition / rect.width) * 100));
      setVolume(percentage);
      PlayerState.setVolume(percentage);
    };

    // Set initial volume
    updateVolume(e);
    
    const handleMouseMove = (moveEvent) => {
      updateVolume(moveEvent);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <footer className="p-3 bg-[#141414] border-t border-[#2a2a2a] flex justify-between items-center z-50">
      <div className="flex items-center space-x-3 w-1/4 min-w-[160px]">
        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <span className="text-white font-bold text-sm">
            {playerState.currentTrack ? 
              playerState.currentTrack.title.split(' ').map(w => w[0]).join('') : 
              "NS"}
          </span>
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium truncate text-white">
            {playerState.currentTrack?.title || "No track selected"}
          </p>
          <p className="text-[10px] text-gray-400 truncate">
            {playerState.currentTrack?.subtitle || "Choose a song"}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-1 w-2/4 max-w-[400px]">
        <div className="flex items-center justify-center space-x-4">
          <button 
            onClick={handlePreviousTrack}
            className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-200"
          >
            <SkipBack size={16} />
          </button>
          
          <button
            onClick={PlayerState.togglePlay}
            className="text-white bg-[#7637ff] hover:bg-[#9333ea] transition-colors p-2 rounded-full shadow-lg hover:scale-110 transform duration-200"
          >
            {playerState.isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
          </button>
          
          <button 
            onClick={handleNextTrack}
            className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-200"
          >
            <SkipForward size={16} />
          </button>
        </div>

        <div className="flex items-center space-x-2 w-full max-w-[350px]">
          <span className="text-[10px] text-gray-400 min-w-[30px] text-right">
            {formatTime(playerState.currentTime)}
          </span>
          <div 
            className="relative w-full h-1 rounded-full bg-gray-700 cursor-pointer"
            onClick={handleSeek}
          >
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#7637ff] to-[#e600ff] rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <span className="text-[10px] text-gray-400 min-w-[30px]">
            {formatTime(playerState.duration)}
          </span>
        </div>
      </div>

      <div className="hidden md:flex items-center space-x-2 w-1/4 justify-end min-w-[100px]">
        <Volume2 size={14} className="text-gray-400" />
        <div 
          className="relative w-16 h-1 bg-gray-700 rounded-full cursor-pointer"
          onMouseDown={handleVolumeMouseDown}
        >
          {/* Volume progress bar */}
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#7637ff] to-[#9333ea] rounded-full transition-all duration-200 pointer-events-none"
            style={{ width: `${volume}%` }}
          />
          {/* Volume slider thumb */}
          <div 
            className="absolute top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg transition-all duration-200 hover:scale-110 pointer-events-none"
            style={{ left: `calc(${volume}% - 6px)` }}
          />
        </div>
      </div>
    </footer>
  );
};

export default PlayerBar;