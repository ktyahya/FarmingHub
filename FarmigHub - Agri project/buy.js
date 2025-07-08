// DOM Elements
const cartIcon = document.querySelector('.cart-icon');
const cartPopup = document.getElementById('cart-popup');
const closeCart = document.getElementById('close-cart');
const continueShoppingBtn = document.getElementById('continue-shopping');
const checkoutBtn = document.getElementById('checkout-btn');
const cartItemsContainer = document.getElementById('cart-items');
const cartCountElement = document.querySelector('.cart-count');
const cartTotalAmount = document.getElementById('cart-total-amount');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const newsletterForm = document.getElementById('newsletter-form');

// Product Data
const products = {
    1: {
        id: 1,
        name: "Beginner's Vegetable Seed Kit",
        price: 24.99,
        image: "/api/placeholder/300/300",
        badge: "Bestseller"
    },
    2: {
        id: 2,
        name: "All-Purpose Organic Fertilizer",
        price: 19.99,
        image: "/api/placeholder/300/300",
        badge: "Organic"
    },
    3: {
        id: 3,
        name: "5-Piece Garden Tool Set",
        price: 34.99,
        image: "/api/placeholder/300/300",
        badge: "New"
    },
    4: {
        id: 4,
        name: "Premium Potting Mix - 20L",
        price: 15.99,
        image: "/api/placeholder/300/300",
        badge: "Value"
    }
};

// Cart State
let cart = {
    items: {},
    totalQuantity: 0,
    totalPrice: 0
};

// Initialize the app
function init() {
    loadCartFromLocalStorage();
    updateCartDisplay();
    setupEventListeners();
}

// Setup Event Listeners
function setupEventListeners() {
    // Cart toggle
    cartIcon.addEventListener('click', toggleCart);
    closeCart.addEventListener('click', toggleCart);
    continueShoppingBtn.addEventListener('click', toggleCart);
    
    // Add to cart buttons
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-product-id'));
            addToCart(productId);
        });
    });
    
    // Newsletter form
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
    
    // Checkout button
    checkoutBtn.addEventListener('click', handleCheckout);
}

// Toggle Cart Popup
function toggleCart(e) {
    e.preventDefault();
    cartPopup.classList.toggle('active');
}

// Add Product to Cart
function addToCart(productId) {
    const product = products[productId];
    
    if (!product) return;
    
    if (cart.items[productId]) {
        cart.items[productId].quantity += 1;
    } else {
        cart.items[productId] = {
            ...product,
            quantity: 1
        };
    }
    
    updateCart();
    showAddToCartFeedback(productId);
    
    // Open cart popup after adding item
    cartPopup.classList.add('active');
}

// Update Cart State
function updateCart() {
    let totalQuantity = 0;
    let totalPrice = 0;
    
    for (const id in cart.items) {
        const item = cart.items[id];
        totalQuantity += item.quantity;
        totalPrice += item.price * item.quantity;
    }
    
    cart.totalQuantity = totalQuantity;
    cart.totalPrice = totalPrice;
    
    // Save to local storage
    saveCartToLocalStorage();
    
    // Update UI
    updateCartDisplay();
}

// Update Cart UI
function updateCartDisplay() {
    // Update cart count
    cartCountElement.textContent = cart.totalQuantity;
    
    // Update cart total
    cartTotalAmount.textContent = `$${cart.totalPrice.toFixed(2)}`;
    
    // Update cart items
    cartItemsContainer.innerHTML = '';
    
    if (cart.totalQuantity === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty</p>';
        return;
    }
    
    for (const id in cart.items) {
        const item = cart.items[id];
        const cartItemElement = createCartItemElement(item);
        cartItemsContainer.appendChild(cartItemElement);
    }
}

// Create Cart Item Element
function createCartItemElement(item) {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item slide-in';
    
    cartItem.innerHTML = `
        <div class="cart-item-image">
            <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-details">
            <h4 class="cart-item-title">${item.name}</h4>
            <p class="cart-item-price">$${item.price.toFixed(2)}</p>
            <div class="cart-item-quantity">
                <button class="quantity-btn decrease-quantity" data-product-id="${item.id}">-</button>
                <span class="quantity-value">${item.quantity}</span>
                <button class="quantity-btn increase-quantity" data-product-id="${item.id}">+</button>
            </div>
            <button class="remove-item" data-product-id="${item.id}">Remove</button>
        </div>
    `;
    
    // Add event listeners for quantity buttons
    const decreaseBtn = cartItem.querySelector('.decrease-quantity');
    const increaseBtn = cartItem.querySelector('.increase-quantity');
    const removeBtn = cartItem.querySelector('.remove-item');
    
    decreaseBtn.addEventListener('click', () => {
        updateItemQuantity(item.id, -1);
    });
    
    increaseBtn.addEventListener('click', () => {
        updateItemQuantity(item.id, 1);
    });
    
    removeBtn.addEventListener('click', () => {
        removeCartItem(item.id);
    });
    
    return cartItem;
}

// Update Item Quantity
function updateItemQuantity(productId, change) {
    const item = cart.items[productId];
    
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeCartItem(productId);
    } else {
        updateCart();
    }
}

// Remove Item from Cart
function removeCartItem(productId) {
    delete cart.items[productId];
    updateCart();
}

// Save Cart to Local Storage
function saveCartToLocalStorage() {
    localStorage.setItem('farmingHubCart', JSON.stringify(cart));
}

// Load Cart from Local Storage
function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('farmingHubCart');
    
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Show Add to Cart Feedback
function showAddToCartFeedback(productId) {
    const button = document.querySelector(`.add-to-cart[data-product-id="${productId}"]`);
    
    if (!button) return;
    
    // Store original text
    const originalText = button.textContent;
    
    // Change button text and style
    button.textContent = 'Added!';
    button.style.backgroundColor = '#4CAF50';
    button.style.pointerEvents = 'none';
    
    // Reset button after 1.5 seconds
    setTimeout(() => {
        button.textContent = originalText;
        button.style.backgroundColor = '';
        button.style.pointerEvents = '';
    }, 1500);
}

// Handle Newsletter Form Submit
function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    
    if (!email) return;
    
    // Normally would send this to a server
    console.log('Newsletter subscription:', email);
    
    // Show success message
    emailInput.value = '';
    
    const successMsg = document.createElement('div');
    successMsg.className = 'fade-in';
    successMsg.style.color = 'var(--success-color)';
    successMsg.style.marginTop = '10px';
    successMsg.textContent = 'Thank you for subscribing!';
    
    // Remove any existing success messages
    const existingMsg = newsletterForm.querySelector('.fade-in');
    if (existingMsg) {
        existingMsg.remove();
    }
    
    newsletterForm.appendChild(successMsg);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        successMsg.remove();
    }, 3000);
}

// Handle Checkout
function handleCheckout() {
    if (cart.totalQuantity === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // In a real application, this would redirect to a checkout page
    alert('Proceeding to checkout...');
    console.log('Checkout items:', cart);
}

// Initialize the app
document.addEventListener('DOMContentLoaded', init);

// Category card interaction
const categoryCards = document.querySelectorAll('.category-card');
categoryCards.forEach(card => {
    card.addEventListener('click', function(e) {
        // Allow buttons to handle their own clicks
        if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
            return;
        }
        
        // Get the button within this card and click it
        const btn = this.querySelector('.btn');
        if (btn) {
            btn.click();
        }
    });
});

// Product card animation on scroll
function animateOnScroll() {
    const products = document.querySelectorAll('.product-card');
    const categories = document.querySelectorAll('.category-card');
    const elements = [...products, ...categories];
    
    elements.forEach((element, index) => {
        // Check if element is in viewport
        const rect = element.getBoundingClientRect();
        const isInViewport = (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
        
        if (isInViewport) {
            // Add animation with delay based on index
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}

// Initial setup for scroll animations
function setupScrollAnimations() {
    const products = document.querySelectorAll('.product-card');
    const categories = document.querySelectorAll('.category-card');
    const elements = [...products, ...categories];
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run once on load
    animateOnScroll();
    
    // Add scroll event
    window.addEventListener('scroll', animateOnScroll);
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', setupScrollAnimations);