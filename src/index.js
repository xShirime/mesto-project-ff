import "./styles/index.css";
import { openPopup, closePopup } from "./scripts/modal.js";
import { initialCards } from "./scripts/cards.js";
import createCard from "./scripts/card.js";
import { handleLikeButton } from "./scripts/card.js";

const cardContent = document.querySelector(".places__list");

// * popups
const popupEdit = document.querySelector(".popup_type_edit");
const popupImage = document.querySelector(".popup_type_image");
const popupAddNewCard = document.querySelector(".popup_type_new-card");

// * buttons
const popupEditOpenButton = document.querySelector(".profile__edit-button");
const popupAddNewCardOpenButton = document.querySelector(".profile__add-button");

const popupEditCloseButton = popupEdit.querySelector(".popup__close");
const popupImageCloseButton = popupImage.querySelector(".popup__close");
const popupAddNewCardCloseButton = popupAddNewCard.querySelector(".popup__close");

// * inputs
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardImageInput = document.querySelector(".popup__input_type_url");

// * profile
const currentName = document.querySelector(".profile__title");
const currentJob = document.querySelector(".profile__description");

// * Elems
const formElementEdit = popupEdit.querySelector(".popup__form");
const formElementAddNewCard = popupAddNewCard.querySelector(".popup__form");

const imageElement = document.querySelector(".popup__image");
const imageCaption = document.querySelector(".popup__caption");

// !  Functions

function addCard(cardData, cardContainer, newCard) {
  const card = createCard(cardData, openPopupImg);

  if (newCard) {
    cardContainer.prepend(card);
  } else {
    cardContainer.append(card);
  }
}

function openPopupEdit() {
  openPopup(popupEdit);

  nameInput.value = currentName.textContent;
  jobInput.value = currentJob.textContent;

  return;
}

function closePopupAddNewCard() {
  closePopup(popupAddNewCard);
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();

  nameInput.value;
  jobInput.value;

  currentName.textContent = nameInput.value;
  currentJob.textContent = jobInput.value;

  closePopup(popupEdit);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  addCard(
    {
      name: cardNameInput.value,
      link: cardImageInput.value,
    },
    cardContent,
    true
  );

  closePopupAddNewCard();

  formElementAddNewCard.reset();
}

export function openPopupImg(evt) { 
  const targetImage = evt.target; 
  
  const cardData = { 
    name: targetImage.alt, 
    link: targetImage.src 
  }; 
  

  handlePreviewImage(cardData); 
};

function handlePreviewImage(popupImageData) {
  openPopup(popupImage);

  imageElement.src = popupImageData.link;
  imageElement.alt = popupImageData.name;
  imageCaption.textContent = popupImageData.name;
}

initialCards.forEach((item) => {
  addCard(item, cardContent, false);
});

// ! Listeners

popupImageCloseButton.addEventListener("click", () => {
  closePopup(popupImage);
});

popupImage.addEventListener("click", function (e) {
  if (!e.target.closest(".popup__content")) {
    closePopup(popupImage);
  }
});

popupEditOpenButton.addEventListener("click", function() {
  openPopupEdit();
});

popupEditCloseButton.addEventListener("click", function () {
  closePopup(popupEdit);
});

popupEdit.addEventListener("click", function (e) {
  if (!e.target.closest(".popup__content")) {
    closePopup(popupEdit);
  }
});

popupAddNewCardOpenButton.addEventListener("click", function () {
  openPopup(popupAddNewCard);
});

popupAddNewCardCloseButton.addEventListener("click", function () {
  closePopupAddNewCard();
});

popupAddNewCard.addEventListener("click", function (e) {
  if (!e.target.closest(".popup__content")) {
    closePopupAddNewCard();
  }
});

formElementEdit.addEventListener("submit", handleEditFormSubmit);

formElementAddNewCard.addEventListener("submit", handleCardFormSubmit);
