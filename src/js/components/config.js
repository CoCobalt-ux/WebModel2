//------------------------------------------------------------------------Fancybox
//document.addEventListener("DOMContentLoaded", function () {
//  if (typeof Fancybox !== "undefined" && typeof Fancybox.bind === "function") {
//      Fancybox.bind("[data-fancybox]", {
//          // Кастомные опции
//      });
//  }
//});
//------------------------------------------------------------------------Fancybox

//------------------------------------------------------------------------Прокрутка при клике
//let buttons = document.querySelectorAll('.menu__link');
//
//buttons.forEach((elem)=>{
//  elem.addEventListener('click',()=>{
//    menuBody.classList.remove('_active');
//    burgerMenu.classList.remove('_active');
//  })
//})
//
//const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
//
//if (menuLinks.length > 0) {
//  menuLinks.forEach(menuLink => {
//    menuLink.addEventListener("click", onMenuLinkClick);
//  });
//  function onMenuLinkClick(e) {
//    const menuLink = e.target;
//    if(menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
//        const gotoBlock = document.querySelector(menuLink.dataset.goto);
//        const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight;
//      
//        window.scrollTo({
//        top:gotoBlockValue,
//        behavior: "smooth"
//      });
//      e.preventDefault();
//    }
//  }
//}
//------------------------------------------------------------------------Прокрутка при клике

//------------------------------------------------------------------------появление бекграунда у шапки при прокрутки вниз
window.addEventListener('scroll', () => {
  if(pageYOffset > 100) {
    document.querySelector('.header').classList.add('header-bg');
  } else {
    document.querySelector('.header').classList.remove('header-bg');
  }
});
//------------------------------------------------------------------------появление бекграунда у шапки при прокрутки вниз

//------------------------------------------------------------------------настройки ползунко в калькуляторе
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

    // Обновляем ширину слайдера при ресайзе
    window.addEventListener('resize', () => {
      sliderWidth = range.offsetWidth;
      updateSlider();
    });
  });
}

document.addEventListener('DOMContentLoaded', initCalculators);


//------------------------------------------------------------------------настройки ползунко в калькуляторе
//------------------------------------------------------------------------Прокрутка сообщений
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
//------------------------------------------------------------------------Прокрутка сообщений



