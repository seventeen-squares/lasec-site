// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    });
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('toggle');
        }

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80, // Offset for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Simple Stat Counter Animation
const statsSection = document.querySelector('.stats');
let animated = false;

if (statsSection) {
    window.addEventListener('scroll', () => {
        const sectionPos = statsSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.3;

        if (sectionPos < screenPos && !animated) {
            const counters = document.querySelectorAll('.counter');
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const speed = 200;
                
                const updateCount = () => {
                    const count = +counter.innerText;
                    const inc = target / speed;
                    
                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 10);
                    } else {
                        counter.innerText = target;
                    }
                };
                
                updateCount();
            });
            animated = true;
        }
    });
}

// Sticky Header
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.padding = '0';
    } else {
        header.style.padding = '10px 0'; // Initial padding
    }
});

// Contact Form Mailto Handler
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const service = document.getElementById('contactService').value;
        const message = document.getElementById('contactMessage').value;
        
        const subject = `New Inquiry from ${name} - ${service || 'General Inquiry'}`;
        const body = `Name: ${name}%0D%0A` +
                     `Email: ${email}%0D%0A` +
                     `Service of Interest: ${service}%0D%0A%0D%0A` +
                     `Message:%0D%0A${message}`;
                     
        window.location.href = `mailto:info@lasec.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    });
}