let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds){
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  //console.log(now,then);
  countdown = setInterval(()=>{
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // check if we should stop it!
    if (secondsLeft < 0){
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

timer(3000);

function displayTimeLeft(seconds){
  const minutes = Math.floor(seconds / 60);
  console.log({minutes});
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds.toString().padStart(2, '0')}`;
  timerDisplay.textContent = display;
  document.title = display;
  console.log({minutes, remainderSeconds});
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  endTime.textContent = `Be back at ${hour > 12? hour - 12: hour}:${minutes.toString().padStart(2, '0')}`;
}

function startTimer(){
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
  console.log(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer ));

document.customForm.addEventListener('submit', function(e){
  e.preventDefault();
  const mins = parseInt(this.minutes.value);
  if (mins) {
    timer(mins*60);
  }
  this.reset();
});