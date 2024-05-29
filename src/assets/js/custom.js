document.addEventListener("DOMContentLoaded", function () {
  const accordionContainer = document.querySelector(".accordion");
  const accordionButtons = document.querySelectorAll(".accordion button");
  const tabContainer = document.querySelector(".tab-container");
  const tabContents = document.querySelectorAll(".tab-content");
  const header = document.getElementById("header");
  const fadeInElements = document.querySelectorAll("*");

  elements = {};

  const checkExistence = (selector) => {
    const element = document.querySelector(selector);
    if (element) {
      elements[selector] = element;
    }
  };

  checkExistence(".accordion");
  checkExistence(".accordion button");
  checkExistence(".tab-container");
  checkExistence(".tab-content");
  checkExistence("#header");

  console.log(elements);

  // sliding accordion
  accordionContainer.addEventListener("click", (e) => {
    const button = e.target.closest("button");
    if (button) {
      const panel = button.nextElementSibling;
      const isActive = button.classList.contains("active");

      // Close all panels
      accordionButtons.forEach((btn) => {
        btn.classList.remove("active");
        btn.nextElementSibling.style.maxHeight = null;
        btn.nextElementSibling.classList.remove("expanded");
      });

      // Open the clicked panel if it was not already active
      if (!isActive) {
        button.classList.add("active");
        panel.style.maxHeight = `${panel.scrollHeight + 30}px`;
        panel.classList.add("expanded");
      }
    }
  });

  // Tabbed content interactivity
  tabContainer.addEventListener("click", (e) => {
    const tab = e.target.closest(".tab-link");
    if (tab) {
      const target = tab.getAttribute("data-tab");

      // Activate clicked tab
      document
        .querySelectorAll(".tab-link")
        .forEach((tab) => tab.classList.remove("active"));
      tab.classList.add("active");

      // Show the corresponding content and hide others
      tabContents.forEach((tabContent) => {
        tabContent.classList.remove("active");
        if (tabContent.id === target) {
          tabContent.classList.add("active");
        }
      });
    }
  });

  // triggers "scroll" class on #header
  document.body.addEventListener("scroll", () => {
    if (document.body.scrollTop > 0) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  const observerOptions = {
    root: null, // Observe changes in the viewport
    rootMargin: "0px", // No margin around the root
    threshold: 0.1, // 10% of the element must be visible to trigger the callback
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log(entry);
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // Stop observing once visible
      }
    });
  }, observerOptions);

  fadeInElements.forEach((element) => observer.observe(element));
});
