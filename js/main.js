const form = document.getElementById("tgForm");
const submitBtn = document.getElementById("btnSendform");
const messageBlock = document.getElementById("messageBlock");

const TOKEN = "7062450367:AAGBNkdz-ZlDbzh0Tiqd_02KvnAIT36srxM";
const CHATT_ID = "-1002182049903";
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
    return;
  } else if (driveParticipation !== "Да" && driveParticipation !== "Нет") {
    submitBtn.classList.add("form-error");
    setTimeout(function () {
      submitBtn.classList.remove("form-error");
    }, 1000);
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

function updateCarPosition() {
  const windowHeight = window.innerHeight;
  const sectionTop = section.getBoundingClientRect().top;
  const sectionHeight = section.offsetHeight;

  const scrollPercentage = Math.min(
    Math.max((windowHeight - sectionTop) / (windowHeight + sectionHeight), 0),
    1
  );

  const translateX = -10 - scrollPercentage * 90;

  car.style.transform = `translateX(${translateX}%)`;
}

window.addEventListener("scroll", updateCarPosition);

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
  if (carRectLeft < containerCenter) {
    trackLeftS.classList.add("show");
    trackRightS.classList.add("show");
  } else {
    trackLeftS.classList.remove("show");
    trackRightS.classList.remove("show");
  }
  if (carRectRight < containerCenter) {
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
