// Popups
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

function openModal(popup) {      
    popup.classList.add('popup_is-opened');
}

function closeModal(popup) {      
    popup.classList.remove('popup_is-opened');
}

// Profile popup

const profilePopup = document.querySelector('.popup_type_edit');

const profileEditButton = document.querySelector('.profile__edit-button');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const profileTitleInput = profilePopup.querySelector('.popup__input_type_name');
const profileDescriptionInput = profilePopup.querySelector('.popup__input_type_description');

profileEditButton.addEventListener('click', function() {
    profileTitleInput.value = profileTitle.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
    openModal(profilePopup);
});

const profilePopup__close = profilePopup.querySelector('.popup__close');

profilePopup__close.addEventListener('click', function() {
    closeModal(profilePopup);
});

const profileForm = profilePopup.querySelector('.popup__form');

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    profileTitle.textContent = profileTitleInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
}

profileForm.addEventListener('submit', handleProfileFormSubmit);


// Темплейт карточки
const placesList = document.querySelector('.places__list');

function addCard(imageSrc, titleContent) {
    const cardTemplate = document.querySelector('#card-template').content;
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    
    card.querySelector('.card__image').src = imageSrc;
    card.querySelector('.card__title').textContent = titleContent;
    
    placesList.append(card);
}

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// Вывести карточки на страницу

for (let i = 0; i < initialCards.length; i++) {
    addCard(initialCards[i].link, initialCards[i].name);
}