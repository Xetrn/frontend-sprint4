const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const popups = document.querySelectorAll('.popup');
const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const profileForm = document.querySelector('.popup__form_type_edit');
const cardForm = document.querySelector('.popup__form_type_new-card');
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const cardsList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template')?.content;
const popupImage = imagePopup?.querySelector('.popup__image');
const popupCaption = imagePopup?.querySelector('.popup__caption');

initialCards.forEach((cardData) => {
    const card = createCard(cardData);
    cardsList.append(card);
});

function openPopup(popup) {
    if (popup) {
        popup.classList.add('popup_is-opened', 'popup_is-animated');
    }
}

function closePopup(popup) {
    if (popup) {
        popup.classList.remove('popup_is-opened');
    }
}

function createCard(cardData) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    
    if (cardImage && cardTitle) {
        cardImage.src = cardData.link;
        cardImage.alt = cardData.name;
        cardTitle.textContent = cardData.name;
        
        setCardListeners(cardElement, cardImage, cardData);
    }
    
    return cardElement;
}

function setCardListeners(cardElement, cardImage, cardData) {
    const likeButton = cardElement.querySelector('.card__like-button');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    
    if (likeButton) {
        likeButton.addEventListener('click', handleLikeCard);
    }
    if (deleteButton) {
        deleteButton.addEventListener('click', () => handleDeleteCard(cardElement));
    }
    if (cardImage) {
        cardImage.addEventListener('click', () => handleCardImageClick(cardData));
    }
}

function handleLikeCard(evt) {
    if (evt.target) {
        evt.target.classList.toggle('card__like-button_is-active');
    }
}

function handleDeleteCard(card) {
    if (card) {
        card.remove();
    }
}

function handleCardImageClick(cardData) {
    if (popupImage && popupCaption) {
        popupImage.src = cardData.link;
        popupImage.alt = cardData.name;
        popupCaption.textContent = cardData.name;
        openPopup(imagePopup);
    }
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    if (profileTitle && profileDescription) {
        profileTitle.textContent = nameInput.value;
        profileDescription.textContent = descriptionInput.value;
        closePopup(profilePopup);
    }
}

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const cardNameInput = cardForm?.querySelector('.popup__input_type_card-name');
    const cardUrlInput = cardForm?.querySelector('.popup__input_type_url');
    
    if (cardNameInput && cardUrlInput) {
        const cardData = {
            name: cardNameInput.value,
            link: cardUrlInput.value
        };
        const newCard = createCard(cardData);
        cardsList.prepend(newCard);
        closePopup(cardPopup);
        cardForm.reset();
    }
}

function openProfilePopup() {
    if (nameInput && descriptionInput && profileTitle && profileDescription) {
        nameInput.value = profileTitle.textContent;
        descriptionInput.value = profileDescription.textContent;
        openPopup(profilePopup);
    }
}

if (profileEditButton) {
    profileEditButton.addEventListener('click', openProfilePopup);
}
if (addCardButton) {
    addCardButton.addEventListener('click', () => openPopup(cardPopup));
}

popups.forEach((popup) => {
    const closeButton = popup?.querySelector('.popup__close');
    if (closeButton) {
        closeButton.addEventListener('click', () => closePopup(popup));
    }
});

if (profileForm) {
    profileForm.addEventListener('submit', handleProfileFormSubmit);
}
if (cardForm) {
    cardForm.addEventListener('submit', handleCardFormSubmit);
}