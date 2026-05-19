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

// Product Data for Restaurant Menu (Mock data for Modal)
const productsData = {
    1: {
        title: "Wagyu Beef Tenderloin",
        price: 120.00,
        img: "https://images.unsplash.com/photo-1544025162-8315ea076231?w=800&q=80",
        desc: "A5 Japanese Wagyu seared to perfection, served with a red wine reduction, potato purée, and roasted asparagus."
    },
    2: {
        title: "Butter Poached Lobster",
        price: 95.00,
        img: "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?w=800&q=80",
        desc: "Fresh caught Maine lobster tail, slow-poached in herb butter, accompanied by saffron risotto and lemon foam."
    },
    3: {
        title: "Truffle Mushroom Risotto",
        price: 65.00,
        img: "https://images.unsplash.com/photo-1626844131082-256783844137?w=800&q=80",
        desc: "Creamy arborio rice with wild forest mushrooms, finished with aged Parmigiano-Reggiano and freshly shaved black truffle."
    },
    4: {
        title: "Pan-Seared Scallops",
        price: 75.00,
        img: "https://images.unsplash.com/photo-1599921841143-819065a55cc6?w=800&q=80",
        desc: "Jumbo Hokkaido scallops seared to a golden brown, served over a bed of cauliflower silk and pancetta crisp."
    },
    5: {
        title: "Ora King Salmon",
        price: 85.00,
        img: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80",
        desc: "Melt-in-your-mouth New Zealand Ora King salmon with a citrus beurre blanc, paired with seasonal microgreens."
    },
    6: {
        title: "Seafood Saffron Paella",
        price: 110.00,
        img: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=800&q=80",
        desc: "A Spanish classic elevated with premium saffron threads, loaded with tiger prawns, mussels, calamari, and chorizo."
    }
};

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

viewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        const product = productsData[id];
        
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

// Calculate Total
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

// Cart functionality & Toast Notification
let cartCount = 0;
const cartCountElement = document.querySelector('.cart-count');
const toast = document.getElementById('toast');
const addToCartBtns = document.querySelectorAll('.add-to-cart, .add-to-cart-modal');

function showToast(msg) {
    const toastMsg = document.getElementById('toastMsg');
    toastMsg.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

addToCartBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        let qty = 1;
        if(btn.classList.contains('add-to-cart-modal')) {
            qty = parseInt(qtyInput.value);
            modalOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        
        cartCount += qty;
        cartCountElement.textContent = cartCount;
        
        // Add animation to cart icon
        const cartIcon = document.querySelector('.cart-btn i');
        cartIcon.style.transform = 'scale(1.3)';
        setTimeout(() => {
            cartIcon.style.transform = 'scale(1)';
        }, 200);
        
        showToast(`Added ${qty} dish(es) to order successfully!`);
    });
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
