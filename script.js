/* ============================================
   JOJO BLOCK - PROFESSIONAL JAVASCRIPT
   Advanced Features, Social Media Focused
   ============================================ */

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeMobileMenu();
    initializeSmoothScroll();
    initializeScrollAnimations();
    initializeParticles();
    initializeFormHandling();
    initializeSocialLinks();
    initializeEmailFunctionality();
    initializeNewsletter();
});

// ===== THEME TOGGLE =====
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Load saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    themeToggle.checked = savedTheme === 'dark';
    
    // Theme toggle event
    themeToggle.addEventListener('change', function() {
        const newTheme = this.checked ? 'dark' : 'light';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Add transition effect
        body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        
        // Analytics or tracking (if needed)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'theme_change', {
                'theme': newTheme
            });
        }
    });
}

// ===== MOBILE MENU =====
function initializeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (!mobileMenuToggle || !navMenu) return;
    
    // Toggle menu when checkbox changes
    mobileMenuToggle.addEventListener('change', function() {
        if (this.checked) {
            navMenu.classList.add('menu-open');
            updateHamburgerIcon(true);
        } else {
            navMenu.classList.remove('menu-open');
            updateHamburgerIcon(false);
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnToggle = event.target.closest('.mobile-menu-label') || 
                                 event.target.closest('#mobile-menu-toggle');
        
        if (!isClickInsideNav && !isClickOnToggle && mobileMenuToggle.checked) {
            mobileMenuToggle.checked = false;
            navMenu.classList.remove('menu-open');
            updateHamburgerIcon(false);
        }
    });
    
    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuToggle.checked = false;
            navMenu.classList.remove('menu-open');
            updateHamburgerIcon(false);
        });
    });
    
    function updateHamburgerIcon(isOpen) {
        if (!hamburger) return;
        const hamburgerParent = hamburger.parentElement;
        if (isOpen) {
            hamburger.style.transform = 'rotate(45deg)';
            hamburger.style.backgroundColor = 'var(--accent-primary)';
            if (hamburgerParent) {
                hamburgerParent.style.transform = 'rotate(0deg)';
            }
        } else {
            hamburger.style.transform = 'rotate(0deg)';
            hamburger.style.backgroundColor = '';
            if (hamburgerParent) {
                hamburgerParent.style.transform = '';
            }
        }
    }
}

// ===== SMOOTH SCROLL =====
function initializeSmoothScroll() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add scroll effect to header
    let lastScroll = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
}

// ===== SCROLL ANIMATIONS =====
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Trigger counter animation for stat numbers
                if (entry.target.classList.contains('stat-number')) {
                    animateCounter(entry.target);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll(
        '.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale, .stat-number'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// ===== COUNTER ANIMATION =====
function animateCounter(element) {
    // Check if already animated
    if (element.dataset.animated === 'true') return;
    element.dataset.animated = 'true';
    
    const target = element.textContent;
    const isNumber = target.match(/\d+/);
    
    if (!isNumber) return;
    
    const number = parseInt(isNumber[0]);
    const suffix = target.replace(/\d+/, '');
    const duration = 2000;
    const increment = number / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            element.textContent = number + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 16);
}

// ===== PARTICLE ANIMATION =====
function initializeParticles() {
    const particles = document.querySelectorAll('.particle');
    
    particles.forEach(particle => {
        // Randomize particle properties
        const randomSize = Math.random() * 3 + 2;
        const randomDelay = Math.random() * 20;
        const randomDuration = Math.random() * 10 + 15;
        
        particle.style.width = randomSize + 'px';
        particle.style.height = randomSize + 'px';
        particle.style.animationDelay = randomDelay + 's';
        particle.style.animationDuration = randomDuration + 's';
        
        // Add random colors
        const colors = [
            'rgba(126, 91, 239, 0.6)',
            'rgba(0, 201, 177, 0.6)',
            'rgba(255, 107, 107, 0.6)'
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = randomColor;
    });
}

// ===== FORM HANDLING =====
function initializeFormHandling() {
    const contactForm = document.querySelector('.contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data using proper field names
        const nameInput = this.querySelector('input[name="name"]') || this.querySelector('input[type="text"]');
        const emailInput = this.querySelector('input[name="email"]') || this.querySelector('input[type="email"]');
        const serviceSelect = this.querySelector('select[name="service"]');
        const messageTextarea = this.querySelector('textarea[name="message"]') || this.querySelector('textarea');
        
        const name = nameInput ? nameInput.value.trim() : '';
        const email = emailInput ? emailInput.value.trim() : '';
        const service = serviceSelect ? serviceSelect.value : '';
        const message = messageTextarea ? messageTextarea.value.trim() : '';
        
        // Validate form
        if (!name || !email || !message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Create mailto link
        const subject = encodeURIComponent(`Contact from ${name} - ${service || 'General Inquiry'}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nService: ${service || 'N/A'}\n\nMessage:\n${message}`);
        const mailtoLink = `mailto:jojobusiness0101@gmail.com?subject=${subject}&body=${body}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        showNotification('Opening your email client...', 'success');
        
        // Reset form after a delay
        setTimeout(() => {
            this.reset();
        }, 1000);
    });
    
    // Add input validation
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateInput(this);
            }
        });
    });
}

// ===== INPUT VALIDATION =====
function validateInput(input) {
    const value = input.value.trim();
    let isValid = true;
    
    if (input.hasAttribute('required') && !value) {
        isValid = false;
    }
    
    if (input.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(value);
    }
    
    if (isValid) {
        input.classList.remove('error');
        input.style.borderColor = '';
    } else {
        input.classList.add('error');
        input.style.borderColor = 'var(--accent-tertiary)';
    }
    
    return isValid;
}

// ===== SOCIAL LINKS =====
function initializeSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Track social media clicks (if analytics is set up)
            if (typeof gtag !== 'undefined' && href.includes('http')) {
                const platform = getSocialPlatform(href);
                gtag('event', 'social_click', {
                    'platform': platform,
                    'url': href
                });
            }
            
            // Add click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
}

// ===== GET SOCIAL PLATFORM =====
function getSocialPlatform(url) {
    if (url.includes('instagram')) return 'instagram';
    if (url.includes('pinterest')) return 'pinterest';
    if (url.includes('facebook')) return 'facebook';
    if (url.includes('linkedin')) return 'linkedin';
    if (url.includes('twitter') || url.includes('x.com')) return 'twitter';
    if (url.includes('discord')) return 'discord';
    if (url.includes('telegram')) return 'telegram';
    if (url.includes('mailto')) return 'email';
    return 'other';
}

// ===== EMAIL FUNCTIONALITY =====
function initializeEmailFunctionality() {
    // Make email addresses clickable
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Track email clicks
            if (typeof gtag !== 'undefined') {
                gtag('event', 'email_click', {
                    'email': this.getAttribute('href').replace('mailto:', '')
                });
            }
            
            // Add visual feedback
            showNotification('Opening email client...', 'info');
        });
    });
    
    // Add copy email functionality for prominent email button
    const emailProminentBtn = document.querySelector('.btn-email-prominent');
    if (emailProminentBtn) {
        emailProminentBtn.addEventListener('click', function(e) {
            // Don't prevent default on first click - allow mailto to work
            // But add copy on second click or long press
        });
        
        // Copy email on click with copy icon or right-click
        const copyIcon = emailProminentBtn.querySelector('.copy-icon');
        if (copyIcon) {
            copyIcon.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const email = 'jojobusiness0101@gmail.com';
                copyToClipboard(email);
                showNotification('Email copied to clipboard!', 'success');
                
                // Visual feedback
                this.textContent = '✓';
                setTimeout(() => {
                    this.textContent = '📋';
                }, 2000);
            });
        }
        
        // Also allow right-click to copy
        emailProminentBtn.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            const email = 'jojobusiness0101@gmail.com';
            copyToClipboard(email);
            showNotification('Email copied to clipboard!', 'success');
        });
    }
    
    // Add copy email functionality (optional)
    const contactEmail = document.querySelector('.contact-email a');
    if (contactEmail) {
        contactEmail.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            const email = this.getAttribute('href').replace('mailto:', '');
            copyToClipboard(email);
            showNotification('Email copied to clipboard!', 'success');
        });
    }
}

// ===== COPY TO CLIPBOARD =====
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
    } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
}

// ===== NEWSLETTER =====
function initializeNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        
        if (!email) {
            showNotification('Please enter your email address.', 'error');
            return;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Here you would typically send the email to your backend
        // For now, we'll just show a success message
        showNotification('Thank you for subscribing!', 'success');
        this.reset();
        
        // Track newsletter signup (if analytics is set up)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'newsletter_signup', {
                'email': email
            });
        }
    });
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 16px 24px;
        background: var(--bg-primary);
        color: var(--text-primary);
        border: 2px solid var(--border-color);
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;
    
    // Add type-specific styling
    if (type === 'success') {
        notification.style.borderColor = 'var(--accent-secondary)';
        notification.style.background = 'rgba(0, 201, 177, 0.1)';
    } else if (type === 'error') {
        notification.style.borderColor = 'var(--accent-tertiary)';
        notification.style.background = 'rgba(255, 107, 107, 0.1)';
    } else {
        notification.style.borderColor = 'var(--accent-primary)';
        notification.style.background = 'rgba(126, 91, 239, 0.1)';
    }
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ===== ADD ANIMATION STYLES =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== LAZY LOADING IMAGES =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for resize events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== CONSOLE MESSAGE =====
console.log('%c👋 Hello! Welcome to JoJo Block\'s Portfolio', 'font-size: 20px; font-weight: bold; color: #7e5bef;');
console.log('%c💼 Looking to collaborate? Contact me at jojobusiness0101@gmail.com', 'font-size: 14px; color: #00c9b1;');
