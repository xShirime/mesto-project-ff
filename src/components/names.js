const placeCardList = document.querySelector('.places__list');
const popupImage = document.querySelector('.popup_type_image');
const popupImageElement = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const closeModalButtons = document.querySelectorAll('.popup__close');
const popupEdit = document.querySelector('.popup_type_edit');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupAddCard = document.querySelector('.popup_type_new-card');
const profileAddButton = document.querySelector('.profile__add-button');
const formElementProfile = document.querySelector('form[name="edit-profile"]');
const nameInput = formElementProfile.querySelector('.popup__input_type_name');
const jobInput = formElementProfile.querySelector('.popup__input_type_description');
const formElementAddCard = document.querySelector('form[name="new-place"]');
const cardNameInput = formElementAddCard.querySelector('.popup__input_type_card-name');
const cardLinkInput = formElementAddCard.querySelector('.popup__input_type_url');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const avatarForm = document.querySelector('form[name="new-avatar"]');
const profileOpenAvatar = document.querySelector('.profile__avatar');
const profileEditAvatar = document.querySelector('.profile__image');
const modalAvatar = document.querySelector('.popup_type-avatar');
const avatarUrlInput = document.querySelector('.popup__input_type_url-avatar');
const btnSubmitAvatar = document.querySelector('.button-submit-avatar');
const btnSubmitEditProfile = document.querySelector('.button-submit-edit-profile');
const btnSubmitAddNewCard = document.querySelector('.button-submit-add-new-card');

export {
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
    btnSubmitAddNewCard
};