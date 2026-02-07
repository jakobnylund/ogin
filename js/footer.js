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
                <span class="footer-dot">&bull;</span>
                <a href="vibe.html">Vibe</a>
            </nav>

            <div class="social-links">
                <a href="#" aria-label="Instagram">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" stroke-width="1.5"/>
                        <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.5"/>
                        <circle cx="18" cy="6" r="1" fill="currentColor"/>
                    </svg>
                </a>
                <a href="#" aria-label="Facebook">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </a>
            </div>

        </div>
    </footer>`;
})();
