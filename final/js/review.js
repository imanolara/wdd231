import "./common.js";

const parameters = new URLSearchParams(window.location.search);
const reviewName = document.querySelector("#review-name");
const planDetails = document.querySelector("#plan-details");
const printButton = document.querySelector("#print-plan");

const fields = [
  ["Subject", "subject"],
  ["Outcome", "goal"],
  ["Date", "date"],
  ["Duration", "duration"],
  ["Technique", "technique"],
  ["First action", "firstStep"],
  ["Focus protection", "distraction"],
  ["Note", "notes"]
];

const name = parameters.get("name")?.trim();
reviewName.textContent = name ? `${name}’s` : "Your";

fields.forEach(([label, key]) => {
  const value = parameters.get(key)?.trim();
  if (!value) return;

  const wrapper = document.createElement("div");
  const term = document.createElement("dt");
  const detail = document.createElement("dd");
  term.textContent = label;
  detail.textContent = key === "date"
    ? new Date(`${value}T12:00:00`).toLocaleDateString("en-US", { dateStyle: "long" })
    : value;
  wrapper.append(term, detail);
  planDetails.append(wrapper);
});

if (planDetails.children.length === 0) {
  const message = document.createElement("p");
  message.textContent = "No plan details were found. Return to the planner to create a session.";
  planDetails.replaceWith(message);
}

printButton.addEventListener("click", () => window.print());

