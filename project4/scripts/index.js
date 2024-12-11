// @todo: Темплейт карточки

const template = document.getElementById('card-template').content
const templateImg = template.querySelector('.card__image')
const templateTitle = template.querySelector('.card__title')

// @todo: DOM узлы

const cardList = document.querySelector('.places__list')

const cards = cardList.querySelectorAll('.card')

const popups = document.querySelectorAll('.popup')
const cardPopup = document.querySelector('.popup_type_new-card')
const imagePopup = document.querySelector('.popup_type_image')
const profilePopup = document.querySelector('.popup_type_edit')
const profileFormElement = profilePopup.querySelector('.popup__form')
const cardFormElement = cardPopup.querySelector('.popup__form')

const profileEditButton = document.querySelector('.profile__edit-button')
const profileAddButton = document.querySelector('.profile__add-button')
const profileName = document.querySelector('.profile__title')
const profileDescript = document.querySelector('.profile__description')

const nameInputProfilePopup = profilePopup.querySelector('.popup__input_type_name')

const descriptInputProfilePopup = profilePopup.querySelector('.popup__input_type_description')

const saveButtonProfilePopup = profilePopup.querySelector('.popup__button')

const nameInputCardPopup = cardPopup.querySelector('.popup__input_type_card-name')

const urlInputCardPopup = cardPopup.querySelector('.popup__input_type_url')

const saveButtonCardPopup = cardPopup.querySelector('.popup__button')

const captionImagePopup = imagePopup.querySelector('.popup__caption')

const imgCardImagePopup = imagePopup.querySelector('.popup__image')

// @todo: Функция создания карточки

const createCard = (title, srcImg) => {
    const card = template.querySelector('.card').cloneNode(true)
    const cardImg = card.querySelector('.card__image')

	cardImg.src = srcImg
	cardImg.alt = title

	card.querySelector('.card__title').textContent = title

	cardImg.addEventListener('click', () => {
        captionImagePopup.innerHTML = title
		imgCardImagePopup.src = srcImg
		imgCardImagePopup.alt = title
		openModal(imagePopup)
	})
	return card
}

// @todo: Функция удаления карточки

cardList.addEventListener('click', function (evt) {
	if (evt.target.classList.contains('card__delete-button')) {
		evt.target.closest('.card').remove()
	}
})

// @todo: Вывести карточки на страницу

const renderCard = (name, link) => {
	cardList.prepend(createCard(name, link))
}

initialCards.map(({ name, link }) => renderCard(name, link))

const openModal = popup => {
	popup.classList.add('popup_is-opened')
}

const closeModal = popup => {
	popup.classList.remove('popup_is-opened')
}

profileEditButton.addEventListener('click', () => openModal(profilePopup))
profileAddButton.addEventListener('click', () => openModal(cardPopup))

popups.forEach(popup => {
	const buttonClose = popup.querySelector('.popup__close')
	buttonClose.addEventListener('click', () => closeModal(popup))
	popup.classList.add('popup_is-animated')
})

nameInputProfilePopup.value = profileName.textContent
descriptInputProfilePopup.value = profileDescript.textContent

function handleProfileFormSubmit(evt) {
	evt.preventDefault()
	closeModal(profilePopup)
	profileName.innerHTML = nameInputProfilePopup.value
	profileDescript.innerHTML = descriptInputProfilePopup.value
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit)

function handleCardFormSubmit(evt) {
	evt.preventDefault()
	closeModal(cardPopup)
	renderCard(nameInputCardPopup.value, urlInputCardPopup.value)
	cardFormElement.reset()
}

cardFormElement.addEventListener('submit', handleCardFormSubmit)

cardList.addEventListener('click', function (evt) {
	if (evt.target.classList.contains('card__like-button')) {
		evt.target.classList.toggle('card__like-button_is-active')
	}
})