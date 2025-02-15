
// Music player data
const songs = [
    { title: "Song 1", artist: "Artist A", file: "song1.mp3", genre: "Pop" },
    { title: "Song 2", artist: "Artist B", file: "song2.mp3", genre: "Rock" },
    { title: "Song 3", artist: "Artist C", file: "song3.mp3", genre: "Jazz" },
    // Add more songs
];

let currentSongIndex = 0;
let isPlaying = false;
const audioElement = new Audio(songs[currentSongIndex].file);
const playPauseButton = document.getElementById("play-pause");
const songTitle = document.getElementById("song-title");
const songArtist = document.getElementById("song-artist");
const songList = document.getElementById("song-list");
const searchBar = document.getElementById("search-bar");

// Load initial song info
function loadSongInfo() {
    songTitle.textContent = songs[currentSongIndex].title;
    songArtist.textContent = songs[currentSongIndex].artist;
    audioElement.src = songs[currentSongIndex].file;
}

// Play/Pause toggle
function togglePlay() {
    if (isPlaying) {
        audioElement.pause();
        playPauseButton.textContent = '►';
    } else {
        audioElement.play();
        playPauseButton.textContent = '❚❚';
    }
    isPlaying = !isPlaying;
}

// Skip to next/previous song
function skip(direction) {
    currentSongIndex += direction;
    if (currentSongIndex < 0) currentSongIndex = songs.length - 1;
    if (currentSongIndex >= songs.length) currentSongIndex = 0;

    loadSongInfo();
    if (isPlaying) audioElement.play();
}

// Adjust volume
function adjustVolume() {
    audioElement.volume = document.getElementById("volume-slider").value;
}

// Search songs
function searchSongs() {
    const query = searchBar.value.toLowerCase();
    const filteredSongs = songs.filter(song => 
        song.title.toLowerCase().includes(query) || 
        song.artist.toLowerCase().includes(query) ||
        song.genre.toLowerCase().includes(query)
    );
    displaySongs(filteredSongs);
}

// Display songs in the list
function displaySongs(songsList) {
    songList.innerHTML = "";
    songsList.forEach((song, index) => {
        const li = document.createElement("li");
        li.textContent = `${song.title} - ${song.artist}`;
        li.onclick = () => {
            currentSongIndex = index;
            loadSongInfo();
            if (isPlaying) audioElement.play();
        };
        songList.appendChild(li);
    });
}

// Initial setup
loadSongInfo();
displaySongs(songs);

