const timestamp = document.querySelector("#timestamp");

if (timestamp) {
  timestamp.value = new Date().toISOString();
}

const benefitButtons = document.querySelectorAll("[data-dialog]");

benefitButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const dialogId = button.dataset.dialog;
    const dialog = document.querySelector(`#${dialogId}`);

    if (dialog) {
      dialog.showModal();
    }
  });
});

const dialogs = document.querySelectorAll("dialog");

dialogs.forEach((dialog) => {
  const closeButton = dialog.querySelector(".close-button");

  closeButton.addEventListener("click", () => {
    dialog.close();
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });
});