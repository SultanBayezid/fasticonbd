/* ============================================================
   FastIconBD — eCommerce HTML Template
   Main JavaScript (vanilla, no dependencies)
   Author: Sultan Bayezid (https://lastlineweb.com)
   License: MIT
   ============================================================ */
(function () {
  'use strict';

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* ---------------- sticky header ---------------- */
  var header = $('#header');
  function onScroll() {
    if (header) header.classList.toggle('is-stuck', window.scrollY > 8);
    if (topBtn) topBtn.classList.toggle('is-visible', window.scrollY > 480);
  }

  /* ---------------- mobile drawer nav ---------------- */
  var burger = $('.header__burger');
  function closeNav() {
    document.body.classList.remove('nav-open');
    if (burger) {
      burger.setAttribute('aria-expanded', 'false');
      burger.innerHTML = MENU_ICON;
    }
  }
  var MENU_ICON = burger ? burger.innerHTML : '';
  if (burger) {
    burger.addEventListener('click', function () {
      var open = document.body.classList.toggle('nav-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.innerHTML = open
        ? '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>'
        : MENU_ICON;
    });
  }
  $$('.nav__backdrop').forEach(function (b) { b.addEventListener('click', closeNav); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });
  /* mobile: tap a drop-down parent toggles its menu */
  $$('.nav__item.has-drop > a').forEach(function (a) {
    a.addEventListener('click', function (e) {
      if (window.matchMedia('(max-width: 992px)').matches) {
        var li = a.parentElement;
        if (!li.classList.contains('is-open')) {
          e.preventDefault();
          li.classList.add('is-open');
        }
      }
    });
  });

  /* ---------------- hero slider ---------------- */
  $$('.js-hero').forEach(function (slider) {
    var slides = $$('.hero__slide', slider);
    var dotsWrap = $('.js-hero-dots', slider);
    var current = 0;
    var timer = null;
    if (!slides.length) return;

    slides.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'hero__dot' + (i === 0 ? ' is-active' : '');
      dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      dot.addEventListener('click', function () { go(i); restart(); });
      if (dotsWrap) dotsWrap.appendChild(dot);
    });
    var dots = $$('.hero__dot', dotsWrap);

    function go(n) {
      slides[current].classList.remove('is-active');
      if (dots[current]) dots[current].classList.remove('is-active');
      current = (n + slides.length) % slides.length;
      slides[current].classList.add('is-active');
      if (dots[current]) dots[current].classList.add('is-active');
    }
    function restart() {
      if (timer) clearInterval(timer);
      timer = setInterval(function () { go(current + 1); }, 5500);
    }
    var prev = $('.js-hero-prev', slider);
    var next = $('.js-hero-next', slider);
    if (prev) prev.addEventListener('click', function () { go(current - 1); restart(); });
    if (next) next.addEventListener('click', function () { go(current + 1); restart(); });
    slider.addEventListener('mouseenter', function () { if (timer) clearInterval(timer); });
    slider.addEventListener('mouseleave', restart);
    restart();
  });

  /* ---------------- tabs ---------------- */
  $$('[data-tabs]').forEach(function (wrap) {
    var btns = $$('.tab-btn', wrap);
    var panels = $$('.tab-panel', wrap);
    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        btns.forEach(function (b) {
          b.classList.remove('is-active');
          b.setAttribute('aria-selected', 'false');
        });
        panels.forEach(function (p) { p.classList.remove('is-active'); });
        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');
        var panel = document.getElementById(btn.getAttribute('data-tab'));
        if (panel) panel.classList.add('is-active');
      });
    });
  });

  /* ---------------- countdown (deal of the day) ---------------- */
  $$('.js-countdown').forEach(function (el) {
    /* demo target: 2 days 14 hours from first visit, persisted in localStorage */
    var KEY = 'fib-deal-end';
    var end = parseInt(localStorage.getItem(KEY) || '0', 10);
    if (!end || end < Date.now()) {
      end = Date.now() + ((2 * 24 + 14) * 3600 * 1000);
      try { localStorage.setItem(KEY, String(end)); } catch (err) { /* private mode */ }
    }
    function pad(n) { return n < 10 ? '0' + n : String(n); }
    function tick() {
      var left = Math.max(0, end - Date.now());
      var d = Math.floor(left / 86400000);
      var h = Math.floor(left % 86400000 / 3600000);
      var m = Math.floor(left % 3600000 / 60000);
      var s = Math.floor(left % 60000 / 1000);
      var set = function (cls, v) {
        var node = el.querySelector(cls);
        if (node) node.textContent = pad(v);
      };
      set('.js-cd-days', d); set('.js-cd-hours', h);
      set('.js-cd-mins', m); set('.js-cd-secs', s);
    }
    tick();
    setInterval(tick, 1000);
  });

  /* ---------------- quantity steppers ---------------- */
  $$('.qty[data-qty]').forEach(function (qty) {
    var input = $('input', qty);
    var minus = $('.js-qty-minus', qty);
    var plus = $('.js-qty-plus', qty);
    function clamp() {
      var v = parseInt(input.value || '1', 10);
      if (isNaN(v) || v < 1) v = 1;
      if (v > 99) v = 99;
      input.value = v;
    }
    if (minus) minus.addEventListener('click', function () { input.value = Math.max(1, (parseInt(input.value, 10) || 1) - 1); });
    if (plus) plus.addEventListener('click', function () { input.value = Math.min(99, (parseInt(input.value, 10) || 1) + 1); });
    input.addEventListener('change', clamp);
  });

  /* ---------------- demo cart & wishlist state ---------------- */
  function store(key, fallback) {
    try {
      var v = parseInt(localStorage.getItem(key) || '', 10);
      return isNaN(v) ? fallback : v;
    } catch (err) { return fallback; }
  }
  function setCount(sel, n) {
    $$(sel).forEach(function (el) { el.textContent = String(n); });
  }
  function refreshBadges() {
    setCount('.js-cart-count', store('fib-cart', 0));
    setCount('.js-wish-count', store('fib-wish', 0));
  }
  refreshBadges();

  /* ---------------- toasts ---------------- */
  function toast(msg) {
    var region = $('.toast-region');
    if (!region) return;
    var el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg><span></span>';
    el.querySelector('span').textContent = msg;
    region.appendChild(el);
    setTimeout(function () {
      el.classList.add('is-hiding');
      setTimeout(function () { el.remove(); }, 350);
    }, 2600);
  }

  document.addEventListener('click', function (e) {
    /* add to cart */
    var addBtn = e.target.closest('.js-add-cart');
    if (addBtn) {
      var n = store('fib-cart', 0) + 1;
      try { localStorage.setItem('fib-cart', String(n)); } catch (err) { /* noop */ }
      setCount('.js-cart-count', n);
      toast('Added to cart');
      return;
    }
    /* wishlist toggle */
    var wishBtn = e.target.closest('.js-wishlist');
    if (wishBtn) {
      wishBtn.classList.toggle('is-active');
      var active = wishBtn.classList.contains('is-active');
      var w = Math.max(0, store('fib-wish', 0) + (active ? 1 : -1));
      try { localStorage.setItem('fib-wish', String(w)); } catch (err) { /* noop */ }
      setCount('.js-wish-count', w);
      toast(active ? 'Saved to wishlist' : 'Removed from wishlist');
      return;
    }
    /* quick view (demo) */
    if (e.target.closest('.js-quickview')) {
      toast('Quick view is a demo action in this template');
      return;
    }
    /* remove cart row */
    var rm = e.target.closest('.js-remove-row');
    if (rm) {
      var row = rm.closest('tr');
      if (row) row.remove();
      toast('Item removed from cart');
      return;
    }
    /* update cart (demo) */
    if (e.target.closest('.js-update-cart')) {
      toast('Cart updated');
    }
  });

  /* all demo forms: friendly toast instead of navigation */
  $$('form[onsubmit]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      toast('This is a demo form — connect your own backend');
    });
  });

  /* ---------------- product gallery ---------------- */
  $$('.pdp__thumb').forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      var main = $('.js-pdp-main');
      $$('.pdp__thumb').forEach(function (t) { t.classList.remove('is-active'); });
      thumb.classList.add('is-active');
      if (main && thumb.getAttribute('data-src')) main.src = thumb.getAttribute('data-src');
    });
  });

  /* ---------------- accordion (FAQ) ---------------- */
  $$('.acc__head').forEach(function (head) {
    head.addEventListener('click', function () {
      var item = head.closest('.acc__item');
      var open = item.classList.toggle('is-open');
      head.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  /* ---------------- shop: filters + view toggle ---------------- */
  var filterToggle = $('.js-filter-toggle');
  if (filterToggle) {
    filterToggle.addEventListener('click', function () {
      var side = filterToggle.closest('.shop-sidebar');
      if (side) side.classList.toggle('is-open');
    });
  }
  var grid = $('.js-products');
  $$('.js-view-grid').forEach(function (b) {
    b.addEventListener('click', function () {
      if (grid) grid.classList.remove('is-list');
      toggleActive(b);
    });
  });
  $$('.js-view-list').forEach(function (b) {
    b.addEventListener('click', function () {
      if (grid) grid.classList.add('is-list');
      toggleActive(b);
    });
  });
  function toggleActive(btn) {
    $$('.view-toggle__btn').forEach(function (b) { b.classList.remove('is-active'); });
    btn.classList.add('is-active');
  }

  var price = $('#price-range');
  var priceOut = $('#price-out');
  if (price && priceOut) {
    var fmt = function (n) { return '৳' + Number(n).toLocaleString('en-US'); };
    price.addEventListener('input', function () { priceOut.textContent = fmt(price.value); });
  }

  /* ---------------- reveal on scroll ---------------- */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('is-in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    $$('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    $$('.reveal').forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------------- back to top ---------------- */
  var topBtn = $('.back-to-top');
  if (topBtn) {
    topBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
