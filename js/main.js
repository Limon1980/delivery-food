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
const inputSearch = document.querySelector(".input-search");
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
    buttonOut.removeEventListener("click", logOut);
    checkAuth();
    returnMain();
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
  
  const { description, image, name, price} = goods;
  
 


  const  card = document.createElement('div');
  card.className = 'card';

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
      <button class="button button-primary button-add-cart">
        <span class="button-card-text">В корзину</span>
        <span class="button-cart-svg"></span>
      </button>
      <strong class="card-price-bold">${price} ₽</strong>
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
   // console.log(restaurant.dataset.info.split(','));
    const info = restaurant.dataset.info.split(',');
    const [name, price, stars, kitchen] = info;
    cardsMenu.textContent = '';
    //console.log(restaurant);
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

function init() {
  getData('./db/partners.json').then(function(data){
    data.forEach(createCardRestaurant);
  });
  
  cartButton.addEventListener("click", toggleModal);
  
  close.addEventListener("click", toggleModal);
  
  cardsRestaurants.addEventListener("click", openGoods);
  
  logo.addEventListener('click', function() {
    containerPromo.classList.remove('hide');
    restaurants.classList.remove('hide');
    menu.classList.add('hide');

  });
  
  	inputSearch.addEventListener('keydown', function(event) {

		if (event.keyCode === 13) {
			const target = event.target;
			
			const value = target.value.toLowerCase().trim();

			target.value = '';

			if (!value || value.length < 3) {
				target.style.backgroundColor = 'tomato';
				setTimeout(function(){
					target.style.backgroundColor = '';
				}, 2000);
				return;
			}

			const goods = [];
			
			getData('./db/partners.json')
				.then(function(data) {
					
					const products = data.map(function(item){
						return item.products;
					});


					products.forEach(function(product){
						getData(`./db/${product}`)
							.then(function(data){
								
								goods.push(...data);

								const searchGoods = goods.filter(function(item) {
									return item.name.toLowerCase().includes(value)
								})

								console.log(searchGoods);
								
								cardsMenu.textContent = '';

								containerPromo.classList.add('hide');
								restaurants.classList.add('hide');
								menu.classList.remove('hide');

								restaurantTitle.textContent = 'Результат поиска';
								rating.textContent = '';
								minPrice.textContent = '';
								category.textContent = '';

								return searchGoods;
							})
							.then(function(data){
								data.forEach(createCardGood);
							})
					})
					
					
				});

			
				
		}
		
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