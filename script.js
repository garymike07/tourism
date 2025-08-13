// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            body.removeAttribute('data-theme');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Hero Slideshow
    const heroSlides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    
    function showNextSlide() {
        heroSlides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % heroSlides.length;
        heroSlides[currentSlide].classList.add('active');
    }
    
    // Auto-advance slides every 5 seconds
    setInterval(showNextSlide, 5000);
    
    // Special Offer Popup
    const popup = document.getElementById('specialOfferPopup');
    const closePopup = document.getElementById('closePopup');
    const maybeLater = document.getElementById('maybeLater');
    
    // Show popup after 3 seconds if not shown before
    const popupShown = sessionStorage.getItem('popupShown');
    if (!popupShown) {
        setTimeout(() => {
            popup.classList.add('active');
        }, 3000);
    }
    
    // Close popup functionality
    function hidePopup() {
        popup.classList.remove('active');
        sessionStorage.setItem('popupShown', 'true');
    }
    
    closePopup.addEventListener('click', hidePopup);
    maybeLater.addEventListener('click', hidePopup);
    
    // Close popup when clicking outside
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            hidePopup();
        }
    });
    
    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        // Simple email validation
        if (email && email.includes('@')) {
            alert('Thank you for subscribing! We\\'ll keep you updated on our latest adventures.');
            this.reset();
        } else {
            alert('Please enter a valid email address.');
        }
    });
    
    // Scroll-based Navbar Background
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            if (body.getAttribute('data-theme') === 'dark') {
                navbar.style.background = 'rgba(26, 26, 26, 0.98)';
            }
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            if (body.getAttribute('data-theme') === 'dark') {
                navbar.style.background = 'rgba(26, 26, 26, 0.95)';
            }
        }
    });
    
    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature, .offer-card, .accommodation-card, .activity-card, .attraction-card, .testimonial-card, .gallery-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Chat Widget Functionality
    const chatButton = document.querySelector('.chat-button');
    chatButton.addEventListener('click', function() {
        alert('Chat feature coming soon! For immediate assistance, please call us at +91 8277385225 or contact us via WhatsApp.');
    });
    
    // WhatsApp Widget - Open WhatsApp with pre-filled message
    const whatsappWidget = document.querySelector('.whatsapp-widget a');
    whatsappWidget.addEventListener('click', function(e) {
        e.preventDefault();
        const message = encodeURIComponent('Hello! I\\'m interested in learning more about your safari packages.');
        const whatsappUrl = `https://wa.me/918277385225?text=${message}`;
        window.open(whatsappUrl, '_blank');
    });
    
    // Popup WhatsApp Button
    const popupWhatsAppBtn = document.querySelector('.popup-btn.btn-primary');
    if (popupWhatsAppBtn) {
        popupWhatsAppBtn.addEventListener('click', function() {
            const message = encodeURIComponent('Hi! I\\'m interested in the special day package at KES 6,393. Can you provide more details?');
            const whatsappUrl = `https://wa.me/918277385225?text=${message}`;
            window.open(whatsappUrl, '_blank');
            hidePopup();
        });
    }
    
    // Parallax Effect for Hero Section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Dynamic Year in Footer (if needed)
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('.current-year');
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });
    
    // Lazy Loading for Images (if real images are added later)
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
    
    // Add loading states for buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add loading state for external links
            if (this.href && this.href.includes('http') && !this.href.includes('wa.me')) {
                this.style.opacity = '0.7';
                this.style.pointerEvents = 'none';
                setTimeout(() => {
                    this.style.opacity = '1';
                    this.style.pointerEvents = 'auto';
                }, 2000);
            }
        });
    });
    
    // Add hover effects for cards
    const cards = document.querySelectorAll('.feature, .offer-card, .accommodation-card, .activity-card, .attraction-card, .testimonial-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Keyboard navigation for accessibility
    document.addEventListener('keydown', function(e) {
        // Close popup with Escape key
        if (e.key === 'Escape' && popup.classList.contains('active')) {
            hidePopup();
        }
        
        // Toggle theme with Ctrl+Shift+T
        if (e.ctrlKey && e.shiftKey && e.key === 'T') {
            themeToggle.click();
        }
    });
    
    // Add focus indicators for keyboard navigation
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
    focusableElements.forEach(el => {
        el.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--primary-color)';
            this.style.outlineOffset = '2px';
        });
        
        el.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
});

// Additional utility functions
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.getElementById('hamburger');
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Export functions for potential external use
window.tourismWebsite = {
    scrollToTop,
    toggleMobileMenu
};

