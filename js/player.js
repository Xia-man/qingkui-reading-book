document.addEventListener('DOMContentLoaded', function () {
  const audio = document.getElementById('audio');
  const btnPlay = document.getElementById('btn-play');
  const progressBar = document.getElementById('progress-bar');
  const progressFill = document.getElementById('progress-fill');
  const timeCurrent = document.getElementById('time-current');
  const timeTotal = document.getElementById('time-total');
  const discIcon = document.getElementById('disc-icon');

  let isPlaying = false;

  function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return m + ':' + (s < 10 ? '0' : '') + s;
  }

  function updatePlayIcon() {
    const svg = btnPlay.querySelector('svg');
    if (isPlaying) {
      svg.innerHTML = '<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>';
      discIcon.classList.add('playing');
    } else {
      svg.innerHTML = '<polygon points="8,5 19,12 8,19"/>';
      discIcon.classList.remove('playing');
    }
  }

  btnPlay.addEventListener('click', function () {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  });

  audio.addEventListener('play', function () {
    isPlaying = true;
    updatePlayIcon();
  });

  audio.addEventListener('pause', function () {
    isPlaying = false;
    updatePlayIcon();
  });

  audio.addEventListener('ended', function () {
    isPlaying = false;
    updatePlayIcon();
    progressFill.style.width = '0%';
  });

  audio.addEventListener('timeupdate', function () {
    if (audio.duration) {
      const pct = (audio.currentTime / audio.duration) * 100;
      progressFill.style.width = pct + '%';
      timeCurrent.textContent = formatTime(audio.currentTime);
    }
  });

  audio.addEventListener('loadedmetadata', function () {
    timeTotal.textContent = formatTime(audio.duration);
  });

  audio.addEventListener('durationchange', function () {
    timeTotal.textContent = formatTime(audio.duration);
  });

  progressBar.addEventListener('click', function (e) {
    if (!audio.duration) return;
    const rect = progressBar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = x / rect.width;
    audio.currentTime = pct * audio.duration;
  });

  let dragging = false;

  progressBar.addEventListener('touchstart', function (e) {
    dragging = true;
    seek(e.touches[0]);
  }, { passive: true });

  document.addEventListener('touchmove', function (e) {
    if (dragging) seek(e.touches[0]);
  }, { passive: true });

  document.addEventListener('touchend', function () {
    dragging = false;
  });

  function seek(touch) {
    if (!audio.duration) return;
    const rect = progressBar.getBoundingClientRect();
    let x = touch.clientX - rect.left;
    x = Math.max(0, Math.min(x, rect.width));
    const pct = x / rect.width;
    audio.currentTime = pct * audio.duration;
    progressFill.style.width = (pct * 100) + '%';
  }
});
