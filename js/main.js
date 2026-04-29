document.addEventListener('DOMContentLoaded', () => {
  // Variables del menú
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  // Variables del botón sorpresa
  const btnSorpresa = document.getElementById('btn-interactivo');
  const mensaje = document.getElementById('mensaje-sorpresa');

  // Mensajes sorpresa
  const mensajes = [
    "¡Sigue brillando como el código más limpio! ✨",
    "¡Hoy es un gran día para programar algo genial! 💻💡",
    "¡Nunca subestimes tu poder de crear! 🚀",
    "¡Una mente creativa puede cambiar el mundo! 🌎💖",
    "¡Tu pasión te llevará lejos! 🌈🔥",
    "¡Café y código: la combinación perfecta! ☕👩‍💻",
    "¡Recuerda que puedes con todo! 💪😊"
  ];

  // Toggle menú responsive
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });

  // Mostrar mensaje sorpresa con animación
  btnSorpresa.addEventListener('click', () => {
    const indice = Math.floor(Math.random() * mensajes.length);
    mensaje.textContent = mensajes[indice];
    mensaje.style.opacity = 0;
    mensaje.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
      mensaje.style.opacity = 1;
    }, 100);
  });
});
