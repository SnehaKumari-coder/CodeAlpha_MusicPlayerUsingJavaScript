const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");
const current = document.getElementById("current");
const duration = document.getElementById("duration");
const playlist = document.getElementById("playlist");
const volumeControl = document.getElementById("volumeControl");

const songs = [
  { title: "Ulfat", artist: "Charan and Venoz", src: "My - Songs/ulfat.mp3" },
  { title: "Pehli Bar", artist: "Ajay-Atul", src: "My - Songs/pehli-bar.mp3" },
  { title: "Mann Mera", artist: "Gajendra Verma", src: "My - Songs/mann-mera.mp3" }
];

let songIndex = 0;
let isPlaying = false;

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
  audio.autoplay = true;
}

function togglePlay() {
  if (!isPlaying) {
    audio.play();
    playBtn.textContent = "⏸️";
  } else {
    audio.pause();
    playBtn.textContent = "▶️";
  }
  isPlaying = !isPlaying;
}

function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playBtn.textContent = "⏸️";
  isPlaying = true;
  createPlaylist();
}

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playBtn.textContent = "⏸️";
  isPlaying = true;
  createPlaylist();
}

function updateProgress() {
  if (!isNaN(audio.duration)) {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = percent + "%";
    current.textContent = formatTime(audio.currentTime);
    duration.textContent = formatTime(audio.duration);
  }
}

function formatTime(t) {
  const mins = Math.floor(t / 60);
  const secs = Math.floor(t % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

function setProgress(e) {
  const width = e.currentTarget.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

function createPlaylist() {
  playlist.innerHTML = "";
  songs.forEach((song, index) => {
    const div = document.createElement("div");
    div.textContent = song.title;
    if (index === songIndex) div.classList.add("active");
    div.onclick = () => {
      songIndex = index;
      loadSong(song);
      audio.play();
      playBtn.textContent = "⏸️";
      isPlaying = true;
      createPlaylist();
    };
    playlist.appendChild(div);
  });
}

audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("ended", nextSong);
volumeControl.addEventListener("input", () => {
  audio.volume = volumeControl.value;
});

loadSong(songs[songIndex]);
createPlaylist();
