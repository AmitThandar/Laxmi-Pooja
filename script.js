// TODO: Replace these with the club's official links before publishing.
    const CLUB_WHATSAPP_NUMBER = "6354291705"; // Replace with country code + number, digits only
    const CLUB_INSTAGRAM_URL = "https://www.instagram.com/teenagersclub.ac.in/#";
    const CLUB_FACEBOOK_URL = "https://www.facebook.com/c2r.bolls";
    const message = "Hi! I’m interested in joining Teenagers – The Celebration Club and would like to know more about Lakshmi Puja 2026.";
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
