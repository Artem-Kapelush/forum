// Кнопка скролу в верх
let scrollToTopBtn = document.getElementById("scrollToTopBtn");

// Показує або ховає кнопку залежно від позиції скролу
window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
        scrollToTopBtn.classList.add("show");
    } else {
        scrollToTopBtn.classList.remove("show");
    }
});

// Скролює наверх при натисканні
scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});