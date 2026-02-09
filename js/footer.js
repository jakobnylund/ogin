/* ==========================================================================
   ógin Distillery — Footer Component
   Injects footer into every page.
   Usage: <div id="site-footer"></div> + <script src="js/footer.js"></script>
   ========================================================================== */

(function() {
    'use strict';

    var el = document.getElementById('site-footer');
    if (!el) return;

    el.innerHTML = `
    <footer class="footer">
        <div class="container">
            <a href="/" class="footer-logo"><img src="images/ogin.svg" alt="ógin"></a>
            <p class="footer-tagline">The pure spirit of Swedish Lapland</p>

            <div class="footer-bottom">
                <p>&copy; ${new Date().getFullYear()} ÓGIN Distillery. All rights reserved.</p>
                <p class="footer-legal">Please drink responsibly. Must be of legal drinking age.</p>
            </div>

            <nav class="footer-nav">
                <a href="spirits.html">Our Spirits</a>
                <span class="footer-dot">&bull;</span>
                <a href="story.html">Our Story</a>
                <span class="footer-dot">&bull;</span>
                <a href="process.html">Our Process</a>
                <span class="footer-dot">&bull;</span>
                <a href="shop.html">Shop</a>
                <span class="footer-dot">&bull;</span>
                <a href="contact.html">Contact</a>
            </nav>

            <div class="social-links">
                <a href="https://www.instagram.com/ogin_distillery/" target="_blank" rel="noopener" aria-label="Instagram">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" stroke-width="1.5"/>
                        <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.5"/>
                        <circle cx="18" cy="6" r="1" fill="currentColor"/>
                    </svg>
                </a>
            </div>

        </div>
    </footer>`;
})();
