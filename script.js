// Portfolio Enhancement Script
// Handles theme toggle, mobile menu, form, parallax, AOS init

// Theme Toggle
const html = document.documentElement;
const themeToggle = document.getElementById('theme-toggle'); // Will add in HTML

function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  if (themeToggle) themeToggle.checked = savedTheme === 'light';
}

function toggleTheme() {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

// Mobile Menu - Fixed Hamburger
const hamburger = document.querySelector('.nav-toggle .invert img');
const closeBtn = document.querySelector('.close_svg img');
const mobileMenu = document.querySelector('.locator');

function toggleMobileMenu() {
  mobileMenu.classList.toggle('active');
  document.body.classList.toggle('menu-open');
}

// Close menu on overlay click
mobileMenu.addEventListener('click', (e) => {
  if (e.target === mobileMenu) toggleMobileMenu();
});

// Form Submission
const form = document.forms['google-sheet'];
const scriptURL = 'https://script.google.com/macros/s/AKfycbzxKrUsuskHNsSrDzSeJBel7yyXq1XOJBZlkUaIBI299TodGPdOmK1gpOGawd5ZTPPt/exec';

form.addEventListener('submit', e => {
  e.preventDefault();
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.innerHTML = 'Sending...';
  submitBtn.disabled = true;
  
  const formData = new FormData(form);
  fetch(scriptURL, { method: 'POST', body: formData })
    .then(() => {
      // Success message instead of alert
      const successMsg = document.createElement('div');
      successMsg.className = 'success-message';
      successMsg.innerHTML = 'Thank you for contacting! We will reach out soon.';
      form.parentNode.appendChild(successMsg);
      form.reset();
      submitBtn.innerHTML = 'Message Sent!';
      setTimeout(() => {
        successMsg.remove();
        submitBtn.innerHTML = 'Send Message';
        submitBtn.disabled = false;
      }, 4000);
    })
    .catch(error => {
      console.error('Error!', error);
      const errorMsg = document.createElement('div');
      errorMsg.className = 'error-message';
      errorMsg.innerHTML = 'Submission failed. Try again later.';
      form.parentNode.appendChild(errorMsg);
      submitBtn.innerHTML = 'Send Message';
      submitBtn.disabled = false;
      setTimeout(() => errorMsg.remove(), 4000);
    });
});

// Parallax Hero Image (lite)
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroImg = document.querySelector('.content_image img');
  if (heroImg) {
    heroImg.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Form Validation
// Form Validation (disabled initially)
const submitBtn = form.querySelector('button[type="submit"]');
submitBtn.disabled = false; // Always enabled

// Smooth Scroll for Nav Links + Auto Close Sidebar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // Close mobile menu on click
    toggleMobileMenu();
  });
});

// Init on DOM Load
document.addEventListener('DOMContentLoaded', () => {
  // Fix hamburger selector
  const hamburger = document.querySelector('.nav-toggle .invert img') || document.querySelector('.invert img');
  const closeBtn = document.querySelector('.close_svg img') || document.querySelector('.close_svg');
  
  if (hamburger) hamburger.addEventListener('click', toggleMobileMenu);
  if (closeBtn) closeBtn.addEventListener('click', toggleMobileMenu);
  
  // Typed.js (existing)
  if (typeof Typed !== 'undefined') {
    new Typed('#element', {
      strings: ['Java programmer', 'FullStack Developer'],
      typeSpeed: 50,
    });
  }

  // AOS Init (if CDN loaded)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });
  }

  initTheme();
  // Initial menu state
  if (mobileMenu) mobileMenu.style.display = 'none';
});

// Event Listeners
if (hamburger) hamburger.addEventListener('click', toggleMobileMenu);
if (closeBtn) closeBtn.addEventListener('click', toggleMobileMenu);
if (themeToggle) themeToggle.addEventListener('change', toggleTheme);

// Fix theme toggle for name visibility (re-init on theme change)
themeToggle.addEventListener('change', toggleTheme);
document.addEventListener('themechange', initTheme);

window.addEventListener('load', () => {
  // Fade out loading screen
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.style.opacity = '0';
    setTimeout(() => loader.remove(), 500);
  }
});

