import { initialCards } from '../components/cards.js';
import { openModal, closeModal } from '../components/modal.js';
//  Темплейт карточки
const template = document.getElementById('card-template').content;
const templateImg = template.querySelector('.card__image');
const templateTitle = template.querySelector('.card__title');

//  DOM узлы
const cardList = document.querySelector('.places__list');
export const popups = document.querySelectorAll('.popup');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const profilePopup = document.querySelector('.popup_type_edit');

const profileAddButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__title');
const profileDescript = document.querySelector('.profile__description');

const profileFormElement = profilePopup.querySelector('.popup__form');
const cardFormElement = cardPopup.querySelector('.popup__form');

const nameInputProfilePopup = profilePopup.querySelector('.popup__input_type_name');
const descriptInputProfilePopup = profilePopup.querySelector('.popup__input_type_description');
const nameInputCardPopup = cardPopup.querySelector('.popup__input_type_card-name');
const urlInputCardPopup = cardPopup.querySelector('.popup__input_type_url');

const imgCardImagePopup = imagePopup.querySelector('.popup__image');
const captionImagePopup = imagePopup.querySelector('.popup__caption');

// Создания карточки
const createCard = (title, srcImg) => {
    const card = template.querySelector('.card').cloneNode(true);
    const cardImg = card.querySelector('.card__image');

    cardImg.src = srcImg;
    cardImg.alt = title;
    card.querySelector('.card__title').textContent = title;

    //  Открытие попапа изображения
    cardImg.addEventListener('click', () => {
        captionImagePopup.textContent = title;
        imgCardImagePopup.src = srcImg;
        imgCardImagePopup.alt = title;
        openModal(imagePopup);
    });

    //  Лайк карточки
    card.querySelector('.card__like-button').addEventListener('click', (evt) => {
        evt.target.classList.toggle('card__like-button_is-active');
    });

    return card;
};

//  Рендеринг карточки
const renderCard = (name, link) => {
    cardList.prepend(createCard(name, link));
};

//  Удаление карточки
cardList.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('card__delete-button')) {
        evt.target.closest('.card').remove();
    }
});

//  Вывод начальных карточек
initialCards.map(({ name, link }) => renderCard(name, link));

// Обработка формы профиля
profileEditButton.addEventListener('click', () => {
    nameInputProfilePopup.value = profileName.textContent;
    descriptInputProfilePopup.value = profileDescript.textContent;
    openModal(profilePopup);
});

profileFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    profileName.textContent = nameInputProfilePopup.value;
    profileDescript.textContent = descriptInputProfilePopup.value;
    closeModal(profilePopup);
});

// Обработка формы добавления карточки
profileAddButton.addEventListener('click', () => openModal(cardPopup));

cardFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    renderCard(nameInputCardPopup.value, urlInputCardPopup.value);
    cardFormElement.reset();
    closeModal(cardPopup);
});
