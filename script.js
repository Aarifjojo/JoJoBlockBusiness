/* ============================================
   JOJO BLOCK - CYBERPUNK JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all interactive functions
    initMobileMenu();
    initScrollAnimations();
    console.log('%c System Ready // JoJo Block ', 'background: #7000ff; color: #fff; padding: 4px; border-radius: 4px;');
});


/* --- 1. COPY EMAIL FUNCTIONALITY (Advanced) --- */
function copyEmail(emailText) {
    // 1. Try modern clipboard API
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(emailText)
            .then(() => triggerCopyFeedback(emailText))
            .catch(err => {
                console.error('Async copy failed, trying fallback', err);
                fallbackCopyText(emailText);
            });
    } else {
        // 2. Fallback for older browsers/insecure contexts
        fallbackCopyText(emailText);
    }
}

function fallbackCopyText(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    // Make it invisible but selectable
    textArea.style.position = "fixed";
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) triggerCopyFeedback(text);
        else showToast('❌ Copy failed. Please copy manually.');
    } catch (err) {
        console.error('Fallback copy failed', err);
        showToast('❌ Error copying email.');
    }
    document.body.removeChild(textArea);
}

function triggerCopyFeedback(text) {
    // 1. Show Toast Message
    showToast(`✨ Email Copied! Ready to connect.`);
    
    // 2. Visual Feedback on Hero Button (if clicked there)
    const emailLabel = document.getElementById('hero-email-text');
    if (emailLabel && emailLabel.innerText === text) {
        const originalText = emailLabel.innerText;
        emailLabel.innerText = "Copied to Clipboard!";
        emailLabel.style.color = "var(--accent-secondary)";
        
        setTimeout(() => {
            emailLabel.innerText = originalText;
             emailLabel.style.color = "";
        }, 2500);
    }
    
    // Optional: Open email client after a short delay
    // setTimeout(() => { window.location.href = `mailto:${text}`; }, 1500);
}


/* --- 2. TOAST NOTIFICATION SYSTEM --- */
function showToast(message) {
    const container = document.getElementById('toast-container');
    
    // Remove existing toasts to prevent stacking too many
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    // Add a little icon
    toast.innerHTML = `<span>${message}</span>`;
    
    container.appendChild(toast);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-20px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}


/* --- 3. MOBILE MENU HANDLING --- */
function initMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const closeToggle = document.getElementById('close-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.mobile-nav-links a');

    const openMenu = () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling background
    };

    const closeMenu = () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    };

    menuToggle.addEventListener('click', openMenu);
    closeToggle.addEventListener('click', closeMenu);

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Close menu when clicking outside (on overlay background)
    mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) closeMenu();
    });
}


/* --- 4. SCROLL ANIMATIONS (Intersection Observer) --- */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-up');
    
    const observerOptions = {
        root: null, // viewport
        threshold: 0.15, // trigger when 15% visible
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

/* --- 5. HEADER SCROLL EFFECT --- */
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
});
