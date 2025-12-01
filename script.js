(function(){
  const slidesEl = document.querySelector('.slides');
  if(!slidesEl) return;
  const slides = Array.from(slidesEl.children);
  let index = 0;
  let startX = 0;
  let currentX = 0;
  let dragging = false;
  const threshold = 50;

  function update() {
    slidesEl.style.transform = `translateX(${-index * 100}%)`;
  }

  function clamp(i){ return Math.max(0, Math.min(i, slides.length - 1)); }

  slidesEl.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    dragging = true;
    slidesEl.style.transition = 'none';
  }, {passive: true});

  slidesEl.addEventListener('touchmove', e => {
    if(!dragging) return;
    currentX = e.touches[0].clientX;
    const dx = currentX - startX;
    slidesEl.style.transform = `translateX(${ -index * 100 + (dx / slidesEl.clientWidth) * 100 }%)`;
  }, {passive: true});

  slidesEl.addEventListener('touchend', e => {
    if(!dragging) return;
    dragging = false;
    slidesEl.style.transition = '';
    const dx = (currentX || startX) - startX;
    if (dx > threshold) index = clamp(index - 1);
    else if (dx < -threshold) index = clamp(index + 1);
    update();
    startX = currentX = 0;
  });

  // mouse drag support (desktop)
  slidesEl.addEventListener('mousedown', e => {
    startX = e.clientX;
    dragging = true;
    slidesEl.style.transition = 'none';
    e.preventDefault();
  });
  window.addEventListener('mousemove', e => {
    if(!dragging) return;
    currentX = e.clientX;
    const dx = currentX - startX;
    slidesEl.style.transform = `translateX(${ -index * 100 + (dx / slidesEl.clientWidth) * 100 }%)`;
  });
  window.addEventListener('mouseup', () => {
    if(!dragging) return;
    dragging = false;
    slidesEl.style.transition = '';
    const dx = (currentX || startX) - startX;
    if (dx > threshold) index = clamp(index - 1);
    else if (dx < -threshold) index = clamp(index + 1);
    update();
    startX = currentX = 0;
  });

  // init
  update();
})();

