'use strict';

document.querySelector("div"); // получает первый элемент в верстке
//console.log("document: ", document.querySelector(".button-auth"));

const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const buttonAuth = document.querySelector(".button-auth");
const modalAuth = document.querySelector(".modal-auth");
const closeAuth = document.querySelector(".close-auth");
const logInForm = document.querySelector("#logInForm");
const loginInput = document.querySelector("#login");
const userName = document.querySelector(".user-name");
const buttonOut = document.querySelector(".button-out");
const cardsRestaurants = document.querySelector(".cards-restaurants");
const containerPromo = document.querySelector(".container-promo");
const restaurants = document.querySelector(".restaurants");
const menu = document.querySelector(".menu");
const logo = document.querySelector(".logo");
const cardsMenu = document.querySelector(".cards-menu");
// modalAuth.classList.remove('modal-auth'); // удалить класс

let login = localStorage.getItem("gloDelivery"); // получаем логин из localStorage

function toggleModal() {
  modal.classList.toggle("is-open");
}

function toogleModalAuth() {
  modalAuth.classList.toggle("is-open");
  loginInput.style.borderColor = "";
}

//buttonAuth.addEventListener("click", toggleModal);

//console.dir(modalAuth);

// не современно использовать onckick надо addEvenListener
// buttonAuth.onclick = function () {
//   console.log("Hello");
//   toogleModalAuth();
// };

// пример функции click
// buttonAuth.addEventListener("click", function () {
//   console.log("Hello");
// });

//buttonAuth.removeEventListener('click', toogleModalAuth);

function autorized() {
  function logOut() {
    login = "";
    localStorage.removeItem("gloDelivery");
    buttonAuth.style.display = "";
    userName.style.display = "";
    buttonOut.style.display = "";
    buttonOut.removeEventListener("click", logOut);
    checkAuth();
  }

  console.log("Авторизован");

  userName.textContent = login;

  buttonAuth.style.display = "none";
  userName.style.display = "inline";
  buttonOut.style.display = "block";

  buttonOut.addEventListener("click", logOut);
}
function notAutorized() {
  //console.log("Не Авторизован");

function logIn(event) {
    //console.log(event);
    event.preventDefault(); // не отправляем форму по submit не перезагружает окно
    login = loginInput.value; // сохранили имя авторизации в переменную
    if (!login) {
      //alert("Введите логин");
      loginInput.style.borderColor = "red";
    } else {
      localStorage.setItem("gloDelivery", login);

      toogleModalAuth(); // закрыли модальное окно
      buttonAuth.removeEventListener("click", toogleModalAuth); // Открыть окно авторизации
      closeAuth.removeEventListener("click", toogleModalAuth); // закрыть окно авторизации
      logInForm.removeEventListener("submit", logIn); // закрыть окно авторизации
      logInForm.reset();
      checkAuth(); // проверяем авторизацию
      // console.log("Логин");
      // console.log(loginInput.value);
    }
  }

  buttonAuth.addEventListener("click", toogleModalAuth); // Открыть окно авторизации
  closeAuth.addEventListener("click", toogleModalAuth); // закрыть окно авторизации
  logInForm.addEventListener("submit", logIn); // закрыть окно авторизации
}

function checkAuth() {
  if (login) {
    autorized();
  } else {
    notAutorized();
  }
}

// карточка товара

function createCardRestaurant() {
  const card = `
    <a  class="card card-restaurant">
    <img src="img/tanuki/preview.jpg" alt="image" class="card-image" />
          <div class="card-text">
                  <div class="card-heading">
                    <h3 class="card-title">Тануки</h3>
                    <span class="card-tag tag">60 мин</span>
                  </div>
                <div class="card-info">
                        <div class="rating">
                          4.5
                        </div>
                    <div class="price">От 1 200 ₽</div>
                    <div class="category">Суши, роллы</div>
                </div>
          </div>
              </a>
          `;
  // вставляем карточку в верстку
  cardsRestaurants.insertAdjacentHTML("beforeend", card);
}


function createCardGood() {
  const  card = document.createElement('div');
  card.className = 'card';

  card.insertAdjacentHTML("beforeend",  `

  <img
    src="img/pizza-plus/pizza-classic.jpg"
    alt="image"
    class="card-image"
  />
  <div class="card-text">
    <div class="card-heading">
      <h3 class="card-title card-title-reg">Пицца Классика</h3>
    </div>
    <div class="card-info">
      <div class="ingredients">
        Соус томатный, сыр «Моцарелла», сыр «Пармезан», ветчина,
        салями, грибы.
      </div>
    </div>
    <div class="card-buttons">
      <button class="button button-primary button-add-cart">
        <span class="button-card-text">В корзину</span>
        <span class="button-cart-svg"></span>
      </button>
      <strong class="card-price-bold">510 ₽</strong>
    </div>
  </div>

  `);

  cardsMenu.insertAdjacentElement('beforeend',card);
}


function openGoods(event) {

  if (login){
  const target = event.target;

  const restaurant = target.closest(".card-restaurant");

  if (restaurant) {
    cardsMenu.textContent = '';
    console.log(restaurant);
    containerPromo.classList.add('hide');
    restaurants.classList.add('hide');
    menu.classList.remove('hide');

   

    createCardGood();
    createCardGood();
    createCardGood();
  }

} else {
  toogleModalAuth();
}
}


cartButton.addEventListener("click", toggleModal);

close.addEventListener("click", toggleModal);

cardsRestaurants.addEventListener("click", openGoods);

logo.addEventListener('click', function() {
  containerPromo.classList.remove('hide');
  restaurants.classList.remove('hide');
  menu.classList.add('hide');
});

checkAuth();

createCardRestaurant();
createCardRestaurant();
createCardRestaurant();

new Swiper('.swiper-container',
{
  loop: true,
  autoplay: true,
}) 