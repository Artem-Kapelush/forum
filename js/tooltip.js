document.addEventListener("DOMContentLoaded", () => {
  // Отримуємо посилання на елементи форми
  const emailInput = document.getElementById("email"); // Поле вводу електронної пошти
  const submitButton = document.getElementById("submitBtn"); // Кнопка "Підписатися"
  const tooltipAt = document.getElementById("tooltip-at"); // Підсказка про символ @
  const tooltipDomain = document.getElementById("tooltip-domain"); // Підсказка про домен .com
  const tooltipEnglish = document.getElementById("tooltip-english"); // Підсказка про англійську мову
  const successMessage = document.getElementById("success-message"); // Повідомлення про успішну відправку
  const savedEmail = document.getElementById("saved-email"); // Поле для відображення збереженої пошти

  // Перевіряє, чи текст складається з англійських символів, цифр, @ та .
  const isEnglish = (text) => /^[a-zA-Z0-9@.]+$/.test(text);

  // Оновлює стан підсказок і активність кнопки
  const updateTooltips = () => {
    const emailValue = emailInput.value; // Поточне значення поля вводу
    const hasAt = emailValue.includes("@"); // Чи є символ @
    const domain = hasAt ? emailValue.split("@")[1] : ""; // Отримуємо домен після @

    // Відображення/приховування підсказки про @
    tooltipAt.style.display = hasAt ? "none" : "block";

    // Відображення/приховування підсказки про домен .com
    tooltipDomain.style.display = hasAt && !domain.endsWith(".com") ? "block" : "none";

    // Відображення/приховування підсказки про англійські символи
    tooltipEnglish.style.display = isEnglish(emailValue) ? "none" : "block";

    // Увімкнення/вимкнення кнопки залежно від виконання всіх умов
    submitButton.disabled = !(hasAt && domain.endsWith(".com") && isEnglish(emailValue));
  };

  // Ховає всі підсказки коли користувач натискає поза полем вводу або -
  // - коли потрібно приховати підсказки після того, як поле вводу залишилося порожнім
  const hideTooltips = () => {
    tooltipAt.style.display = "none";
    tooltipDomain.style.display = "none";
    tooltipEnglish.style.display = "none";
  };

  // Обробляє натискання кнопки "Підписатися"
  const sendEmail = (event) => {
    event.preventDefault(); // Зупиняємо стандартну поведінку кнопки
    successMessage.style.display = "block"; // Показуємо повідомлення про успіх
    savedEmail.textContent = emailInput.value; // Зберігаємо та відображаємо введену пошту
    emailInput.value = ""; // Очищаємо поле вводу
    submitButton.disabled = true; // Деактивуємо кнопку після відправки
  };

  // Додаємо обробники подій
  emailInput.addEventListener("input", updateTooltips); // Оновлення підсказок при зміні тексту
  emailInput.addEventListener("focus", updateTooltips); // Показує підсказки при фокусі на полі
  document.addEventListener("click", (event) => {
    if (!emailInput.contains(event.target)) hideTooltips(); // Ховає підсказки при натисканні поза полем
  });
  submitButton.addEventListener("click", sendEmail); // Відправка пошти при натисканні кнопки
});