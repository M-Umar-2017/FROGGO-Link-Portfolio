const links = document.querySelectorAll('.link-tile');
const status = document.querySelector('.window-status');

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

window.setInterval(() => {
  if (!status) return;
  status.textContent = status.textContent === '[ ONLINE ]' ? '[ READY ]' : '[ ONLINE ]';
}, 2400);
