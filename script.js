// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu
const burger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
burger?.addEventListener('click', () => {
  const open = menu.classList.toggle('show');
  burger.setAttribute('aria-expanded', open ? 'true' : 'false');
});

// Toast CV
const toast = document.getElementById('toast');
document.getElementById('cvBtn')?.addEventListener('click', () => {
  toast.textContent = 'Téléchargement du CV… Merci !';
  toast.classList.add('show');
  setTimeout(()=> toast.classList.remove('show'), 2500);
});

// Reveal on scroll
const io = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('show'); io.unobserve(e.target); }
  });
},{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Animate skill bars
function animateBars(){
  document.querySelectorAll('.bar').forEach(bar=>{
    const val = bar.getAttribute('data-value') || "0";
    requestAnimationFrame(()=>{ bar.style.setProperty('--val', val); });
  });
}
const skills = document.getElementById('skills');
if(skills){
  const once = new IntersectionObserver((ents)=>{
    if(ents.some(e=>e.isIntersecting)){ animateBars(); once.disconnect(); }
  },{threshold:.25});
  once.observe(skills);
}
