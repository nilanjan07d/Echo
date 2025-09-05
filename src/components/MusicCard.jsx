import React, { useState } from "react";
import { Play, Pause } from "lucide-react";
import { PlayerState } from '../PlayerState';
const MusicCard = ({ title, subtitle, image, track }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Get current state from our PlayerState
  const isCurrentlyPlaying = PlayerState.getIsPlaying() && 
   PlayerState.getCurrentTrack()?.id === track?.id;

  const handlePlayClick = (e) => {
    e.stopPropagation(); // Don't trigger parent clicks
    PlayerState.playTrack(track); // Play this track!
  };

  return (
    <div 
      className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/30 p-4 rounded-xl shadow-lg hover:shadow-purple-500/20 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => PlayerState.playTrack(track)} // Play when card is clicked
    >
      {/* Image/Artwork */}
      <div className="w-full h-32 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-lg mb-3 relative overflow-hidden">
        {image && (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        )}
      </div>
      
      {/* Play Button (shows on hover) */}
      {isHovered && (
        <button 
          onClick={handlePlayClick}
          className="absolute top-2 right-2 bg-[#7637ff] text-white p-2 rounded-full shadow-lg"
        >
          {isCurrentlyPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
      )}

      {/* Text Content */}
      <h3 className="font-semibold text-white truncate">{title}</h3>
      <p className="text-sm text-gray-400 truncate">{subtitle}</p>
      
      {/* Show playing indicator if this track is playing */}
      {isCurrentlyPlaying && (
        <div className="absolute top-2 left-2 w-2 h-2 bg-[#7637ff] rounded-full"></div>
      )}
    </div>
  );
};

export default MusicCard;