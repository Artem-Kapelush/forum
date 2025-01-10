// Форма Кукі
const cookieBanner = document.getElementById("cookieBanner");
const acceptCookies = document.getElementById("acceptCookies");

// Перевіряємо, чи є згода на кукі 
if (!document.cookie.includes("cookiesAccepted=true")) {
    cookieBanner.classList.remove("hidden");
}

// Натискання на кнопку "Приняти"
acceptCookies.addEventListener("click", () => {
    // Встановлюємо кукі тільки після натискання
    document.cookie = "cookiesAccepted=true; path=/; max-age=" + 60 * 60 * 24 * 30; // 30 днів
    // Приховуємо банер
    cookieBanner.classList.add("hidden");
});