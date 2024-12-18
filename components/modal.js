import { popups } from '../components/index.js';

export const openModal = (popup) => {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEsc);
};

export const closeModal = (popup) => {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEsc);
};


const closeByEsc = (evt) => {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) closeModal(openedPopup);
    }
};

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target === popup) {
            closeModal(popup);
        }
    });
    const buttonClose = popup.querySelector('.popup__close');
    buttonClose.addEventListener('click', () => closeModal(popup));
    popup.classList.add('popup_is-animated');
});