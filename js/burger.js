const menuButton = document.getElementById("menu-button");
const menuIcon = document.getElementById("menu-icon");
const menuList = document.getElementById("menu-list");
const headerContent = document.querySelector(".header__content");
const logoImage = document.querySelector(".logo__image");
const themeSwitcher = document.querySelector(".theme-switcher");

// Додати або знайти фон для приховування контенту
const overlay = document.querySelector(".overlay") || (() => {
  const newOverlay = document.createElement("div");
  newOverlay.className = "overlay";
  document.body.appendChild(newOverlay);
  return newOverlay;
})();

// Функція для оновлення логотипа
const updateLogo = () => {
  if (menuList.classList.contains("visible")) {
    // Якщо меню відкрите, завжди використовуємо темний логотип
    logoImage.src = "img/svg/logo-dark.svg";
  } else {
    // Інакше логіка залежить від теми
    logoImage.src = themeSwitcher.classList.contains("dark-mode") 
      ? "img/svg/logo-dark.svg"  // Логотип для темної теми
      : "img/svg/logo.svg";      // Логотип для світлої теми
  }
};

// Обробник кліку для кнопки меню
menuButton.addEventListener("click", () => {
  const isMenuOpen = menuList.classList.toggle("visible");

  // Змінити іконку меню
  menuIcon.src = isMenuOpen ? "img/svg/menu-close-light.svg" : "img/svg/menu-open-light.svg";

  // Оновити логотип
  updateLogo();

  // Додати фіксовану позицію до хедера, якщо меню активне
  headerContent.classList.toggle("fixed", isMenuOpen);
  overlay.classList.toggle("active", isMenuOpen);
});

// Обробник кліку для перемикача теми
if (themeSwitcher) {
  themeSwitcher.addEventListener("click", () => {
    // Перемикання класу темної теми
    themeSwitcher.classList.toggle("dark-mode");

    // Оновити логотип
    updateLogo();
  });
}

// Ініціалізація логотипа під час завантаження сторінки
updateLogo();