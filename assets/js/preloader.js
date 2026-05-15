(() => {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  // Bypass complet si l'utilisateur préfère moins d'animations
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.remove('preloading');
    preloader.remove();
    return;
  }

  // Skip le preloader après un changement de langue (rechargement automatique)
  if (sessionStorage.getItem('lang_just_switched')) {
    sessionStorage.removeItem('lang_just_switched');
    document.documentElement.classList.remove('preloading');
    preloader.remove();
    return;
  }

  const numEl = document.getElementById('preloader-num');
  const counterEl = numEl ? numEl.closest('.preloader-counter') : null;
  const barEl = document.getElementById('preloader-bar-fill');
  const glowEl = document.getElementById('preloader-bar-glow');
  const labelEl = document.getElementById('preloader-label');
  const logsEl = document.getElementById('preloader-logs');
  const readyEl = document.getElementById('preloader-ready');
  const barWrapEl = barEl ? barEl.parentElement : null;
  const labelWrapEl = labelEl;
  const statsEl = document.querySelector('.preloader-stats');
  const hexLeftEl = document.getElementById('preloader-hex-left');
  const hexRightEl = document.getElementById('preloader-hex-right');
  const cpuEl = document.getElementById('pl-stat-cpu');
  const memEl = document.getElementById('pl-stat-mem');
  const netEl = document.getElementById('pl-stat-net');

  // ===== Labels selon la progression =====
  const labels = [
    [0,  'Boot sequence'],
    [12, 'Loading core'],
    [28, 'Mounting modules'],
    [44, 'Compiling shaders'],
    [60, 'Linking assets'],
    [76, 'Initializing UI'],
    [92, 'Finalizing'],
    [99, 'Ready']
  ];

  // ===== Logs système =====
  const logMessages = [
    'init  core/runtime.so',
    'load  fonts/space-grotesk',
    'mount /assets/css/main.css',
    'mount /assets/css/animations.css',
    'mount /assets/css/components.css',
    'fetch projects.manifest',
    'spawn worker:scroll-reveal',
    'spawn worker:cursor-glow',
    'init  letter-glitch::canvas',
    'init  scroll-float::gsap',
    'compile fragment_shader',
    'compile vertex_shader',
    'bind  IntersectionObserver',
    'bind  ResizeObserver',
    'verify cache integrity',
    'audit ./node_modules',
    'sync  GPU framebuffer',
    'sync  display.refreshRate=60Hz',
    'check WebGL2 context',
    'route /index.html',
    'index 17 sections',
    'index 6 projects, 4 skills'
  ];

  const formatTime = (ms) => (ms / 1000).toFixed(3).padStart(7, '0');
  const startTime = performance.now();

  const addLog = (msg, status = 'OK') => {
    if (!logsEl) return;
    const t = formatTime(performance.now() - startTime);
    const line = document.createElement('div');
    line.className = 'pl-log';
    line.innerHTML = `<span class="pl-log-time">[${t}]</span>${msg}<span class="pl-log-ok">${status}</span>`;
    logsEl.prepend(line);
    while (logsEl.children.length > 12) logsEl.lastChild.remove();
  };

  let logIndex = 0;
  const logTimer = setInterval(() => {
    const msg = logMessages[logIndex % logMessages.length];
    logIndex++;
    const r = Math.random();
    let status = 'OK';
    if (r < 0.03) status = 'WARN';
    else if (r < 0.15) status = `${Math.floor(Math.random() * 80 + 5)}ms`;
    addLog(msg, status);
  }, 140);

  // ===== Streams hex sur les côtés =====
  const hexChars = '0123456789ABCDEF';
  const randomHex = (len) => {
    let s = '';
    for (let i = 0; i < len; i++) s += hexChars[Math.floor(Math.random() * 16)];
    return s;
  };

  const spawnHexLine = (target) => {
    if (!target) return;
    const line = document.createElement('div');
    const r = Math.random();
    let cls = 'pl-hex-line';
    if (r < 0.08) cls += ' bright';
    else if (r < 0.3) cls += ' cyan';
    line.className = cls;
    line.textContent = randomHex(4 + Math.floor(Math.random() * 3));
    target.appendChild(line);
    setTimeout(() => line.remove(), 2500);
  };

  const hexTimer = setInterval(() => {
    spawnHexLine(hexLeftEl);
    if (Math.random() > 0.3) spawnHexLine(hexRightEl);
  }, 120);

  // ===== Stat tickers (CPU/MEM/NET) =====
  let cpuTarget = 12;
  let memTarget = 8;
  let netTarget = 50;
  let cpuVal = 0, memVal = 0, netVal = 0;

  const updateStats = () => {
    // Targets glissent doucement
    if (Math.random() < 0.12) cpuTarget = 18 + Math.random() * 70;
    if (Math.random() < 0.10) memTarget = 30 + Math.random() * 60;
    if (Math.random() < 0.15) netTarget = 30 + Math.random() * 900;

    cpuVal += (cpuTarget - cpuVal) * 0.15;
    memVal += (memTarget - memVal) * 0.10;
    netVal += (netTarget - netVal) * 0.20;

    if (cpuEl) cpuEl.textContent = `${Math.floor(cpuVal).toString().padStart(2, '0')}%`;
    if (memEl) memEl.textContent = `${Math.floor(memVal).toString().padStart(2, '0')}%`;
    if (netEl) {
      const n = Math.floor(netVal);
      netEl.textContent = n >= 1000 ? `${(n / 1000).toFixed(1)}G` : `${n}M`;
    }
  };
  const statsTimer = setInterval(updateStats, 90);

  // ===== Glitch occasionnel sur le compteur =====
  let glitchTimer = null;
  const scheduleGlitch = () => {
    const wait = 400 + Math.random() * 900;
    glitchTimer = setTimeout(() => {
      if (counterEl) {
        counterEl.classList.add('glitch');
        const original = numEl.textContent;
        numEl.textContent = Math.floor(Math.random() * 100);
        setTimeout(() => {
          numEl.textContent = original;
          counterEl.classList.remove('glitch');
        }, 90);
      }
      scheduleGlitch();
    }, wait);
  };
  scheduleGlitch();

  // ===== Boucle principale =====
  const minDuration = 2800;
  let pageLoaded = document.readyState === 'complete';
  window.addEventListener('load', () => { pageLoaded = true; }, { once: true });

  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  let lastLabel = '';
  const setLabel = (pct) => {
    let label = labels[0][1];
    for (const [threshold, text] of labels) {
      if (pct >= threshold) label = text;
    }
    if (label !== lastLabel && labelEl) {
      labelEl.textContent = label;
      lastLabel = label;
    }
  };

  const tick = (now) => {
    const elapsed = now - startTime;
    const t = Math.min(elapsed / minDuration, 1);
    const eased = easeOutCubic(t);

    let pct = Math.floor(eased * 100);
    if (pct >= 99 && !pageLoaded) pct = 99;

    if (!counterEl || !counterEl.classList.contains('glitch')) {
      numEl.textContent = pct;
    }
    barEl.style.width = pct + '%';
    if (glowEl) glowEl.style.left = pct + '%';
    setLabel(pct);

    if (pct < 100) {
      requestAnimationFrame(tick);
    } else {
      reachedFinal();
    }
  };

  // ===== Phase finale : ACCESS GRANTED puis fade out =====
  const reachedFinal = () => {
    addLog('boot complete', 'OK');

    // Petite pause à 100%
    setTimeout(() => {
      // Passe en mode "ready"
      if (counterEl) counterEl.classList.add('hidden');
      if (barWrapEl) barWrapEl.classList.add('hidden');
      if (labelWrapEl) labelWrapEl.classList.add('hidden');
      if (statsEl) statsEl.classList.add('hidden');
      if (readyEl) readyEl.classList.add('active');

      // Tient l'écran ACCESS GRANTED, puis dispose
      setTimeout(() => {
        clearInterval(logTimer);
        clearInterval(hexTimer);
        clearInterval(statsTimer);
        clearTimeout(glitchTimer);

        preloader.classList.add('done');
        document.documentElement.classList.remove('preloading');
        if (window.ScrollTrigger) ScrollTrigger.refresh();

        setTimeout(() => preloader.remove(), 700);
      }, 900);
    }, 300);
  };

  requestAnimationFrame(tick);
})();
