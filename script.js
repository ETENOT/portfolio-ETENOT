// Affiche l'année dynamique
document.getElementById('year').textContent = new Date().getFullYear();

// Menu mobile (hamburger)
const burger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');
burger?.addEventListener('click', () => {
  const visible = nav.style.display !== 'flex';
  nav.style.display = visible ? 'flex' : 'none';
  burger.setAttribute('aria-expanded', visible ? 'true' : 'false');
});

// Gestion des notifications (Toast)
const toast = document.getElementById('toast');
let toastLock = false;
function showToast(message, ms = 2200){
  if(toastLock) return;
  toastLock = true;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(()=>{
    toast.classList.remove('show');
    toastLock = false;
  }, ms);
}

// Boutons de téléchargement CV
document.querySelectorAll('#download-cv, #download-cv-2').forEach(btn=>{
  btn?.addEventListener('click', ()=>{
    showToast('📄 Téléchargement du CV lancé — merci !');
  });
});

// Animation d'apparition (Reveal on scroll)
const revealObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('show');
      revealObserver.unobserve(entry.target);
    }
  });
},{threshold:0.16});
document.querySelectorAll('.card, .hero-left, .hero-right, .about-left, .about-right, .skill-block, .project, .contact-card, .contact-form').forEach(el=>{
  revealObserver.observe(el);
});

// Animation des barres de compétences avec pourcentage
function animateSkillBars(){
  document.querySelectorAll('.skill-bar').forEach(bar=>{
    const fill = bar.querySelector('.fill');
    const percent = Number(bar.dataset.percent || 0);
    setTimeout(()=> fill.style.width = percent + '%', 150);
    const valBox = bar.parentElement?.querySelector('.skill-value');
    if(valBox){
      let start = 0;
      const duration = 1200;
      const stepTime = 16;
      const steps = Math.round(duration / stepTime);
      const increment = percent / steps;
      const interval = setInterval(()=>{
        start = Math.min(percent, +(start + increment).toFixed(1));
        valBox.textContent = Math.round(start) + '%';
        if(start >= percent) clearInterval(interval);
      }, stepTime);
    }
  });
}

// Lance l'animation des compétences quand la section est visible
const skillsSection = document.getElementById('competences');
if(skillsSection){
  const obs = new IntersectionObserver((entries)=>{
    if(entries[0].isIntersecting){
      animateSkillBars();
      obs.disconnect();
    }
  },{threshold:0.25});
  obs.observe(skillsSection);
}

// Agrandissement de la photo de profil (lightbox)
const profileImg = document.getElementById('profile-img');
if(profileImg){
  profileImg.style.cursor = 'zoom-in';
  profileImg.addEventListener('click', ()=>{
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.86);z-index:9999;cursor:zoom-out';
    const img = document.createElement('img');
    img.src = profileImg.src;
    img.alt = profileImg.alt || 'Profil';
    img.style.maxWidth = '92%';
    img.style.maxHeight = '92%';
    img.style.borderRadius = '10px';
    overlay.appendChild(img);
    overlay.addEventListener('click', ()=> overlay.remove());
    document.body.appendChild(overlay);
  });
}
