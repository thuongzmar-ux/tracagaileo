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
    // 1. Pause video on the previous slide
    const prevVideo = slides[current].querySelector('video');
    if (prevVideo) {
      prevVideo.pause();
      prevVideo.currentTime = 0;
    }

    slides[current].classList.remove('active');
    thumbs[current].classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    thumbs[current].classList.add('active');

    // 2. Play video if new slide is a video slide, and pause auto-slideshow
    const activeVideo = slides[current].querySelector('video');
    if (activeVideo) {
      clearInterval(timer);
      activeVideo.play().catch(e => {
        console.log("Autoplay blocked:", e);
      });
      activeVideo.onended = () => {
        next();
      };
    } else {
      startAuto();
    }
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function startAuto() {
    clearInterval(timer);
    const activeVideo = slides[current].querySelector('video');
    if (!activeVideo) {
      timer = setInterval(next, 3500);
    }
  }

  document.querySelector('.gallery-nav-btn.next')?.addEventListener('click', () => { next(); });
  document.querySelector('.gallery-nav-btn.prev')?.addEventListener('click', () => { prev(); });

  thumbs.forEach((thumb, i) => {
    thumb.addEventListener('click', () => { goTo(i); });
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
    { name: 'Minh Thủy - Đồng Tháp', phone: '038****789', action: 'Đặt mua COMBO 2', avatar: 'khach mua hang/364138122_1045238660217835_2442171222104658281_n.jpg' },
    { name: 'Lan Anh - TP.HCM',      phone: '097****234', action: 'Đặt mua COMBO 3', avatar: 'khach mua hang/465473625_122112122846573640_989551393226722171_n.jpg' },
    { name: 'Thu Hằng - Hà Nội',     phone: '086****567', action: 'Đặt mua COMBO 1', avatar: 'khach mua hang/741948389_3799552246850259_8773310896217949891_n.jpg' },
    { name: 'Ngọc Linh - Cần Thơ',   phone: '093****890', action: 'Đặt mua COMBO 4', avatar: 'khach mua hang/432768204_3648182005414428_1552898578772779911_n.jpg' },
    { name: 'Bảo Trâm - Bình Dương', phone: '035****112', action: 'Đặt mua COMBO 2', avatar: 'khach mua hang/48252701_303397543651298_646461722726498304_n.jpg' },
    { name: 'Hoàng Nam - Đà Nẵng',    phone: '090****456', action: 'Đặt mua COMBO 3', avatar: 'khach mua hang/470236954_1024194256414747_2150550864282824850_n.jpg' },
    { name: 'Thanh Hải - Hải Phòng',  phone: '091****889', action: 'Đặt mua COMBO 2', avatar: 'khach mua hang/608639509_1337977354682469_6394165459133242434_n.jpg' },
    { name: 'Khánh Vy - Nha Trang',   phone: '098****321', action: 'Đặt mua COMBO 1', avatar: 'khach mua hang/364138122_1045238660217835_2442171222104658281_n.jpg' },
    { name: 'Quốc Bảo - Đồng Nai',   phone: '094****654', action: 'Đặt mua COMBO 4', avatar: 'khach mua hang/465473625_122112122846573640_989551393226722171_n.jpg' },
    { name: 'Thùy Dương - Quảng Ninh', phone: '039****987', action: 'Đặt mua COMBO 2', avatar: 'khach mua hang/741948389_3799552246850259_8773310896217949891_n.jpg' },
  ];

  const popup = document.getElementById('notify-popup');
  if (!popup) return;

  const titleEl = popup.querySelector('.noti-title');
  const contentEl = popup.querySelector('.noti-content');
  const imgEl = popup.querySelector('.noti-img');

  const audio = new Audio('notification.mp3');
  audio.volume = 0.5;

  let idx = 0;

  // Giải phóng chính sách chặn phát âm thanh của trình duyệt sau khi click/touch
  const unlockAudio = () => {
    audio.play().then(() => {
      audio.pause();
      audio.currentTime = 0;
      document.removeEventListener('click', unlockAudio);
      document.removeEventListener('touchstart', unlockAudio);
    }).catch(e => {
      console.log("Audio unlock pending interaction:", e);
    });
  };
  document.addEventListener('click', unlockAudio);
  document.addEventListener('touchstart', unlockAudio);

  function playSound() {
    audio.currentTime = 0;
    audio.play().catch(e => {
      console.log("Audio play blocked by browser autoplay policy. It will play after first user interaction.", e);
    });
  }

  function showNext() {
    const n = notifications[idx % notifications.length];
    titleEl.textContent = `${n.name} – ${n.phone}`;
    contentEl.textContent = n.action;
    if (imgEl && n.avatar) {
      imgEl.src = n.avatar;
    }
    popup.classList.add('show');
    playSound();
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


// ─── ORDER FORM DUAL BUTTON HANDLING ─────────────────────────
(function () {
  const form = document.getElementById('qng2yxiz');
  const submitSend = document.getElementById('submit-order');
  const xacnhanInput = document.getElementById('xacnhan-input');

  if (submitSend && xacnhanInput) {
    submitSend.addEventListener('click', () => {
      xacnhanInput.value = "Gửi không gọi";
    });
  }

  // Expose submitAndCall globally so onclick="submitAndCall()" works
  window.submitAndCall = function () {
    if (xacnhanInput) {
      xacnhanInput.value = "Gọi xác nhận";
    }

    if (form) {
      // Use requestSubmit to trigger standard HTML5 form validation and submit event listeners
      if (typeof form.requestSubmit === 'function') {
        form.requestSubmit();
      } else {
        // Fallback for older browsers
        let tempSubmit = form.querySelector('.temp-submit-btn');
        if (!tempSubmit) {
          tempSubmit = document.createElement('button');
          tempSubmit.type = 'submit';
          tempSubmit.className = 'temp-submit-btn';
          tempSubmit.style.display = 'none';
          form.appendChild(tempSubmit);
        }
        tempSubmit.click();
      }
    }
  };
})();

// ─── GIFT ORDER BUTTON INTERACTION ───────────────────────────
(function () {
  const giftOrderBtn = document.getElementById('gift-order-btn');
  if (giftOrderBtn) {
    giftOrderBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // Select the combo2 option (3 boxes 295k)
      const combo2Radio = document.getElementById('combo2');
      if (combo2Radio) {
        combo2Radio.checked = true;
      }
      
      // Scroll to the order form
      const orderForm = document.getElementById('order-form');
      if (orderForm) {
        orderForm.scrollIntoView({ behavior: 'smooth' });
        
        // Focus the name field
        const nameInput = orderForm.querySelector('input[name="full_name"]');
        if (nameInput) {
          setTimeout(() => {
            nameInput.focus();
          }, 800); // Wait for smooth scroll to finish
        }
      }
    });
  }
})();
