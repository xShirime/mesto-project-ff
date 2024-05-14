import { openPopup } from "./modal";

const popupImage = document.querySelector('.popup_type_image');

const cardTemplate = document.querySelector('#card-template');
const imageElement = document.querySelector('.popup__image');
const imageCaption = document.querySelector('.popup__caption');


export default function createCard(cardData) {
  const card = cardTemplate.content.cloneNode(true);
  const deleteButton = card.querySelector('.card__delete-button');
  const cardTitle = card.querySelector('.card__title');
  const img = card.querySelector('.card__image');
  const likeButton = card.querySelector('.card__like-button');

  cardTitle.textContent = cardData.name;
  img.src = cardData.link;
  img.alt = cardData.name;


  likeButton.addEventListener('click', evt => {
    evt.target.classList.toggle('card__like-button_is-active');
  });

  deleteButton.addEventListener('click', evt => {
    evt.target.closest('.card').remove();
  });

  
  img.addEventListener('click', evt => {
    const targetImage = evt.target;
    
    const cardData = {
      name: targetImage.alt,
      link: targetImage.src
    };
    

    handlePreviewImage(cardData);
  });

  return card;
}

function handlePreviewImage(popupImageData) {
  openPopup(popupImage);

  imageElement.src = popupImageData.link;
  imageElement.alt = popupImageData.name;
  imageCaption.textContent = popupImageData.name;
}