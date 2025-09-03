// Elements
const html = document.documentElement;
const themeBtn = document.querySelector('.theme-toggle');
const menuBtn = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const cvButtons = document.querySelectorAll('#cv-btn, #cv-btn-hero');
const toast = document.getElementById('toast');
const yearEl = document.getElementById('year');

// Year
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Theme (persist)
const saved = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', saved);
updateThemeIcon(saved);
function updateThemeIcon(t){
  if(!themeBtn) return;
  themeBtn.innerHTML = t === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
}
themeBtn?.addEventListener('click', ()=>{
  const current = html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
});

// Mobile menu
menuBtn?.addEventListener('click', ()=>{
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open?'true':'false');
});

// Close mobile menu on nav click
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', ()=> nav.classList.remove('open')));

// Toast when CV downloaded
cvButtons.forEach(btn => {
  btn?.addEventListener('click', (e) => {
    showToast('📄 Téléchargement du CV… Merci !');
    // allow the download to proceed; toast is only visual
  });
});
function showToast(text){
  if(!toast) return;
  toast.textContent = text;
  toast.classList.add('show');
  setTimeout(()=> toast.classList.remove('show'), 2400);
}

// Reveal + animate skill bars when visible
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('in');
      // animate skill bars inside
      const bars = entry.target.querySelectorAll('.skill-bar');
      bars.forEach(bar => {
        const percent = bar.dataset.percent || bar.getAttribute('data-percent') || 0;
        const filler = bar.querySelector('i');
        if(filler) filler.style.width = percent + '%';
      });
      observer.unobserve(entry.target);
    }
  });
},{threshold:0.15});

document.querySelectorAll('.section, .hero').forEach(el => observer.observe(el));

// Profile image lightbox
const profile = document.getElementById('profile-pic');
if(profile){
  profile.style.cursor = 'zoom-in';
  profile.addEventListener('click', ()=>{
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.85);z-index:9999';
    const img = document.createElement('img');
    img.src = profile.src; img.alt = profile.alt;
    img.style.maxWidth = '92%'; img.style.maxHeight = '92%'; img.style.borderRadius='12px';
    overlay.appendChild(img);
    overlay.addEventListener('click', ()=> overlay.remove());
    document.body.appendChild(overlay);
  });
}

// Contact form -> mailto fallback
const form = document.getElementById('contact-form');
form?.addEventListener('submit', (e)=>{
  e.preventDefault();
  const name = encodeURIComponent(form.name.value.trim());
  const mail = encodeURIComponent(form.email.value.trim());
  const msg  = encodeURIComponent(form.message.value.trim());
  const body = `De: ${name} (%20${mail})%0D%0A%0D%0A${msg}`;
  window.location.href = `mailto:karimekg92@gmail.com?subject=Contact%20depuis%20portfolio&body=${body}`;
});
