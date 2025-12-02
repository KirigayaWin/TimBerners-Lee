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
  update();
})();

/* ============================
   PROJECT CAROUSEL (FINAL)
   ============================ */

const projectCarousel = document.querySelector('.project-carousel');
const projectTrack = document.querySelector('.project-track');
const projectSlides = document.querySelectorAll('.project-slide');
const projectPrev = document.querySelector('.project-prev');
const projectNext = document.querySelector('.project-next');

let projectIndex = 0;
const totalSlides = projectSlides.length;

function updateProjectCarousel() {
    const width = projectCarousel.clientWidth;
    projectTrack.style.transform = `translateX(${-projectIndex * width}px)`;

    document.querySelectorAll('.project-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === projectIndex);
    });
}

projectNext.addEventListener('click', () => {
    projectIndex = (projectIndex + 1) % totalSlides;
    updateProjectCarousel();
});

projectPrev.addEventListener('click', () => {
    projectIndex = (projectIndex - 1 + totalSlides) % totalSlides;
    updateProjectCarousel();
});

function enableSwipe() {
    let startX = 0;
    let currentX = 0;
    let dragging = false;

    function pointerDown(e) {
        dragging = true;
        startX = e.clientX || e.touches?.[0].clientX;
        projectTrack.style.transition = 'none';
    }

    function pointerMove(e) {
        if (!dragging) return;
        currentX = e.clientX || e.touches?.[0].clientX;
        const dx = currentX - startX;
        const width = projectCarousel.clientWidth;
        projectTrack.style.transform = `translateX(${(-projectIndex * width) + dx}px)`;
    }

    function pointerUp(e) {
        if (!dragging) return;
        dragging = false;

        const endX = e.clientX || e.changedTouches?.[0].clientX;
        const dx = endX - startX;

        projectTrack.style.transition = '';

        const threshold = 70;
        if (dx > threshold) {
            projectIndex = (projectIndex - 1 + totalSlides) % totalSlides;
        } else if (dx < -threshold) {
            projectIndex = (projectIndex + 1) % totalSlides;
        }

        updateProjectCarousel();
    }

    projectCarousel.addEventListener('mousedown', pointerDown);
    window.addEventListener('mousemove', pointerMove);
    window.addEventListener('mouseup', pointerUp);

    projectCarousel.addEventListener('touchstart', pointerDown, { passive: true });
    projectCarousel.addEventListener('touchmove', pointerMove, { passive: true });
    projectCarousel.addEventListener('touchend', pointerUp);
}

enableSwipe();

window.addEventListener('resize', updateProjectCarousel);

updateProjectCarousel();

/* =====================
   SERVICES CAROUSEL
===================== */

const servicesCarousel = document.querySelector('.services-carousel');
const servicesTrack = document.querySelector('.services-track');
const servicesSlides = document.querySelectorAll('.services-slide');
const servicesPrev = document.querySelector('.services-prev');
const servicesNext = document.querySelector('.services-next');

let servicesIndex = 0;
const totalServicesSlides = servicesSlides.length;

function updateServicesCarousel() {
    const width = servicesCarousel.clientWidth;
    servicesTrack.style.transform = `translateX(${-servicesIndex * width}px)`;
}

/* Prev / Next buttons */
servicesNext.addEventListener("click", () => {
    servicesIndex = (servicesIndex + 1) % totalServicesSlides;
    updateServicesCarousel();
});

servicesPrev.addEventListener("click", () => {
    servicesIndex = (servicesIndex - 1 + totalServicesSlides) % totalServicesSlides;
    updateServicesCarousel();
});

/* Swipe Support */
function enableServicesSwipe() {
    let startX = 0;
    let dragging = false;

    function down(e) {
        dragging = true;
        startX = e.clientX || e.touches?.[0].clientX;
        servicesTrack.style.transition = "none";
    }

    function move(e) {
        if (!dragging) return;
        const x = e.clientX || e.touches?.[0].clientX;
        const dx = x - startX;

        const width = servicesCarousel.clientWidth;
        servicesTrack.style.transform =
            `translateX(${(-servicesIndex * width) + dx}px)`;
    }

    function up(e) {
        if (!dragging) return;
        dragging = false;

        const endX = e.clientX || e.changedTouches?.[0].clientX;
        const dx = endX - startX;

        const threshold = 70;
        if (dx > threshold) servicesIndex = (servicesIndex - 1 + totalServicesSlides) % totalServicesSlides;
        if (dx < -threshold) servicesIndex = (servicesIndex + 1) % totalServicesSlides;

        servicesTrack.style.transition = "";
        updateServicesCarousel();
    }

    servicesCarousel.addEventListener("mousedown", down);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);

    servicesCarousel.addEventListener("touchstart", down, { passive: true });
    servicesCarousel.addEventListener("touchmove", move, { passive: true });
    servicesCarousel.addEventListener("touchend", up);
}

enableServicesSwipe();
updateServicesCarousel();
window.addEventListener("resize", updateServicesCarousel);
