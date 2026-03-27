"use strict";

const animItems = document.querySelectorAll('._anim-items');

if (animItems.length) {
  const animData = Array.from(animItems).map(item => ({
    item,
    top: 0,
    height: 0,
    activated: false
  }));

  const updateAnimData = () => {
    animData.forEach(data => {
      const rect = data.item.getBoundingClientRect();
      data.top = rect.top + window.scrollY;
      data.height = rect.height;
      data.activated = false;
    });
  };

  updateAnimData(); 

  const animOnScroll = () => {
    const scrollY = window.scrollY;
    const winH = window.innerHeight;

    animData.forEach(data => {
      if (data.activated) return;

      const animStart = 5;
      let animItemPoint = winH - data.height / animStart;
      if (data.height > winH) animItemPoint = winH - winH / animStart;

      if (scrollY > data.top - animItemPoint && scrollY < data.top + data.height) {
        data.item.classList.add('_action');
        data.activated = true;
      }
    });
  };

  window.addEventListener('scroll', () => requestAnimationFrame(animOnScroll));

  window.addEventListener('resize', () => requestAnimationFrame(updateAnimData));

  animOnScroll();
}




window.addEventListener('scroll', () => {
  if(pageYOffset > 100) {
    document.querySelector('.header').classList.add('header-bg');
  } else {
    document.querySelector('.header').classList.remove('header-bg');
  }
});

function initCalculators() {
  const calculators = document.querySelectorAll('.calculator-container');
  if (!calculators.length) return;

  calculators.forEach(container => {
    const range = container.querySelector('.calculator__range');
    const bubble = container.querySelector('.calculator__bubble');
    if (!range || !bubble) return;

    let sliderWidth = range.offsetWidth;

    const updateSlider = () => {
      const value = +range.value;
      const percent = (value - +range.min) / (+range.max - +range.min);

      requestAnimationFrame(() => {
        range.style.setProperty('--fill-percent', percent * 100 + '%');

        const thumbWidth = window.innerWidth <= 770 ? 16 : 33;
        const left = percent * (sliderWidth - thumbWidth) + thumbWidth / 2;

        bubble.style.left = `${left}px`;
        bubble.textContent = value;
      });
    };

    updateSlider();
    range.addEventListener('input', updateSlider);

    window.addEventListener('resize', () => {
      sliderWidth = range.offsetWidth;
      updateSlider();
    });
  });
}

document.addEventListener('DOMContentLoaded', initCalculators);


document.addEventListener("DOMContentLoaded", () => {
  const dialog = document.querySelector('.work__dialog_inner');
  if (!dialog) return;

  const scrollStep = () => {
    const firstMsg = dialog.children[0];
    if (!firstMsg) return;

    const height = firstMsg.offsetHeight;

    dialog.style.transition = "transform 0.6s ease-out";
    dialog.style.transform = `translateY(-${height}px)`;

    firstMsg.style.transition = "opacity 0.6s ease-out";
    firstMsg.style.opacity = "0";

    dialog.addEventListener("transitionend", () => {
      firstMsg.style.transition = "none";
      firstMsg.style.opacity = "1";
      dialog.appendChild(firstMsg);
      dialog.style.transition = "none";
      dialog.style.transform = "translateY(0)";
    }, { once: true });
  };

  setInterval(scrollStep, 3000);
});




document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('form').forEach(form => {

    const emailTest = input => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(input.value);
    const phoneTest = input => /^\+7\s?\d{10}$/.test(input.value);

    const formAddError = input => {
      input.classList.add('_error');
      input.parentElement.classList.add('_error');
      const errorSpan = input.parentElement.querySelector('.form__error');
      if(errorSpan) errorSpan.classList.add('view');
    };

    const formRemoveError = input => {
      input.classList.remove('_error');
      input.parentElement.classList.remove('_error');
      const errorSpan = input.parentElement.querySelector('.form__error');
      if(errorSpan) errorSpan.classList.remove('view');
    };

    const formValidate = form => {
      let error = 0;
      form.querySelectorAll('._req').forEach(input => {
        formRemoveError(input);

        if(input.classList.contains('_email') && !emailTest(input)) error++, formAddError(input);
        else if(input.classList.contains('_number') && !phoneTest(input)) error++, formAddError(input);
        else if(input.type === 'checkbox' && !input.checked) error++, formAddError(input);
        else if(input.value.trim() === '') error++, formAddError(input);
      });
      return error;
    };

    const formSend = async e => {
      e.preventDefault();
      const error = formValidate(form);
      if(error) return;

      const formData = new FormData(form);
      form.classList.add('_sending');

      try {
        const response = await fetch('send.php', { method: 'POST', body: formData });
        if(response.ok) {
          form.style.display = 'none';
          const successMessage = document.createElement('div');
          successMessage.classList.add('success-message');
          successMessage.textContent = 'Форма успешно отправлена! Спасибо за ваш отклик.';
          form.parentElement.appendChild(successMessage);
          form.reset();
        } else alert('Ошибка при отправке формы');
      } catch(e) {
        alert('Ошибка при отправке формы');
      } finally {
        form.classList.remove('_sending');
      }
    };

    form.addEventListener('submit', formSend);
  });
});


const burgerMenu = document.querySelector('.burger');
const menuBody = document.querySelector('.menu');

if(burgerMenu && menuBody) {
  burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('_active');
    menuBody.classList.toggle('_active');
  });

  document.addEventListener('click', e => {
    if(!burgerMenu.contains(e.target)) {
      menuBody.classList.remove('_active');
      burgerMenu.classList.remove('_active');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
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


