document.addEventListener('DOMContentLoaded', function() {
  const video = document.getElementById('myVideo');
  const scrollStep = 0.5; // Количество секунд для перемотки при скролле

  window.addEventListener('wheel', function(event) {
      event.preventDefault();
      if (event.deltaY > 0) {
          // Скролл вниз - перемотка вперед
          video.currentTime += scrollStep;
      } else {
          // Скролл вверх - перемотка назад
          video.currentTime -= scrollStep;
      }
  }, { passive: false });
});