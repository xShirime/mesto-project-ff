import "./pages/index.css";
import { createCard, deleteCallback, likeCallback } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";
import {
  placeCardList,
  popupImage,
  popupImageElement,
  popupCaption,
  closeModalButtons,
  popupEdit,
  profileEditButton,
  popupAddCard,
  profileAddButton,
  formElementProfile,
  nameInput,
  jobInput,
  formElementAddCard,
  cardNameInput,
  cardLinkInput,
  profileTitle,
  profileDescription,
  avatarForm,
  profileOpenAvatar,
  profileEditAvatar,
  modalAvatar,
  avatarUrlInput,
  btnSubmitAvatar,
  btnSubmitEditProfile,
  btnSubmitAddNewCard,
} from "./components/names.js";
import { clearValidation, enableValidation } from "./components/validation.js";
import {
  getUserRequest,
  loadCards,
  editProfileApi,
  newAvatarApi,
  addNewCardApi,
} from "./components/API.js";
import { validationElements } from "./components/validationElements.js";

enableValidation(validationElements);

let userId;

profileOpenAvatar.addEventListener("click", () => {
  openPopup(modalAvatar);
  clearValidation(modalAvatar, validationElements);
});

function addAvatar(evt) {
  evt.preventDefault();
  const originalText = btnSubmitAvatar.textContent;
  renderLoading(true, btnSubmitAvatar, originalText);
  newAvatarApi(avatarUrlInput.value)
    .then((res) => {
      profileEditAvatar.src = res.avatar;
      avatarForm.reset();
      closePopup(modalAvatar);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(false, btnSubmitAvatar, originalText);
    });
}

profileAddButton.addEventListener("click", () => {
  openPopup(popupAddCard);
  clearValidation(popupAddCard, validationElements);
});

profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupEdit);
  clearValidation(popupEdit, validationElements);
});

function openImage(link, name) {
  popupImageElement.src = link;
  popupImageElement.alt = name;
  popupCaption.textContent = name;
  openPopup(popupImage);
}

closeModalButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => {
    closePopup(popup);
  });
});

function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  const originalText = btnSubmitEditProfile.textContent;
  renderLoading(true, btnSubmitEditProfile, originalText);
  editProfileApi(nameInput.value, jobInput.value)
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
      closePopup(popupEdit);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(false, btnSubmitEditProfile, originalText);
    });
}

function handleCardSubmit(evt) {
  evt.preventDefault();
  const originalText = btnSubmitAddNewCard.textContent;
  renderLoading(true, btnSubmitAddNewCard, originalText);
  addNewCardApi(cardNameInput.value, cardLinkInput.value)
    .then((item) => {
      const newCard = createCard(
        item,
        deleteCallback,
        openImage,
        likeCallback,
        userId
      );
      addCard(newCard, true);
      formElementAddCard.reset();
      closePopup(popupAddCard);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      formElementAddCard.reset();
      renderLoading(false, btnSubmitAddNewCard, originalText);
    });
}

function addCard(item, atFirst) {
  if (atFirst) {
    placeCardList.prepend(item);
  } else {
    placeCardList.append(item);
  }
}

function renderLoading(isLoading, submitBtn, originalText) {
  if (isLoading) {
    submitBtn.textContent = "Сохранение...";
  } else {
    submitBtn.textContent = originalText;
  }
}

formElementProfile.addEventListener("submit", handleFormProfileSubmit);
formElementAddCard.addEventListener("submit", handleCardSubmit);
avatarForm.addEventListener("submit", addAvatar);

Promise.all([getUserRequest(), loadCards()])
  .then(([dataRes, cardRes]) => {
    userId = dataRes._id;
    profileTitle.textContent = dataRes.name;
    profileDescription.textContent = dataRes.about;
    profileEditAvatar.src = dataRes.avatar;
    cardRes.forEach(function (item) {
      const card = createCard(
        item,
        deleteCallback,
        openImage,
        likeCallback,
        userId
      );
      addCard(card);
    });
  })
  .catch((err) => {
    console.log(err);
  });
