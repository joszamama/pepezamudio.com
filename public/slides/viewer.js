/* Self-hosted deck viewer — shared runtime.
   Drives decks exported from Claude Slides and assembled by
   scripts/build-slide-decks.mjs: fixed-canvas scaling, step-through builds,
   keyboard / touch / click navigation, deep links, and polyfills for the
   <x-icon> and <x-connector> custom elements. No external dependencies. */
(function () {
  'use strict';

  /* ----------------------------------------------------------------- *
   * x-icon  — inline line icons, inheriting `color` via currentColor
   * ----------------------------------------------------------------- */
  var ICONS = {
    Search:      '<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
    Link:        '<path d="M9 17H7A5 5 0 0 1 7 7h2"/><path d="M15 7h2a5 5 0 0 1 0 10h-2"/><line x1="8" y1="12" x2="16" y2="12"/>',
    Chart:       '<line x1="4" y1="20" x2="20" y2="20"/><line x1="7" y1="20" x2="7" y2="13"/><line x1="12.5" y1="20" x2="12.5" y2="7"/><line x1="18" y1="20" x2="18" y2="10"/>',
    CheckCircle: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
    Lightning:   '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="currentColor" stroke="none"/>',
    Book:        '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    Chat:        '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    Code:        '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>'
  };
  if ('customElements' in window && !customElements.get('x-icon')) {
    customElements.define('x-icon', class extends HTMLElement {
      connectedCallback() {
        if (this.dataset.rbReady) return;
        this.dataset.rbReady = '1';
        var body = ICONS[this.getAttribute('name')] || '';
        this.innerHTML =
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
          'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + body + '</svg>';
      }
    });
  }

  /* ----------------------------------------------------------------- *
   * x-connector — a straight line between two slide-space points,
   * with an optional arrow head.  Colour / thickness come from the
   * element's inline `color` / `border-width`.
   * ----------------------------------------------------------------- */
  function styleProp(el, prop, fallback) {
    var m = (el.getAttribute('style') || '').match(new RegExp(prop + '\\s*:\\s*([^;]+)'));
    return m ? m[1].trim() : fallback;
  }
  if ('customElements' in window && !customElements.get('x-connector')) {
    customElements.define('x-connector', class extends HTMLElement {
      connectedCallback() {
        if (this.dataset.rbReady) return;
        this.dataset.rbReady = '1';
        var x1 = +this.getAttribute('x1'), y1 = +this.getAttribute('y1');
        var x2 = +this.getAttribute('x2'), y2 = +this.getAttribute('y2');
        var color = styleProp(this, 'color', '#2b2b2b');
        var w = parseFloat(styleProp(this, 'border-width', '4')) || 4;
        var head = this.getAttribute('head') !== 'none';
        var svg = '<svg width="1920" height="1080" viewBox="0 0 1920 1080" ' +
          'style="position:absolute;left:0;top:0;width:1920px;height:1080px;overflow:visible;pointer-events:none" aria-hidden="true">' +
          '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 +
          '" stroke="' + color + '" stroke-width="' + w + '" stroke-linecap="round"/>';
        if (head) {
          var a = Math.atan2(y2 - y1, x2 - x1);
          var L = 7 + w * 2.1, W = 5 + w * 1.4;
          var bx = x2 - L * Math.cos(a), by = y2 - L * Math.sin(a);
          var nx = Math.sin(a), ny = -Math.cos(a);
          var p1x = bx + nx * W, p1y = by + ny * W;
          var p2x = bx - nx * W, p2y = by - ny * W;
          svg += '<path d="M' + x2 + ' ' + y2 + ' L' + p1x.toFixed(1) + ' ' + p1y.toFixed(1) +
            ' L' + p2x.toFixed(1) + ' ' + p2y.toFixed(1) + ' Z" fill="' + color + '"/>';
        }
        svg += '</svg>';
        this.innerHTML = svg;
      }
    });
  }

  /* ----------------------------------------------------------------- *
   * Deck engine
   * ----------------------------------------------------------------- */
  function init() {
    var deck = document.getElementById('deck');
    if (!deck) return;
    var slides = Array.prototype.slice.call(deck.querySelectorAll('.rb-slide'));
    if (!slides.length) return;

    var current = 0, step = 0, steps = [];
    var total = slides.length;
    var barEl = document.getElementById('rb-bar');
    var curEl = document.getElementById('rb-cur');
    var totEl = document.getElementById('rb-total');
    if (totEl) totEl.textContent = String(total);

    function fit() {
      var s = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
      deck.style.transform = 'scale(' + s + ')';
    }

    function fragEls(slide) { return slide.querySelectorAll('[data-fragment-index]'); }
    function outEls(slide) { return slide.querySelectorAll('[data-rbout]'); }

    function computeSteps(slide) {
      var set = {};
      fragEls(slide).forEach(function (e) { set[+e.getAttribute('data-fragment-index')] = 1; });
      outEls(slide).forEach(function (e) { set[+e.getAttribute('data-rbout-index')] = 1; });
      return Object.keys(set).map(Number).filter(function (n) { return n > 0; })
        .sort(function (a, b) { return a - b; });
    }

    function applyStep(slide, shownCount) {
      var shownMax = shownCount > 0 ? steps[shownCount - 1] : 0;
      fragEls(slide).forEach(function (e) {
        var idx = +e.getAttribute('data-fragment-index');
        var vis = idx <= shownMax;
        e.classList.toggle('visible', vis);
        e.classList.toggle('current-fragment', vis && idx === shownMax);
      });
      outEls(slide).forEach(function (e) {
        e.classList.toggle('rb-gone', shownMax >= +e.getAttribute('data-rbout-index'));
      });
    }

    function updateChrome() {
      if (curEl) curEl.textContent = String(current + 1);
      if (barEl) barEl.style.width = (total > 1 ? (current / (total - 1)) * 100 : 100) + '%';
    }

    function show(i, dir) {
      slides[current].classList.remove('rb-active');
      current = Math.max(0, Math.min(total - 1, i));
      var slide = slides[current];
      slide.classList.add('rb-active');
      steps = computeSteps(slide);
      step = dir < 0 ? steps.length : 0;
      applyStep(slide, step);
      updateChrome();
      try { history.replaceState(null, '', '#' + (current + 1)); } catch (e) {}
    }

    function go(dir) {
      if (dir > 0) {
        if (step < steps.length) { step++; applyStep(slides[current], step); }
        else if (current < total - 1) { show(current + 1, 1); }
      } else {
        if (step > 0) { step--; applyStep(slides[current], step); }
        else if (current > 0) { show(current - 1, -1); }
      }
    }

    /* navigation wiring */
    window.addEventListener('resize', fit);
    document.addEventListener('keydown', function (e) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      switch (e.key) {
        case 'ArrowRight': case 'ArrowDown': case 'PageDown': case ' ': case 'Spacebar':
          e.preventDefault(); go(1); break;
        case 'ArrowLeft': case 'ArrowUp': case 'PageUp':
          e.preventDefault(); go(-1); break;
        case 'Home': e.preventDefault(); show(0, 1); break;
        case 'End': e.preventDefault(); show(total - 1, 1); break;
        case 'f': case 'F': toggleFull(); break;
      }
    });

    var prev = document.querySelector('.rb-prev');
    var next = document.querySelector('.rb-next');
    var full = document.querySelector('.rb-full');
    if (prev) prev.addEventListener('click', function () { go(-1); });
    if (next) next.addEventListener('click', function () { go(1); });
    if (full) full.addEventListener('click', toggleFull);

    function toggleFull() {
      try {
        if (!document.fullscreenElement) (document.documentElement.requestFullscreen || function () {}).call(document.documentElement);
        else document.exitFullscreen();
      } catch (e) {}
    }

    /* click to advance (ignore links, buttons, iframes) */
    deck.addEventListener('click', function (e) {
      if (e.target.closest('a, button, iframe, .rb-ui')) return;
      go(1);
    });

    /* touch swipe */
    var tx = 0, ty = 0;
    deck.addEventListener('touchstart', function (e) {
      tx = e.changedTouches[0].clientX; ty = e.changedTouches[0].clientY;
    }, { passive: true });
    deck.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
    }, { passive: true });

    /* deep link: #<n> selects a slide */
    var startHash = parseInt((location.hash || '').replace('#', ''), 10);
    var start = (startHash >= 1 && startHash <= total) ? startHash - 1 : 0;

    window.addEventListener('hashchange', function () {
      var n = parseInt((location.hash || '').replace('#', ''), 10);
      if (n >= 1 && n <= total && n - 1 !== current) show(n - 1, n - 1 > current ? 1 : -1);
    });

    fit();
    show(start, 1);

    /* fade the hint out */
    var hint = document.querySelector('.rb-hint');
    if (hint) setTimeout(function () { hint.style.opacity = '0'; }, 3200);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
