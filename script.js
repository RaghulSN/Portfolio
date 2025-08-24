/* script.js - SPA: About / Portfolio / Resume
   - Put your assets in /assets (profile.jpg, Raghul_S_Nair_Resume.pdf)
   - Drawer links are auto-populated from portfolio .card[id]
*/

// elements
const navBtns = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.page-section');
const drawerToggle = document.getElementById('drawer-toggle');
const drawer = document.getElementById('drawer');
const drawerClose = document.getElementById('drawer-close');
const mainBody = document.body;
const progressBar = document.getElementById('progress-bar');
const backTop = document.getElementById('back-to-top');
const portfolioSection = document.getElementById('portfolio');
const resumeBox = document.querySelector('.resume-box');

// show a section (SPA, instant slide)
function showSection(id) {
  sections.forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  // nav active
  navBtns.forEach(b => b.classList.toggle('active', b.dataset.section === id));

  // reset scroll for shown section
  const sec = document.getElementById(id);
  if (sec) sec.scrollTop = 0;

  // drawer & helpers only for portfolio
  if (id === 'portfolio') {
    // show drawer button (CSS may also hide/show by width)
    if (drawerToggle) drawerToggle.style.display = '';
    // ensure progress bar visible and reset
    if (progressBar) progressBar.style.width = '0%';
  } else {
    // hide drawer button and close drawer if open
    if (drawerToggle) drawerToggle.style.display = 'none';
    drawer.classList.remove('open');
    mainBody.classList.remove('drawer-open');
    // hide progress/back-top
    if (progressBar) progressBar.style.width = '0%';
    if (backTop) backTop.style.display = 'none';
  }
}

// nav buttons
navBtns.forEach(btn => btn.addEventListener('click', () => showSection(btn.dataset.section)));

// hero CTA buttons that reference data-section
document.querySelectorAll('.btn[data-section]').forEach(b => {
  b.addEventListener('click', () => {
    const sec = b.dataset.section;
    if (sec) showSection(sec);
  });
});

// default landing page
showSection('about');

// Fullscreen toggle (top-right)
document.getElementById('fullscreen-btn').addEventListener('click', () => {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(()=>{});
  else document.exitFullscreen().catch(()=>{});
});

// theme (dark/light)
const themeBtn = document.getElementById('theme-btn');
themeBtn.addEventListener('click', () => {
  mainBody.classList.toggle('light');
  themeBtn.textContent = mainBody.classList.contains('light') ? '☀️' : '🌙';
});

// Drawer open/close
if (drawerToggle) {
  drawerToggle.addEventListener('click', () => {
    drawer.classList.add('open');
    mainBody.classList.add('drawer-open');
    drawer.setAttribute('aria-hidden','false');
  });
}
if (drawerClose) {
  drawerClose.addEventListener('click', () => {
    drawer.classList.remove('open');
    mainBody.classList.remove('drawer-open');
    drawer.setAttribute('aria-hidden','true');
  });
}
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { drawer.classList.remove('open'); mainBody.classList.remove('drawer-open'); } });

// populate drawer from portfolio card headings
function populateDrawer() {
  const nav = document.getElementById('drawer-nav');
  if (!nav) return;
  nav.innerHTML = '';
  const cards = Array.from(document.querySelectorAll('#portfolio .card[id]'));
  cards.forEach(card => {
    const a = document.createElement('a');
    a.href = '#';
    a.textContent = card.querySelector('h2')?.textContent || card.id;
    a.addEventListener('click', (ev) => {
      ev.preventDefault();
      const top = card.offsetTop;
      portfolioSection.scrollTo({ top: top - 8, behavior: 'smooth' });
      drawer.classList.remove('open');
      mainBody.classList.remove('drawer-open');
    });
    nav.appendChild(a);
  });
}
populateDrawer();

// portfolio progress + back to top
if (portfolioSection) {
  portfolioSection.addEventListener('scroll', () => {
    const st = portfolioSection.scrollTop;
    const sh = portfolioSection.scrollHeight - portfolioSection.clientHeight;
    const pct = sh > 0 ? (st / sh) * 100 : 0;
    progressBar.style.width = pct + '%';
    backTop.style.display = st > 220 ? 'block' : 'none';
  });
}
if (backTop) backTop.addEventListener('click', () => portfolioSection.scrollTo({ top: 0, behavior: 'smooth' }));

// resume box controls
document.getElementById('resume-fullscreen')?.addEventListener('click', () => {
  if (!document.fullscreenElement) resumeBox.requestFullscreen().catch(()=>{});
  else document.exitFullscreen().catch(()=>{});
});
document.getElementById('resume-theme')?.addEventListener('click', () => {
  resumeBox.classList.toggle('light-resume');
});

// simple role rotator for About hero
(function roleRotator(){
  const roles = ['Data Scientist','ML Engineer','Data Analyst'];
  const el = document.getElementById('role-rotator');
  if (!el) return;
  let i = 0, j = 0, deleting = false;
  function tick() {
    const current = roles[i];
    el.textContent = current.slice(0, j);
    if (!deleting) {
      if (j++ < current.length) setTimeout(tick, 70);
      else { deleting = true; setTimeout(tick, 900); }
    } else {
      if (j-- > 0) setTimeout(tick, 40);
      else { deleting = false; i = (i+1) % roles.length; setTimeout(tick, 200); }
    }
  }
  tick();
})();
