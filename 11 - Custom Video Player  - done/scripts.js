// get our elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// build out functions
function togglePlay() {
  video.paused? video.play(): video.pause();
}

function updateButton(e) {
  const icon = this.paused? '►' : '❚ ❚';
  toggle.textContent = icon;
  console.log('Update the button');
}

function skip(e) {
  const amount = +this.dataset.skip;
  video.currentTime += amount;
  console.log('skipping');
}

function handleRangeUpdate(e) {
  console.log(this.value);
  console.log(this.name);
  video[this.name] = this.value;
}

function handleProgress(e) {
  const percentComplete = video.currentTime/video.duration * 100;
  progressBar.style.flexBasis = `${percentComplete}%`;
}

function scrub(e) {
  //debugger;
  const percent = e.offsetX/video.videoWidth;
  const scrubTime = video.duration * percent;
  video.currentTime = scrubTime;
  console.log(e);
}

// hook up event listeners
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
progress.addEventListener('mouseup', (e) => mousedown && scrub(e));


skipButtons.forEach(button => {
  button.addEventListener('click', skip);
});

ranges.forEach(range => {
  range.addEventListener('change', handleRangeUpdate);
});
