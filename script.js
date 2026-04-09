document.addEventListener('DOMContentLoaded', () => {
    // 0. Preloader Logic
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('fade-out');
        }, 1000);
    });

    // JavaScript Logic for the website

    // 0.2 Search Toggle Logic
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

        // Close search when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchWrapper.contains(e.target) && searchWrapper.classList.contains('active')) {
                searchWrapper.classList.remove('active');
            }
        });

        // Prevent closing when clicking inside the input
        searchInput.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // 0.3 Mobile Drawer Logic
    const menuToggle = document.getElementById('menu-toggle');
    const closeDrawer = document.getElementById('close-drawer');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const drawerOverlay = document.getElementById('drawer-overlay');
    const drawerLinks = document.querySelectorAll('.drawer-links a');

    const toggleDrawer = (open) => {
        mobileDrawer.classList.toggle('open', open);
        drawerOverlay.classList.toggle('active', open);
        document.body.style.overflow = open ? 'hidden' : ''; // Prevent scroll
    };

    if (menuToggle) {
        menuToggle.addEventListener('click', () => toggleDrawer(true));
    }

    if (closeDrawer) {
        closeDrawer.addEventListener('click', () => toggleDrawer(false));
    }

    if (drawerOverlay) {
        drawerOverlay.addEventListener('click', () => toggleDrawer(false));
    }

    drawerLinks.forEach(link => {
        link.addEventListener('click', () => toggleDrawer(false));
    });

    // 1. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Intersection Observer for AOS (Animate on Scroll)
    const observersOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Unobserve after animation triggered
                // observer.unobserve(entry.target); 
            }
        });
    }, observersOptions);

    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => {
        observer.observe(el);
        // Apply individual delays if specified
        const delay = el.getAttribute('data-aos-delay');
        if (delay) {
            el.style.transitionDelay = `${delay}ms`;
        }
    });

    // 3. Cart Logic
    let cartCount = 0;
    const cartBadge = document.querySelector('.cart-btn span');
    const addToCartBtns = document.querySelectorAll('.btn-card');

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            cartCount++;
            cartBadge.textContent = cartCount;
            
            // Subtle feedback
            btn.textContent = 'Added!';
            btn.style.backgroundColor = 'var(--primary)';
            btn.style.color = '#000';
            
            setTimeout(() => {
                btn.textContent = 'Add to Cart';
                btn.style.backgroundColor = 'transparent';
                btn.style.color = 'var(--primary)';
            }, 2000);

            // Fly-to-cart animation could be added here
            console.log(`Item added to cart. Total: ${cartCount}`);
        });
    });

    // 4. Newsletter Simulation
    const subscribeForm = document.querySelector('.subscribe-form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = subscribeForm.querySelector('input');
            const btn = subscribeForm.querySelector('button');
            
            const originalBtnText = btn.textContent;
            btn.textContent = 'Joining...';
            btn.disabled = true;

            setTimeout(() => {
                alert(`Thank you! ${emailInput.emailInput || emailInput.value} has been added to our inner circle.`);
                btn.textContent = 'Success!';
                emailInput.value = '';
                
                setTimeout(() => {
                    btn.textContent = originalBtnText;
                    btn.disabled = false;
                }, 3000);
            }, 1000);
        });
    }

    // 5. Smooth Scroll for all anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 6. Parallax effect for Hero (Enhanced)
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    window.addEventListener('scroll', () => {
        const scroll = window.pageYOffset;
        if (hero) {
            hero.style.backgroundPositionY = `${scroll * 0.7}px`;
            if(heroContent) {
                heroContent.style.transform = `translateY(${scroll * 0.3}px)`;
                heroContent.style.opacity = 1 - (scroll / 800);
            }
        }
    });

    // 7. Watch Card Tilt Effect (Subtle)
    const cards = document.querySelectorAll('.watch-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) scale(1) rotateX(0) rotateY(0)`;
        });
    });
});
