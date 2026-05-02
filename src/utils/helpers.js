// ===== UTILITY HELPERS =====

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

function bumpCartIcon() {
  const count = document.getElementById('cartCount');
  count.classList.remove('bump');
  void count.offsetWidth; // reflow
  count.classList.add('bump');
  setTimeout(() => count.classList.remove('bump'), 350);
}

// Scroll reveal observer
function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// Ripple effect for buttons
function addRipple(btn) {
  btn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    const rect = this.getBoundingClientRect();
    ripple.style.left = (e.clientX - rect.left - 4) + 'px';
    ripple.style.top = (e.clientY - rect.top - 4) + 'px';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });
}