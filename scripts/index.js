// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;


// @todo: DOM узлы
const content = document.querySelector('.places__list');
const cardElement = cardTemplate.querySelector('.places__item');

// @todo: Функция создания карточки
initialCards.forEach( function (item) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  cardElement.querySelector('.card__image').src = item.link;
  cardElement.querySelector('.card__title').textContent = item.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteCard)

  content.append(cardElement);
})

// @todo: Функция удаления карточки
function deleteCard(event) {
  const listItem = event.target.closest('.places__item');
  listItem.remove();
}

// @todo: Вывести карточки на страницу
