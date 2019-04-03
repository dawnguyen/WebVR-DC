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

  document.querySelector('#open').addEventListener('click', function(e) {
    document.querySelector('#open').emit('button-clicked');
    document.querySelector('#center').emit('button-clicked');
    document.querySelector('#button-text').emit('button-clicked');
    document.querySelector('#close').emit('button-clicked');
    document.querySelector('#close-text').emit('button-clicked');
    document.querySelector('#earth').emit('button-clicked');
    document.querySelector('#roomlight').emit('button-clicked');
      document.querySelector('#hudlight').emit('button-clicked');
  });
  document.querySelector('#close').addEventListener('click', function(e) {
    document.querySelector('#center').emit('close');
    document.querySelector('#open').emit('close');
    document.querySelector('#button-text').emit('close');
    document.querySelector('#close').emit('close');
    document.querySelector('#close-text').emit('close');
    document.querySelector('#earth').emit('close');
    document.querySelector('#roomlight').emit('close');
    document.querySelector('#hudlight').emit('close');
  });
});
