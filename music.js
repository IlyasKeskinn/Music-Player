class Music {
    constructor(title, singer, image, file) {
        this.title = title,
            this.singer = singer,
            this.image = image,
            this.file = file
    }

    getName() {
        let name = `${this.title} - ${this.singer}`
        return name;
    }
}

const musicList =[
    new Music("Dream On", "Morgan James" ,"1.jpeg", "1.mp3"),
    new Music("Ain't No Sunshine", "Evrencan Gündüz" ,"2.jpeg", "2.mp3"),
    new Music("Ağlama Ben Ağlarım", "Can Ozan" ,"3.jpeg", "3.mp3"),
];