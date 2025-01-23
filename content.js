// content.js
console.log("Fathom Player Enhancer loading...");

function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function enhanceVideoPlayer(videoPlayer) {
  console.log("Enhancing video player:", videoPlayer);

  // Get video element and remove default controls
  const video = videoPlayer.querySelector("video");
  if (!video) return;

  // Remove Fathom's default controls
  const defaultControls = videoPlayer.querySelectorAll(
    "section.absolute, .text-white.cursor-pointer.absolute.inset-0"
  );
  defaultControls.forEach((control) => control.remove());

  // Create loading overlay
  const loadingOverlay = document.createElement("div");
  loadingOverlay.className = "video-loading-overlay";
  loadingOverlay.innerHTML = `
        <div class="loading-spinner">
            <svg class="spinner-svg" viewBox="0 0 50 50">
                <circle class="spinner-path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
            </svg>
        </div>
    `;
  videoPlayer.appendChild(loadingOverlay);

  // Create central overlay controls
  const centerControls = document.createElement("div");
  centerControls.className = "center-overlay-controls";
  centerControls.innerHTML = `
          <div class="control-group">
              <button class="control-button rewind-10">
              
<svg width="24" height="24" viewBox="0 0 216 200" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M88.8 43.8431C92 45.6906 92 50.3094 88.8 52.1569L31.2 85.4123C28 87.2598 24 84.9504 24 81.2554L24 14.7446C24 11.0496 28 8.74018 31.2 10.5877L88.8 43.8431Z" fill="white"/>
<path d="M40.3444 154.25C37.2456 156.472 36.517 160.803 38.9475 163.741C50.7433 178.001 66.2987 188.745 83.9117 194.712C103.71 201.42 125.113 201.754 145.111 195.669C165.109 189.584 182.698 177.384 195.404 160.786C208.111 144.187 215.297 124.024 215.951 103.131C216.605 82.2374 210.696 61.6641 199.053 44.3029C187.41 26.9417 170.62 13.6655 151.042 6.34055C131.463 -0.984429 110.082 -1.98989 89.9023 3.46549C71.9505 8.31869 55.7531 18.0681 43.0879 31.5614C40.4783 34.3416 40.9344 38.7098 43.888 41.1214V41.1214C46.8417 43.533 51.1719 43.0715 53.8121 40.3203C64.6292 29.0484 78.3413 20.8951 93.506 16.7954C110.899 12.0933 129.328 12.9599 146.203 19.2734C163.078 25.587 177.55 37.0299 187.585 51.9938C197.62 66.9577 202.713 84.6902 202.149 102.699C201.585 120.707 195.392 138.086 184.44 152.392C173.488 166.699 158.328 177.214 141.091 182.459C123.854 187.704 105.407 187.415 88.3426 181.634C73.4642 176.593 60.2893 167.597 50.1988 155.671C47.736 152.759 43.4431 152.028 40.3444 154.25V154.25Z" fill="white"/>
<path d="M93.2175 65.6121V143H83.8464V75.4367H83.3929L64.4994 87.982V78.4597L83.8464 65.6121H93.2175ZM140.716 144.058C135.023 144.058 130.173 142.509 126.168 139.41C122.162 136.286 119.102 131.765 116.986 125.845C114.87 119.9 113.811 112.72 113.811 104.306C113.811 95.9425 114.87 88.8007 116.986 82.8808C119.127 76.9356 122.2 72.4012 126.206 69.2774C130.236 66.1285 135.073 64.554 140.716 64.554C146.359 64.554 151.183 66.1285 155.188 69.2774C159.219 72.4012 162.292 76.9356 164.408 82.8808C166.55 88.8007 167.62 95.9425 167.62 104.306C167.62 112.72 166.562 119.9 164.446 125.845C162.33 131.765 159.269 136.286 155.264 139.41C151.258 142.509 146.409 144.058 140.716 144.058ZM140.716 135.745C146.359 135.745 150.742 133.024 153.866 127.583C156.99 122.142 158.551 114.383 158.551 104.306C158.551 97.6051 157.833 91.8993 156.398 87.1885C154.987 82.4777 152.946 78.8879 150.276 76.4192C147.631 73.9504 144.444 72.7161 140.716 72.7161C135.123 72.7161 130.753 75.4745 127.604 80.9914C124.455 86.4831 122.88 94.2547 122.88 104.306C122.88 111.007 123.586 116.7 124.996 121.386C126.407 126.071 128.435 129.636 131.08 132.08C133.75 134.523 136.962 135.745 140.716 135.745Z" fill="white"/>
</svg>

              </button>

              <button class="control-button play-pause-large">
              
<svg width="24" height="24" viewBox="0 0 138 156" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M131.1 67.0881C139.5 71.9378 139.5 84.0622 131.1 88.9119L18.9 153.691C10.5 158.54 0 152.478 0 142.779L0 13.2213C0 3.52181 10.5 -2.54036 18.9 2.30938L131.1 67.0881Z" fill="white"/>
</svg>

              </button>
              <button class="control-button forward-10">
              
<svg width="24" height="24" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M115.979 44.9641C113.733 46.3647 113.733 49.6353 115.979 51.0359L172.306 86.158C174.689 87.6439 177.777 85.9304 177.777 83.122V12.878C177.777 10.0696 174.689 8.35608 172.306 9.84204L115.979 44.9641Z" fill="white"/>
<path d="M163.022 154.543C165.737 156.645 166.387 160.504 164.316 163.243C153.349 177.751 138.801 188.675 122.304 194.712C103.972 201.42 84.1549 201.754 65.6379 195.669C47.1209 189.584 30.8351 177.384 19.0698 160.786C7.30451 144.187 0.651251 124.024 0.045256 103.131C-0.560739 82.2374 4.911 61.6641 15.6913 44.3029C26.4717 26.9417 42.0185 13.6655 60.1466 6.34055C78.2747 -0.984429 98.0724 -1.98989 116.757 3.46549C133.559 8.37131 148.702 18.28 160.484 32.0016C162.727 34.6142 162.318 38.5151 159.736 40.7927V40.7927C156.862 43.3266 152.456 42.8618 149.897 40.0106C139.925 28.899 127.333 20.8574 113.42 16.7954C97.3157 12.0933 80.2517 12.9599 64.6269 19.2734C49.002 25.587 35.6019 37.0299 26.3102 51.9938C17.0184 66.9577 12.3022 84.6902 12.8246 102.699C13.3469 120.707 19.0814 138.086 29.2221 152.392C39.3628 166.699 53.3998 177.214 69.3599 182.459C85.32 187.704 102.401 187.415 118.201 181.634C131.876 176.63 143.997 167.729 153.313 155.933C155.673 152.945 160.012 152.212 163.022 154.543V154.543Z" fill="white"/>
<path d="M60.2175 65.6121V143H50.8464V75.4367H50.3929L31.4994 87.982V78.4597L50.8464 65.6121H60.2175ZM107.716 144.058C102.023 144.058 97.1733 142.509 93.1679 139.41C89.1624 136.286 86.1017 131.765 83.9856 125.845C81.8695 119.9 80.8115 112.72 80.8115 104.306C80.8115 95.9425 81.8695 88.8007 83.9856 82.8808C86.1269 76.9356 89.2002 72.4012 93.2057 69.2774C97.2363 66.1285 102.073 64.554 107.716 64.554C113.359 64.554 118.183 66.1285 122.188 69.2774C126.219 72.4012 129.292 76.9356 131.408 82.8808C133.55 88.8007 134.62 95.9425 134.62 104.306C134.62 112.72 133.562 119.9 131.446 125.845C129.33 131.765 126.269 136.286 122.264 139.41C118.258 142.509 113.409 144.058 107.716 144.058ZM107.716 135.745C113.359 135.745 117.742 133.024 120.866 127.583C123.99 122.142 125.551 114.383 125.551 104.306C125.551 97.6051 124.833 91.8993 123.398 87.1885C121.987 82.4777 119.946 78.8879 117.276 76.4192C114.631 73.9504 111.444 72.7161 107.716 72.7161C102.123 72.7161 97.7527 75.4745 94.6038 80.9914C91.4549 86.4831 89.8804 94.2547 89.8804 104.306C89.8804 111.007 90.5858 116.7 91.9965 121.386C93.4072 126.071 95.4351 129.636 98.0802 132.08C100.75 134.523 103.962 135.745 107.716 135.745Z" fill="white"/>
</svg>

              </button>
          </div>
      `;
  videoPlayer.appendChild(centerControls);

  // Create bottom controls
  const bottomControls = document.createElement("div");
  bottomControls.className = "bottom-controls";
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
  const style = document.createElement("style");
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
              width: 44px;
              height: 44px;
              border-radius: 50%;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 16px;
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
              height: 6px;
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
  const playPauseBtn = bottomControls.querySelector(".play-pause");
  const playPauseLarge = centerControls.querySelector(".play-pause-large");
  const rewindBtn = centerControls.querySelector(".rewind-10");
  const forwardBtn = centerControls.querySelector(".forward-10");
  const volumeBtn = bottomControls.querySelector(".volume");
  const volumeTrack = bottomControls.querySelector(".volume-track");
  const volumeFill = bottomControls.querySelector(".volume-fill");
  const progressBar = bottomControls.querySelector(".progress-bar");
  const progressFill = bottomControls.querySelector(".progress-fill");
  const progressHandle = bottomControls.querySelector(".progress-handle");
  const currentTimeDisplay = bottomControls.querySelector(".current-time");
  const totalTimeDisplay = bottomControls.querySelector(".total-time");
  const speedBtn = bottomControls.querySelector(".speed");
  const fullscreenBtn = bottomControls.querySelector(".fullscreen");

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
      loadingOverlay.classList.add("visible");
    }
  }

  function hideLoading() {
    // Add a small delay before hiding to prevent flickering
    clearTimeout(loadingTimeout);
    loadingTimeout = setTimeout(() => {
      isLoading = false;
      loadingOverlay.classList.remove("visible");
    }, 200);
  }

  // Add loading state event listeners
  video.addEventListener("waiting", showLoading);
  video.addEventListener("seeking", showLoading);
  video.addEventListener("playing", hideLoading);
  video.addEventListener("canplay", hideLoading);
  video.addEventListener("seeked", hideLoading);
  video.addEventListener("error", showLoading);

  if (progressBar) {
    const originalClickHandler = progressBar.onclick;
    progressBar.onclick = (e) => {
      showLoading();
      if (originalClickHandler) originalClickHandler(e);
    };
  }

  if (progressBar) {
    progressBar.addEventListener("mousedown", (e) => {
      isDragging = true;
      showLoading();
    });

    document.addEventListener("mouseup", () => {
      if (isDragging) {
        isDragging = false;
        // Keep loading visible until video is ready
      }
    });
  }

  // Play/Pause functionality
  function updatePlayButton() {
    const isPlaying = !video.paused;
    playPauseBtn.innerHTML = isPlaying
      ? '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>'
      : '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>';
    playPauseLarge.innerHTML = isPlaying
      ? '<svg viewBox="0 0 24 24" width="64" height="64"><path fill="currentColor" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>'
      : '<svg viewBox="0 0 24 24" width="64" height="64"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>';
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
  rewindBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    video.currentTime = Math.max(0, video.currentTime - 10);
  });

  forwardBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    video.currentTime = Math.min(video.duration, video.currentTime + 10);
  });

  // Volume control
  function updateVolume() {
    const volume = video.muted ? 0 : video.volume;
    volumeFill.style.width = `${volume * 100}%`;

    if (volume === 0) {
      volumeBtn.innerHTML =
        '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>';
    } else {
      volumeBtn.innerHTML =
        '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>';
    }
  }

  // Press and hold for 2x speed
  function handleSpeedUp(e) {
    if (
      e.target.closest(".bottom-controls") ||
      e.target.closest(".control-group")
    ) {
      return;
    }
    originalSpeed = video.playbackRate;
    video.playbackRate = 2;
    isHolding = true;

    const speedIndicator = document.createElement("div");
    speedIndicator.className = "speed-indicator";
    speedIndicator.textContent = "2x";
    videoPlayer.appendChild(speedIndicator);
  }

  function handleSpeedNormal() {
    if (isHolding) {
      video.playbackRate = originalSpeed;
      isHolding = false;
      const indicator = videoPlayer.querySelector(".speed-indicator");
      if (indicator) indicator.remove();
    }
  }

  // Event Listeners
  playPauseBtn.addEventListener("click", togglePlay);
  playPauseLarge.addEventListener("click", togglePlay);

  volumeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (video.muted) {
      video.muted = false;
      video.volume = lastVolume;
    } else {
      lastVolume = video.volume;
      video.muted = true;
    }
  });

  // First, let's add variables to track volume dragging state
  let isVolumeDragging = false;

  // Add mouse down event to start dragging
  volumeTrack.addEventListener("mousedown", (e) => {
    isVolumeDragging = true;
    updateVolumeFromMouse(e);
  });

  // Add mousemove event to track dragging
  document.addEventListener("mousemove", (e) => {
    if (isVolumeDragging) {
      updateVolumeFromMouse(e);
    }
  });

  // Add mouseup event to stop dragging
  document.addEventListener("mouseup", () => {
    isVolumeDragging = false;
  });

  // Function to update volume based on mouse position
  function updateVolumeFromMouse(e) {
    const rect = volumeTrack.getBoundingClientRect();
    const newVolume = Math.max(
      0,
      Math.min(1, (e.clientX - rect.left) / rect.width)
    );
    video.volume = newVolume;
    video.muted = false; // Unmute when adjusting volume
    volumeFill.style.width = `${newVolume * 100}%`;
  }

  volumeTrack.addEventListener("click", (e) => {
    e.stopPropagation();
    updateVolumeFromMouse(e);
    const rect = volumeTrack.getBoundingClientRect();
    const newVolume = Math.max(
      0,
      Math.min(1, (e.clientX - rect.left) / rect.width)
    );
    video.volume = newVolume;
    video.muted = false;
  });

  // 1. First, modify the progress bar click handler
  progressBar.addEventListener("click", (e) => {
    e.stopPropagation();
    const rect = progressBar.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));

    // Store if video was playing
    const wasPlaying = !video.paused;

    showLoading();
    video.currentTime = pos * video.duration;

    // Resume playback after seeking if it was playing before
    video.addEventListener(
      "seeked",
      () => {
        if (wasPlaying) {
          video.play();
        }
        hideLoading();
      },
      { once: true }
    );
  });

  // Progress bar drag functionality
  let isDragging = false;
  let wasPlaying = false;

  progressBar.addEventListener("mousedown", (e) => {
    isDragging = true;
    wasPlaying = !video.paused; // Store the playing state
    updateProgressFromMouse(e);
    showLoading();
  });
  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      updateProgressFromMouse(e);
      showLoading();
    }
  });

  document.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false;

      // Add event listener for when seeking completes
      video.addEventListener(
        "seeked",
        () => {
          if (wasPlaying) {
            video.play();
          }
          hideLoading();
        },
        { once: true }
      );
    }
  });
  function updateProgressFromMouse(e) {
    const rect = progressBar.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    video.currentTime = pos * video.duration;
    const progress = pos * 100;
    progressFill.style.width = `${progress}%`;

    // Add this line to update the handle position while dragging
    progressHandle.style.left = `${progress}%`;

    currentTimeDisplay.textContent = formatTime(video.currentTime);
  }

  function updateProgress() {
    if (!isDragging) {
      const progress = (video.currentTime / video.duration) * 100;
      progressFill.style.width = `${progress}%`;
      // Add this line to update the handle position
      progressHandle.style.left = `${progress}%`;
      currentTimeDisplay.textContent = formatTime(video.currentTime);
      totalTimeDisplay.textContent = formatTime(video.duration);
    }
  }

  // Playback speed control
  const speeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
  let currentSpeedIndex = 3; // Start at 1x speed

  speedBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    currentSpeedIndex = (currentSpeedIndex + 1) % speeds.length;
    const newSpeed = speeds[currentSpeedIndex];
    video.playbackRate = newSpeed;
    speedBtn.textContent = `${newSpeed}x`;
  });

  // Fullscreen control
  fullscreenBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoPlayer.requestFullscreen();
    }
  });

  // Press and hold functionality
  videoPlayer.addEventListener("mousedown", (e) => {
    if (e.button === 0) {
      longPressTimeout = setTimeout(() => handleSpeedUp(e), 200);
    }
  });

  videoPlayer.addEventListener("mouseup", () => {
    clearTimeout(longPressTimeout);
    handleSpeedNormal();
  });

  videoPlayer.addEventListener("mouseleave", () => {
    clearTimeout(longPressTimeout);
    handleSpeedNormal();
  });

  // Keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    // Only handle if video player is visible and no input is focused
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
      return;
    }

    switch (e.key.toLowerCase()) {
      case " ": // Space bar
      case "k": // YouTube-style play/pause
        e.preventDefault();
        togglePlay();
        break;
      case "arrowleft": // Rewind 10 seconds
        e.preventDefault();
        showLoading();
        video.currentTime = Math.max(0, video.currentTime - 10);
        break;
      case "arrowright": // Forward 10 seconds
        e.preventDefault();
        showLoading();
        video.currentTime = Math.min(video.duration, video.currentTime + 10);
        break;
      case "m": // Mute
        e.preventDefault();
        volumeBtn.click();
        break;
      case "f": // Fullscreen
        e.preventDefault();
        fullscreenBtn.click();
        break;
    }
  });

  // Double click for fullscreen
  videoPlayer.addEventListener("dblclick", (e) => {
    if (
      e.target.closest(".bottom-controls") ||
      e.target.closest(".control-group")
    ) {
      return;
    }
    fullscreenBtn.click();
  });

  // Initial loading state check
  if (video.readyState < 4) {
    showLoading();
  }

  // Add video event listeners
  video.addEventListener("play", updatePlayButton);
  video.addEventListener("pause", updatePlayButton);
  video.addEventListener("timeupdate", updateProgress);
  video.addEventListener("loadedmetadata", updateProgress);
  video.addEventListener("volumechange", updateVolume);

  // Set up auto-hide for controls
  let hideControlsTimeout;

  function showControls() {
    centerControls.style.opacity = "1";
    bottomControls.style.opacity = "1";

    clearTimeout(hideControlsTimeout);
    if (!video.paused) {
      hideControlsTimeout = setTimeout(() => {
        if (!video.paused) {
          centerControls.style.opacity = "0";
          bottomControls.style.opacity = "0";
        }
      }, 2000);
    }
  }

  videoPlayer.addEventListener("mousemove", showControls);
  videoPlayer.addEventListener("mouseleave", () => {
    if (!video.paused) {
      centerControls.style.opacity = "0";
      bottomControls.style.opacity = "0";
    }
  });

  // Initial setup
  updatePlayButton();
  updateVolume();
  updateProgress();
}

// Initialize enhancement for existing video players
function initializeEnhancement() {
  console.log("Initializing enhancement...");
  const videoPlayers = document.querySelectorAll("video-player");
  videoPlayers.forEach((player) => enhanceVideoPlayer(player));
}

// Watch for new video players being added
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeName === "VIDEO-PLAYER") {
        enhanceVideoPlayer(node);
      }
    });
  });
});

// Start observing the document
observer.observe(document.body, {
  childList: true,
  subtree: true,
});

// Initial enhancement with a slight delay to ensure DOM is ready
setTimeout(initializeEnhancement, 1000);

console.log("Fathom Player Enhancer loaded!");
