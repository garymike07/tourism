// Enhanced Tourism Website JavaScript

// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const navbar = document.querySelector('.navbar');

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);

// Update theme toggle icon
function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (body.getAttribute('data-theme') === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

updateThemeIcon();

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
    
    // Add a nice transition effect
    body.style.transition = 'all 0.3s ease';
    setTimeout(() => {
        body.style.transition = '';
    }, 300);
});

// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Hero Slideshow
const heroSlides = document.querySelectorAll('.hero-slide');
let currentSlide = 0;

function showSlide(index) {
    heroSlides.forEach(slide => slide.classList.remove('active'));
    heroSlides[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % heroSlides.length;
    showSlide(currentSlide);
}

// Auto-advance slides every 5 seconds
setInterval(nextSlide, 5000);

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll Animation Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all elements with scroll-animate class
document.querySelectorAll('.scroll-animate').forEach(el => {
    observer.observe(el);
});

// Add scroll-animate class to various elements
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = [
        '.feature',
        '.offer-card',
        '.accommodation-card',
        '.gallery-item',
        '.activity-card',
        '.attraction-card',
        '.testimonial-card'
    ];
    
    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('scroll-animate');
        });
    });
});

// Special Offer Popup
const popup = document.getElementById('specialOfferPopup');
const closePopup = document.getElementById('closePopup');

// Show popup after 3 seconds
setTimeout(() => {
    if (popup) {
        popup.classList.add('active');
    }
}, 3000);

// Close popup functionality
if (closePopup) {
    closePopup.addEventListener('click', () => {
        popup.classList.remove('active');
    });
}

// Close popup when clicking outside
if (popup) {
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.classList.remove('active');
        }
    });
}

// Newsletter Form Submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        if (email) {
            // Simulate form submission
            const button = newsletterForm.querySelector('button');
            const originalText = button.textContent;
            
            button.textContent = 'Subscribing...';
            button.disabled = true;
            
            setTimeout(() => {
                button.textContent = 'Subscribed!';
                button.style.background = '#4CAF50';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                    button.style.background = '';
                    newsletterForm.reset();
                }, 2000);
            }, 1000);
        }
    });
}

// Enhanced Button Interactions
document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple CSS
const rippleCSS = `
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple 0.6s linear;
    pointer-events: none;
}

@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Gallery Lightbox Effect
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        // Create lightbox overlay
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox-overlay';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="lightbox-close">&times;</span>
                <div class="lightbox-image">
                    <div class="gallery-image"></div>
                    <div class="lightbox-caption">${item.querySelector('.gallery-caption').textContent}</div>
                </div>
            </div>
        `;
        
        document.body.appendChild(lightbox);
        
        // Add lightbox styles
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 3000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        const content = lightbox.querySelector('.lightbox-content');
        content.style.cssText = `
            position: relative;
            max-width: 90%;
            max-height: 90%;
            background: var(--bg-color);
            border-radius: 15px;
            overflow: hidden;
            transform: scale(0.8);
            transition: transform 0.3s ease;
        `;
        
        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.style.cssText = `
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 2rem;
            color: var(--text-color);
            cursor: pointer;
            z-index: 1;
            background: var(--bg-color);
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        const lightboxImage = lightbox.querySelector('.lightbox-image .gallery-image');
        lightboxImage.style.cssText = `
            width: 500px;
            height: 300px;
            background: linear-gradient(45deg, var(--accent-color), var(--primary-color));
        `;
        
        const caption = lightbox.querySelector('.lightbox-caption');
        caption.style.cssText = `
            padding: 1rem;
            text-align: center;
            color: var(--text-color);
            font-weight: 500;
        `;
        
        // Show lightbox
        setTimeout(() => {
            lightbox.style.opacity = '1';
            content.style.transform = 'scale(1)';
        }, 10);
        
        // Close lightbox
        const closeLightbox = () => {
            lightbox.style.opacity = '0';
            content.style.transform = 'scale(0.8)';
            setTimeout(() => {
                document.body.removeChild(lightbox);
            }, 300);
        };
        
        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    });
});

// Booking Form Functionality
document.querySelectorAll('a[href="#book"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Create booking modal
        const modal = document.createElement('div');
        modal.className = 'booking-modal';
        modal.innerHTML = `
            <div class="booking-content">
                <span class="booking-close">&times;</span>
                <h3>Book Your Adventure</h3>
                <form class="booking-form">
                    <div class="form-group">
                        <label for="name">Full Name</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="phone">Phone</label>
                        <input type="tel" id="phone" name="phone" required>
                    </div>
                    <div class="form-group">
                        <label for="checkin">Check-in Date</label>
                        <input type="date" id="checkin" name="checkin" required>
                    </div>
                    <div class="form-group">
                        <label for="checkout">Check-out Date</label>
                        <input type="date" id="checkout" name="checkout" required>
                    </div>
                    <div class="form-group">
                        <label for="guests">Number of Guests</label>
                        <select id="guests" name="guests" required>
                            <option value="">Select guests</option>
                            <option value="1">1 Guest</option>
                            <option value="2">2 Guests</option>
                            <option value="3">3 Guests</option>
                            <option value="4">4 Guests</option>
                            <option value="5+">5+ Guests</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="package">Package</label>
                        <select id="package" name="package" required>
                            <option value="">Select package</option>
                            <option value="safari">Safari Lodge</option>
                            <option value="luxury">Luxury Tented Camp</option>
                            <option value="eco">Eco Cottage</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="message">Special Requests</label>
                        <textarea id="message" name="message" rows="3"></textarea>
                    </div>
                    <button type="submit" class="btn-primary">Book Now</button>
                </form>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add modal styles
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 3000;
            opacity: 0;
            transition: opacity 0.3s ease;
            backdrop-filter: blur(5px);
        `;
        
        const content = modal.querySelector('.booking-content');
        content.style.cssText = `
            background: var(--bg-color);
            border-radius: 15px;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            transform: scale(0.8);
            transition: transform 0.3s ease;
        `;
        
        // Style form elements
        const formGroups = modal.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.style.marginBottom = '1rem';
        });
        
        const labels = modal.querySelectorAll('label');
        labels.forEach(label => {
            label.style.cssText = `
                display: block;
                margin-bottom: 0.5rem;
                color: var(--text-color);
                font-weight: 500;
            `;
        });
        
        const inputs = modal.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.style.cssText = `
                width: 100%;
                padding: 0.75rem;
                border: 1px solid var(--border-color);
                border-radius: 8px;
                background: var(--bg-light);
                color: var(--text-color);
                font-size: 1rem;
                transition: var(--transition);
            `;
            
            input.addEventListener('focus', () => {
                input.style.borderColor = 'var(--primary-color)';
                input.style.boxShadow = '0 0 0 3px rgba(45, 90, 39, 0.1)';
            });
            
            input.addEventListener('blur', () => {
                input.style.borderColor = 'var(--border-color)';
                input.style.boxShadow = 'none';
            });
        });
        
        const closeBtn = modal.querySelector('.booking-close');
        closeBtn.style.cssText = `
            position: absolute;
            top: 15px;
            right: 20px;
            font-size: 2rem;
            color: var(--text-light);
            cursor: pointer;
            transition: var(--transition);
        `;
        
        const title = modal.querySelector('h3');
        title.style.cssText = `
            color: var(--primary-color);
            margin-bottom: 1.5rem;
            text-align: center;
            font-size: 1.8rem;
        `;
        
        // Show modal
        setTimeout(() => {
            modal.style.opacity = '1';
            content.style.transform = 'scale(1)';
        }, 10);
        
        // Close modal
        const closeModal = () => {
            modal.style.opacity = '0';
            content.style.transform = 'scale(0.8)';
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        };
        
        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Handle form submission
        const form = modal.querySelector('.booking-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Processing...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = 'Booking Confirmed!';
                submitBtn.style.background = '#4CAF50';
                
                setTimeout(() => {
                    closeModal();
                }, 2000);
            }, 2000);
        });
    });
});

// Contact Form Functionality
document.querySelectorAll('a[href="tel:+918277385225"]').forEach(link => {
    link.addEventListener('click', (e) => {
        // Add a visual feedback when phone number is clicked
        const originalText = link.textContent;
        link.style.color = 'var(--primary-color)';
        link.style.transform = 'scale(1.05)';
        
        setTimeout(() => {
            link.style.color = '';
            link.style.transform = '';
        }, 200);
    });
});

// Enhanced Loading Animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate elements on load
    const elementsToLoad = document.querySelectorAll('.loading');
    elementsToLoad.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Scroll Progress Indicator
const scrollProgress = document.createElement('div');
scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: var(--primary-color);
    z-index: 9999;
    transition: width 0.1s ease;
`;
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
});

// Enhanced Hover Effects for Cards
document.querySelectorAll('.feature, .offer-card, .accommodation-card, .activity-card, .attraction-card, .testimonial-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// Typing Effect for Hero Title
const heroTitle = document.querySelector('.hero h1');
if (heroTitle) {
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            heroTitle.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    setTimeout(typeWriter, 1000);
}

// Add floating animation to special offer banner
const offerBanner = document.querySelector('.special-offer-banner');
if (offerBanner) {
    offerBanner.classList.add('floating');
}

// Enhanced scroll animations with stagger effect
const staggerElements = document.querySelectorAll('.features .feature, .offers-grid .offer-card, .accommodations-grid .accommodation-card');
staggerElements.forEach((el, index) => {
    el.style.animationDelay = `${index * 0.1}s`;
});

// Add custom cursor effect
const cursor = document.createElement('div');
cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    background: var(--primary-color);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    opacity: 0.5;
    transition: transform 0.1s ease;
    display: none;
`;
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
});

// Show custom cursor on hover over interactive elements
document.querySelectorAll('a, button, .btn-primary, .btn-secondary, .btn-outline').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.display = 'block';
        cursor.style.transform = 'scale(1.5)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.display = 'none';
        cursor.style.transform = 'scale(1)';
    });
});

console.log('Enhanced Tourism Website Loaded Successfully! 🌟');

