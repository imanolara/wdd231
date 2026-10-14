import "./common.js";

const form = document.querySelector("#session-form");
const techniqueSelect = document.querySelector("#technique");
const dateInput = document.querySelector("#date");
const createdAtInput = document.querySelector("#created-at");
const clearButton = document.querySelector("#clear-plan");
const draftStatus = document.querySelector("#draft-status");
const draftKey = "focuslab-plan-draft";

function localDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

dateInput.min = localDateString();

function readDraft() {
  try {
    return JSON.parse(localStorage.getItem(draftKey) ?? "null");
  } catch (error) {
    console.warn("The saved plan draft could not be read.", error);
    return null;
  }
}

function restoreDraft() {
  const draft = readDraft();
  if (!draft) {
    dateInput.value = localDateString();
    return;
  }

  Object.entries(draft).forEach(([name, value]) => {
    const field = form.elements.namedItem(name);
    if (!field || name === "createdAt") return;
    if (field instanceof RadioNodeList) {
      field.value = value;
    } else {
      field.value = value;
    }
  });
  draftStatus.textContent = "Draft restored";
}

function saveDraft() {
  const data = Object.fromEntries(new FormData(form).entries());
  delete data.createdAt;
  localStorage.setItem(draftKey, JSON.stringify(data));
  draftStatus.textContent = "Draft saved";
}

async function loadTechniqueOptions() {
  try {
    const response = await fetch("data/techniques.json");
    if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
    const techniques = await response.json();
    const options = techniques
      .sort((first, second) => first.name.localeCompare(second.name))
      .map((technique) => `<option value="${technique.name}">${technique.name} — ${technique.category}</option>`)
      .join("");
    techniqueSelect.innerHTML = `<option value="">Choose a technique</option>${options}`;
    restoreDraft();
  } catch (error) {
    console.error("Unable to load technique choices.", error);
    techniqueSelect.innerHTML = '<option value="">Technique list unavailable</option>';
    restoreDraft();
  }
}

let saveTimer;
form.addEventListener("input", () => {
  window.clearTimeout(saveTimer);
  draftStatus.textContent = "Saving…";
  saveTimer = window.setTimeout(saveDraft, 250);
});

form.addEventListener("submit", () => {
  createdAtInput.value = new Date().toISOString();
  saveDraft();
});

clearButton.addEventListener("click", () => {
  form.reset();
  localStorage.removeItem(draftKey);
  dateInput.value = localDateString();
  draftStatus.textContent = "Draft cleared";
  form.querySelector("input").focus();
});

loadTechniqueOptions();

