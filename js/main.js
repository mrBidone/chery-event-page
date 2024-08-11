const form = document.getElementById("tgForm");
const submitBtn = document.getElementById("btnSendform");
const messageBlock = document.getElementById("messageBlock");

const TOKEN = "7276650181:AAHlTP9WN0aK8GLVjwMeYABk1uBDNyBc2Ik";
const CHATT_ID = "-1002228237081";
const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nameInput = this.tgInputName.value.trim();
  const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s]+$/;
  const availableMob = this.tgSelectAvailableMob.value;
  const availableDesk = this.tgSelectAvailableDesk.value;
  const driveParticipation = this.tgSelectDrive.value;

  if (!nameInput || !nameRegex.test(nameInput)) {
    submitBtn.classList.add("form-error");
    setTimeout(function () {
      submitBtn.classList.remove("form-error");
    }, 1000);
    console.log(
      "Ошибка: Поле 'Имя и Фамилия' должно быть заполнено и содержать только буквы."
    );
    return;
  } else if (
    availableMob !== "Да" &&
    availableMob !== "Нет" &&
    availableDesk !== "Да" &&
    availableDesk !== "Нет"
  ) {
    submitBtn.classList.add("form-error");
    setTimeout(function () {
      submitBtn.classList.remove("form-error");
    }, 1000);
    console.log("Ошибка: Не выбран обязательный вариант ");
    return;
  } else if (driveParticipation !== "Да" && driveParticipation !== "Нет") {
    submitBtn.classList.add("form-error");
    setTimeout(function () {
      submitBtn.classList.remove("form-error");
    }, 1000);
    console.log("Ошибка: Не выбран обязательный вариант ");
    return;
  }
  submitBtn.classList.remove("form-error");
  let message = ``;

  message += `<b>Имя и Фамилия</b>: ${this.tgInputName.value}\n`;
  if (availableMob === "Да" || availableMob === "Нет") {
    message += `<b>Участие</b>: ${availableMob}\n`;
  } else if (availableDesk === "Да" || availableDesk === "Нет") {
    message += `<b>Участие</b>: ${availableDesk}\n`;
  }
  message += `<b>Test-Drive</b>: ${this.tgSelectDrive.value}\n`;

  axios
    .post(URI_API, {
      chat_id: CHATT_ID,
      parse_mode: "html",
      text: message,
    })
    .then((res) => {})
    .catch((err) => {})
    .finally(() => {
      form.reset();
      messageBlock.classList.remove("visually-hidden");
    });
});

const car = document.querySelector(".car");
const section = document.querySelector(".car-section");
const trackLeftF = document.querySelector(".track-left-first");
const trackLeftS = document.querySelector(".track-left-second");
const trackRightF = document.querySelector(".track-right-first");
const trackRightS = document.querySelector(".track-right-second");
const messageTestDrive = document.querySelector(".testDrive-message");
const carContainer = document.querySelector(".car-container");

// Функция для обновления позиции машины при скролле
function updateCarPosition() {
  // Высота окна и секции
  const windowHeight = window.innerHeight;
  const sectionTop = section.getBoundingClientRect().top;
  const sectionHeight = section.offsetHeight;

  // Процент прокрутки внутри секции
  const scrollPercentage = Math.min(
    Math.max((windowHeight - sectionTop) / (windowHeight + sectionHeight), 0),
    1
  );

  // Смещение машины (от 100% до -100%)
  const translateX = -10 - scrollPercentage * 90;
  // console.log(translateX);

  // Обновляем стиль трансформации для машины
  car.style.transform = `translateX(${translateX}%)`;
}

// Привязываем функцию к событию скролла
window.addEventListener("scroll", updateCarPosition);

// Устанавливаем начальную позицию машины
updateCarPosition();

window.addEventListener("scroll", () => {
  const carRect = car.getBoundingClientRect();
  const carCenter = carRect.left + carRect.width / 2;
  const carRectRight = carRect.right - 60;
  const carRectLeft = carRect.left + 70;

  const containerRect = carContainer.getBoundingClientRect();
  const containerCenter = containerRect.left + containerRect.width / 2;

  const messageTestDriveRect = messageTestDrive.getBoundingClientRect();
  const messageTestDriveCenter =
    messageTestDriveRect.left + messageTestDriveRect.width / 2;

  if (
    carRectLeft < containerCenter
    // ||
    // carRectLeft < containerCenter + 10 ||
    // carRectLeft < containerCenter + 20 ||
    // carRectLeft < containerCenter + 30 ||
    // carRectLeft < containerCenter + 40 ||
    // carRectLeft < containerCenter + 50 ||
    // carRectLeft < containerCenter + 60 ||
    // carRectLeft < containerCenter + 70 ||
    // carRectLeft < containerCenter + 80
  ) {
    trackLeftS.classList.add("show");
    trackRightS.classList.add("show");
  } else {
    trackLeftS.classList.remove("show");
    trackRightS.classList.remove("show");
  }

  if (
    carRectRight < containerCenter
    // ||
    // carRectRight < containerCenter + 20 ||
    // carRectRight < containerCenter + 40 ||
    // carRectRight < containerCenter + 50 ||
    // carRectRight < containerCenter + 60 ||
    // carRectRight < containerCenter + 70 ||
    // carRectRight < containerCenter + 80 ||
    // carRectRight < containerCenter + 90 ||
    // carRectRight < containerCenter + 100
  ) {
    trackLeftF.classList.add("show");
    trackRightF.classList.add("show");
  } else {
    trackLeftF.classList.remove("show");
    trackRightF.classList.remove("show");
  }

  if (carCenter < messageTestDriveCenter) {
    messageTestDrive.classList.add("show");
  } else {
    messageTestDrive.classList.remove("show");
  }
});

// ======================Optimizated code ========================================

// const car = document.querySelector(".car");
// const section = document.querySelector(".car-section");
// const trackLeftF = document.querySelector(".track-left-first");
// const trackLeftS = document.querySelector(".track-left-second");
// const trackRightF = document.querySelector(".track-right-first");
// const trackRightS = document.querySelector(".track-right-second");
// const messageTestDrive = document.querySelector(".testDrive-message");
// const carContainer = document.querySelector(".car-container");

// // Функция для обновления позиции машины при скролле
// function updateCarPosition() {
//   const windowHeight = window.innerHeight;
//   const sectionTop = section.getBoundingClientRect().top;
//   const sectionHeight = section.offsetHeight;

//   const scrollPercentage = Math.min(
//     Math.max((windowHeight - sectionTop) / (windowHeight + sectionHeight), 0),
//     1
//   );

//   const translateX = 100 - scrollPercentage * 200;
//   car.style.transform = `translateX(${translateX}%)`;

//   updateElementsVisibility();
// }

// // Функция для показа или скрытия элементов (следов и текста)
// function updateElementsVisibility() {
//   const carRect = car.getBoundingClientRect();
//   const containerRect = carContainer.getBoundingClientRect();
//   const containerCenter = containerRect.left + containerRect.width / 2;
//   const messageTestDriveRect = messageTestDrive.getBoundingClientRect();
//   const messageTestDriveCenter =
//     messageTestDriveRect.left + messageTestDriveRect.width / 2;

//   toggleClass(trackLeftS, carRect.left + 70 < containerCenter, "show");
//   toggleClass(trackRightS, carRect.left + 70 < containerCenter, "show");

//   toggleClass(trackLeftF, carRect.right - 60 < containerCenter, "show");
//   toggleClass(trackRightF, carRect.right - 60 < containerCenter, "show");

//   toggleClass(
//     messageTestDrive,
//     carRect.left + carRect.width / 2 < messageTestDriveCenter,
//     "show"
//   );
// }

// // Утилита для добавления или удаления класса
// function toggleClass(element, condition, className) {
//   if (condition) {
//     element.classList.add(className);
//   } else {
//     element.classList.remove(className);
//   }
// }

// // Дебаунсинг события скролла
// function debounce(func, wait = 20, immediate = true) {
//   let timeout;
//   return function () {
//     const context = this,
//       args = arguments;
//     const later = function () {
//       timeout = null;
//       if (!immediate) func.apply(context, args);
//     };
//     const callNow = immediate && !timeout;
//     clearTimeout(timeout);
//     timeout = setTimeout(later, wait);
//     if (callNow) func.apply(context, args);
//   };
// }

// // Привязываем функцию к событию скролла
// window.addEventListener("scroll", debounce(updateCarPosition));
// updateCarPosition(); // Устанавливаем начальную позицию машины

//==============NEW CODE =================

// const car = document.querySelector(".car");
// const section = document.querySelector(".car-section");
// const trackLeftF = document.querySelector(".track-left-first");
// const trackLeftS = document.querySelector(".track-left-second");
// const trackRightF = document.querySelector(".track-right-first");
// const trackRightS = document.querySelector(".track-right-second");
// const messageTestDrive = document.querySelector(".testDrive-message");
// const carContainer = document.querySelector(".car-container");

// function updateCarPosition() {
//   const windowHeight = window.innerHeight;
//   const sectionTop = section.getBoundingClientRect().top;
//   const sectionHeight = section.offsetHeight;

//   const scrollPercentage = Math.min(
//     Math.max((windowHeight - sectionTop) / (windowHeight + sectionHeight), 0),
//     1
//   );

//   const translateX = 100 - scrollPercentage * 200;

//   car.style.transform = `translateX(${translateX}%)`;

//   const carRect = car.getBoundingClientRect();
//   const carCenter = carRect.left + carRect.width / 2;
//   const carRectRight = carRect.right;
//   const carRectLeft = carRect.left;

//   const containerRect = carContainer.getBoundingClientRect();
//   const containerCenter = containerRect.left + containerRect.width / 2;

//   const messageTestDriveRect = messageTestDrive.getBoundingClientRect();
//   const messageTestDriveCenter =
//     messageTestDriveRect.left + messageTestDriveRect.width / 2;

//   if (carRectLeft < containerCenter + 100) {
//     trackLeftS.classList.add("show");
//     trackRightS.classList.add("show");
//   } else {
//     trackLeftS.classList.remove("show");
//     trackRightS.classList.remove("show");
//   }

//   if (carRectRight < containerCenter + 100) {
//     trackLeftF.classList.add("show");
//     trackRightF.classList.add("show");
//   } else {
//     trackLeftF.classList.remove("show");
//     trackRightF.classList.remove("show");
//   }

//   if (carCenter < messageTestDriveCenter + 50) {
//     messageTestDrive.classList.add("show");
//   } else {
//     messageTestDrive.classList.remove("show");
//   }
// }

// window.addEventListener("scroll", updateCarPosition);

// updateCarPosition();
