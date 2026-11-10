/* Taller Pilsi · lo mínimo de JS: agrandar obra, abrir la carta, medir el alto del aviso y contar visitas. */
(function () {
  var aviso = document.querySelector('.aviso');
  function alto() { if (aviso) document.documentElement.style.setProperty('--alto-aviso', aviso.offsetHeight + 'px'); }
  alto(); window.addEventListener('resize', alto);

  var grande = document.getElementById('grande');
  document.querySelectorAll('[data-grande]').forEach(function (b) {
    b.addEventListener('click', function () {
      var img = grande.querySelector('img');
      img.src = b.getAttribute('data-grande'); img.alt = b.querySelector('img').alt;
      grande.showModal();
    });
  });
  document.querySelectorAll('[data-abre]').forEach(function (b) {
    b.addEventListener('click', function () { document.getElementById(b.getAttribute('data-abre')).showModal(); });
  });
  document.querySelectorAll('dialog').forEach(function (d) {
    d.addEventListener('click', function (e) { if (e.target === d || e.target.closest('.cerrar')) d.close(); });
  });

  /* video lite: el reproductor de YouTube solo se carga al tocar */
  document.querySelectorAll('.lite[data-yt]').forEach(function (b) {
    b.addEventListener('click', function () {
      var f = document.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + b.getAttribute('data-yt') + '?autoplay=1&rel=0';
      f.title = b.getAttribute('aria-label'); f.allow = 'autoplay; encrypted-media; picture-in-picture'; f.allowFullscreen = true;
      b.replaceWith(f);
    });
  });
  /* canciones: el reproductor de Spotify solo se carga al tocar una pista */
  document.querySelectorAll('.pista[data-spotify]').forEach(function (b) {
    b.addEventListener('click', function () {
      var r = b.closest('section').querySelector('.reproductor');
      r.hidden = false;
      r.innerHTML = '<iframe loading="lazy" allow="autoplay; encrypted-media" title="Spotify"></iframe>';
      r.firstChild.src = 'https://open.spotify.com/embed/' + b.getAttribute('data-spotify');
    });
  });

  /* contador de visitas (fase 7): manda un beacon si la página está publicada; con ?yo no cuenta */
  var slug = document.body.getAttribute('data-slug');
  if (slug && location.protocol === 'https:' && !/[?&]yo\b/.test(location.search) && navigator.sendBeacon) {
    try { navigator.sendBeacon('/v?s=' + encodeURIComponent(slug) + '&d=' + (matchMedia('(max-width:720px)').matches ? 'cel' : 'compu')); } catch (e) {}
  }
})();
