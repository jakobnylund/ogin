/* ==========================================================================
   ógin Distillery — Spirits Page JavaScript
   ========================================================================== */

(function() {
    'use strict';

    /* ----------------------------------------------------------------------
       Filter Tabs
       ---------------------------------------------------------------------- */
    const filterTabs = document.querySelectorAll('.filter-tab');
    const spiritCards = document.querySelectorAll('.spirit-card');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Filter cards
            const filter = this.dataset.filter;

            spiritCards.forEach(card => {
                if (filter === 'all' || card.dataset.type === filter) {
                    card.style.display = '';
                    // Re-trigger animation
                    card.classList.remove('visible');
                    setTimeout(() => card.classList.add('visible'), 10);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

})();
