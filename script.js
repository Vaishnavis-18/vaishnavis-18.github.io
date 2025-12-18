// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuBtn.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Form handling with validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Get form values for validation
        const name = this.querySelector('input[name="name"]').value.trim();
        const email = this.querySelector('input[name="_replyto"]').value.trim();
        const message = this.querySelector('textarea[name="message"]').value.trim();
        
        // Basic validation
        if (!name || !email || !message) {
            e.preventDefault();
            alert('Please fill in all fields.');
            return;
        }
        
        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            e.preventDefault();
            alert('Please enter a valid email address.');
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Add loading class for styling
        submitBtn.classList.add('loading');
        
        // Reset button after 5 seconds (in case of error)
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
        }, 5000);
        
        // Form will submit to Formspree after validation passes
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        // Don't prevent default for links with classes that should work normally
        if (this.classList.contains('btn') || 
            this.classList.contains('btn-outline') || 
            this.classList.contains('project-link') ||
            this.classList.contains('cert-actions')) {
            return;
        }
        
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.backdropFilter = 'blur(10px)';
    } else {
        nav.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
        nav.style.background = 'white';
        nav.style.backdropFilter = 'none';
    }
});

// Optional: Add active class to current section in navigation
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});
