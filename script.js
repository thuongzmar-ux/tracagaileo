/* ============================================================
   script.js – Landing Page Trà Cà Gai Leo Rau Má Mộc Lành
   ============================================================ */

// ─── GALLERY SLIDESHOW ──────────────────────────────────────
(function () {
  const slides = document.querySelectorAll('.gallery-slide');
  const thumbs = document.querySelectorAll('.gallery-thumb');
  let current = 0;
  let timer;

  function goTo(idx) {
    slides[current].classList.remove('active');
    thumbs[current].classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    thumbs[current].classList.add('active');
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function startAuto() {
    clearInterval(timer);
    timer = setInterval(next, 3500);
  }

  document.querySelector('.gallery-nav-btn.next')?.addEventListener('click', () => { next(); startAuto(); });
  document.querySelector('.gallery-nav-btn.prev')?.addEventListener('click', () => { prev(); startAuto(); });

  thumbs.forEach((thumb, i) => {
    thumb.addEventListener('click', () => { goTo(i); startAuto(); });
  });

  startAuto();
})();


// ─── COUNTDOWN TIMER ─────────────────────────────────────────
(function () {
  function pad(n) { return String(n).padStart(2, '0'); }

  // End of today midnight
  function getEndTime() {
    const end = new Date();
    end.setHours(23, 59, 59, 0);
    return end.getTime();
  }

  let endTime = parseInt(localStorage.getItem('cdEndTime') || '0');
  if (!endTime || endTime < Date.now()) {
    endTime = getEndTime();
    localStorage.setItem('cdEndTime', endTime);
  }

  const hEl = document.getElementById('cd-hours');
  const mEl = document.getElementById('cd-minutes');
  const sEl = document.getElementById('cd-seconds');

  function tick() {
    const diff = Math.max(0, endTime - Date.now());
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    if (hEl) hEl.textContent = pad(h);
    if (mEl) mEl.textContent = pad(m);
    if (sEl) sEl.textContent = pad(s);
    if (diff > 0) requestAnimationFrame(tick);
  }
  tick();
})();


// ─── SOCIAL PROOF NOTIFICATION ───────────────────────────────
(function () {
  const notifications = [
    { name: 'Minh Thuy - Đồng Tháp', phone: '038****789', action: 'Đặt mua COMBO 2' },
    { name: 'Lan Anh - TP.HCM',      phone: '097****234', action: 'Đặt mua COMBO 3' },
    { name: 'Thu Hằng - Hà Nội',     phone: '086****567', action: 'Đặt mua COMBO 1' },
    { name: 'Ngọc Linh - Cần Thơ',   phone: '093****890', action: 'Đặt mua COMBO 4' },
    { name: 'Bảo Trâm - Bình Dương', phone: '035****112', action: 'Đặt mua COMBO 2' },
  ];

  const popup = document.getElementById('notify-popup');
  if (!popup) return;

  const titleEl = popup.querySelector('.noti-title');
  const contentEl = popup.querySelector('.noti-content');

  let idx = 0;

  function showNext() {
    const n = notifications[idx % notifications.length];
    titleEl.textContent = `${n.name} – ${n.phone}`;
    contentEl.textContent = n.action;
    popup.classList.add('show');
    idx++;
    setTimeout(() => { popup.classList.remove('show'); }, 3500);
  }

  // First show after 5s, then every 12s
  setTimeout(() => {
    showNext();
    setInterval(showNext, 12000);
  }, 5000);
})();


// ─── STICKY BAR VISIBILITY ───────────────────────────────────
(function () {
  const bar = document.querySelector('.sticky-bar');
  if (!bar) return;
  // Always visible on mobile landing page – nothing to do
})();


// ─── SCROLL ANIMATION TRIGGER ────────────────────────────────
(function () {
  const els = document.querySelectorAll('[data-animate]');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add(e.target.dataset.animate);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  els.forEach(el => observer.observe(el));
})();


// ─── VIDEO PLAY TOGGLE ───────────────────────────────────────
(function () {
  const vw = document.querySelector('.video-wrapper');
  if (!vw) return;
  const video = vw.querySelector('video');
  const playBtn = vw.querySelector('.video-play-btn');

  vw.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      if (playBtn) playBtn.style.display = 'none';
    } else {
      video.pause();
      if (playBtn) playBtn.style.display = 'block';
    }
  });
})();


// ─── FORM SUBMIT (Webcake API) ────────────────────────────────
(function () {
  // Keep the original form submission logic intact
  // The forms use id-based submission wired by app.js from Pancake
  // No override needed
})();


// ─── VIEWING COUNT ANIMATION ─────────────────────────────────
(function () {
  const el = document.getElementById('viewing-count');
  if (!el) return;
  let base = 153;
  setInterval(() => {
    const delta = Math.floor(Math.random() * 7) - 3;
    base = Math.max(100, Math.min(250, base + delta));
    el.textContent = base;
  }, 4000);
})();
