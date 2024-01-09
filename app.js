const player = new MusicPlayer(musicList);

const ui = new UI();

window.addEventListener("load", () => {
    let music = player.getMusic();
    ui.displayMusic(music);
    ui.displayMusicList(musicList);
    isPlayingMusic();
});


ui.playBtn.addEventListener("click", function () {
    const isPlayed = ui.container.classList.contains("playing");
    isPlayed == true ? pauseMusic() : playMusic();

})
const prevMusic = () => {
    player.previousMusic();
    let music = player.getMusic();
    ui.displayMusic(music);
    playMusic();
    isPlayingMusic();
}

const nextMusic = () => {
    player.nextMusic();
    let music = player.getMusic();
    ui.displayMusic(music);
    playMusic();
    isPlayingMusic();
}

ui.prevBtn.addEventListener("click", prevMusic)



ui.nextBtn.addEventListener("click", nextMusic)


function pauseMusic() {
    ui.container.classList.remove("playing");
    ui.playBtn.querySelector("i").classList = "fa-solid fa-play";
    ui.music_audio.pause();


}

function playMusic() {
    ui.container.classList.add("playing");
    ui.playBtn.querySelector("i").classList = "fa-solid fa-pause"
    ui.music_audio.play();
}

ui.music_audio.addEventListener("loadedmetadata", () => {
    let time = calculateTime(ui.music_audio.duration);
    ui.music_time.textContent = time;
    ui.music_range.max = Math.floor(ui.music_audio.duration);

})

ui.music_audio.addEventListener("timeupdate", () => {
    ui.music_range.value = ui.music_audio.currentTime;
    ui.current_time.textContent = calculateTime(ui.music_audio.currentTime);
})

ui.music_range.addEventListener("input", () => {
    ui.current_time.textContent = calculateTime(ui.music_range.value);
    ui.music_audio.currentTime = ui.music_range.value;
})

function calculateTime(seconds) {
    let minute = Math.floor(seconds / 60);
    let remainSecond = Math.floor(seconds % 60);
    let updateSecond = remainSecond < 10 ? `0${remainSecond}` : `${remainSecond}`;
    let time = `${minute}:${updateSecond}`;
    return time;
}


ui.sound_volume.addEventListener("input", (e) => {
    const value = e.target.value;
    ui.music_audio.volume = value / 100;

    if (value == 0) {
        muteVolume();
    }
    else {
        unmuteVolume();
    }
})

let isMuted = false;
ui.volumeBtn.addEventListener("click", () => {
    if (isMuted) {
        unmuteVolume();
        ui.sound_volume.value = 50;
    }
    else {
        muteVolume();
        ui.sound_volume.value = 0;
    }
})
function muteVolume() {
    ui.music_audio.muted = true;
    ui.volumeBtn.classList = "fa-solid fa-volume-xmark"
    isMuted = true;
}
function unmuteVolume() {
    ui.music_audio.muted = false;
    ui.volumeBtn.classList = "fa-solid fa-volume-high"
    isMuted = false;
}

const selectedMusic = (li) => {
    player.index = li.getAttribute("li-index");
    ui.displayMusic(player.getMusic());
    playMusic();
    isPlayingMusic();
}


const isPlayingMusic = () => {
    for (let li of ui.music_listUl.querySelectorAll("li")) {
        if (li.classList.contains("selected-music")) {
            li.classList.remove("selected-music")
        }
        if (li.getAttribute("li-index") == player.index) {
            li.classList.add("selected-music");
        }
    }
}

let loop = false

ui.repeatBtn.addEventListener("click", () => {
    loop = !loop;
    if (loop == true) {
        ui.repeatBtn.classList.add("active")
    }else{
        ui.repeatBtn.classList.remove("active")
    }
})

ui.music_audio.addEventListener("ended", () => {
    if (loop) {
        playMusic();
    }
    else {
        nextMusic();
    }
})