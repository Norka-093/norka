//# 播放器
document.addEventListener("DOMContentLoaded", () => {
    const wrapper1 = document.querySelector("#wrapper-1");
    const wrapper2 = document.querySelector("#wrapper-2");

    const musicLists = {
        wrapper1: allMusic1,  // 對應音樂清單 1
        wrapper2: allMusic2   // 對應音樂清單 2
    };

    // 處理每個 wrapper 的音樂播放邏輯
    const handleMusicWrapper = (wrapper, musicList) => {
        const musicImg = wrapper.querySelector(".img-area img"),
              musicName = wrapper.querySelector(".song-detial .name"),
              musicArtist = wrapper.querySelector(".song-detial .artist"),
              mainAudio = wrapper.querySelector("#main-audio"),
              playPauseBtn = wrapper.querySelector(".play-pause"),
              prevBtn = wrapper.querySelector("#prev"),
              nextBtn = wrapper.querySelector("#next"),
              progressBar = wrapper.querySelector(".progress-bar"),
              progressArea = wrapper.querySelector(".progress-area"),
              musicListElement = wrapper.querySelector(".music-list"),
              showMoreBtn = wrapper.querySelector("#more-music"),
              hideMoreBtn = musicListElement.querySelector("#close"),
              repeatBtn = wrapper.querySelector("#repeat");

        // 產生 musicList.length 之間的隨機整數
        let musicIndex = Math.floor(Math.random() * musicList.length) + 1;

        // 載入音樂
        function loadMusic(indexNumb) {
            let musicData = musicList[indexNumb - 1];
            musicName.innerText = musicData.name;
            musicArtist.innerText = musicData.artist;
            musicImg.src = `./asset/img/${musicData.img}`;
            mainAudio.src = `./asset/music/${musicData.src}`;
        
            // 等待音樂完全載入後再播放
            mainAudio.onloadstart = () => {
                // 防止加載中進行播放操作
                if (wrapper.classList.contains("paused")) {
                    playMusic();
                }
            };
        
            // 防止中途換歌時發生播放中斷
            mainAudio.oncanplaythrough = () => {
                // 確保音樂可播放後再執行播放
                if (wrapper.classList.contains("paused")) {
                    playMusic();
                }
            };
        
            // 如果音樂正在播放，先暫停並重置
            if (!mainAudio.paused) {
                mainAudio.pause();
                mainAudio.currentTime = 0;
            }
        }

        // 播放音樂
        function playMusic() {
            // 確保只有在音樂已經完全加載後才播放
            if (mainAudio.readyState >= 3) {
                wrapper.classList.add("paused");
                mainAudio.play().catch((error) => {
                    console.error('播放音樂時發生錯誤: 當前歌曲尚未播放完全而被切換歌曲', error);
                });
                playPauseBtn.querySelector("span").textContent = "pause";
            }
        }

        // 暫停音樂
        function pauseMusic() {
            wrapper.classList.remove("paused");
            mainAudio.pause();
            playPauseBtn.querySelector("span").textContent = "play_arrow";
        }

        // 切換播放狀態
        playPauseBtn.addEventListener("click", () => {
            wrapper.classList.contains("paused") ? pauseMusic() : playMusic();
            playingNow();
        })

        // 切換下一首音樂
        function nextMusic() {
            musicIndex = (musicIndex % musicList.length) + 1;
            loadMusic(musicIndex);
            playMusic();
            playingNow();
        }

        // 切換上一首音樂
        function prevMusic() {
            musicIndex = musicIndex - 1 === 0 ? musicList.length : musicIndex - 1;
            loadMusic(musicIndex);
            playMusic();
            playingNow();
        }

        nextBtn.addEventListener("click", nextMusic);
        prevBtn.addEventListener("click", prevMusic);

        // 更新進度條
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

        // 循環按鈕控制
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
                    let randIndex = Math.floor(Math.random() * musicList.length) + 1;
                    musicIndex = randIndex;
                    loadMusic(musicIndex);
                    playMusic();
                    playingNow();
                    break;
            }
        });

       //# 顯示播放清單
        showMoreBtn.addEventListener("click", () => musicListElement.classList.toggle("show"));

        //# 隱藏播放清單（點擊關閉按鈕或點擊外部區域）
        document.addEventListener("click", (e) => {
            if (e.target === hideMoreBtn || (!musicListElement.contains(e.target) && e.target !== showMoreBtn)) {
                musicListElement.classList.remove("show");
            }
        });

        //# 清單內容 <ul> 更新
        const ulTag = wrapper.querySelector("ul");
        musicList.forEach((music, i) => {
            let liTag = `<li li-index="${i + 1}">
                            <div class="row">
                                <span>${music.name}</span>
                                <p>${music.artist}</p>
                            </div>
                            <audio data-src="${music.src}" src="./asset/music/${music.src}" preload="metadata"></audio>
                            <span data-src="${music.src}" class="audio-duration">0:00</span>
                        </li>`;
            ulTag.insertAdjacentHTML("beforeend", liTag);

            let liAudioDuration = ulTag.querySelector(`span[data-src="${music.src}"]`);
            let liAudioTag = ulTag.querySelector(`audio[data-src="${music.src}"]`);

            liAudioTag.onloadedmetadata = () => {
                let audioDuration = liAudioTag.duration;
                let totalMin = Math.floor(audioDuration / 60);
                let totalSec = Math.floor(audioDuration % 60);
                if (totalSec < 10) totalSec = `0${totalSec}`;
                liAudioDuration.innerText = `${totalMin}:${totalSec}`;
                liAudioDuration.setAttribute("t-duration", `${totalMin}:${totalSec}`);
            };
        });

        //# 顯示當前播放的歌曲 (增加 <li> 屬性: playing)
        const allLiTag = ulTag.querySelectorAll("li");
        function playingNow(){
            allLiTag.forEach((li, j) => {
                let audioTag = li.querySelector(".audio-duration");
                if (li.classList.contains("playing")) {
                    li.classList.remove("playing");
                    audioTag.innerText = "";
                    let adDuration = audioTag.getAttribute("t-duration");
                    audioTag.innerText = adDuration;
                }
                if (li.getAttribute("li-index") == musicIndex) {
                    li.classList.add("playing");
                    audioTag.innerText = "Playing";
                }
                // <li> click events
                li.addEventListener("click", () => clicked(li));
            });
        };

        //# 在清單中選擇歌曲播放
        function clicked(element){
            let getLiIndex = element.getAttribute("li-index");
            musicIndex = getLiIndex;
            loadMusic(musicIndex);
            playingNow();
            playMusic();
        };

        // 初始化
        loadMusic(musicIndex);
        playMusic();
        playingNow();
    };

    // 處理各個 wrapper 的邏輯
    handleMusicWrapper(wrapper1, musicLists.wrapper1);
    handleMusicWrapper(wrapper2, musicLists.wrapper2);
});