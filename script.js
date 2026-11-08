// TODO: Replace these with the club's official links before publishing.
    const CLUB_WHATSAPP_NUMBER = "6354291705"; // Replace with country code + number, digits only
    const CLUB_INSTAGRAM_URL = "https://www.instagram.com/teenagersclub.ac.in/#";
    const CLUB_FACEBOOK_URL = "https://www.facebook.com/c2r.bolls";
    const message = "Hi! I’m interested in joining Teenagers – The Celebration Club and would like to know more about Lakshmi Puja 2027.";
    const waUrl = `https://wa.me/${CLUB_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    document.querySelectorAll('.whatsapp-link').forEach(link => { link.href = waUrl; if (CLUB_WHATSAPP_NUMBER.includes('X')) { link.addEventListener('click', event => { event.preventDefault(); alert('Please add the club WhatsApp number in script.js before using this button.'); }); } });
    document.querySelector('.instagram-link').href = CLUB_INSTAGRAM_URL;
    document.querySelector('.facebook-link').href = CLUB_FACEBOOK_URL;
    document.getElementById('year').textContent = new Date().getFullYear();

    const root = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = (() => { try { return localStorage.getItem('lakshmi-theme'); } catch(e) { return null; } })();
    if (savedTheme === 'dark') root.setAttribute('data-theme','dark');
    function updateThemeButton(){const dark=root.getAttribute('data-theme')==='dark';themeToggle.textContent=dark?'☀':'☾';themeToggle.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode');}
    updateThemeButton();
    themeToggle.addEventListener('click',()=>{const dark=root.getAttribute('data-theme')==='dark';if(dark)root.removeAttribute('data-theme');else root.setAttribute('data-theme','dark');try{localStorage.setItem('lakshmi-theme',dark?'light':'dark')}catch(e){}updateThemeButton()});

    const menuToggle=document.getElementById('menuToggle'), navlinks=document.getElementById('navlinks');
    menuToggle.addEventListener('click',()=>{const open=navlinks.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));menuToggle.textContent=open?'✕':'☰'});
    navlinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{navlinks.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.textContent='☰'}));

    const backTop=document.getElementById('backTop'), progress=document.getElementById('progress');
    function onScroll(){const scrollable=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=(scrollable>0?(window.scrollY/scrollable)*100:0)+'%';backTop.classList.toggle('show',window.scrollY>420)}
    window.addEventListener('scroll',onScroll,{passive:true});onScroll();backTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
    const observer=('IntersectionObserver' in window)?new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12}):null;
    document.querySelectorAll('.reveal').forEach(el=>{if(observer)observer.observe(el);else el.classList.add('visible')});


// Personalised Lakshmi Puja invitation generator (client-side; no server required).
(() => {
  const form = document.getElementById('invitationForm');
  if (!form) return;

  const nameInput = document.getElementById('guestName');
  const error = document.getElementById('invitationError');
  const result = document.getElementById('invitationResult');
  const canvas = document.getElementById('invitationCanvas');
  const ctx = canvas.getContext('2d');
  const downloadButton = document.getElementById('downloadInvitation');
  const editButton = document.getElementById('editInvitation');
  const poster = new Image();
  poster.src = 'assets/lakshmi-puja-poster.png';

  let currentName = '';
  let posterReady = false;
  poster.addEventListener('load', () => { posterReady = true; });
  poster.addEventListener('error', () => {
    error.textContent = 'The invitation artwork could not be loaded. Please check that the assets folder is uploaded.';
  });

  function drawInvitation(name) {
    if (!posterReady) {
      error.textContent = 'The invitation is still loading. Please try again in a moment.';
      return false;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(poster, 0, 0, canvas.width, canvas.height);

    // Replace the original generic invitation line with the recipient's name.
    const band = ctx.createLinearGradient(215, 0, 810, 0);
    band.addColorStop(0, '#920700');
    band.addColorStop(.5, '#a00a00');
    band.addColorStop(1, '#920700');
    ctx.fillStyle = band;
    ctx.fillRect(215, 266, 594, 55);

    const displayText = `Cordially invites ${name}`;
    let fontSize = 36;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#fff4df';
    ctx.shadowColor = 'rgba(45, 0, 0, .28)';
    ctx.shadowBlur = 3;
    ctx.font = `500 ${fontSize}px Arial, sans-serif`;
    while (ctx.measureText(displayText).width > 570 && fontSize > 20) {
      fontSize -= 1;
      ctx.font = `500 ${fontSize}px Arial, sans-serif`;
    }
    ctx.fillText(displayText, 512, 294, 570);
    ctx.shadowBlur = 0;
    currentName = name;
    return true;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = nameInput.value.trim().replace(/\s+/g, ' ');
    if (!name) {
      error.textContent = 'Please enter your name first.';
      nameInput.focus();
      return;
    }
    if (!/^[\p{L}\p{M} .'-]+$/u.test(name)) {
      error.textContent = 'Please use letters in your name.';
      nameInput.focus();
      return;
    }
    error.textContent = '';
    if (drawInvitation(name)) {
      result.hidden = false;
      result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });

  downloadButton.addEventListener('click', () => {
    if (!currentName) return;
    const safeName = currentName.normalize('NFKD').replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase() || 'guest';
    const link = document.createElement('a');
    link.download = `lakshmi-puja-invitation-${safeName}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  });

  editButton.addEventListener('click', () => {
    result.hidden = true;
    nameInput.focus();
    document.getElementById('personal-invitation').scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
})();
