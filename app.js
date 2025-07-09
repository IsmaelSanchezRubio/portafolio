// Scroll suave para anclas de nav
document.querySelectorAll('#nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
    // marcar activo
    document.querySelectorAll('.nav-list a').forEach(a => a.classList.remove('active'));
    link.classList.add('active');
  });
});

// Intersection Observer para fade-in de secciones
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.section').forEach(sec => observer.observe(sec));

// Acordeones en móvil (si los necesitas)
// Usa estructura:
// <button class="acc-btn">Título</button>
// <div class="accordion-content">Contenido</div>
document.querySelectorAll('.acc-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const panel = btn.nextElementSibling;
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
    if (pageYOffset >= sectionTop - sectionHeight / 3) { // Ajusta el offset para una mejor activación
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
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
