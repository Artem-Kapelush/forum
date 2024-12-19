// Перевіряємо, чи кнопка перемикання теми існує на сторінці
const themeButton = document.querySelector(".theme-switcher");

if (themeButton) {
  // Оголошення ключових змінних
  const themeContainer = document.querySelector(".wrapper");
  const okIcon = document.querySelector(".icon-ok");
  const logoImage = document.querySelector(".logo__image");

  // Встановити збережену тему під час завантаження сторінки
  if (localStorage.getItem("theme") === "dark") {
    themeContainer.classList.add("dark-theme");
    if (okIcon) okIcon.src = "img/svg/icon-ok-dark.svg"; // Темна іконка
    if (logoImage) logoImage.src = "img/svg/logo-dark.svg"; // Темний логотип
  }

  // Перемикання теми
  themeButton.onclick = function () {
    // Перемкнути клас .dark-theme
    themeContainer.classList.toggle("dark-theme");

    // Зберегти вибір теми в localStorage
    if (themeContainer.classList.contains("dark-theme")) {
      localStorage.setItem("theme", "dark");
      if (okIcon) okIcon.src = "img/svg/icon-ok-dark.svg"; 
      if (logoImage) logoImage.src = "img/svg/logo-dark.svg";
      themeButton.classList.add("dark-mode");
    } else {
      localStorage.setItem("theme", "light");
      if (okIcon) okIcon.src = "img/svg/icon-ok-light.svg";
      if (logoImage) logoImage.src = "img/svg/logo.svg";
      themeButton.classList.remove("dark-mode");
    }

    // Додати/видалити клас .black для main
    document.querySelector("main").classList.toggle("black");

    // Додати/видалити клас .black-grey для зазначених елементів
    let blackGreyElements = document.querySelectorAll(
      ".header, .email-input-block, .email-field, .article-content, .post-meta, .comment-form, .comment-item, .comment-field, #cookieBanner"
    );
    blackGreyElements.forEach((element) => {
      element.classList.toggle("black-grey");
    });
    
    // Додати/видалити клас .black-grey_only для зазначених елементів
    let blackGreyOnlyElements = document.querySelectorAll(".title-hint");
    blackGreyOnlyElements.forEach((element) => {
      element.classList.toggle("black-grey_only");
    });

    // Додати/видалити клас .gray для зазначених елементів
    let grayElements = document.querySelectorAll(".post-date, .char-counter, .news__time");
    grayElements.forEach((element) => {
      element.classList.toggle("gray");
    });

    // Додати/видалити клас .lightgray для зазначених елементів
    let lightGrayElements = document.querySelectorAll(".news__description");
    lightGrayElements.forEach((element) => {
      element.classList.toggle("lightgray");
    });

    // Додати/видалити клас .purple для зазначених елементів
    let purpleElements = document.querySelectorAll(".theme-switcher, .rounded-info-block, .submit-button, .footer");
    purpleElements.forEach((element) => {
      element.classList.toggle("purple");
    });
  };
}