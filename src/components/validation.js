const showError = (formElement, inputElement, errorMessage, elements) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(elements.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(elements.errorClass);
};

const hideError = (formElement, inputElement, elements) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(elements.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(elements.errorClass);
};

const setEventListeners = (formElement, elements) => {
  const inputList = formElement.querySelectorAll(elements.inputSelector);
  const buttonElement = formElement.querySelector(
    elements.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement, elements);
  for (const inputElement of inputList) {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, elements);
      toggleButtonState(inputList, buttonElement, elements);
    });
  }
};

const checkInputValidity = (formElement, inputElement, elements) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (inputElement.validity.valid) {
    hideError(formElement, inputElement, elements);
  } else {
    showError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      elements
    );
  }
};

const hasInvalidInput = (inputList) => {
  let hasInvalid = false;
  for (const inputElement of inputList) {
    if (!inputElement.validity.valid) {
      hasInvalid = true;
    }
  }
  return hasInvalid;
};

const toggleButtonState = (inputList, buttonElement, elements) => {
  const isInvalid = hasInvalidInput(inputList);
  buttonElement.disabled = isInvalid;
  buttonElement.classList.toggle(elements.inactiveButtonClass, isInvalid);
};

export const enableValidation = (elements) => {
  const formList = document.querySelectorAll(elements.formSelector);
  for (const formElement of formList) {
    setEventListeners(formElement, elements);
  }
};

export const clearValidation = (formElement, elements) => {
  const inputList = formElement.querySelectorAll(elements.inputSelector);
  const buttonElement = formElement.querySelector(
    elements.submitButtonSelector
  );
  for (const inputElement of inputList) {
    hideError(formElement, inputElement, elements);
  }
  toggleButtonState(inputList, buttonElement, elements);
};
