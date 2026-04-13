import * as commonFunctions from "./modules/functions.js";

document.addEventListener("DOMContentLoaded", () => {
  "use strict";
  commonFunctions.isWebp();
  //burger
  // Сохраняем элементы в переменные для удобства
  const burger = document.querySelector(".burger");
  const menu = document.querySelector(".hamburger");
  const menuLinks = document.querySelectorAll(".hamburger a"); // Выбираем все ссылки внутри меню

  // Логика открытия/закрытия по кнопке
  burger.addEventListener("click", function () {
    this.classList.toggle("active");
    menu.classList.toggle("open");
  });

  // Закрытие меню при клике на ссылку (якорь)
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      burger.classList.remove("active");
      menu.classList.remove("open");
    });
  });

    //модальное окно для связи из header
  const openModalBtn = document.querySelectorAll(".open-modal");
  const modal = document.getElementById("contact-modal");
  const closeBtn = modal.querySelector(".modal__close");
  const overlay = modal.querySelector(".modal__overlay");

  function openModal() {
    modal.style.display = "flex";
  }

  function closeModal() {
    modal.style.display = "none";
  }

  openModalBtn.forEach((item) => {
    item.addEventListener("click", openModal);
  });
  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
});
