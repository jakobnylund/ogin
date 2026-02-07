/* ==========================================================================
   ógin Distillery — Main JavaScript
   ========================================================================== */

(function() {
    'use strict';

    // Enable animations only when JS is working
    document.body.classList.add('js-loaded');

    /* ----------------------------------------------------------------------
       Age Verification
       ---------------------------------------------------------------------- */
    const ageGate = document.getElementById('age-gate');
    const ageVerifyYes = document.getElementById('age-verify-yes');
    const ageVerifyNo = document.getElementById('age-verify-no');

    // Check if already verified
    if (ageGate) {
        if (localStorage.getItem('ogin-age-verified') === 'true') {
            ageGate.classList.add('hidden');
        } else {
            document.body.classList.add('no-scroll');
        }
    }

    if (ageVerifyYes) {
        ageVerifyYes.addEventListener('click', function() {
            localStorage.setItem('ogin-age-verified', 'true');
            ageGate.classList.add('hidden');
            document.body.classList.remove('no-scroll');
        });
    }

    if (ageVerifyNo) {
        ageVerifyNo.addEventListener('click', function() {
            window.location.href = 'https://www.responsibility.org/';
        });
    }

    /* ----------------------------------------------------------------------
       Header Scroll Effect
       ---------------------------------------------------------------------- */
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    function updateHeader() {
        const scrollY = window.scrollY;
        const wrapper = document.querySelector('.intro-scroll-wrapper');
        const threshold = wrapper ? wrapper.offsetHeight : 50;

        if (scrollY > threshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScrollY = scrollY;
    }

    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();

    /* ----------------------------------------------------------------------
       Mobile Navigation
       ---------------------------------------------------------------------- */
    const navToggle = document.querySelector('.nav-toggle');
    const mobileNav = document.querySelector('.mobile-nav');

    if (navToggle && mobileNav) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            mobileNav.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        // Close mobile nav when clicking a link
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    /* ----------------------------------------------------------------------
       Scroll Animations (Intersection Observer)
       ---------------------------------------------------------------------- */
    const animatedElements = document.querySelectorAll('.fade-up, .fade-left, .fade-right');

    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -80px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animatedElements.forEach(el => observer.observe(el));
    } else {
        // Fallback for older browsers
        animatedElements.forEach(el => el.classList.add('visible'));
    }

    /* ----------------------------------------------------------------------
       Smooth Scroll for Anchor Links
       ---------------------------------------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = header.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ----------------------------------------------------------------------
       Image Lazy Loading & Fade In
       ---------------------------------------------------------------------- */
    const images = document.querySelectorAll('img');

    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
        }
    });

    /* ----------------------------------------------------------------------
       Parallax Effect for Hero (subtle)
       ---------------------------------------------------------------------- */
    const heroMedia = document.querySelector('.hero-media');

    if (heroMedia && window.innerWidth > 768) {
        window.addEventListener('scroll', function() {
            const scrollY = window.scrollY;
            if (scrollY < window.innerHeight) {
                heroMedia.style.transform = `translateY(${scrollY * 0.3}px)`;
            }
        }, { passive: true });
    }

    /* ----------------------------------------------------------------------
       Newsletter Form Handling
       ---------------------------------------------------------------------- */
    const newsletterForm = document.querySelector('.newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;

            // Here you would integrate with your newsletter service
            // For now, show a simple confirmation
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = 'Thank you!';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                this.reset();
            }, 3000);
        });
    }

    /* ----------------------------------------------------------------------
       Product Section Background Color Change
       ---------------------------------------------------------------------- */
    const productsSection = document.querySelector('.section-products');
    const vodkaCard = document.querySelector('.product-card[data-color="#0A0A0A"]');
    const defaultBgColor = getComputedStyle(document.documentElement).getPropertyValue('--color-off-white').trim() || '#FAFAF9';

    if (productsSection && vodkaCard) {
        productsSection.style.transition = 'background-color 0.5s var(--ease-out-expo)';
        vodkaCard.addEventListener('mouseenter', function() {
            productsSection.style.backgroundColor = '#0A0A0A';
            productsSection.classList.add('products-dark');
        });
        vodkaCard.addEventListener('mouseleave', function() {
            productsSection.style.backgroundColor = defaultBgColor;
            productsSection.classList.remove('products-dark');
        });
    }

    /* ----------------------------------------------------------------------
       Hover Reveal - Cursor-attached images
       ---------------------------------------------------------------------- */
    const hoverReveals = document.querySelectorAll('.hover-reveal');
    const cursorImage = document.getElementById('cursorImage');

    if (hoverReveals.length && cursorImage) {
        const cursorImg = cursorImage.querySelector('img');
        let isVisible = false;

        document.addEventListener('mousemove', function(e) {
            if (isVisible) {
                cursorImage.style.left = e.clientX + 'px';
                cursorImage.style.top = e.clientY + 'px';
            }
        });

        hoverReveals.forEach(el => {
            const imageSrc = el.getAttribute('data-image');

            el.addEventListener('mouseenter', function(e) {
                if (imageSrc) {
                    cursorImg.src = imageSrc;
                    cursorImage.style.left = e.clientX + 'px';
                    cursorImage.style.top = e.clientY + 'px';
                    cursorImage.classList.add('visible');
                    isVisible = true;
                }
            });

            el.addEventListener('mouseleave', function() {
                cursorImage.classList.remove('visible');
                isVisible = false;
            });
        });
    }

    /* ----------------------------------------------------------------------
       Word-by-Word Scroll Reveal
       ---------------------------------------------------------------------- */
    document.querySelectorAll('.word-reveal').forEach(el => {
        // Wrap each text node's words in spans, preserve child elements like <em>
        function wrapWords(node) {
            const children = Array.from(node.childNodes);
            children.forEach(child => {
                if (child.nodeType === 3) { // text node
                    const words = child.textContent.split(/(\s+)/);
                    const frag = document.createDocumentFragment();
                    words.forEach(w => {
                        if (/^\s+$/.test(w)) {
                            frag.appendChild(document.createTextNode(w));
                        } else if (w) {
                            const span = document.createElement('span');
                            span.className = 'word';
                            span.textContent = w;
                            frag.appendChild(span);
                        }
                    });
                    child.replaceWith(frag);
                } else if (child.nodeType === 1) { // element node
                    wrapWords(child);
                }
            });
        }
        wrapWords(el);
    });

    /* Generic scroll-driven word reveal for all .scroll-reveal-wrapper sections */
    const revealSections = [];
    document.querySelectorAll('.scroll-reveal-wrapper').forEach(wrapper => {
        const words = wrapper.querySelectorAll('.word-reveal .word');
        const content = wrapper.querySelector('.scroll-reveal-content');
        const label = wrapper.querySelector('.intro-label');
        if (words.length) {
            revealSections.push({ wrapper, words, content, label });
        }
    });

    function revealAllWords() {
        revealSections.forEach(({ wrapper, words, content, label }) => {
            const total = words.length;
            const rect = wrapper.getBoundingClientRect();
            const scrollable = rect.height - window.innerHeight;
            const scrolled = -rect.top;
            const progress = Math.max(0, Math.min(1, scrolled / scrollable));

            if (label) label.style.opacity = 0.5;

            // Phase 1 (0-75%): reveal words
            const revealProgress = Math.max(0, Math.min(1, progress / 0.75));
            words.forEach((word, i) => {
                if (revealProgress >= i / total) {
                    word.classList.add('revealed');
                } else {
                    word.classList.remove('revealed');
                }
            });

            // Phase 2 (80-100%): fade out
            const fadeProgress = Math.max(0, Math.min(1, (progress - 0.8) / 0.2));
            if (content) content.style.opacity = 1 - fadeProgress;
        });
    }
    window.addEventListener('scroll', revealAllWords);
    revealAllWords();

    /* ----------------------------------------------------------------------
       Product Card Hover Image Swap (disabled — uncomment to re-enable)
       ---------------------------------------------------------------------- */
    /*
    document.querySelectorAll('.product-card').forEach(card => {
        const img = card.querySelector('.product-image > img[data-hover]');
        if (!img) return;
        const original = img.getAttribute('src');
        const hover = img.getAttribute('data-hover');
        // Preload hover image
        new Image().src = hover;

        card.addEventListener('mouseenter', function() {
            img.setAttribute('src', hover);
        });
        card.addEventListener('mouseleave', function() {
            img.setAttribute('src', original);
        });
    });
    */

    /* ----------------------------------------------------------------------
       Cocktail Cards Drag to Swipe
       ---------------------------------------------------------------------- */
    const track = document.querySelector('.cocktails-track');
    if (track) {
        let isDown = false, startX, scrollLeft;
        track.addEventListener('mousedown', e => {
            isDown = true;
            startX = e.pageX - track.offsetLeft;
            scrollLeft = track.scrollLeft;
        });
        track.addEventListener('mouseleave', () => { isDown = false; });
        track.addEventListener('mouseup', () => { isDown = false; });
        track.addEventListener('mousemove', e => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - track.offsetLeft;
            track.scrollLeft = scrollLeft - (x - startX) * 1.5;
        });

        // Arrow navigation
        const prevBtn = document.querySelector('.cocktails-prev');
        const nextBtn = document.querySelector('.cocktails-next');
        const cardWidth = 370; // card width + gap

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                track.scrollBy({ left: -cardWidth, behavior: 'smooth' });
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                track.scrollBy({ left: cardWidth, behavior: 'smooth' });
            });
        }
    }

})();
