import '../pages/index.css';
import avatarUrl from '../images/avatar.jpg';
import { enableValidation } from "./validate";
import { createCard } from './card';
import { initialCards } from './cards';
import { openModal, closeModal, closePopupOverlay } from './modal';

const profileImage = document.querySelector('.profile__image');
profileImage.style.backgroundImage = `url(${avatarUrl})`;

const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
export const imagePopup = document.querySelector(".popup_type_image");

profilePopup.classList.add("popup_is-animated");
cardPopup.classList.add("popup_is-animated");
imagePopup.classList.add("popup_is-animated");

const profileButton = document.querySelector(".profile__edit-button");
const closeProfilePopupButton = profilePopup.querySelector(".popup__close");

// функция для переноса имени и профессии
profileButton.addEventListener("click", function () {
    nameInput.value = document.querySelector(".profile__title").textContent;
    jobInput.value = document.querySelector(".profile__description").textContent;
    openModal(profilePopup);
})

closeProfilePopupButton.addEventListener("click", function () {
    closeModal(profilePopup);
})


const profileFormElement = profilePopup.querySelector(".popup__form");// Воспользуйтесь методом querySelector()
const nameInput = document.querySelector(".popup__input_type_name");// Воспользуйтесь инструментом .querySelector()
const jobInput = document.querySelector(".popup__input_type_description");// Воспользуйтесь инструментом .querySelector()


function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    document.querySelector(".profile__title").textContent = nameInput.value;
    document.querySelector(".profile__description").textContent = jobInput.value;
    closeModal(profilePopup);
}
profileFormElement.addEventListener('submit', handleProfileFormSubmit);

const closeImagePopupButton = imagePopup.querySelector(".popup__close");

closeImagePopupButton.addEventListener("click", function () {
    closeModal(imagePopup);
})

const placesList = document.querySelector(".places__list");
const buttonAddCard = document.querySelector(".profile__add-button");
const closePopupCardButton = cardPopup.querySelector(".popup__close");

for (let i = 0; i < initialCards.length; i++) {
    const newCardFromCards = createCard(initialCards[i].name, initialCards[i].link);
    placesList.append(newCardFromCards);
}

buttonAddCard.addEventListener("click", function () {
    openModal(cardPopup);
})

closePopupCardButton.addEventListener("click", function () {
    closeModal(cardPopup);
})

const cardFormElement = cardPopup.querySelector(".popup__form");
const namePlaceInput = document.querySelector(".popup__input_type_card-name");
const urlPlaceInput = document.querySelector(".popup__input_type_url");

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const newName = namePlaceInput.value;
    const newImage = urlPlaceInput.value;
    console.log(newName, newImage)
    const newCard = createCard(newName, newImage);
    console.log(newCard)
    placesList.prepend(newCard);
    closeModal(cardPopup);
    namePlaceInput.value = "";
    urlPlaceInput.value = "";
}
cardFormElement.addEventListener('submit', handleCardFormSubmit);

const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}
enableValidation(validationSettings);

profilePopup.addEventListener("click", (evt) => {
    closePopupOverlay(evt, profilePopup);
});

cardPopup.addEventListener("click", (evt) => {
    closePopupOverlay(evt, cardPopup);
});

imagePopup.addEventListener("click", (evt) => {
    closePopupOverlay(evt, imagePopup);
});
