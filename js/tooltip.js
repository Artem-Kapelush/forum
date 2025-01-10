// Нова версія
document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById("email");
  const submitButton = document.getElementById("submitBtn");
  const tooltipAt = document.getElementById("tooltip-at");
  const tooltipDomain = document.getElementById("tooltip-domain");
  const tooltipEnglish = document.getElementById("tooltip-english");
  const successMessage = document.getElementById("success-message");
  const savedEmail = document.getElementById("saved-email");
  const infoBlockText = document.getElementById("info-block-text");
  const infoBlock = document.querySelector(".rounded-info-block");
  const iconOk = document.querySelector(".icon-ok");

  const isEnglish = (text) => /^[a-zA-Z0-9@.]+$/.test(text);

  const updateTooltips = () => {
    const emailValue = emailInput.value;
    const hasAt = emailValue.includes("@");
    const domain = hasAt ? emailValue.split("@")[1] : "";

    tooltipAt.style.display = hasAt ? "none" : "block";
    tooltipDomain.style.display = hasAt && !domain.endsWith(".com") ? "block" : "none";
    tooltipEnglish.style.display = isEnglish(emailValue) ? "none" : "block";

    submitButton.disabled = !(hasAt && domain.endsWith(".com") && isEnglish(emailValue));
  };

  const hideTooltips = () => {
    tooltipAt.style.display = "none";
    tooltipDomain.style.display = "none";
    tooltipEnglish.style.display = "none";
  };

  const applyMediaStyles = () => {
    const mediaQuery = window.matchMedia("(min-width: 320px) and (max-width: 892px)");
    if (mediaQuery.matches && successMessage.style.display === "block") {
      // Додаємо класи тільки якщо повідомлення про успіх відображається
      infoBlock.classList.add("subscribed-block");
      iconOk.classList.add("subscribed-icon");
    } else {
      infoBlock.classList.remove("subscribed-block");
      iconOk.classList.remove("subscribed-icon");
    }
  };

  const sendEmail = (event) => {
    event.preventDefault();
    const emailValue = emailInput.value;

    if (!emailValue.includes("@") || !emailValue.split("@")[1].endsWith(".com") || !isEnglish(emailValue)) {
      return; // Не застосовуємо стилі, якщо пошта невалідна
    }

    successMessage.style.display = "block";
    savedEmail.textContent = emailValue;
    emailInput.value = "";
    submitButton.disabled = true;
    infoBlockText.innerHTML = "Ваша підписка підтверджена. Дякуємо за підписку!";
    applyMediaStyles(); // Застосовуємо класи після підтвердження
  };

  emailInput.addEventListener("input", updateTooltips);
  emailInput.addEventListener("focus", updateTooltips);
  document.addEventListener("click", (event) => {
    if (!emailInput.contains(event.target)) hideTooltips();
  });
  submitButton.addEventListener("click", sendEmail);
  window.addEventListener("resize", applyMediaStyles); // Застосовуємо стилі при зміні розміру
});

// Стара версія
// document.addEventListener("DOMContentLoaded", () => {
//   // Отримуємо посилання на елементи форми
//   const emailInput = document.getElementById("email"); // Поле вводу електронної пошти
//   const submitButton = document.getElementById("submitBtn"); // Кнопка "Підписатися"
//   const tooltipAt = document.getElementById("tooltip-at"); // Підсказка про символ @
//   const tooltipDomain = document.getElementById("tooltip-domain"); // Підсказка про домен .com
//   const tooltipEnglish = document.getElementById("tooltip-english"); // Підсказка про англійську мову
//   const successMessage = document.getElementById("success-message"); // Повідомлення про успішну відправку
//   const savedEmail = document.getElementById("saved-email"); // Поле для відображення збереженої пошти
//   const infoBlockText = document.getElementById("info-block-text"); // Текст у блоці rounded-info-block
//   const infoBlock = document.querySelector(".rounded-info-block"); // Блок з класом rounded-info-block
//   const iconOk = document.querySelector(".icon-ok"); // Іконка з класом icon-ok

//   // Перевіряє, чи текст складається з англійських символів, цифр, @ та .
//   const isEnglish = (text) => /^[a-zA-Z0-9@.]+$/.test(text);

//   // Оновлює стан підсказок і активність кнопки
//   const updateTooltips = () => {
//     const emailValue = emailInput.value; // Поточне значення поля вводу
//     const hasAt = emailValue.includes("@"); // Чи є символ @
//     const domain = hasAt ? emailValue.split("@")[1] : ""; // Отримуємо домен після @

//     // Відображення/приховування підсказки про @
//     tooltipAt.style.display = hasAt ? "none" : "block";

//     // Відображення/приховування підсказки про домен .com
//     tooltipDomain.style.display = hasAt && !domain.endsWith(".com") ? "block" : "none";

//     // Відображення/приховування підсказки про англійські символи
//     tooltipEnglish.style.display = isEnglish(emailValue) ? "none" : "block";

//     // Увімкнення/вимкнення кнопки залежно від виконання всіх умов
//     submitButton.disabled = !(hasAt && domain.endsWith(".com") && isEnglish(emailValue));
//   };

//   // Ховає всі підсказки коли користувач натискає поза полем вводу або - 
//   // - коли потрібно приховати підсказки після того, як поле вводу залишилося порожнім
//   const hideTooltips = () => {
//     tooltipAt.style.display = "none";
//     tooltipDomain.style.display = "none";
//     tooltipEnglish.style.display = "none";
//   };

//   // Обробляє натискання кнопки "Підписатися"
//   const sendEmail = (event) => {
//     event.preventDefault(); // Зупиняємо стандартну поведінку кнопки
//     successMessage.style.display = "block"; // Показуємо повідомлення про успіх
//     savedEmail.textContent = emailInput.value; // Зберігаємо та відображаємо введену пошту
//     emailInput.value = ""; // Очищаємо поле вводу
//     submitButton.disabled = true; // Деактивуємо кнопку після відправки

//     // Оновлюємо текст у блоці rounded-info-block
//     infoBlockText.innerHTML = "Ваша підписка підтверджена. Дякуємо за підписку!"; // Змінюємо текст на успішне повідомлення

//     // Додаємо клас для активації підписки
//     infoBlock.classList.add("subscribed-block");
//     infoIcon.classList.add("subscribed-icon");
//   };

//   // Додаємо обробники подій
//   emailInput.addEventListener("input", updateTooltips); // Оновлення підсказок при зміні тексту
//   emailInput.addEventListener("focus", updateTooltips); // Показує підсказки при фокусі на полі
//   document.addEventListener("click", (event) => {
//     if (!emailInput.contains(event.target)) hideTooltips(); // Ховає підсказки при натисканні поза полем
//   });
//   submitButton.addEventListener("click", sendEmail); // Відправка пошти при натисканні кнопки
// });