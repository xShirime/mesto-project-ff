import { handlePreviewImage } from "..";

const cardTemplate = document.querySelector('#card-template');




export default function createCard(cardData, handleLikeButton, deleteCard, openPopupImg) {
  const card = cardTemplate.content.cloneNode(true);
  const deleteButton = card.querySelector('.card__delete-button');
  const cardTitle = card.querySelector('.card__title');
  const img = card.querySelector('.card__image');
  const likeButton = card.querySelector('.card__like-button');

  cardTitle.textContent = cardData.name;
  img.src = cardData.link;
  img.alt = cardData.name;

  likeButton.addEventListener('click', handleLikeButton);

  deleteButton.addEventListener('click', deleteCard)

  img.addEventListener('click', openPopupImg);

  function openPopupImg(evt) { 
    const targetImage = evt.target; 
    
    const cardData = { 
      name: targetImage.alt, 
      link: targetImage.src 
    }; 
    
  
    handlePreviewImage(cardData); 
  };

  function handleLikeButton(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
  }

  function deleteCard(evt) {
    evt.target.closest('.card').remove();
  }

  return card; 
}