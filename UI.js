class UI {
    constructor() {
        this.container = document.querySelector(".container");
        this.image = document.getElementById("music_image");
        this.music_audio = document.getElementById("music_audio");
        this.music_title = document.getElementById("music_title");
        this.music_singer = document.getElementById("music_singer");
        this.prevBtn = document.getElementById("prev");
        this.nextBtn = document.getElementById("next");
        this.playBtn = document.getElementById("play");
        this.music_range = document.getElementById("music_range");
        this.current_time = document.querySelector(".current_time");
        this.music_time = document.querySelector(".music_time");
        this.sound_volume = document.getElementById("sound_volume");
        this.volumeBtn = document.getElementById("volumeBtn");
        this.music_listUl = document.getElementById("music_list");
        this.repeatBtn = document.querySelector(".repeat-button");
    }

    displayMusic(music) {
        this.image.src = "img/" + music.image;
        this.music_audio.src = "mp3/" + music.file;
        this.music_title.innerText = music.title
        this.music_singer.innerText = music.singer
    }

    displayMusicList(list) {

        for (let i = 0; i < list.length; i++) {
            let li = `
                <li li-index=${i} onclick = "selectedMusic(this)" class=" list-group-item d-flex justify-content-between align-items-center">
                    <span>${list[i].getName()}</span>
                    <span id="music-${i}" class="badge bg-primary">2:30</span>
                    <audio class="music-${i}" id="music_audio" src="mp3/${list[i].file}"></audio>
                </li>
                `
            this.music_listUl.insertAdjacentHTML("beforeend", li);

            let liDurationTime = this.music_listUl.querySelector(`#music-${i}`);
            let liAudioTag = this.music_listUl.querySelector(`.music-${i}`);

            liAudioTag.addEventListener("loadedmetadata", () => {
                let time = calculateTime(liAudioTag.duration);
                liDurationTime.textContent = time;
            })
        }

    }
}