document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.stats-track');
  const dots = document.querySelectorAll('.dot');
  let currentSlide = 0;
  let autoplayInterval;

  function updateCarousel() {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % dots.length;
    updateCarousel();
  }

  function startAutoplay() {
    // Vérifie si l'écran est en mode mobile (< 768px)
    if (window.innerWidth <= 768) {
      autoplayInterval = setInterval(nextSlide, 3000);
    }
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  // Démarrer l'autoplay
  startAutoplay();

  // Arrêter l'autoplay au toucher ou au clic
  track.addEventListener('touchstart', stopAutoplay);
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      stopAutoplay();
      currentSlide = Array.from(dots).indexOf(dot);
      updateCarousel();
    });
  });

  // Support tactile
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  });

  track.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentSlide < dots.length - 1) {
        currentSlide++;
      } else if (diff < 0 && currentSlide > 0) {
        currentSlide--;
      }
      updateCarousel();
    }
  });

  // Redémarrer l'autoplay quand l'utilisateur ne touche plus le carrousel
  track.addEventListener('touchend', () => {
    setTimeout(startAutoplay, 3000);
  });

  // Mettre à jour l'autoplay lors du redimensionnement de la fenêtre
  window.addEventListener('resize', () => {
    stopAutoplay();
    startAutoplay();
  });
});