 
  // content.js
  console.log('Fathom Player Enhancer loading...');
  
  function formatTime(seconds) {
      if (!seconds || isNaN(seconds)) return '0:00';
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
  
  function enhanceVideoPlayer(videoPlayer) {
      console.log('Enhancing video player:', videoPlayer);
  
      // Get video element and remove default controls
      const video = videoPlayer.querySelector('video');
      if (!video) return;
  
     // Remove Fathom's default controls
      const defaultControls = videoPlayer.querySelectorAll('section.absolute, .text-white.cursor-pointer.absolute.inset-0');
      defaultControls.forEach(control => control.remove());

       // Create loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'video-loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-spinner">
            <svg class="spinner-svg" viewBox="0 0 50 50">
                <circle class="spinner-path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
            </svg>
        </div>
    `;
    videoPlayer.appendChild(loadingOverlay);
  
      // Create central overlay controls
      const centerControls = document.createElement('div');
      centerControls.className = 'center-overlay-controls';
      centerControls.innerHTML = `
          <div class="control-group">
              <button class="control-button rewind-10">⏪</button>
              <button class="control-button play-pause-large">▶️</button>
              <button class="control-button forward-10">⏩</button>
          </div>
      `;
      videoPlayer.appendChild(centerControls);
  
      // Create bottom controls
      const bottomControls = document.createElement('div');
      bottomControls.className = 'bottom-controls';
      bottomControls.innerHTML = `
          <div class="progress-container">
              <div class="progress-bar">
                  <div class="progress-fill"></div>
                  <div class="progress-handle"></div>
              </div>
          </div>
          <div class="controls-row">
              <div class="left-controls">
                  <button class="control-button play-pause">
                      <svg viewBox="0 0 24 24" width="24" height="24">
                          <path fill="currentColor" d="M8 5v14l11-7z"/>
                      </svg>
                  </button>
                  <div class="volume-container">
                      <button class="control-button volume">
                          <svg viewBox="0 0 24 24" width="24" height="24">
                              <path fill="currentColor" d="M3 9v6h4l5 5V4L7 9H3zm7-4v14l11-7z"/>
                          </svg>
                      </button>
                      <div class="volume-slider">
                          <div class="volume-track">
                              <div class="volume-fill"></div>
                          </div>
                      </div>
                  </div>
                  <span class="time-display">
                      <span class="current-time">0:00</span>
                      <span class="separator"> / </span>
                      <span class="total-time">0:00</span>
                  </span>
              </div>
              <div class="right-controls">
                  <button class="control-button speed">1x</button>
                  <button class="control-button fullscreen">
                      <svg viewBox="0 0 24 24" width="24" height="24">
                          <path fill="currentColor" d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                      </svg>
                  </button>
              </div>
          </div>
      `;
      videoPlayer.appendChild(bottomControls);
  
      // Add styles
      const style = document.createElement('style');
      style.textContent = `
          video-player {
              position: relative !important;
          }
  
          .center-overlay-controls {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              opacity: 0;
              transition: opacity 0.3s;
              z-index: 2001;
              pointer-events: none;
          }
  
          .control-group {
              display: flex;
              gap: 20px;
              align-items: center;
              pointer-events: auto;
          }
  
          .control-button {
              background: rgba(0, 0, 0, 0.7);
              border: none;
              color: white;
              width: 48px;
              height: 48px;
              border-radius: 50%;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 24px;
              transition: transform 0.2s, background-color 0.2s;
              pointer-events: auto;
          }
  
          .play-pause-large {
              width: 60px;
              height: 60px;
              font-size: 32px;
          }
  
          .bottom-controls {
              position: absolute;
              left: 0;
              right: 0;
              bottom: 0;
              background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
              opacity: 0;
              transition: opacity 0.3s;
              z-index: 2000;
              pointer-events: auto;
          }
  
          .progress-container {
              padding: 10px 20px;
              cursor: pointer;
          }
  
          .progress-bar {
              height: 3px;
              background: rgba(255, 255, 255, 0.2);
              position: relative;
              cursor: pointer;
              transition: height 0.1s;
          }
  
          .progress-bar:hover {
              height: 5px;
          }
  
          .progress-fill {
              position: absolute;
              left: 0;
              top: 0;
              bottom: 0;
              background: red;
              transition: width 0.1s;
          }
  
          .progress-handle {
              position: absolute;
              width: 12px;
              height: 12px;
              background: red;
              border-radius: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              opacity: 0;
              transition: opacity 0.1s;
          }
  
          .progress-bar:hover .progress-handle {
              opacity: 1;
          }
  
          .controls-row {
              padding: 0 20px 10px;
              display: flex;
              justify-content: space-between;
              align-items: center;
          }
  
          .left-controls, .right-controls {
              display: flex;
              align-items: center;
              gap: 15px;
          }
  
          .volume-container {
              display: flex;
              align-items: center;
          }
  
          .volume-slider {
              width: 0;
              overflow: hidden;
              transition: width 0.2s;
          }
  
          .volume-container:hover .volume-slider {
              width: 100px;
          }
  
          .volume-track {
              height: 3px;
              background: rgba(255, 255, 255, 0.2);
              position: relative;
              cursor: pointer;
              width: 100px;
              margin: 0 10px;
          }
  
          .volume-fill {
              position: absolute;
              left: 0;
              top: 0;
              bottom: 0;
              background: white;
          }
  
          .time-display {
              color: white;
              font-size: 14px;
              min-width: 100px;
          }
  
          .speed-indicator {
              position: absolute;
              top: 10%;
              left: 50%;
              transform: translate(-50%, -50%);
              background: rgba(0, 0, 0, 0.7);
              color: white;
              padding: 15px 25px;
              border-radius: 8px;
              font-size: 24px;
              font-weight: bold;
              z-index: 2003;
              pointer-events: none;
          }
  
          video-player:hover .center-overlay-controls,
          video-player:hover .bottom-controls {
              opacity: 1;
          }
  
          .control-button:hover {
              transform: scale(1.1);
              background: rgba(0, 0, 0, 0.8);
          }
     .video-loading-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.6);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s, visibility 0.3s;
            z-index: 2500;
        }

        .video-loading-overlay.visible {
            opacity: 1;
            visibility: visible;
        }

        .loading-spinner {
            width: 50px;
            height: 50px;
            animation: spinner-scale 0.3s ease-in-out;
        }

        .spinner-svg {
            animation: spinner-rotate 1s linear infinite;
            transform-origin: center center;
        }

        .spinner-path {
            stroke: #ffffff;
            stroke-dasharray: 150;
            stroke-dashoffset: 0;
            transform-origin: center;
            stroke-linecap: round;
            animation: spinner-dash 1.5s ease-in-out infinite;
        }

        @keyframes spinner-rotate {
            100% { transform: rotate(360deg); }
        }

        @keyframes spinner-dash {
            0% {
                stroke-dasharray: 1, 150;
                stroke-dashoffset: 0;
            }
            50% {
                stroke-dasharray: 90, 150;
                stroke-dashoffset: -35;
            }
            100% {
                stroke-dasharray: 90, 150;
                stroke-dashoffset: -124;
            }
        }

        @keyframes spinner-scale {
            0% { transform: scale(0.8); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
  
      // Get control elements
      const playPauseBtn = bottomControls.querySelector('.play-pause');
      const playPauseLarge = centerControls.querySelector('.play-pause-large');
      const rewindBtn = centerControls.querySelector('.rewind-10');
      const forwardBtn = centerControls.querySelector('.forward-10');
      const volumeBtn = bottomControls.querySelector('.volume');
      const volumeTrack = bottomControls.querySelector('.volume-track');
      const volumeFill = bottomControls.querySelector('.volume-fill');
      const progressBar = bottomControls.querySelector('.progress-bar');
      const progressFill = bottomControls.querySelector('.progress-fill');
      const currentTimeDisplay = bottomControls.querySelector('.current-time');
      const totalTimeDisplay = bottomControls.querySelector('.total-time');
      const speedBtn = bottomControls.querySelector('.speed');
      const fullscreenBtn = bottomControls.querySelector('.fullscreen');
  
      // Initialize variables
      let wasPaused = false;
      let lastVolume = 1;
      let originalSpeed = 1;
      let longPressTimeout;
      let isHolding = false;

       // Loading state management
    let isLoading = false;
    let loadingTimeout;

    function showLoading() {
        clearTimeout(loadingTimeout);
        if (!isLoading) {
            isLoading = true;
            loadingOverlay.classList.add('visible');
        }
    }

    function hideLoading() {
        // Add a small delay before hiding to prevent flickering
        clearTimeout(loadingTimeout);
        loadingTimeout = setTimeout(() => {
            isLoading = false;
            loadingOverlay.classList.remove('visible');
        }, 200);
    }

    // Add loading state event listeners
    video.addEventListener('waiting', showLoading);
    video.addEventListener('seeking', showLoading);
    video.addEventListener('playing', hideLoading);
    video.addEventListener('canplay', hideLoading);
    video.addEventListener('seeked', hideLoading);
    video.addEventListener('error', showLoading);

    if (progressBar) {
        const originalClickHandler = progressBar.onclick;
        progressBar.onclick = (e) => {
            showLoading();
            if (originalClickHandler) originalClickHandler(e);
        };
    }

    if (progressBar) {
        progressBar.addEventListener('mousedown', (e) => {
            isDragging = true;
            showLoading();
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                // Keep loading visible until video is ready
            }
        });
    }

  
      // Play/Pause functionality
      function updatePlayButton() {
          const isPlaying = !video.paused;
          playPauseBtn.innerHTML = isPlaying ? 
              '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>' :
              '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>';
          playPauseLarge.textContent = isPlaying ? '⏸️' : '▶️';
      }
  
      function togglePlay(e) {
          if (e) {
              e.preventDefault();
              e.stopPropagation();
          }
          if (video.paused) video.play();
          else video.pause();
      }
  
      // Skip functionality
      rewindBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          video.currentTime = Math.max(0, video.currentTime - 10);
      });
  
      forwardBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          video.currentTime = Math.min(video.duration, video.currentTime + 10);
      });
  
      // Volume control
      function updateVolume() {
          const volume = video.muted ? 0 : video.volume;
          volumeFill.style.width = `${volume * 100}%`;
          
          if (volume === 0) {
              volumeBtn.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>';
          } else {
              volumeBtn.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>';
          }
      }
  
      // Press and hold for 2x speed
      function handleSpeedUp(e) {
          if (e.target.closest('.bottom-controls') || e.target.closest('.control-group')) {
              return;
          }
          originalSpeed = video.playbackRate;
          video.playbackRate = 2;
          isHolding = true;
  
          const speedIndicator = document.createElement('div');
          speedIndicator.className = 'speed-indicator';
          speedIndicator.textContent = '2x';
          videoPlayer.appendChild(speedIndicator);
      }
  
      function handleSpeedNormal() {
          if (isHolding) {
              video.playbackRate = originalSpeed;
              isHolding = false;
              const indicator = videoPlayer.querySelector('.speed-indicator');
              if (indicator) indicator.remove();
          }
      }
  
      // Event Listeners
      playPauseBtn.addEventListener('click', togglePlay);
      playPauseLarge.addEventListener('click', togglePlay);
  
      volumeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (video.muted) {
              video.muted = false;
              video.volume = lastVolume;
          } else {
              lastVolume = video.volume;
              video.muted = true;
          }
      });
  
      volumeTrack.addEventListener('click', (e) => {
          e.stopPropagation();
          const rect = volumeTrack.getBoundingClientRect();
          const newVolume = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
          video.volume = newVolume;
          video.muted = false;
      });
  
     // 1. First, modify the progress bar click handler
progressBar.addEventListener('click', (e) => {
    e.stopPropagation();
    const rect = progressBar.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    
    // Store if video was playing
    const wasPlaying = !video.paused;
    
    showLoading();
    video.currentTime = pos * video.duration;

    // Resume playback after seeking if it was playing before
    video.addEventListener('seeked', () => {
        if (wasPlaying) {
            video.play();
        }
        hideLoading();
    }, { once: true });
});
  
      // Progress bar drag functionality
      let isDragging = false;
      let wasPlaying = false;

      progressBar.addEventListener('mousedown', (e) => {
        isDragging = true;
        wasPlaying = !video.paused;  // Store the playing state
        updateProgressFromMouse(e);
        showLoading();
    });
     document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        updateProgressFromMouse(e);
        showLoading();
    }
});
  
document.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        
        // Add event listener for when seeking completes
        video.addEventListener('seeked', () => {
            if (wasPlaying) {
                video.play();
            }
            hideLoading();
        }, { once: true });
    }
});
  
function updateProgressFromMouse(e) {
    const rect = progressBar.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    video.currentTime = pos * video.duration;
    progressFill.style.width = `${pos * 100}%`;
    currentTimeDisplay.textContent = formatTime(video.currentTime);
}
  
      function updateProgress() {
          if (!isDragging) {
              const progress = (video.currentTime / video.duration) * 100;
              progressFill.style.width = `${progress}%`;
              currentTimeDisplay.textContent = formatTime(video.currentTime);
              totalTimeDisplay.textContent = formatTime(video.duration);
          }
      }
  
      // Playback speed control
      const speeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
      let currentSpeedIndex = 3; // Start at 1x speed
  
      speedBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          currentSpeedIndex = (currentSpeedIndex + 1) % speeds.length;
          const newSpeed = speeds[currentSpeedIndex];
          video.playbackRate = newSpeed;
          speedBtn.textContent = `${newSpeed}x`;
      });
  
      // Fullscreen control
      fullscreenBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (document.fullscreenElement) {
              document.exitFullscreen();
          } else {
              videoPlayer.requestFullscreen();
          }
      });
  
      // Press and hold functionality
      videoPlayer.addEventListener('mousedown', (e) => {
          if (e.button === 0) {
              longPressTimeout = setTimeout(() => handleSpeedUp(e), 200);
          }
      });
  
      videoPlayer.addEventListener('mouseup', () => {
          clearTimeout(longPressTimeout);
          handleSpeedNormal();
      });
  
      videoPlayer.addEventListener('mouseleave', () => {
          clearTimeout(longPressTimeout);
          handleSpeedNormal();
      });
  
      // Keyboard shortcuts
      document.addEventListener('keydown', (e) => {
          // Only handle if video player is visible and no input is focused
          if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
              return;
          }
  
          switch(e.key.toLowerCase()) {
              case ' ':  // Space bar
              case 'k':  // YouTube-style play/pause
                  e.preventDefault();
                  togglePlay();
                  break;
              case 'arrowleft':  // Rewind 10 seconds
                  e.preventDefault();
                  showLoading();
                  video.currentTime = Math.max(0, video.currentTime - 10);
                  break;
              case 'arrowright':  // Forward 10 seconds
                  e.preventDefault();
                  showLoading();
                  video.currentTime = Math.min(video.duration, video.currentTime + 10);
                  break;
              case 'm':  // Mute
                  e.preventDefault();
                  volumeBtn.click();
                  break;
              case 'f':  // Fullscreen
                  e.preventDefault();
                  fullscreenBtn.click();
                  break;
          }
      });
  
      // Double click for fullscreen
      videoPlayer.addEventListener('dblclick', (e) => {
          if (e.target.closest('.bottom-controls') || e.target.closest('.control-group')) {
              return;
          }
          fullscreenBtn.click();
      });
      
       // Initial loading state check
    if (video.readyState < 4) {
        showLoading();
    }
  
      // Add video event listeners
      video.addEventListener('play', updatePlayButton);
      video.addEventListener('pause', updatePlayButton);
      video.addEventListener('timeupdate', updateProgress);
      video.addEventListener('loadedmetadata', updateProgress);
      video.addEventListener('volumechange', updateVolume);
  
      // Set up auto-hide for controls
      let hideControlsTimeout;
      
      function showControls() {
          centerControls.style.opacity = '1';
          bottomControls.style.opacity = '1';
          
          clearTimeout(hideControlsTimeout);
          if (!video.paused) {
              hideControlsTimeout = setTimeout(() => {
                  if (!video.paused) {
                      centerControls.style.opacity = '0';
                      bottomControls.style.opacity = '0';
                  }
              }, 2000);
          }
      }
  
      videoPlayer.addEventListener('mousemove', showControls);
      videoPlayer.addEventListener('mouseleave', () => {
          if (!video.paused) {
              centerControls.style.opacity = '0';
              bottomControls.style.opacity = '0';
          }
      });
  
      // Initial setup
      updatePlayButton();
      updateVolume();
      updateProgress();
  }
  
  // Initialize enhancement for existing video players
  function initializeEnhancement() {
      console.log('Initializing enhancement...');
      const videoPlayers = document.querySelectorAll('video-player');
      videoPlayers.forEach(player => enhanceVideoPlayer(player));
  }
  
  // Watch for new video players being added
  const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
          mutation.addedNodes.forEach(node => {
              if (node.nodeName === 'VIDEO-PLAYER') {
                  enhanceVideoPlayer(node);
              }
          });
      });
  });
  
  // Start observing the document
  observer.observe(document.body, {
      childList: true,
      subtree: true
  });
  
  // Initial enhancement with a slight delay to ensure DOM is ready
  setTimeout(initializeEnhancement, 1000);
  
  console.log('Fathom Player Enhancer loaded!');