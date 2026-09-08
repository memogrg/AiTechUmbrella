/* ==========================================================================
   AI Tech Umbrella — comportamiento del sitio
   Sin dependencias. Router por hash, hero interactivo, ticker y formulario.
   ========================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------- Router */

  var ROUTES = [
    { hash: '#/',                view: 'home',       title: 'AI Tech Umbrella — Transformamos oportunidades en soluciones inteligentes' },
    { hash: '#/nosotros',        view: 'nosotros',   title: 'Nosotros — AI Tech Umbrella' },
    { hash: '#/como-trabajamos', view: 'metodo',     title: 'Cómo trabajamos — AI Tech Umbrella' },
    { hash: '#/soluciones',      view: 'soluciones', title: 'Soluciones — AI Tech Umbrella' },
    { hash: '#/servicios',       view: 'servicios',  title: 'Servicios — AI Tech Umbrella' },
    { hash: '#/contacto',        view: 'contacto',   title: 'Contacto — AI Tech Umbrella' }
  ];

  var views    = Array.prototype.slice.call(document.querySelectorAll('[data-view]'));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('[data-nav]'));
  var main     = document.querySelector('.main');

  function routeFor(hash) {
    for (var i = 0; i < ROUTES.length; i++) {
      if (ROUTES[i].hash === hash) return ROUTES[i];
    }
    return ROUTES[0];
  }

  function render() {
    var route = routeFor(window.location.hash || '#/');

    views.forEach(function (section) {
      var active = section.getAttribute('data-view') === route.view;
      section.hidden = !active;
      if (active) {
        // Reinicia la animación de entrada de la vista.
        section.style.animation = 'none';
        void section.offsetWidth;
        section.style.animation = '';
      }
    });

    navLinks.forEach(function (link) {
      if (link.getAttribute('data-nav') === route.view) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });

    document.title = route.title;
    if (main) main.scrollTop = 0;

    // Cierra los detalles abiertos por toque al cambiar de vista.
    Array.prototype.forEach.call(document.querySelectorAll('.card.is-open'), function (c) {
      c.classList.remove('is-open');
    });
  }

  window.addEventListener('hashchange', render);

  /* -------------------------------------------------------- Hero: nodos */

  var NODES = [
    { label: 'Estrategia',     body: 'Entendemos el negocio y decidimos dónde intervenir antes de escoger una tecnología.' },
    { label: 'Automatización', body: 'Quitamos el trabajo repetitivo del camino y liberamos capacidad del equipo.' },
    { label: 'Agentic AI',     body: 'Agentes que ejecutan tareas de principio a fin, con límites claros y supervisión humana.' },
    { label: 'Datos',          body: 'Información conectada y confiable para que las decisiones dejen de depender de la intuición.' },
    { label: 'Desarrollo',     body: 'Software e integraciones cuando la capacidad que el negocio necesita merece ser propia.' }
  ];

  var nodeEls   = Array.prototype.slice.call(document.querySelectorAll('.node'));
  var labelEls  = Array.prototype.slice.call(document.querySelectorAll('.node-labels text'));
  var nodeLabel = document.getElementById('nodeLabel');
  var nodeBody  = document.getElementById('nodeBody');

  function setNode(index) {
    if (!NODES[index]) return;

    nodeEls.forEach(function (el) {
      el.classList.toggle('is-active', Number(el.getAttribute('data-node')) === index);
    });
    labelEls.forEach(function (el) {
      el.classList.toggle('is-active', Number(el.getAttribute('data-label')) === index);
    });

    // El nodo central (Agentic AI) se dibuja algo mayor que el resto.
    nodeEls.forEach(function (el) {
      var i   = Number(el.getAttribute('data-node'));
      var dot = el.querySelector('.node__dot');
      var on  = i === index;
      if (dot) dot.setAttribute('r', on ? (i === 2 ? 9.5 : 8) : (i === 2 ? 8 : 6.5));
    });

    if (nodeLabel) nodeLabel.textContent = NODES[index].label;
    if (nodeBody)  nodeBody.textContent  = NODES[index].body;
  }

  nodeEls.forEach(function (el) {
    var index = Number(el.getAttribute('data-node'));
    el.addEventListener('mouseenter', function () { setNode(index); });
    el.addEventListener('focus', function () { setNode(index); });
    el.addEventListener('click', function () { setNode(index); });
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setNode(index); }
    });
  });

  /* ------------------------------------------------------ Hero: parallax */

  var heroFigure = document.getElementById('heroFigure');

  function onMove(e) {
    if (!heroFigure || heroFigure.offsetParent === null) return;
    var r = heroFigure.getBoundingClientRect();
    if (!r.width) return;
    var nx = (e.clientX - (r.left + r.width / 2)) / r.width;
    var ny = (e.clientY - (r.top + r.height / 2)) / r.height;
    Array.prototype.forEach.call(heroFigure.querySelectorAll('[data-depth]'), function (g) {
      var d = parseFloat(g.getAttribute('data-depth')) || 0;
      g.style.transform = 'translate(' + (nx * d).toFixed(2) + 'px,' + (ny * d * 0.6).toFixed(2) + 'px)';
    });
  }

  if (!reduceMotion) window.addEventListener('mousemove', onMove, { passive: true });

  /* ----------------------------------------------------------- Ticker */

  var CAPS = [
    'Umbrella Automation', 'Umbrella Intelligence', 'Umbrella Agents',
    'Umbrella Data', 'Umbrella Digital', 'Umbrella Development', 'Agentic AI'
  ];

  var track = document.getElementById('tickerTrack');
  if (track) {
    var html = '';
    for (var pass = 0; pass < 3; pass++) {
      for (var c = 0; c < CAPS.length; c++) {
        html += '<span class="ticker__item">' + CAPS[c] + '</span>';
        html += '<span class="ticker__dot">·</span>';
      }
    }
    track.innerHTML = html;
  }

  /* --------------------------------------------------------- Formulario */

  var form = document.getElementById('contactForm');
  var msg  = document.getElementById('formMsg');
  var MAIL = 'communication@AITechUmbrella.com';

  function say(text, ok) {
    if (!msg) return;
    msg.textContent = text;
    msg.classList.toggle('is-ok', !!ok);
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var val = function (id) {
        var el = document.getElementById(id);
        return el && el.value ? el.value.trim() : '';
      };

      var nombre  = val('fNombre');
      var correo  = val('fCorreo');
      var asunto  = val('fAsunto');
      var mensaje = val('fMensaje');

      if (!correo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
        say('Indique un correo válido para poder responderle.', false);
        var c = document.getElementById('fCorreo'); if (c) c.focus();
        return;
      }
      if (!mensaje) {
        say('Cuéntenos brevemente qué necesita mejorar.', false);
        var m = document.getElementById('fMensaje'); if (m) m.focus();
        return;
      }

      var subject = asunto || 'Solicitud de conversación · AI Tech Umbrella';
      var body    = 'Nombre: ' + (nombre || '(sin indicar)') + '\nCorreo: ' + correo + '\n\n' + mensaje;

      window.location.href = 'mailto:' + MAIL +
        '?subject=' + encodeURIComponent(subject) +
        '&body='    + encodeURIComponent(body);

      say('Abrimos su correo con la solicitud lista para enviar a ' + MAIL + '.', true);
    });
  }

  /* --------------------------------------------------------------- Init */

  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  setNode(2);
  render();
})();
