/* ==========================================================================
   ógin Distillery — Products Grid Component
   Injects the product cards grid into any page.
   Usage: <div id="site-products"></div> + <script src="js/products.js"></script>
   ========================================================================== */

(function() {
    'use strict';

    var el = document.getElementById('site-products');
    if (!el) return;

    var products = [
        {
            href: 'product-nature.html',
            image: 'images/3F9A9977.jpg',
            mask: 'images/mask.svg',
            icon: 'images/nature-icon.png',
            label: 'Gin',
            name: 'ÓGIN Nature',
            desc: 'The first botanicals of spring, captured at their most vibrant.',
            tagline: 'The first botanicals of spring, captured at their most vibrant.',
            abv: '41% ABV · 70cl',
            color: '#FFFFFF',
            anim: 'fade-left'
        },
        {
            href: 'product-arctic.html',
            image: 'images/arctic.jpg',
            mask: 'images/mask.svg',
            icon: 'images/arctic-icon.png',
            label: 'Gin',
            name: 'ÓGIN Arctic',
            desc: 'Bold and untamed, like the frozen wilderness itself.',
            tagline: 'Bold and untamed, like the frozen wilderness itself.',
            abv: '45.5% ABV · 70cl',
            color: '#3D1515',
            anim: 'fade-up delay-1'
        },
        {
            href: 'product-cloud.html',
            image: 'images/cloud.jpg',
            mask: 'images/mask.svg',
            icon: 'images/cloud-icon.png',
            label: 'Gin',
            name: 'ÓGIN Cloud',
            desc: 'Nordic gold, kissed by cloudberries from the Arctic highlands.',
            tagline: 'Nordic gold, kissed by cloudberries from the Arctic highlands.',
            abv: '47% ABV · 70cl',
            color: '#FAAA60',
            anim: 'fade-right delay-2'
        },
        {
            href: 'product-barrel.html',
            image: 'images/barrel.jpg',
            mask: 'images/mask.svg',
            icon: 'images/barrel-icon.png',
            label: 'Gin',
            name: 'ÓGIN Barrel',
            desc: 'Rested in Swedish oak through the long Arctic winter.',
            tagline: 'Rested in Swedish oak through the long Arctic winter.',
            abv: '43.5% ABV · 70cl',
            color: '#FFFACD',
            anim: 'fade-left'
        },
        {
            href: 'product-pink.html',
            image: 'images/pink.jpg',
            mask: 'images/mask.svg',
            icon: 'images/pink-icon.png',
            label: 'Limited Edition',
            name: 'ÓGIN Pink',
            desc: 'Arctic raspberry meets wild rose in this rare creation.',
            tagline: 'Wild strawberries and rose from the distiller\'s own garden.',
            abv: '40% ABV · 70cl',
            color: '#E8A0B0',
            anim: 'fade-up delay-1'
        },
        {
            href: 'product-vodka.html',
            image: 'images/3F9A4812.jpeg',
            mask: 'images/mask-dark.svg',
            icon: 'images/barley-icon.png',
            label: 'Vodka',
            name: 'ÓGIN Barley Vodka',
            desc: 'Pure Nordic barley, distilled to silken perfection.',
            tagline: 'Pure Nordic barley, distilled to silken perfection.',
            abv: '41% ABV · 70cl',
            color: '#0A0A0A',
            anim: 'fade-right delay-2'
        }
    ];

    var cards = products.map(function(p) {
        return `
                    <a href="${p.href}" class="product-card product-card-masked ${p.anim}" data-color="${p.color}">
                        <div class="product-image">
                            <img src="${p.image}" alt="${p.name}">
                            <img src="${p.mask}" alt="" class="product-mask">
                            <div class="product-hover-card">
                                <img src="${p.icon}" alt="" class="product-hover-icon">
                                <div class="product-hover-content">
                                    <span class="product-hover-label">${p.label}</span>
                                    <h3 class="product-hover-name">${p.name}</h3>
                                    <p class="product-hover-desc">${p.desc}</p>
                                    <span class="product-hover-cta">Discover</span>
                                </div>
                            </div>
                        </div>
                        <div class="product-info">
                            <div class="product-info-row">
                                <span class="product-name">${p.name}</span>
                                <span class="product-details">${p.abv}</span>
                            </div>
                            <span class="product-tagline">${p.tagline}</span>
                        </div>
                    </a>`;
    }).join('\n');

    el.innerHTML = `
        <section class="section section-products">
            <div class="container">
                <header class="section-header section-header-center">
                    <span class="section-label fade-up">Our Collection</span>
                    <h2 class="section-title fade-up delay-1">Handcrafted Spirits</h2>
                </header>
                <img src="images/ogin-stamp.svg" alt="" class="products-stamp fade-up delay-2">

                <div class="products-grid">
${cards}
                </div>

            </div>
        </section>`;
})();
