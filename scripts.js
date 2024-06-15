// Get elements
const musicPlayer = document.getElementById('music-player');
const playlistList = document.getElementById('playlist-list');
const trackList = document.getElementById('track-list');
const audioElement = new Audio();
const playBtn = document.getElementById('play-btn');
const pauseBtn = document.getElementById('pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const volumeSlider = document.getElementById('volume-slider');
const progressBar = document.getElementById('progress-bar');
const playedProgress = document.getElementById('played-progress');
const trackName = document.getElementById('track-name');
const artistName = document.getElementById('artist-name');
const shuffleBtn = document.getElementById('shuffle-btn');
const repeatBtn = document.getElementById('repeat-btn');

// Initialize variables
let playlists = [];
let currentPlaylistIndex = 0;
let currentTrackIndex = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;

// Load playlists and tracks
loadPlaylists();
loadTracks();

// Event listeners
playBtn.addEventListener('click', playTrack);
pauseBtn.addEventListener('click', pauseTrack);
prevBtn.addEventListener('click', prevTrack);
nextBtn.addEventListener('click', nextTrack);
volumeSlider.addEventListener('input', updateVolume);
progressBar.addEventListener('click', seekTrack);
shuffleBtn.addEventListener('click', toggleShuffle);
repeatBtn.addEventListener('click', toggleRepeat);

// Functions
function loadPlaylists() {
    // Load playlists from local storage or API
    playlists = [
        { name: 'Playlist 1', tracks: [0, 1, 2] },
        { name: 'Playlist 2', tracks: [3, 4, 5] },
        // Add more playlists
    ];
    renderPlaylists();
}

function loadTracks() {
    // Load tracks from local storage or API
    tracks = [
        { name: 'Track 1', artist: 'Artist 1', file: 'track1.mp3' },
        { name: 'Track 2', artist: 'Artist 2', file: 'track2.mp3' },
        // Add more tracks
    ];
    renderTracks();
}

function renderPlaylists() {
    playlistList.innerHTML = '';
    playlists.forEach((playlist, index) => {
        const playlistItem = document.createElement('li');
        playlistItem.textContent = playlist.name;
        playlistItem.addEventListener('click', () => {
            currentPlaylistIndex = index;
            renderTracks();
        });
        playlistList.appendChild(playlistItem);
    });
}

function renderTracks() {
    trackList.innerHTML = '';
    const currentPlaylist = playlists[currentPlaylistIndex];
    currentPlaylist.tracks.forEach((trackIndex) => {
        const track = tracks[trackIndex];
        const trackItem = document.createElement('li');
        trackItem.textContent = `${track.name} - ${track.artist}`;
        trackItem.addEventListener('click', () => {
            currentTrackIndex = trackIndex;
            playTrack();
        });
        trackList.appendChild(trackItem);
    });
}

function playTrack() {
    if (!isPlaying) {
        audioElement.src = tracks[currentTrackIndex].file;
        audioElement.play();
        isPlaying = true;
        updateTrackInfo();
    }
}

function pauseTrack() {
    if (isPlaying) {
        audioElement.pause();
        isPlaying = false;
    }
}

function prevTrack() {
    if (currentTrackIndex > 0) {
        currentTrackIndex--;
        playTrack();
    }
}

function nextTrack() {
    if (currentTrackIndex < tracks.length - 1) {
        currentTrackIndex++;
        playTrack();
    }
}

function updateVolume() {
    audioElement.volume = volumeSlider.value;
}

function seekTrack(event) {
    const progressBarWidth = progressBar.offsetWidth;
    const clickX = event.clientX;
    const seekPosition = (clickX / progressBarWidth) * audioElement.duration;
    audioElement.currentTime = seekPosition;
}

function toggleShuffle() {
    isShuffle =!isShuffle;
    shuffleBtn.textContent = isShuffle? 'Shuffle On' : 'Shuffle Off';
}

function toggleRepeat() {
    isRepeat =!isRepeat;
    repeatBtn.textContent = isRepeat? 'Repeat On' : 'Repeat Off';
}

function updateTrackInfo() {
    trackName.textContent = tracks[currentTrackIndex].name;
    artistName.textContent = tracks[currentTrackIndex].artist;
}

// Update progress bar
setInterval(() => {
    const currentTime = audioElement.currentTime;
    const duration = audioElement.duration;
    const progress = (currentTime / duration) * 100;
    playedProgress.style.width = `${progress}%`;
}, 1000);
