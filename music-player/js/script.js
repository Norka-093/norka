const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"),
musicName = wrapper.querySelector(".song-detial .name"),
musicArtist = wrapper.querySelector(".song-detial .artist"),
mainAudio = wrapper.querySelector("#main-audio"),
playPauseBtn = wrapper.querySelector(".play-pause"),
prevBtn = wrapper.querySelector("#prev"),
nextBtn = wrapper.querySelector("#next");


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
// 43:08