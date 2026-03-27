//------------------------------------------------------------------------Меню-Бургер
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