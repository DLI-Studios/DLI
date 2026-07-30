/* =========================================================
   DLI — main.js  (vanilla JS, no dependencies)
   ========================================================= */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Loader ---------- */
  window.addEventListener("load", function () {
    var loader = document.getElementById("loader");
    if (loader) {
      setTimeout(function () { loader.classList.add("hidden"); }, 250);
    }
  });

  /* ---------- Nav scroll state ---------- */
  var nav = document.querySelector(".nav");
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 24) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  }
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav toggle ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
      var expanded = links.classList.contains("open");
      toggle.setAttribute("aria-expanded", String(expanded));
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { links.classList.remove("open"); });
    });
  }

  /* ---------- Cursor glow ---------- */
  if (!reduceMotion && matchMedia("(hover:hover)").matches) {
    var glow = document.querySelector(".cursor-glow");
    if (glow) {
      var gx = 0, gy = 0, cx = 0, cy = 0;
      window.addEventListener("mousemove", function (e) { gx = e.clientX; gy = e.clientY; });
      (function animateGlow() {
        cx += (gx - cx) * 0.12;
        cy += (gy - cy) * 0.12;
        glow.style.transform = "translate(" + cx + "px," + cy + "px) translate(-50%,-50%)";
        requestAnimationFrame(animateGlow);
      })();
    }
  }

  /* ---------- Card hover glow (mouse-relative) ---------- */
  document.querySelectorAll(".card").forEach(function (card) {
    card.addEventListener("mousemove", function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty("--mx", (e.clientX - r.left) + "px");
      card.style.setProperty("--my", (e.clientY - r.top) + "px");
    });
  });

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el, i) {
      el.style.setProperty("--i", i % 6);
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Animated stat counters ---------- */
  var counters = document.querySelectorAll("[data-count]");
  if (counters.length && "IntersectionObserver" in window) {
    var cIo = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var target = parseFloat(el.getAttribute("data-count"));
          var suffix = el.getAttribute("data-suffix") || "";
          var decimals = el.getAttribute("data-decimals") ? parseInt(el.getAttribute("data-decimals"), 10) : 0;
          var duration = 1400;
          var start = null;
          function step(ts) {
            if (!start) start = ts;
            var progress = Math.min((ts - start) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            var val = target * eased;
            el.textContent = val.toFixed(decimals) + suffix;
            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = target.toFixed(decimals) + suffix;
          }
          requestAnimationFrame(step);
          cIo.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach(function (el) { cIo.observe(el); });
  }

  /* ---------- Accordion (FAQ) ---------- */
  document.querySelectorAll(".accordion-item").forEach(function (item) {
    var trigger = item.querySelector(".accordion-trigger");
    var panel = item.querySelector(".accordion-panel");
    if (!trigger || !panel) return;
    trigger.setAttribute("aria-expanded", "false");
    trigger.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");
      item.parentElement.querySelectorAll(".accordion-item.open").forEach(function (openItem) {
        if (openItem !== item) {
          openItem.classList.remove("open");
          openItem.querySelector(".accordion-panel").style.maxHeight = null;
          openItem.querySelector(".accordion-trigger").setAttribute("aria-expanded", "false");
        }
      });
      item.classList.toggle("open", !isOpen);
      trigger.setAttribute("aria-expanded", String(!isOpen));
      panel.style.maxHeight = !isOpen ? panel.scrollHeight + "px" : null;
    });
  });

  /* ---------- FAQ search + category filter ---------- */
  var faqSearch = document.getElementById("faq-search");
  var faqCats = document.querySelectorAll(".faq-cat");
  var faqItems = document.querySelectorAll("[data-faq-cat]");

  function filterFaq() {
    var query = faqSearch ? faqSearch.value.trim().toLowerCase() : "";
    var activeCat = document.querySelector(".faq-cat.active");
    var cat = activeCat ? activeCat.getAttribute("data-cat") : "all";
    faqItems.forEach(function (item) {
      var text = item.textContent.toLowerCase();
      var matchesCat = cat === "all" || item.getAttribute("data-faq-cat") === cat;
      var matchesQuery = query === "" || text.indexOf(query) !== -1;
      item.style.display = matchesCat && matchesQuery ? "" : "none";
    });
  }
  if (faqSearch) faqSearch.addEventListener("input", filterFaq);
  faqCats.forEach(function (btn) {
    btn.addEventListener("click", function () {
      faqCats.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      filterFaq();
    });
  });

  /* ---------- Particles (lightweight canvas field) ---------- */
  var canvas = document.getElementById("particles");
  if (canvas && !reduceMotion) {
    var ctx = canvas.getContext("2d");
    var particles = [];
    var count = window.innerWidth < 760 ? 26 : 55;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    function init() {
      particles = [];
      for (var i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.6 + 0.4,
          vy: Math.random() * 0.25 + 0.05,
          vx: (Math.random() - 0.5) * 0.15,
          o: Math.random() * 0.5 + 0.15
        });
      }
    }
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(function (p) {
        p.y -= p.vy;
        p.x += p.vx;
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(192,132,252," + p.o + ")";
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }
    resize();
    init();
    draw();
    window.addEventListener("resize", function () { resize(); init(); });
  }

  /* ---------- Current year in footer ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
