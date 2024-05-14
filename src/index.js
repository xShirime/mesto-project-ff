import './styles/index.css';
import { openPopup, closePopup } from './scripts/modal.js';
import {initialCards} from './scripts/cards.js';
import createCard from './scripts/card.js';

const cardContent = document.querySelector('.places__list');

// * popups
const popupEdit = document.querySelector('.popup_type_edit');
const popupImage = document.querySelector('.popup_type_image');
const popupAddNewCard = document.querySelector('.popup_type_new-card');

// * buttons
const popupEditOpenButton = document.querySelector('.profile__edit-button');
const popupAddNewCardOpenButton = document.querySelector('.profile__add-button');

const popupEditCloseButton = popupEdit.querySelector('.popup__close');
const popupImageCloseButton = popupImage.querySelector('.popup__close');
const popupAddNewCardCloseButton = popupAddNewCard.querySelector('.popup__close');

// * inputs
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardImageInput = document.querySelector('.popup__input_type_url');

// * profile
const currentName = document.querySelector('.profile__title');
const currentJob = document.querySelector('.profile__description');

// * Elems
const formElement = document.querySelector('.popup__form');
const formElements = document.querySelectorAll('.popup__form');



function addCard(cardData, cardContainer, newCard) {
  const card = createCard(cardData);

  if (newCard) {
    cardContainer.prepend(card);
  } else {
    cardContainer.append(card);
  }
}


initialCards.forEach(item => {
  addCard(item, cardContent, false);
});


// ! popupImage

popupImageCloseButton.addEventListener('click', () => {
  closePopup(popupImage)
});


window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closePopup(popupImage)
  }
});

popupImage.addEventListener('click', function (e) {
  if (!e.target.closest('.popup__content')) {
    closePopup(popupImage);
  }
});

  //! popupEdit

  popupEditOpenButton.addEventListener('click', function() {
    openPopup(popupEdit);

    nameInput.value = currentName.textContent;
    jobInput.value = currentJob.textContent;

    return
  })

  popupEditCloseButton.addEventListener('click', function() {
    closePopup(popupEdit);
    
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closePopup(popupEdit);
    }
  });

  popupEdit.addEventListener('click', function (e) {
    if (!e.target.closest('.popup__content')) {
      closePopup(popupEdit);
    }
  });

  // ! popupAddNewCard

popupAddNewCardOpenButton.addEventListener('click', function() {
  openPopup(popupAddNewCard);
});

function popupAddNewCardClose() {
  closePopup(popupAddNewCard);
  cardNameInput.value = '';
  cardImageInput.value = '';
}

popupAddNewCardCloseButton.addEventListener('click', function() {
  popupAddNewCardClose()
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    popupAddNewCardClose();
  }
});

popupAddNewCard.addEventListener('click', function (e) {
  if (!e.target.closest('.popup__content')) {
    popupAddNewCardClose();
  }
});

//! submit Edit

function handleFormSubmit(evt) {
  evt.preventDefault();

  nameInput.value;
  jobInput.value;

  currentName.textContent = nameInput.value;
  currentJob.textContent = jobInput.value;
  
  closePopup(popupEdit);
}

formElements[0].addEventListener('submit', handleFormSubmit);

// ! add new card submit

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  addCard({
    name: cardNameInput.value,
    link: cardImageInput.value
  }, cardContent, true)

  popupAddNewCardClose();

  formElement.reset();
}

formElements[1].addEventListener('submit', handleCardFormSubmit);


