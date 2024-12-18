import './styles/index.css'

import { enableValidation } from './components/validate'
import { initialCards } from './components/cards'
import { createCard } from './components/card'
import { openModal, closeModal } from './components/modal'

const validationSettings = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_disabled',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__error_visible',
}

const imagePopup = document.querySelector('.popup_type_image')

const captionImagePopup = imagePopup.querySelector('.popup__caption')
const imgCardImagePopup = imagePopup.querySelector('.popup__image')

const cardList = document.querySelector('.places__list')

const popups = document.querySelectorAll('.popup')

const profilePopup = document.querySelector('.popup_type_edit')
const cardPopup = document.querySelector('.popup_type_new-card')

const profileEditButton = document.querySelector('.profile__edit-button')
const profileAddButton = document.querySelector('.profile__add-button')

const profileFormElement = profilePopup.querySelector('.popup__form')
const cardFormElement = cardPopup.querySelector('.popup__form')

const profileName = document.querySelector('.profile__title')
const profileDescript = document.querySelector('.profile__description')

const nameInputProfilePopup = profilePopup.querySelector(
	'.popup__input_type_name'
)
const descriptInputProfilePopup = profilePopup.querySelector(
	'.popup__input_type_description'
)

const nameInputCardPopup = cardPopup.querySelector(
	'.popup__input_type_card-name'
)
const urlInputCardPopup = cardPopup.querySelector('.popup__input_type_url')

initialCards.map(({ name, link }) => cardList.prepend(createCard(name, link)))

profileEditButton.addEventListener('click', () => openModal(profilePopup))
profileAddButton.addEventListener('click', () => openModal(cardPopup))

popups.forEach(popup => {
	const buttonClose = popup.querySelector('.popup__close')
	buttonClose.addEventListener('click', () => closeModal(popup))
	popup.addEventListener('mousedown', function (e) {
		if (e.target.classList.contains('popup')) closeModal(popup)
	})
	popup.classList.add('popup_is-animated')
})

nameInputProfilePopup.value = profileName.textContent
descriptInputProfilePopup.value = profileDescript.textContent

function handleProfileFormSubmit(evt) {
	evt.preventDefault()
	closeModal(profilePopup)
	profileName.textContent = nameInputProfilePopup.value
	profileDescript.textContent = descriptInputProfilePopup.value
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit)

function handleCardFormSubmit(evt) {
	evt.preventDefault()

	closeModal(cardPopup)
	cardList.prepend(
		createCard(nameInputCardPopup.value, urlInputCardPopup.value)
	)
	cardFormElement.reset()
}

cardFormElement.addEventListener('submit', handleCardFormSubmit)

cardList.addEventListener('click', function (evt) {
	if (evt.target.classList.contains('card__delete-button')) {
		evt.target.closest('.card').remove()
	}
})

cardList.addEventListener('click', function (evt) {
	if (evt.target.classList.contains('card__like-button')) {
		evt.target.classList.toggle('card__like-button_is-active')
	}
})

cardList.addEventListener('click', function (evt) {
	if (evt.target.classList.contains('card__image')) {
		const card = evt.target.closest('.card')

		captionImagePopup.textContent =
			card.querySelector('.card__title').textContent
		imgCardImagePopup.src = card.querySelector('.card__image').src
		imgCardImagePopup.alt = card.querySelector('.card__title').textContent

		openModal(imagePopup)
	}
})

enableValidation(validationSettings)
