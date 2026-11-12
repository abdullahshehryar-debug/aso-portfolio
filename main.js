(() => {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const ease = t => 1 - Math.pow(1 - t, 3);
  const fmt = n => Number(n).toLocaleString('en-US');

  /* ---------- Data ---------- */
  const CASES = [
    {
      n: '01', name: 'AI Essay Writer', niche: 'AI · Education', store: 'Google Play', time: '1 month', mode: '100% organic',
      summary: 'A single focused month of keyword research, country-level localization and an onboarding review flow took a near-invisible app to ~120 daily downloads, with no paid ads at all.',
      big: [['7.5×', 'Daily downloads'], ['36×', 'Monthly revenue']],
      metrics: [
        { l: 'Daily downloads', from: 16, to: 120 },
        { l: 'Monthly revenue', from: 5, to: 180, pre: '$' },
        { l: 'Store rating', from: 2.8, to: 4.4, suf: '★', max: 5, dec: 1 },
        { l: 'Rank · “ai essay writer” (US)', rank: [78, 2] }
      ],
      steps: ['Keyword & metadata research', 'Country-level localization', 'Screenshot & description testing', 'In-flow review prompt'],
      insight: 'Revenue grew ~36× while downloads grew ~7.5×, because ASO brought higher-intent, paying users, not just raw installs.',
      quote: null
    },
    {
      n: '02', name: 'PDF to Word Converter', niche: 'Utilities · Productivity', store: 'Google Play', time: '2 months', mode: '100% organic',
      summary: 'In a niche where almost every app leans on ad revenue, a two-month ASO-only engagement grew daily downloads 10× and proved paying-user revenue was possible without a single dollar of paid spend.',
      big: [['10×', 'Daily downloads'], ['20×', 'Monthly revenue']],
      metrics: [
        { l: 'Daily downloads', from: 100, to: 1000 },
        { l: 'Monthly revenue', from: 5, to: 100, pre: '$' },
        { l: 'Rank · “pdf to word converter” (US)', rank: [59, 9] },
        { l: 'Rank · “docx to pdf converter” (US)', rank: [31, 1] }
      ],
      steps: ['Metadata & keyword targeting', 'Country-level ASO & custom listings', 'Converter tools & onboarding', 'In-flow review prompt'],
      insight: 'A single review prompt lifted 5★ reviews from one every 3–4 days to 20–25 a day.',
      quote: ['I honestly thought our PDF to Word app would mostly depend on ads because there are so many free online converters. Abdullah proved me wrong with a solid ASO strategy — in just 2 months, he increased our organic downloads by 10x and grew monthly revenue from around $5 to $100. Really happy with the results.', 'Client · PDF to Word Converter App']
    },
    {
      n: '03', name: 'Screen Mirroring App', niche: 'Utilities · Casting', store: 'Google Play', time: '4 months', mode: '70% organic · 30% paid',
      summary: 'A struggling app in one of the most saturated Play Store categories. ASO came first, Google Ads layered on top only after the listing was converting, which kept most installs organic.',
      big: [['3,000+', 'Daily downloads'], ['$1K', 'Monthly revenue']],
      metrics: [
        { l: 'Daily downloads', from: 4, to: 3000, suf: '+' },
        { l: 'Monthly revenue', from: 0, to: 1000, pre: '$' },
        { l: 'Store ratings (count)', from: 101, to: 8990 },
        { l: 'Rank · “screen mirroring” (US)', rank: [239, 9] },
        { l: 'Rank · “miracast” (US)', rank: [93, 3] }
      ],
      steps: ['Months 1–2: ASO foundation', 'Month 3: Google Ads on a proven listing', 'A/B tested IAP & onboarding', 'Review prompt: 150+ reviews/day'],
      insight: 'Sequencing mattered: because ASO came first, ~70% of installs stayed organic even after ads launched. Paid amplified a working listing instead of masking a broken one.',
      quote: ['Really happy with Abdullah’s work on our screen mirroring app. It’s a very competitive niche, but his ASO and paid ads strategy helped us go from around 4 downloads a day to 3K+ and from $0 to about $1K/month in revenue. Great work overall.', 'Client · Screen Mirroring App']
    },
    {
      n: '04', name: 'Universal TV Remote', niche: 'Utilities · Smart TV', store: 'Google Play', time: '3 months', mode: '100% organic',
      summary: 'A launch that sat at effectively zero downloads and zero revenue for three months. From July 20, country research and custom listings took it to ~1,000 downloads a day. The inflection is visible in every chart on the exact same date.',
      big: [['~100×', 'Daily downloads'], ['~25×', 'Store visitors']],
      metrics: [
        { l: 'Daily downloads', from: 10, to: 1000, suf: '+' },
        { l: 'Daily store visitors', from: 70, to: 2100, suf: '+' },
        { l: 'Rank · “universal tv remote” (US)', rank: [109, 27] },
        { l: 'Rank · “all smart tv remote” (US)', rank: [68, 8] }
      ],
      steps: ['Country-wise keyword research', 'Custom listings & screenshot tests', 'Keyword combinations for secondary markets'],
      insight: 'Country-level targeting, not just better metadata, unlocked the visibility. Research found real demand in markets like India, Iran, Venezuela and Egypt that the client didn’t know existed.',
      quote: ['Really impressed with the ASO results! Our app was ranking around #109 for “Universal TV Remote,” and after the optimization, it reached #27. I honestly thought ranking in this niche would be extremely difficult, so I wasn’t expecting such a big improvement. Great work and highly recommended!', 'Client · Universal TV Remote App']
    }
  ];


  const PL = 'https://play-lh.googleusercontent.com/';
  const MEDIA = {
    '01': { listing: 'AI Essay Writer', installs: '10K+', icon: 'a4BTzaql_JwNzoNuzeQUEicZOaPULVqxRyqWz_1lVuu6qDpdCCGwWdCVOF1xk093UyiVBcikDieq4zNYVKmUY24',
      shots: ['Ud7plxjx3rTbSnJUZkEV23tdikTt2m3wf5QO6G7hQNX-S45zDTUDsLLx0LI4ttxjtnh3L4prvDhO9GfutXM0Bg','nQtV7_wmzXTWm85EBHXRmICTDNn6ERrDtSLKTadsCn806swf_ZG__Be3W4hABT0Mj3K7IJLuWSagNRQREUmH','cGu1mvEzR7sDNx-LCBsWvfAMErWoS8SUjyzG7dC-YC6p9PUtFR4LYOTefwxumw4IJr41FxQ5hwtoabLVDpjnAg4','duy1bR17E754kUNPLKuh-LBYa9z53GZyX987xrYShBKIKd3TkxL9DytEkRQDDW8YdulFGsXftgkPIJGzaZnlszk'] },
    '02': { listing: 'PDF to Word Converter', installs: '100K+', icon: 'x1_PBEHUi5MxIyL3ibm6j5oklLQ57mrKsSCOifI-0aDHnjl8EW9E7aF-PVrH7QLiqD7Cd7qsiw1BNW3eVw2W7g',
      shots: ['B2bJ0hfABIOvwVpQOd6j1J8khgbvxZJ0jwUQI3UXBLfkTk99DuHhoS6gsVves7I-9nxIczckrwmPeWXsRZCodA','_EWCcVlrFY4vCYqUyvWeqfFlVgZye6Kn1wUFrFadfpThoU2x5MuHls3qztCDLK_48zz1K89Q3Q1xM9-zHLYyHHs','9u0NI2pXsve1wf0A1ivNoQAitBAKwzSLGyTCCDarZLLa9juOg3iJtd69xrwzgpFoyZbCH9RE77NvNLhzR5pZ7g','TX8Q4on1lD9XN7ajkXWlnh5tvHZ0Cp-im-843bCVfzD_pBRBigKj-UAQRG1Ttq9j9r0LL1JVzuhvkLD7JAfDbGA'] },
    '03': { listing: 'Miracast: Screen Mirroring', installs: '100K+', icon: 'kwLytJcDJ1GSt8uZcYa1eIQ4NDe2y--e_7v7QKd5XlasqOaLe0LvnX8-Z25gnY_fjOg6p6qAAwZMYoayTzDV',
      shots: ['nDztpMj_aa5cNw7ROF2bUCVtCrztvExK1Iqc7crrLOVEsXto4El-RZWGMve2DoHsUb56_Ae9Z4RcQAgoELLH','GErjaJ3KwMTWnIVp0TT_WuFQ-S4JQKTX9YwEdlfi2CABDBpOdt5kj92rez3C8oJdmzeCa1472kOyXsgs0bwh','kshGVrtWNL1hY0v3d7NZmvTMzTp0fifkabN86ehYfxLdLkCr5VCychlaSMJoiYllFY8DC9xAcSAeIhBoRhva','GN_nzLfVfzmrhMhqRsMUUfcyY55xFv_XJiExvwm7FqRLOZVS7kvjgVcZ84LdOZO-cnSQRsa_3iuvW3fNvxELkw'] },
    '04': { listing: 'Chromecast - Android TV Remote', installs: '10K+', icon: 'OX-P7GJCsDKhecH4Dc1MV89R4EnG41PAYVe5_iw7C8FNa4wsZuUj4ZIf8WCCLkHwLqVsZCCTBwjJLy_m_ReTUQ',
      shots: ['napUizKOBVa7XNItvcHuusZLLSKSrnAbG15NeYgUQRnJ17LwwRbr8cj_hUg9I28N4QF8Hh6EcymRFI6FfO4f','6GO5p_ia7dwTIwhs_SFMs1twZWapDLp8bCPL3pAu-ALp8lj0NziCN-9lHVWbFKQUEcEyMgpVEf_MbAEUyOpTCA','QmkwzobWOzdphYa20KfvjSo0skblzTYzRNx2VPvoVdad3ytel1s4UXJ7XkbFFw2W06eDc-Mp7zfxmV8RfkIgcg','r_dfbOSjvK4hVezxCZGtUTCx0-pm_48Rx0txX0G6A7GAHoNpWxdQOF75QV-_Vujmm7pd05ffKJEWeUZ9SJJDew'] }
  };
  const icon = (id, s = 128) => `<img class="appicon" src="${PL}${id}=w${s}-h${s}-rw" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="this.style.visibility='hidden'">`;
  const shot = id => `<img src="${PL}${id}=h640-rw" alt="App store screenshot" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="this.remove()">`;

  const REVIEWS = [
    { q: 'I highly recommend Abdullah ASO - App Store Optimization! They did an amazing job helping me optimize my app for the app store. I saw fantastic results thanks to their expertise in keywords and crafting a compelling app description. They also designed beautiful screenshots that really made my app stand out. Truly a pleasure to work with!', n: 'Tavor Cohen', r: 'Senior Android Developer', d: 'May 2026' },
    { q: 'Abdullah did ASO for my Spider-Man game and the results were amazing — the game started getting 1500–2000 daily visits and around 400 downloads with great reviews. Later, he also worked on my car game with equally good results. He is professional, skilled and knows how to boost apps on the Play Store. Highly recommended!', n: 'Mashood Shahid', r: 'Senior Game Developer', d: 'Sep 2025' },
    { q: 'I hired Abdullah for ASO services of my Bike Racing Game app of play store. He indeed did the wonderful job I must say!! My app is getting 6000+ installs per day and got 1.5M+ within a month. … I hired someone before that and he totally destroyed my app, but Abdullah helped a lot to revive my App thanks to his efforts!', n: 'Dr. Malaika Sohail', r: 'CEO · Pak Special Persons Welfare Society', d: 'Aug 2024' },
    { q: 'Working with Abdullah was an outstanding experience from start to finish. His expertise in Android App Store Optimization (ASO) & User Acquisitions are truly impressive. He quickly understood our goals, developed a clear and effective strategy, and executed it with precision and creativity. The results exceeded our expectations — better visibility, optimized user acquisition, and real growth for our app. Communication was smooth & he paid great attention to detail. We highly recommend him!', n: 'Drop And Park', r: 'Entrepreneur', d: 'Jul 2025' },
    { q: 'I’m working with Abdullah on one of our portfolio apps. He’s easy to communicate with and really knows his stuff. I’ll share an update once we’ve made more progress and the results are clearer. Keep up the great work, Abdullah!', n: 'Mirac Mutlu Ispir', r: 'Co-Founder · Karma', d: 'Sep 2024' },
    { q: 'Till now results are quite satisfied, Keywords are getting ranked, hope for the best results', n: 'Muhammad Umar Farooq', r: 'Founder · Apps Aces', d: 'Dec 2025' }
  ];

  /* ---------- Loader ---------- */
  const loader = $('#loader');
  let loaderDone = false;
  const finishLoader = () => {
    if (loaderDone) return;
    loaderDone = true;
    loader.classList.add('done');
    document.body.classList.remove('is-loading');
    document.documentElement.classList.add('ready');
    document.body.classList.add('ready');
    setTimeout(() => { loader.style.display = 'none'; }, 1500);
    startHero();
  };
  document.body.classList.add('is-loading');
  (() => {
    const num = $('#loaderNum'), bar = $('#loaderBar');
    const dur = reduce ? 100 : 4200, t0 = performance.now();
    const tick = now => {
      if (loaderDone) return;
      const p = Math.min((now - t0) / dur, 1), e = ease(p);
      num.textContent = Math.max(2, Math.round(78 - 76 * e));
      bar.style.width = (e * 100) + '%';
      p < 1 ? requestAnimationFrame(tick) : setTimeout(finishLoader, 250);
    };
    requestAnimationFrame(tick);
    $('#loaderSkip').addEventListener('click', finishLoader);
    setTimeout(finishLoader, 6000);
  })();

  /* ---------- Header / progress / menu ---------- */
  const header = $('#header'), progress = $('#progress'), menu = $('#menu'), menuBtn = $('#menuBtn');
  let lastY = 0;
  const onScroll = () => {
    const y = scrollY, h = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    header.classList.toggle('scrolled', y > 30);
    header.classList.toggle('hide', y > lastY && y > 500 && !menu.classList.contains('open'));
    lastY = y;
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const setMenu = open => {
    menu.classList.toggle('open', open);
    menu.setAttribute('aria-hidden', String(!open));
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.style.overflow = open ? 'hidden' : '';
  };
  menuBtn.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  $$('a', menu).forEach(a => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  /* active nav */
  const navLinks = $$('[data-nav]');
  const secObs = new IntersectionObserver(es => {
    es.forEach(e => {
      if (e.isIntersecting) navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  ['work', 'services', 'reviews', 'about'].forEach(id => { const el = document.getElementById(id); el && secObs.observe(el); });

  /* ---------- Cursor glow ---------- */
  if (finePointer && !reduce) {
    const c = $('#cursor'); let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y;
    addEventListener('pointermove', e => { x = e.clientX; y = e.clientY; c.classList.add('on'); });
    const loop = () => { cx += (x - cx) * .12; cy += (y - cy) * .12; c.style.transform = `translate(${cx}px,${cy}px)`; requestAnimationFrame(loop); };
    loop();
  }

  /* ---------- Reveal ---------- */
  $$('[data-reveal]').forEach(el => {
    const sibs = $$('[data-reveal]', el.parentElement).filter(s => s.parentElement === el.parentElement);
    if (sibs.length > 1) el.style.setProperty('--d', (sibs.indexOf(el) * 0.09) + 's');
  });
  const revObs = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); revObs.unobserve(e.target); }
  }), { threshold: .12, rootMargin: '0px 0px -6% 0px' });
  $$('[data-reveal]').forEach(el => revObs.observe(el));

  /* ---------- Counters ---------- */
  const countObs = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    countObs.unobserve(e.target);
    const el = e.target, to = +el.dataset.count, suf = el.dataset.suffix || '', comma = el.dataset.comma;
    const dur = 1600, t0 = performance.now();
    const step = now => {
      const p = Math.min((now - t0) / dur, 1), v = Math.round(to * ease(p));
      el.textContent = (comma ? fmt(v) : v) + suf;
      if (p < 1) requestAnimationFrame(step);
    };
    reduce ? (el.textContent = (comma ? fmt(to) : to) + suf) : requestAnimationFrame(step);
  }), { threshold: .6 });
  $$('[data-count]').forEach(el => countObs.observe(el));

  /* ---------- Hero console ---------- */
  const bars = $('#bars');
  const BARS = 26;
  for (let i = 0; i < BARS; i++) bars.appendChild(document.createElement('i'));
  const barEls = $$('i', bars);
  const heights = barEls.map((_, i) => {
    const p = i / (BARS - 1);
    return 4 + Math.pow(p, 3.2) * 96 + (i % 3) * 1.5;
  });
  const dl = $('#dlNum');
  const rankEls = $$('#rankList b');
  let heroTimer = null;
  function runHero() {
    const t0 = performance.now(), dur = 2600;
    barEls.forEach((b, i) => setTimeout(() => { b.style.height = heights[i] + '%'; }, reduce ? 0 : i * 45));
    const step = now => {
      const p = Math.min((now - t0) / dur, 1), e = ease(p);
      dl.textContent = fmt(Math.round(4 + (3000 - 4) * e));
      rankEls.forEach(b => {
        const f = +b.dataset.from, t = +b.dataset.to;
        b.textContent = '#' + Math.max(t, Math.round(f - (f - t) * e));
      });
      if (p < 1) requestAnimationFrame(step); else dl.textContent = '3,000+';
    };
    reduce ? (dl.textContent = '3,000+', rankEls.forEach(b => b.textContent = '#' + b.dataset.to)) : requestAnimationFrame(step);
  }
  function resetHero() {
    barEls.forEach(b => { b.style.height = '3%'; });
    dl.textContent = '4';
    rankEls.forEach(b => b.textContent = '#' + b.dataset.from);
  }
  function startHero() {
    setTimeout(runHero, 700);
    if (!reduce) heroTimer = setInterval(() => { resetHero(); setTimeout(runHero, 500); }, 11000);
  }

  /* ---------- Marquee ---------- */
  const mq = $('#marquee');
  mq.innerHTML += mq.innerHTML;

  /* ---------- Tilt + magnetic ---------- */
  if (finePointer && !reduce) {
    $$('.tilt').forEach(el => {
      const max = el.classList.contains('console') ? 6 : 4;
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        el.style.transform = `perspective(900px) rotateY(${x * max}deg) rotateX(${-y * max}deg)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
    $$('.magnetic').forEach(el => {
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .18}px,${(e.clientY - r.top - r.height / 2) * .28}px)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
  }

  /* ---------- Case studies ---------- */
  const list = $('#caseList'), panel = $('#casePanel');
  CASES.forEach((c, i) => {
    const li = document.createElement('li');
    li.innerHTML = `<button role="tab" aria-selected="${i === 0}" data-i="${i}"><span class="n">${icon(MEDIA[c.n].icon, 96)}</span><span class="t">${c.name}<small>${c.niche}</small></span><span class="go">→</span></button>`;
    list.appendChild(li);
  });
  const pct = (v, max) => Math.max(2, Math.min(100, v / max * 100));
  function metricHTML(m) {
    if (m.rank) {
      const [f, t] = m.rank, gain = f - t;
      return `<div class="m"><p class="m__l">${m.l}</p><div class="m__v"><s>#${fmt(f)}</s><i>→</i><b>#${fmt(t)}</b><i>↑ ${fmt(gain)} spots</i></div><div class="m__bar"><i data-w="${(gain / f * 100).toFixed(1)}"></i></div></div>`;
    }
    const pre = m.pre || '', suf = m.suf || '', d = m.dec || 0;
    const nf = v => pre + (d ? v.toFixed(d) : fmt(v));
    const max = m.max || m.to;
    return `<div class="m"><p class="m__l">${m.l}</p><div class="m__v"><s>${nf(m.from)}</s><i>→</i><b>${nf(m.to)}${suf}</b></div><div class="m__bar"><i data-w="${pct(m.to, max).toFixed(1)}"></i><em style="left:${pct(m.from, max).toFixed(1)}%"></em></div></div>`;
  }
  function renderCase(i) {
    const c = CASES[i], md = MEDIA[c.n];
    panel.innerHTML = `
      <div class="fade-in">
        <div class="cp-app">${icon(md.icon, 192)}<div><p class="cp-app__n">${md.listing}</p><p class="mono dim">Live on Google Play · ${md.installs} installs</p></div></div>
        <div class="cp-head"><span class="tag">${c.store}</span><span class="tag">${c.time}</span><span class="tag tag--live"><i></i>${c.mode}</span></div>
        <h3 class="cp-title">${c.name}</h3>
        <p class="cp-sum">${c.summary}</p>
        <div class="cp-big">${c.big.map(b => `<div><b>${b[0]}</b><span>${b[1]}</span></div>`).join('')}</div>
        <div class="cp-metrics">${c.metrics.map(metricHTML).join('')}</div>
        <p class="mono dim cp-sub">Store listing today</p>
        <div class="cp-shots">${md.shots.map(shot).join('')}</div>
        <p class="mono dim cp-sub">The playbook</p>
        <div class="cp-steps">${c.steps.map(s => `<span>${s}</span>`).join('')}</div>
        <p class="cp-insight">${c.insight}</p>
        ${c.quote ? `<blockquote class="cp-quote"><p>“${c.quote[0]}”</p><cite>— ${c.quote[1]}</cite></blockquote>` : ''}
      </div>`;
    requestAnimationFrame(() => requestAnimationFrame(() => $$('.m__bar i[data-w]', panel).forEach(b => { b.style.width = b.dataset.w + '%'; })));
  }
  list.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    $$('button', list).forEach(x => x.setAttribute('aria-selected', String(x === b)));
    renderCase(+b.dataset.i);
  });
  renderCase(0);

  $('#year').textContent = new Date().getFullYear();
})();
