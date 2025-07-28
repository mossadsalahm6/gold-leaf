// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initMobileMenu();
    initScrollAnimations();
    initGalleryFilter();
    initSmoothScrolling();
    initContactForm();
    initLoadingScreen();
    initParallaxEffects();
    initCounterAnimations();
    initTypingEffect();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in class to elements
    const animatedElements = document.querySelectorAll('.service-card, .gold-type-card, .gallery-item, .contact-item, .step');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Header background on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
}

// Gallery Filter
function initGalleryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const itemCategories = item.getAttribute('data-category').split(' ');
                if (filterValue === 'all' || itemCategories.includes(filterValue)) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.5s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact Form
function initContactForm() {
    const form = document.querySelector('.contact-form form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const name = form.querySelector('input[type="text"]').value;
            const phone = form.querySelector('input[type="tel"]').value;
            const email = form.querySelector('input[type="email"]').value;
            const service = form.querySelector('select').value;
            const message = form.querySelector('textarea').value;
            
            // Basic validation
            if (!name || !phone || !email || !service || !message) {
                showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
                return;
            }
            
            // Show loading
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'جاري الإرسال...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                showNotification('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً', 'success');
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        font-family: 'Cairo', sans-serif;
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Loading Screen
function initLoadingScreen() {
    // Create loading screen
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading';
    loadingScreen.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(loadingScreen);
    
    // Hide loading screen after page load
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 1000);
    });
}

// Parallax Effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.floating-element');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach((element, index) => {
            const speed = (index + 1) * 0.2;
            element.style.transform = `translateY(${rate * speed}px)`;
        });
    });
}

// Counter Animations
function initCounterAnimations() {
    const counters = [
        { element: null, target: 500, suffix: '+', label: 'مشروع مكتمل' },
        { element: null, target: 15, suffix: '+', label: 'سنة خبرة' },
        { element: null, target: 1000, suffix: '+', label: 'عميل راضي' },
        { element: null, target: 50, suffix: '+', label: 'جائزة' }
    ];
    
    // Create counter section if it doesn't exist
    if (!document.querySelector('.stats-section')) {
        const statsSection = document.createElement('section');
        statsSection.className = 'stats-section';
        statsSection.style.cssText = `
            background: linear-gradient(135deg, #d4af37, #f4e4a6);
            padding: 4rem 0;
            text-align: center;
        `;
        
        const container = document.createElement('div');
        container.className = 'container';
        
        const statsGrid = document.createElement('div');
        statsGrid.style.cssText = `
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 2rem;
        `;
        
        counters.forEach((counter, index) => {
            const statItem = document.createElement('div');
            statItem.style.cssText = `
                background: rgba(255,255,255,0.2);
                padding: 2rem;
                border-radius: 15px;
                backdrop-filter: blur(10px);
            `;
            
            const counterElement = document.createElement('div');
            counterElement.className = 'counter';
            counterElement.style.cssText = `
                font-size: 3rem;
                font-weight: bold;
                color: white;
                margin-bottom: 0.5rem;
            `;
            counterElement.textContent = '0';
            
            const labelElement = document.createElement('div');
            labelElement.style.cssText = `
                color: white;
                font-size: 1.1rem;
                opacity: 0.9;
            `;
            labelElement.textContent = counter.label;
            
            statItem.appendChild(counterElement);
            statItem.appendChild(labelElement);
            statsGrid.appendChild(statItem);
            
            counter.element = counterElement;
        });
        
        container.appendChild(statsGrid);
        statsSection.appendChild(container);
        
        // Insert after services section
        const servicesSection = document.querySelector('.services');
        if (servicesSection) {
            servicesSection.parentNode.insertBefore(statsSection, servicesSection.nextSibling);
        }
    }
    
    // Animate counters when in view
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    });
    
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        observer.observe(statsSection);
    }
    
    function animateCounters() {
        counters.forEach(counter => {
            if (counter.element) {
                animateCounter(counter.element, counter.target, counter.suffix);
            }
        });
    }
    
    function animateCounter(element, target, suffix) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, 20);
    }
}

// Typing Effect
function initTypingEffect() {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        
        let index = 0;
        const typeWriter = () => {
            if (index < text.length) {
                heroSubtitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after hero animation
        setTimeout(typeWriter, 1500);
    }
}

// Image Lazy Loading
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
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
    
    images.forEach(img => imageObserver.observe(img));
}

// Gallery Lightbox
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const title = this.querySelector('.gallery-overlay h4').textContent;
            const description = this.querySelector('.gallery-overlay p').textContent;
            
            createLightbox(img.src, title, description);
        });
    });
}

function createLightbox(imageSrc, title, description) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const lightboxContent = document.createElement('div');
    lightboxContent.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        text-align: center;
        position: relative;
    `;
    
    const img = document.createElement('img');
    img.src = imageSrc;
    img.style.cssText = `
        max-width: 100%;
        max-height: 80vh;
        object-fit: contain;
        border-radius: 10px;
    `;
    
    const info = document.createElement('div');
    info.style.cssText = `
        color: white;
        margin-top: 1rem;
    `;
    info.innerHTML = `<h3>${title}</h3><p>${description}</p>`;
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
        position: absolute;
        top: -40px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(255,255,255,0.2);
    `;
    
    lightboxContent.appendChild(img);
    lightboxContent.appendChild(info);
    lightboxContent.appendChild(closeBtn);
    lightbox.appendChild(lightboxContent);
    document.body.appendChild(lightbox);
    
    // Show lightbox
    setTimeout(() => {
        lightbox.style.opacity = '1';
    }, 10);
    
    // Close lightbox
    const closeLightbox = () => {
        lightbox.style.opacity = '0';
        setTimeout(() => {
            lightbox.remove();
        }, 300);
    };
    
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
}

// Initialize lightbox after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initGalleryLightbox();
});

// Scroll to top button
function initScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #d4af37, #f4e4a6);
        border: none;
        border-radius: 50%;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
    `;
    
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
    
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', function() {
    initScrollToTop();
});

// Performance optimization
function optimizePerformance() {
    // Debounce scroll events
    let scrollTimeout;
    const originalScrollHandler = window.onscroll;
    
    window.onscroll = function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(function() {
            if (originalScrollHandler) {
                originalScrollHandler();
            }
        }, 10);
    };
    
    // Preload critical images
    const criticalImages = [
        'images/salons_gold_leaf/uTXSavWqrOl4.jpg',
        'images/gold_leaf_types/EF21X3q5JZov.jpg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', optimizePerformance);


// Testimonials functionality
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-item');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

function showTestimonial(index) {
    // Hide all testimonials
    testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show current testimonial
    if (testimonials[index]) {
        testimonials[index].classList.add('active');
    }
    
    // Activate current dot
    if (dots[index]) {
        dots[index].classList.add('active');
    }
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
}

// Event listeners for testimonial navigation
if (nextBtn) {
    nextBtn.addEventListener('click', nextTestimonial);
}

if (prevBtn) {
    prevBtn.addEventListener('click', prevTestimonial);
}

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
    });
});

// Auto-play testimonials
let testimonialInterval = setInterval(nextTestimonial, 5000);

// Pause auto-play on hover
const testimonialsSection = document.querySelector('.testimonials-slider');
if (testimonialsSection) {
    testimonialsSection.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });
    
    testimonialsSection.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(nextTestimonial, 5000);
    });
}

// Animated counters for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when section is visible
const statsSection = document.querySelector('.testimonial-stats');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(statsSection);
}

// Review modal functionality
function openReviewModal() {
    const modal = document.getElementById('reviewModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeReviewModal() {
    const modal = document.getElementById('reviewModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Star rating functionality
function initStarRating() {
    const stars = document.querySelectorAll('.star-rating i');
    let currentRating = 0;
    
    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            currentRating = index + 1;
            updateStarDisplay(currentRating);
        });
        
        star.addEventListener('mouseenter', () => {
            updateStarDisplay(index + 1);
        });
    });
    
    const starContainer = document.querySelector('.star-rating');
    if (starContainer) {
        starContainer.addEventListener('mouseleave', () => {
            updateStarDisplay(currentRating);
        });
    }
    
    function updateStarDisplay(rating) {
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }
}

// Initialize star rating when modal opens
document.addEventListener('DOMContentLoaded', function() {
    // Create review modal HTML if it doesn't exist
    if (!document.getElementById('reviewModal')) {
        const modalHTML = `
            <div id="reviewModal" class="review-modal">
                <div class="review-modal-content">
                    <span class="modal-close" onclick="closeReviewModal()">&times;</span>
                    <div class="review-modal-header">
                        <h3>شاركنا تجربتك</h3>
                        <p>نقدر رأيك ونسعد بمشاركة تجربتك معنا</p>
                    </div>
                    <div class="review-modal-body">
                        <form class="review-form" id="reviewForm">
                            <div class="form-group">
                                <label for="reviewName">الاسم *</label>
                                <input type="text" id="reviewName" name="name" required>
                            </div>
                            <div class="form-group">
                                <label for="reviewJob">المهنة/المدينة</label>
                                <input type="text" id="reviewJob" name="job" placeholder="مثال: مهندس - القاهرة">
                            </div>
                            <div class="form-group">
                                <label>التقييم *</label>
                                <div class="star-rating">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="reviewService">نوع الخدمة</label>
                                <select id="reviewService" name="service">
                                    <option value="">اختر نوع الخدمة</option>
                                    <option value="gold-leaf">تذهيب الأثاث</option>
                                    <option value="patina">تقنية الباتينة</option>
                                    <option value="decoration">الديكورات المنزلية</option>
                                    <option value="restoration">ترميم الأثاث</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="reviewText">تجربتك معنا *</label>
                                <textarea id="reviewText" name="review" placeholder="اكتب تجربتك مع خدماتنا..." required></textarea>
                            </div>
                            <button type="submit" class="review-submit-btn">إرسال التقييم</button>
                        </form>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
    
    // Initialize star rating
    initStarRating();
    
    // Handle review form submission
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const reviewData = Object.fromEntries(formData);
            
            // Get star rating
            const activeStars = document.querySelectorAll('.star-rating i.active').length;
            reviewData.rating = activeStars;
            
            // Validate required fields
            if (!reviewData.name || !reviewData.review || activeStars === 0) {
                alert('يرجى ملء جميع الحقول المطلوبة وإضافة التقييم');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('.review-submit-btn');
            submitBtn.textContent = 'جاري الإرسال...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('شكراً لك! تم إرسال تقييمك بنجاح وسيتم مراجعته قريباً.');
                closeReviewModal();
                this.reset();
                
                // Reset star rating
                document.querySelectorAll('.star-rating i').forEach(star => {
                    star.classList.remove('active');
                });
                
                submitBtn.textContent = 'إرسال التقييم';
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('reviewModal');
        if (event.target === modal) {
            closeReviewModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeReviewModal();
        }
    });
});

// Add testimonials animation on scroll
const testimonialItems = document.querySelectorAll('.testimonial-item');
if (testimonialItems.length > 0) {
    const testimonialObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    testimonialItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease-out';
        testimonialObserver.observe(item);
    });
}

