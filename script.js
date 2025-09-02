// ===== MODE JOUR / NUIT =====
const themeToggleBtn = document.querySelector('.theme-toggle');
const html = document.documentElement;

// Vérifier si l'utilisateur a déjà un thème enregistré
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  html.setAttribute('data-theme', savedTheme);

  // Changer icône
  if (themeToggleBtn) {
    themeToggleBtn.querySelector('span[aria-hidden]').textContent = savedTheme === 'dark' ? '🌙' : '☀️';
  }
}

// Fonction pour basculer le thème
function toggleTheme() {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);

  // Changer icône
  if (themeToggleBtn) {
    themeToggleBtn.querySelector('span[aria-hidden]').textContent = newTheme === 'dark' ? '🌙' : '☀️';
  }
}

// Événement clic sur le bouton
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', toggleTheme);
}

// ===== FOOTER ANNÉE AUTOMATIQUE =====
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// ===== ZOOM PHOTO DE PROFIL =====
const profilePic = document.getElementById('profile-pic');
if (profilePic) {
  // Créer l'overlay
  const overlay = document.createElement('div');
  overlay.id = 'pic-overlay';
  overlay.style.display = 'none';
  overlay.style.position = 'fixed';
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.background = 'rgba(0,0,0,0.8)';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  overlay.style.zIndex = '9999';
  overlay.style.cursor = 'zoom-out';

  // Image dans l'overlay
  const overlayImg = document.createElement('img');
  overlayImg.src = profilePic.src;
  overlayImg.alt = profilePic.alt;
  overlayImg.style.maxWidth = '90%';
  overlayImg.style.maxHeight = '90%';
  overlayImg.style.borderRadius = '10px';
  overlay.appendChild(overlayImg);

  document.body.appendChild(overlay);

  // Clic sur photo = afficher overlay
  profilePic.addEventListener('click', () => {
    overlay.style.display = 'flex';
  });

  // Clic sur overlay = fermer
  overlay.addEventListener('click', () => {
    overlay.style.display = 'none';
  });
}