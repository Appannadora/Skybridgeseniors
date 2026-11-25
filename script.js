// ===== MOBILE NAV TOGGLE =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu on link click (mobile)
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserver.unobserve(entry.target); // run once
    }
  });
}, {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px"
});

revealElements.forEach(el => revealObserver.observe(el));

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});

// ===== GOOGLE TRANSLATE INTEGRATION =====

// 1. Create a hidden div for the Google Translate widget
const translateDiv = document.createElement('div');
translateDiv.id = 'google_translate_element';
document.body.appendChild(translateDiv);

// 2. Load the Google Translate script dynamically
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    { pageLanguage: 'en', autoDisplay: false }, 
    'google_translate_element'
  );
}

// Inject the script tag
const script = document.createElement('script');
script.type = 'text/javascript';
script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
document.body.appendChild(script);

// 3. The function that gets called when you click a language
function changeLanguage(langCode, langLabel) {
  // Update the button text (e.g., from EN to FR)
  document.getElementById('current-lang').innerText = langLabel;

  // Find the hidden Google Translate dropdown
  const selectField = document.querySelector('.goog-te-combo');
  
  if (selectField) {
    selectField.value = langCode; // Set the language
    selectField.dispatchEvent(new Event('change')); // Trigger the translation
  } else {
    // If the script hasn't loaded yet, wait and try again
    setTimeout(() => changeLanguage(langCode, langLabel), 500);
  }
}