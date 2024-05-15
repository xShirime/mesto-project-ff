
function openPopup(popup) {
  popup.classList.add('popup_is-animated');
  popup.classList.add('popup_is-opened');

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closePopup(popup);
    }
  });
}

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closePopup(popup);
    }
  });
}

function closeEscPopup(e) { 
  if(e.key === 'Escape') { 
  const popup = document.querySelector('.popup_is-opened')
  closePopup(popup) 
  } 
}

export {openPopup, closePopup, closeEscPopup};