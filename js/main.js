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
const restaurantTitle = document.querySelector(".restaurant-title");
const rating = document.querySelector(".rating");
const minPrice = document.querySelector(".price");
const category = document.querySelector(".category");
const modalBody = document.querySelector(".modal-body");
const modalPrice = document.querySelector(".modal-pricetag");
const buttonClearCart = document.querySelector(".clear-cart");

const cart = [];
// modalAuth.classList.remove('modal-auth'); // удалить класс

let login = localStorage.getItem("gloDelivery"); // получаем логин из localStorage

const getData = async function(url) {
    const response = await fetch(url); //await получает массив json
    if(!response.ok){
      throw new Error(`Ошибка по адресу ${url}, статус ошибка ${response.status}`);
    }
    //console.log(response.json());
    return await response.json();
};




// регулярные выражания для валидации формы
const valid = function(str){
  const nameReg = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/;
  //console.log(nameReg.test(str));
  return nameReg.test(str); 
}

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
function returnMain() {
  containerPromo.classList.remove('hide');
  restaurants.classList.remove('hide');
  menu.classList.add('hide');
}

function autorized() {
  function logOut() {
    login = "";
    localStorage.removeItem("gloDelivery");
    buttonAuth.style.display = "";
    userName.style.display = "";
    buttonOut.style.display = "";
    cartButton.style.display = '';
    buttonOut.removeEventListener("click", logOut);
    checkAuth();
    returnMain();
  }

  console.log("Авторизован");

  userName.textContent = login;

  buttonAuth.style.display = "none";
  userName.style.display = "inline";
  buttonOut.style.display = "flex";
  cartButton.style.display = 'flex';
  buttonOut.addEventListener("click", logOut);
}
function notAutorized() {
  //console.log("Не Авторизован");

function logIn(event) {
    //console.log(event);
    event.preventDefault(); // не отправляем форму по submit не перезагружает окно
    login = loginInput.value; // сохранили имя авторизации в переменную
    if (!valid(login)) {
      //alert("Введите логин");
      loginInput.style.borderColor = "red";
      loginInput.value = "";
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

function createCardRestaurant(restaurant) {

  // вытащить данные с помощью деллигирования
  const { image, kitchen, name, price, stars,
     products, time_of_delivery: timeOfDelivery } = restaurant;

    //console.log(timeOfDelivery);

  

  const card = `
    <a  class="card card-restaurant" data-products="${products}"
     data-info="${[name,price,stars, kitchen]}">
    <img src="${image}" alt="image" class="card-image" />
          <div class="card-text">
                  <div class="card-heading">
                    <h3 class="card-title">${name}</h3>
                    <span class="card-tag tag">${timeOfDelivery}</span>
                  </div>
                <div class="card-info">
                        <div class="rating">
                          ${stars}
                        </div>
                    <div class="price">От ${price} ₽</div>
                    <div class="category">${kitchen}</div>
                </div>
          </div>
              </a>
          `;
  // вставляем карточку в верстку
  cardsRestaurants.insertAdjacentHTML("beforeend", card);
}


function createCardGood(goods) {
  
  const { description, image, name, price, id} = goods;
  

  const  card = document.createElement('div');
  card.className = 'card';
  //card.id = id;

  card.insertAdjacentHTML("beforeend",  `

  <img
    src="${image}"
    alt="${name}"
    class="card-image"
  />
  <div class="card-text">
    <div class="card-heading">
      <h3 class="card-title card-title-reg">${name}</h3>
    </div>
    <div class="card-info">
      <div class="ingredients">
        ${description}
      </div>
    </div>
    <div class="card-buttons">
      <button class="button button-primary button-add-cart" id="${id}">
        <span class="button-card-text">В корзину</span>
        <span class="button-cart-svg"></span>
      </button>
      <strong class="card-price-bold card-price">${price} ₽</strong>
    </div>
  </div>

  `);

  cardsMenu.insertAdjacentElement('beforeend',card);
}

// открывает меню ресторана
function openGoods(event) {

  if (login){
  const target = event.target;

  const restaurant = target.closest(".card-restaurant");

  if (restaurant) {

    // получаем данные из ресторана в виде массива split
    console.log(restaurant.dataset.info.split(','));
    const info = restaurant.dataset.info.split(',');
    const [name, price, stars, kitchen] = info;
    cardsMenu.textContent = '';
    console.log(restaurant);
    containerPromo.classList.add('hide');
    restaurants.classList.add('hide');
    menu.classList.remove('hide');

    restaurantTitle.textContent = name;
    rating.textContent = stars;
    minPrice.textContent = `От ${price} ₽`;
    category.textContent = kitchen;

    // получаем данные data-products метод dataset, пишем только products без data
    
    console.log(restaurant.dataset.name);
    getData(`./db/${restaurant.dataset.products}`).then(function(data){
      data.forEach(createCardGood);
    });
 

  }

  } else {
    toogleModalAuth();
  }
  }

function addToCart(event){

  const target = event.target;

  const buttonAddToCart = target.closest('.button-add-cart');

  if (buttonAddToCart){
    const card = target.closest('.card');
    const title = card.querySelector('.card-title-reg').textContent;
    const cost = card.querySelector('.card-price').textContent;
    const id = buttonAddToCart.id;
    const food = cart.find(function(item){
      return item.id === id;
    });

    if (food){
          food.count += 1;
        } else {
                cart.push({
                id: id,
                title,
                cost,
                count: 1
              });
        }
    }
}


function renderCart(){
  modalBody.textContent = '';

  cart.forEach(function( { id, title, cost, count } ){
    const itemCart = `
            <div class="food-row">
              <span class="food-name">${title}</span>
              <strong class="food-price">${cost}</strong>
              <div class="food-counter">
                <button class="counter-button counter-minus" data-id=${id}>-</button>
                <span class="counter">${count}</span>
                <button class="counter-button counter-plus" data-id=${id}>+</button>
            </div>
    
    `;

    modalBody.insertAdjacentHTML('afterbegin', itemCart);

  });
  const totalPrice = cart.reduce(function(result, item){
    return result + (parseFloat(item.cost))*item.count;
  }, 0);

  modalPrice.textContent = totalPrice + ' ₽';

}

function changeCount(event){
  const target = event.target;

  if (target.classList.contains('counter-button')){
      const food = cart.find(function(item){
        return item.id === target.dataset.id;
      });
        if (target.classList.contains('counter-minus')){
           food.count--;
           if(food.count === 0){
             cart.splice(cart.indexOf(food), 1);
           }

        } 
        if (target.classList.contains('counter-plus')) food.count++;
        renderCart();
  }
  


}

function init() {
  getData('./db/partners.json').then(function(data){
    data.forEach(createCardRestaurant);
  });
  
  cartButton.addEventListener("click", function(){
    
    renderCart();
    toggleModal();

  });
  
  modalBody.addEventListener('click', changeCount);

  buttonClearCart.addEventListener('click', function(){
    cart.length = 0;
    renderCart();
  });

  cardsMenu.addEventListener('click',addToCart);

  close.addEventListener("click", toggleModal);
  
  cardsRestaurants.addEventListener("click", openGoods);
  
  logo.addEventListener('click', function() {
    containerPromo.classList.remove('hide');
    restaurants.classList.remove('hide');
    menu.classList.add('hide');
  });
  
  checkAuth();
  
  
  
  new Swiper('.swiper-container',
      {
        loop: true,
        autoplay: {
          delay: 3000,
        },
   //     slidesPerView: 1,
    //    slidesPerColumn: 1
      });
  
}

init();