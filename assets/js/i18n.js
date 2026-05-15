// ===== Système i18n FR/EN =====
const TRANSLATIONS = {
  fr: {
    // Navigation
    'nav.projets': 'Projets',
    'nav.competences': 'Compétences',
    'nav.parcours': 'Parcours',
    'nav.contact': 'Contact',
    'nav.back': '← Retour',

    // Hero
    'hero.tag': 'Microélectronique & Automatique',
    'hero.desc': "Je suis passionné par l'intersection entre le hardware et l'Intelligence Artificielle, en particulier le déploiement d'algorithmes de Machine Learning sur microcontrôleurs (STM32) ou FPGA pour des applications robotiques (Edge AI).",
    'hero.cta.projects': 'Voir mes projets',
    'hero.cta.skills': 'Mes compétences',

    // Sections - tags
    'section.tag.projects': 'Projets',
    'section.tag.skills': 'Compétences',
    'section.tag.path': 'Parcours',
    'section.tag.contact': 'Contact',

    // Sections - titles
    'section.title.projects': 'Réalisations Sélectionnées',
    'section.title.skills': 'Expertise Technique',
    'section.title.path': 'Formation & Expériences',
    'section.title.contact': 'Me Retrouver',

    // Projects
    'project.actinspace.title': 'ActInSpace — Prix "Coup de Cœur"',
    'project.actinspace.desc': "Hackathon international organisé par le CNES et l'ESA. Proposition d'un standard de connecteur unifié pour modules satellites (inspiré USB-C), récompensé par le prix \"Coup de Cœur\" du jury.",
    'project.bras.title': 'Bras Robotique 2 Axes',
    'project.bras.desc': 'Contrôle de 2 servomoteurs via STM32 (CubeIDE, registres bas niveau). Implémentation des cinématiques directe et inverse pour le contrôle de trajectoire.',
    'project.montre.title': 'Montre à Actimétrie Post-AVC',
    'project.montre.desc': "Conception d'une montre connectée pour suivi post-AVC : programmation d'accéléromètre, intégration d'un écran OLED, soudures et routage PCB.",
    'project.impedance.title': "Mesure d'Impédance Ultra-Faible Consommation",
    'project.impedance.desc': "Conception d'un front-end analogique pour DAC implémenté sur FPGA et ADC Delta-Sigma, optimisé pour une consommation énergétique minimale.",
    'project.ml.title': 'Reconnaissance de Chiffres Manuscrits',
    'project.ml.desc': "Conception, entraînement et évaluation d'un réseau de neurones en MATLAB pour la classification de chiffres manuscrits. Prétraitement des données et analyse des performances.",
    'project.server.title': 'Serveur Personnel — Automatisations & Self-Hosting',
    'project.server.desc': "Hébergement de services sur Raspberry Pi : workflows n8n, scripts Python d'automatisation. Gestion de conteneurs Docker, intégration d'APIs REST, manipulation de données JSON et administration réseau (DNS, reverse proxy, ports).",

    // Skill cards (titres uniquement, le contenu reste générique)
    'skill.microelec.title': 'Microélectronique & Automatique',
    'skill.ai.title': 'IA & Réseaux',
    'skill.soft.title': 'Soft Skills',
    'skill.prog.title': 'Programmation & Outils',

    // Parcours nav cards
    'parcours.acad.title': 'Formation Académique',
    'parcours.pro.title': 'Expériences Professionnelles',
    'parcours.detail': 'Voir le détail →',
    'parcours.now': 'Présent',

    // Contact
    'contact.email': 'Email',
    'contact.linkedin': 'LinkedIn',
    'contact.github': 'GitHub',

    // Footer
    'footer.copyright': '© 2026 Aurélien Goumain'
  },

  en: {
    // Navigation
    'nav.projets': 'Projects',
    'nav.competences': 'Skills',
    'nav.parcours': 'Path',
    'nav.contact': 'Contact',
    'nav.back': '← Back',

    // Hero
    'hero.tag': 'Microelectronics & Automation',
    'hero.desc': 'I am driven by the intersection of hardware and Artificial Intelligence, specifically focusing on how to deploy Machine Learning algorithms onto microcontrollers (STM32) or FPGA for robotic applications (Edge AI).',
    'hero.cta.projects': 'View my projects',
    'hero.cta.skills': 'My skills',

    // Sections - tags
    'section.tag.projects': 'Projects',
    'section.tag.skills': 'Skills',
    'section.tag.path': 'Path',
    'section.tag.contact': 'Contact',

    // Sections - titles
    'section.title.projects': 'Selected Work',
    'section.title.skills': 'Technical Expertise',
    'section.title.path': 'Education & Experience',
    'section.title.contact': 'Find Me',

    // Projects
    'project.actinspace.title': 'ActInSpace — "Coup de Cœur" Award',
    'project.actinspace.desc': 'International hackathon hosted by CNES and ESA. Proposed a unified satellite-module connector standard (USB-C inspired), awarded the jury\'s "Coup de Cœur" prize.',
    'project.bras.title': '2-Axis Robotic Arm',
    'project.bras.desc': 'Two-servo control via STM32 (CubeIDE, low-level registers). Implementation of forward and inverse kinematics for trajectory control.',
    'project.montre.title': 'Post-Stroke Actimetry Watch',
    'project.montre.desc': 'Design of a connected watch for post-stroke monitoring: accelerometer programming, OLED screen integration, soldering, and PCB routing.',
    'project.impedance.title': 'Ultra-Low Power Impedance Measurement',
    'project.impedance.desc': 'Analog front-end design for an FPGA-implemented DAC and Delta-Sigma ADC, optimized for minimal energy consumption.',
    'project.ml.title': 'Handwritten Digit Recognition',
    'project.ml.desc': 'Design, training, and evaluation of a neural network in MATLAB for handwritten-digit classification. Data preprocessing and performance analysis.',
    'project.server.title': 'Personal Server — Automations & Self-Hosting',
    'project.server.desc': 'Services hosted on a Raspberry Pi: n8n workflows, Python automation scripts. Docker container management, REST API integration, JSON data handling, and network administration (DNS, reverse proxy, ports).',

    // Skill cards
    'skill.microelec.title': 'Microelectronics & Automation',
    'skill.ai.title': 'AI & Networks',
    'skill.soft.title': 'Soft Skills',
    'skill.prog.title': 'Programming & Tools',

    // Parcours nav cards
    'parcours.acad.title': 'Academic Background',
    'parcours.pro.title': 'Professional Experience',
    'parcours.detail': 'View details →',
    'parcours.now': 'Present',

    // Contact
    'contact.email': 'Email',
    'contact.linkedin': 'LinkedIn',
    'contact.github': 'GitHub',

    // Footer
    'footer.copyright': '© 2026 Aurélien Goumain'
  }
};

const I18N_KEY = 'portfolio_lang';

function detectLang() {
  const stored = localStorage.getItem(I18N_KEY);
  if (stored === 'fr' || stored === 'en') return stored;
  const browser = (navigator.language || 'fr').slice(0, 2).toLowerCase();
  return browser === 'en' ? 'en' : 'fr';
}

function applyLang(lang) {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.fr;
  document.documentElement.lang = lang;

  // 1. Pattern par clé : data-i18n="key"
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) {
      el.textContent = dict[key];
    }
  });

  // 2. Pattern inline : data-i18n-en="English text"
  //    On stocke le texte FR original sur le 1er passage, puis on swap.
  //    Si data-i18n-html est présent, on utilise innerHTML pour préserver le formatage (<strong>, etc.)
  document.querySelectorAll('[data-i18n-en]').forEach((el) => {
    const useHtml = el.hasAttribute('data-i18n-html');
    if (el.dataset.i18nFr === undefined) {
      el.dataset.i18nFr = useHtml ? el.innerHTML : el.textContent;
    }
    const target = lang === 'en' ? el.dataset.i18nEn : el.dataset.i18nFr;
    if (useHtml) {
      el.innerHTML = target;
    } else {
      el.textContent = target;
    }
  });

  // 3. Attributs : data-i18n-attr="attr:key, attr2:key2"
  document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
    const config = el.getAttribute('data-i18n-attr');
    config.split(',').forEach((pair) => {
      const [attr, key] = pair.trim().split(':');
      if (dict[key] !== undefined) el.setAttribute(attr, dict[key]);
    });
  });

  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
    btn.setAttribute('aria-pressed', btn.dataset.lang === lang ? 'true' : 'false');
  });
}

function switchLang(newLang) {
  if (newLang !== 'fr' && newLang !== 'en') return;
  localStorage.setItem(I18N_KEY, newLang);
  // Marque pour skip le preloader sur ce changement
  sessionStorage.setItem('lang_just_switched', '1');
  location.reload();
}

// Application immédiate (avant DOMContentLoaded pour limiter le flash)
(function preApply() {
  const lang = detectLang();
  document.documentElement.lang = lang;
})();

function init() {
  applyLang(detectLang());

  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      if (lang) switchLang(lang);
    });
  });
}

// Application complète une fois le DOM prêt — DOIT tourner avant scroll-float.js
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
