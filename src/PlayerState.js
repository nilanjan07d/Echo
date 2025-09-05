// src/PlayerState.js
let currentTrack = null;
let isPlaying = false;

// Simple player state management
export const PlayerState = {
  getCurrentTrack: () => currentTrack,
  getIsPlaying: () => isPlaying,
  
  playTrack: (track) => {
    currentTrack = track;
    isPlaying = true;
    console.log("Now playing:", track?.title);
  },
  
  togglePlay: () => {
    isPlaying = !isPlaying;
    console.log(isPlaying ? "Playing" : "Paused");
    return isPlaying;
  }
};