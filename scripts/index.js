const placesList = document.querySelector('.places__list');
const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

const profileFormElem = document.querySelector('.popup__form');
const nameInput = profileFormElem.querySelector('.popup__input_type_name');
const jobInput = profileFormElem.querySelector('.popup__input_type_description');
const editProfileButton = document.querySelector('.profile__edit-button');
const closeProfileButton = profilePopup.querySelector('.popup__close');
const saveProfileButton = profilePopup.querySelector('.popup__button');

const addCardButton = document.querySelector('.profile__add-button');
const cardFormElem = cardPopup.querySelector('.popup__form');
const cardNameInput = cardPopup.querySelector('.popup__input_type_card-name');
const urlInput = cardPopup.querySelector('.popup__input_type_url');
const closeCardButton = cardPopup.querySelector('.popup__close');
const saveCardButton = cardPopup.querySelector('.popup__button');

const closeImagePopupButton = imagePopup.querySelector('.popup__close');
const popupImage = imagePopup.querySelector('.popup__image');
const popupImageCaption = imagePopup.querySelector('.popup__caption');

function openModal(popup) {
    popup.classList.add('popup_is-opened');
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
}

function handleFormSubmit(evt, callback) {
    evt.preventDefault();
    callback();
}

function createCard(name, link, alt) {
    const cardTemplate = document.querySelector('#card-template').content;
    const card = cardTemplate.querySelector('.card').cloneNode(true);

    card.querySelector('.card__image').src = link;
    card.querySelector('.card__image').alt = alt;
    card.querySelector('.card__title').textContent = name;

    card.querySelector('.card__like-button').addEventListener('click', (e) => 
        e.target.classList.toggle('card__like-button_is-active')
    );

    card.querySelector('.card__image').addEventListener('click', () => {
        openModal(imagePopup);
        popupImage.src = link;
        popupImage.alt = alt;
        popupImageCaption.textContent = name;
    });

    card.querySelector('.card__delete-button').addEventListener('click', (e) => 
        e.target.closest('.card').remove()
    );

    return card;
}

function addDefaultProfileValues() {
    nameInput.value = document.querySelector('.profile__title').textContent;
    jobInput.value = document.querySelector('.profile__description').textContent;
}

function initializeDefaultCards() {
    initialCards.forEach(card => {
        placesList.append(createCard(card.name, card.link, card.alt));
    });
}

editProfileButton.addEventListener('click', () => {
    addDefaultProfileValues();
    openModal(profilePopup);
});

closeProfileButton.addEventListener('click', () => closeModal(profilePopup));

saveProfileButton.addEventListener('click', () => closeModal(profilePopup));

addCardButton.addEventListener('click', () => openModal(cardPopup));

closeCardButton.addEventListener('click', () => {
    closeModal(cardPopup);
    cardNameInput.value = '';
    urlInput.value = '';
});

closeImagePopupButton.addEventListener('click', () => closeModal(imagePopup));

profileFormElem.addEventListener('submit', (evt) => 
    handleFormSubmit(evt, () => {
        document.querySelector('.profile__title').textContent = nameInput.value;
        document.querySelector('.profile__description').textContent = jobInput.value;
        closeModal(profilePopup);
    })
);

cardFormElem.addEventListener('submit', (evt) => 
    handleFormSubmit(evt, () => {
        placesList.prepend(createCard(cardNameInput.value, urlInput.value, cardNameInput.value));
        closeModal(cardPopup);
        cardNameInput.value = '';
        urlInput.value = '';
    })
);

profilePopup.classList.add('popup_is-animated');
cardPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');

initializeDefaultCards();
