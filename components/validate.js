// Проверка валидности формы
function checkFormValidity(form, submitButton) {
    const isValid = form.checkValidity();
    submitButton.disabled = !isValid;
}

// Отображения ошибок
function showInputError(input) {
    const errorElement = input.nextElementSibling; 
    if (!input.validity.valid) {
        errorElement.textContent = input.validationMessage; 
        errorElement.style.display = 'block';              
    } else {
        errorElement.textContent = '';                     
        errorElement.style.display = 'none';               
    }
}

// Добавление обработчиков событий для валидации
function enableValidation(form) {
    const inputs = form.querySelectorAll('.popup__input'); 
    const submitButton = form.querySelector('.popup__button');

    checkFormValidity(form, submitButton);

    inputs.forEach((input) => {
        input.addEventListener('input', () => {
            showInputError(input);                     
            checkFormValidity(form, submitButton);     
        });
    });
}

// Инициализация валидации для всех форм
document.querySelectorAll('.popup__form').forEach((form) => {
    enableValidation(form);
});
