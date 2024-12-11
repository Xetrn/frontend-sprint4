// @todo: DOM узлы
const getEl = (selector, parent = document) => parent.querySelector(selector)
const getEls = (selector, parent = document) =>
  parent.querySelectorAll(selector)

const template = getEl('#card-template').content
const cardList = getEl('.places__list')
const popups = getEls('.popup')
const profilePopup = getEl('.popup_type_edit')
const cardPopup = getEl('.popup_type_new-card')
const imagePopup = getEl('.popup_type_image')
const profileName = getEl('.profile__title')
const profileDescript = getEl('.profile__description')

const setupButton = (button, popup) =>
  button.addEventListener('click', () => toggleModal(popup))

setupButton(getEl('.profile__edit-button'), profilePopup)
setupButton(getEl('.profile__add-button'), cardPopup)

// @todo: Функция создания карточки
const createCard = (title, srcImg) => {
  const card = getEl('.card', template).cloneNode(true)
  const cardImg = getEl('.card__image', card)
  const cardTitle = getEl('.card__title', card)

  cardImg.src = srcImg
  cardImg.alt = title
  cardTitle.textContent = title

  cardImg.onclick = () => {
    openModal(imagePopup, { src: srcImg, alt: title, title })
  }

  return card
}

const toggleModal = (popup) => {
  popup.classList.toggle('popup_is-opened')
}

function openModal(popup, { src, alt, title } = {}) {
  if (src) {
    getEl('.popup__image', popup).src = src
    getEl('.popup__image', popup).alt = alt
    getEl('.popup__caption', popup).innerHTML = title
  }
  popup.classList.add('popup_is-opened')
}

popups.forEach((popup) => {
  setupButton(getEl('.popup__close', popup), popup)
  popup.classList.add('popup_is-animated')
})

getEl('.popup__form', profilePopup).onsubmit = (evt) => {
  evt.preventDefault()
  profileName.innerHTML = getEl('.popup__input_type_name', profilePopup).value
  profileDescript.innerHTML = getEl(
    '.popup__input_type_description',
    profilePopup
  ).value
  toggleModal(profilePopup)
}

getEl('.popup__form', cardPopup).onsubmit = (evt) => {
  evt.preventDefault()
  const name = getEl('.popup__input_type_card-name', cardPopup).value
  const link = getEl('.popup__input_type_url', cardPopup).value
  cardList.prepend(createCard(name, link))
  evt.target.reset()
  toggleModal(cardPopup)
}

// @todo: Вывести карточки на страницу
const renderCard = (name, link) => {
  cardList.prepend(createCard(name, link))
}

const initCards = (cards) => {
  cardList.innerHTML = ''
  cards.reverse().forEach(({ name, link }) => renderCard(name, link))
}

// @todo: Функция удаления карточки
cardList.onclick = ({ target }) => {
  if (target.classList.contains('card__delete-button')) {
    target.closest('.card').remove()
  } else if (target.classList.contains('card__like-button')) {
    target.classList.toggle('card__like-button_is-active')
  }
}

initCards(initialCards)
