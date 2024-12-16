const placesList = document.querySelector(".places__list");

// Pop-up

function openModal(popup) {
    document.querySelector(popup).classList.toggle('popup_is-opened');
}

// @todo: Функция создания карточки
function createCard(name, url, addToEnd = true) {
    // @todo: Темплейт карточки
    const template = document.querySelector("#card-template").content;
    const cardElement = template.cloneNode(true);
    const likeButton = cardElement.querySelector(".card__like-button");
    const deleteButton = cardElement.querySelector(".card__delete-button");
    const cardImage = cardElement.querySelector(".card__image");

    // Наполнение карточки

    cardImage.alt = name;
    cardImage.src = url;
    cardElement.querySelector(".card__title").textContent = name;

    // Лайк карточки

    likeButton.addEventListener("click", () => {
        likeButton.classList.toggle("card__like-button_is-active");
    });

    // @todo: Функция удаления карточки

    deleteButton.addEventListener("click", () => {
        deleteButton.closest(".card").remove();
    });

    // Открытие модального окна изображения

    cardImage.addEventListener("click", () => {
        imageModal.querySelector(".popup__image").src = url;
        imageModal.querySelector(".popup__caption").textContent = name;

        openModal(".popup_type_image");
    });

    if(addToEnd == true) placesList.append(cardElement)
        else placesList.prepend(cardElement)

}
// @todo: Вывести карточки на страницу
initialCards.forEach((item) => createCard(item.name, item.link));

// Редактирование профиля

profileEditButton = document.querySelector(".profile__edit-button");
profileEditModal = document.querySelector(".popup_type_edit");

const profileNameInput = profileEditModal.querySelector(".popup__input_type_name");
const profileDescriptionInput = profileEditModal.querySelector(".popup__input_type_description");

profileEditButton.addEventListener("click", () => {
    profileNameInput.value = document.querySelector(".profile__title").textContent;
    profileDescriptionInput.value = document.querySelector(".profile__description").textContent;
    openModal(".popup_type_edit");
});

const closeProfileEditButton = profileEditModal.querySelector(".popup__close");
closeProfileEditButton.addEventListener("click", () => {
    openModal(".popup_type_edit");
});

profileEditModal.classList.add("popup_is-animated");

const submitProfileEditButton = profileEditModal.querySelector(".popup__button");
submitProfileEditButton.addEventListener("click", (event) => {
    event.preventDefault();

    document.querySelector(".profile__title").textContent = profileNameInput.value;
    document.querySelector(".profile__description").textContent = profileDescriptionInput.value;
    openModal(".popup_type_edit");
});

// Добавление карточки

const createCardModal = document.querySelector(".popup_type_new-card");
createCardModal.classList.add("popup_is-animated");

createCardButton = document.querySelector(".profile__add-button");
createCardButton.addEventListener("click", () => { 
    openModal(".popup_type_new-card") 
});

const closeCreateCardButton = createCardModal.querySelector(".popup__close");
closeCreateCardButton.addEventListener("click", () => {
    openModal(".popup_type_new-card") 
});

const submitCardButton = createCardModal.querySelector(".popup__button");
submitCardButton.addEventListener("click", (event) => {
    event.preventDefault();

    cardNameInput = createCardModal.querySelector(".popup__input_type_card-name");
    cardUrlInput = createCardModal.querySelector(".popup__input_type_url");

    createCard(cardNameInput.value, cardUrlInput.value, false);

    cardNameInput.value = "";
    cardUrlInput.value = "";

    openModal(".popup_type_new-card");

});

const imageModal = document.querySelector(".popup_type_image");

// Кнопка закрытия модального окна у изображения
const closeImageModalButton = imageModal.querySelector(".popup__close");
closeImageModalButton.addEventListener("click", () => {
    openModal(".popup_type_image");
});

// Анимация открытия поп ап окна изображения
imageModal.classList.add("popup_is-animated");





