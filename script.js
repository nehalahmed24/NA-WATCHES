document.addEventListener('DOMContentLoaded', () => {
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

    // 6. Parallax effect for Hero (Subtle)
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        const scroll = window.pageYOffset;
        if (hero) {
            hero.style.backgroundPositionY = `${scroll * 0.5}px`;
        }
    });

    // 7. Initialize Scroll Animation manually for Hero if needed
    // (AOS usually handles this via IntersectionObserver)
});
