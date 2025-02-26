const wrapper = document.querySelector(".wrapper"),
      musicImg = wrapper.querySelector(".img-area img"),
      musicName = wrapper.querySelector(".song-detial .name"),
      musicArtist = wrapper.querySelector(".song-detial .artist"),
      mainAudio = wrapper.querySelector("#main-audio"),
      playPauseBtn = wrapper.querySelector(".play-pause"),
      prevBtn = wrapper.querySelector("#prev"),
      nextBtn = wrapper.querySelector("#next"),
      progressBar = wrapper.querySelector(".progress-bar"),
      progressArea = wrapper.querySelector(".progress-area"),
      musicList = wrapper.querySelector(".music-list"),
      showMoreBtn = wrapper.querySelector("#more-music"),
      hideMoreBtn = musicList.querySelector("#close"),
      repeatBtn = wrapper.querySelector("#repeat");

// 產生 allMusic.length 之間的隨機整數
let musicIndex = Math.floor(Math.random() * allMusic.length) + 1;
// let musicIndex = 1;

window.addEventListener("load", () => {
    loadMusic(musicIndex);  // call load-music-function once windows loaded
    playingNow();           // 清單中正在被播放的歌曲
});

//# load-music-function
function loadMusic(indexNumb){
    let musicData = allMusic[indexNumb - 1];
    musicName.innerText = musicData.name;
    musicArtist.innerText = musicData.artist;
    musicImg.src = `./asset/img/${musicData.img}`;
    mainAudio.src = `./asset/music/${musicData.src}`;
}

//# play-music-function
function playMusic(){
    wrapper.classList.add("paused");
    mainAudio.play();
    playPauseBtn.querySelector("span").textContent = "pause";
}
//# pause-music-function
function pauseMusic(){
    wrapper.classList.remove("paused");
    mainAudio.pause();
    playPauseBtn.querySelector("span").textContent = "play_arrow";
}


//# Play & Pause Btn event
playPauseBtn.addEventListener("click", () => {
    wrapper.classList.contains("paused") ? pauseMusic() : playMusic();
    playingNow();
});


//# next-music-function
function nextMusic(){
    musicIndex = (musicIndex % allMusic.length) + 1;
    loadMusic(musicIndex);
    playMusic();
    playingNow();
}
//# prev-music-function
function prevMusic(){
    musicIndex = musicIndex - 1 === 0 ? allMusic.length : musicIndex - 1;
    loadMusic(musicIndex);
    playMusic();
    playingNow();
}
nextBtn.addEventListener("click", nextMusic);
prevBtn.addEventListener("click", prevMusic);


//# progress bar with music current time
mainAudio.addEventListener("timeupdate", (e) => {
    // console.log(e); // 查看目前音樂撥放進度 ( currentTime 、 duration)
    const { currentTime, duration } = e.target;
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;
    
    let musicCurrentTime = wrapper.querySelector(".current");
    musicDuration = wrapper.querySelector(".duration");

    mainAudio.addEventListener("loadedmetadata", () => {
        //# 更新歌曲"總"時間
        let audioDuration = mainAudio.duration;
        // musicDuration.innerText = audioDuration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if(totalSec < 10){
            // 若 totalSec 數值小於 10 ，在其前面加上 "0"
            totalSec = `0${totalSec}`;
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`;
    });

    //# 更新歌曲"初始"時間
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    // 若 currentSec 數值小於 10 ，在其前面加上 "0"
    if(currentSec < 10){currentSec = `0${currentSec}`;} 
    
    // musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
    wrapper.querySelector(".current").innerText = `${currentMin}:${currentSec}`;
});


//# event start : 點擊控制、拖動控制，歌曲進度條
// 監聽點擊事件，直接變更歌曲進度
progressArea.addEventListener("click", (e) => {
    updateProgress(e);
    if (wrapper.classList.contains("paused")) playMusic();
});

// 記錄是否正在拖動
let isDragging = false;
// 監聽滑鼠或手指按下事件，開始拖動
progressArea.addEventListener("mousedown", (e) => {
    isDragging = true;
    progressArea.classList.add("active");       // 新增 active，讓進度條更醒目(css)
    updateProgress(e);
});
progressArea.addEventListener("touchstart", (e) => {
    isDragging = true;
    updateProgress(e.touches[0]); // 取得第一個觸控點
});

// 監聽滑鼠或手指移動事件，更新進度條（僅當 isDragging 為 true 時才觸發）
document.addEventListener("mousemove", (e) => {
    if (isDragging) updateProgress(e);
});
document.addEventListener("touchmove", (e) => {
    if (isDragging) updateProgress(e.touches[0]);
});

// 監聽滑鼠或手指鬆開事件，結束拖動
document.addEventListener("mouseup", () => {
    if (isDragging) {
        isDragging = false;
        progressArea.classList.remove("active"); // 拖動結束時移除 active
        if (wrapper.classList.contains("paused")) playMusic();
    }
});
document.addEventListener("touchend", () => {
    if (isDragging) {
        isDragging = false;
        if (wrapper.classList.contains("paused")) playMusic();
    }
});

// 更新進度條函式
function updateProgress(e) {
    let songDuration = mainAudio.duration;
    let progressWidth = progressArea.clientWidth;
    let offsetX = e.clientX - progressArea.getBoundingClientRect().left;
    
    // 確保 offsetX 在 0 到 progressWidth 之間，避免超出範圍
    offsetX = Math.max(0, Math.min(offsetX, progressWidth));
    
    mainAudio.currentTime = (offsetX / progressWidth) * songDuration;
    let progressPercent = (offsetX / progressWidth) * 100;
    progressBar.style.width = `${progressPercent}%`;
}
//# end : 點擊控制、拖動控制，歌曲進度條

//# 循環按鈕圖標控制變換
repeatBtn.addEventListener("click", () => {
    let states = ["repeat", "repeat_one", "shuffle"];
    let currentState = states.indexOf(repeatBtn.innerText);
    repeatBtn.innerText = states[(currentState + 1) % states.length];
});


//# 循環、重複、隨機按鈕功能
mainAudio.addEventListener("ended", () => {
    switch (repeatBtn.innerText) {
        case "repeat":
            nextMusic();
            break;
        case "repeat_one":
            mainAudio.currentTime = 0;
            playMusic();
            break;
        case "shuffle":
            if (allMusic.length > 1) {
                let randIndex;
                do {
                    randIndex = Math.floor(Math.random() * allMusic.length) + 1;
                } while (musicIndex === randIndex);
                musicIndex = randIndex;
            }
            loadMusic(musicIndex);
            playMusic();
            playingNow();
            break;
    }
});


//# 顯示播放清單
showMoreBtn.addEventListener("click", () => musicList.classList.toggle("show"));
// hideMoreBtn.addEventListener("click", () => musicList.classList.remove("show"));
//# 隱藏播放清單（點擊關閉按鈕或點擊外部區域）
document.addEventListener("click", (e) => {
    if (e.target === hideMoreBtn || (!musicList.contains(e.target) && e.target !== showMoreBtn)) {
        musicList.classList.remove("show");
    }
});


//# <ul> 清單內容
const ulTag = wrapper.querySelector("ul");
for (let i = 0; i < allMusic.length; i++){
    // pass allMusic's song name, artist to <li>
    let liTag = `<li li-index="${i + 1}">
                    <div class="row">
                        <span>${allMusic[i].name}</span>
                        <p>${allMusic[i].artist}</p>
                    </div>
                    <audio data-src="${allMusic[i].src}" src="./asset/music/${allMusic[i].src}" preload="metadata"></audio>
                    <span data-src="${allMusic[i].src}" class="audio-duration">0:00</span>
                </li>`;
    ulTag.insertAdjacentHTML("beforeend", liTag);

    let liAudioDuration = ulTag.querySelector(`span[data-src="${allMusic[i].src}"]`);
    let liAudioTag = ulTag.querySelector(`audio[data-src="${allMusic[i].src}"]`);

    liAudioTag.onloadedmetadata = () => {
        let audioDuration = liAudioTag.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if(totalSec < 10){
            totalSec = `0${totalSec}`;
        }
        liAudioDuration.innerText = `${totalMin}:${totalSec}`;
        liAudioDuration.setAttribute("t-duration", `${totalMin}:${totalSec}`);
    };
}

//# 增加 <li> 屬性: playing，表示該歌曲正在被播放
const allLiTag = ulTag.querySelectorAll("li");
// console.log(allLiTag); // 查看目清單中所有 <li>
function playingNow(){
    for (let j = 0; j < allLiTag.length; j++) {
        let audioTag = allLiTag[j].querySelector(".audio-duration")
        if(allLiTag[j].classList.contains("playing")){
            allLiTag[j].classList.remove("playing");
            audioTag.innerText = "";

            let adDuration = audioTag.getAttribute("t-duration");
            audioTag.innerText = adDuration;
        }
        if(allLiTag[j].getAttribute("li-index") == musicIndex){
            allLiTag[j].classList.add("playing");
            audioTag.innerText = "Playing";
        }
    
        allLiTag[j].setAttribute("onclick", "clicked(this)");
    }
}

//# 在清單中選擇歌曲播放
function clicked(element){
    let getLiIndex = element.getAttribute("li-index");
    musicIndex = getLiIndex;
    loadMusic(musicIndex);
    playMusic();
    playingNow();
}