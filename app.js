// Scroll suave para anclas de nav
document.querySelectorAll('#nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
    // Marcar activo: Elimina la clase 'active' de todos los enlaces y la añade al enlace clicado.
    document.querySelectorAll('.nav-list a').forEach(a => a.classList.remove('active'));
    link.classList.add('active');
  });
});

// Intersection Observer para fade-in de secciones
// Observa cada sección y añade la clase 'visible' cuando entra en el viewport.
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Una vez que la sección es visible, deja de observarla para optimizar el rendimiento.
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 }); // El 20% de la sección debe ser visible para activar el efecto.

document.querySelectorAll('.section').forEach(sec => observer.observe(sec));

// Acordeones en móvil (si los necesitas)
// Usa estructura:
// <button class="acc-btn">Título</button>
// <div class="accordion-content">Contenido</div>
document.querySelectorAll('.acc-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const panel = btn.nextElementSibling;
    // Alterna la altura máxima del panel para mostrar/ocultar el contenido.
    panel.style.maxHeight = panel.style.maxHeight ? null : panel.scrollHeight + 'px';
  });
});

// Resaltar la sección activa en la navegación al hacer scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-list a');

const highlightNavOnScroll = () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    // Determina qué sección está actualmente en el viewport o cerca de él.
    if (pageYOffset >= sectionTop - sectionHeight / 3) { // Ajusta el offset para una mejor activación
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    // Añade la clase 'active' al enlace de navegación correspondiente a la sección actual.
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active');
    }
  });
};

window.addEventListener('scroll', highlightNavOnScroll);
window.addEventListener('load', highlightNavOnScroll); // Para que se active al cargar la página

// Lógica para el botón "Volver al inicio"
const backToTopButton = document.querySelector('.back-to-top');

const toggleBackToTopButton = () => {
  // Si el scroll vertical es mayor a 300px, muestra el botón, de lo contrario, ocúltalo.
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add('show');
  } else {
    backToTopButton.classList.remove('show');
  }
};

window.addEventListener('scroll', toggleBackToTopButton);
window.addEventListener('load', toggleBackToTopButton); // Para que se active al cargar la página si ya hay scroll

// NUEVA LÓGICA: Efecto "pegajoso" y de contracción para el Header
const header = document.getElementById('header');
const scrollThreshold = 50; // Define la cantidad de scroll (en píxeles) para activar el efecto.

const handleHeaderScroll = () => {
  // Si el scroll vertical es mayor que el umbral, añade la clase 'scrolled' al header.
  // De lo contrario, quita la clase.
  if (window.pageYOffset > scrollThreshold) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
};

// Añade los event listeners para el scroll y la carga de la página.
window.addEventListener('scroll', handleHeaderScroll);
window.addEventListener('load', handleHeaderScroll); // Para aplicar el estilo si la página se carga con scroll.
