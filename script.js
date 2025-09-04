// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu toggle
const burger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');
burger?.addEventListener('click', () => {
  const visible = nav.style.display !== 'flex';
  nav.style.display = visible ? 'flex' : 'none';
  burger.setAttribute('aria-expanded', visible ? 'true' : 'false');
});

// Toast helper
const toast = document.getElementById('toast');
function showToast(message, ms = 2200){
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(()=> toast.classList.remove('show'), ms);
}

// CV download: show toast on click (both buttons)
document.querySelectorAll('#download-cv, #download-cv-2').forEach(btn=>{
  btn?.addEventListener('click', (e)=>{
    // allow default download behavior; just show toast
    showToast('📄 Téléchargement du CV lancé — merci !');
  });
});

// Reveal on scroll
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

// Animate skill bars and show percentage as they animate
function animateSkillBars(){
  document.querySelectorAll('.skill-bar').forEach(bar=>{
    const fill = bar.querySelector('.fill');
    const percent = Number(bar.dataset.percent || 0);
    // animate width
    requestAnimationFrame(()=> {
      fill.style.width = percent + '%';
    });
    // add a small label inside/right (if not already)
    const wrapper = bar.parentElement;
    if(wrapper){
      const valBox = wrapper.querySelector('.skill-value');
      if(valBox){
        // animate number from 0 to percent
        let start = 0;
        const duration = 900;
        const stepTime = 16;
        const steps = Math.round(duration / stepTime);
        const increment = percent / steps;
        const interval = setInterval(()=>{
          start = Math.min(percent, +(start + increment).toFixed(1));
          valBox.textContent = (Math.round(start) + '%');
          if(start >= percent) clearInterval(interval);
        }, stepTime);
      }
    }
  });
}

// Observe skills section, then animate once
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

// Make profile image clickable (lightbox)
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
