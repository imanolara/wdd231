import { places } from "../data/places.mjs";

const placesGrid = document.querySelector("#places-grid");
const visitMessage = document.querySelector("#visit-message");

function createPlaceCard(place, index) {
  const card = document.createElement("article");
  card.className = `place-card place-${index + 1}`;

  const title = document.createElement("h2");
  title.textContent = place.name;

  const figure = document.createElement("figure");
  const image = document.createElement("img");
  image.src = `images/${place.image}`;
  image.alt = place.name;
  image.loading = "lazy";
  image.width = 300;
  image.height = 200;
  figure.appendChild(image);

  const address = document.createElement("address");
  address.textContent = place.address;

  const description = document.createElement("p");
  description.textContent = place.description;

  const button = document.createElement("button");
  button.type = "button";
  button.textContent = "Learn More";
  button.setAttribute("aria-label", `Learn more about ${place.name}`);

  card.append(title, figure, address, description, button);
  return card;
}

places.forEach((place, index) => {
  placesGrid.appendChild(createPlaceCard(place, index));
});

const lastVisitKey = "chamberDiscoverLastVisit";
const now = Date.now();
const lastVisit = Number(localStorage.getItem(lastVisitKey));
const millisecondsPerDay = 1000 * 60 * 60 * 24;

if (!lastVisit) {
  visitMessage.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const elapsedTime = now - lastVisit;

  if (elapsedTime < millisecondsPerDay) {
    visitMessage.textContent = "Back so soon! Awesome!";
  } else {
    const days = Math.floor(elapsedTime / millisecondsPerDay);
    const dayLabel = days === 1 ? "day" : "days";
    visitMessage.textContent = `You last visited ${days} ${dayLabel} ago.`;
  }
}

localStorage.setItem(lastVisitKey, now.toString());
