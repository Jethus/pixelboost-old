const header = document.getElementById("header");
const fadeInElements = document.querySelectorAll(".fade-in");
const mobileNav = document.getElementById("nav-menu");

// Utility function to initialize or wait for animations
const initializeFadeIn = () => {
  if (sessionStorage.getItem("preloaderSeen")) {
    fadeInElements.forEach((element) => observer.observe(element));
  } else {
    document.addEventListener("preloaderDone", () => {
      fadeInElements.forEach((element) => observer.observe(element));
    });
  }
};
// triggers "scroll" class on #header
document.body.addEventListener("scroll", () => {
  if (document.body.scrollTop > 0) {
    header.classList.toggle("scrolled");
  } else {
    header.classList.toggle("scrolled");
  }
});

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

initializeFadeIn();
