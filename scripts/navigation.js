const menuButton = document.querySelector("#menu");
const navigation = document.querySelector("#navigation");

function setMenuState(isOpen) {
  menuButton?.classList.toggle("show", isOpen);
  navigation?.classList.toggle("show", isOpen);
  menuButton?.setAttribute("aria-expanded", String(isOpen));
  menuButton?.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
}

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  setMenuState(!isOpen);
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenuState(false));
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    setMenuState(false);
  }
});
