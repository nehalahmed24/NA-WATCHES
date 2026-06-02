document.addEventListener('DOMContentLoaded', () => {
    // 1. Preloader Logic
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('fade-out');
            }, 800);
        });
    }

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Search Toggle Logic
    const searchBtn = document.getElementById('search-btn');
    const searchWrapper = document.getElementById('search-wrapper');
    const searchInput = document.getElementById('search-input');

    if (searchBtn && searchWrapper) {
        searchBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            searchWrapper.classList.toggle('active');
            if (searchWrapper.classList.contains('active')) {
                searchInput.focus();
            }
        });

        document.addEventListener('click', (e) => {
            if (!searchWrapper.contains(e.target) && searchWrapper.classList.contains('active')) {
                searchWrapper.classList.remove('active');
            }
        });
    }

    // 4. Mobile Drawer Logic
    const menuToggle = document.getElementById('menu-toggle');
    const closeDrawer = document.getElementById('close-drawer');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const drawerOverlay = document.getElementById('drawer-overlay');
    const drawerLinks = document.querySelectorAll('.drawer-links a');

    const toggleDrawer = (open) => {
        if (mobileDrawer) mobileDrawer.classList.toggle('open', open);
        if (drawerOverlay) drawerOverlay.classList.toggle('active', open);
        document.body.style.overflow = open ? 'hidden' : '';
    };

    if (menuToggle) menuToggle.addEventListener('click', () => toggleDrawer(true));
    if (closeDrawer) closeDrawer.addEventListener('click', () => toggleDrawer(false));
    if (drawerOverlay) drawerOverlay.addEventListener('click', () => toggleDrawer(false));

    drawerLinks.forEach(link => {
        link.addEventListener('click', () => toggleDrawer(false));
    });

    // 5. Intersection Observer for AOS
    const observersOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observersOptions);

    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => observer.observe(el));

    // 6. Cart Animation & Counter
    let cartCount = 0;
    const cartBadge = document.getElementById('cart-count');
    const addToCartBtns = document.querySelectorAll('.add-to-cart');

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            cartCount++;
            if (cartBadge) {
                cartBadge.textContent = cartCount;
                cartBadge.style.transform = 'scale(1.3)';
                setTimeout(() => cartBadge.style.transform = 'scale(1)', 300);
            }
            
            const originalText = btn.textContent;
            btn.textContent = 'Added';
            btn.style.background = 'var(--primary)';
            btn.style.color = '#000';
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = 'transparent';
                btn.style.color = 'var(--primary)';
            }, 2000);
        });
    });

    // 7. Newsletter Simulation
    const subscribeForm = document.getElementById('newsletter-form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = subscribeForm.querySelector('button');
            const originalText = btn.textContent;
            
            btn.textContent = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                btn.textContent = 'Welcome Aboard';
                subscribeForm.reset();
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                }, 3000);
            }, 1000);
        });
    }

    // 8. Smooth Scrolling with Offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = navbar ? navbar.offsetHeight : 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
