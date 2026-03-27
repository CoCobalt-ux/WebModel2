//------------------------------------------------------------------------Слайдер
document.addEventListener('DOMContentLoaded', () => {
  // Основные слайдеры
  const sliders = document.querySelectorAll('.slider');
  sliders.forEach(slider => {
    new Swiper(slider, {
      loop: false,
      direction: 'horizontal',
      slidesPerView: 2,
      speed: 1000,
      breakpoints: {
        320: { slidesPerView: 2, spaceBetween: 10 },
        640: { slidesPerView: 2, spaceBetween: 20 }
      },
      scrollbar: {
      el: slider.querySelector('.swiper-scrollbar'),
      draggable: true,  
      },
    });
  });

  // Слайдер платежей
  const sliderPayments = document.querySelectorAll('.slider-payments');
  sliderPayments.forEach(slider => {
    new Swiper(slider, {
      loop: false,
      direction: 'horizontal',
      slidesPerView: 1,
      speed: 1000,
      scrollbar: {
      el: slider.querySelector('.swiper-scrollbar'),
      draggable: true,  
      },
      breakpoints: {
        320: { spaceBetween: 10 },
        640: { spaceBetween: 30 }
      }
    });
  });

  // Мини-слайдеры с навигацией
  const sliderMini = document.querySelectorAll('.slider-mini');
  sliderMini.forEach(slider => {
    new Swiper(slider, {
      loop: true,
      direction: 'horizontal',
      slidesPerView: 1,
      spaceBetween: 20,
      speed: 1000,
      navigation: {
        nextEl: slider.querySelector('.swiper-button-next'),
        prevEl: slider.querySelector('.swiper-button-prev')
      }
    });
  });

  // Слайдер отзывов
  const reviewsSlider = document.querySelectorAll('.reviews-slider');
  reviewsSlider.forEach(slider => {
    new Swiper(slider, {
      loop: true,
      direction: 'horizontal',
      speed: 1000,
      breakpoints: {
        320: { slidesPerView: 2, spaceBetween: 15 },
        640: { slidesPerView: 3, spaceBetween: 20 }
      }
    });
  });
});

//------------------------------------------------------------------------Слайдер

