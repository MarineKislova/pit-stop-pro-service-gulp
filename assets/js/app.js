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

  // аккордеон
  function initAccordion() {
    const items = document.querySelectorAll(".accordion__item");

    items.forEach((item) => {
      const header = item.querySelector(".accordion-toggle");
      const body = item.querySelector(".accordion__item-body");
      const icon = item.querySelector(".accordion-icon");

      header.addEventListener("click", () => {
        const isOpen = item.classList.contains("active");

        // 1. Закрываем все открытые элементы
        items.forEach((el) => {
          el.classList.remove("active");
          el.querySelector(".accordion__item-body").style.display = "none";
          el.querySelector(".accordion-icon").textContent = "+";
        });

        // 2. Если текущий не был открыт — открываем его
        if (!isOpen) {
          item.classList.add("active");
          body.style.display = "flex";
          icon.textContent = "-";
        }
      });
    });
  }

  // Запуск
  initAccordion();


    //скролл кнопка
  const scrollTopBtn = document.getElementById("scrollTop");

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 500) {
      scrollTopBtn.classList.add("_active");
    } else {
      scrollTopBtn.classList.remove("_active");
    }
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});
