const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}


const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

const toggleButtonState = (inputList, buttonElement, validationSettings) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(validationSettings.inactiveButtonClass);
    } else {
        buttonElement.classList.remove(validationSettings.inactiveButtonClass);
    }
}

const showInputError = (formElement, inputElement, validationSettings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(validationSettings.errorClass);
    inputElement.classList.add(validationSettings.inputErrorClass);

}

const hideInputError = (formElement, inputElement, validationSettings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove(validationSettings.errorClass);
    inputElement.classList.remove(validationSettings.inputErrorClass);

}

const checkInputValidity = (formElement, inputElement, validationSettings) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, validationSettings);
    } else {
        hideInputError(formElement, inputElement, validationSettings);
    }
};


const setInputListeners = (formElement, inputList, validationSettings) => {
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
            checkInputValidity(formElement, inputElement, validationSettings);
        })
    })
}

const enableValidation = (validationSettings) => {
    const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
        const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);
        
        formElement.addEventListener("input", () => {
            toggleButtonState(inputList, buttonElement, validationSettings);
        });

        setInputListeners(formElement, inputList, validationSettings);
    })
}

export {enableValidation, validationSettings};