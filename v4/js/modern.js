// Modern Portfolio JavaScript with Enhanced Features
// =================================================

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

// Main initialization function
function initializePortfolio() {
    // Initialize all components
    initLoader();
    initNavigation();
    initThemeToggle();
    initColorPicker();
    initTypingEffect();
    initCounters();
    initSkillBars();
    initSkillsChart();
    initContactForm();
    initScrollEffects();
    initAOS();
    // Remove particle animations for cleaner look
    // initParticles();
    initBackToTop();
    initLazyLoading();
    initAnimations();
    
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Enhanced Loader with skeleton screens
function initLoader() {
    const loader = document.getElementById('loader');
    const body = document.body;
    
    // Show skeleton screens before content loads
    showSkeletonScreens();
    
    // Simulate loading time with progress
    let progress = 0;
    const progressBar = document.querySelector('.loader-progress-bar');
    
    const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        if (progressBar) {
            progressBar.style.width = progress + '%';
        }
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            hideLoader();
        }
    }, 150);
    
    function hideLoader() {
        setTimeout(() => {
            loader.classList.add('hidden');
            body.classList.remove('loading');
            hideSkeletonScreens();
            showMainContent();
            
            // Remove loader from DOM after animation
            setTimeout(() => {
                if (loader.parentNode) {
                    loader.parentNode.removeChild(loader);
                }
            }, 500);
        }, 800);
    }
}

// Skeleton screen functionality
function showSkeletonScreens() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        if (section.id !== 'home') {
            section.style.opacity = '0';
        }
    });
}

function hideSkeletonScreens() {
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.style.transition = 'opacity 0.5s ease';
            section.style.opacity = '1';
        }, index * 200);
    });
}

function showMainContent() {
    // Removed float animations for cleaner design
    const elements = document.querySelectorAll('.animate-slide-left, .animate-slide-right');
    elements.forEach((el, index) => {
        setTimeout(() => {
            // Skip adding float animation for cleaner look
            // el.classList.add('animate-float');
        }, index * 100);
    });
}

// Enhanced Theme Toggle
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            // Add transition class
            body.classList.add('theme-transition');
            
            // Update theme
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
            
            // Remove transition class
            setTimeout(() => {
                body.classList.remove('theme-transition');
            }, 300);
        });
    }
}

function updateThemeIcon(theme) {
    const lightIcon = document.querySelector('.theme-icon.light');
    const darkIcon = document.querySelector('.theme-icon.dark');
    
    if (theme === 'dark') {
        lightIcon?.style.setProperty('display', 'block');
        darkIcon?.style.setProperty('display', 'none');
    } else {
        lightIcon?.style.setProperty('display', 'none');
        darkIcon?.style.setProperty('display', 'block');
    }
}

// Color Picker Functionality
function initColorPicker() {
    const colorPicker = document.getElementById('colorPicker');
    const colorToggle = colorPicker?.querySelector('.color-picker-toggle');
    const colorOptions = colorPicker?.querySelectorAll('.color-option');
    const body = document.body;
    
    // Load saved color theme
    const savedColorTheme = localStorage.getItem('colorTheme') || 'green';
    body.setAttribute('data-color-theme', savedColorTheme);
    updateActiveColorOption(savedColorTheme);
    
    // Toggle color picker menu
    if (colorToggle) {
        colorToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            colorPicker.classList.toggle('active');
        });
    }
    
    // Handle color option selection
    colorOptions?.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            const theme = option.getAttribute('data-theme');
            
            // Update theme
            body.setAttribute('data-color-theme', theme);
            body.className = body.className.replace(/theme-\w+/g, '');
            if (theme !== 'green') {
                body.classList.add(`theme-${theme}`);
            }
            
            // Save preference
            localStorage.setItem('colorTheme', theme);
            updateActiveColorOption(theme);
            
            // Close picker
            colorPicker.classList.remove('active');
            
            // Add visual feedback
            option.style.transform = 'scale(1.2)';
            setTimeout(() => {
                option.style.transform = '';
            }, 200);
        });
    });
    
    // Close picker when clicking outside
    document.addEventListener('click', () => {
        colorPicker?.classList.remove('active');
    });
}

function updateActiveColorOption(theme) {
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.classList.toggle('active', option.getAttribute('data-theme') === theme);
    });
}

// Enhanced Lazy Loading
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const container = img.closest('.lazy-container');
                    
                    img.addEventListener('load', () => {
                        img.classList.add('loaded');
                        container?.classList.remove('lazy-container');
                    });
                    
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.classList.add('loaded');
        });
    }
}

// Animation Enhancements
function initAnimations() {
    // Intersection Observer for scroll animations
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => observer.observe(el));
    
    // Add hover animations
    const hoverElements = document.querySelectorAll('.hover-lift, .hover-scale, .hover-glow');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            this.style.transform = this.classList.contains('hover-lift') ? 'translateY(-5px)' :
                                  this.classList.contains('hover-scale') ? 'scale(1.05)' : '';
        });
        
        el.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// ...existing code...
function initNavigation() {
    const nav = document.querySelector('.nav');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Handle scroll effects
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Add scrolled class for styling
        if (currentScrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Active link highlighting and smooth scroll
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const navHeight = nav.offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    navToggle?.classList.remove('active');
                    navMenu?.classList.remove('active');
                }
            }
        });
    });
    
    // Update active link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                correspondingNavLink?.classList.add('active');
            }
        });
    });
}

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
    } else if (prefersDark) {
        body.setAttribute('data-theme', 'dark');
    }
    
    // Theme toggle event
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
}

// Typing effect for hero section
function initTypingEffect() {
    const typingText = document.getElementById('typing-text');
    if (!typingText) return;
    
    const texts = [
        'Data Engineer',
        'Backend Lead',
        'Team Leader',
        'System Architect',
        'Tech Mentor'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start typing effect
    setTimeout(type, 1000);
}

// Counter animation for hero stats
function initCounters() {
    const counters = document.querySelectorAll('.hero-stat-number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    // Use Intersection Observer to trigger animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Skill bar animations
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const animateSkillBar = (bar) => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
    };
    
    // Use Intersection Observer to trigger animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach((bar, index) => {
                    setTimeout(() => {
                        animateSkillBar(bar);
                    }, index * 200);
                });
                observer.unobserve(entry.target);
            }
        });
    });
    
    // Observe skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(category => {
        observer.observe(category);
    });
}

// Skills radar chart
function initSkillsChart() {
    const canvas = document.getElementById('skillsChart');
    if (!canvas || typeof Chart === 'undefined') return;
    
    const ctx = canvas.getContext('2d');
    
    // Chart data
    const data = {
        labels: [
            'Backend Development',
            'Data Engineering',
            'DevOps & Cloud',
            'System Architecture',
            'Team Leadership',
            'Machine Learning'
        ],
        datasets: [{
            label: 'Skill Level',
            data: [95, 90, 85, 88, 85, 75],
            backgroundColor: 'rgba(37, 99, 235, 0.2)',
            borderColor: 'rgba(37, 99, 235, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(37, 99, 235, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(37, 99, 235, 1)'
        }]
    };
    
    // Chart options
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            r: {
                angleLines: {
                    color: 'rgba(0, 0, 0, 0.1)'
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)'
                },
                pointLabels: {
                    font: {
                        size: 12,
                        family: 'Inter'
                    },
                    color: '#6B7280'
                },
                ticks: {
                    display: false
                },
                min: 0,
                max: 100
            }
        },
        elements: {
            line: {
                borderWidth: 3
            },
            point: {
                radius: 4,
                hoverRadius: 6
            }
        }
    };
    
    // Create chart
    new Chart(ctx, {
        type: 'radar',
        data: data,
        options: options
    });
}

// Contact form functionality
function initContactForm() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('formSuccess');
    
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        try {
            // Simulate form submission (replace with actual endpoint)
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Show success message
            successMessage.classList.add('show');
            form.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 5000);
            
            console.log('Form submitted:', data);
        } catch (error) {
            console.error('Form submission error:', error);
            // Handle error (show error message)
        }
    });
}

// Scroll effects and animations
function initScrollEffects() {
    // Remove parallax effect for hero section particles
    // const hero = document.querySelector('.hero');
    // const heroParticles = document.getElementById('particles');
    
    // window.addEventListener('scroll', () => {
    //     const scrolled = window.pageYOffset;
    //     const rate = scrolled * -0.5;
    //     
    //     if (heroParticles) {
    //         heroParticles.style.transform = `translateY(${rate}px)`;
    //     }
    // });
}

// Initialize AOS (Animate On Scroll) alternative
function initAOS() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add delay based on data-aos-delay attribute
                const delay = entry.target.getAttribute('data-aos-delay') || 0;
                
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, parseInt(delay));
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Particle animation for hero background - DISABLED for cleaner look
function initParticles() {
    // Particles animation disabled for better performance and cleaner design
    return;
    
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Random size
        const size = Math.random() * 4 + 1;
        
        // Random animation duration
        const duration = Math.random() * 20 + 10;
        
        particle.style.cssText = `
            position: absolute;
            left: ${x}%;
            top: ${y}%;
            width: ${size}px;
            height: ${size}px;
            background: rgba(37, 99, 235, 0.3);
            border-radius: 50%;
            animation: float ${duration}s ease-in-out infinite;
            animation-delay: ${Math.random() * 10}s;
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    // Add CSS for particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translateY(0px) rotate(0deg);
                opacity: 0.3;
            }
            33% {
                transform: translateY(-20px) rotate(120deg);
                opacity: 0.6;
            }
            66% {
                transform: translateY(20px) rotate(240deg);
                opacity: 0.3;
            }
        }
    `;
    document.head.appendChild(style);
}

// Back to top button
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    
    // Scroll to top when clicked
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Utility functions
// =================

// Throttle function for performance
function throttle(func, wait) {
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

// Debounce function for performance
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Smooth scroll polyfill for older browsers
function smoothScrollTo(target, duration = 1000) {
    const targetElement = document.querySelector(target);
    if (!targetElement) return;
    
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }
    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// Performance monitoring
function logPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page load time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
            }, 0);
        });
    }
}

// Initialize performance monitoring in development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    logPerformance();
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // In production, you might want to send this to an error reporting service
});

// Unhandled promise rejection handling
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    // In production, you might want to send this to an error reporting service
});

// Export functions for external use if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializePortfolio,
        smoothScrollTo,
        throttle,
        debounce
    };
}
