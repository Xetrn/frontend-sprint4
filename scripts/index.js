// @todo: Темплейт карточки

const template = document.getElementById('card-template').content
const templateImg = template.querySelector('.card__image')
const templateTitle = template.querySelector('.card__title')

// @todo: DOM узлы
const cardList = document.querySelector('.places__list')
const cards = cardList.querySelectorAll('.card')

const popups = document.querySelectorAll('.popup')

const profilePopup = document.querySelector('.popup_type_edit')
const cardPopup = document.querySelector('.popup_type_new-card')
const imagePopup = document.querySelector('.popup_type_image')

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
const saveButtonProfilePopup = profilePopup.querySelector('.popup__button')

const nameInputCardPopup = cardPopup.querySelector(
	'.popup__input_type_card-name'
)
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

	document.addEventListener('keydown', closeByEsc)
}
const closeModal = popup => {
	popup.classList.remove('popup_is-opened')

	document.removeEventListener('keydown', closeByEsc)
}

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

function closeByEsc(evt) {
	if (evt.key === 'Escape') {
		const openedPopup = document.querySelector('.popup_is-opened')
		closeModal(openedPopup)
	}
}

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

// Валидация

const hasInvalidInput = inputList => {
	return inputList.some(inputElement => {
		return !inputElement.validity.valid
	})
}

const toggleButtonState = (inputList, buttonElement, validationSettings) => {
	if (hasInvalidInput(inputList)) {
		buttonElement.classList.add(validationSettings.inactiveButtonClass)
		buttonElement.disabled = true
	} else {
		buttonElement.classList.remove(validationSettings.inactiveButtonClass)
		buttonElement.disabled = false
	}
}

const showInputError = (
	formElement,
	inputElement,
	errorMessage,
	validationSettings
) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
	inputElement.classList.add(validationSettings.inputErrorClass)
	errorElement.textContent = errorMessage
	errorElement.classList.add(validationSettings.errorClass)
}

const hideInputError = (formElement, inputElement, validationSettings) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
	inputElement.classList.remove(validationSettings.inputErrorClass)
	errorElement.classList.remove(validationSettings.errorClass)
	errorElement.textContent = ''
}

const isValid = (formElement, inputElement, validationSettings) => {
	if (!inputElement.validity.valid) {
		showInputError(
			formElement,
			inputElement,
			inputElement.validationMessage,
			validationSettings
		)
	} else {
		hideInputError(formElement, inputElement, validationSettings)
	}
}

const setEventListeners = (formElement, validationSettings) => {
	const inputList = Array.from(
		formElement.querySelectorAll(validationSettings.inputSelector)
	)
	const buttonElement = formElement.querySelector(
		validationSettings.submitButtonSelector
	)

	toggleButtonState(inputList, buttonElement, validationSettings)

	inputList.forEach(inputElement => {
		inputElement.addEventListener('input', () => {
			isValid(formElement, inputElement, validationSettings)

			toggleButtonState(inputList, buttonElement, validationSettings)
		})
	})
}

const enableValidation = validationSettings => {
	const formList = Array.from(
		document.querySelectorAll(validationSettings.formSelector)
	)

	formList.forEach(formElement => {
		setEventListeners(formElement, validationSettings)
	})
}

const validationSettings = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_disabled',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__error_visible',
}

enableValidation(validationSettings)
