const cardTemplate = document.getElementById('card-template').content;
const placesList = document.querySelector('.places__list');

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

const closePopupButtons = document.querySelectorAll('.popup__close');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileFormElement = document.querySelector('.popup_type_edit .popup__form');

const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector('.popup__input_type_description');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const addCardButton = document.querySelector('.profile__add-button');
const cardFormElement = document.querySelector('.popup_type_new-card .popup__form');

const placeNameInput = cardFormElement.querySelector('.popup__input_type_card-name');
const placeLinkInput = cardFormElement.querySelector('.popup__input_type_url');

function createCard({link, name}) {
    const cardElement = cardTemplate.cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');

    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;

    deleteButton.addEventListener('click', () => deleteButton.closest('.card').remove());
    likeButton.addEventListener('click', () => likeButton.classList.toggle('card__like-button_is-active'));

    cardImage.addEventListener('click', () => {
        const popupImage = imagePopup.querySelector('.popup__image');
        const popupCaption = imagePopup.querySelector('.popup__caption');

        popupImage.src = link;
        popupImage.alt = name;
        popupCaption.textContent = name;

        openModal(imagePopup);
    });

    return cardElement;
}

function renderInitialCards() {
    const cards = initialCards.map(createCard);
    cards.forEach(card => placesList.append(card));
}

function openModal(popup) {
    popup.classList.add('popup_is-opened');
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

    profileTitle.textContent = nameValue;
    profileDescription.textContent = jobValue;

    closeModal(profilePopup)
}

function handleCardFormSubmit(evt) {
    evt.preventDefault();

    const cardElement = createCard({
        name: placeNameInput.value,
        link: placeLinkInput.value,
    });

    placesList.prepend(cardElement);

    closeModal(cardPopup);

    cardFormElement.reset();
}

document.addEventListener('DOMContentLoaded', renderInitialCards);
document.addEventListener('DOMContentLoaded', () => {
    const popups = document.querySelectorAll('.popup');
    popups.forEach((popup) => {
        popup.classList.add('popup_is-animated');
    });
});

profileEditButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(profilePopup);
});
profileFormElement.addEventListener('submit', handleProfileFormSubmit);

addCardButton.addEventListener('click', () => openModal(cardPopup));
cardFormElement.addEventListener('submit', handleCardFormSubmit);

closePopupButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closeModal(popup));
});
