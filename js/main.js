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
const trackLeft = document.querySelector(".track-left");
const trackRight = document.querySelector(".track-right");
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
  const translateX = 100 - scrollPercentage * 200;

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

  const containerRect = carContainer.getBoundingClientRect();
  // const containerCenter = containerRect.left +

  // Найдите центр следов
  const trackLeftRect = trackLeft.getBoundingClientRect();
  const trackRightRect = trackRight.getBoundingClientRect();
  const messageTestDriveRect = messageTestDrive.getBoundingClientRect();
  const trackLeftCenter = trackLeftRect.left + trackLeftRect.width / 2;
  const trackRightCenter = trackRightRect.left + trackRightRect.width / 2;
  const messageTestDriveCenter =
    messageTestDriveRect.left + messageTestDriveRect.width / 2;

  // console.log(messageTestDrive);
  // console.log(messageTestDriveRect);
  // console.log(messageTestDriveCenter);

  // Если центр машины пересекает центр следа, показываем след
  // if (carCenter > trackLeftCenter) {
  //   trackLeft.classList.add("show");
  // } else {
  //   trackLeft.classList.remove("show");
  // }

  // if (carCenter > trackRightCenter) {
  //   trackRight.classList.add("show");
  // } else {
  //   trackRight.classList.remove("show");
  // }

  if (carCenter < messageTestDriveCenter) {
    messageTestDrive.classList.add("show");
  } else {
    messageTestDrive.classList.remove("show");
  }
});
