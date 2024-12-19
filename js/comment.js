document.addEventListener("DOMContentLoaded", () => {
  // Основні елементи DOM
  const form = document.querySelector(".comment-form");
  const textInput = document.getElementById("textInput");
  const commentList = document.querySelector(".comment-list");
  const charCounter = document.getElementById("current-count");
  const maxCount = 142; // Максимальна кількість символів

  // Лічильник символів
  textInput.addEventListener("input", () => {
    const currentLength = textInput.value.length; // Поточна довжина тексту
    charCounter.textContent = currentLength; // Оновлення лічильника символів

    // Зміна кольору лічильника на основі кількості символів
    const counterWrapper = document.querySelector(".char-counter");
    counterWrapper.classList.toggle("warning", currentLength > maxCount * 0.7 && currentLength < maxCount);
    counterWrapper.classList.toggle("error", currentLength >= maxCount);
  });

  // Додавання нового коментаря
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Запобігає перезавантаженню сторінки

    const commentText = textInput.value.trim(); // Отримання введеного тексту
    if (!commentText) return; // Якщо поле порожнє, не додаємо коментар

    // Створення нового коментаря
    const commentNumber = commentList.children.length + 1; // Нумерація коментарів
    const newComment = document.createElement("div");
    newComment.classList.add("comment-item");
    newComment.innerHTML = `
      <span class="comment-number">#${commentNumber}</span>
      <p class="comment-text">${commentText}</p>
    `;

    // Перевіряємо, чи активована темна тема
    if (document.querySelector(".wrapper").classList.contains("dark-theme")) {
      newComment.classList.add("black-grey"); // Додаємо клас black-grey в темній темі
    }

    // Додавання нового коментаря у список
    commentList.appendChild(newComment);

    // Очищення поля вводу та скидання лічильника
    textInput.value = "";
    charCounter.textContent = 0;
    document.querySelector(".char-counter").classList.remove("warning", "error");
  });
});