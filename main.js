(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // theme toggle (the saved theme is restored by the small script in <head>)
  document.getElementById('theme').addEventListener('click', function () {
    var cur =
      root.getAttribute('data-theme') ||
      (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    var next = cur === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try {
      localStorage.setItem('sn-theme', next);
    } catch (e) {}
  });

  // Delhi clock
  var clock = document.getElementById('clock');
  function tick() {
    try {
      clock.textContent = new Intl.DateTimeFormat('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata',
      }).format(new Date());
    } catch (e) {}
  }
  tick();
  setInterval(tick, 30000);

  // rotating "currently" line
  var items = [
    'Building CampusMaster',
    'Piloting Stucknot Studio',
    'Teaching AI skills weekly',
    'Shipping client apps',
  ];
  var line = document.getElementById('ticker'),
    i = 0;
  if (!reduce)
    setInterval(function () {
      var old = line.firstElementChild;
      i = (i + 1) % items.length;
      var n = document.createElement('div');
      n.className = 'in';
      n.textContent = items[i];
      line.appendChild(n);
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          old.className = 'out';
          n.className = '';
        });
      });
      setTimeout(function () {
        old.remove();
      }, 600);
    }, 3200);

  // scroll progress + spotlight
  var bar = document.getElementById('progress'),
    spot = document.getElementById('spot'),
    hero = document.getElementById('top');
  addEventListener(
    'scroll',
    function () {
      var h = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = 'scaleX(' + (h > 0 ? scrollY / h : 0) + ')';
    },
    { passive: true },
  );
  if (!reduce && matchMedia('(pointer:fine)').matches) {
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      spot.style.left = e.clientX - r.left + 'px';
      spot.style.top = e.clientY - r.top + 'px';
    });
  }

  // reveal on scroll: content is visible at rest; only below-the-fold items animate in
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(
      function (es) {
        es.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.remove('pre');
            io.unobserve(en.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    document.querySelectorAll('.rv').forEach(function (el) {
      if (el.getBoundingClientRect().top > innerHeight) {
        el.classList.add('pre');
        io.observe(el);
      }
    });
  }

  // active section for nav + tab bar
  var tabs = document.querySelectorAll('.tabbar a'),
    pills = document.querySelectorAll('nav.pill a');
  if ('IntersectionObserver' in window) {
    var so = new IntersectionObserver(
      function (es) {
        es.forEach(function (en) {
          if (en.isIntersecting) {
            var id = en.target.id;
            tabs.forEach(function (a) {
              a.classList.toggle('on', a.dataset.s === id);
            });
            pills.forEach(function (a) {
              a.classList.toggle('on', a.getAttribute('href') === '#' + id);
            });
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    pills.forEach(function (a) {
      so.observe(document.querySelector(a.getAttribute('href')));
    });
  }

  // featured-project rail: shows while a full-screen project is in view
  var rail = document.getElementById('rail'),
    feats = [].slice.call(document.querySelectorAll('.feature')),
    railLinks = rail.querySelectorAll('a'),
    railCur = document.getElementById('rail-cur');
  function railTick() {
    var cur = -1,
      vh = innerHeight;
    feats.forEach(function (f, k) {
      var r = f.getBoundingClientRect();
      if (r.top < vh * 0.55 && r.bottom > vh * 0.45) cur = k;
    });
    rail.classList.toggle('show', cur > -1);
    var dk = feats.some(function (f) {
      var r = f.getBoundingClientRect();
      return r.top < 38 && r.bottom > 38;
    });
    document.querySelector('header.top').classList.toggle('dk', dk);
    if (cur > -1) {
      railCur.textContent = '0' + (cur + 1);
      railLinks.forEach(function (a, k) {
        a.classList.toggle('on', k === cur);
      });
    }
  }
  addEventListener('scroll', railTick, { passive: true });
  addEventListener('resize', railTick);
  railTick();

  // client websites: pick a site to bring its browser window forward
  (function () {
    var box = document.getElementById('f-sites');
    if (!box) return;
    var rows = [].slice.call(box.querySelectorAll('.site')),
      wins = [].slice.call(box.querySelectorAll('.bw'));
    function pick(i) {
      rows.forEach(function (r, k) {
        r.classList.toggle('on', k === i);
        r.querySelector('.site-h').setAttribute('aria-expanded', k === i ? 'true' : 'false');
      });
      wins.forEach(function (w, k) {
        w.dataset.pos = (k - i + 3) % 3;
      });
      box.dataset.tint = i; // colours live in styles.css (#f-sites[data-tint])
    }
    rows.forEach(function (r, k) {
      r.querySelector('.site-h').addEventListener('click', function () {
        pick(k);
      });
    });
    wins.forEach(function (w, k) {
      w.addEventListener('click', function () {
        pick(k);
      });
    });
  })();

  // once the page has loaded, quietly fetch the lazy screenshots so they are ready before you scroll to them
  addEventListener('load', function () {
    var warm = function () {
      document.querySelectorAll('img[loading="lazy"]').forEach(function (im) {
        im.loading = 'eager';
      });
    };
    if ('requestIdleCallback' in window) requestIdleCallback(warm, { timeout: 2500 });
    else setTimeout(warm, 800);
  });

  // guest-faculty invite links: the subject is in the markup, the shared body template is added here once
  var INVITE_BODY =
    'Institution:\nTopic:\nAudience and size:\nPreferred dates:\nOn campus or online:\n';
  document.querySelectorAll('a[data-invite]').forEach(function (a) {
    a.href += '&body=' + encodeURIComponent(INVITE_BODY);
  });

  // copy email
  var toast = document.getElementById('toast');
  function say(m) {
    toast.textContent = m;
    toast.hidden = false;
    clearTimeout(say.t);
    say.t = setTimeout(function () {
      toast.hidden = true;
    }, 1800);
  }
  document.getElementById('copy').addEventListener('click', function () {
    var txt = document.getElementById('email').textContent.trim();
    function sel() {
      var r = document.createRange();
      r.selectNodeContents(document.getElementById('email'));
      var s = getSelection();
      s.removeAllRanges();
      s.addRange(r);
      say('Email selected. Press copy.');
    }
    try {
      navigator.clipboard.writeText(txt).then(function () {
        say('Email copied');
      }, sel);
    } catch (e) {
      sel();
    }
  });
})();
