
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const burger = document.getElementById('hamburger');
const links = document.getElementById('navlinks');

function closeMenu(){
  if (!links) return;
  links.classList.remove('open');
  if (burger) burger.setAttribute('aria-expanded','false');
  document.removeEventListener('click', onDocClick);
  document.removeEventListener('keydown', onKey);
}

function onDocClick(e){
  if (!links.contains(e.target) && e.target !== burger) closeMenu();
}
function onKey(e){
  if (e.key === 'Escape') closeMenu();
}

if (burger && links){
  burger.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open){
      setTimeout(() => { document.addEventListener('click', onDocClick); document.addEventListener('keydown', onKey); }, 0);
    } else {
      closeMenu();
    }
  });

  // Close menu when a nav link is clicked
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
}
