document.addEventListener("DOMContentLoaded", function () {
  const accordionButtons = document.querySelectorAll(".accordion button");
  const tabs = document.querySelectorAll(".tab-link");
  const contents = document.querySelectorAll(".tab-content");

  accordionButtons.forEach((button) => {
    button.addEventListener("click", function () {
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
    });
  });

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const target = this.getAttribute("data-tab");

      tabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      contents.forEach((content) => {
        content.classList.remove("active");
        if (content.id === target) {
          content.classList.add("active");
        }
      });
    });
  });
});
