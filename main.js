"use sctrict";

const sendComment = () => {
  const form = document.getElementById("form");
  const formElements = form.querySelectorAll(".input");
  const formName = document.querySelector(".name");
  const formDate = document.querySelector(".date");
  const formMessage = document.querySelector(".message");
  const nameError = document.getElementById("name-error");
  const messageError = document.getElementById("message-error");
  let data = new Date();
  let year = data.getFullYear();
  let day = data.getDate();
  let month = data.getMonth();
  let hours = data.getHours();
  let minutes = data.getMinutes();
  let time = hours + ":" + minutes;

  //функция валидации

  function validate() {
    if (formName.value.length <= 1) {
      formName.style.border = " 2px solid red";
      nameError.textContent = "Имя должно быть более 1 буквы";
      return false;
    }

    if (formMessage.value.length <= 1) {
      formMessage.style.border = " 2px solid red";
      messageError.textContent = "Введите текст";
      return false;
    }
    //проверка даты
    if (formDate.value == "") {
      if (month < 10) {
        month = "0" + month;
      }
      formDate.value = year + "-" + month + "-" + day;
    }

    return true;
  }

  //убираем ошибку при фокусе
  formName.addEventListener("focus", function () {
    formName.style.border = "none";
    nameError.textContent = "";
  });

  formMessage.addEventListener("focus", function () {
    formMessage.style.border = "none";
    messageError.textContent = "";
  });

  //функция создания комментария
  function createComment() {
    let comment = document.createElement("div");
    comment.classList.add("comment-block");
    document.body.append(comment);

    let block = document.createElement("div");
    block.classList.add("block");
    comment.append(block);

    let name = document.createElement("span");
    name.textContent = formName.value;
    block.append(name);

    let date = document.createElement("span");
    if (formDate.value == year + "-" + month + "-" + day) {
      date.textContent = "Сегодня" + " " + time;
    } else {
      date.textContent = formDate.value + " " + time;
    }
    block.append(date);

    let message = document.createElement("p");
    message.textContent = formMessage.value;
    comment.append(message);

    let block2 = document.createElement("div");
    block2.classList.add("block");
    comment.append(block2);

    let like = document.createElement("div");
    like.classList.add("dislike");
    like.onclick = tapLike;
    block2.append(like);

    let basket = document.createElement("img");
    basket.src = "./img/icon.png";
    basket.classList.add("delete");
    basket.style.width = 30 + "px";
    basket.onclick = clear;
    block2.append(basket);
  }

  //слушатель на форму по кнопке
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    // вызов функции валидации если возвращает true, то создание элемента
    if (validate()) {
      createComment();
      //очистка формы
      formElements.forEach((input) => {
        input.value = "";
      });
    }
  });

  //лайк
  function tapLike() {
    this.classList.toggle("like");
  }

  //удаление комментария
  function clear() {
    this.parentElement.parentElement.remove();
  }
};

sendComment();
