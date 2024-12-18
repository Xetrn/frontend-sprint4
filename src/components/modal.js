function openModal(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener("keydown", (evt) => closeByEsc(evt));
}
function closeModal(popup) {
    popup.classList.toggle("popup_is-opened");
    document.removeEventListener("keydown", (evt) => closeByEsc(evt)); /*TODO тут ломается выход черес esc */
}

const closePopupOverlay = (evt, popup) => {
    const overlay = evt.target;
    const s1 = overlay.classList.contains("popup");
    const s2 = overlay.classList.contains("popup__content");
    if (s1 && !s2) {
        closeModal(popup);
    }
}

function closeByEsc(evt){
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector('.popup_opened');
        closeModal(openedPopup);
    }
}

export { openModal, closeModal, closePopupOverlay }
