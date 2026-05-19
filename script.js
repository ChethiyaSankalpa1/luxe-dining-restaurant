// script.js

// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const closeMenuBtn = document.querySelector('.close-menu');
const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuOverlay.classList.add('active');
});

closeMenuBtn.addEventListener('click', () => {
    mobileMenuOverlay.classList.remove('active');
});

mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuOverlay.classList.remove('active');
    });
});

// Intersection Observer for Scroll Animations
const fadeUpElements = document.querySelectorAll('.fade-up');
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeUpElements.forEach(el => observer.observe(el));

// Testimonial Slider
const sliderContainer = document.getElementById('sliderContainer');
const slides = document.querySelectorAll('.slide');
const sliderDotsContainer = document.getElementById('sliderDots');

let currentSlide = 0;
const slideCount = slides.length;

// Create dots
for (let i = 0; i < slideCount; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.dataset.index = i;
    dot.addEventListener('click', () => goToSlide(i));
    sliderDotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll('.dot');

function goToSlide(index) {
    currentSlide = index;
    const offset = -currentSlide * 100;
    sliderContainer.style.transform = `translateX(${offset}%)`;
    
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentSlide].classList.add('active');
}

// Auto slide
setInterval(() => {
    let nextSlide = (currentSlide + 1) % slideCount;
    goToSlide(nextSlide);
}, 5000);

// Updated Premium Product Data (Verified, Active Unsplash Photo IDs)
const productsData = {
    1: {
        title: "Wagyu Beef Tenderloin",
        price: 120.00,
        img: "https://images.unsplash.com/photo-1544025162-8315ea076231?w=800&q=80",
        desc: "A5 Japanese Wagyu seared to perfection, served with a red wine reduction, potato purée, and roasted asparagus."
    },
    2: {
        title: "Ceylon Mud Crab Curry",
        price: 95.00,
        img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80",
        desc: "Handpicked wild Ceylon mud crab simmered in a dense, richly spiced, toasted local curry blend and fresh coconut cream."
    },
    3: {
        title: "Butter Poached Lobster",
        price: 95.00,
        img: "https://images.unsplash.com/photo-1559737712-4217316a7f0f?w=800&q=80",
        desc: "Fresh caught Maine lobster tail, slow-poached in herb butter, accompanied by saffron risotto and lemon foam."
    },
    4: {
        title: "Royal Ceylon Lamprais",
        price: 55.00,
        img: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=800&q=80",
        desc: "Steamed rice cooked in spiced mutton stock, served with frikkadels, caramelized onion sambol, aubergine pahi, and mixed meat, slow-baked in a banana leaf."
    },
    5: {
        title: "Truffle Mushroom Risotto",
        price: 65.00,
        img: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&q=80",
        desc: "Creamy arborio rice with wild forest mushrooms, finished with aged Parmigiano-Reggiano and freshly shaved black truffle."
    },
    6: {
        title: "Traditional Hopper Feast",
        price: 35.00,
        img: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=800&q=80",
        desc: "Light, crispy-edged rice crepes baked with free-range eggs. Served alongside premium Seeni Sambol and aromatic coconut Lunu Miris."
    },
    7: {
        title: "Pan-Seared Scallops",
        price: 75.00,
        img: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&q=80",
        desc: "Jumbo Hokkaido scallops seared to a golden brown, served over a bed of cauliflower silk and pancetta crisp."
    },
    8: {
        title: "Gourmet Kottu Supreme",
        price: 40.00,
        img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&q=80",
        desc: "A Sri Lankan classic elevated. Finely shredded flaky flatbread wok-tossed with farm-fresh organic eggs, fresh green vegetables, tender curry chicken, and lemongrass."
    }
};

// State: Order Cart
let cart = [];

// DOM Elements for Cart Sidebar
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const openCartBtn = document.getElementById('openCartBtn');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartSubtotal = document.getElementById('cartSubtotal');
const cartCountElement = document.querySelector('.cart-count');
const toast = document.getElementById('toast');

// Modal Logic
const modalOverlay = document.getElementById('productModal');
const closeModal = document.getElementById('closeModal');
const viewBtns = document.querySelectorAll('.view-btn');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalPrice = document.getElementById('modalPrice');
const modalDesc = document.getElementById('modalDesc');
const modalTotal = document.getElementById('modalTotal');
const addonSelect = document.getElementById('addonSelect');
const qtyInput = document.getElementById('qtyInput');

let currentProductPrice = 0;
let currentProductId = null;

// Open Cart
function openCart() {
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Cart
function closeCart() {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

openCartBtn.addEventListener('click', openCart);
closeCartBtn.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

// Show Toast Alert
function showToast(msg) {
    const toastMsg = document.getElementById('toastMsg');
    toastMsg.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Modal View Handler
viewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        const product = productsData[id];
        currentProductId = id;
        
        if(product) {
            modalImg.src = product.img;
            modalTitle.textContent = product.title;
            modalPrice.textContent = `$${product.price.toFixed(2)}`;
            modalDesc.textContent = product.desc;
            currentProductPrice = product.price;
            
            // Reset options
            addonSelect.value = "0";
            qtyInput.value = "1";
            updateModalTotal();
            
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
    });
});

closeModal.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
});

modalOverlay.addEventListener('click', (e) => {
    if(e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Calculate Modal Total
function updateModalTotal() {
    const addonPrice = parseFloat(addonSelect.value);
    const qty = parseInt(qtyInput.value);
    const total = (currentProductPrice + addonPrice) * qty;
    modalTotal.textContent = `$${total.toFixed(2)}`;
}

addonSelect.addEventListener('change', updateModalTotal);
qtyInput.addEventListener('change', () => {
    if(qtyInput.value < 1) qtyInput.value = 1;
    updateModalTotal();
});

document.querySelector('.qty-btn.minus').addEventListener('click', () => {
    if(qtyInput.value > 1) {
        qtyInput.value = parseInt(qtyInput.value) - 1;
        updateModalTotal();
    }
});

document.querySelector('.qty-btn.plus').addEventListener('click', () => {
    qtyInput.value = parseInt(qtyInput.value) + 1;
    updateModalTotal();
});

// Update Cart Count and Subtotal UI
function updateCartUI() {
    // Subtotal calculation
    let total = 0;
    let count = 0;
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div style="text-align: center; color: var(--text-secondary); margin-top: 40px;"><i class="fas fa-receipt" style="font-size: 3rem; margin-bottom: 15px; color: var(--border-color);"></i><p>Your order is empty.</p></div>';
    } else {
        cart.forEach((item, index) => {
            const itemCost = (item.price + item.addonPrice) * item.qty;
            total += itemCost;
            count += item.qty;

            const cartItemHTML = `
                <div class="cart-item">
                    <img src="${item.img}" alt="${item.title}">
                    <div class="cart-item-info">
                        <h4>${item.title}</h4>
                        ${item.addonName !== "Standard Preparation" ? `<span class="cart-item-enhancement">+ ${item.addonName}</span>` : ''}
                        <div class="cart-item-price">$${(item.price + item.addonPrice).toFixed(2)}</div>
                        <div class="cart-item-qty-control">
                            <button onclick="changeQty(${index}, -1)"><i class="fas fa-minus"></i></button>
                            <span>${item.qty}</span>
                            <button onclick="changeQty(${index}, 1)"><i class="fas fa-plus"></i></button>
                        </div>
                    </div>
                    <button class="remove-cart-item" onclick="removeFromCart(${index})" aria-label="Remove item"><i class="fas fa-trash-can"></i></button>
                </div>
            `;
            cartItemsContainer.innerHTML += cartItemHTML;
        });
    }

    cartSubtotal.textContent = `$${total.toFixed(2)}`;
    cartCountElement.textContent = count;
}

// Global functions for cart management (accessible from onclick attributes)
window.changeQty = function(index, amount) {
    cart[index].qty += amount;
    if (cart[index].qty < 1) {
        cart.splice(index, 1);
    }
    updateCartUI();
};

window.removeFromCart = function(index) {
    cart.splice(index, 1);
    updateCartUI();
    showToast("Dish removed from your order.");
};

// Add to Cart Logic (Quick Add from main menu)
document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        const product = productsData[id];
        
        if (product) {
            // Check if standard dish is already in cart
            const existingIndex = cart.findIndex(item => item.id === id && item.addonName === "Standard Preparation");
            
            if (existingIndex > -1) {
                cart[existingIndex].qty += 1;
            } else {
                cart.push({
                    id: id,
                    title: product.title,
                    price: product.price,
                    img: product.img,
                    qty: 1,
                    addonName: "Standard Preparation",
                    addonPrice: 0
                });
            }
            
            updateCartUI();
            
            // Add pulse animation to cart button
            const cartIcon = document.querySelector('.cart-btn i');
            cartIcon.style.transform = 'scale(1.3)';
            setTimeout(() => {
                cartIcon.style.transform = 'scale(1)';
            }, 200);
            
            showToast(`Added 1 ${product.title} to your order.`);
        }
    });
});

// Add to Cart Logic (From Modal Popup)
document.querySelector('.add-to-cart-modal').addEventListener('click', () => {
    const product = productsData[currentProductId];
    const qty = parseInt(qtyInput.value);
    const addonText = addonSelect.options[addonSelect.selectedIndex].text;
    const addonVal = parseFloat(addonSelect.value);
    
    // Extract clean name e.g., "Add Shaved Black Truffle (+$25.00)" -> "Add Shaved Black Truffle"
    const addonName = addonSelect.value === "0" ? "Standard Preparation" : addonText.split(' (+')[0];
    
    if (product) {
        // Match both product id and exact enhancement
        const existingIndex = cart.findIndex(item => item.id === currentProductId && item.addonName === addonName);
        
        if (existingIndex > -1) {
            cart[existingIndex].qty += qty;
        } else {
            cart.push({
                id: currentProductId,
                title: product.title,
                price: product.price,
                img: product.img,
                qty: qty,
                addonName: addonName,
                addonPrice: addonVal
            });
        }
        
        updateCartUI();
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Add pulse animation to cart button
        const cartIcon = document.querySelector('.cart-btn i');
        cartIcon.style.transform = 'scale(1.3)';
        setTimeout(() => {
            cartIcon.style.transform = 'scale(1)';
        }, 200);
        
        showToast(`Added ${qty} ${product.title} to your order.`);
    }
});

// Checkout Action
document.getElementById('checkoutBtn').addEventListener('click', () => {
    if (cart.length > 0) {
        showToast("Processing order... Thank you for dining with Luxe!");
        cart = [];
        updateCartUI();
        setTimeout(closeCart, 1500);
    } else {
        showToast("Your order is empty. Please add items to checkout.");
    }
});

// Newsletter Form
const newsletterForm = document.getElementById('newsletterForm');
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input').value;
    if(email) {
        showToast("Subscribed to newsletter successfully!");
        newsletterForm.reset();
    }
});
