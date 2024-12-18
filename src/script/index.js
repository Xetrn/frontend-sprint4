const profile = document.querySelector(".profile");
const editButton = profile.querySelector(".profile__edit-button");
const addButton = profile.querySelector(".profile__add-button");
const profileName = profile.querySelector(".profile__title");
const profileJob = profile.querySelector(".profile__subtitle");

const popupEdit = document.querySelector("#popup-edit");
const popupAdd = document.querySelector("#popup-add");
const popupImage = document.querySelector("#popup-expand-image");

const formEdit = popupEdit.querySelector("#popup-edit-form");
const formAdd = popupAdd.querySelector("#popup-add-form");

const nameInput = formEdit.querySelector(".popup__input_name");
const jobInput = formEdit.querySelector(".popup__input_job");

const list = document.querySelector(".elements");

const cardTemplate = document.querySelector(".template-card").content.querySelector(".element");

const submitEdit = popupEdit.querySelector('.popup__save-button');
const submitAdd = popupAdd.querySelector('.popup__save-button');

const inputPlace = popupAdd.querySelector('.popup__input_type_place');
const inputUrl = popupAdd.querySelector('.popup__input_type_url');

const imagePopupImg = popupImage.querySelector(".popup__image");
const imagePopupCaption = popupImage.querySelector(".popup__figure-caption");

const backgroundEdit = popupEdit.querySelector('.popup__background');
const backgroundAdd = popupAdd.querySelector('.popup__background');
const backgroundImage = popupImage.querySelector('.popup__background');

function createCard(data) {
  const cardsElement = cardTemplate.cloneNode(true);
  const titleImage = cardsElement.querySelector('.element__image');
  const titleCard = cardsElement.querySelector('.element__title');
  const buttonLike = cardsElement.querySelector('.element__like-button');
  const deleteButton = cardsElement.querySelector(".element__del-button");

  buttonLike.addEventListener('click', function handleLikeClick() {
    buttonLike.classList.toggle('element__like-button_status_active');
  });

  deleteButton.addEventListener('click', function handledeleteClick() {
    deleteButton.closest('.element').remove();
  });
  titleImage.addEventListener('click', function handledPhotoCards() {
    imagePopupCaption.textContent = data.name;
    imagePopupImg.src = data.link;
    imagePopupImg.alt = data.name;
    openPopup(popupImage);
    closeEscapeAdd(popupImage);
    closeBackground(popupImage);
  });

  titleCard.textContent = data.name;
  titleImage.src = data.link;
  titleImage.alt = data.name;

  return cardsElement;
}

function openPopup(form) {
  const closeButton = form.querySelector(".popup__close-button");
  form.classList.add('popup_opened');
  closeButton.addEventListener('click', function () {
    closePopup(form);
  });
}

function closePopup(form) {
  document.removeEventListener('keydown', closeEscape);
  document.removeEventListener('click', closeBackground);
  form.classList.remove('popup_opened');
  resetPopup(form);
}

function resetPopup(form) {
  if (form.querySelector('.popup__form')) {
    form.querySelector('.popup__form').reset();
  }
}

editButton.addEventListener('click', function () {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  closeEscapeAdd(popupEdit);
  closeBackground(popupEdit);
});

addButton.addEventListener('click', () => {
  openPopup(popupAdd);
  closeEscapeAdd(popupAdd);
  closeBackground(popupAdd);
});

const closeEscapeAdd = (form) => {
  document.addEventListener('keydown', closeEscape)
};

const closeEscape = (evt) => {
  const activePopup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(activePopup);
  }
}

const closeBackground = (form) => {
  document.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__background')) {
      closePopup(form);
    }
  });
};


formEdit.addEventListener("submit", formEditSubmitHandler);
submitAdd.addEventListener('click', formAddSubmitHandler);

function formEditSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEdit);
}

function renderCard(data) {
  list.prepend(createCard(data))
}

initialCards.forEach((data) => {
  renderCard(data);
})

function formAddSubmitHandler(evt) {
  evt.preventDefault();
  renderCard({ name: inputPlace.value, link: inputUrl.value });
  closePopup(popupAdd);
  submitAdd.disabled = "true";
  submitAdd.classList.add('popup__save-button_status_disabled');
}


