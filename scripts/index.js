//массив с карточками и контент темплейта
const placesList = document.querySelector('.places__list')
const cardTemplate = document.querySelector('#card-template').content

//крестики, закрывающие попапы, псевдомассив
const closePopup = document.querySelectorAll('.popup__close')

//редактирование профиля попап
const profilePopup = document.querySelector('.popup_type_edit')
const profileFormElement = profilePopup.querySelector('.popup__form')
const nameInput = profilePopup.querySelector('.popup__input_type_name')
const jobInput = profilePopup.querySelector('.popup__input_type_description')

//добавление карточек попап
const cardPopup = document.querySelector('.popup_type_new-card')
const cardFormElement = cardPopup.querySelector('.popup__form')
const cardNameInput = cardPopup.querySelector('.popup__input_type_card-name')
const cardUrlInput = cardPopup.querySelector('.popup__input_type_url')

//картинка у карточки попап
const imagePopup = document.querySelector('.popup_type_image')
const cardPopupImage = imagePopup.querySelector('.popup__image')
const cardPopupCaption = imagePopup.querySelector('.popup__caption')

//элементы профиля
const profileEditButton = document.querySelector('.profile__edit-button')
const cardAddButton = document.querySelector('.profile__add-button')
const profileName = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')

//добавление попапам плавных анимаций
profilePopup.classList.add('popup_is-animated')
cardPopup.classList.add('popup_is-animated')
imagePopup.classList.add('popup_is-animated')

//создание карточки, на вход подается объект из ключей name и link
function createCard(data) {
    const cardElement = cardTemplate.cloneNode(true)
    const cardImage = cardElement.querySelector('.card__image')
    const cardTitle = cardElement.querySelector('.card__title')
    const deleteButton = cardElement.querySelector('.card__delete-button')
    const likeButton = cardElement.querySelector('.card__like-button')

    cardTitle.textContent = data.name
    cardImage.src = data.link
    cardImage.alt = data.name

    //лайк в карточке
    likeButton.addEventListener('click', function(evt) {
        evt.target.classList.toggle('card__like-button_is-active')
    });

    //удаление карточки
    deleteButton.addEventListener('click', function(evt) {
        evt.target.closest('.card').remove()
    });

    //открытие картинки попап
    cardImage.addEventListener('click', function() {
        cardPopupImage.src = cardImage.src
        cardPopupCaption.textContent = cardTitle.textContent
        openModal(imagePopup)
    });

    return cardElement;
};

//6 начальных карточек из массива
initialCards.forEach(function (item) {
    placesList.append(createCard(item))
});

//открытие модального окна
function openModal(popup) {
    popup.classList.add('popup_is-opened');
};

//закрытие модального окна
function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
};

//автозаполнение в модальном окне редактирования профиля и его открытие
profileEditButton.addEventListener('click', function() {
    nameInput.value = profileName.textContent
    jobInput.value = profileDescription.textContent
    openModal(profilePopup);
});

//при нажатии на крестик закрываются попапы
closePopup.forEach(function (item) {
    item.addEventListener('click', function() {
        closeModal(item.closest('.popup'))
    })
});

//имя и текст на главном экране как в форме, 
// которую заполняют в попапе, и закрытие попапа
function handleProfileFormSubmit(evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value
    profileDescription.textContent = jobInput.value
    closeModal(profilePopup)
};
//что происходит при отправке формы
profileFormElement.addEventListener('submit', handleProfileFormSubmit);

//открытие попапа создания карточки
cardAddButton.addEventListener('click', function() {
    openModal(cardPopup)
});

//создание объекта из имени и ссылки на картинку,
//данные которых вводятся в форме (в попапе редактирования карточек)
//очистка инпутов формы и закрытие попапа
function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const newCard = {
        name: cardNameInput.value,
        link: cardUrlInput.value
    }
    placesList.prepend(createCard(newCard))
    cardNameInput.value = ''
    cardUrlInput.value = ''
    closeModal(cardPopup)

};
//что происходит при отправке формы
cardFormElement.addEventListener('submit', handleCardFormSubmit);