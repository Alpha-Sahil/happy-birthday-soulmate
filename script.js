/* ==========================================================================
   ♡  PERSONALIZE HERE  ♡
   Everything personal lives in this CONFIG object. Fill in the empty
   strings, save the file, and refresh the page. Nothing else needs editing.

   - Leave a value as "" and it shows a dashed [PLACEHOLDER] so you can see
     what is still missing. Set `showPlaceholders: false` before you gift
     the website, and any empty detail will be hidden gracefully instead.
   - Dates use the format "YYYY-MM-DD", e.g. "2023-02-14".
   - Image paths are relative to index.html, e.g. "assets/images/memory-1.jpg".
   ========================================================================== */
const CONFIG = {
  yourName: "Sahil",              // [YOUR NAME]
  herName: "kajal",               // [HER NAME]

  birthday: {
    day: 28,
    month: 10,               // 1 = January … 10 = October
    year: ""                 // optional, e.g. 2026 — only used to label the celebration
  },

  firstMeetingDate: "2026-05-04",      // [FIRST MEETING DATE]  "YYYY-MM-DD" — powers the days counter
  meetingPlace: "Chitaare Mandir",          // [WHERE WE MET]  a place, city, college, app…
  howWeMet: "Just with a random talk 'mere sahil ke liye koi ladki batao'",              // [OUR STORY]  one or two sentences
  firstImpression: "Smiling",       // [FIRST IMPRESSION]  what you thought when you first saw her

  // Photo from the day you met (optional). Missing files show a soft placeholder.
  firstMeetingPhoto: {
    src: "assets/images/first-meeting.jpg",
    alt: "The two of us on the day we first met",
    caption: "Where it all began"
  },

  // 3–6 memories. Add, remove or reorder freely.
  memories: [
    { src: "assets/images/memory-1.webp", title: "Our first picture", caption: "", alt: "Our first picture together" },
    { src: "assets/images/memory-2.webp", title: "My favorite picture of us", caption: "", alt: "My favorite picture of us" },
    { src: "assets/images/memory-3.webp", title: "A day I will always remember", caption: "", alt: "A day I will always remember" },
    { src: "assets/images/memory-4.webp", title: "Our happiest little moments", caption: "", alt: "One of our happiest little moments" }
  ],

  // The hidden message behind "One Last Little Surprise ♡"
  secretMessage: "If I had to begin my story all over again, I would still hope to find you somewhere along the way.",

  // Optional background music. Plays only when she taps the music button.
  // If the file doesn't exist, the button simply stays hidden.
  music: {
    src: "assets/audio/romantic-music.mp3",
    volume: 0.5
  },

  showPlaceholders: true     // set to false before gifting the website
};

/* ==========================================================================
   You shouldn't need to edit anything below this line.
   ========================================================================== */
(function () {
  "use strict";

  const MONTHS = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];
  const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const MS_PER_DAY = 86400000;

  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const reducedMotion = () => motionQuery.matches;

  document.documentElement.classList.add("js");

  /* ---------- Helpers ---------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const clean = (value) => (value === undefined || value === null ? "" : String(value).trim());

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function placeholder(label) {
    return el("span", "placeholder", label);
  }

  // Parses "YYYY-MM-DD" into a local date, or returns null if invalid.
  function parseDate(value) {
    const match = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(clean(value));
    if (!match) return null;
    const y = Number(match[1]);
    const m = Number(match[2]) - 1;
    const d = Number(match[3]);
    const date = new Date(y, m, d);
    if (date.getFullYear() !== y || date.getMonth() !== m || date.getDate() !== d) return null;
    return date;
  }

  function formatDate(date) {
    return date.getDate() + " " + MONTHS[date.getMonth()] + " " + date.getFullYear();
  }

  // Whole calendar days between two local dates, immune to daylight-saving shifts.
  function daysBetween(from, to) {
    const a = Date.UTC(from.getFullYear(), from.getMonth(), from.getDate());
    const b = Date.UTC(to.getFullYear(), to.getMonth(), to.getDate());
    return Math.round((b - a) / MS_PER_DAY);
  }

  // Resolves with a loaded <img>, or null if the file is missing — so no broken icons.
  function loadImage(src, alt) {
    return new Promise((resolve) => {
      if (!clean(src)) { resolve(null); return; }
      const img = new Image();
      img.decoding = "async";
      img.alt = clean(alt);
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = src;
    });
  }

  function photoPlaceholder(title, src) {
    const box = el("div", "photo-placeholder");
    box.setAttribute("role", "img");
    box.setAttribute("aria-label", title ? title + " (photo coming soon)" : "Decorative photo frame");
    box.appendChild(el("span", "ph-icon", "♡"));
    if (title) box.appendChild(el("span", "ph-title", title));
    if (CONFIG.showPlaceholders && clean(src)) {
      const hint = el("span", "ph-hint", "Add a photo at ");
      hint.appendChild(el("code", "", src));
      box.appendChild(hint);
    }
    return box;
  }

  /* ---------- Text fields ---------- */
  function fillFields() {
    $$("[data-field]").forEach((node) => {
      const key = node.dataset.field;
      let value = clean(CONFIG[key]);
      const prefix = node.dataset.prefix || "";
      const fallback = node.dataset.fallback;

      if (value && node.dataset.format === "date") {
        const date = parseDate(value);
        value = date ? formatDate(date) : "";
      }

      node.textContent = "";

      if (value) {
        node.textContent = prefix + value + (key === "herName" && prefix ? "," : "");
        return;
      }
      if (fallback) {
        node.textContent = fallback;
        return;
      }
      if (CONFIG.showPlaceholders && node.dataset.placeholder) {
        node.appendChild(placeholder(node.dataset.placeholder));
        return;
      }
      // Empty and nothing to show: hide the whole row (or the element itself).
      const row = node.closest("[data-row]") || node;
      row.hidden = true;
    });

    // If every story detail is hidden, drop the separator lines cleanly.
    const details = $(".memory-details");
    if (details && $$(".detail", details).every((d) => d.hidden)) details.hidden = true;

    const footer = $("[data-footer]");
    const me = clean(CONFIG.yourName);
    const her = clean(CONFIG.herName);
    if (footer && (me || her)) {
      footer.textContent = "Made with all my love" + (me ? " by " + me : "") + (her ? ", just for " + her : ", just for you") + ".";
    }
  }

  /* ---------- Birthday labels ---------- */
  function setupBirthday() {
    const day = Number(CONFIG.birthday.day) || 28;
    const monthIndex = (Number(CONFIG.birthday.month) || 10) - 1;
    const year = clean(CONFIG.birthday.year);
    const label = day + " " + MONTHS[monthIndex];

    $$("[data-birthday-label]").forEach((node) => { node.textContent = label; });

    const today = new Date();
    const isToday = today.getDate() === day && today.getMonth() === monthIndex &&
      (!year || Number(year) === today.getFullYear());
    const badge = $("[data-birthday-today]");
    if (badge && isToday) badge.hidden = false;

    if (year) document.title = "Happy Birthday, My Love · " + label + " " + year;
  }

  /* ---------- Special day + counter ---------- */
  function setupSpecialDay() {
    const box = $("#big-date");
    const counter = $("#days-counter");
    const numberEl = $("#days-number");
    const note = $("#counter-placeholder");
    const date = parseDate(CONFIG.firstMeetingDate);

    if (!date) {
      box.appendChild(el("span", "bd-day", "♡"));
      box.appendChild(el("span", "bd-month", "The day we met"));
      if (CONFIG.showPlaceholders) {
        note.textContent = clean(CONFIG.firstMeetingDate)
          ? "The first meeting date in script.js isn't valid yet. Please use the format YYYY-MM-DD, e.g. 2023-02-14."
          : "[FIRST MEETING DATE] — add our first meeting date in script.js (YYYY-MM-DD) and a live days-counter will appear here.";
        note.hidden = false;
      }
      return;
    }

    box.setAttribute("aria-label", formatDate(date));
    const visual = [
      el("span", "bd-day", String(date.getDate())),
      el("span", "bd-month", MONTHS[date.getMonth()]),
      el("span", "bd-year", String(date.getFullYear())),
      el("span", "bd-weekday", "a " + WEEKDAYS[date.getDay()])
    ];
    visual.forEach((n) => { n.setAttribute("aria-hidden", "true"); box.appendChild(n); });

    const days = daysBetween(date, new Date());
    if (days < 0) {
      if (CONFIG.showPlaceholders) {
        note.textContent = "The first meeting date in script.js is in the future — please double-check it.";
        note.hidden = false;
      }
      return;
    }

    counter.hidden = false;
    const formatted = days.toLocaleString("en-US");
    if (days === 0) {
      $(".counter-label", counter).textContent = "today is the day we met ♡";
    } else if (days === 1) {
      $(".counter-label", counter).textContent = "day since we met — and already you are my favorite";
    }

    if (reducedMotion() || !("IntersectionObserver" in window) || days < 2) {
      numberEl.textContent = formatted;
      return;
    }

    // Count up gently the first time the counter scrolls into view.
    numberEl.textContent = "0";
    const io = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      const duration = 1800;
      const start = performance.now();
      const step = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        numberEl.textContent = Math.round(days * eased).toLocaleString("en-US");
        if (t < 1) requestAnimationFrame(step);
        else numberEl.textContent = formatted;
      };
      requestAnimationFrame(step);
    }, { threshold: 0.6 });
    io.observe(counter);
  }

  /* ---------- Photos ---------- */
  async function setupFirstPhoto() {
    const frame = $("[data-photo='firstMeetingPhoto']");
    if (!frame) return;
    const photo = CONFIG.firstMeetingPhoto || {};
    const img = await loadImage(photo.src, photo.alt);
    frame.appendChild(img || photoPlaceholder(frame.dataset.photoLabel, photo.src));
    if (clean(photo.caption)) frame.appendChild(el("figcaption", "", photo.caption));
  }

  function setupGallery() {
    const gallery = $("#gallery");
    if (!gallery) return Promise.resolve();
    const items = (CONFIG.memories || []).slice(0, 6);
    gallery.dataset.count = String(items.length);

    const frames = items.map((memory) => {
      const figure = el("figure", "photo-frame reveal");
      const caption = el("figcaption", "", clean(memory.title) || "♡");
      if (clean(memory.caption)) caption.appendChild(el("span", "ph-sub", memory.caption));
      gallery.appendChild(figure);

      return loadImage(memory.src, memory.alt || memory.title).then((img) => {
        figure.insertBefore(img || photoPlaceholder("", memory.src), null);
        figure.appendChild(caption);
      });
    });
    return Promise.all(frames);
  }

  /* ---------- Reveal on scroll ---------- */
  function setupReveal() {
    const targets = $$(".reveal");
    if (reducedMotion() || !("IntersectionObserver" in window)) {
      targets.forEach((t) => t.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

    // A tiny stagger for siblings that appear together (cards, list items).
    targets.forEach((t) => {
      const siblings = Array.from(t.parentElement.children).filter((c) => c.classList.contains("reveal"));
      const index = siblings.indexOf(t);
      if (siblings.length > 1 && index > 0) t.style.transitionDelay = Math.min(index * 0.12, 0.5) + "s";
      io.observe(t);
    });
  }

  /* ---------- Floating hearts ---------- */
  function setupHearts() {
    const layer = $(".hearts-layer");
    if (!layer || reducedMotion()) return;
    const count = window.innerWidth < 640 ? 7 : 11;
    const glyphs = ["♥", "♡", "✦"];
    for (let i = 0; i < count; i++) {
      const heart = el("span", "float-heart", glyphs[i % glyphs.length]);
      const size = 10 + Math.random() * 12;
      heart.style.left = (Math.random() * 96) + "%";
      heart.style.fontSize = size + "px";
      heart.style.animationDuration = (16 + Math.random() * 14) + "s";
      heart.style.animationDelay = (-Math.random() * 28) + "s";
      heart.style.setProperty("--o", (0.18 + Math.random() * 0.22).toFixed(2));
      heart.style.setProperty("--drift", (Math.random() * 60 - 30).toFixed(0) + "px");
      layer.appendChild(heart);
    }
  }

  /* ---------- Opening button ---------- */
  function setupOpening() {
    const btn = $("#open-universe");
    const target = $("#story");
    if (!btn || !target) return;
    btn.addEventListener("click", () => {
      document.body.classList.add("is-opened");
      target.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "start" });
      // Move keyboard focus along with the view, without jumping the scroll.
      target.focus({ preventScroll: true });
    });
  }

  /* ---------- Quote carousel ---------- */
  function setupCarousel() {
    const root = $(".carousel");
    if (!root) return;
    const slides = $$(".quote-slide", root);
    const dotsWrap = $(".carousel-dots", root);
    const pauseBtn = $(".carousel-pause", root);
    const viewport = $(".carousel-viewport", root);
    let current = 0;
    let timer = null;
    let userPaused = false;
    const INTERVAL = 7000;

    const dots = slides.map((_, i) => {
      const dot = el("button", "carousel-dot");
      dot.type = "button";
      dot.setAttribute("aria-label", "Show quote " + (i + 1));
      dot.addEventListener("click", () => { show(i); restart(); });
      dotsWrap.appendChild(dot);
      return dot;
    });

    function show(index) {
      current = (index + slides.length) % slides.length;
      slides.forEach((s, i) => {
        const active = i === current;
        s.classList.toggle("is-active", active);
        s.setAttribute("aria-hidden", active ? "false" : "true");
      });
      dots.forEach((d, i) => d.setAttribute("aria-current", i === current ? "true" : "false"));
    }

    function stop() { clearInterval(timer); timer = null; }
    function start() {
      if (reducedMotion() || userPaused || timer) return;
      timer = setInterval(() => show(current + 1), INTERVAL);
    }
    function restart() { stop(); start(); }

    $$(".carousel-btn", root).forEach((btn) => {
      btn.addEventListener("click", () => { show(current + Number(btn.dataset.dir)); restart(); });
    });

    root.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { show(current + 1); restart(); }
      if (e.key === "ArrowLeft") { show(current - 1); restart(); }
    });

    // Swipe on touchscreens
    let touchX = null;
    viewport.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
    viewport.addEventListener("touchend", (e) => {
      if (touchX === null) return;
      const dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 40) { show(current + (dx < 0 ? 1 : -1)); restart(); }
      touchX = null;
    }, { passive: true });

    // Pause while she reads (hover / focus), and give an explicit pause button.
    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);
    root.addEventListener("focusin", stop);
    root.addEventListener("focusout", (e) => { if (!root.contains(e.relatedTarget)) start(); });

    if (!reducedMotion()) {
      pauseBtn.hidden = false;
      pauseBtn.addEventListener("click", () => {
        userPaused = !userPaused;
        pauseBtn.setAttribute("aria-pressed", String(userPaused));
        pauseBtn.textContent = userPaused ? "Play" : "Pause";
        if (userPaused) stop();
      });
      // Auto-rotating content shouldn't be announced on every change.
      viewport.setAttribute("aria-live", "off");
    }

    show(0);
    start();
  }

  /* ---------- Final surprise ---------- */
  function setupFinale() {
    const btn = $("#final-surprise");
    const secret = $("#secret-message");
    const burst = $(".heart-burst");
    if (!btn || !secret) return;

    btn.addEventListener("click", () => {
      const opening = secret.hidden;
      secret.hidden = !opening;
      btn.setAttribute("aria-expanded", String(opening));
      if (!opening) return;

      secret.setAttribute("tabindex", "-1");
      secret.focus({ preventScroll: true });
      secret.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "center" });

      if (reducedMotion() || !burst) return;
      burst.textContent = "";
      for (let i = 0; i < 14; i++) {
        const h = el("span", "burst-heart", i % 3 === 0 ? "♡" : "♥");
        h.style.left = (10 + Math.random() * 80) + "%";
        h.style.fontSize = (12 + Math.random() * 16) + "px";
        h.style.animationDelay = (Math.random() * 0.9) + "s";
        h.style.setProperty("--dx", (Math.random() * 120 - 60).toFixed(0) + "px");
        h.style.setProperty("--rot", (Math.random() * 40 - 20).toFixed(0) + "deg");
        burst.appendChild(h);
      }
      setTimeout(() => { burst.textContent = ""; }, 4500);
    });
  }

  /* ---------- Optional music ---------- */
  function setupMusic() {
    const btn = $(".music-toggle");
    const src = clean(CONFIG.music && CONFIG.music.src);
    if (!btn || !src) return;

    const audio = new Audio();
    audio.loop = true;
    audio.preload = "metadata";
    audio.volume = Math.min(Math.max(Number(CONFIG.music.volume) || 0.5, 0), 1);

    const label = $(".music-label", btn);
    const setState = (playing) => {
      btn.setAttribute("aria-pressed", String(playing));
      label.textContent = playing ? "Pause music" : "Play our song";
    };

    // Only reveal the button if the file actually exists and can be played.
    audio.addEventListener("loadedmetadata", () => { btn.hidden = false; }, { once: true });
    audio.addEventListener("error", () => { btn.hidden = true; });
    audio.addEventListener("pause", () => setState(false));
    audio.addEventListener("play", () => setState(true));
    audio.src = src;

    btn.addEventListener("click", () => {
      if (audio.paused) {
        const p = audio.play();
        if (p && typeof p.catch === "function") p.catch(() => setState(false));
      } else {
        audio.pause();
      }
    });
  }

  /* ---------- Start ---------- */
  function init() {
    fillFields();
    setupBirthday();
    setupSpecialDay();
    setupOpening();
    setupCarousel();
    setupFinale();
    setupMusic();
    setupHearts();

    // Build photo frames first so they can join the reveal animation.
    setupGallery();
    setupFirstPhoto();
    setupReveal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
