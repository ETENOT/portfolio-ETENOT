// Elements
const html = document.documentElement;
const themeBtn = document.querySelector('.theme-toggle');
const menuBtn = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const cvBtn = document.getElementById('cv-btn');
const toast = document.getElementById('toast');
const yearSpan = document.getElementById('year');

// Year
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// Theme: persist
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
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', ()=> nav.classList.remove('open')));

// Reveal on scroll & animate skill bars
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('in');
      // If section contains skill bars, animate them
      const bars = e.target.querySelectorAll('.progress');
      bars.forEach(b=>{
        const percent = Number(b.dataset.percent) || 0;
        const bar = b.querySelector('.bar i');
        const pct = b.querySelector('.pct');
        setTimeout(()=> {
          bar.style.width = percent + '%';
          if(pct) pct.textContent = percent + '%';
        }, 250);
      });
      observer.unobserve(e.target);
    }
  });
},{threshold:0.15});

document.querySelectorAll('.section, .hero').forEach(el => observer.observe(el));

// Toast for CV download
cvBtn?.addEventListener('click', (e)=>{
  showToast('📄 Téléchargement du CV… Merci !');
});
function showToast(text){
  if(!toast) return;
  toast.textContent = text;
  toast.classList.add('show');
  setTimeout(()=> toast.classList.remove('show'), 2400);
}

// Profile image click -> lightbox
const profile = document.getElementById('profile-pic');
if(profile){
  profile.style.cursor = 'zoom-in';
  profile.addEventListener('click', ()=>{
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.85);z-index:9999';
    const img = document.createElement('img');
    img.src = profile.src; img.alt = profile.alt;
    img.style.maxWidth = '92%'; img.style.maxHeight = '92%'; img.style.borderRadius = '12px';
    overlay.appendChild(img);
    overlay.addEventListener('click', ()=> overlay.remove());
    document.body.appendChild(overlay);
  });
}

// Contact form (mailto fallback)
const form = document.getElementById('contact-form');
form?.addEventListener('submit', (e)=>{
  e.preventDefault();
  const name = encodeURIComponent(form.name.value.trim());
  const mail = encodeURIComponent(form.email.value.trim());
  const msg  = encodeURIComponent(form.message.value.trim());
  const body = `De: ${name} (%20${mail})%0D%0A%0D%0A${msg}`;
  window.location.href = `mailto:karimekg92@gmail.com?subject=Contact%20depuis%20portfolio&body=${body}`;
});
