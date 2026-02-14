// play/pause button toggle
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


// heart button - like/unlike
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


// greeting changes based on time
let greeting = document.querySelector('.greeting h1');
let hours = new Date().getHours();

if (hours < 12) {
    greeting.innerText = 'Good morning';
} else if (hours < 18) {
    greeting.innerText = 'Good afternoon';
} else {
    greeting.innerText = 'Good evening';
}


// when u click play btn on card, it shows in player bar
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


// --- volume slider (drag + click) ---

let volumeBar = document.querySelector('.volume-bar');
let volumeFill = document.querySelector('.volume-fill');
let volumeIcon = document.querySelector('.volume-control i');
let currentVolume = 70;

// click anywhere on bar to set volume
volumeBar.onclick = function(e) {
    let barWidth = volumeBar.offsetWidth;
    let clickPosition = e.offsetX;
    let newVolume = (clickPosition / barWidth) * 100;
    setVolume(newVolume);
};

// drag stuff
let isDragging = false;

volumeBar.onmousedown = function() {
    isDragging = true;
};

document.onmousemove = function(e) {
    if (isDragging) {
        let rect = volumeBar.getBoundingClientRect();
        let newVolume = ((e.clientX - rect.left) / rect.width) * 100;
        // keep it between 0-100
        newVolume = Math.max(0, Math.min(100, newVolume));
        setVolume(newVolume);
    }
};

document.onmouseup = function() {
    isDragging = false;
};

// this updates the bar and icon
function setVolume(volume) {
    currentVolume = volume;
    volumeFill.style.width = volume + '%';
    
    if (volume == 0) {
        volumeIcon.className = 'fa-solid fa-volume-xmark';
    } else if (volume < 50) {
        volumeIcon.className = 'fa-solid fa-volume-low';
    } else {
        volumeIcon.className = 'fa-solid fa-volume-high';
    }
}

// click icon to mute/unmute
let savedVolume = 70;

volumeIcon.onclick = function() {
    if (currentVolume > 0) {
        savedVolume = currentVolume;
        setVolume(0);
    } else {
        setVolume(savedVolume);
    }
};


// --- shuffle and repeat buttons ---

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


// --- search filter ---

let searchInput = document.querySelector('.input-box');
let allCards = document.querySelectorAll('.playlist-card');

searchInput.oninput = function() {
    let searchText = searchInput.value.toLowerCase();
    
    allCards.forEach(card => {
        let songTitle = card.getAttribute('data-song').toLowerCase();
        let artist = card.getAttribute('data-artist').toLowerCase();
        
        // show card if it matches search
        if (songTitle.includes(searchText) || artist.includes(searchText)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
};

// shows all cards when search cleared
searchInput.addEventListener('search', function() {
    if (searchInput.value === '') {
        allCards.forEach(card => {
            card.style.display = 'block';
        });
    }
});

