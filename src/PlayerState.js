// src/PlayerState.js
let currentTrack = null;
let isPlaying = false;
let audioElement = null;
let listeners = [];

// Simple player state management
export const PlayerState = {
  getCurrentTrack: () => currentTrack,
  getIsPlaying: () => isPlaying,
  
  addListener: (callback) => {
    listeners.push(callback);
    return () => {
      listeners = listeners.filter(l => l !== callback);
    };
  },
  
  notifyListeners: () => {
    listeners.forEach(callback => callback({
      currentTrack,
      isPlaying,
      currentTime: audioElement ? audioElement.currentTime : 0,
      duration: audioElement ? audioElement.duration : 0
    }));
  },
  
  playTrack: (track) => {
    // Check if the track has an audio file
    if (!track.audio) {
      console.error("No audio file available for this track:", track.title);
      return;
    }
    
    // If we're switching tracks, create a new audio element
    if (!currentTrack || currentTrack.id !== track.id) {
      if (audioElement) {
        audioElement.pause();
        audioElement = null;
      }
      
      // Create a new audio element with the imported audio file
      audioElement = new Audio(track.audio);
      
      // Set up event listeners
      audioElement.onended = () => {
        isPlaying = false;
        PlayerState.notifyListeners();
      };
      
      audioElement.onloadedmetadata = () => {
        PlayerState.notifyListeners();
      };
      
      audioElement.onerror = (e) => {
        console.error("Audio error:", e, audioElement.error);
        isPlaying = false;
        PlayerState.notifyListeners();
      };
      
      audioElement.oncanplaythrough = () => {
        PlayerState.notifyListeners();
      };
      
      currentTrack = track;
    }
    
    if (isPlaying && currentTrack.id === track.id) {
      // Pause if already playing this track
      audioElement.pause();
      isPlaying = false;
      PlayerState.notifyListeners();
    } else {
      // Play the track
      audioElement.play()
        .then(() => {
          isPlaying = true;
          PlayerState.notifyListeners();
        })
        .catch(error => {
          console.error("Playback failed:", error);
          isPlaying = false;
          PlayerState.notifyListeners();
        });
    }
  },
  
  togglePlay: () => {
    if (!audioElement) return false;
    
    if (isPlaying) {
      audioElement.pause();
      isPlaying = false;
    } else {
      audioElement.play()
        .then(() => {
          isPlaying = true;
        })
        .catch(error => {
          console.error("Playback failed:", error);
          isPlaying = false;
        });
    }
    
    PlayerState.notifyListeners();
    return isPlaying;
  },
  
  // Add method to seek through the track
  seekTo: (time) => {
    if (audioElement) {
      audioElement.currentTime = time;
      PlayerState.notifyListeners();
    }
  },
  
  // Get current time of the track
  getCurrentTime: () => {
    return audioElement ? audioElement.currentTime : 0;
  },
  
  // Get duration of the track
  getDuration: () => {
    return audioElement ? audioElement.duration : 0;
  },
  
  // Set volume
  setVolume: (volume) => {
    if (audioElement) {
      audioElement.volume = volume / 100;
    }
  }
};