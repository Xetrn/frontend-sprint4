
const popupObj = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    activeButtonClass: 'popup__save-button',
    inactiveButtonClass: 'popup__save-button_status_disabled',
    inputErrorClass: 'popup__input_type_error',
    inputValidClass: 'popup__input_type_valid',
    errorElement: 'popup__input-error',
    errorClass: 'popup__input-error_status_active'
  }
  
  
  
  const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass,
    inputErrorClass, errorClass ) => {
  const inputs = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonSubmit = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputs, buttonSubmit, inactiveButtonClass);
    inputs.forEach((inputElement) => {
      inputElement.addEventListener('input', (evt) => {
        isValid(formElement, inputElement, inputErrorClass, errorClass);
        toggleButtonState(inputs, buttonSubmit, inactiveButtonClass);
      });
    });
  };
  
  const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
  };
  
  const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
  };
  
  const isValid = (formElement, inputElement, inputErrorClass, errorClass) => {
    if(!inputElement.validity.valid){
      showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    }else{
      hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    }
  };
  
  const hasInvalidInput = (inputs) => {
    return inputs.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };
  
  const toggleButtonState = (inputs, buttonSubmit, inactiveButtonClass) => {
    if (hasInvalidInput(inputs)) {
      buttonSubmit.classList.add(inactiveButtonClass);
      buttonSubmit.disabled = true;
    } else {
      buttonSubmit.classList.remove(inactiveButtonClass);
       buttonSubmit.disabled = false;
    }
  };
  
  function enableValidation({ formSelector, inputSelector, submitButtonSelector,activeButtonClass, inactiveButtonClass,
    inputErrorClass, inputValidClass, errorClass}){
     const forms = Array.from(document.querySelectorAll(formSelector));
      forms.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass,
        inputErrorClass, errorClass );
    });
  };
  enableValidation(popupObj);
  
  
  
  