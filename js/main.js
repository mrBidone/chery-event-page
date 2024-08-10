const form = document.getElementById("tgForm");
const submitBtn = document.getElementById("btnSendform");

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
    availableMob !== "Yes" &&
    availableMob !== "No" &&
    availableDesk !== "Yes" &&
    availableDesk !== "No"
  ) {
    submitBtn.classList.add("form-error");
    setTimeout(function () {
      submitBtn.classList.remove("form-error");
    }, 1000);
    console.log("Ошибка: Не выбран обязательный вариант ");
    return;
  } else if (driveParticipation !== "Yes" && driveParticipation !== "No") {
    submitBtn.classList.add("form-error");
    setTimeout(function () {
      submitBtn.classList.remove("form-error");
    }, 1000);
    console.log("Ошибка: Не выбран обязательный вариант ");
    return;
  }
  submitBtn.classList.remove("form-error");
  let message = `<b>Заявка на участие!</b>\n`;

  message += `<b>Имя и Фамилия</b>: ${this.tgInputName.value}\n`;
  if (availableMob === "Yes" || availableMob === "No") {
    message += `<b>Присутствие</b>: ${availableMob}\n`;
  } else if (availableDesk === "Yes" || availableDesk === "No") {
    message += `<b>Присутствие</b>: ${availableDesk}\n`;
  }
  message += `<b>Test-Drive</b>: ${this.tgSelectDrive.value}\n`;

  console.log(message);

  axios
    .post(URI_API, {
      chat_id: CHATT_ID,
      parse_mode: "html",
      text: message,
    })
    .then((res) => {})
    .catch((err) => {})
    .finally(() => {
      console.log("Конец");
      form.reset();
    });
});

// form.addEventListener("submit", function (e) {
//   e.preventDefault(); // предотвращаем отправку формы до проверки

//   const nameInput = document.querySelector('input[name="tgInputName"]');
//   const selectAvailableMob = document.querySelector(
//     'select[name="tgSelectAvailableMob"]'
//   );
//   const selectAvailableDesk = document.querySelector(
//     'select[name="tgSelectAvailableDesk"]'
//   );
//   const selectDrive = document.querySelector('select[name="tgSelectDrive"]');

//   // Проверка имени
//     const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s]+$/;

//   if (!nameRegex.test(nameInput.value)) {
//     submitBtn.classList.add("form-error"); // добавляем класс ошибки, если имя некорректное
//   } else {
//     submitBtn.classList.remove("form-error");
//   }

//   // Проверка select элементов
//   let isSelectValid = true;
//   const selects = [selectAvailableMob, selectAvailableDesk, selectDrive];

//   selects.forEach((select) => {
//     const value = select.value;
//     if (value !== "Yes" && value !== "No") {
//       submitBtn.classList.add("form-error");
//       setTimeout(function () {
//         submitBtn.classList.remove("form-error");
//       }, 1000);
//     } else {
//       submitBtn.classList.remove("form-error");
//     }
//   });

//   // Если все проверки пройдены, отправляем данные
//   if (nameRegex.test(nameInput.value) && isSelectValid) {
//     let message = `<b>Заявка на участие!</b>\n`;
//     message += `<b>Имя и Фамилия</b>: ${nameInput.value}\n`;
//     message += `<b>Присутствие (Моб)</b>: ${selectAvailableMob.value}\n`;
//     message += `<b>Присутствие (Деск)</b>: ${selectAvailableDesk.value}\n`;
//     message += `<b>Test-Drive</b>: ${selectDrive.value}\n`;

//     console.log(message);

//     axios
//       .post(URI_API, {
//         chat_id: CHATT_ID,
//         parse_mode: "html",
//         text: message,
//       })
//       .then((res) => {})
//       .catch((err) => {})
//       .finally(() => {
//         console.log("Конец");
//         form.submit(); // отправляем форму после успешной отправки данных
//       });
//   }
// });

// // Обработка отправки формы
// form.addEventListener("submit", function (e) {
//   e.preventDefault(); // предотвращаем отправку формы через submit, так как уже отправляем через click
// });

// const form = document.getElementById("tgForm");
// const submitBtn = document.getElementById("btnSendform");

// const TOKEN = "7276650181:AAHlTP9WN0aK8GLVjwMeYABk1uBDNyBc2Ik";
// const CHATT_ID = "-1002228237081";
// const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

// form.addEventListener("submit", function (e) {
//   e.preventDefault();

//   let message = `<b>Заявка на участие!</b>\n`;
//   message += `<b>Имя и Фамилия</b>: ${this.tgInputName.value}\n`;
//   message += `<b>Присутствие</b>: ${this.tgSelectAvailableMob.value}\n`;
//   message += `<b>Присутствие</b>: ${this.tgSelectAvailableDesk.value}\n`;
//   message += `<b>Test-Drive</b>: ${this.tgSelectDrive.value}\n`;

//   console.log(message);

//   axios
//     .post(URI_API, {
//       chat_id: CHATT_ID,
//       parse_mode: "html",
//       text: message,
//     })
//     .then((res) => {})
//     .catch((err) => {})
//     .finally(() => {
//       console.log("Конец");
//     });
// });

// $("#btn_sendform-js").click(function (event) {
//   let check = 0;

//   if (!validateEmail(jQuery("#input_email").val())) {
//     check++;
//     jQuery("#input_email").css("border", "1px solid red");
//   }
//   if (jQuery("#input_name").val().length < 3) {
//     check++;
//     jQuery("#input_name").css("border", "1px solid red");
//   }
//   if (check == 0) {
//     $.ajax({
//       url: "/wp-admin/admin-ajax.php",
//       type: "POST",
//       data: {
//         action: "get_form",
//         firstname: jQuery("#input_name").val(),
//         "email-adress": jQuery("#input_email").val(),
//         telephone: jQuery("#input_phone").val(),
//         message: jQuery("#input_message").val(),
//       }, // можно также передать в виде массива или объекта
//       success: function (data) {
//         console.log(data);
//         $(".form-inputs").css("opacity", "0");
//         $(".form-success").css("opacity", "1");
//       },
//     });
//   } else {
//     jQuery("#btn_sendform").addClass("form-error");
//     setTimeout(function () {
//       jQuery("#btn_sendform").removeClass("form-error");
//     }, 1000);
//   }
// });
