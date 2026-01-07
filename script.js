(() => {
  const carousel = (contain, tracker, select, prev, next) => {
    const c = document.querySelector(contain); if (!c) return;
    const t = tracker ? c.querySelector(tracker) : c;
    const s = c.querySelectorAll(select); if (!t || s.length === 0) return;
    let i = 0, sx = 0, st = 0, dragging = false;
    const pos = (inst = false) => { t.style.transition = inst ? 'none' : ''; t.style.transform = `translateX(${-i * c.clientWidth}px)`; };
    const down = e => { dragging = true; sx = e.clientX; st = -i * c.clientWidth; t.style.transition = 'none'; };
    const move = e => { if (!dragging) return; t.style.transform = `translateX(${st + e.clientX - sx}px)`; };
    const up = e => {
      if (!dragging) return; dragging = false;
      const dx = e.clientX - sx, th = c.clientWidth * 0.15;
      if (dx > th) i = (i - 1 + s.length) % s.length;
      else if (dx < -th) i = (i + 1) % s.length;
      pos();
    };
    t.addEventListener('pointerdown', down);
    addEventListener('pointermove', move);
    addEventListener('pointerup', up);
    addEventListener('resize', () => pos(true));
    c.querySelector(prev)?.addEventListener('click', () => { i = (i - 1 + s.length) % s.length; pos(); });
    c.querySelector(next)?.addEventListener('click', () => { i = (i + 1) % s.length; pos(); });
    pos(true);
  };

  carousel('.project-carousel', '.project-track', '.project-slide', '.project-prev', '.project-next');
  carousel('.services-carousel', '.services-track', '.services-slide', '.services-prev', '.services-next');
  carousel('.hero .carousel', '.slides', '.slide');

  const delay = 3000, vh = 10;
  const h = () => Math.max(60, Math.round(innerHeight * vh / 100));
  const ad = document.createElement('div');
  Object.assign(ad.style, { position: 'fixed', left: '0', right: '0', bottom: '0', height: '0', overflow: 'hidden', zIndex: 9999, transition: 'height .36s ease' });
  const frame = document.createElement('iframe'); frame.src = 'ad.html'; Object.assign(frame.style, { width: '100%', height: '100%', border: 0, display: 'block' });

  const btn = document.createElement('button'); btn.textContent = '✕';
  Object.assign(btn.style, { position: 'absolute', right: '12px', top: '-24px', width: '48px', height: '48px', borderRadius: '24px', border: 'none', background: '#222', color: '#fff', cursor: 'pointer' });

  btn.onclick = () => { ad.style.height = (ad.style.height === '0px' || !ad.style.height) ? h() + 'px' : '0'; };

  ad.append(frame, btn);
  document.body.append(ad);
  setTimeout(() => ad.style.height = h() + 'px', delay);

  ad.addEventListener('mousemove', e => {
    const r = ad.getBoundingClientRect();
    const bw = btn.offsetWidth || 48;
    const mx = e.clientX - r.left;
    const btnRect = btn.getBoundingClientRect();
    const center = btnRect.left - r.left + bw / 2;
    const closeDist = 80;
    if (Math.abs(mx - center) < closeDist) {
      const shift = 36;
      const currentLeft = (btn.offsetLeft || (r.width - bw - 12));
      const target = mx > center ? currentLeft - shift : currentLeft + shift;
      const leftPos = Math.max(12, Math.min(r.width - bw - 12, Math.round(target)));
      btn.style.left = leftPos + 'px';
      btn.style.right = 'auto';
    } else {
      btn.style.left = '';
      btn.style.right = '12px';
    }
  });

  addEventListener('resize', () => { if (ad.style.height !== '0px') ad.style.height = h() + 'px'; });
})();
