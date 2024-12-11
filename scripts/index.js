

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
}

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
}

function openModalProfile(popup) {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;

  openModal(popup);
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

// Анимация модальных окон
animationModal(popups)

// Вызов функции для инициализации
initializeEventListeners();

// Инициализация карточек при загрузке страницы
renderInitialCards();