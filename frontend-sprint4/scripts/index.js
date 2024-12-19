// @todo: Темплейт карточки
const template = document.getElementById('card-template').content;
const templateImg = template.querySelector('.card_image');
const templateTitle = template.querySelector('.card_title');

// @todo: DOM узлы
const cardList = document.querySelector('.places_list');
const cards = cardList.querySelectorAll('.card');

const popups = document.querySelectorAll('.popup');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const profilePopup = document.querySelector('.popup_type_edit');
const profileFormElement = profilePopup.querySelector('.popup_form');
const cardFormElement = cardPopup.querySelector('.popup_form');

const profileAddButton = document.querySelector('.profile_add-button');
const profileEditButton = document.querySelector('.profile_edit-button');
const profileName = document.querySelector('.profile_title');
const profileDescript = document.querySelector('.profile_description');

const nameInputProfilePopup = profilePopup.querySelector('.popup_input_type_name');
const descriptInputProfilePopup = profilePopup.querySelector('.popup_input_type_description');
const saveButtonProfilePopup = profilePopup.querySelector('.popup_button');
const nameInputCardPopup = cardPopup.querySelector('.popup_input_type_card-name');
const urlInputCardPopup = cardPopup.querySelector('.popup_input_type_url');
const saveButtonCardPopup = cardPopup.querySelector('.popup_button');
const captionImagePopup = imagePopup.querySelector('.popup_caption');

const imgCardImagePopup = imagePopup.querySelector('.popup_image');
// @todo: Функция создания карточки

const createCard = (title, srcImg) => {
    const card = template.querySelector('.card').cloneNode(true);
    const cardImg = card.querySelector('.card_image');

    cardImg.src = srcImg;
    cardImg.alt = title;

    card.querySelector('.card_title').textContent = title;

    cardImg.addEventListener('click', () => {
        captionImagePopup.textContent = title;
        imgCardImagePopup.src = srcImg;
        imgCardImagePopup.alt = title;
        openModal(imagePopup);
    });
    return card;
};
// @todo: Функция удаления карточки

cardList.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('card_delete-button')) {
        evt.target.closest('.card').remove();
    }
});
// @todo: Вывести карточки на страницу

const renderCard = (name, link) => {
    cardList.prepend(createCard(name, link));
};

initialCards.map(({ name, link }) => renderCard(name, link));

const openModal = (popup) => {
    popup.classList.add('popup_is-opened');
};

const closeModal = (popup) => {
    popup.classList.remove('popup_is-opened');
};

profileEditButton.addEventListener('click', () => openModal(profilePopup));
profileAddButton.addEventListener('click', () => openModal(cardPopup));

popups.forEach(popup => {
    const buttonClose = popup.querySelector('.popup_close');
    buttonClose.addEventListener('click', () => closeModal(popup));
    popup.classList.add('popup_is-animated');
});

nameInputProfilePopup.value = profileName.textContent;
descriptInputProfilePopup.value = profileDescript.textContent;

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInputProfilePopup.value;
    profileDescript.textContent = descriptInputProfilePopup.value;
    closeModal(profilePopup);
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit);

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    closeModal(cardPopup);
    renderCard(nameInputCardPopup.value, urlInputCardPopup.value);
    cardFormElement.reset();
}

cardFormElement.addEventListener('submit', handleCardFormSubmit);

cardList.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('card_like-button')) {
        evt.target.classList.toggle('card_like-button_is-active');
    }
});