const memberDirectory = document.querySelector("#members");
const memberCount = document.querySelector("#member-count");
const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");

const membershipNames = {
  1: "Member",
  2: "Silver",
  3: "Gold"
};

function createMemberCard(member) {
  const card = document.createElement("article");
  card.className = "member-card";

  const image = document.createElement("img");
  image.className = "member-image";
  image.src = `images/${member.image}`;
  image.alt = `${member.name} logo`;
  image.loading = "lazy";
  image.width = 640;
  image.height = 360;

  const details = document.createElement("div");
  details.className = "member-details";

  const heading = document.createElement("div");
  heading.className = "member-heading";

  const name = document.createElement("h3");
  name.textContent = member.name;

  const level = document.createElement("span");
  level.className = `membership-level level-${member.membership}`;
  level.textContent = membershipNames[member.membership] ?? "Member";

  const category = document.createElement("p");
  category.className = "member-category";
  category.textContent = member.category;

  heading.append(name, level, category);

  const description = document.createElement("p");
  description.className = "member-description";
  description.textContent = member.description;

  const address = document.createElement("address");
  address.textContent = member.address;

  const phone = document.createElement("a");
  phone.className = "member-phone";
  phone.href = `tel:${member.phone.replace(/[^+\d]/g, "")}`;
  phone.textContent = member.phone;

  const website = document.createElement("a");
  website.className = "member-website";
  website.href = member.website;
  website.target = "_blank";
  website.rel = "noopener";
  website.textContent = "Visit website";
  website.setAttribute("aria-label", `Visit website for ${member.name}`);

  details.append(heading, description, address, phone, website);
  card.append(image, details);
  return card;
}

function displayMembers(members) {
  const cards = members.map(createMemberCard);
  memberDirectory.replaceChildren(...cards);
  memberCount.textContent = `${members.length} members listed`;
}

function setDirectoryView(view) {
  const gridIsActive = view === "grid";

  memberDirectory.classList.toggle("grid", gridIsActive);
  memberDirectory.classList.toggle("list", !gridIsActive);
  gridButton.classList.toggle("active", gridIsActive);
  listButton.classList.toggle("active", !gridIsActive);
  gridButton.setAttribute("aria-pressed", gridIsActive.toString());
  listButton.setAttribute("aria-pressed", (!gridIsActive).toString());
}

async function loadMembers() {
  try {
    const response = await fetch("data/members.json");

    if (!response.ok) {
      throw new Error(`Unable to load members: ${response.status}`);
    }

    const members = await response.json();

    if (!Array.isArray(members)) {
      throw new Error("Member data is not an array.");
    }

    displayMembers(members);
  } catch (error) {
    console.error(error);
    memberCount.textContent = "Member directory unavailable";

    const message = document.createElement("p");
    message.className = "directory-error";
    message.textContent = "We could not load the member directory. Please try again later.";
    memberDirectory.replaceChildren(message);
  }
}

gridButton.addEventListener("click", () => setDirectoryView("grid"));
listButton.addEventListener("click", () => setDirectoryView("list"));

loadMembers();
