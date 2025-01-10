// Додаємо слухача подій, який виконається, коли сторінка повністю завантажиться
document.addEventListener("DOMContentLoaded", () => {
  // Знаходимо форму для додавання коментарів
  const form = document.querySelector(".comment-form");

  // Отримуємо поле вводу тексту коментаря
  const textInput = document.getElementById("textInput");

  // Отримуємо список, в якому будуть відображатися коментарі
  const commentList = document.querySelector(".comment-list");

  // Лічильник символів у полі вводу
  const charCounter = document.getElementById("current-count");

  // Максимальна кількість символів для тексту коментаря
  const maxCount = 142;

  // Поточна активна кнопка відповіді (якщо користувач відповідає на коментар)
  let activeReplyButton = null;

  // Елементи модального вікна для скарг
  const reportModal = document.getElementById("reportModal");
  const closeButton = document.querySelector(".close-button");
  const cancelButton = document.querySelector(".cancel-button");
  const submitButton = document.querySelector(".report_submit-button");
  const reportSuccessMessage = document.getElementById("reportSuccessMessage");

  // Поля вводу для причини скарги та її обґрунтування
  const reasonInput = document.getElementById("reasonInput");
  const justificationInput = document.getElementById("justificationInput");

  // Функція для отримання поточної дати й часу у форматі "день.місяць.рік год:хв"
  function getCurrentDateTime() {
    const now = new Date();
    const options = { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" };
    return now.toLocaleDateString("uk-UA", options).replace(",", "");
  }

  // Встановлюємо відступ для лінії відповіді в коментарях
  function setTopOffsetForReply(newComment, parentComment) {
    // Перевіряємо, чи батьківський коментар ще не має відповіді
    if (parentComment && !parentComment.hasAttribute("data-has-reply")) {
      parentComment.setAttribute("data-has-reply", "true");
      const commentLine = newComment.querySelector(".comment-line");
      if (commentLine) {
        commentLine.style.top = `15px`; // Встановлюємо верхній відступ для лінії
      }
    }
  }

  // Обробка подій вводу тексту в полі вводу
  textInput.addEventListener("input", () => {
    const currentLength = textInput.value.length; // Отримуємо поточну довжину тексту
    charCounter.textContent = currentLength; // Відображаємо довжину в лічильнику

    // Отримуємо обгортку лічильника
    const counterWrapper = document.querySelector(".char-counter");

    // Додаємо класи для індикації (попередження/помилка) залежно від кількості символів
    counterWrapper.classList.toggle("warning", currentLength > maxCount * 0.7 && currentLength < maxCount);
    counterWrapper.classList.toggle("error", currentLength >= maxCount);
  });

  // Обробка події надсилання форми коментаря
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Скасовуємо стандартну поведінку форми

    const commentText = textInput.value.trim(); // Очищаємо текст від зайвих пробілів
    if (!commentText) return; // Якщо текст пустий, нічого не робимо

    const newComment = document.createElement("div"); // Створюємо новий елемент коментаря
    newComment.classList.add("comment-item"); // Додаємо клас для стилізації

    const isReply = activeReplyButton !== null; // Перевіряємо, чи це відповідь

    // Додаємо HTML-розмітку для нового коментаря
    newComment.innerHTML = `
      <div class="comment-line"></div>
      <div class="comment-body">
        <img src="img/svg/profile-normal.svg" alt="Profile Picture" class="comment-avatar">
        <div class="comment-content">
          <div class="comment-header">
            <span class="comment-username">Невідомий</span>
            <span class="comment-date">${getCurrentDateTime()}</span>
          </div>
          <p class="comment-text">${commentText}</p>
        </div>
        <div class="comment-actions">
          <button class="reply-button">
            <img src="img/svg/reply-icon.svg" alt="Reply Icon" class="button-icon">
            Відповісти
          </button>
          <div class="tooltip-container">
            <button class="report-button">
              <img src="img/svg/report-icon.svg" alt="Report Icon" class="button-icon report-icon">
              <div class="tooltip">
                <span class="tooltip-text">Поскаржитися</span>
                <div class="tooltip-arrow"></div>
              </div>
            </button>
          </div>
        </div>
      </div>
    `;

    if (isReply) {
      const parentComment = activeReplyButton.closest(".comment-item"); // Отримуємо батьківський коментар
      newComment.classList.add("reply"); // Позначаємо новий коментар як відповідь
      parentComment.appendChild(newComment); // Додаємо коментар до батьківського
      setTopOffsetForReply(newComment, parentComment); // Встановлюємо відступ
    } else {
      commentList.appendChild(newComment); // Додаємо коментар до загального списку
    }

    // Очищаємо поле вводу, скидаємо лічильник і стилі
    textInput.value = "";
    charCounter.textContent = 0;
    document.querySelector(".char-counter").classList.remove("warning", "error");

    // Деактивуємо кнопку відповіді, якщо вона була активною
    if (activeReplyButton) {
      activeReplyButton.classList.remove("active");
    }
    activeReplyButton = null; // Скидаємо активну кнопку
  });

  // Обробка кліків на кнопки відповіді та скарг
  commentList.addEventListener("click", (event) => {
    const replyButton = event.target.closest(".reply-button"); // Визначаємо, чи натиснута кнопка відповіді
    const reportButton = event.target.closest(".report-button"); // Або кнопка скарги

    if (replyButton) {
      if (replyButton.classList.contains("active")) {
        replyButton.classList.remove("active"); // Якщо активна, деактивуємо
        activeReplyButton = null;
      } else {
        if (activeReplyButton) {
          activeReplyButton.classList.remove("active"); // Деактивуємо попередню активну кнопку
        }
        replyButton.classList.add("active"); // Робимо кнопку активною
        activeReplyButton = replyButton; // Зберігаємо посилання
      }
    }

    if (reportButton) {
      reportModal.style.display = "flex"; // Відображаємо модальне вікно скарги
    }
  });

  // Закриття модального вікна скарг
  closeButton.addEventListener("click", () => {
    reportModal.style.display = "none"; // Ховаємо модальне вікно
    reportSuccessMessage.style.display = "none"; // Ховаємо повідомлення про успіх
  });

  cancelButton.addEventListener("click", () => {
    reportModal.style.display = "none"; // Ховаємо модальне вікно
  });

  submitButton.addEventListener("click", () => {
    // Якщо всі поля заповнені, відображаємо повідомлення про успіх
    if (reasonInput.value.trim() && justificationInput.value.trim()) {
      reportModal.style.display = "none"; // Ховаємо модальне вікно
      reportSuccessMessage.style.display = "block"; // Відображаємо повідомлення
      setTimeout(() => {
        reportSuccessMessage.style.display = "none"; // Ховаємо повідомлення через 3 секунди
      }, 3000);

      // Очищаємо поля вводу
      reasonInput.value = "";
      justificationInput.value = "";
      submitButton.disabled = true; // Деактивуємо кнопку відправки
    }
  });

  // Автоматичне налаштування висоти поля вводу при введенні тексту
  justificationInput.addEventListener("input", () => {
    justificationInput.style.height = "auto"; // Скидаємо висоту
    justificationInput.style.height = `${justificationInput.scrollHeight}px`; // Встановлюємо нову висоту
  });

  // Перемикаємо доступність кнопки відправки
  function toggleSubmitButton() {
    submitButton.disabled = !(reasonInput.value.trim() && justificationInput.value.trim());
  }

  reasonInput.addEventListener("input", toggleSubmitButton); // Відстежуємо зміни в полі "причина"
  justificationInput.addEventListener("input", toggleSubmitButton); // Відстежуємо зміни в полі "обґрунтування"
});



// Старий код для коментаря
// document.addEventListener("DOMContentLoaded", () => {
//   const form = document.querySelector(".comment-form");
//   const textInput = document.getElementById("textInput");
//   const commentList = document.querySelector(".comment-list");
//   const charCounter = document.getElementById("current-count");
//   const maxCount = 142;
//   let activeReplyButton = null;

//   function getCurrentDateTime() {
//     const now = new Date();
//     const options = { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" };
//     return now.toLocaleDateString("uk-UA", options).replace(",", "");
//   }

//   // Додаємо відступ до першого рівня відповіді
//   function setTopOffsetForReply(newComment, parentComment) {
//     if (parentComment && !parentComment.hasAttribute("data-has-reply")) {
//       // Встановлюємо атрибут, щоб позначити, що у цього коментаря вже є відповідь
//       parentComment.setAttribute("data-has-reply", "true");

//       // Додаємо стилі до нового коментаря
//       const commentLine = newComment.querySelector(".comment-line");
//       if (commentLine) {
//         commentLine.style.top = `15px`;
//       }
//     }
//   }

//   // Підрахунок символів
//   textInput.addEventListener("input", () => {
//     const currentLength = textInput.value.length;
//     charCounter.textContent = currentLength;

//     const counterWrapper = document.querySelector(".char-counter");
//     counterWrapper.classList.toggle("warning", currentLength > maxCount * 0.7 && currentLength < maxCount);
//     counterWrapper.classList.toggle("error", currentLength >= maxCount);
//   });

//   // Додавання коментаря
//   form.addEventListener("submit", (event) => {
//     event.preventDefault();

//     const commentText = textInput.value.trim();
//     if (!commentText) return;

//     const newComment = document.createElement("div");
//     newComment.classList.add("comment-item");

//     const isReply = activeReplyButton !== null;

//     newComment.innerHTML = `
//       <div class="comment-line"></div>
//       <div class="comment-body">
//         <img src="img/svg/profile-normal.svg" alt="Profile Picture" class="comment-avatar">
//         <div class="comment-content">
//           <div class="comment-header">
//             <span class="comment-username">Невідомий</span>
//             <span class="comment-date">${getCurrentDateTime()}</span>
//           </div>
//           <p class="comment-text">${commentText}</p>
//         </div>
//         <div class="comment-actions">
//           <button class="reply-button">
//             <img src="img/svg/reply-icon.svg" alt="Reply Icon" class="button-icon">
//             Відповісти
//           </button>
//           <div class="tooltip-container">
//             <button class="report-button" id="reportButton">
//               <img src="img/svg/report-icon.svg" alt="Report Icon" class="button-icon report-icon">
//               <div class="tooltip">
//                 <span class="tooltip-text">Поскаржитися</span>
//                 <div class="tooltip-arrow"></div>
//               </div>
//             </button>
//           </div>
//         </div>
//       </div>
//     `;

//     if (isReply) {
//       const parentComment = activeReplyButton.closest(".comment-item");
//       newComment.classList.add("reply");
//       parentComment.appendChild(newComment);

//       // Додаємо відступ, якщо це перша відповідь
//       setTopOffsetForReply(newComment, parentComment);
//     } else {
//       commentList.appendChild(newComment);
//     }

//     textInput.value = "";
//     charCounter.textContent = 0;
//     document.querySelector(".char-counter").classList.remove("warning", "error");
//     if (activeReplyButton) {
//       activeReplyButton.classList.remove("active");
//     }
//     activeReplyButton = null;
//   });

//   // Логіка для "Відповісти"
//   commentList.addEventListener("click", (event) => {
//     const replyButton = event.target.closest(".reply-button");

//     if (replyButton) {
//       if (replyButton.classList.contains("active")) {
//         replyButton.classList.remove("active");
//         activeReplyButton = null;
//       } else {
//         if (activeReplyButton) {
//           activeReplyButton.classList.remove("active");
//         }
//         replyButton.classList.add("active");
//         activeReplyButton = replyButton;
//       }
//     }
//   });
// });


// Старий код для кнопки Скарг
// const reportButton = document.getElementById("reportButton");
// const reportModal = document.getElementById("reportModal");
// const closeButton = document.querySelector(".close-button");
// const cancelButton = document.querySelector(".cancel-button");
// const submitButton = document.querySelector(".report_submit-button");
// const reportSuccessMessage = document.getElementById("reportSuccessMessage");
// const reasonInput = document.getElementById("reasonInput");
// const justificationInput = document.getElementById("justificationInput");

// // Відкрити модальне вікно
// reportButton.addEventListener("click", () => {
//   reportModal.style.display = "flex";
// });

// // Закрити модальне вікно
// closeButton.addEventListener("click", () => {
//   reportModal.style.display = "none";
//   reportSuccessMessage.style.display = "none";
// });

// cancelButton.addEventListener("click", () => {
//   reportModal.style.display = "none";
// });

// // Надіслати скаргу
// submitButton.addEventListener("click", () => {
//   if (reasonInput.value.trim() && justificationInput.value.trim()) {
//     reportModal.style.display = "none";
//     reportSuccessMessage.style.display = "block";
//     setTimeout(() => {
//       reportSuccessMessage.style.display = "none";
//     }, 3000);

//     // Очищення полів після надсилання
//     reasonInput.value = "";
//     justificationInput.value = "";
//     submitButton.disabled = true;
//   }
// });

// // Динамічне збільшення висоти текстового поля
// justificationInput.addEventListener("input", () => {
//   justificationInput.style.height = "auto";
//   justificationInput.style.height = `${justificationInput.scrollHeight}px`;
// });

// // Активувати кнопку "Надіслати" лише при заповнених полях
// function toggleSubmitButton() {
//   submitButton.disabled = !(reasonInput.value.trim() && justificationInput.value.trim());
// }

// // Відстеження змін у полях
// reasonInput.addEventListener("input", toggleSubmitButton);
// justificationInput.addEventListener("input", toggleSubmitButton);
