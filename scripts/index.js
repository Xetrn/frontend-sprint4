import {initialCards} from "./cards.js";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const editButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_edit');
const closeButton = profilePopup.querySelector('.popup__close');
const profileFormElement = profilePopup.querySelector('.popup__form');
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const descriptionInput = profilePopup.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const addButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardCloseButton = newCardPopup.querySelector('.popup__close');
const cardFormElement = newCardPopup.querySelector('.popup__form');
const placeNameInput = newCardPopup.querySelector('.popup__input_type_card-name');
const placeLinkInput = newCardPopup.querySelector('.popup__input_type_url');
const cardsList = document.querySelector('.places__list');

const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');
const imagePopupCloseButton = imagePopup.querySelector('.popup__close');

// Все попапы
const popups = document.querySelectorAll('.popup');

// Функция анимации попапов
function animationModal(modalWindows) {
  modalWindows.forEach(popup => {
    popup.classList.add('popup_is-animated');
  });
}

// Универсальные функции открытия и закрытия попапов
function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscapeKey);
}

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscapeKey);
}

function openModalProfile(popup) {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;

  clearFormErrors(popup.querySelector('.popup__form'), validationSettings);

  openModal(popup);
}



const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

function toggleButtonState(inputList, buttonElement, settings) {
  const inputArray = Array.from(inputList);
  const hasInvalidInput = inputArray.some((inputElement) => !inputElement.validity.valid);

  if (hasInvalidInput) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'disabled');
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}

function clearFormErrors(formElement, settings) {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const errorElements = Array.from(formElement.querySelectorAll(`.${settings.errorClass}`));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.classList.remove(settings.inputErrorClass);
  });

  errorElements.forEach((errorElement) => {
    errorElement.textContent = '';
    errorElement.classList.remove(settings.errorClass);
  });

  if (buttonElement) {
    toggleButtonState(inputList, buttonElement, settings);
  }
}

function showInputError(formElement, inputElement, errorElement, settings) {
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(settings.errorClass);
}

function hideInputError(formElement, inputElement, errorElement, settings) {
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(settings.errorClass);
}

function validateForm(formElement, settings) {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const submitButton = formElement.querySelector(settings.submitButtonSelector);


  const hasInvalidInput = inputList.some(input => !input.validity.valid);


  toggleButtonState(inputList, submitButton, settings);


  inputList.forEach(inputElement => {
    checkInputValidity(formElement, inputElement, settings);
  });
}

function checkInputValidity(formElement, inputElement, settings) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, errorElement, settings);
  } else {
    hideInputError(formElement, inputElement, errorElement, settings);
  }
}

// Установить слушатели для формы
function setEventListeners(formElement, settings) {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const submitButton = formElement.querySelector(settings.submitButtonSelector);

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      validateForm(formElement, settings);
    });
  });

  // Установить начальное состояние кнопки
  validateForm(formElement, settings);
}

// Активация валидации
function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach(formElement => {
    setEventListeners(formElement, settings);
  });
}

// Закрытие поп-апа нажатием на Esc
function handleEscapeKey(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}




// Обработчик отправки формы
function handleProfileFormSubmit(event, popup) {
  event.preventDefault(); // Предотвращаем стандартное поведение формы

  // Обновляем текст в профиле
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  // Закрываем попап
  closeModal(popup);
}

// @todo: Функция создания карточки
function createCard({ name, link }) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('card__like-button_is-active');
  });

  // @todo: Функция удаления карточки
  deleteButton.addEventListener('click', () => {
    cardElement.remove();
  });

  cardImage.addEventListener('click', () => {
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;

    openModal(imagePopup);
  });

  return cardElement;
}

// @todo: Вывести карточки на страницу 
// Используется для: Создания карточки и Cоздания карточек из массива
function addCard(cardData) {
  const cardElement = createCard(cardData);
  cardsList.prepend(cardElement);
}

// Инициализация карточек
function renderInitialCards() {
  initialCards.forEach(addCard);
}

// Обработчик отправки формы добавления карточки
function handleCardFormSubmit(event, popup) {
  event.preventDefault();

  const cardData = {
    name: placeNameInput.value,
    link: placeLinkInput.value,
  };

  addCard(cardData);
  closeModal(popup);
}

function initializeEventListeners() {
  // Закрытие поп-апов кликом на оверлей
  popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target === popup) {
        closeModal(popup);
      }
    });
  });

  // Слушатели событий: редактирование профиля
  editButton.addEventListener('click', () => openModalProfile(profilePopup));
  profileFormElement.addEventListener('submit', (event) => handleProfileFormSubmit(event, profilePopup));
  closeButton.addEventListener('click', () => closeModal(profilePopup));

  // Слушатели событий: создание карточки
  addButton.addEventListener('click', () => openModal(newCardPopup));
  newCardCloseButton.addEventListener('click', () => closeModal(newCardPopup));
  cardFormElement.addEventListener('submit', (event) => handleCardFormSubmit(event, newCardPopup));

  // Слушатели событий: открытие карточки
  imagePopupCloseButton.addEventListener('click', () => closeModal(imagePopup));
}

// Инициализация валидации
enableValidation(validationSettings);

// Анимация модальных окон
animationModal(popups)

// Вызов функции для инициализации
initializeEventListeners();

// Инициализация карточек при загрузке страницы
renderInitialCards();