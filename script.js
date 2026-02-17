const title = document.getElementById("title");
const artist = document.getElementById("artist");
const audio = document.getElementById("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");
const volume = document.getElementById("volume");
const playlist = document.getElementById("playlist");

const songs=[
    {
        title:"song one", 
        artist:"artist A",
        src:"music/song1.mp3"

    },
    {
        title:"song two", 
        artist:"artist B",
        src:"music/song2.mp3"
    }
];
let songIndex = 0;
function loadSong(index){ /*takes the number then find it in the array */
    const song = songs[index]
    title.textContent = song.title;
    audio.src = song.src;
    artist.textContent = song.artist;

}

function togglePlay(){
    if(audio.paused){
        audio.play();
} else{
    audio.pause();
}
}
function nextSong(){
    songIndex++;
    if (songIndex>= songs.length){
        songIndex = 0;
    }
    loadSong(songIndex);/*load new song info*/

    audio.play();/*for playing the new song*/

}

function prevSong(){
    songIndex--;
    if (songIndex<0){
        songIndex= songs.length -1 ;
    }
    loadSong(songIndex);
    audio.play();
}

audio.addEventListener("timeupdate", () =>{ /* it updates the song time */
    if(!audio.duration)return; /*when the song first loads the duration is now readyso if this happen it stop and do nothing*/
    const percent=(audio.currentTime / audio.duration) * 100;/*this shows how much of the song has played*/
    progress.style.width=percent+"%";
    currentTime.textContent= formatTime(audio.currentTime);/*this will change the played time from second to the minutes and second*/
    duration.textContent = formatTime(audio.duration);/*this will change the song time from second to the minutes and second*/

});

function formatTime(time){
    const minutes= Math.floor(time / 60);
    const seconds= Math.floor(time % 60)
        .toString()
        .padStart(2, "0");/* it adds a zero in front of small numbers so the time will looks correct*/
    return `${minutes}:${seconds}`;
}

progressContainer.addEventListener("click",(e) =>{ /*it is for when user clicks on the progress bar so this will run*/
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    audio.currentTime = (clickX/width)* audio.duration;
})

volume.addEventListener("input", ()=> {
    audio.volume = volume.value ;
})

audio.addEventListener("ended", nextSong);
loadSong(songIndex);

