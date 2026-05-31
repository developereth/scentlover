// ========== SCROLL REVEAL ==========
document.addEventListener('DOMContentLoaded', function() {
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealElements.forEach(el => observer.observe(el));
});

// ========== MOBILE SIDE-SLIDE NAVIGATION ==========
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const overlay = document.querySelector('.nav-overlay');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('show');
            if (overlay) overlay.classList.toggle('show');
            document.body.style.overflow = navLinks.classList.contains('show') ? 'hidden' : '';
        });
        
        if (overlay) {
            overlay.addEventListener('click', function() {
                navLinks.classList.remove('show');
                overlay.classList.remove('show');
                document.body.style.overflow = '';
            });
        }
        
        const closeBtn = navLinks.querySelector('.nav-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                navLinks.classList.remove('show');
                if (overlay) overlay.classList.remove('show');
                document.body.style.overflow = '';
            });
        }
        
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('show');
                if (overlay) overlay.classList.remove('show');
                document.body.style.overflow = '';
            });
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
                if (overlay) overlay.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
    }
});

// ========== ACTIVE NAV LINK ==========
document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';
    document.querySelectorAll('.nav-links a:not(.nav-cta)').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) link.classList.add('active');
    });
});

// ========== CONTACT FORM ==========
function submitContactForm() {
    const name = document.getElementById('contactName')?.value.trim();
    const email = document.getElementById('contactEmail')?.value.trim();
    const message = document.getElementById('contactMessage')?.value.trim();
    if (!name || !email || !message) { alert('Please fill in Name, Email, and Message.'); return; }
    alert('✅ Thank you, ' + name + '! We\'ll get back to you soon.');
    document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form select').forEach(el => el.value = '');
}

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
});
