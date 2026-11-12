/* v3: hero proof cards, per-app colours, proof gallery + lightbox */
(function () {
  'use strict';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var COL = ['#8f7cff', '#3ddcff', '#ff8f4a', '#ff5c9e'];
  var P = 'https://play-lh.googleusercontent.com/';
  var HERO = [
    { x: '7.5×', l: 'Daily downloads', f: '16', t: '120', i: 0 },
    { x: '20×', l: 'Monthly revenue', f: '$5', t: '$100', i: 1 },
    { x: '+76', l: 'Keyword rank spots', f: '#78', t: '#2', i: 0 },
    { x: '3,000+', l: 'Daily downloads', f: '4', t: '3,000+', i: 2 }
  ];

  /* ---------- Hero proof strip ---------- */
  var hp = $('#heroProof');
  if (hp) {
    hp.innerHTML = '<div class="hp__grid">' + HERO.map(function (h) {
      return '<button type="button" class="hp" data-i="' + h.i + '"><b>' + h.x + '</b><span>' + h.l + '</span><small><s>' + h.f + '</s><i>→</i><em>' + h.t + '</em></small></button>';
    }).join('') + '</div>';
    $$('.hp', hp).forEach(function (c) {
      c.addEventListener('click', function () {
        var r = $('.wr[data-i="' + c.getAttribute('data-i') + '"]');
        if (r) r.click();
      });
    });
  }

  /* ---------- Per-app colours on the results wall ---------- */
  $$('.wr').forEach(function (r, k) { r.style.setProperty('--ac', COL[k] || COL[0]); });

  /* ---------- Proof gallery inside each case ---------- */
  var TABLE = [
    [['Daily downloads', '~16', '~120 (100% organic)'], ['Monthly revenue', '~$5', '~$180'], ['Store rating', '2.8★', '4.4★+'], ['5★ reviews', 'about 1 every 2–3 days', '4–5+ per day'], ['Rank: “ai essay writer” (US)', 'Position 78', 'Position 2']],
    [['Daily downloads', '~100', '~1,000 (10×)'], ['Monthly revenue', '~$5', '~$100 (20×)'], ['5★ reviews', 'about 1 every 3–4 days', '20–25 per day'], ['Rank: “pdf to word converter”', 'Position 59', 'Position 9'], ['Rank: “docx to pdf converter”', 'Position 31', 'Position 1']],
    [['Daily downloads', '4–13', '3,000+ (70% organic, 30% paid)'], ['Monthly revenue', '$5–10 (paid ads only)', '~$1,000'], ['Store rating', '3.4★ (101 ratings)', '4.5★ (8,990 ratings)'], ['5★ reviews', '1–3 per month', '150+ per day'], ['Rank: “screen mirroring”', 'Position 239', 'Position 9'], ['Rank: “miracast”', 'Position 93', 'Position 3']],
    [['Daily store visitors', '60–80', '2,100+'], ['Daily downloads', '9–12', '900–1,100'], ['Monthly revenue', '$0 for 3 straight months', '~$80'], ['Rank: “universal tv remote”', 'Position 109', 'Position 27'], ['Rank: “all smart tv remote”', 'Position 68', 'Position 8']]
  ];
  var TITLES = [
    { ts: 'Store listing acquisitions · Google Play Console', rev: 'Revenue and rating distribution' },
    { ts: 'Store listing acquisitions · Google Play Console', rev: 'Revenue and rating distribution' },
    { ts: 'Store listing acquisitions and visitors', rev: 'Revenue and rating distribution' },
    { ts: 'Store listing visitors and acquisitions', rev: 'Revenue by product type' }
  ];
  var CAP = [
    { rank: 'Same keywords, same tracker. “ai essay writer” moved from position 78 to position 2 in one month, with “essay writer” and “essay writing app” climbing too.', ts: 'Daily acquisitions stay flat for most of August, then spike to about 120 a day, all from organic Google Play discovery.', rev: 'Subscription revenue jumps once ASO takes effect, and ratings climb from 2.8★ to 4.4★ after the in-flow review prompt.' },
    { rank: '“pdf to word converter” moved from position 59 to position 9 and “docx to pdf converter” from position 31 to position 1.', ts: 'Daily installs stay flat until the start of July, then climb steadily toward about 1,000 a day.', rev: 'Monthly revenue climbs from around $5 to around $100, and the review prompt brings 20–25 five-star ratings a day.' },
    { rank: 'Before: every core keyword effectively unranked, “screen mirroring” at position 239. After ASO plus paid: core keywords on pages 1–2 and “miracast” at position 3.', ts: 'Flat through May and June, then a sharp climb from July. Acquisitions peaked at 3,261 a day by the end of August.', rev: 'Close to $0 through June, then first real revenue in July and August, about $850 in a single month by September.' },
    { rank: '“universal tv remote” moved from position 109 to 27, “ir android tv remote” from 127 to 47, and “all smart tv remote” from 68 to 8.', ts: 'From July 20, daily visitors jump from 60–80 to 2,100+, and daily installs from single digits to 900–1,100.', rev: 'Revenue was effectively zero for six months. The first real revenue appears in August, right as organic traffic arrives.' }
  ];
  var panel = $('#casePanel'), cases = $('.cases'), list = $('#caseList');
  function sel() {
    var bs = $$('button', list);
    for (var k = 0; k < bs.length; k++) if (bs[k].getAttribute('aria-selected') === 'true') return k;
    return 0;
  }
  function proofHTML(i) {
    var d = window.PROOF && window.PROOF['a' + (i + 1)];
    if (!d) return '';
    var rows = TABLE[i].map(function (r) { return '<div class="px__row"><span>' + r[0] + '</span><s>' + r[1] + '</s><b>' + r[2] + '</b></div>'; }).join('');
    var figs = [['rank', 'Keyword rankings · before vs after'], ['ts', TITLES[i].ts], ['rev', TITLES[i].rev]].filter(function (f) { return d[f[0]]; }).map(function (f) {
      return '<figure class="px__fig"><img src="' + d[f[0]] + '" alt="' + f[1] + '" loading="lazy"><span class="px__zoom">Zoom</span><figcaption class="px__cap"><b>' + f[1] + '</b>' + CAP[i][f[0]] + '</figcaption></figure>';
    }).join('');
    return '<div class="px"><div class="px__head"><p class="mono dim cp-sub" style="margin:0">Proof · before vs after</p><span class="px__badge">Real console screenshots</span></div><div class="px__table"><div class="px__row px__row--h"><span>Metric</span><span>Before</span><span>After</span></div>' + rows + '</div><div class="px__grid">' + figs + '</div><p class="px__note mono dim">Cropped from the case-study report delivered to the client. Tap any image to zoom.</p></div>';
  }
  function inject() {
    if (!panel || panel.querySelector('.px')) return;
    var m = panel.querySelector('.cp-metrics');
    if (!m) return;
    var i = sel();
    if (cases) cases.style.setProperty('--ac', COL[i] || COL[0]);
    m.insertAdjacentHTML('afterend', proofHTML(i));
  }
  if (panel) {
    new MutationObserver(inject).observe(panel, { childList: true });
    inject();
  }

  /* ---------- Lightbox ---------- */
  var lb = document.createElement('div');
  lb.className = 'lb';
  lb.innerHTML = '<button class="lb__x" type="button" aria-label="Close">×</button><img alt=""><p class="lb__cap mono"></p>';
  document.body.appendChild(lb);
  var closeLb = function () { lb.classList.remove('on'); };
  lb.addEventListener('click', closeLb);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLb(); });
  if (panel) {
    panel.addEventListener('click', function (e) {
      var f = e.target.closest ? e.target.closest('.px__fig') : null;
      if (!f) return;
      $('img', lb).src = $('img', f).src;
      $('.lb__cap', lb).textContent = $('.px__cap b', f).textContent + ' · tap anywhere to close';
      lb.classList.add('on');
    });
  }

  /* ---------- Nav highlight (Results covers both result sections) ---------- */
  var links = $$('[data-nav]');
  var ids = { results: '#results', work: '#results', reviews: '#reviews', services: '#services', about: '#about' };
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      var href = ids[e.target.id];
      links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === href); });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  Object.keys(ids).forEach(function (id) { var el = document.getElementById(id); if (el) io.observe(el); });
})();
