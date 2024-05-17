document.addEventListener("DOMContentLoaded", function () {
  const accordionButtons = document.querySelectorAll(".accordion button");

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
});
