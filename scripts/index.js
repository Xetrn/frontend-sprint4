function togglePopup(popupClass) {
  document.querySelector(popupClass).classList.toggle("popup_is-opened");
}

// ------------------------------ CARDS ----------------------------------

const placesList = document.querySelector(".places__list");

function addCard(name, url) {
  const template = document.querySelector("#card-template").content;
  const cardElement = template.cloneNode(true);

  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = url;
  cardElement.querySelector(".card__title").textContent = name;

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_is-active");
  });

  deleteButton.addEventListener("click", () => {
    deleteButton.closest(".card").remove();
  });

  cardImage.addEventListener("click", () => {
    imagePopup.querySelector(".popup__image").src = url;
    imagePopup.querySelector(".popup__caption").textContent = name;

    togglePopup(".popup_type_image");
  });

  placesList.append(cardElement);
}

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

initialCards.forEach((item) => addCard(item.name, item.link));

// -------------------------- EDIT POP-UP -------------------------------

editPopup = document.querySelector(".popup_type_edit");
editPopup.classList.add("popup_is-animated");

const nameInput = editPopup.querySelector(".popup__input_type_name");
const descriptionInput = editPopup.querySelector(
  ".popup__input_type_description"
);

editProfileButton = document.querySelector(".profile__edit-button");
editProfileButton.addEventListener("click", () => {
  nameInput.value = document.querySelector(".profile__title").textContent;
  descriptionInput.value = document.querySelector(
    ".profile__description"
  ).textContent;

  togglePopup(".popup_type_edit");
});

const closeEditButton = editPopup.querySelector(".popup__close");
closeEditButton.addEventListener("click", () => {
  togglePopup(".popup_type_edit");
});

const submitEditButton = editPopup.querySelector(".popup__button");
submitEditButton.addEventListener("click", (event) => {
  if (!!nameInput.value && !!descriptionInput.value) {
    event.preventDefault();

    document.querySelector(".profile__title").textContent = nameInput.value;
    document.querySelector(".profile__description").textContent =
      descriptionInput.value;

    togglePopup(".popup_type_edit");
  }
});

// -------------------------- ADD POP-UP -------------------------------
const addPopup = document.querySelector(".popup_type_new-card");
addPopup.classList.add("popup_is-animated");

addProfileButton = document.querySelector(".profile__add-button");
addProfileButton.addEventListener("click", () => {
  togglePopup(".popup_type_new-card");
});

const closeAddButton = addPopup.querySelector(".popup__close");
closeAddButton.addEventListener("click", () => {
  togglePopup(".popup_type_new-card");
});

const submitAddButton = addPopup.querySelector(".popup__button");
submitAddButton.addEventListener("click", (event) => {
  cardNameInput = addPopup.querySelector(".popup__input_type_card-name");
  urlInput = addPopup.querySelector(".popup__input_type_url");

  if (!!cardNameInput.value && !!urlInput.value) {
    event.preventDefault();

    addCard(cardNameInput.value, urlInput.value);

    cardNameInput.value = "";
    urlInput.value = "";

    togglePopup(".popup_type_new-card");
  }
});

// -------------------------- IMAGE POPUP -------------------------------

const imagePopup = document.querySelector(".popup_type_image");
imagePopup.classList.add("popup_is-animated");

const closeImageButton = imagePopup.querySelector(".popup__close");
closeImageButton.addEventListener("click", () => {
  togglePopup(".popup_type_image");
});
