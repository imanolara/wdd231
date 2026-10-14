import "./common.js";

const savedSummary = document.querySelector("#saved-summary");
const savedIds = JSON.parse(localStorage.getItem("focuslab-saved") ?? "[]");

if (savedSummary && savedIds.length > 0) {
  const label = savedIds.length === 1 ? "technique" : "techniques";
  savedSummary.textContent = `You have ${savedIds.length} saved ${label} in your library.`;
}

