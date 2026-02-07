document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const navButtons = document.querySelectorAll('[data-target]');
    const views = document.querySelectorAll('.view-section');
    const themeToggle = document.getElementById('theme-toggle');
    const fullscreenToggle = document.getElementById('fullscreen-toggle');
    const portfolioView = document.getElementById('portfolio-view');
    const progressBar = document.getElementById('progress-bar');
    const subLinks = document.querySelectorAll('.sub-link');
    const sections = document.querySelectorAll('.section');

    // PDF Controls
    const pdfContainer = document.getElementById('pdf-container');
    const btnFullscreen = document.getElementById('pdf-fullscreen');

    // --- Tab Switching Logic ---
    // --- Tab Switching Logic ---
    let currentViewIndex = 0;
    const viewOrder = ['home-view', 'portfolio-view', 'resume-view', 'contact-view'];

    function updateNavIndicator(targetBtn) {
        const indicator = document.querySelector('.nav-indicator');
        if (indicator && targetBtn) {
            indicator.style.width = `${targetBtn.offsetWidth}px`;
            indicator.style.left = `${targetBtn.offsetLeft}px`;
        }
    }

    // Initialize indicator on load
    const activeBtn = document.querySelector('.nav-btn.active');
    if (activeBtn) updateNavIndicator(activeBtn);

    function switchView(targetId) {
        if (!targetId) return;

        const targetIndex = viewOrder.indexOf(targetId);
        if (targetIndex === -1 || targetIndex === currentViewIndex) return;

        const direction = targetIndex > currentViewIndex ? 'next' : 'prev';
        const currentView = document.querySelector('.view-section.active');
        const targetView = document.getElementById(targetId);

        if (currentView && targetView) {
            // Remove old animation classes
            currentView.classList.remove('slide-in-from-right', 'slide-in-from-left', 'slide-out-left', 'slide-out-right', 'active');
            targetView.classList.remove('slide-in-from-right', 'slide-in-from-left', 'slide-out-left', 'slide-out-right');

            // Add new animation classes
            if (direction === 'next') {
                currentView.classList.add('slide-out-left');
                targetView.classList.add('slide-in-from-right');
            } else {
                currentView.classList.add('slide-out-right');
                targetView.classList.add('slide-in-from-left');
            }

            targetView.classList.add('active');

            // Clean up classes after animation
            setTimeout(() => {
                currentView.classList.remove('slide-out-left', 'slide-out-right');
                targetView.classList.remove('slide-in-from-right', 'slide-in-from-left');
            }, 500);

            currentViewIndex = targetIndex;

            // Scroll Reset
            const scrollContainer = targetView.querySelector('.content-scroll-container');
            if (scrollContainer) {
                scrollContainer.scrollTop = 0;
            } else {
                // Fallback for views without internal scroll (e.g. Home if simplified)
                targetView.scrollTop = 0;
            }
        }

        // Update Nav State
        navButtons.forEach(btn => {
            const btnTarget = btn.getAttribute('data-target');
            if (btnTarget === targetId) {
                if (btn.classList.contains('nav-btn')) {
                    btn.classList.add('active');
                    updateNavIndicator(btn);
                }
            } else {
                if (btn.classList.contains('nav-btn')) {
                    btn.classList.remove('active');
                }
            }
        });
    }

    navButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = btn.getAttribute('data-target');
            switchView(targetId);
        });
    });

    // --- Sub-Nav Click Handlers (Portfolio internal scroll) ---
    subLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1); // Remove #
            const targetSection = document.getElementById(targetId);
            const scrollContainer = document.querySelector('.portfolio-scroll-container');

            if (targetSection && scrollContainer) {
                const offsetTop = targetSection.offsetTop - 80; // Account for sticky sub-nav
                scrollContainer.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });


    // --- Internal Navigation (Sub-Nav) ---
    subLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            const scrollContainer = portfolioView.querySelector('.portfolio-scroll-container');

            if (targetSection && scrollContainer) {
                // Calculation changes due to scroll container context
                const offsetTop = targetSection.offsetTop - 100; // Adjust buffer
                scrollContainer.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Theme Toggle Logic (Circular Reveal) ---
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    }

    themeToggle.addEventListener('click', (event) => {
        const isLight = document.body.classList.contains('light-mode');
        const nextTheme = isLight ? 'dark' : 'light';

        // Fallback for browsers without View Transitions
        if (!document.startViewTransition) {
            document.body.classList.toggle('light-mode');
            localStorage.setItem('theme', nextTheme);
            return;
        }

        // Get click position for the transition center
        const x = event.clientX;
        const y = event.clientY;
        const endRadius = Math.hypot(
            Math.max(x, innerWidth - x),
            Math.max(y, innerHeight - y)
        );

        // Perform the transition
        const transition = document.startViewTransition(() => {
            document.body.classList.toggle('light-mode');
            localStorage.setItem('theme', nextTheme);
        });

        // Provide the animation details
        transition.ready.then(() => {
            document.documentElement.animate(
                {
                    clipPath: [
                        `circle(0px at ${x}px ${y}px)`,
                        `circle(${endRadius}px at ${x}px ${y}px)`
                    ]
                },
                {
                    duration: 500,
                    easing: 'ease-in-out',
                    pseudoElement: '::view-transition-new(root)',
                }
            );
        });
    });

    // --- Global Fullscreen Toggle Logic ---
    fullscreenToggle.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log(`Error attempting to enable full-screen mode: ${err.message}`);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    });

    // --- PDF Controls Logic ---
    if (pdfContainer && btnFullscreen) {
        // Fullscreen for PDF container ONLY
        btnFullscreen.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent bubbling layout issues
            if (!document.fullscreenElement) {
                pdfContainer.requestFullscreen().catch(err => {
                    console.log(`Error attempting to enable full-screen mode: ${err.message}`);
                });
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
            }
        });
    }


    // --- Scroll Progress Bar & Active Sub-Nav ---
    // --- Scroll Progress Bar & Active Sub-Nav ---
    const scrollContainer = portfolioView ? portfolioView.querySelector('.portfolio-scroll-container') : null;

    if (scrollContainer) {
        scrollContainer.addEventListener('scroll', () => {
            // 1. Progress Bar width
            const scrollTop = scrollContainer.scrollTop;
            const scrollHeight = scrollContainer.scrollHeight - scrollContainer.clientHeight;
            const scrollPercent = (scrollTop / scrollHeight) * 100;
            if (progressBar) {
                progressBar.style.width = scrollPercent + '%';
            }

            // 2. Highlight active sub-link
            let current = '';

            sections.forEach(section => {
                // Calculate position relative to container
                const sectionTop = section.offsetTop;
                // Offset logic:
                if (scrollTop >= (sectionTop - 300)) {
                    current = section.getAttribute('id');
                }
            });

            // Special check: if at bottom of page
            if ((scrollContainer.scrollHeight - scrollContainer.scrollTop) <= (scrollContainer.clientHeight + 50)) {
                if (sections.length > 0) {
                    current = sections[sections.length - 1].getAttribute('id');
                }
            }


            subLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });

            // 3. Scroll To Top Button Logic
            // Note: Define variable outside if needed, or query every time (minimal impact)
            const scrollToTopBtn = document.getElementById('scroll-to-top');
            if (scrollToTopBtn) {
                if (scrollTop > 300) {
                    scrollToTopBtn.classList.add('visible');
                } else {
                    scrollToTopBtn.classList.remove('visible');
                }
            }
        });

        // Click Listener for Scroll To Top (Outside scroll event)
        const scrollToTopBtn = document.getElementById('scroll-to-top');
        if (scrollToTopBtn) {
            scrollToTopBtn.addEventListener('click', () => {
                scrollContainer.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }


    // --- Certificate Modal Logic ---
    const modal = document.getElementById("cert-modal");
    const modalImg = document.getElementById("modal-img");
    const captionText = document.getElementById("modal-caption");
    const closeBtn = document.getElementsByClassName("modal-close")[0];

    // Select all cards that have data-full attribute
    const certCards = document.querySelectorAll('.cert-card[data-full]');

    certCards.forEach(card => {
        card.addEventListener('click', function () {
            if (modal) {
                modal.style.display = "block";
                modalImg.src = this.getAttribute('data-full');
                // Optional: Use alt text as caption
                // const imgInside = this.querySelector('img');
                // if (imgInside) {
                //     captionText.innerHTML = imgInside.alt;
                // }
            }
        });
    });

    if (closeBtn) {
        closeBtn.onclick = function () {
            if (modal) modal.style.display = "none";
        }
    }

    // Close when clicking outside the image
    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal || e.target.classList.contains('modal-content-wrapper')) {
                modal.style.display = "none";
            }
        });

        // Close on ESC key
        document.addEventListener('keydown', function (e) {
            if (e.key === "Escape" && modal.style.display === "block") {
                modal.style.display = "none";
            }
        });
    }
    // --- Contact Form Handling ---
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function () {
            // Wait a moment to ensure submission starts, then show success
            setTimeout(() => {
                const parent = contactForm.parentElement;
                contactForm.style.display = 'none';

                const successMsg = document.createElement('div');
                successMsg.className = 'contact-success fade-in';
                successMsg.style.textAlign = 'center';
                successMsg.style.padding = '2rem';
                successMsg.innerHTML = `
                    <h3 style="color: var(--accent-primary); margin-bottom: 1rem;">Message Sent!</h3>
                    <p style="color: var(--text-secondary); line-height: 1.6;">Thanks for contacting me.<br>I'll get back to you soon.</p>
                    <button class="btn btn-outline" style="margin-top: 1.5rem;" onclick="location.reload()">Send Another</button>
                `;
                parent.appendChild(successMsg);
                contactForm.reset();
            }, 500);
        });
    }
});
