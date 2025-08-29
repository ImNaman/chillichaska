
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

// Google Maps lazy loading with IntersectionObserver
const mapContainer = document.getElementById('map-container');
if (mapContainer) {
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.7698489179893!2d77.6338857!3d12.922508599999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15006813f531%3A0x81819a487ec0287a!2sChilli%20Chaska!5e0!3m2!1sen!2sin!4v1756024078701!5m2!1sen!2sin";
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Create and inject the iframe
        const iframe = document.createElement('iframe');
        iframe.src = mapUrl;
        iframe.width = "600";
        iframe.height = "450";
        iframe.style.border = "0";
        iframe.allowFullscreen = "";
        iframe.loading = "lazy";
        iframe.referrerPolicy = "no-referrer-when-downgrade";
        iframe.title = "Chilli Chaska Location on Google Maps";
        
        // Add the iframe to the container
        mapContainer.appendChild(iframe);
        
        // Once iframe loads, fade out placeholder and fade in iframe
        iframe.addEventListener('load', () => {
          const placeholder = mapContainer.querySelector('.map-placeholder');
          if (placeholder) {
            placeholder.classList.add('loaded');
          }
          iframe.classList.add('loaded');
        });
        
        // Stop observing after iframe is created
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: "1200px" // Start loading 1200px before the element comes into view
  });
  
  observer.observe(mapContainer);
}
