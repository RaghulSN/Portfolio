/* -----------------------------
   GLOBAL STYLES
----------------------------- */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

:root {
  --accent: #3498db;
  --text-light: #fff;
  --text-dark: #111;
  --footer-height: 40px;
}

/* Reset & body */
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  font-family: 'Roboto', sans-serif;
  overflow: hidden;
  color: var(--text-light);
}
body.light { color: var(--text-dark); }

/* Wallpaper background */
body::before {
  content: "";
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: url('assets/wallpaper.jpg') center/cover no-repeat;
  z-index: -2;
}

/* Overlay gradients */
#about::before, #portfolio::before {
  content: "";
  position: absolute; top:0;left:0;right:0;bottom:0;
  z-index:-1;
  background: linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.2));
}
#resume::before {
  content: "";
  position: absolute; top:0;left:0;right:0;bottom:0;
  z-index:-1;
  background: rgba(0,0,0,0.35);
}

/* Header */
header {
  position: fixed; top:0; left:0; right:0; height:60px;
  display:flex; justify-content:space-between; align-items:center;
  padding:0 20px; z-index:1000;
  background: rgba(0,0,0,0.5);
}
.logo { font-family: cursive; font-size:1.5em; }
.nav-links { display:flex; gap:15px; }
.nav-btn {
  background:transparent; border:none; color:inherit;
  padding:6px 12px; border-radius:6px; cursor:pointer;
  transition: background 0.3s;
}
.nav-btn.active { background: var(--accent); color:#fff; }
.controls button { margin-left:10px; cursor:pointer; background:transparent; border:none; font-size:1.2em; }

/* Sections */
.page-section { display:none; position:relative; height:100%; overflow-y:auto; padding:80px 20px 60px; }
.page-section.active { display:block; }

/* About content */
.about-content { display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; text-align:center; }
.profile-pic { width:120px; height:120px; border-radius:50%; margin-bottom:15px; }
.social-links { margin-top:10px; display:flex; gap:15px; font-size:1.5em; }

/* Portfolio drawer & progress */
#progress-bar { position:fixed; top:60px; left:0; height:4px; width:0%; background:var(--accent); z-index:100; }
#drawer-toggle { position:fixed; top:70px; left:20px; font-size:1.5em; background:transparent; border:none; z-index:200; cursor:pointer; }
#drawer { position:fixed; top:0; left:-250px; width:250px; height:100%; background:rgba(0,0,0,0.9); padding:20px; transition:0.3s; z-index:300; }
#drawer.open { left:0; }
#drawer ul { list-style:none; margin-top:60px; }
#drawer li { margin-bottom:15px; }
#drawer a { color:#fff; text-decoration:none; }
#drawer-close { position:absolute; top:20px; right:20px; background:transparent; border:none; font-size:1.5em; color:#fff; cursor:pointer; }
.portfolio-content { max-width:800px; margin:auto; }
#back-to-top { position:fixed; bottom:60px; right:20px; display:none; background:var(--accent); border:none; padding:10px 15px; border-radius:50%; font-size:1.2em; color:#fff; cursor:pointer; }

/* Resume */
.resume-container { display:flex; flex-direction:column; align-items:center; gap:15px; }
.resume-frame { width:80%; height:80vh; border:none; }
.download-btn { background:var(--accent); color:#fff; padding:10px 20px; border-radius:8px; text-decoration:none; }

/* Footer */
footer { position:fixed; bottom:0; left:0; right:0; height:var(--footer-height); display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,0.5); }
