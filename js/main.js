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

    // Check if already verified (expires after 14 days)
    var FOURTEEN_DAYS = 14 * 24 * 60 * 60 * 1000;
    if (ageGate) {
        var verifiedAt = localStorage.getItem('ogin-age-verified');
        if (verifiedAt && (Date.now() - Number(verifiedAt)) < FOURTEEN_DAYS) {
            ageGate.classList.add('hidden');
        } else {
            localStorage.removeItem('ogin-age-verified');
            document.body.classList.add('no-scroll');
        }
    }

    if (ageVerifyYes) {
        ageVerifyYes.addEventListener('click', function() {
            localStorage.setItem('ogin-age-verified', String(Date.now()));
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

    let headerTicking = false;
    window.addEventListener('scroll', function() {
        if (!headerTicking) {
            requestAnimationFrame(function() { updateHeader(); headerTicking = false; });
            headerTicking = true;
        }
    }, { passive: true });
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

    // Nav-strip: tap to expand/collapse on mobile (same menu as desktop)
    const navStrip = document.querySelector('.nav-strip');
    if (navStrip) {
        navStrip.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                // If a link was tapped, let it navigate
                if (e.target.closest('.nav-strip-links a, .nav-strip-instagram')) {
                    navStrip.classList.remove('expanded');
                    return;
                }
                e.preventDefault();
                e.stopPropagation();
                navStrip.classList.toggle('expanded');
            }
        });

        // Close when tapping outside the strip on mobile
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768 && navStrip.classList.contains('expanded')) {
                if (!navStrip.contains(e.target)) {
                    navStrip.classList.remove('expanded');
                }
            }
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
        let parallaxTicking = false;
        window.addEventListener('scroll', function() {
            if (!parallaxTicking) {
                requestAnimationFrame(function() {
                    const scrollY = window.scrollY;
                    if (scrollY < window.innerHeight) {
                        heroMedia.style.transform = `translateY(${scrollY * 0.3}px)`;
                    }
                    parallaxTicking = false;
                });
                parallaxTicking = true;
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
       Product Cards — In-view trigger on mobile (replaces hover)
       ---------------------------------------------------------------------- */
    if (window.innerWidth <= 768) {
        const mobileCards = document.querySelectorAll('.product-card');
        if (mobileCards.length) {
            const cardObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        entry.target._inViewTimer = setTimeout(function() {
                            entry.target.classList.add('in-view');
                        }, 600);
                    } else {
                        clearTimeout(entry.target._inViewTimer);
                        entry.target.classList.remove('in-view');
                    }
                });
            }, { threshold: 0.5 });
            mobileCards.forEach(function(card) { cardObserver.observe(card); });
        }
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
        const revealIcon = wrapper.querySelector('.reveal-icon');
        if (words.length) {
            revealSections.push({ wrapper, words, content, label, revealIcon });
        }
    });

    function revealAllWords() {
        revealSections.forEach(({ wrapper, words, content, label, revealIcon }) => {
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

            // Phase 2 (80-100%): fade out text, fade in icon
            const fadeProgress = Math.max(0, Math.min(1, (progress - 0.8) / 0.2));
            if (content) content.style.opacity = 1 - fadeProgress;
            if (revealIcon) revealIcon.style.opacity = fadeProgress;
        });
    }
    let revealTicking = false;
    window.addEventListener('scroll', function() {
        if (!revealTicking) {
            requestAnimationFrame(function() { revealAllWords(); revealTicking = false; });
            revealTicking = true;
        }
    }, { passive: true });
    revealAllWords();

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
