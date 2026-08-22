const links = document.querySelectorAll('.link-tile');
const status = document.querySelector('.window-status');
const timeDisplay = document.getElementById('time-display');

links.forEach((link) => {
  link.addEventListener('pointerdown', () => {
    link.classList.add('is-opening');
  });

  link.addEventListener('pointerup', () => {
    window.setTimeout(() => link.classList.remove('is-opening'), 180);
  });

  link.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      link.classList.add('is-opening');
      window.setTimeout(() => link.classList.remove('is-opening'), 180);
    }
  });
});

const updateTime = () => {
  if (!timeDisplay) return;
  const now = new Date();
  const time = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
  timeDisplay.textContent = `${time} // ${now.getFullYear()}`;
};

updateTime();
window.setInterval(updateTime, 1000);

window.setInterval(() => {
  if (!status) return;
  status.textContent = status.textContent === '[ ONLINE ]' ? '[ READY ]' : '[ ONLINE ]';
}, 2400);
