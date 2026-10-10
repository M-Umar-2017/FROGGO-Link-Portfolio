const timeDisplay = document.getElementById('time-display');

const updateTime = () => {
  if (!timeDisplay) return;
  timeDisplay.textContent = new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(new Date());
};

updateTime();
window.setInterval(updateTime, 1000);
