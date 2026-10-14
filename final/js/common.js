import { VIDEO_URL } from "./config.js";

const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navigation = document.querySelector(".primary-nav");

function closeNavigation() {
  if (!navToggle || !navigation) return;
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Open navigation");
  navigation.classList.remove("open");
}

if (header && navToggle && navigation) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    navigation.classList.toggle("open", !isOpen);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeNavigation();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNavigation();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 640) closeNavigation();
  });
}

document.querySelectorAll("[data-current-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

document.querySelectorAll("[data-last-modified]").forEach((element) => {
  element.textContent = new Date(document.lastModified).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
});

document.querySelectorAll("[data-video-link]").forEach((link) => {
  link.href = VIDEO_URL;
  if (VIDEO_URL.includes("REPLACE_WITH")) {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      window.alert("Add your public video URL in js/config.js before submitting the project.");
    });
  }
});

