import "./common.js";

const grid = document.querySelector("#technique-grid");
const resultsCount = document.querySelector("#results-count");
const emptyState = document.querySelector("#empty-state");
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const energySelect = document.querySelector("#energy");
const savedOnlyInput = document.querySelector("#saved-only");
const clearFiltersButton = document.querySelector("#clear-filters");
const dialog = document.querySelector("#technique-dialog");
const closeDialogButton = dialog.querySelector(".dialog-close");
const dialogSaveButton = document.querySelector("#dialog-save");

let techniques = [];
let activeTechnique = null;
let lastFocusedElement = null;

function getSavedTechniques() {
  try {
    return new Set(JSON.parse(localStorage.getItem("focuslab-saved") ?? "[]"));
  } catch (error) {
    console.warn("Saved techniques could not be read.", error);
    return new Set();
  }
}

let savedTechniques = getSavedTechniques();

function saveToStorage() {
  localStorage.setItem("focuslab-saved", JSON.stringify([...savedTechniques]));
}

function toggleSaved(id) {
  if (savedTechniques.has(id)) {
    savedTechniques.delete(id);
  } else {
    savedTechniques.add(id);
  }
  saveToStorage();
  renderTechniques();
  if (activeTechnique?.id === id && dialog.open) updateDialogSaveButton();
}

function techniqueCard(technique) {
  const isSaved = savedTechniques.has(technique.id);
  return `
    <article class="technique-card">
      <div class="card-topline">
        <span class="technique-icon" aria-hidden="true">${technique.icon}</span>
        <button class="save-button" type="button" data-save-id="${technique.id}" aria-pressed="${isSaved}" aria-label="${isSaved ? "Remove" : "Save"} ${technique.name}">
          <span aria-hidden="true">${isSaved ? "★" : "☆"}</span>
        </button>
      </div>
      <span class="category-pill">${technique.category}</span>
      <h2>${technique.name}</h2>
      <p>${technique.description}</p>
      <ul class="card-meta" aria-label="Technique facts">
        <li>${technique.duration}</li>
        <li>${technique.energy} energy</li>
      </ul>
      <button class="details-button" type="button" data-details-id="${technique.id}">View how it works</button>
    </article>`;
}

function filteredTechniques() {
  const query = searchInput.value.trim().toLowerCase();
  const category = categorySelect.value;
  const energy = energySelect.value;

  return techniques.filter((technique) => {
    const searchableText = `${technique.name} ${technique.description} ${technique.bestFor}`.toLowerCase();
    const matchesSearch = searchableText.includes(query);
    const matchesCategory = category === "all" || technique.category === category;
    const matchesEnergy = energy === "all" || technique.energy === energy;
    const matchesSaved = !savedOnlyInput.checked || savedTechniques.has(technique.id);
    return matchesSearch && matchesCategory && matchesEnergy && matchesSaved;
  });
}

function renderTechniques() {
  const matches = filteredTechniques();
  grid.innerHTML = matches.map(techniqueCard).join("");
  resultsCount.textContent = `${matches.length} ${matches.length === 1 ? "technique" : "techniques"} shown`;
  emptyState.hidden = matches.length !== 0;
}

function updateDialogSaveButton() {
  const isSaved = savedTechniques.has(activeTechnique.id);
  dialogSaveButton.textContent = isSaved ? "Remove from saved" : "Save this technique";
  dialogSaveButton.setAttribute("aria-pressed", String(isSaved));
}

function openTechniqueDialog(id, trigger) {
  const technique = techniques.find((item) => item.id === id);
  if (!technique) return;

  activeTechnique = technique;
  lastFocusedElement = trigger;
  document.querySelector("#dialog-icon").textContent = technique.icon;
  document.querySelector("#dialog-category").textContent = technique.category;
  document.querySelector("#dialog-title").textContent = technique.name;
  document.querySelector("#dialog-description").textContent = technique.description;
  document.querySelector("#dialog-duration").textContent = technique.duration;
  document.querySelector("#dialog-energy").textContent = technique.energy;
  document.querySelector("#dialog-best-for").textContent = technique.bestFor;
  document.querySelector("#dialog-steps").innerHTML = technique.steps.map((step) => `<li>${step}</li>`).join("");
  updateDialogSaveButton();
  dialog.showModal();
  closeDialogButton.focus();
}

function closeDialog() {
  dialog.close();
  lastFocusedElement?.focus();
}

async function loadTechniques() {
  try {
    const response = await fetch("data/techniques.json");
    if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
    techniques = await response.json();
    renderTechniques();
  } catch (error) {
    console.error("Unable to load technique data.", error);
    resultsCount.textContent = "The technique library could not be loaded.";
    grid.innerHTML = '<p class="load-error">Please refresh the page or try again later.</p>';
  }
}

grid.addEventListener("click", (event) => {
  const saveButton = event.target.closest("[data-save-id]");
  const detailsButton = event.target.closest("[data-details-id]");
  if (saveButton) toggleSaved(saveButton.dataset.saveId);
  if (detailsButton) openTechniqueDialog(detailsButton.dataset.detailsId, detailsButton);
});

[searchInput, categorySelect, energySelect, savedOnlyInput].forEach((control) => {
  control.addEventListener("input", renderTechniques);
});

clearFiltersButton.addEventListener("click", () => {
  searchInput.value = "";
  categorySelect.value = "all";
  energySelect.value = "all";
  savedOnlyInput.checked = false;
  renderTechniques();
  searchInput.focus();
});

closeDialogButton.addEventListener("click", closeDialog);
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) closeDialog();
});
dialogSaveButton.addEventListener("click", () => toggleSaved(activeTechnique.id));

loadTechniques();

