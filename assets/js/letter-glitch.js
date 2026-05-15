// Port vanilla JS de https://reactbits.dev/components/letter-glitch

class LetterGlitch {
  constructor(container, options = {}) {
    this.glitchColors = options.glitchColors || ['#2b4539', '#61dca3', '#61b3dc'];
    this.glitchSpeed = options.glitchSpeed != null ? options.glitchSpeed : 50;
    this.centerVignette = options.centerVignette === true;
    this.outerVignette = options.outerVignette !== false;
    this.smooth = options.smooth !== false;
    this.characters = options.characters || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789';

    this.container = container;
    this.lettersAndSymbols = Array.from(this.characters);
    this.fontSize = 16;
    this.charWidth = 10;
    this.charHeight = 20;
    this.letters = [];
    this.grid = { columns: 0, rows: 0 };
    this.lastGlitchTime = Date.now();
    this.animationId = null;

    this.setupDOM();
    this.context = this.canvas.getContext('2d');
    this.resizeCanvas();
    this.animate = this.animate.bind(this);
    this.animate();

    this.resizeTimeout = null;
    this.handleResize = () => {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        cancelAnimationFrame(this.animationId);
        this.resizeCanvas();
        this.animate();
      }, 100);
    };
    window.addEventListener('resize', this.handleResize);
  }

  setupDOM() {
    const cs = getComputedStyle(this.container);
    if (cs.position === 'static') this.container.style.position = 'relative';
    this.container.style.overflow = 'hidden';
    this.container.style.backgroundColor = '#000000';

    this.canvas = document.createElement('canvas');
    Object.assign(this.canvas.style, {
      display: 'block',
      width: '100%',
      height: '100%'
    });
    this.container.appendChild(this.canvas);

    if (this.outerVignette) {
      const v = document.createElement('div');
      v.style.cssText =
        'position:absolute;inset:0;pointer-events:none;' +
        'background:radial-gradient(circle, rgba(0,0,0,0) 60%, rgba(0,0,0,1) 100%);';
      this.container.appendChild(v);
    }

    if (this.centerVignette) {
      const v = document.createElement('div');
      v.style.cssText =
        'position:absolute;inset:0;pointer-events:none;' +
        'background:radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%);';
      this.container.appendChild(v);
    }
  }

  getRandomChar() {
    return this.lettersAndSymbols[Math.floor(Math.random() * this.lettersAndSymbols.length)];
  }

  getRandomColor() {
    return this.glitchColors[Math.floor(Math.random() * this.glitchColors.length)];
  }

  hexToRgb(hex) {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
      : null;
  }

  interpolateColor(start, end, factor) {
    const r = Math.round(start.r + (end.r - start.r) * factor);
    const g = Math.round(start.g + (end.g - start.g) * factor);
    const b = Math.round(start.b + (end.b - start.b) * factor);
    return `rgb(${r}, ${g}, ${b})`;
  }

  calculateGrid(width, height) {
    return {
      columns: Math.ceil(width / this.charWidth),
      rows: Math.ceil(height / this.charHeight)
    };
  }

  initializeLetters(columns, rows) {
    this.grid = { columns, rows };
    const total = columns * rows;
    this.letters = Array.from({ length: total }, () => ({
      char: this.getRandomChar(),
      color: this.getRandomColor(),
      targetColor: this.getRandomColor(),
      colorProgress: 1
    }));
  }

  resizeCanvas() {
    const parent = this.canvas.parentElement;
    if (!parent) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = parent.getBoundingClientRect();
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.canvas.style.width = rect.width + 'px';
    this.canvas.style.height = rect.height + 'px';
    if (this.context) this.context.setTransform(dpr, 0, 0, dpr, 0, 0);
    const { columns, rows } = this.calculateGrid(rect.width, rect.height);
    this.initializeLetters(columns, rows);
    this.drawLetters();
  }

  drawLetters() {
    if (!this.context || this.letters.length === 0) return;
    const ctx = this.context;
    const { width, height } = this.canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, width, height);
    ctx.font = `${this.fontSize}px monospace`;
    ctx.textBaseline = 'top';

    this.letters.forEach((letter, index) => {
      const x = (index % this.grid.columns) * this.charWidth;
      const y = Math.floor(index / this.grid.columns) * this.charHeight;
      ctx.fillStyle = letter.color;
      ctx.fillText(letter.char, x, y);
    });
  }

  updateLetters() {
    if (!this.letters.length) return;
    const updateCount = Math.max(1, Math.floor(this.letters.length * 0.05));
    for (let i = 0; i < updateCount; i++) {
      const index = Math.floor(Math.random() * this.letters.length);
      if (!this.letters[index]) continue;
      this.letters[index].char = this.getRandomChar();
      this.letters[index].targetColor = this.getRandomColor();
      if (!this.smooth) {
        this.letters[index].color = this.letters[index].targetColor;
        this.letters[index].colorProgress = 1;
      } else {
        this.letters[index].colorProgress = 0;
      }
    }
  }

  handleSmoothTransitions() {
    let needsRedraw = false;
    this.letters.forEach((letter) => {
      if (letter.colorProgress < 1) {
        letter.colorProgress += 0.05;
        if (letter.colorProgress > 1) letter.colorProgress = 1;
        const startRgb = this.hexToRgb(letter.color);
        const endRgb = this.hexToRgb(letter.targetColor);
        if (startRgb && endRgb) {
          letter.color = this.interpolateColor(startRgb, endRgb, letter.colorProgress);
          needsRedraw = true;
        }
      }
    });
    if (needsRedraw) this.drawLetters();
  }

  animate() {
    const now = Date.now();
    if (now - this.lastGlitchTime >= this.glitchSpeed) {
      this.updateLetters();
      this.drawLetters();
      this.lastGlitchTime = now;
    }
    if (this.smooth) this.handleSmoothTransitions();
    this.animationId = requestAnimationFrame(this.animate);
  }

  destroy() {
    cancelAnimationFrame(this.animationId);
    window.removeEventListener('resize', this.handleResize);
  }
}

// Auto-init
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('letter-glitch-bg');
  if (!container) return;

  // Respecte la préférence "mouvement réduit"
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    container.style.backgroundColor = '#000';
    return;
  }

  new LetterGlitch(container, {
    glitchColors: ['#3c755b', '#50da9a', '#61b3dc'],
    glitchSpeed: 180,
    centerVignette: true,
    outerVignette: true,
    smooth: false
  });
});
