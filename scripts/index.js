const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");

profilePopup.classList.add("popup_is-animated");
cardPopup.classList.add("popup_is-animated");
imagePopup.classList.add("popup_is-animated");

const profileButton = document.querySelector(".profile__edit-button");
const closeProfilePopupButton = profilePopup.querySelector(".popup__close");

profileButton.addEventListener("click", function () {
    nameInput.value = document.querySelector(".profile__title").textContent;
    jobInput.value = document.querySelector(".profile__description").textContent;
    openModal(profilePopup);
})

closeProfilePopupButton.addEventListener("click", function () {
    closeModal(profilePopup);
})


const profileFormElement = profilePopup.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");


function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    document.querySelector(".profile__title").textContent = nameInput.value;
    document.querySelector(".profile__description").textContent = jobInput.value;
    closeModal(profilePopup);
}
profileFormElement.addEventListener('submit', handleProfileFormSubmit);


function openModal(popup) {
    popup.classList.add('popup_is-opened');
}
function closeModal(popup) {
    popup.classList.toggle("popup_is-opened");
}

const imageOfImagePopup = imagePopup.querySelector(".popup__image");
const captionOfImagePopup = imagePopup.querySelector(".popup__caption");
const closeImagePopupButton = imagePopup.querySelector(".popup__close");

closeImagePopupButton.addEventListener("click", function () {
    closeModal(imagePopup);
})

const createCard = function (itemName, itemLink) {
    const cardTemplate = document.querySelector("#card-template").content;
    const newCard = cardTemplate.cloneNode(true);
    newCard.querySelector(".card__image").src = itemLink;
    newCard.querySelector(".card__title").textContent = itemName;

    const likeButton = newCard.querySelector(".card__like-button");
    likeButton.addEventListener("click", function () {
        likeButton.classList.toggle("card__like-button_is-active");
    })

    const deleteButton = newCard.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", function () {
        const elementToDelete = deleteButton.closest(".places__item");
        elementToDelete.remove();
    })

    const imageOfCard = newCard.querySelector(".card__image");
    imageOfCard.addEventListener("click", function(){
        imageOfImagePopup.src = itemLink;
        captionOfImagePopup.textContent = itemName;
        openModal(imagePopup);
    })
    return newCard;
};

const placesList = document.querySelector(".places__list");
const buttonAddCard = document.querySelector(".profile__add-button");
const closePopupCardButton = cardPopup.querySelector(".popup__close");

for (let i = 0; i < initialCards.length; i++) {
    const newCardFromCards = createCard(initialCards[i].name, initialCards[i].link);
    placesList.append(newCardFromCards);
}

buttonAddCard.addEventListener("click", function () {
    openModal(cardPopup);
})

closePopupCardButton.addEventListener("click", function () {
    closeModal(cardPopup);
})

const cardFormElement = cardPopup.querySelector(".popup__form");
const namePlaceInput = document.querySelector(".popup__input_type_card-name");
const urlPlaceInput = document.querySelector(".popup__input_type_url");

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const newName = namePlaceInput.value;
    const newImage = urlPlaceInput.value;
    console.log(newName, newImage)
    const newCard = createCard(newName, newImage);
    console.log(newCard)
    placesList.prepend(newCard);
    closeModal(cardPopup);
    namePlaceInput.value = "";
    urlPlaceInput.value = "";
}
cardFormElement.addEventListener('submit', handleCardFormSubmit);
