const header = document.getElementById("header");
const fadeInElements = document.querySelectorAll(".fade-in");
const mobileNav = document.getElementById("nav-menu");
const SCROLL_THRESHOLD = 200;
let lastScrollY = window.scrollY;
let ticking = false;

const observerOptions = {
  root: null, // Observe changes in the viewport
  rootMargin: "0px", // No margin around the root
  threshold: 0.2, // 20% of the element must be visible to trigger the callback
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target); // Stop observing once visible
    }
  });
}, observerOptions);

// Utility function to initialize or wait for animations
const initializeFadeIn = () => {
  fadeInElements.forEach((element) => observer.observe(element));
};

const handleScroll = () => {
  const currentScrollY = window.scrollY;
  const scrollDelta = currentScrollY - lastScrollY;

  if (Math.abs(scrollDelta) > SCROLL_THRESHOLD) {
    if (scrollDelta > 0) {
      header.classList.add("scrolledDown");
    } else {
      header.classList.remove("scrolledDown");
    }

    lastScrollY = currentScrollY;
  }

  ticking = false;
};

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(handleScroll);
    ticking = true;
  }
});

initializeFadeIn();
