// Scroll suave para anclas de nav
document.querySelectorAll("#nav a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    document
      .querySelector(link.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
    // Marcar activo: Elimina la clase 'active' de todos los enlaces y la añade al enlace clicado.
    document
      .querySelectorAll(".nav-list a")
      .forEach((a) => a.classList.remove("active"));
    link.classList.add("active");
  });
});

// Intersection Observer para fade-in de secciones
// Observa cada sección y añade la clase 'visible' cuando entra en el viewport.
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Una vez que la sección es visible, deja de observarla para optimizar el rendimiento.
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
); // El 20% de la sección debe ser visible para activar el efecto.

document.querySelectorAll(".section").forEach((sec) => observer.observe(sec));

// Resaltar la sección activa en la navegación al hacer scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-list a");

const highlightNavOnScroll = () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    // Determina qué sección está actualmente en el viewport o cerca de él.
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      // Ajusta el offset para una mejor activación
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    // Añade la clase 'active' al enlace de navegación correspondiente a la sección actual.
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
};

window.addEventListener("scroll", highlightNavOnScroll);
window.addEventListener("load", highlightNavOnScroll); // Para que se active al cargar la página

// Lógica para el botón "Volver al inicio"
const backToTopButton = document.querySelector(".back-to-top");

const toggleBackToTopButton = () => {
  // Si el scroll vertical es mayor a 300px, muestra el botón, de lo contrario, ocúltalo.
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
};

// Añadir el event listener para el click del botón "Volver al inicio"
backToTopButton.addEventListener("click", (e) => {
  e.preventDefault(); // Previene el comportamiento por defecto del enlace
  window.scrollTo({
    top: 0, // Desplaza la página al principio (coordenada Y = 0)
    behavior: "smooth", // Hace el desplazamiento suave
  });
});

window.addEventListener("scroll", toggleBackToTopButton);
window.addEventListener("load", toggleBackToTopButton); // Para que se active al cargar la página si ya hay scroll

// LÓGICA ACTUALIZADA: Efecto de ocultación para el Header
const header = document.getElementById("header");
let lastScrollY = 0; // Para rastrear la posición de desplazamiento anterior
const scrollHideThreshold = 50; // Umbral de scroll para ocultar el header al desplazarse hacia abajo
const showAtTopThreshold = 100; // Umbral de scroll para mostrar el header solo al inicio de la página

const handleHeaderScroll = () => {
  const currentScrollY = window.pageYOffset;

  // Si estamos haciendo scroll hacia abajo Y hemos pasado el umbral de ocultación, ocultamos el header.
  if (currentScrollY > lastScrollY && currentScrollY > scrollHideThreshold) {
    header.classList.add("hidden");
  }
  // Si estamos muy cerca del principio de la página (dentro del umbral de mostrar), mostramos el header.
  // Esto cubrirá tanto el scroll hacia arriba que llega al inicio como la carga inicial de la página.
  else if (currentScrollY < showAtTopThreshold) {
    header.classList.remove("hidden");
  }

  lastScrollY = currentScrollY; // Actualiza la última posición de scroll
};

// Añade los event listeners para el scroll y la carga de la página.
window.addEventListener("scroll", handleHeaderScroll);
window.addEventListener("load", handleHeaderScroll); // Para aplicar el estilo si la página se carga con scroll.