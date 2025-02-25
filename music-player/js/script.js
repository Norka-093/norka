const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"),
musicName = wrapper.querySelector(".song-detial .name"),
musicArtist = wrapper.querySelector(".song-detial .artist"),
mainAudio = wrapper.querySelector("#main-audio"),
playPauseBtn = wrapper.querySelector(".play-pause"),
prevBtn = wrapper.querySelector("#prev"),
nextBtn = wrapper.querySelector("#next"),
progressBar = wrapper.querySelector(".progress-bar"),
progressArea = wrapper.querySelector(".progress-area");


// 產生 1 ~ 5 之間的隨機整數
const randomNumber = Math.floor(Math.random() * 5) + 1;

let musicIndex = randomNumber;
// let musicIndex = 4;


window.addEventListener("load", () => {
    loadMusic(musicIndex); // call load-music-function once windows loaded
});

//# load-music-function
function loadMusic(indexNumb){
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    musicImg.src = `./asset/img/${allMusic[indexNumb - 1].img}`;
    mainAudio.src = `./asset/music/${allMusic[indexNumb - 1].src}`;
}

//# play-music-function
function playMusic(){
    wrapper.classList.add("paused");
    mainAudio.play();
    playPauseBtn.querySelector("span").innerText = "pause";
}
//# pause-music-function
function pauseMusic(){
    wrapper.classList.remove("paused");
    mainAudio.pause();
    playPauseBtn.querySelector("span").innerText = "play_arrow";    
}


//# Play & Pause Btn event
playPauseBtn.addEventListener("click", () => {
    const isMusicPaused = wrapper.classList.contains("paused");
    // if isMusicPaused is true than call isMusicPaused else call playMusic
    isMusicPaused ? pauseMusic() : playMusic();
});


//# next-music-function
function nextMusic(){
    musicIndex ++;
    // if musicIndex is > array length than musicIndex = 1 and play frist song
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}
//# prev-music-function
function prevMusic(){
    musicIndex --;
    // if musicIndex is <  1 than musicIndex = array length and play last song
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

nextBtn.addEventListener("click", () =>{
    nextMusic();
});
prevBtn.addEventListener("click", () =>{
    prevMusic();
});

//# progress bar with music current time
mainAudio.addEventListener("timeupdate", (e) => {
    // console.log(e); // 查看目前音樂撥放進度 ( currentTime 、 duration)
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration) *100;
    progressBar.style.width = `${progressWidth}%`;

    let musicCurrentTime = wrapper.querySelector(".current");
    musicDuration = wrapper.querySelector(".duration");

    mainAudio.addEventListener("loadeddata", () => {
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
    if(currentSec < 10){
        // 若 currentSec 數值小於 10 ，在其前面加上 "0"
        currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

//# 移動控制 progressArea > progress-bar
progressArea.addEventListener("click", (e) => {
    let progressWidthVal = progressArea.clientWidth; // 進度條長度
    let clickedOffSetX = e.offsetX;                  // X軸數值
    let songDuration = mainAudio.duration;           // 歌曲總時間

    mainAudio.currentTime = (clickedOffSetX / progressWidthVal) * songDuration;
    playMusic();
});

//# 循環按鈕控制
const repeatBtn = wrapper.querySelector("#repeat");
repeatBtn.addEventListener("click", () => {
    let getText = repeatBtn.innerText;
    switch(getText){
        // 改變 repeat icon : repeat -> repeat_one
        case "repeat":
        repeatBtn.innerText = "repeat_one";
        break;

        // 改變 repeat icon : repeat_one -> repeat
        case "repeat_one":
        repeatBtn.innerText = "repeat";
        break;
    }
    // 56:55
});