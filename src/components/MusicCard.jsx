import React, { useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import { PlayerState } from '../PlayerState';

const MusicCard = ({ title, subtitle, image, track }) => {
  const [isHovered, setIsHovered] = useState(false);          
  const [isCurrentlyPlaying, setIsCurrentlyPlaying] = useState(false);

  useEffect(() => {
    console.log('MusicCard mounted for:', title, 'with track:', track);
    
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
  }, [track?.id, title]); 

  const handlePlayClick = (e) => {
    e.stopPropagation();
    console.log('Play button clicked for:', title, track);
    
    if (!track) {
      console.error('No track object provided to MusicCard');
      alert('Error: No track data available');
      return;
    }
    
    PlayerState.playTrack(track); 
  };

  const handleCardClick = () => {
    console.log('Card clicked for:', title, track);
    
    if (!track) {
      console.error('No track object provided to MusicCard');
      alert('Error: No track data available');
      return;
    }
    
    PlayerState.playTrack(track); 
  };

  // Check if audio file exists when component mounts
  useEffect(() => {
    if (track) {
      PlayerState.testAudioFile(track).then(exists => {
        if (!exists) {
          console.warn(`Audio file missing for: ${title}`);
        }
      });
    }
  }, [track, title]);

  const getVideoSource = () => {
    if (title) {
      const fileName = title.toLowerCase().replace(/\s+/g, '_') + '.mp4';
      return `/assets/${fileName}`;
    }
    return null;
  };

  const videoSource = getVideoSource();

  return (
    <div 
      className={`group relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border p-4 rounded-xl shadow-lg transition-all duration-300 cursor-pointer ${
        isCurrentlyPlaying 
          ? 'border-purple-500/50 shadow-purple-500/20 scale-105' 
          : 'border-gray-700/30 hover:shadow-purple-500/20 hover:scale-[1.02]'
      }`}
      onMouseEnter={() => setIsHovered(true)}  
      onMouseLeave={() => setIsHovered(false)} 
      onClick={handleCardClick} 
    >
      
      <div className="w-full h-32 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-lg mb-3 relative overflow-hidden">
        {videoSource ? (
          <video 
            src={videoSource}
            className="w-full h-full object-cover"
            muted
            loop
            playsInline
            preload="metadata"
            onError={(e) => {
              console.warn(`Video not found: ${videoSource}`);
              e.target.style.display = 'none';
            }}
            onLoadedData={() => {
              console.log(`Video loaded: ${videoSource}`);
            }}
          />
        ) : null}
        
        {image && (
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover"
            style={{
              display: videoSource ? 'none' : 'block'
            }}
            onError={(e) => {
              if (videoSource) {
                e.target.style.display = 'block';
              }
            }}
          />
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

        {/* Debug indicator */}
        {!track && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            NO TRACK
          </div>
        )}
      </div>
      
      {isHovered && (
        <button 
          onClick={handlePlayClick}
          className="absolute top-2 right-2 bg-gradient-to-r from-[#7637ff] to-[#e600ff] text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          {isCurrentlyPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
      )}

      <h3 className={`font-semibold truncate transition-colors ${
        isCurrentlyPlaying ? 'text-purple-300' : 'text-white'
      }`}>
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
    </div>
  );
};

export default MusicCard;