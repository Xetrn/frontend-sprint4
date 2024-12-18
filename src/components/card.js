export const createCard = (title, srcImg) => {
	const template = document.getElementById('card-template').content
	const card = template.querySelector('.card').cloneNode(true)
	const cardImg = card.querySelector('.card__image')

	cardImg.src = srcImg
	cardImg.alt = title

	card.querySelector('.card__title').textContent = title

	return card
}
