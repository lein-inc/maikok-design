const IG_SVG = '<svg viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1s-3.6 0-4.9-.1c-3.3-.1-4.8-1.7-4.9-4.9-.1-1.3-.1-1.6-.1-4.8s0-3.6.1-4.8C2.3 4 3.9 2.4 7.1 2.3c1.3-.1 1.7-.1 4.9-.1zM12 0C8.7 0 8.3 0 7 .1 2.7.3.3 2.7.1 7 0 8.3 0 8.7 0 12s0 3.7.1 5c.2 4.3 2.6 6.7 6.9 6.9 1.3.1 1.7.1 5 .1s3.7 0 5-.1c4.3-.2 6.7-2.6 6.9-6.9.1-1.3.1-1.7.1-5s0-3.7-.1-5C23.7 2.7 21.3.3 17 .1 15.7 0 15.3 0 12 0zm0 5.8A6.2 6.2 0 1 0 18.2 12 6.2 6.2 0 0 0 12 5.8zm0 10.2A4 4 0 1 1 16 12a4 4 0 0 1-4 4zm6.4-11.8a1.4 1.4 0 1 0 1.4 1.4 1.4 1.4 0 0 0-1.4-1.4z"/></svg>';
const FB_SVG = '<svg viewBox="0 0 24 24"><path d="M24 12a12 12 0 1 0-13.9 11.9v-8.4h-3V12h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9V12h3.3l-.5 3.5h-2.8v8.4A12 12 0 0 0 24 12z"/></svg>';

const NAV = [
  ['about.html', 'About'],
  ['work.html', 'Work'],
  ['exhibition.html', 'Exhibition / Project'],
  ['merch.html', 'Merch'],
  ['note.html', 'Note'],
  ['contact.html', 'Contact'],
];

function snsIcons() {
  return '<div class="sns"><a href="https://www.instagram.com/maikok.in.tokyo/" target="_blank" aria-label="Instagram">' + IG_SVG + '</a><a href="#" aria-label="Facebook">' + FB_SVG + '</a></div>';
}

function renderHeader(active) {
  const nav = NAV.map(([href, label]) =>
    '<a href="' + href + '"' + (href === active ? ' class="active"' : '') + '>' + label + '</a>'
  ).join('');
  document.write(
    '<div id="lines"><i class="top"></i><i class="left"></i><i class="right"></i><i class="bottom"></i></div>' +
    '<div id="page" class="flip-in">' +
    '<header>' +
    '<div class="header-utility">' +
    '<div class="lang-switch"><span class="on">JA</span><span>EN</span><span>KO</span></div>' +
    snsIcons() +
    '</div>' +
    '<div class="header-main">' +
    '<div class="brand"><h1 class="site-title"><a href="index.html">Maiko KOBAYASHI</a></h1>' +
    '<div class="site-title-kana">コバヤシ麻衣子</div></div>' +
    '<nav class="global">' + nav + '</nav>' +
    '</div>' +
    '</header>'
  );
}

function renderFooter() {
  document.write(
    '<footer>' +
    '<div class="footer-inner">' +
    '<p class="copyright">© Maiko KOBAYASHI - MK ARTS STUDIO - All Rights Reserved</p>' +
    '</div>' +
    '</footer>' +
    '</div>'
  );
  initMotion();
}

/* ===== motion: scroll reveal / heading mask / page flip ===== */
function initMotion(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var page = document.getElementById('page');
  // page flip-in (card turning to face) — remove transform after animation so position:fixed works again
  if(reduce){ page.classList.remove('flip-in'); }
  else { page.addEventListener('animationend', function(e){ if(e.target===page){ page.classList.remove('flip-in'); } }); }
  // page flip-out on internal navigation
  document.addEventListener('click', function(e){
    var a = e.target.closest('a'); if(!a) return;
    var href = a.getAttribute('href') || '';
    if(reduce || a.target==='_blank' || !/\.html(#.*)?$/.test(href) || e.metaKey || e.ctrlKey) return;
    e.preventDefault();
    page.classList.add('flip-out');
    setTimeout(function(){ location.href = href; }, 520);
  });
  // scroll reveal
  var sel = 'main > section, main > .page-head, main > .grid > figure, main > .year-label, .exh-card, .past-list li, .note-list li, .ref-list li, .merch-item, form.wf .field, .submit-wrap, .about-block p, details.ship';
  var heads = '.page-title, h2.sec, h3.subsec, .year-label, .exh-card h3, .merch-item h3, .note-list a';
  var items = [].slice.call(document.querySelectorAll(sel));
  items.forEach(function(el){ el.classList.add('rv'); });
  document.querySelectorAll(heads).forEach(function(el){ el.classList.add('mk'); });
  if(reduce || !('IntersectionObserver' in window)){ items.forEach(function(el){ el.classList.add('in'); }); document.querySelectorAll('.mk').forEach(function(el){ el.classList.add('in'); }); return; }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('in'); en.target.querySelectorAll('.mk').forEach(function(h){ h.classList.add('in'); }); if(en.target.classList.contains('mk')) en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { rootMargin:'0px 0px -8% 0px', threshold:0.05 });
  items.forEach(function(el){ io.observe(el); });
  document.querySelectorAll('.mk').forEach(function(h){ if(!h.closest('.rv')) io.observe(h); });
}
