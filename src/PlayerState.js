// PlayerState.js - Audio playback management with debug and browser policy handling

class PlayerStateManager {
  constructor() {
    this.currentTrack = null;
    this.isPlaying = false;
    this.audio = null;
    this.currentTime = 0;
    this.duration = 0;
    this.volume = 0.8;
    this.hasUserInteracted = false;
    
    // Enable user interaction tracking
    this.setupUserInteractionTracking();
  }

  // Track user interaction to enable audio playback
  setupUserInteractionTracking() {
    const enableAudio = () => {
      this.hasUserInteracted = true;
      console.log('User interaction detected - audio enabled');
      document.removeEventListener('click', enableAudio);
      document.removeEventListener('keydown', enableAudio);
      document.removeEventListener('touchstart', enableAudio);
    };

    document.addEventListener('click', enableAudio);
    document.addEventListener('keydown', enableAudio);
    document.addEventListener('touchstart', enableAudio);
  }

  // Get MP3 file path from track title - simplified and more reliable
  getAudioSource(track) {
    if (!track?.title) {
      console.warn('No track title provided');
      return null;
    }

    // Clean the filename more thoroughly
    const cleanTitle = track.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
      .replace(/\s+/g, '_')     // Replace spaces with underscores
      .replace(/-/g, '_')       // Replace hyphens with underscores  
      .replace(/_+/g, '_');     // Remove duplicate underscores

    const fileName = cleanTitle + '.mp3';
    const fullPath = `/assets/${fileName}`;
    console.log(`Generated audio path for "${track.title}": ${fullPath}`);
    return fullPath;
  }

  // Test if audio file exists - simplified
  async testAudioFile(audioPath) {
    try {
      console.log(`Testing audio file: ${audioPath}`);
      const response = await fetch(audioPath, { method: 'HEAD' });
      if (response.ok) {
        console.log(`✓ Audio file exists: ${audioPath}`);
        return true;
      } else {
        console.log(`✗ Audio file not found (${response.status}): ${audioPath}`);
        return false;
      }
    } catch (error) {
      console.error(`Error testing audio file ${audioPath}:`, error);
      return false;
    }
  }

  // Play a specific track
  async playTrack(track) {
    console.log('PlayTrack called with:', track);
    
    if (!track) {
      console.error('No track provided');
      return;
    }

    if (!this.hasUserInteracted) {
      console.warn('User has not interacted with page yet - audio may be blocked');
    }

    const audioSource = this.getAudioSource(track);
    if (!audioSource) {
      console.error('Could not generate audio source');
      return;
    }

    // Test if file exists before trying to play
    const fileExists = await this.testAudioFile(audioSource);
    if (!fileExists) {
      const errorMsg = `Audio file not found: ${audioSource}\n\nPlease make sure the file exists in your /assets/ folder.\nExpected filename: ${audioSource.split('/').pop()}`;
      console.error(errorMsg);
      alert(errorMsg);
      return;
    }

    // If same track is already playing, just toggle
    if (this.currentTrack?.id === track.id && this.audio) {
      console.log('Same track - toggling play');
      this.togglePlay();
      return;
    }

    // Stop current audio if playing
    if (this.audio) {
      console.log('Stopping current audio');
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio.removeEventListener('error', this.handleAudioError);
      this.audio = null;
    }

    try {
      // Create new audio element
      console.log(`Creating audio element for: ${audioSource}`);
      this.audio = new Audio(audioSource);
      this.audio.volume = this.volume;
      this.audio.preload = 'auto';
      
      // Set up event listeners
      this.audio.addEventListener('loadstart', () => {
        console.log('Audio loading started');
      });

      this.audio.addEventListener('loadeddata', () => {
        console.log('Audio data loaded');
      });

      this.audio.addEventListener('loadedmetadata', () => {
        this.duration = this.audio.duration;
        console.log(`Audio metadata loaded - duration: ${this.duration}s`);
      });

      this.audio.addEventListener('canplay', () => {
        console.log('Audio can start playing');
      });

      this.audio.addEventListener('timeupdate', () => {
        this.currentTime = this.audio.currentTime;
      });

      this.audio.addEventListener('ended', () => {
        console.log('Audio ended');
        this.isPlaying = false;
        this.currentTime = 0;
      });

      // Improved error handler
      this.handleAudioError = (e) => {
        const error = this.audio.error;
        console.error(`Audio error for ${track.title}:`, {
          code: error?.code,
          message: error?.message,
          src: this.audio.src
        });
        
        let errorMessage = '';
        switch(error?.code) {
          case 1: // MEDIA_ERR_ABORTED
            errorMessage = 'Audio loading was aborted';
            break;
          case 2: // MEDIA_ERR_NETWORK
            errorMessage = 'Network error - check your connection';
            break;
          case 3: // MEDIA_ERR_DECODE
            errorMessage = 'Audio file is corrupted or format not supported';
            break;
          case 4: // MEDIA_ERR_SRC_NOT_SUPPORTED
            errorMessage = 'Audio format not supported or file not found';
            break;
          default:
            errorMessage = 'Unknown audio error';
        }
        
        console.error(errorMessage);
        alert(`Cannot play "${track.title}": ${errorMessage}`);
        this.isPlaying = false;
      };

      this.audio.addEventListener('error', this.handleAudioError);

      // Update state
      this.currentTrack = track;
      
      // Try to play
      console.log('Attempting to play audio...');
      await this.audio.play();
      this.isPlaying = true;
      console.log('✓ Audio started playing successfully');
      
    } catch (error) {
      console.error('Failed to play audio:', error);
      
      if (error.name === 'NotAllowedError') {
        console.error('Autoplay blocked by browser - user interaction required');
        alert('Please click anywhere on the page first to enable audio playback');
      } else if (error.name === 'NotSupportedError') {
        console.error('Audio format not supported');
        alert(`Audio format not supported for: ${track.title}`);
      } else {
        console.error('Unknown playback error:', error.message);
        alert(`Error playing "${track.title}": ${error.message}`);
      }
      
      this.isPlaying = false;
    }
  }

  // Toggle play/pause
  async togglePlay() {
    console.log('TogglePlay called, current state:', {
      hasAudio: !!this.audio,
      isPlaying: this.isPlaying,
      currentTrack: this.currentTrack?.title
    });

    if (!this.audio) {
      console.warn('No audio element to toggle');
      return;
    }

    try {
      if (this.isPlaying) {
        console.log('Pausing audio');
        this.audio.pause();
        this.isPlaying = false;
      } else {
        console.log('Resuming audio');
        await this.audio.play();
        this.isPlaying = true;
      }
    } catch (error) {
      console.error('Toggle play failed:', error);
      this.isPlaying = false;
      
      if (error.name === 'NotAllowedError') {
        alert('Audio playback blocked. Please interact with the page first.');
      }
    }
  }

  // Stop playback
  stop() {
    console.log('Stopping playback');
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
    this.isPlaying = false;
    this.currentTime = 0;
  }

  // Seek to specific time
  seekTo(time) {
    if (this.audio && !isNaN(time)) {
      console.log(`Seeking to: ${time}s`);
      this.audio.currentTime = time;
      this.currentTime = time;
    }
  }

  // Set volume (0-1)
  setVolume(volume) {
    const newVolume = Math.max(0, Math.min(1, volume));
    this.volume = newVolume;
    if (this.audio) {
      this.audio.volume = newVolume;
    }
    console.log(`Volume set to: ${(newVolume * 100).toFixed(0)}%`);
  }

  // Getters
  getCurrentTrack() {
    return this.currentTrack;
  }

  getIsPlaying() {
    return this.isPlaying;
  }

  getCurrentTime() {
    return this.currentTime;
  }

  getDuration() {
    return this.duration;
  }

  getVolume() {
    return this.volume;
  }

  // Debug method
  getDebugInfo() {
    return {
      currentTrack: this.currentTrack,
      isPlaying: this.isPlaying,
      hasAudio: !!this.audio,
      hasUserInteracted: this.hasUserInteracted,
      currentTime: this.currentTime,
      duration: this.duration,
      volume: this.volume,
      audioSrc: this.audio?.src,
      audioReadyState: this.audio?.readyState,
      audioNetworkState: this.audio?.networkState
    };
  }

  // Helper method to check what filename would be generated
  getExpectedFilename(trackTitle) {
    if (!trackTitle) return null;
    
    const cleanTitle = trackTitle
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '_')
      .replace(/-/g, '_')
      .replace(/_+/g, '_');
    
    return cleanTitle + '.mp3';
  }
}

// Create singleton instance
export const PlayerState = new PlayerStateManager();

// Expose debug info to console for testing
window.PlayerStateDebug = PlayerState;