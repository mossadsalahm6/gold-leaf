// Shop functionality
let cart = [];
let products = [
    {
        id: 1,
        name: "ورق ذهب تركي فاخر",
        description: "ورق ذهب تركي عالي الجودة، مقاس 14x14 سم، 25 ورقة",
        price: 450,
        originalPrice: 500,
        category: "gold-leaf",
        image: "🥇",
        badge: "sale",
        inStock: true
    },
    {
        id: 2,
        name: "ورق ذهب إنجليزي",
        description: "ورق ذهب إنجليزي أصلي، مقاس 16x16 سم، 20 ورقة",
        price: 380,
        category: "gold-leaf",
        image: "👑",
        badge: "new",
        inStock: true
    },
    {
        id: 3,
        name: "ورق ذهب فرنسي",
        description: "ورق ذهب فرنسي فاخر، مقاس 12x12 سم، 30 ورقة",
        price: 520,
        category: "gold-leaf",
        image: "✨",
        inStock: true
    },
    {
        id: 4,
        name: "فرشاة تذهيب احترافية",
        description: "فرشاة تذهيب من الشعر الطبيعي، مقاس متوسط",
        price: 85,
        category: "tools",
        image: "🖌️",
        inStock: true
    },
    {
        id: 5,
        name: "سكين تذهيب",
        description: "سكين تذهيب احترافي من الستانلس ستيل",
        price: 120,
        category: "tools",
        image: "🔪",
        inStock: true
    },
    {
        id: 6,
        name: "غراء تذهيب",
        description: "غراء تذهيب عالي الجودة، 250 مل",
        price: 65,
        category: "tools",
        image: "🧴",
        badge: "new",
        inStock: true
    },
    {
        id: 7,
        name: "مادة الباتينة الذهبية",
        description: "مادة باتينة ذهبية لإعطاء مظهر عتيق، 500 مل",
        price: 180,
        category: "materials",
        image: "🎨",
        inStock: true
    },
    {
        id: 8,
        name: "مادة الباتينة الفضية",
        description: "مادة باتينة فضية لإعطاء مظهر كلاسيكي، 500 مل",
        price: 170,
        category: "materials",
        image: "🥈",
        inStock: true
    },
    {
        id: 9,
        name: "ورنيش حماية شفاف",
        description: "ورنيش حماية شفاف للحفاظ على التذهيب، 1 لتر",
        price: 95,
        category: "materials",
        image: "🛡️",
        inStock: true
    },
    {
        id: 10,
        name: "قفازات تذهيب",
        description: "قفازات قطنية ناعمة لحماية ورق الذهب، 5 أزواج",
        price: 35,
        category: "accessories",
        image: "🧤",
        inStock: true
    },
    {
        id: 11,
        name: "منديل تذهيب حريري",
        description: "منديل حريري ناعم لتطبيق ورق الذهب",
        price: 45,
        category: "accessories",
        image: "🧻",
        inStock: true
    },
    {
        id: 12,
        name: "مجموعة أدوات المبتدئين",
        description: "مجموعة كاملة للمبتدئين تشمل ورق ذهب وأدوات أساسية",
        price: 280,
        originalPrice: 350,
        category: "accessories",
        image: "📦",
        badge: "sale",
        inStock: true
    }
];

// Initialize shop
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    updateCartUI();
    
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
});

// Load products
function loadProducts(category = 'all') {
    const productsGrid = document.getElementById('productsGrid');
    const filteredProducts = category === 'all' ? products : products.filter(p => p.category === category);
    
    productsGrid.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
    
    // Add animation
    const cards = productsGrid.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-category', product.category);
    
    const badge = product.badge ? `<div class="product-badge ${product.badge}">${product.badge === 'new' ? 'جديد' : 'خصم'}</div>` : '';
    const originalPrice = product.originalPrice ? `<span class="original-price">${product.originalPrice} جنيه</span>` : '';
    
    card.innerHTML = `
        <div class="product-image">
            ${badge}
            <span style="font-size: 4rem;">${product.image}</span>
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">
                <span class="current-price">${product.price} جنيه</span>
                ${originalPrice}
            </div>
            <div class="product-actions">
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i> أضف للسلة
                </button>
                <button class="view-details-btn" onclick="showProductDetails(${product.id})">
                    <i class="fas fa-eye"></i>
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Filter products
function filterProducts(category) {
    // Update active tab
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Load filtered products
    loadProducts(category);
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product || !product.inStock) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    updateCartUI();
    saveCart();
    showAddToCartAnimation();
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    saveCart();
}

// Update quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCartUI();
        saveCart();
    }
}

// Update cart UI
function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h3>السلة فارغة</h3>
                <p>لم تقم بإضافة أي منتجات بعد</p>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <span style="font-size: 1.5rem;">${item.image}</span>
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">${item.price} جنيه</div>
                    <div class="cart-item-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button class="remove-item" onclick="removeFromCart(${item.id})">حذف</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total;
}

// Toggle cart
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    
    cartSidebar.classList.toggle('open');
    cartOverlay.classList.toggle('show');
}

// Show product details
function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('modalBody');
    
    const originalPrice = product.originalPrice ? `<span class="original-price">${product.originalPrice} جنيه</span>` : '';
    const badge = product.badge ? `<div class="product-badge ${product.badge}">${product.badge === 'new' ? 'جديد' : 'خصم'}</div>` : '';
    
    modalBody.innerHTML = `
        <div style="text-align: center; margin-bottom: 30px;">
            <div style="font-size: 6rem; margin-bottom: 20px;">${product.image}</div>
            ${badge}
        </div>
        <h2 style="color: #2c1810; margin-bottom: 15px;">${product.name}</h2>
        <p style="color: #666; margin-bottom: 20px; line-height: 1.6;">${product.description}</p>
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 30px;">
            <span style="font-size: 2rem; color: #d4af37; font-weight: 700;">${product.price} جنيه</span>
            ${originalPrice}
        </div>
        <div style="display: flex; gap: 15px;">
            <button onclick="addToCart(${product.id}); closeProductModal();" style="flex: 1; background: linear-gradient(135deg, #d4af37, #f4e4bc); color: #2c1810; border: none; padding: 15px; border-radius: 10px; font-weight: 600; cursor: pointer;">
                <i class="fas fa-cart-plus"></i> أضف للسلة
            </button>
            <button onclick="closeProductModal()" style="background: transparent; border: 2px solid #d4af37; color: #d4af37; padding: 15px 20px; border-radius: 10px; cursor: pointer;">
                إغلاق
            </button>
        </div>
    `;
    
    modal.classList.add('show');
}

// Close product modal
function closeProductModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('show');
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('السلة فارغة!');
        return;
    }
    
    const modal = document.getElementById('checkoutModal');
    const orderItems = document.getElementById('orderItems');
    const finalTotal = document.getElementById('finalTotal');
    
    // Update order summary
    orderItems.innerHTML = cart.map(item => `
        <div class="order-item">
            <span>${item.name} x ${item.quantity}</span>
            <span>${item.price * item.quantity} جنيه</span>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    finalTotal.textContent = total;
    
    modal.classList.add('show');
}

// Close checkout modal
function closeCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    modal.classList.remove('show');
}

// Handle checkout form submission
document.addEventListener('DOMContentLoaded', function() {
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate order processing
            const submitBtn = this.querySelector('.submit-order-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<span class="loading"></span> جاري المعالجة...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('تم تأكيد طلبك بنجاح! سنتواصل معك قريباً.');
                
                // Clear cart
                cart = [];
                updateCartUI();
                saveCart();
                
                // Close modals
                closeCheckoutModal();
                toggleCart();
                
                // Reset form
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
});

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Show add to cart animation
function showAddToCartAnimation() {
    // Create floating notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #27ae60, #2ecc71);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        z-index: 10000;
        animation: slideInRight 0.3s ease, slideOutRight 0.3s ease 2s forwards;
        box-shadow: 0 5px 20px rgba(39, 174, 96, 0.3);
    `;
    notification.innerHTML = '<i class="fas fa-check"></i> تم إضافة المنتج للسلة';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 2500);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
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

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
});

// Close modals when clicking outside
document.addEventListener('click', function(e) {
    const productModal = document.getElementById('productModal');
    const checkoutModal = document.getElementById('checkoutModal');
    
    if (e.target === productModal) {
        closeProductModal();
    }
    
    if (e.target === checkoutModal) {
        closeCheckoutModal();
    }
});

// Search functionality (if needed)
function searchProducts(query) {
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    );
    
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

