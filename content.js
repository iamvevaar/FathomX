  // content.js
  console.log('Fathom Player Enhancer loading...');
  
  // Utility function to format time in MM:SS format
  function formatTime(seconds) {
      if (!seconds || isNaN(seconds)) return '0:00';
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
  
  // Main function to enhance a video player with custom controls
  function enhanceVideoPlayer(videoPlayer) {
      console.log('Enhancing video player:', videoPlayer);
  
      // Get the video element
      const video = videoPlayer.querySelector('video');
      if (!video) {
          console.log('Video element not found');
          return;
      }
  
      // Remove Fathom's default play button overlay and controls
      const playButtonOverlay = videoPlayer.querySelector('.text-white.cursor-pointer.absolute.inset-0');
      if (playButtonOverlay) {
          playButtonOverlay.remove();
      }
  
      const existingControls = videoPlayer.querySelector('section.absolute');
      if (existingControls) {
          existingControls.remove();
      }
  
      // Create central play/pause overlay for hover
      const centerControls = document.createElement('div');
      centerControls.className = 'center-controls';
      centerControls.innerHTML = `
          <div class="center-controls-inner">
              <button class="rewind-10 control-button">⏪</button>
              <button class="play-pause-large control-button">▶️</button>
              <button class="forward-10 control-button">⏩</button>
          </div>
      `;
      videoPlayer.appendChild(centerControls);
  
      // Create bottom controls bar
      const bottomControls = document.createElement('div');
      bottomControls.className = 'bottom-controls';
      bottomControls.innerHTML = `
          <div class="progress-bar-container">
              <div class="progress-bar">
                  <div class="progress-bar-filled"></div>
                  <div class="progress-bar-loaded"></div>
                  <div class="progress-handle"></div>
              </div>
              <div class="progress-hover-time"></div>
          </div>
          <div class="controls-main">
              <div class="controls-left">
                  <button class="control-button play-pause">
                      <svg viewBox="0 0 24 24" width="24" height="24">
                          <path fill="currentColor" d="M8 5v14l11-7z"/>
                      </svg>
                  </button>
                  <div class="volume-container">
                      <button class="control-button volume">
                          <svg viewBox="0 0 24 24" width="24" height="24">
                              <path fill="currentColor" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
                          </svg>
                      </button>
                      <div class="volume-slider">
                          <div class="volume-slider-bar">
                              <div class="volume-slider-fill"></div>
                              <div class="volume-slider-handle"></div>
                          </div>
                      </div>
                  </div>
                  <div class="time-display">
                      <span class="current-time">0:00</span>
                      <span class="time-separator">/</span>
                      <span class="total-time">0:00</span>
                  </div>
              </div>
              <div class="controls-right">
                  <button class="control-button speed" title="Playback speed">
                      <span class="speed-text">1x</span>
                  </button>
                  <button class="control-button fullscreen" title="Full screen">
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
              position: relative;
          }
  
          .center-controls {
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
              z-index: 2000;
              pointer-events: none;
          }
  
          .center-controls-inner {
              display: flex;
              gap: 20px;
              align-items: center;
              pointer-events: auto;
          }
  
          .center-controls .control-button {
              background: rgba(0, 0, 0, 0.6);
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
  
          .controls-main {
              padding: 0 20px 10px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              pointer-events: auto;
          }
  
          .control-button {
              background: none;
              border: none;
              color: white;
              cursor: pointer !important;
              padding: 8px;
              display: flex;
              align-items: center;
              opacity: 0.9;
              transition: opacity 0.2s;
              pointer-events: auto !important;
              z-index: 2001;
          }
  
          .progress-bar-container {
              padding: 10px 20px;
              position: relative;
              pointer-events: auto;
              z-index: 2001;
          }
  
          .progress-bar {
              height: 3px;
              background: rgba(255, 255, 255, 0.2);
              position: relative;
              cursor: pointer !important;
              transition: height 0.1s;
              pointer-events: auto !important;
          }
  
          .volume-container {
              position: relative;
              display: flex;
              align-items: center;
              pointer-events: auto;
              z-index: 2002;
          }
  
          .volume-slider {
              width: 0;
              overflow: hidden;
              transition: width 0.2s;
              height: 100%;
              display: flex;
              align-items: center;
              pointer-events: auto;
          }
  
          /* Make sure all interactive elements are clickable */
          .control-button,
          .progress-bar,
          .volume-slider,
          .speed-button,
          .fullscreen-button {
              position: relative;
              z-index: 2002;
              cursor: pointer !important;
              pointer-events: auto !important;
          }
  
          /* Ensure hover states work */
          .control-button:hover {
              opacity: 1;
              transform: scale(1.1);
          }
  
          /* Make controls visible on player hover */
          video-player:hover .center-controls,
          video-player:hover .bottom-controls {
              opacity: 1;
          }
      
          .center-controls {
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
          }
  
          .center-controls-inner {
              display: flex;
              gap: 20px;
              align-items: center;
          }
  
          .center-controls .control-button {
              background: rgba(0, 0, 0, 0.6);
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
          }
  
          .center-controls .play-pause-large {
              width: 60px;
              height: 60px;
              font-size: 32px;
          }
  
          .center-controls .control-button:hover {
              background: rgba(0, 0, 0, 0.8);
              transform: scale(1.1);
          }
  
          .bottom-controls {
              position: absolute;
              left: 0;
              right: 0;
              bottom: 0;
              background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
              opacity: 0;
              transition: opacity 0.3s;
          }
  
          .progress-bar-container {
              padding: 10px 20px;
              position: relative;
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
  
          .progress-bar-filled {
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
  
          .controls-main {
              padding: 0 20px 10px;
              display: flex;
              justify-content: space-between;
              align-items: center;
          }
  
          .controls-left {
              display: flex;
              align-items: center;
              gap: 10px;
          }
  
          .controls-right {
              display: flex;
              align-items: center;
              gap: 10px;
          }
  
          .control-button {
              background: none;
              border: none;
              color: white;
              cursor: pointer;
              padding: 8px;
              display: flex;
              align-items: center;
              opacity: 0.9;
              transition: opacity 0.2s;
          }
  
          .control-button:hover {
              opacity: 1;
          }
  
          .volume-container {
              display: flex;
              align-items: center;
          }
  
          .volume-slider {
              width: 0;
              overflow: hidden;
              transition: width 0.2s;
              height: 100%;
              display: flex;
              align-items: center;
          }
  
          .volume-container:hover .volume-slider {
              width: 100px;
          }
  
          .volume-slider-bar {
              height: 3px;
              background: rgba(255, 255, 255, 0.2);
              width: 100%;
              position: relative;
              cursor: pointer;
          }
  
          .volume-slider-fill {
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
              text-align: center;
          }
  
          .speed-text {
              font-size: 14px;
              color: white;
          }
  
          /* Show controls on hover */
          video-player:hover .center-controls,
          video-player:hover .bottom-controls {
              opacity: 1;
          }
      `;
      document.head.appendChild(style);
  
      // Event handlers
      const playPauseBtn = bottomControls.querySelector('.play-pause');
      const playPauseLarge = centerControls.querySelector('.play-pause-large');
      const volumeBtn = bottomControls.querySelector('.volume');
      const volumeSlider = bottomControls.querySelector('.volume-slider-bar');
      const volumeFill = bottomControls.querySelector('.volume-slider-fill');
      const progressBar = bottomControls.querySelector('.progress-bar');
      const progressFill = bottomControls.querySelector('.progress-bar-filled');
      const progressHandle = bottomControls.querySelector('.progress-handle');
      const currentTimeDisplay = bottomControls.querySelector('.current-time');
      const totalTimeDisplay = bottomControls.querySelector('.total-time');
      const speedBtn = bottomControls.querySelector('.speed');
      const fullscreenBtn = bottomControls.querySelector('.fullscreen');
      const rewind10 = centerControls.querySelector('.rewind-10');
      const forward10 = centerControls.querySelector('.forward-10');
  
      // Play/Pause
      function updatePlayState() {
          const isPlaying = !video.paused;
          playPauseBtn.innerHTML = isPlaying ? 
              '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>' :
              '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>';
          playPauseLarge.textContent = isPlaying ? '⏸️' : '▶️';
      }
  
      function togglePlay() {
          if (video.paused) video.play();
          else video.pause();
      }
  
      playPauseBtn.addEventListener('click', togglePlay);
      playPauseLarge.addEventListener('click', togglePlay);
      video.addEventListener('play', updatePlayState);
      video.addEventListener('pause', updatePlayState);
  
      // Volume control
      let lastVolume = 1;
      
      function updateVolumeDisplay() {
          const volume = video.muted ? 0 : video.volume;
          volumeFill.style.width = `${volume * 100}%`;
          
          if (volume === 0) {
              volumeBtn.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>';
          } else if (volume < 0.5) {
              volumeBtn.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>';
          } else {
              volumeBtn.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>';
          }
      }
  
      volumeBtn.addEventListener('click', () => {
          if (video.muted) {
              video.muted = false;
              video.volume = lastVolume;
          } else if (video.volume === 0) {
              video.volume = lastVolume;
          } else {
              lastVolume = video.volume;
              video.volume = 0;
          }
      });
  
      volumeSlider.addEventListener('click', (e) => {
          const rect = volumeSlider.getBoundingClientRect();
          const newVolume = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
          video.volume = newVolume;
          video.muted = false;
      });
  
      video.addEventListener('volumechange', updateVolumeDisplay);
  
      // Progress bar functionality
      function updateProgress() {
          const progress = (video.currentTime / video.duration) * 100;
          progressFill.style.width = `${progress}%`;
          progressHandle.style.left = `${progress}%`;
          
          // Update time display
          currentTimeDisplay.textContent = formatTime(video.currentTime);
          totalTimeDisplay.textContent = formatTime(video.duration);
      }
  
      progressBar.addEventListener('click', (e) => {
          const rect = progressBar.getBoundingClientRect();
          const pos = (e.clientX - rect.left) / rect.width;
          video.currentTime = pos * video.duration;
      });
  
      // Add drag functionality to progress bar
      let isDragging = false;
      progressBar.addEventListener('mousedown', () => {
          isDragging = true;
          video.pause();
      });
  
      document.addEventListener('mousemove', (e) => {
          if (isDragging) {
              const rect = progressBar.getBoundingClientRect();
              const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
              video.currentTime = pos * video.duration;
          }
      });
  
      document.addEventListener('mouseup', () => {
          if (isDragging) {
              isDragging = false;
              video.play();
          }
      });
  
      video.addEventListener('timeupdate', updateProgress);
      video.addEventListener('loadedmetadata', updateProgress);
  
      // Playback speed control
      const speeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
      let currentSpeedIndex = 3; // Start at 1x speed (index 3)
  
      speedBtn.addEventListener('click', () => {
          currentSpeedIndex = (currentSpeedIndex + 1) % speeds.length;
          const newSpeed = speeds[currentSpeedIndex];
          video.playbackRate = newSpeed;
          speedBtn.querySelector('.speed-text').textContent = `${newSpeed}x`;
      });
  
      // Forward/Rewind 10 seconds
      rewind10.addEventListener('click', (e) => {
          e.stopPropagation();
          video.currentTime = Math.max(0, video.currentTime - 10);
      });
  
      forward10.addEventListener('click', (e) => {
          e.stopPropagation();
          video.currentTime = Math.min(video.duration, video.currentTime + 10);
      });
  
      // Fullscreen control
      fullscreenBtn.addEventListener('click', () => {
          if (document.fullscreenElement) {
              document.exitFullscreen();
          } else {
              videoPlayer.requestFullscreen();
          }
      });
  
      // Keyboard controls
      document.addEventListener('keydown', (e) => {
          // Only handle if video player is in view and no input is focused
          if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
          
          switch(e.key.toLowerCase()) {
              case ' ':  // Space bar
                  e.preventDefault();
                  togglePlay();
                  break;
              case 'k':  // Alternative play/pause
                  e.preventDefault();
                  togglePlay();
                  break;
              case 'arrowleft':  // Rewind 10 seconds
                  e.preventDefault();
                  video.currentTime = Math.max(0, video.currentTime - 10);
                  break;
              case 'arrowright':  // Forward 10 seconds
                  e.preventDefault();
                  video.currentTime = Math.min(video.duration, video.currentTime + 10);
                  break;
              case 'f':  // Fullscreen
                  e.preventDefault();
                  fullscreenBtn.click();
                  break;
              case 'm':  // Mute
                  e.preventDefault();
                  volumeBtn.click();
                  break;
          }
      });
  
      // Initial setup
      updatePlayState();
      updateVolumeDisplay();
      updateProgress();
  
      // Auto-hide controls when mouse is idle
      let hideControlsTimeout;
      
      function showControls() {
          centerControls.style.opacity = '1';
          bottomControls.style.opacity = '1';
          
          clearTimeout(hideControlsTimeout);
          if (!video.paused) {
              hideControlsTimeout = setTimeout(() => {
                  centerControls.style.opacity = '0';
                  bottomControls.style.opacity = '0';
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
  
  // Initial enhancement
  setTimeout(initializeEnhancement, 1000);
  
  console.log('Fathom Player Enhancer loaded!')