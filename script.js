document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const announcementBar = document.querySelector('.announcement-bar');
    const announcementHeight = announcementBar ? announcementBar.offsetHeight : 0;

    // 1. Mobile Menu Toggle
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            
            // Toggle icon
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars-staggered');
                icon.classList.toggle('fa-xmark');
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target) && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars-staggered');
                    icon.classList.remove('fa-xmark');
                }
            }
        });
    }

    // 2. Navigation Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > announcementHeight) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Smooth Scroll with Offset for Mobile
    const allLinks = document.querySelectorAll('a[href^="#"]');
    allLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    if (icon) {
                        icon.classList.add('fa-bars-staggered');
                        icon.classList.remove('fa-xmark');
                    }
                }

                const offset = navbar.offsetHeight + 10;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Performance: Intersection Observer for AOS
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Efficiency: only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));
});
