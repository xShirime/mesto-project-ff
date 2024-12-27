import { putLikeCard, deleteLikeCard, deleteDataCard } from "./API.js";

function createCard(item, deleteCallback, openImage, likeCallback, userId) {
  const cardTemplate = document.querySelector("#card-template");
  const cardBlock = cardTemplate.content.querySelector(".card").cloneNode(true);
  const cardTitle = cardBlock.querySelector(".card__title");
  const cardImage = cardBlock.querySelector(".card__image");
  const deleteButton = cardBlock.querySelector(".card__delete-button");
  const likeButton = cardBlock.querySelector(".card__like-button");
  const likeCounter = cardBlock.querySelector(".like-counter");

  cardTitle.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;
  likeCounter.textContent = item.likes.length;

  if (item.owner._id !== userId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener("click", () => {
      deleteCallback(cardBlock, item);
    });
  }

  if (item.likes.some((like) => like._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener("click", () => {
    likeCallback(likeButton, likeCounter, item, userId);
  });

  cardImage.addEventListener("click", () => {
    openImage(item.link, item.name);
  });

  return cardBlock;
}

function deleteCallback(card, item) {
  deleteDataCard(item._id)
    .then(() => {
      card.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

function updateLikeStatus(likeButton, likeCounter, item, userId, action) {
  const apiCall = action === "add" ? putLikeCard : deleteLikeCard;
  apiCall(item._id)
    .then((res) => {
      likeButton.classList.toggle("card__like-button_is-active");
      likeCounter.textContent = res.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
}

function likeCallback(likeButton, likeCounter, item, userId) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  updateLikeStatus(
    likeButton,
    likeCounter,
    item,
    userId,
    isLiked ? "remove" : "add"
  );
}

export { createCard, deleteCallback, likeCallback };
