// клонирование шаблона карточки
const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

// константы модального окна профиля
const profilePopup = document.querySelector('.popup_type_edit');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileForm = document.querySelector('.popup__form');
const nameInput = profileForm.querySelector('.popup__input_type_name');
const profileName = document.querySelector('.profile__title');
const jobInput = profileForm.querySelector('.popup__input_type_description');
const profileJob = document.querySelector('.profile__description');

// константы модального окна создания карточки
const cardPopup = document.querySelector('.popup_type_new-card');
const cardForm = document.querySelector('[name="new-place"]');
const cardInputName = cardForm.querySelector('.popup__input_type_card-name');
const cardName = document.querySelector('.card__description');
const cardInputImage = cardForm.querySelector('.popup__input_type_url');
const cardAddButton = document.querySelector('.profile__add-button');

// константы модального окна изображений
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupUrl = document.querySelector('.popup__image');
const imageDescription = document.querySelector('.popup__caption');

const popupCloseButton = document.querySelectorAll('.popup__close');

imagePopup.classList.add('popup_is-animated');
cardPopup.classList.add('popup_is-animated');
profilePopup.classList.add('popup_is-animated');

// вывод карточек из массива
initialCards.forEach(function(element) { 
    cardElement = createCard(element); 
    placesList.append(cardElement); 
});

// функция создания новой карточки + кнопка лайка, удаления и слушатель открытия модального окна изображения
function createCard(element) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    cardImage.src = element.link;
    cardImage.alt = element.name;
    cardTitle.textContent = element.name;

    cardElement.querySelector('.card__like-button').addEventListener('click', function(evt){
        evt.target.classList.toggle('card__like-button_is-active');
    });
    
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', function(){
        deleteButton.closest('.card').remove();
    });

    cardImage.addEventListener('click', function(){
        imagePopupUrl.src =cardImage.src;
        imageDescription.textContent = cardTitle.textContent;
        openModal(imagePopup);
    });
    
    return cardElement;
};


// функция открытия модального окна
function openModal(popup) {      
    popup.classList.add('popup_is-opened');
};

// закрытие модального окна
function closeModal(event) {
    const popupClose = event.target.closest('.popup');
    popupClose.classList.remove('popup_is-opened');
};

popupCloseButton.forEach(function(button){
    button.addEventListener('click', closeModal);
});

// открытие модального окна профиля + его функционал
profileEditButton.addEventListener('click', function() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openModal(profilePopup);
});

function handleProfileFormSubmit(evt) {
    evt.preventDefault(); 
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

    profileName.textContent = nameValue;
    profileJob.textContent = jobValue;

};

profileForm.addEventListener('submit', function(event){
    handleProfileFormSubmit(event);
    closeModal(event);
}); 

// открытие модального окна создания карточки + вывод на страницу
cardAddButton.addEventListener('click', function(){
    openModal(cardPopup);
});

function handleCardFormSubmit(evt){
    evt.preventDefault();
    const urlValue = cardInputImage.value;
    const cardNameValue = cardInputName.value;
    const newCard = { name: cardNameValue, link: urlValue }; 
    
    placesList.prepend(createCard(newCard));
    cardInputImage.value = ''; 
    cardInputName.value = '';
};

cardForm.addEventListener('submit', function(event){
    handleCardFormSubmit(event);
    closeModal(event);
});