document.querySelectorAll('.platform-icon img').forEach((icon) => {
  icon.addEventListener('error', () => {
    icon.hidden = true;
    icon.previousElementSibling?.classList.add('is-visible');
  }, { once: true });
});
