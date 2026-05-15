// ===== Tilt 3D sur la photo de profil =====
document.querySelectorAll('[data-tilt]').forEach((el) => {
  if (!window.matchMedia('(hover: hover)').matches) return;

  const maxTilt = 12;

  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    const rotY = dx * maxTilt;
    const rotX = -dy * maxTilt;
    el.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.04)`;
  });

  el.addEventListener('mouseleave', () => {
    el.style.transform = '';
  });
});
