// ============================================
//  SPOTIFY CLONE - INTERACTIVE FEATURES
//  Author: Prakash
//  Updated: Added volume slider, shuffle/repeat, search filter
// ============================================


// 1. PLAY/PAUSE BUTTON
let playBtn = document.querySelector('.play-pause');
let isPlaying = false;

playBtn.onclick = function() {
    let icon = playBtn.querySelector('i');
    
    if (isPlaying == false) {
        icon.className = 'fa-solid fa-pause';
        isPlaying = true;
    } else {
        icon.className = 'fa-solid fa-play';
        isPlaying = false;
    }
};


// 2. LIKE BUTTON (HEART)
let heart = document.querySelector('.song-info .fa-heart');
let liked = false;

heart.onclick = function() {
    if (liked == false) {
        heart.className = 'fa-solid fa-heart';
        heart.style.color = '#1DB954';
        liked = true;
    } else {
        heart.className = 'fa-regular fa-heart';
        heart.style.color = '#b3b3b3';
        liked = false;
    }
};


// 3. GREETING BASED ON TIME
let greeting = document.querySelector('.greeting h1');
let hours = new Date().getHours();

if (hours < 12) {
    greeting.innerText = 'Good morning';
} else if (hours < 18) {
    greeting.innerText = 'Good afternoon';
} else {
    greeting.innerText = 'Good evening';
}


// 4. UPDATE PLAYER BAR ON SONG CLICK
let playButtons = document.querySelectorAll('.play-btn');
let songName = document.querySelector('.song-name');
let artistName = document.querySelector('.artist-name');
let songImg = document.querySelector('.song-info img');

playButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const card = btn.parentElement;
        songName.innerText = card.getAttribute('data-song');
        artistName.innerText = card.getAttribute('data-artist');
        songImg.src = card.getAttribute('data-img');
    });
});


// ============================================
// NEW FEATURE: DRAGGABLE VOLUME SLIDER
// Click anywhere on volume bar to set volume
// ============================================
let volumeBar = document.querySelector('.volume-bar');
let volumeFill = document.querySelector('.volume-fill');
let volumeIcon = document.querySelector('.volume-control i');
let currentVolume = 70;

// Click on volume bar to change volume
volumeBar.onclick = function(e) {
    let barWidth = volumeBar.offsetWidth;
    let clickPosition = e.offsetX;
    let newVolume = (clickPosition / barWidth) * 100;
    
    setVolume(newVolume);
};

// Drag to change volume
let isDragging = false;

volumeBar.onmousedown = function() {
    isDragging = true;
};

document.onmousemove = function(e) {
    if (isDragging) {
        let rect = volumeBar.getBoundingClientRect();
        let newVolume = ((e.clientX - rect.left) / rect.width) * 100;
        
        // Keep volume between 0 and 100
        newVolume = Math.max(0, Math.min(100, newVolume));
        setVolume(newVolume);
    }
};

document.onmouseup = function() {
    isDragging = false;
};

// Function to update volume display and icon
function setVolume(volume) {
    currentVolume = volume;
    volumeFill.style.width = volume + '%';
    
    // Change icon based on volume level
    if (volume == 0) {
        volumeIcon.className = 'fa-solid fa-volume-xmark';
    } else if (volume < 50) {
        volumeIcon.className = 'fa-solid fa-volume-low';
    } else {
        volumeIcon.className = 'fa-solid fa-volume-high';
    }
}

// Click icon to mute/unmute
let savedVolume = 70;

volumeIcon.onclick = function() {
    if (currentVolume > 0) {
        savedVolume = currentVolume;
        setVolume(0);
    } else {
        setVolume(savedVolume);
    }
};


// ============================================
// NEW FEATURE: SHUFFLE & REPEAT TOGGLE
// Click to activate with green highlight
// ============================================
let shuffleBtn = document.querySelector('.fa-shuffle');
let repeatBtn = document.querySelector('.fa-repeat');

let shuffleActive = false;
let repeatActive = false;

shuffleBtn.onclick = function() {
    shuffleActive = !shuffleActive;
    
    if (shuffleActive) {
        shuffleBtn.classList.add('active');
    } else {
        shuffleBtn.classList.remove('active');
    }
};

repeatBtn.onclick = function() {
    repeatActive = !repeatActive;
    
    if (repeatActive) {
        repeatBtn.classList.add('active');
    } else {
        repeatBtn.classList.remove('active');
    }
};


// ============================================
// NEW FEATURE: SEARCH FILTER
// Type to filter playlists in real-time
// ============================================
let searchInput = document.querySelector('.input-box');
let allCards = document.querySelectorAll('.playlist-card');

searchInput.oninput = function() {
    let searchText = searchInput.value.toLowerCase();
    
    allCards.forEach(card => {
        let songTitle = card.getAttribute('data-song').toLowerCase();
        let artistName = card.getAttribute('data-artist').toLowerCase();
        
        // Check if search text matches song or artist
        if (songTitle.includes(searchText) || artistName.includes(searchText)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
};

// Clear search - show all cards when search is empty
searchInput.addEventListener('search', function() {
    if (searchInput.value === '') {
        allCards.forEach(card => {
            card.style.display = 'block';
        });
    }
});

