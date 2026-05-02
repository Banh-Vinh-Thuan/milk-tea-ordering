// ===== APP INIT =====

document.addEventListener('DOMContentLoaded', () => {
  // Init navbar scroll behavior
  initNavbar();

  // Render default category
  renderProducts();

  // Init scroll reveal
  initReveal();

  // Add ripple to primary buttons
  document.querySelectorAll('.btn-primary').forEach(addRipple);

  // Smooth close mobile menu on outside click
  document.addEventListener('click', (e) => {
    const menu = document.getElementById('mobileMenu');
    const toggle = document.getElementById('menuToggle');
    if (menu.classList.contains('open') && !menu.contains(e.target) && !toggle.contains(e.target)) {
      menu.classList.remove('open');
    }
  });

  // Add reveal class to about + contact sections
  document.querySelectorAll('.about-content > *, .contact-card').forEach((el, i) => {
    el.classList.add('reveal');
    if (i % 3 === 1) el.classList.add('reveal-delay-1');
    if (i % 3 === 2) el.classList.add('reveal-delay-2');
  });

  // Re-run observer
  setTimeout(initReveal, 100);
});