const menuBtn = document.querySelector(".menu-btn"),
    container = document.querySelector(".container"),
    playListContainer = document.querySelector("#playlist"),
    infoWrapper = document.querySelector(".info"),
    coverImage = document.querySelector(".cover-image"),
    currentSongTitle = document.querySelector(".current-song-title"),
    currentFavourite = document.querySelector("#current-favourite");
    
let playing = false,
    currentSong = 0,
    currentPlaylist = null,
    shuffle = false,
    repeat = 0,
    favourites = {},
    audio = new Audio();

function getCurrentFavourites() {
    if (!favourites[currentPlaylist]) {
        favourites[currentPlaylist] = [];
    }
    return favourites[currentPlaylist];
}

// **切換選單
menuBtn.addEventListener("click", () => {
    container.classList.toggle("active");
});

// **切換播放清單
document.querySelectorAll(".choose-list a").forEach(a => {
    a.addEventListener("click", function (event) {
        event.preventDefault();
        // 先移除所有 a 的 active 狀態
        document.querySelectorAll(".choose-list a").forEach(link => {
            link.classList.remove("active");
        });
        // 設定當前選擇的 a 為 active
        this.classList.add("active");
        currentPlaylist = this.dataset.list;
        updatePlaylist(songs[currentPlaylist]);
        currentSong = 0;
        loadSong(currentSong);
    });
});

// **更新播放清單
function updatePlaylist(songList) {
    playListContainer.innerHTML = "";
    songList.forEach((song, index) => {
        const tr = document.createElement("tr");
        tr.classList.add("song");
        tr.innerHTML = `
            <td class="no"><h5>${index + 1}</h5></td>
            <td class="title"><h6>${song.title}</h6></td>
            <td class="length"><h6>--:--</h6></td>
            <td><i class="fi fi-ss-heart ${getCurrentFavourites().includes(index) ? "active" : ""}"></i></td>
        `;
        playListContainer.appendChild(tr);
        tr.addEventListener("click", (e) => {
            if (e.target.classList.contains("fi-ss-heart")) {
                addToFavourites(index);
                e.target.classList.toggle("active");
                return;
            }
            currentSong = index;
            loadSong(currentSong);
            audio.play();
            playing = true;
            playPauseBtn.classList.remove("fa-play");
            playPauseBtn.classList.add("fa-pause");
            playing = true;
            const songRows = playListContainer.querySelectorAll('.song');
            songRows.forEach(row => row.classList.remove('active'));
            tr.classList.add('active');
        });
        const audioForDuration = new Audio(`./data/music/${song.audio_src}`);
        audioForDuration.addEventListener("loadedmetadata", () => {
            tr.querySelector(".length h6").innerText = formatTime(audioForDuration.duration);
        });
        playing = false;
        playPauseBtn.classList.add("fa-play");
        playPauseBtn.classList.remove("fa-pause");
    });
    if (songList.length > 0 && currentSong < songList.length) {
        const songRows = playListContainer.querySelectorAll('.song');
        songRows[currentSong].classList.add('active');
    }
}

// **格式化時間
function formatTime(time) {
    if (isNaN(time)) return "00:00";
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// **載入歌曲
function loadSong(num) {
    if (!currentPlaylist) return;
    const song = songs[currentPlaylist][num]; 
    if (!song) return;
    infoWrapper.innerHTML = `<h2>${song.title}</h2><h3>${song.artist}</h3>`;
    currentSongTitle.innerHTML = `${song.title}`;
    coverImage.style.backgroundImage = `url(./data/img/${song.img_src})`;
    audio.src = `./data/music/${song.audio_src}`;
    audio.currentTime = 0;
    progressDot.style.left = "0%";
    current_Time.innerHTML = "0:00";
    currentFavourite.classList.toggle("active", getCurrentFavourites().includes(num));
    const songRows = playListContainer.querySelectorAll('.song');
    songRows.forEach(row => row.classList.remove('active'));
    if (songRows[num]) {
        songRows[num].classList.add('active');
    }
}

// **控制播放/暫停
const playPauseBtn = document.querySelector("#playpause"),
      prevBtn = document.querySelector("#prev"),
      nextBtn = document.querySelector("#next");
playPauseBtn.addEventListener("click", () => {
    if (!currentPlaylist) return; 
    playing ? audio.pause() : audio.play();
    playing = !playing;
    playPauseBtn.classList.remove("fa-play", "fa-pause"); 
    playPauseBtn.classList.add(playing ? "fa-pause" : "fa-play");
});

// **下一首
function nextSong() {
    if (!currentPlaylist) return;
    if (shuffle) {
        currentSong = Math.floor(Math.random() * songs[currentPlaylist].length);
    } else {
        currentSong = (currentSong + 1) % songs[currentPlaylist].length;
    }
    loadSong(currentSong);
    if (playing) audio.play();
}
nextBtn.addEventListener("click", nextSong);

// **上一首
function prevSong() {
    if (!currentPlaylist) return;
    if (currentSong > 0) {
        currentSong--;
    } else {
        currentSong = songs[currentPlaylist].length - 1;
    }
    loadSong(currentSong);
    if (playing) audio.play();
}
prevBtn.addEventListener("click", prevSong);

// **添加最愛歌曲
function addToFavourites(index) {
    const listHeartIcons = document.querySelectorAll("#playlist .fi-ss-heart");
    const currentFav = getCurrentFavourites();
    if (currentFav.includes(index)) {
        favourites[currentPlaylist] = currentFav.filter(i => i !== index);
    } else {
        favourites[currentPlaylist].push(index);
    }
    currentFavourite.classList.toggle("active", getCurrentFavourites().includes(index));
    listHeartIcons.forEach((icon, i) => {
        if (i === index) {
            icon.classList.toggle("active", getCurrentFavourites().includes(index));
        }
    });
    if (listHeartIcons[index]) {
        listHeartIcons[index].classList.toggle("active",!isFavourite);
    }
    if (currentSong === index) {
        currentFavourite.classList.toggle("active", getCurrentFavourites().includes(index));
    }
}
currentFavourite.addEventListener("click", () => {
    addToFavourites(currentSong);
});

// **隨機播放
const shuffleBtn = document.querySelector("#shuffle");
shuffleBtn.addEventListener("click", () => {
    if (!currentPlaylist) return;
    shuffle = !shuffle;
    if (shuffle) {
        repeat = 0;
        repeatBtn.classList.remove("active");
        updateRepeatIcon();
    }
    shuffleBtn.classList.toggle("active", shuffle);
});

// **重複播放
const repeatBtn = document.querySelector("#repeat");
repeatBtn.addEventListener("click", () => {
    if (!currentPlaylist) return;
    repeat = (repeat + 1) % 3;
    if (repeat > 0) {
        shuffle = false;
        shuffleBtn.classList.remove("active");
    }
    repeatBtn.classList.toggle("active", repeat > 0);
    updateRepeatIcon();
});
audio.addEventListener("ended", () => {
    if (!currentPlaylist) return;
    if (repeat === 1) {
        audio.play();
        repeatBtn.classList.toggle("fi-br-arrows-repeat-1");
    } else if (repeat === 2) {
        nextSong();
        audio.play();
    } else if (currentSong < songs[currentPlaylist].length - 1) {
        nextSong();
        audio.play();
    }
    updateRepeatIcon();
    if (currentSong === songs[currentPlaylist].length - 1 && repeat === 0) {
        playing = false;
        playPauseBtn.classList.add("fa-play");
        playPauseBtn.classList.remove("fa-pause");
        return;
    }
});
function updateRepeatIcon() {
    if (repeat === 1) {
        repeatBtn.classList.add("fi-br-arrows-repeat-1");
        repeatBtn.classList.remove("fi-br-arrows-repeat");
    } else if (repeat === 2) {
        repeatBtn.classList.add("fi-br-arrows-repeat");
        repeatBtn.classList.remove("fi-br-arrows-repeat-1");
    } else {
        repeatBtn.classList.remove("fi-br-arrows-repeat-1", "fi-br-arrows-repeat");
        repeatBtn.classList.add("fi-br-arrows-repeat");
    }
}

// **歌曲進度條
const progressBar = document.querySelector(".bar"),
    progressDot = document.querySelector(".bar .dot"),
    current_Time = document.querySelector(".current-time"),
    current_Duration = document.querySelector(".duration");
function progress(){
    let{duration, currentTime} = audio;
    isNaN(duration) ? (duration = 0) : duration;
    isNaN(currentTime) ? (currentTime = 0) : currentTime;
    current_Time.innerHTML = formatTime(currentTime);
    current_Duration.innerHTML = formatTime(duration);
    let progressPercentage = (currentTime / duration) * 100;
    progressDot.style.left = `${progressPercentage}%`;
}
audio.addEventListener("timeupdate", progress);

// **更新歌曲進度
function setProgressDot(e) {
    let width = this.clientWidth;
    let clickX = e.offsetX;
    let duration = audio.duration;
    if (isNaN(duration) || duration <= 0) return;
    audio.currentTime = (clickX / width) * duration;
}
progressBar.addEventListener("click", setProgressDot);

// **左右拖移播放清單
const box = document.getElementById("draglist");
let isDragging = false;
let startX, scrollLeft;
box.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.pageX - box.offsetLeft;
    scrollLeft = box.scrollLeft;
    box.style.cursor = "w-resize";
});
document.addEventListener("mouseup", () => {
    isDragging = false;
    box.style.cursor = "w-resize";
});
document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    requestAnimationFrame(() => {
        const x = e.pageX - box.offsetLeft;
        const walk = (x - startX) * 1.5;
        box.scrollLeft = scrollLeft - walk;
    });
});
box.addEventListener("wheel", (e) => {
    e.preventDefault();
    box.scrollLeft += e.deltaY * 1.5;
});

// **調整音量大小
const volumeIcon = document.getElementById('volume');
const volumeSlider = document.getElementById('volume-slider');
volumeIcon.addEventListener('click', function (event) {
    event.stopPropagation();
    if (volumeSlider.style.opacity === '0' || volumeSlider.style.opacity === '') {
        volumeSlider.style.opacity = '1';
        volumeSlider.style.pointerEvents = 'auto';
        volumeIcon.classList.toggle("active", volume);
    } else {
        volumeSlider.style.opacity = '0';
        volumeSlider.style.pointerEvents = 'none';
        volumeIcon.classList.remove("active");
    }
});
volumeSlider.addEventListener('input', function () {
    audio.volume = parseFloat(this.value);
});
audio.addEventListener('loadedmetadata', function () {
    volumeSlider.value = audio.volume;
});
document.addEventListener('click', function (event) {
    if (!volumeIcon.contains(event.target) && !volumeSlider.contains(event.target)) {
        volumeSlider.style.opacity = '0';
        volumeSlider.style.pointerEvents = 'none';
        volumeIcon.classList.remove("active");
    }
});