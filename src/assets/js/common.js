const header = document.getElementById("header");
const fadeInElements = document.querySelectorAll(".fade-in");
const mobileNav = document.getElementById("nav-menu");
let lastScrollY = 0;

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

// Throttle function to limit the rate of execution
const throttle = (func, limit) => {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

const handleScroll = () => {
  const currentScrollY = window.scrollY;
  if (currentScrollY > lastScrollY) {
    header.classList.add("scrolledDown");
    console.log("added scrolledDown");
  } else if (currentScrollY < lastScrollY) {
    header.classList.remove("scrolledDown");
    console.log("removed scrolledDown");
  }
  lastScrollY = currentScrollY;
};

initializeFadeIn();
window.addEventListener("scroll", throttle(handleScroll, 50));
