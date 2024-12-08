const placesList = document.querySelector('.places__list');

const profileEditButton = document.querySelector('.profile__edit-button');

const profilePopup = document.querySelector('.popup_type_edit');
profilePopup.classList.add('popup_is-animated');
const profileCloseButton = profilePopup.querySelector('.popup__close');
const profileFormElement = profilePopup.querySelector('.popup__form');
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const jobInput = profilePopup.querySelector('.popup__input_type_description');
const profileSubmitButton = profilePopup.querySelector('.popup__button');
const profileTitle = document.querySelector('.profile__title');
const profileDescript = document.querySelector('.profile__description');

const cardPopup = document.querySelector('.popup_type_new-card');
cardPopup.classList.add('popup_is-animated');

const imagePopup = document.querySelector('.popup_type_image');
imagePopup.classList.add('popup_is-animated');

// создание карточки
function createCard(initialCard) {
    const card = document.querySelector('#card-template').content.cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    cardImage.src = initialCard.link;
    cardImage.alt = initialCard.name;
    const cardTitle = card.querySelector('.card__title');
    cardTitle.textContent = initialCard.name;

    //удаление карточки
    const deleteCardButton = card.querySelector('.card__delete-button');
    deleteCardButton.addEventListener('click', function(evt) {
        evt.target.closest('.card').remove('.card');
    });
    
    // добавление кнопки лайка
    const likeButton = card.querySelector('.card__like-button');
    likeButton.addEventListener('click', function(evt) {
        evt.target.classList.toggle('card__like-button_is-active');
    });

    // открытие попапа с картинкой
    const closeImagePopupButton = imagePopup.querySelector('.popup__close');
    const imagePopupImage = imagePopup.querySelector('.popup__image');
    const imagePopupCaption = imagePopup.querySelector('.popup__caption');

    cardImage.addEventListener('click', function() {
        imagePopupImage.src = cardImage.src;
        imagePopupImage.alt = cardImage.alt;
        imagePopupCaption.textContent = cardTitle.textContent;
        openModal(imagePopup);
    });

    closeImagePopupButton.addEventListener('click', function() {
        closeModal(imagePopup);
    });

    

    return card;
}

// добавление карточек из массива на страницу
for (let i = 0; i < initialCards.length; i++) {
    placesList.append(createCard(initialCards[i]));
}

// открытие попапа
function openModal(popup) {
    popup.classList.add('popup_is-opened');
}

// закрытие попапа
function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
}

// Редактирование профиля
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescript.textContent = jobInput.value;
    closeModal(profilePopup);
}
//добавить заполненное значение в форму
function getInputValue() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescript.textContent;
}

getInputValue();

profileFormElement.addEventListener('submit', handleProfileFormSubmit);
profileEditButton.addEventListener('click', () => openModal(profilePopup));
profileCloseButton.addEventListener('click', function () {
    getInputValue();
    closeModal(profilePopup);
});
// Конец редактировние профиля


// Добавление новой карточки в начало списка
const cardFormElement = cardPopup.querySelector('.popup__form');
const profileAddButton = document.querySelector('.profile__add-button');
const cardCloseButton = cardPopup.querySelector('.popup__close');
const cardName = cardPopup.querySelector('.popup__input_type_card-name');
const cardUrl = cardPopup.querySelector('.popup__input_type_url');

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const newCard = createCard({
        name: cardName.value,
        link: cardUrl.value
    });
    cardName.value = '';
    cardUrl.value = '';
    placesList.prepend(newCard);
    closeModal(cardPopup);
}

cardFormElement.addEventListener('submit', handleCardFormSubmit);
profileAddButton.addEventListener('click', () => openModal(cardPopup));
cardCloseButton.addEventListener('click', function () {
    cardName.value = '';
    cardUrl.value = '';
    closeModal(cardPopup);
});