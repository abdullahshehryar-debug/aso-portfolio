/* v2 behaviours: photos, results wall, looping reviews, spotlight */
(function () {
  'use strict';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  var AV = window.AVATARS || {};
  var fmt = function (n) { return Number(n).toLocaleString('en-US'); };

  /* ---------- Owner photo ---------- */
  if (AV.me) {
    var bm = $('#brandMark'); if (bm) bm.innerHTML = '<img src="' + AV.me + '" alt="">';
    var hm = $('#heroMe'); if (hm) hm.src = AV.me;
    var ab = $('#aboutMe');
    if (ab) { ab.src = AV.me; ab.hidden = false; var mono = $('.portrait__mono'); if (mono) mono.style.display = 'none'; }
  } else {
    var hc = $('.float--me'); if (hc) hc.style.display = 'none';
  }

  /* ---------- Hero avatar stack ---------- */
  var stack = $('#avStack');
  if (stack) {
    var h0 = '';
    ['tavor', 'mashood', 'malaika', 'umar', 'drop'].forEach(function (k) { if (AV[k]) h0 += '<img class="av" src="' + AV[k] + '" alt="">'; });
    stack.innerHTML = h0 + '<span class="av">10</span>';
  }

  /* ---------- Results wall ---------- */
  var P = 'https://play-lh.googleusercontent.com/';
  var APPS = [
    { n: 'AI Essay Writer', s: 'AI · Education · 1 month · 100% organic', i: 'a4BTzaql_JwNzoNuzeQUEicZOaPULVqxRyqWz_1lVuu6qDpdCCGwWdCVOF1xk093UyiVBcikDieq4zNYVKmUY24', x: '7.5×', xl: 'Daily downloads', m: [['Daily downloads', 16, 120, '', ''], ['Monthly revenue', 5, 180, '$', '']] },
    { n: 'PDF to Word Converter', s: 'Utilities · 2 months · 100% organic', i: 'x1_PBEHUi5MxIyL3ibm6j5oklLQ57mrKsSCOifI-0aDHnjl8EW9E7aF-PVrH7QLiqD7Cd7qsiw1BNW3eVw2W7g', x: '10×', xl: 'Daily downloads', m: [['Daily downloads', 100, 1000, '', ''], ['Monthly revenue', 5, 100, '$', '']] },
    { n: 'Screen Mirroring App', s: 'Utilities · 4 months · 70% organic', i: 'kwLytJcDJ1GSt8uZcYa1eIQ4NDe2y--e_7v7QKd5XlasqOaLe0LvnX8-Z25gnY_fjOg6p6qAAwZMYoayTzDV', x: '750×', xl: 'Daily downloads', m: [['Daily downloads', 4, 3000, '', '+'], ['Monthly revenue', 0, 1000, '$', '']] },
    { n: 'Universal TV Remote', s: 'Utilities · 3 months · 100% organic', i: 'OX-P7GJCsDKhecH4Dc1MV89R4EnG41PAYVe5_iw7C8FNa4wsZuUj4ZIf8WCCLkHwLqVsZCCTBwjJLy_m_ReTUQ', x: '~100×', xl: 'Daily downloads', m: [['Daily downloads', 10, 1000, '', '+'], ['Daily store visitors', 70, 2100, '', '+']] }
  ];
  function metric(m) {
    var f = m[1], t = m[2], pct = Math.max(2, f / t * 100);
    return '<div class="wm"><p class="wm__l">' + m[0] + '</p><div class="wm__v"><s>' + m[3] + fmt(f) + '</s><i>→</i><b>' + m[3] + fmt(t) + m[4] + '</b></div><div class="wm__track"><i class="b1" data-w="100"></i><i class="b0" data-w="' + pct.toFixed(1) + '"></i></div></div>';
  }
  var wall = $('#wall');
  if (wall) {
    wall.innerHTML = APPS.map(function (a, idx) {
      return '<div class="wr" role="button" tabindex="0" data-i="' + idx + '" aria-label="Open the ' + a.n + ' case study">' +
        '<div class="wr__app"><img class="appicon" src="' + P + a.i + '=w128-h128-rw" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer"><div><b>' + a.n + '</b><span>' + a.s + '</span></div></div>' +
        metric(a.m[0]) + metric(a.m[1]) +
        '<div class="wr__x">' + a.x + '<small>' + a.xl + '</small><em>Open case study →</em></div></div>';
    }).join('');
    $$('img.appicon', wall).forEach(function (im) { im.addEventListener('error', function () { im.style.visibility = 'hidden'; }); });
    var openCase = function (row) {
      var i = +row.getAttribute('data-i');
      var b = $$('#caseList button')[i]; if (b) b.click();
      var el = $('.cases');
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: reduce ? 'auto' : 'smooth' });
    };
    $$('.wr', wall).forEach(function (r) {
      r.addEventListener('click', function () { openCase(r); });
      r.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openCase(r); } });
    });
    var wio = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        wio.unobserve(e.target);
        var r = e.target;
        setTimeout(function () {
          r.classList.add('in');
          $$('.wm__track i', r).forEach(function (b) { b.style.width = b.getAttribute('data-w') + '%'; });
        }, (+r.getAttribute('data-i')) * 130);
      });
    }, { threshold: 0.2 });
    $$('.wr', wall).forEach(function (r) { wio.observe(r); });
  }

  /* ---------- Cursor spotlight on cards ---------- */
  if (finePointer) {
    document.addEventListener('pointermove', function (e) {
      var t = e.target.closest ? e.target.closest('.svc,.wr') : null;
      if (!t) return;
      var r = t.getBoundingClientRect();
      t.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      t.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  }

  /* ---------- Process line ---------- */
  var st = $('.steps');
  if (st) {
    new IntersectionObserver(function (es, o) {
      es.forEach(function (e) { if (e.isIntersecting) { st.classList.add('in'); o.disconnect(); } });
    }, { threshold: 0.35 }).observe(st);
  }

  /* ---------- Reviews: looping carousel ---------- */
  var LI = [
    { src: 'li', av: 'tavor', n: 'Tavor Cohen', r: 'Senior Android Developer', d: 'May 2026', q: 'I highly recommend Abdullah ASO - App Store Optimization! They did an amazing job helping me optimize my app for the app store. I saw fantastic results thanks to their expertise in keywords and crafting a compelling app description. They also designed beautiful screenshots that really made my app stand out. Truly a pleasure to work with!' },
    { src: 'li', av: 'mashood', n: 'Mashood Shahid', r: 'Senior Game Developer', d: 'Sep 2025', q: 'Abdullah did ASO for my Spider-Man game and the results were amazing — the game started getting 1500–2000 daily visits and around 400 downloads with great reviews. Later, he also worked on my car game with equally good results. He is professional, skilled and knows how to boost apps on the Play Store. Highly recommended!' },
    { src: 'li', av: 'malaika', n: 'Dr. Malaika Sohail', r: 'CEO · Pak Special Persons Welfare Society', d: 'Aug 2024', q: 'I hired Abdullah for ASO services of my Bike Racing Game app of play store. He indeed did the wonderful job I must say!! My app is getting 6000+ installs per day and got 1.5M+ within a month. … I hired someone before that and he totally destroyed my app, but Abdullah helped a lot to revive my App thanks to his efforts!' },
    { src: 'li', av: 'drop', n: 'Drop And Park', r: 'Entrepreneur', d: 'Jul 2025', q: 'Working with Abdullah was an outstanding experience from start to finish. His expertise in Android App Store Optimization (ASO) & User Acquisitions are truly impressive. He quickly understood our goals, developed a clear and effective strategy, and executed it with precision and creativity. The results exceeded our expectations — better visibility, optimized user acquisition, and real growth for our app. Communication was smooth & he paid great attention to detail. We highly recommend him!' },
    { src: 'li', av: 'mirac', n: 'Mirac Mutlu Ispir', r: 'Co-Founder · Karma', d: 'Sep 2024', q: 'I’m working with Abdullah on one of our portfolio apps. He’s easy to communicate with and really knows his stuff. I’ll share an update once we’ve made more progress and the results are clearer. Keep up the great work, Abdullah!' },
    { src: 'li', av: 'umar', n: 'Muhammad Umar Farooq', r: 'Founder · Apps Aces', d: 'Dec 2025', q: 'Till now results are quite satisfied, Keywords are getting ranked, hope for the best results' }
  ];
  var UP = [
    { src: 'up', n: 'Upwork client', r: 'ABC Apps · Google Ads & Apple Search Ads campaign', d: 'Mar 2026', q: 'Abdullah did his best to help have more downloads.' },
    { src: 'up', n: 'Tony', r: 'Upwork client · ASO for Android + iOS', d: 'Jan 2026', q: 'He is a very good communicator and does his job professionally. I definitely recommend him.' },
    { src: 'up', n: 'Upwork client', r: 'ABC Apps · Apple Search Ads', d: 'Feb 2026', q: 'Good freelancer. Do lot of research. My download has increased organically.' },
    { src: 'up', n: 'Upwork client', r: 'ABC Apps · ASO for the English app', d: 'Feb 2026', q: 'Very good in ASO.clear communicator.i have hired him several times.' }
  ];
  var ALL = [LI[0], UP[0], LI[1], UP[1], LI[2], LI[3], UP[2], LI[4], UP[3], LI[5]];

  var track = $('#revTrack');
  if (track) {
    var dotsEl = $('#revDots');
    var rail = document.createElement('div');
    rail.className = 'rev-rail';
    track.appendChild(rail);
    var list = [], pos = 0, busy = false, timer = null, visible = false;

    var initials = function (n) { return n.replace(/[^A-Za-z ]/g, '').split(' ').filter(Boolean).slice(0, 2).map(function (w) { return w[0]; }).join('').toUpperCase(); };
    var card = function (r) {
      var up = r.src === 'up';
      var av = up ? '<div class="rev__av rev__av--up">Up</div>' : (AV[r.av] ? '<div class="rev__av"><img src="' + AV[r.av] + '" alt=""></div>' : '<div class="rev__av">' + initials(r.n) + '</div>');
      return '<figure class="rev"><div class="rev__top"><span class="rev__src' + (up ? ' rev__src--up' : '') + '">' + (up ? 'Upwork' : 'LinkedIn') + '</span><div class="stars">★★★★★</div><span class="mono dim">' + r.d + '</span></div><blockquote class="rev__q">“' + r.q + '”</blockquote><figcaption class="rev__who">' + av + '<div><b>' + r.n + '</b><span>' + r.r + '</span></div></figcaption></figure>';
    };
    var drawDots = function () {
      var h = '';
      for (var i = 0; i < list.length; i++) h += '<i' + (i === pos ? ' class="on"' : '') + '></i>';
      if (dotsEl) dotsEl.innerHTML = h;
    };
    var build = function (f) {
      list = ALL.filter(function (r) { return f === 'all' || r.src === f; });
      var items = list.slice();
      while (items.length < 8) items = items.concat(list);
      rail.classList.remove('anim');
      rail.style.transform = 'translateX(0)';
      rail.innerHTML = items.map(card).join('');
      pos = 0; busy = false;
      drawDots();
    };
    var stepW = function () { return rail.firstElementChild.getBoundingClientRect().width + 18; };
    var next = function () {
      if (busy) return;
      busy = true;
      var s = stepW();
      rail.classList.add('anim');
      rail.style.transform = 'translateX(' + (-s) + 'px)';
      pos = (pos + 1) % list.length; drawDots();
      setTimeout(function () {
        rail.classList.remove('anim');
        rail.appendChild(rail.firstElementChild);
        rail.style.transform = 'translateX(0)';
        busy = false;
      }, reduce ? 20 : 620);
    };
    var prev = function () {
      if (busy) return;
      busy = true;
      var s = stepW();
      rail.classList.remove('anim');
      rail.insertBefore(rail.lastElementChild, rail.firstElementChild);
      rail.style.transform = 'translateX(' + (-s) + 'px)';
      void rail.offsetWidth;
      rail.classList.add('anim');
      rail.style.transform = 'translateX(0)';
      pos = (pos - 1 + list.length) % list.length; drawDots();
      setTimeout(function () { busy = false; }, reduce ? 20 : 620);
    };
    var stop = function () { if (timer) { clearInterval(timer); timer = null; } };
    var play = function () { stop(); if (reduce || !visible) return; timer = setInterval(next, 5200); };

    build('all');
    var pv = $('#revPrev'), nx = $('#revNext');
    if (nx) nx.addEventListener('click', function () { next(); play(); });
    if (pv) pv.addEventListener('click', function () { prev(); play(); });
    $$('#revTabs button').forEach(function (b) {
      b.addEventListener('click', function () {
        $$('#revTabs button').forEach(function (x) { x.classList.toggle('on', x === b); });
        build(b.getAttribute('data-f'));
        play();
      });
    });
    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { next(); play(); }
      if (e.key === 'ArrowLeft') { prev(); play(); }
    });
    var sx = null;
    track.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      sx = e.clientX; track.classList.add('drag'); stop();
    });
    window.addEventListener('pointerup', function (e) {
      if (sx === null) return;
      var dx = e.clientX - sx; sx = null;
      track.classList.remove('drag');
      if (Math.abs(dx) > 50) { if (dx < 0) next(); else prev(); }
      play();
    });
    window.addEventListener('pointercancel', function () { sx = null; track.classList.remove('drag'); play(); });
    track.addEventListener('mouseenter', stop);
    track.addEventListener('mouseleave', play);
    track.addEventListener('focusin', stop);
    track.addEventListener('focusout', play);
    new IntersectionObserver(function (es) { visible = es[0].isIntersecting; if (visible) play(); else stop(); }, { threshold: 0.2 }).observe(track);
    document.addEventListener('visibilitychange', function () { if (document.hidden) stop(); else play(); });
  }
})();
