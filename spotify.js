//  1. PLAY/PAUSE BUTTON
// When you click play button, it changes to pause icon
let playBtn = document.querySelector('.play-pause');
let isPlaying = false;

playBtn.onclick = function() {
    let icon = playBtn.querySelector('i');
    
    if (isPlaying == false) {
        icon.className = 'fa-solid fa-pause';  // change to pause
        isPlaying = true;
    } else {
        icon.className = 'fa-solid fa-play';   // change to play
        isPlaying = false;
    }
};


// 2. LIKE BUTTON (HEART) 
// Click heart to like/unlike
let heart = document.querySelector('.song-info .fa-heart');
let liked = false;

heart.onclick = function() {
    if (liked == false) {
        heart.className = 'fa-solid fa-heart';  // filled heart
        heart.style.color = '#1DB954';          // green color
        liked = true;
    } else {
        heart.className = 'fa-regular fa-heart'; // outline heart
        heart.style.color = '#b3b3b3';           // grey color
        liked = false;
    }
};


// 3. GREETING BASED ON TIME 
// Shows "Good morning/afternoon/evening"
let greeting = document.querySelector('.greeting h1');
let hours = new Date().getHours();  // gets current hour (0-23)

if (hours < 12) {
    greeting.innerText = 'Good morning';
} else if (hours < 18) {
    greeting.innerText = 'Good afternoon';
} else {
    greeting.innerText = 'Good evening';
}


// 4. CLICK CARD TO SHOW SONG NAME 
// When you click any playlist card, it shows in player bar
let cards = document.querySelectorAll('.playlist-card');
let songName = document.querySelector('.song-name');
let artistName = document.querySelector('.artist-name');

for (let i = 0; i < cards.length; i++) {
    cards[i].onclick = function() {
        let title = cards[i].querySelector('h4').innerText;
        let artist = cards[i].querySelector('p').innerText;
        
        songName.innerText = title;
        artistName.innerText = artist;
    };
}


// 5. VOLUME MUTE/UNMUTE 
// Click volume icon to mute
let volumeIcon = document.querySelector('.volume-control i');
let volumeFill = document.querySelector('.volume-fill');
let muted = false;

volumeIcon.onclick = function() {
    if (muted == false) {
        volumeIcon.className = 'fa-solid fa-volume-xmark';  // mute icon
        volumeFill.style.width = '0%';
        muted = true;
    } else {
        volumeIcon.className = 'fa-solid fa-volume-high';   // sound icon
        volumeFill.style.width = '70%';
        muted = false;
    }
};