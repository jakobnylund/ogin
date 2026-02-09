/* ==========================================================================
   ógin Distillery — Navigation Component
   Injects nav-strip, header, and mobile-nav into every page.
   Usage: <div id="site-nav"></div> + <script src="js/nav.js"></script>
   ========================================================================== */

(function() {
    'use strict';

    const nav = document.getElementById('site-nav');
    if (!nav) return;

    const page = location.pathname.split('/').pop() || 'index.html';

    function active(href) {
        if (href === page) return ' class="active"';
        // Product pages highlight "Our Spirits"
        if (href === 'spirits.html' && page.startsWith('product-')) return ' class="active"';
        return '';
    }

    nav.innerHTML = `
    <div class="nav-strip">
        <a href="/" class="nav-strip-logo">
            <img src="images/silhouette.svg" alt="ógin">
            <span class="nav-strip-menu-label">Menu</span>
        </a>
        <ul class="nav-strip-links">
            <li><a href="/"${active('index.html')}>Home</a></li>
            <li><a href="spirits.html"${active('spirits.html')}>Our Spirits</a></li>
            <li><a href="story.html"${active('story.html')}>Our Story</a></li>
            <li><a href="process.html"${active('process.html')}>Our Process</a></li>
            <li><a href="contact.html"${active('contact.html')}>Contact</a></li>
        </ul>
        <a href="https://www.instagram.com/ogin_distillery/" target="_blank" rel="noopener" class="nav-strip-instagram" aria-label="Instagram">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
        </a>
        <img src="images/ogin-stamp.svg" alt="" class="nav-strip-stamp">
    </div>
    <header class="header">
        <nav class="nav container">
            <button class="nav-toggle" aria-label="Toggle menu">
                <span></span>
                <span></span>
            </button>
        </nav>
    </header>
    <div class="mobile-nav">
        <ul class="mobile-nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="spirits.html">Our Spirits</a></li>
            <li><a href="story.html">Our Story</a></li>
            <li><a href="process.html">Our Process</a></li>
            <li><a href="shop.html">Shop</a></li>
            <li><a href="contact.html">Contact</a></li>
        </ul>
    </div>`;

    // Nav strip: hide on scroll down, show on scroll up, flip to bottom near page end
    var lastScroll = 0;
    var strip = nav.querySelector('.nav-strip');
    var isBottom = false;
    var transitioning = false;

    if (strip) {
        window.addEventListener('scroll', function() {
            var scrollY = window.scrollY;
            var docHeight = document.documentElement.scrollHeight;
            var winHeight = window.innerHeight;
            var distFromBottom = docHeight - scrollY - winHeight;

            // Start hiding the top strip early (1.5 viewports from bottom)
            var hideTopZone = distFromBottom < winHeight * 1.5;
            // Show the bottom strip closer to bottom (0.5 viewports)
            var showBottomZone = distFromBottom < winHeight * 0.5;

            if (showBottomZone && !isBottom && !transitioning) {
                transitioning = true;
                // Step 1: hide top strip (slides up)
                strip.classList.add('nav-hidden');
                // Step 2: after top is gone, position at bottom off-screen, then slide up
                setTimeout(function() {
                    // Disable transition briefly to reposition without animation
                    strip.style.transition = 'none';
                    strip.classList.add('nav-bottom');
                    strip.classList.add('nav-hidden'); // translateY(100%) — off-screen below
                    strip.offsetHeight; // force reflow
                    // Re-enable transition and slide up into view
                    strip.style.transition = '';
                    requestAnimationFrame(function() {
                        strip.classList.remove('nav-hidden');
                        isBottom = true;
                        transitioning = false;
                    });
                }, 250);
            } else if (!showBottomZone && isBottom && !transitioning) {
                transitioning = true;
                // Slide bottom strip down (out of view)
                strip.classList.add('nav-hidden');
                setTimeout(function() {
                    strip.style.transition = 'none';
                    strip.classList.remove('nav-bottom');
                    strip.classList.remove('nav-hidden');
                    strip.offsetHeight;
                    strip.style.transition = '';
                    isBottom = false;
                    transitioning = false;
                }, 250);
            } else if (!isBottom && !transitioning) {
                // Normal top strip hide/show (desktop only — always visible on mobile)
                if (window.innerWidth > 768) {
                    // Stay visible through the hero/intro area, then hide on scroll-down
                    var introWrapper = document.querySelector('.intro-scroll-wrapper');
                    var heroSection = document.querySelector('.product-hero-story') || document.querySelector('.hero');
                    var threshold = introWrapper ? introWrapper.offsetHeight
                                  : heroSection ? heroSection.offsetHeight
                                  : 200;
                    if (scrollY <= threshold) {
                        strip.classList.remove('nav-hidden');
                    } else if (hideTopZone || scrollY > lastScroll) {
                        strip.classList.add('nav-hidden');
                    } else {
                        strip.classList.remove('nav-hidden');
                    }
                }
            }
            lastScroll = scrollY;
        }, { passive: true });
    }
})();
