const accordionContainer = document.querySelector(".accordion");
const accordionButtons = document.querySelectorAll(".accordion button");
const tabContainer = document.querySelector(".tab-container");
const tabContents = document.querySelectorAll(".tab-content");
const preloader = document.getElementById("preloader");
let preloaderFinished = false;
const terminalContent = document.querySelector(".terminal .content");

const triggerFadeIn = () => {
  setTimeout(() => {
    preloaderFinished = true;
    document.dispatchEvent(new CustomEvent("preloaderDone"));
  }, 250);
};

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

if (sessionStorage.getItem("preloaderSeen")) {
  preloader.style.display = "none";
  triggerFadeIn();
} else {
  preloader.querySelector("p").addEventListener("animationend", () => {
    setTimeout(() => {
      preloader.classList.add("slide-out");
      // sessionStorage.setItem("preloaderSeen", "true");
      triggerFadeIn();
    }, 3000);
  });
}

const scrollToBottom = (element) => {
  element.scrollTop = element.scrollHeight;
};

terminalContent.addEventListener("animationend", (e) => {
  if (e.target.tagName === "P") {
    scrollToBottom(terminalContent);
  }
});
