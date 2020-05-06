const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}

// day 1

document.querySelector("div"); // получает первый элемент в верстке
//console.log("document: ", document.querySelector(".button-auth"));

const buttonAuth = document.querySelector(".button-auth");
const modalAuth = document.querySelector(".modal-auth");
const closeAuth = document.querySelector(".close-auth");
const logInForm = document.querySelector("#logInForm");
const loginInput = document.querySelector("#login");
const userName = document.querySelector(".user-name");
const buttonOut = document.querySelector(".button-out");
// modalAuth.classList.remove('modal-auth'); // удалить класс

let login = localStorage.getItem("gloDelivery"); // получаем логин из localStorage

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

checkAuth();
