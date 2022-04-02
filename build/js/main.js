const bntplay = document.querySelector("#btnPlay");
const btnPlayImg = document.querySelector("#btnPlayImg");
const audioProgressWrapper = document.querySelector("#audioProgressWrapper");
const audioProgressBar = document.querySelector("#audioProgressBar");
const audioProgress = document.querySelector("#audioProgress");
const audio = document.querySelector("#audio");
const audioTimeCurrent = document.querySelector("#audioTimeCurrent");
const audioTimeFull = document.querySelector("#audioTimeFull");

// console.log(document.querySelector("#audio"));

function getAudioDuration() {
  let dureationSeconds = Math.floor(audio.duration);
  let mins = Math.floor(dureationSeconds / 60);
  let seconds = Math.floor(audio.duration - mins * 60);
  if (mins < 10) {
    mins = "0" + mins;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return `${mins}:${seconds}`;
}

function getAudioCurrentTime() {
  let currentTime = audio.currentTime;
  let mins = Math.floor(currentTime / 60);
  let seconds = Math.floor(currentTime % 60);

  if (mins < 10) {
    mins = "0" + mins;
  }

  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return `${mins}:${seconds}`;
}

function audioPlay() {
  audio.classList.add("audio--active");
  btnPlayImg.src = `./img/icons/pause.svg`;
  audio.play();
}

function audioPause() {
  audio.classList.remove("audio--active");
  btnPlayImg.src = `./img/icons/play.svg`;

  audio.pause();
}

function audioProgressChange() {
  const { duration, currentTime } = audio;
  let audioProgressWidth = (currentTime / duration) * 100;
  audioProgress.style.width = `${audioProgressWidth}%`;
}

function audioSetProgress(event) {
  let width = audioProgressBar.clientWidth;
  let clickX = event.offsetX;
  let duration = audio.duration;
  console.log(width);
  audio.currentTime = (clickX / width) * duration;
}

// Show audio duration
setTimeout(() => {
  audioTimeFull.textContent = getAudioDuration();
}, 200);

bntplay.addEventListener("click", () => {
  let isAudioActive = audio.classList.contains("audio--active");
  if (isAudioActive) {
    audioPause();
  } else {
    audioPlay();
  }
});

audio.addEventListener("timeupdate", () => {
  audioTimeCurrent.textContent = getAudioCurrentTime();
  audioProgressChange();
});

audio.addEventListener("ended", () => {
  audioPause();
});

audioProgressWrapper.addEventListener("click", audioSetProgress);
