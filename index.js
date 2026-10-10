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

document.querySelectorAll('.platform-icon img').forEach((icon) => {
  icon.addEventListener('error', () => {
    icon.hidden = true;
    icon.previousElementSibling?.classList.add('is-visible');
  }, { once: true });
});

updateTime();
window.setInterval(updateTime, 1000);
