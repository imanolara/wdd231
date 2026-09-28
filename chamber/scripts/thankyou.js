const formInformation = new URLSearchParams(window.location.search);

const firstName = formInformation.get("first");
const lastName = formInformation.get("last");
const email = formInformation.get("email");
const phone = formInformation.get("phone");
const organization = formInformation.get("organization");
const timestamp = formInformation.get("timestamp");

document.querySelector("#submitted-first").textContent =
  firstName || "Not provided";

document.querySelector("#submitted-last").textContent =
  lastName || "Not provided";

document.querySelector("#submitted-email").textContent =
  email || "Not provided";

document.querySelector("#submitted-phone").textContent =
  phone || "Not provided";

document.querySelector("#submitted-organization").textContent =
  organization || "Not provided";

const timestampOutput = document.querySelector("#submitted-timestamp");

if (timestamp) {
  const submissionDate = new Date(timestamp);

  timestampOutput.textContent = submissionDate.toLocaleString(undefined, {
    dateStyle: "long",
    timeStyle: "short"
  });
} else {
  timestampOutput.textContent = "Not available";
}