//------------------------------------------------------------------------Animation
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

  updateAnimData(); // первый раз при загрузке

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

  // пересчет размеров только при resize
  window.addEventListener('resize', () => requestAnimationFrame(updateAnimData));

  animOnScroll();
}

//------------------------------------------------------------------------Animation
