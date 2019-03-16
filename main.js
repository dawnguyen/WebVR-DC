document.addEventListener('DOMContentLoaded', function() {
  const scene = document.querySelector('a-scene');
  const splash = document.querySelector('#splash');
  const loading = document.querySelector('#splash .loading');
  const startButton = document.querySelector('#splash .start-button');

  const creditsToggle = document.querySelector('#splash .show-credits');
  const creditsList = document.querySelector('#splash .credits-list');

  const emitEvent = (eventName, listeners) => {
    listeners.forEach((listener) => {
      const el = document.querySelector(listener);
      el.emit(eventName);
    })
  };

  const emitMediaEvent = (eventType, listeners) => {
    listeners.forEach((listener) => {
      const el = document.querySelector(listener);
      el.components.sound[eventType]();
    })
  };

  const activateSoundsForTouch = () => {
    const sounds = document.querySelectorAll('a-sound')
    sounds.forEach((soundEl) => {
      soundEl.components.sound.playSound();
      soundEl.components.sound.stopSound();
    })
  };

  scene.addEventListener('loaded', function(e) {
    setTimeout(() => {
      loading.style.display = 'none';
      splash.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
      startButton.style.opacity = 1;
      creditsToggle.style.opacity = 1;
    }, 50);
  });

  creditsToggle.addEventListener('click', function(e) {
    e.preventDefault();

    var display = creditsList.style.display === 'none' ||
      creditsList.style.display === '' ? 'block' : 'none';

    creditsList.style.display = display;

    return false;
  });

  startButton.addEventListener('click', function(e) {
    activateSoundsForTouch();
    splash.style.display = 'none';
  });
  document.querySelector('#button').addEventListener('mouseover', function(e) {
    document.querySelector('#button').emit('button-hover');
    document.querySelector('#button-text').emit('button-hover');
  });
  document.querySelector('#button').addEventListener('click', function(e) {
    document.querySelector('#button').emit('button-clicked');
    document.querySelector('#video').emit('button-clicked');
    document.querySelector('#button-text').emit('button-clicked');
    document.querySelector('#close-video').emit('button-clicked');
    document.querySelector('#close-text').emit('button-clicked');
  });
  document.querySelector('#close-video').addEventListener('click', function(e) {
    document.querySelector('#button').emit('close');
    document.querySelector('#video').emit('close');
    document.querySelector('#button-text').emit('close');
    document.querySelector('#close-video').emit('close');
    document.querySelector('#close-text').emit('close');
  });
});
