const fullscreenBtn = document.getElementById('fullscreen-btn');

fullscreenBtn.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
      .then(() => {
        fullscreenBtn.textContent = 'Exit Fullscreen';
      })
      .catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
  } else {
    document.exitFullscreen()
      .then(() => {
        fullscreenBtn.textContent = 'Go Fullscreen';
      })
      .catch((err) => {
        console.error(`Error attempting to exit fullscreen: ${err.message}`);
      });
  }
});