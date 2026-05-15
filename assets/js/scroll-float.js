// Port vanilla JS de https://reactbits.dev/components/scroll-float
// Cible : .section-title, .skill-page-title, .parcours-page-title

(() => {
  function init() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      console.warn('[scroll-float] GSAP ou ScrollTrigger non chargés');
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const selectors = ['.section-title', '.skill-page-title', '.parcours-page-title', '[data-scroll-float]'];
    const targets = document.querySelectorAll(selectors.join(','));

    targets.forEach((el) => {
      if (el.dataset.scrollFloatDone) return;
      el.dataset.scrollFloatDone = 'true';

      // Enveloppe le contenu dans .sf-clip pour pouvoir clipper overflow
      const wrap = document.createElement('span');
      wrap.className = 'sf-clip';
      while (el.firstChild) wrap.appendChild(el.firstChild);
      el.appendChild(wrap);

      // Découpe chaque text node en spans .char (préserve <br>, <span>, etc.)
      const walker = document.createTreeWalker(wrap, NodeFilter.SHOW_TEXT, null);
      const textNodes = [];
      let node;
      while ((node = walker.nextNode())) textNodes.push(node);

      const chars = [];
      textNodes.forEach((textNode) => {
        const text = textNode.nodeValue;
        if (!text) return;
        const frag = document.createDocumentFragment();
        Array.from(text).forEach((ch) => {
          if (ch === '\n' || ch === '\r') return;
          const span = document.createElement('span');
          span.className = 'char';
          span.textContent = ch === ' ' ? ' ' : ch;
          frag.appendChild(span);
          chars.push(span);
        });
        textNode.parentNode.replaceChild(frag, textNode);
      });

      if (chars.length === 0) return;

      const duration = parseFloat(el.dataset.duration) || 0.8;
      const stagger = parseFloat(el.dataset.stagger) || 0.03;
      const ease = el.dataset.ease || 'back.out(1.7)';
      const scrollStart = el.dataset.scrollStart || 'top 85%';

      gsap.fromTo(
        chars,
        {
          willChange: 'opacity, transform',
          opacity: 0,
          yPercent: 120,
          scaleY: 2.3,
          scaleX: 0.7,
          transformOrigin: '50% 0%'
        },
        {
          duration,
          ease,
          opacity: 1,
          yPercent: 0,
          scaleY: 1,
          scaleX: 1,
          stagger,
          scrollTrigger: {
            trigger: el,
            start: scrollStart,
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // Refresh ScrollTrigger après chargement complet (fonts, images)
    window.addEventListener('load', () => ScrollTrigger.refresh());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
