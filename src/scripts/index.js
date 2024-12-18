import { initialCards } from "./cards.js";
import "../pages/index.css";
import "../vendor/normalize.css";

// ---------------------------- UTILITIES --------------------------------

function togglePopup(popupElement) {
  popupElement.classList.toggle("popup_is-opened");
}

function showInputError(inputElement, errorElement) {
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = inputElement.validationMessage;
}

function hideInputError(inputElement, errorElement) {
  inputElement.classList.remove("popup__input_type_error");
  errorElement.textContent = "";
}

function validateForm(formElement, submitButton, ...inputElements) {
  inputElements.forEach((input) => {
    if (!input.validity.valid) {
      showInputError(input, input.nextElementSibling);
    } else {
      hideInputError(input, input.nextElementSibling);
    }
  });

  const isValid = formElement.checkValidity();
  submitButton.disabled = !isValid;
  submitButton.classList.toggle("popup__button_disabled", !isValid);
}

function handleEscapeClose(evt) {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector(".popup_is-opened");
    if (openPopup) togglePopup(openPopup);
  }
}

// ---------------------------- POPUP HANDLING --------------------------

document.addEventListener("keydown", handleEscapeClose);

document.querySelectorAll(".popup").forEach((popup) => {
  popup.classList.add("popup_is-animated");
  popup.addEventListener("click", (evt) => {
    if (evt.target === popup) togglePopup(popup);
  });
});

// ------------------------------ CARDS ----------------------------------

const placesList = document.querySelector(".places__list");
const template = document.querySelector("#card-template").content;

function addCard(name, url) {
  const cardElement = template.cloneNode(true);
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = url;
  cardElement.querySelector(".card__title").textContent = name;

  // like
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_is-active");
  });

  // del
  deleteButton.addEventListener("click", () => {
    deleteButton.closest(".card").remove();
  });

  // open full screen
  cardImage.addEventListener("click", () => {
    const imagePopup = document.querySelector(".popup_type_image");
    imagePopup.querySelector(".popup__image").src = url;
    imagePopup.querySelector(".popup__caption").textContent = name;

    togglePopup(imagePopup);
  });

  placesList.append(cardElement);
}

initialCards.forEach((item) => addCard(item.name, item.link));

// -------------------------- PROFILE EDIT POPUP ------------------------

const editPopup = document.querySelector(".popup_type_edit");
const editForm = document.forms.namedItem("edit-profile");
const nameInput = editForm.elements.name;
const descInput = editForm.elements.description;
const submitEditButton = editForm.elements.namedItem("submit-button");
const closeEditButton = editPopup.querySelector(".popup__close");

// open
document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    const profileTitle = document.querySelector(".profile__title");
    const profileDescription = document.querySelector(".profile__description");

    nameInput.value = profileTitle.textContent;
    descInput.value = profileDescription.textContent;

    validateForm(editForm, submitEditButton, nameInput, descInput);
    togglePopup(editPopup);
  });

// validate
nameInput.addEventListener("input", () => {
  validateForm(editForm, submitEditButton, nameInput);
});
descInput.addEventListener("input", () => {
  validateForm(editForm, submitEditButton, descInput);
});
editForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  document.querySelector(".profile__title").textContent = nameInput.value;
  document.querySelector(".profile__description").textContent = descInput.value;
  togglePopup(editPopup);
});

// close
closeEditButton.addEventListener("click", () => {
  togglePopup(editPopup);
});

// --------------------------- ADD CARD POPUP ---------------------------

const addPopup = document.querySelector(".popup_type_new-card");
const addForm = document.forms.namedItem("new-place");
const cardNameInput = addForm.elements.namedItem("place-name");
const urlInput = addForm.elements.link;
const submitAddButton = addForm.elements.namedItem("submit-button");
const closeAddButton = addPopup.querySelector(".popup__close");

// open
document.querySelector(".profile__add-button").addEventListener("click", () => {
  addForm.reset();
  togglePopup(addPopup);
});

// validate
cardNameInput.addEventListener("input", () => {
  validateForm(addForm, submitAddButton, cardNameInput);
});
urlInput.addEventListener("input", () => {
  validateForm(addForm, submitAddButton, urlInput);
});
addForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  addCard(cardNameInput.value, urlInput.value);
  togglePopup(addPopup);
});

//close
closeAddButton.addEventListener("click", () => {
  togglePopup(addPopup);
});

// -------------------------- IMAGE POPUP -------------------------------

// close
document
  .querySelector(".popup_type_image .popup__close")
  .addEventListener("click", () => {
    togglePopup(document.querySelector(".popup_type_image"));
  });
