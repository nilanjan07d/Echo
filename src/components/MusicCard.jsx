import React, { useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import { PlayerState } from '../PlayerState';

const MusicCard = ({ title, subtitle, image, track }) => {
  const [isHovered, setIsHovered] = useState(false);          
  const [isCurrentlyPlaying, setIsCurrentlyPlaying] = useState(false);

  useEffect(() => {
    const checkIfPlaying = setInterval(() => {
      const currentSong = PlayerState.getCurrentTrack();
      const isPlayerPlaying = PlayerState.getIsPlaying();
      
      if (currentSong && track && currentSong.id === track.id && isPlayerPlaying) {
        setIsCurrentlyPlaying(true); 
      } else {
        setIsCurrentlyPlaying(false); 
      }
    }, 100); 

    return () => clearInterval(checkIfPlaying);
  }, [track?.id]); 

  const handlePlayClick = (e) => {
    e.stopPropagation();
    if (track.audio) {
      PlayerState.playTrack(track); 
    } else {
      console.log("Audio file not available for this track");
    }
  };

  const handleCardClick = () => {
    if (track.audio) {
      PlayerState.playTrack(track); 
    } else {
      console.log("Audio file not available for this track");
    }
  };

  return (
    <div 
      className={`group relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border p-4 rounded-xl shadow-lg transition-all duration-300 cursor-pointer ${
        isCurrentlyPlaying 
          ? 'border-purple-500/50 shadow-purple-500/20 scale-105' 
          : 'border-gray-700/30 hover:shadow-purple-500/20 hover:scale-[1.02]'
      } ${!track.audio ? 'opacity-70 cursor-not-allowed' : ''}`}
      onMouseEnter={() => track.audio && setIsHovered(true)}  
      onMouseLeave={() => track.audio && setIsHovered(false)} 
      onClick={handleCardClick} 
    >
      
      <div className="w-full h-32 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-lg mb-3 relative overflow-hidden">
        {image && (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        )}
        
        {!isCurrentlyPlaying && (
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-0.5 bg-white/40 rounded-full blur-sm"></div>
            <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-0.5 bg-white/30 rounded-full blur-sm"></div>
            <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-0.5 bg-white/20 rounded-full blur-sm"></div>
          </div>
        )}
        
        {isCurrentlyPlaying && (
          <div className="absolute inset-0 flex items-center justify-center opacity-30">
            <div className="flex items-end space-x-0.5">
              <div className="w-0.5 h-6 bg-white rounded-full animate-pulse" style={{animationDelay: '0s'}}></div>
              <div className="w-0.5 h-8 bg-white rounded-full animate-pulse" style={{animationDelay: '0.1s'}}></div>
              <div className="w-0.5 h-4 bg-white rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="w-0.5 h-10 bg-white rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
              <div className="w-0.5 h-6 bg-white rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
            </div>
          </div>
        )}

        {!track.audio && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white text-xs font-medium">No audio</span>
          </div>
        )}
      </div>
      
      {isHovered && track.audio && (
        <button 
          onClick={handlePlayClick}
          className="absolute top-2 right-2 bg-gradient-to-r from-[#7637ff] to-[#e600ff] text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          {isCurrentlyPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
      )}

      <h3 className={`font-semibold truncate transition-colors ${
        isCurrentlyPlaying ? 'text-purple-300' : 'text-white'
      } ${!track.audio ? 'text-gray-400' : ''}`}>
        {title}
      </h3>
      <p className={`text-sm truncate transition-colors ${
        isCurrentlyPlaying ? 'text-purple-200' : 'text-gray-400'
      }`}>
        {subtitle}
      </p>
      
      {isCurrentlyPlaying && (
        <div className="absolute top-2 left-2 w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
      )}

      {!track.audio && (
        <div className="absolute top-2 left-2 w-2 h-2 bg-gray-500 rounded-full"></div>
      )}
    </div>
  );
};

export default MusicCard;