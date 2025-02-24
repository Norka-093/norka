const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"),
musicName = wrapper.querySelector(".song-detial .name"),
musicArtist = wrapper.querySelector(".song-detial .artist");

let musicIndex = 1;

window.addEventListener("load", () => {
    loadMusic(musicIndex); // call load-music-function once windows loaded
})

// load-music-function
function loadMusic(indexNumb){
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
}
