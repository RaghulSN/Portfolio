// ----------------------------
// SPA Navigation
// ----------------------------
const navBtns = document.querySelectorAll(".nav-btn");
const sections = document.querySelectorAll(".page-section");

navBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    // Switch active nav
    navBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    // Show selected section
    sections.forEach(sec => sec.classList.remove("active"));
    document.getElementById(btn.dataset.section).classList.add("active");
  });
});

// ----------------------------
// Fullscreen Toggle
// ----------------------------
const fsBtn = document.getElementById("fullscreen-btn");
fsBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

// ----------------------------
// Theme Toggle
// ----------------------------
const themeBtn = document.getElementById("theme-btn");
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
});

// ----------------------------
// Portfolio Drawer
// ----------------------------
const drawerToggle = document.getElementById("drawer-toggle");
const drawer = document.getElementById("drawer");
const drawerClose = document.getElementById("drawer-close");

drawerToggle.addEventListener("click", () => drawer.classList.add("open"));
drawerClose.addEventListener("click", () => drawer.classList.remove("open"));

// ----------------------------
// Portfolio Scroll Progress + Back-to-top
// ----------------------------
const portfolio = document.getElementById("portfolio");
const progressBar = document.getElementById("progress-bar");
const backToTop = document.getElementById("back-to-top");

portfolio.addEventListener("scroll", () => {
  const scrollTop = portfolio.scrollTop;
  const scrollHeight = portfolio.scrollHeight - portfolio.clientHeight;
  const progress = (scrollTop / scrollHeight) * 100;
  progressBar.style.width = progress + "%";

  // Back to top toggle
  backToTop.style.display = scrollTop > 200 ? "block" : "none";
});

backToTop.addEventListener("click", () => {
  portfolio.scrollTo({ top: 0, behavior: "smooth" });
});
