// Blog functionality
document.addEventListener('DOMContentLoaded', function() {
    // Blog search functionality
    const searchInput = document.getElementById('blog-search-input');
    const searchBtn = document.getElementById('blog-search-btn');
    const blogPosts = document.querySelectorAll('.blog-post');

    function searchPosts() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        blogPosts.forEach(post => {
            const title = post.querySelector('.post-title').textContent.toLowerCase();
            const excerpt = post.querySelector('.post-excerpt').textContent.toLowerCase();
            const category = post.querySelector('.post-category').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || excerpt.includes(searchTerm) || category.includes(searchTerm)) {
                post.style.display = 'block';
                post.classList.remove('hidden');
            } else {
                post.style.display = 'none';
                post.classList.add('hidden');
            }
        });
    }

    searchBtn.addEventListener('click', searchPosts);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchPosts();
        }
    });

    // Category filtering
    const categoryBtns = document.querySelectorAll('.category-btn');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const selectedCategory = this.getAttribute('data-category');
            
            blogPosts.forEach(post => {
                const postCategory = post.getAttribute('data-category');
                
                if (selectedCategory === 'all' || postCategory === selectedCategory) {
                    post.style.display = 'block';
                    post.classList.remove('hidden');
                } else {
                    post.style.display = 'none';
                    post.classList.add('hidden');
                }
            });
        });
    });

    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                // Here you would typically send the email to your backend
                alert('شكراً لك! تم تسجيل اشتراكك في النشرة الإخبارية بنجاح.');
                this.querySelector('input[type="email"]').value = '';
            }
        });
    }

    // Pagination functionality
    const paginationBtns = document.querySelectorAll('.pagination-btn');
    
    paginationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.classList.contains('next')) {
                // Remove active class from all pagination buttons
                paginationBtns.forEach(b => {
                    if (!b.classList.contains('next')) {
                        b.classList.remove('active');
                    }
                });
                // Add active class to clicked button
                this.classList.add('active');
                
                // Here you would typically load the corresponding page content
                // For now, we'll just scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });

    // Smooth scrolling for anchor links
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

    // Add animation on scroll
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

    // Observe blog posts for animation
    blogPosts.forEach(post => {
        observer.observe(post);
    });

    // Add hover effects for better UX
    blogPosts.forEach(post => {
        post.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        post.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Auto-clear search when category is selected
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            searchInput.value = '';
        });
    });

    // Real-time search (optional)
    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            if (this.value.length >= 2 || this.value.length === 0) {
                searchPosts();
            }
        }, 300);
    });
});

