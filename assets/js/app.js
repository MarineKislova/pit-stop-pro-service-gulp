import * as commonFunctions from "./modules/functions.js";
import { swiperReviews } from "./modules/swiper.js";

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
 const modal = document.getElementById("contact-modal");
  if (!modal) return;

  const openModalBtns = document.querySelectorAll(".open-modal");
  // Выбираем все элементы закрытия (крестик, оверлей и кнопку OK в блоке успеха)
  const closeElements = modal.querySelectorAll(".modal__close, .modal__overlay, .modal__close-btn");
  
  const modalContent = modal.querySelector('.modal__content'); // Блок с фото и формой
  const successBlock = document.getElementById('success-message'); // Блок успеха
  const form = modal.querySelector('.form-modal');

  // --- Функции управления ---

  function openModal(e) {
    if (e) e.preventDefault();
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
    
    // Сбрасываем модалку к исходному виду (с фото) после закрытия
    setTimeout(resetModal, 300);
  }

  function resetModal() {
    // 1. Показываем основной блок (с фото) и скрываем блок успеха
    if (modalContent) modalContent.style.display = 'flex';
    if (successBlock) successBlock.style.display = 'none';

    // 2. Сбрасываем саму форму
    if (form) {
      form.reset();
      const sendBtn = form.querySelector('#sendBtn');
      if (sendBtn) {
        sendBtn.disabled = false;
        sendBtn.innerText = 'Book an appointment';
      }
    }
  }

  // --- Обработчики событий ---

  openModalBtns.forEach(btn => btn.addEventListener("click", openModal));

  closeElements.forEach(el => el.addEventListener("click", closeModal));

  // Закрытие на ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });

  // Логика отправки формы
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Honeypot защита
      const honey = form.querySelector('input[name="honey"]')?.value;
      if (honey) return;

      const sendBtn = form.querySelector('#sendBtn');
      sendBtn.innerText = 'Sending...';
      sendBtn.disabled = true;

      // Имитация отправки
      setTimeout(() => {
        // СКРЫВАЕМ всю карточку (вместе с фото)
        if (modalContent) modalContent.style.display = 'none';
        
        // ПОКАЗЫВАЕМ блок успеха (узкое окно)
        if (successBlock) successBlock.style.display = 'flex';
      }, 800);
    });
  }

  // Закрытие окна по кнопке "Ok"
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal__close-btn')) {
      const modal = document.getElementById('contact-modal');
      modal.classList.remove('active'); // Или ваш класс для закрытия
      
      // Опционально: сбросить форму через время, чтобы при новом открытии она была пустой
      setTimeout(() => {
        location.reload(); // Простой способ сбросить состояние макета
      }, 500);
    }
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

  //swiper
  swiperReviews.update();

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
