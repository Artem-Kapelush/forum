// Перевірка наявності кнопки перемикання теми
const themeButton = document.querySelector(".theme-switcher");

if (themeButton) {
  // Оголошення ключових змінних
  const themeContainer = document.querySelector(".wrapper");
  const okIcon = document.querySelector(".icon-ok");
  const logoImage = document.querySelector(".logo__image");

  // Функція для оновлення логотипу в залежності від теми
  const updateLogo = (isDarkTheme) => {
    if (logoImage) {
      logoImage.src = isDarkTheme ? "img/svg/logo-dark.svg" : "img/svg/logo.svg"; // Темний або світлий логотип
    }
  };

  // Функція для оновлення класів теми
  const updateThemeClasses = (isDarkTheme) => {
    const isListView = document.getElementById("list-icon")?.classList.contains("active");
    const targetElements = isListView
      ? document.querySelectorAll(".news-item, .news-content")
      : document.querySelectorAll(".news-item-column, .article-content");

    // Очищення класу black-grey у всіх елементах
    document.querySelectorAll(".black-grey").forEach((item) => {
      item.classList.remove("black-grey");
    });

    // Додавання класу black-grey для цільових елементів у темній темі
    if (isDarkTheme) {
      targetElements.forEach((item) => {
        item.classList.add("black-grey");
      });
    }

    // Оновлення решти елементів
    const elementsToUpdate = [
      { selector: ".main", class: "black" },
      { selector: ".news-item, .article-content, .filter__options, .email-input-block, .email-field, .post-meta, .comment-form, .comment-body, .report-modal-content, .comment-field, #cookieBanner", class: "black-grey" },
      { selector: ".header, .title-hint", class: "black-grey_only" },
      { selector: ".post-date, .news__time", class: "gray" },
      { selector: ".filter__option", class: "gray_only" },
      { selector: ".navigation__items, .navigation__link, .sorting__title, .filter__title, .comment-username, #scrollToTopBtn", class: "white" },
      { selector: ".news__description", class: "lightgray" },
      { selector: "active, search-container, filter-button, .rounded-info-block, .submit-button, .footer", class: "purple" }
    ];

    elementsToUpdate.forEach(({ selector, class: className }) => {
      document.querySelectorAll(selector).forEach((element) => {
        if (isDarkTheme) {
          element.classList.add(className);
        } else {
          element.classList.remove(className);
        }
      });
    });
  };

  // Функція для оновлення логотипу та іконки залежно від теми
  const updateImages = (isDarkTheme) => {
    if (okIcon) okIcon.src = isDarkTheme ? "img/svg/icon-ok-dark.svg" : "img/svg/icon-ok-light.svg";
    updateLogo(isDarkTheme); // Оновлення логотипу
  };

  // Встановлення збереженої теми при завантаженні сторінки
  const storedTheme = localStorage.getItem("theme"); // Отримуємо збережену тему
  const isDarkTheme = storedTheme === "dark"; // Перевірка, чи збережена темна тема

  if (isDarkTheme) {
    themeContainer.classList.add("dark-theme");
    themeButton.classList.add("button-tools-dark");
  }
  updateImages(isDarkTheme); // Оновлення іконок та логотипу при завантаженні сторінки
  updateThemeClasses(isDarkTheme); // Оновлення класів елементів

  // Перемикання теми при натисканні кнопки
  themeButton.onclick = function () {
    const isDarkTheme = themeContainer.classList.contains("dark-theme"); // Перевірка поточної теми
    themeContainer.classList.toggle("dark-theme"); // Перемикання теми

    // Збереження вибору теми в localStorage
    localStorage.setItem("theme", !isDarkTheme ? "dark" : "light");

    // Оновлення логотипу, кнопки та елементів
    updateImages(!isDarkTheme); // Оновлюємо логотип та іконки
    if (!isDarkTheme) {
      themeButton.classList.add("button-tools-dark");
    } else {
      themeButton.classList.remove("button-tools-dark");
    }
    updateThemeClasses(!isDarkTheme); // Оновлення класів елементів
  };
}



// Стара версія
// // Перевіряємо, чи кнопка перемикання теми існує на сторінці
// const themeButton = document.querySelector(".theme-switcher");

// if (themeButton) {
//   // Оголошення ключових змінних
//   const themeContainer = document.querySelector(".wrapper");
//   const okIcon = document.querySelector(".icon-ok");
//   const logoImage = document.querySelector(".logo__image");

  // // Функція для оновлення класів залежно від теми
  // const updateThemeClasses = () => {
  //   const isListView = document.getElementById("list-icon")?.classList.contains("active");
  //   const targetElements = isListView
  //     ? document.querySelectorAll(".news-item, .news-content")
  //     : document.querySelectorAll(".news-item-column, .article-content");

  //   // Очищення класу black-grey у всіх елементах
  //   document.querySelectorAll(".black-grey").forEach(item => {
  //     item.classList.remove("black-grey");
  //   });

  //   // Додавання класу black-grey тільки для темної теми
  //   if (themeContainer.classList.contains("dark-theme")) {
  //     targetElements.forEach(item => {
  //       item.classList.add("black-grey");
  //     });
  //   }
  // };

//   // Встановити збережену тему під час завантаження сторінки
//   if (localStorage.getItem("theme") === "dark") {
//     themeContainer.classList.add("dark-theme");
//     if (okIcon) okIcon.src = "img/svg/icon-ok-dark.svg"; // Темна іконка
//     if (logoImage) logoImage.src = "img/svg/logo-dark.svg"; // Темний логотип
//     themeButton.classList.add("button-tools-dark"); // Додаємо спеціальний клас для темної кнопки
//   } else {
//     // Установки для світлої теми
//     if (okIcon) okIcon.src = "img/svg/icon-ok-light.svg"; // Світла іконка
//     if (logoImage) logoImage.src = "img/svg/logo.svg"; // Світлий логотип
//   }

//   // Перемикання теми
//   themeButton.onclick = function () {
//     // Перемкнути клас .dark-theme
//     themeContainer.classList.toggle("dark-theme");

//     // Зберегти вибір теми в localStorage
//     if (themeContainer.classList.contains("dark-theme")) {
//       localStorage.setItem("theme", "dark");
//       if (okIcon) okIcon.src = "img/svg/icon-ok-dark.svg"; 
//       if (logoImage) logoImage.src = "img/svg/logo-dark.svg";
//       themeButton.classList.add("button-tools-dark"); // Додаємо клас для темної кнопки
//     } else {
//       localStorage.setItem("theme", "light");
//       if (okIcon) okIcon.src = "img/svg/icon-ok-light.svg";
//       if (logoImage) logoImage.src = "img/svg/logo.svg";
//       themeButton.classList.remove("button-tools-dark"); // Видаляємо клас для темної кнопки
//     }

//     // Додати/видалити клас .black для main
//     document.querySelector("main").classList.toggle("black");

//     // Додати/видалити клас .black-grey для зазначених елементів
//     let blackGreyElements = document.querySelectorAll(
//       ".news-item, .article-content, .filter__options, .email-input-block, .email-field, .post-meta, .comment-form, .comment-item, .comment-field, #cookieBanner"
//     );
//     blackGreyElements.forEach((element) => {
//       element.classList.toggle("black-grey");
//     });

//     // Додати/видалити клас .black-grey_only для зазначених елементів
//     let blackGreyOnlyElements = document.querySelectorAll(".header, .title-hint");
//     blackGreyOnlyElements.forEach((element) => {
//       element.classList.toggle("black-grey_only");
//     });

//     // Додати/видалити клас .gray для зазначених елементів
//     let grayElements = document.querySelectorAll(".post-date, .char-counter, .news__time");
//     grayElements.forEach((element) => {
//       element.classList.toggle("gray");
//     });

//     // Додати/видалити клас .white для зазначених елементів
//     let whiteElements = document.querySelectorAll(".navigation__items, .navigation__link, .sorting__title, .filter__title, #scrollToTopBtn");
//     whiteElements.forEach((element) => {
//       element.classList.toggle("white");
//     });

//     // Додати/видалити клас .lightgray для зазначених елементів
//     let lightGrayElements = document.querySelectorAll(".news__description");
//     lightGrayElements.forEach((element) => {
//       element.classList.toggle("lightgray");
//     });

//     // Додати/видалити клас .purple для зазначених елементів
//     let purpleElements = document.querySelectorAll("active, filter-button, .rounded-info-block, .submit-button, .footer");
//     purpleElements.forEach((element) => {
//       element.classList.toggle("purple");
//     });

//     // Оновлення класів для новин
//     updateThemeClasses();
//   };

//   // Оновлення класів для новин
//   updateThemeClasses();  
// }