// ===== Consts =====
const html = document.documentElement;
const themeBtn = document.querySelector('.theme-toggle');
const yearSpan = document.getElementById('year');
const menuBtn = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const cvBtn = document.getElementById('cv-btn');
const toast = document.getElementById('toast');

// ===== Year =====
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// ===== Theme (persist) =====
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

function updateThemeIcon(theme){
  if (!themeBtn) return;
  themeBtn.innerHTML = theme === 'dark'
    ? '<i class="fa-solid fa-sun"></i><span class="sr-only">Passer en clair</span>'
    : '<i class="fa-solid fa-moon"></i><span class="sr-only">Passer en sombre</span>';
}
themeBtn?.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
});

// ===== Mobile menu =====
menuBtn?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
});

// Close menu when clicking a link (mobile)
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => nav.classList.remove('open'));
});

// ===== Smooth “reveal” on scroll =====
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
  });
},{threshold:.14});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// ===== Hero small typing effect (optional basic) =====
// You can expand this later if you want a full typewriter effect.

// ===== Contact form (simple mailto fallback) =====
const form = document.getElementById('contact-form');
form?.addEventListener('submit', (e)=>{
  e.preventDefault();
  const name = encodeURIComponent(form.name.value.trim());
  const mail = encodeURIComponent(form.email.value.trim());
  const msg  = encodeURIComponent(form.message.value.trim());
  const body = `De: ${name} (%20${mail})%0D%0A%0D%0A${msg}`;
  window.location.href = `mailto:karimekg92@gmail.com?subject=Contact%20depuis%20le%20portfolio&body=${body}`;
});

// ===== Toast on CV download =====
cvBtn?.addEventListener('click', ()=>{
  showToast('📄 Téléchargement du CV… Merci !');
});
function showToast(text){
  if(!toast) return;
  toast.textContent = text;
  toast.classList.add('show');
  setTimeout(()=>toast.classList.remove('show'), 2200);
}

// ===== Profile zoom (overlay lightbox) =====
const profilePic = document.getElementById('profile-pic');
if (profilePic){
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    display:none;position:fixed;inset:0;z-index:9999;
    background:rgba(0,0,0,.85);justify-content:center;align-items:center;cursor:zoom-out
  `;
  const img = document.createElement('img');
  img.src = profilePic.src; img.alt = profilePic.alt;
  img.style.cssText = 'max-width:92%;max-height:92%;border-radius:14px';
  overlay.appendChild(img);
  document.body.appendChild(overlay);

  profilePic.addEventListener('click', ()=> overlay.style.display = 'flex');
  overlay.addEventListener('click', ()=> overlay.style.display = 'none');
}
