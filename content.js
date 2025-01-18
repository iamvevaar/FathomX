console.log('Fathom Player Enhancer loading...');

// Create hover controls around the play button
function createHoverControls(videoPlayer, video) {
    // First, try to remove or disable Fathom's default play button overlay
    const existingPlayButton = videoPlayer.querySelector('.text-white.cursor-pointer.absolute.inset-0');
    if (existingPlayButton) {
        existingPlayButton.style.display = 'none';
    }

    // Create wrapper for hover controls
    const hoverControls = document.createElement('div');
    hoverControls.className = 'fathom-enhanced-controls';
    hoverControls.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
        opacity: 0;
        transition: opacity 0.2s;
        pointer-events: none;
        z-index: 1000;
    `;

    // Create central play/pause button
    const playPauseButton = document.createElement('button');
    playPauseButton.className = 'hover-button play-pause';
    playPauseButton.innerHTML = `
        <div class="button-circle play-pause-circle">
            <span class="play-pause-icon">▶️</span>
        </div>
    `;
    
    // Handle play/pause functionality
    let isPlaying = !video.paused;
    const updatePlayPauseState = () => {
        const icon = playPauseButton.querySelector('.play-pause-icon');
        icon.textContent = isPlaying ? '⏸️' : '▶️';
    };

    playPauseButton.onclick = (e) => {
        e.stopPropagation(); // Prevent event from reaching the video player
        if (isPlaying) {
            video.pause();
        } else {
            video.play();
        }
        isPlaying = !isPlaying;
        updatePlayPauseState();
        showPlayPauseIndicator(videoPlayer, !isPlaying);
    };

    // Create skip back button
    const skipBack = document.createElement('button');
    skipBack.className = 'hover-button skip-back';
    skipBack.innerHTML = `
        <div class="button-circle">
            <span class="skip-icon">⏪</span>
            <span class="skip-text">10</span>
        </div>
    `;
    skipBack.onclick = (e) => {
        e.stopPropagation(); // Prevent event from reaching the video player
        video.currentTime = Math.max(0, video.currentTime - 10);
        showSkipIndicator(videoPlayer, 'backward');
    };

    // Create skip forward button
    const skipForward = document.createElement('button');
    skipForward.className = 'hover-button skip-forward';
    skipForward.innerHTML = `
        <div class="button-circle">
            <span class="skip-icon">⏩</span>
            <span class="skip-text">10</span>
        </div>
    `;
    skipForward.onclick = (e) => {
        e.stopPropagation(); // Prevent event from reaching the video player
        video.currentTime = Math.min(video.duration, video.currentTime + 10);
        showSkipIndicator(videoPlayer, 'forward');
    };

    // Add the buttons to hover controls
    hoverControls.appendChild(skipBack);
    hoverControls.appendChild(playPauseButton);
    hoverControls.appendChild(skipForward);

    // Add hover controls to video player
    videoPlayer.appendChild(hoverControls);

    // Show/hide controls on hover
    videoPlayer.addEventListener('mouseenter', () => {
        hoverControls.style.opacity = '1';
        hoverControls.style.pointerEvents = 'auto';
    });

    videoPlayer.addEventListener('mouseleave', () => {
        hoverControls.style.opacity = '0';
        hoverControls.style.pointerEvents = 'none';
    });

    // Update play/pause state when video state changes
    video.addEventListener('play', () => {
        isPlaying = true;
        updatePlayPauseState();
    });

    video.addEventListener('pause', () => {
        isPlaying = false;
        updatePlayPauseState();
    });

    // Prevent default click behavior on video player
    videoPlayer.addEventListener('click', (e) => {
        if (e.target === videoPlayer || e.target === video) {
            e.preventDefault();
            e.stopPropagation();
            playPauseButton.click();
        }
    }, true);

    // Add styles for hover controls
    const style = document.createElement('style');
    style.textContent = `
        .hover-button {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 10px;
            transition: transform 0.2s;
            z-index: 1001;
        }

        .button-circle {
            width: 50px;
            height: 50px;
            background: rgba(0, 0, 0, 0.6);
            border-radius: 50%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            transition: background-color 0.2s;
        }

        .play-pause-circle {
            width: 60px;
            height: 60px;
        }

        .button-circle:hover {
            background: rgba(0, 0, 0, 0.8);
            transform: scale(1.1);
        }

        .skip-icon {
            font-size: 20px;
            line-height: 1;
        }

        .play-pause-icon {
            font-size: 24px;
            line-height: 1;
        }

        .skip-text {
            font-size: 12px;
            margin-top: -2px;
        }

        .fathom-enhanced-controls * {
            pointer-events: auto;
        }
    `;
    document.head.appendChild(style);
}

// Function to handle keyboard controls
function setupKeyboardControls(video) {
    // Store the original event listeners
    const originalKeydown = document.onkeydown;
    
    // Add our keyboard handler
    document.addEventListener('keydown', (e) => {
        // Only handle if no input element is focused
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }

        // Handle arrow keys
        if (e.key === 'ArrowLeft' && !e.ctrlKey && !e.shiftKey) {
            e.preventDefault();
            video.currentTime = Math.max(0, video.currentTime - 10);
            showSkipIndicator(video.parentElement, 'backward');
        } else if (e.key === 'ArrowRight' && !e.ctrlKey && !e.shiftKey) {
            e.preventDefault();
            video.currentTime = Math.min(video.duration, video.currentTime + 10);
            showSkipIndicator(video.parentElement, 'forward');
        } else if (e.key === ' ' && !e.ctrlKey && !e.shiftKey) {
            // Only handle space if we're not in an input field
            if (e.target === document.body || e.target.tagName === 'VIDEO') {
                e.preventDefault();
                if (video.paused) {
                    video.play();
                } else {
                    video.pause();
                }
                showPlayPauseIndicator(video.parentElement, video.paused);
            }
        }
    }, true);  // Use capture phase to intercept events early
}

// Function to show play/pause indicator
function showPlayPauseIndicator(container, isPaused) {
    // Remove any existing indicator
    const existingIndicator = container.querySelector('.play-pause-indicator');
    if (existingIndicator) {
        existingIndicator.remove();
    }

    // Create new indicator
    const indicator = document.createElement('div');
    indicator.className = 'play-pause-indicator';
    indicator.textContent = isPaused ? '⏸️ Paused' : '▶️ Playing';
    indicator.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        font-size: 16px;
        z-index: 9999;
        animation: fadeOut 0.5s ease-in-out forwards;
        animation-delay: 0.5s;
    `;

    container.appendChild(indicator);
    setTimeout(() => indicator.remove(), 1000);
}

// Function to show skip indicator
function showSkipIndicator(container, direction) {
    // Remove any existing indicator
    const existingIndicator = container.querySelector('.skip-indicator');
    if (existingIndicator) {
        existingIndicator.remove();
    }

    // Create new indicator
    const indicator = document.createElement('div');
    indicator.className = 'skip-indicator';
    indicator.textContent = direction === 'forward' ? '⏩ 10s' : '⏪ 10s';
    indicator.style.cssText = `
        position: absolute;
        top: 50%;
        ${direction === 'forward' ? 'right: 20%' : 'left: 20%'};
        transform: translateY(-50%);
        background: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        font-size: 16px;
        z-index: 9999;
        animation: fadeOut 0.5s ease-in-out forwards;
        animation-delay: 0.5s;
    `;

    container.appendChild(indicator);
    setTimeout(() => indicator.remove(), 1000);
}

// Function to enhance an individual video player
function enhanceVideoPlayer(videoPlayer) {
    console.log('Enhancing video player:', videoPlayer);

    // Get the video element
    const video = videoPlayer.querySelector('video');
    if (!video) {
        console.log('No video element found');
        return;
    }

    // Set up keyboard controls
    setupKeyboardControls(video);

    // Add hover controls
    createHoverControls(videoPlayer, video);

    // Find the menu element (which contains controls)
    const menu = videoPlayer.querySelector('menu');
    if (!menu) {
        console.log('No menu element found');
        return;
    }

    // Find the section containing controls
    const controlsSection = menu.querySelector('section');
    if (!controlsSection) {
        console.log('No controls section found');
        return;
    }

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }

        .skip-indicator {
            pointer-events: none;
            user-select: none;
        }
    `;
    document.head.appendChild(style);

    console.log('Video player enhancement complete');
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

console.log('Fathom Player Enhancer loaded!');