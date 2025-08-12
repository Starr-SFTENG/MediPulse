document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const href = a.getAttribute('href');
            if (href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });


    // IntersectionObserver reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Products data (client-only)
    const products = [
        { id: 1, name: 'Paracetamol 500mg', category: 'OTC', price: '$2.50', img: 'assets/img/product-placeholder.jpg' },
        { id: 2, name: 'Amoxicillin 250mg', category: 'Prescription', price: '$8.00', img: 'assets/img/product-placeholder.jpg' },
        { id: 3, name: 'Vitamin C 1000mg', category: 'Supplements', price: '$6.50', img: 'assets/img/product-placeholder.jpg' },
        { id: 4, name: 'Cough Syrup 120ml', category: 'OTC', price: '$4.20', img: 'assets/img/product-placeholder.jpg' },
        { id: 5, name: 'Blood Pressure Monitor', category: 'Equipment', price: '$48.00', img: 'assets/img/product-placeholder.jpg' },
        { id: 6, name: 'N95 Masks (Box 20)', category: 'Personal Care', price: '$12.00', img: 'assets/img/product-placeholder.jpg' }
    ];

    // If on products page, wire up listing and filters
    if (document.getElementById('products-app')) {
        const elRoot = document.getElementById('products-app');
        const list = document.createElement('div');
        list.className = 'cards-grid';
        elRoot.appendChild(list);

        const render = (items) => {
            list.innerHTML = '';
            items.forEach(p => {
                const card = document.createElement('div');
                card.className = 'glass-card product-card reveal';
                card.innerHTML = `
          <img class="product-img" src="${p.img}" alt="${p.name}">
          <div class="product-info">
            <div class="product-title">${p.name}</div>
            <div class="product-meta">${p.category} • ${p.price}</div>
          </div>
          <div><button class="btn btn-outline" onclick="alert('To order, call or WhatsApp the branch')">Order</button></div>
        `;
                list.appendChild(card);
                // observe the new element for reveal
                observer.observe(card);
            });
        };

        // initial render (show first 3 as preview)
        const previewCount = document.body.classList.contains('products-full') ? products.length : 3;
        render(products.slice(0, previewCount));

        // category filter (if present)
        const filterEl = document.getElementById('product-filter');
        if (filterEl) {
            filterEl.addEventListener('change', (e) => {
                const v = e.target.value;
                const items = v === 'all' ? products : products.filter(p => p.category === v);
                render(items);
            });
        }

        // search box
        const searchEl = document.getElementById('product-search');
        if (searchEl) {
            searchEl.addEventListener('input', (e) => {
                const q = e.target.value.toLowerCase();
                const items = products.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
                render(items);
            });
        }
    }

});