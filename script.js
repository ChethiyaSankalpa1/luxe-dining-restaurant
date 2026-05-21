// script.js

// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
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

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuOverlay.classList.add('active');
    });
}

if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', () => {
        mobileMenuOverlay.classList.remove('active');
    });
}

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

if (sliderContainer && sliderDotsContainer && slideCount > 0) {
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
}

// Comprehensive Product Data in Sri Lankan Rupees (LKR)
const productsData = {
    1: {
        title: "Chicken Lamprais",
        price: 1200.00,
        img: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=800&q=80",
        desc: "Traditional rice cooked in meat stock, accompanied by chicken curry, frikkadels (meatballs), blachan, and aubergine pahi, slow-baked in a banana leaf.",
        category: "srilankan",
        isPopular: true
    },
    2: {
        title: "Ceylon Mud Crab Curry",
        price: 9500.00,
        img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80",
        desc: "Wild fresh mud crab simmered in a dense, richly spiced, toasted local curry blend and creamy coconut extract.",
        category: "srilankan",
        isPopular: false
    },
    3: {
        title: "Chicken Roll",
        price: 210.00,
        img: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=800&q=80",
        desc: "Classic Sri Lankan style roll. Crispy breaded pastry stuffed with savory spiced chicken and potato filling.",
        category: "savouries",
        isPopular: true
    },
    4: {
        title: "Coriander & Fish Pastry",
        price: 210.00,
        img: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=800&q=80",
        desc: "Buttery, flaky golden puff pastry puff filled with seasoned minced fish and garden fresh coriander leaves.",
        category: "savouries",
        isPopular: false
    },
    5: {
        title: "Crispy Chicken Quiche",
        price: 200.00,
        img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80",
        desc: "Baked open-face pastry crust filled with savory custard, minced chicken breast, herbs, and melted gouda cheese.",
        category: "savouries",
        isPopular: false
    },
    6: {
        title: "Chocolate Fudge Cake",
        price: 2100.00,
        img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80",
        desc: "Rich, moist dark chocolate cake layered with luscious fudge frosting. Superb texture and rich flavor.",
        category: "cakes",
        isPopular: true,
        sizes: {
            "500g": 2100.00,
            "1kg": 4100.00,
            "2kg": 8050.00
        }
    },
    7: {
        title: "Coffee & Chocolate Fudge Cake",
        price: 2250.00,
        img: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=800&q=80",
        desc: "A rich layers of chocolate fudge paired with aromatic Ceylon coffee-infused sponge cake.",
        category: "cakes",
        isPopular: false,
        sizes: {
            "500g": 2250.00,
            "1kg": 4350.00,
            "2kg": 8500.00
        }
    },
    8: {
        title: "Love Cake",
        price: 2050.00,
        img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80",
        desc: "Traditional Sri Lankan festive cake made with semolina, honey, cashews, pumpkin preserve, and spiced with nutmeg and cardamom. (400g)",
        category: "cakes",
        isPopular: true
    },
    9: {
        title: "Butter Cake",
        price: 1350.00,
        img: "https://images.unsplash.com/photo-1518047601542-79f18c655718?w=800&q=80",
        desc: "Classic Sri Lankan style buttery vanilla pound cake. Simple, moist, and delicious.",
        category: "cakes",
        isPopular: false,
        sizes: {
            "500g": 1350.00,
            "1kg": 2600.00
        }
    },
    10: {
        title: "Traditional Hopper Feast",
        price: 1500.00,
        img: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=800&q=80",
        desc: "Light, crispy-edged rice crepes baked with free-range eggs. Served with Seeni Sambol and Lunu Miris.",
        category: "srilankan",
        isPopular: false
    },
    11: {
        title: "Gourmet Kottu Supreme",
        price: 1800.00,
        img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&q=80",
        desc: "Elevated shredded flatbread wok-tossed with farm eggs, fresh vegetables, chicken curry, and fresh herbs.",
        category: "srilankan",
        isPopular: true
    },
    12: {
        title: "Berkshire Black Pork Curry",
        price: 2200.00,
        img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
        desc: "Tender pork belly cubes simmered in heavy-roasted spices, local organic coconut vinegar, and curry leaf broth.",
        category: "srilankan",
        isPopular: false
    },
    13: {
        title: "Modern Ceylon Watalappan",
        price: 850.00,
        img: "https://images.unsplash.com/photo-1579372786545-d24232daf58c?w=800&q=80",
        desc: "Rich, spiced coconut custard made with organic palm jaggery, nutmeg, and cardamom, topped with cashews.",
        category: "dessert",
        isPopular: true
    },
    14: {
        title: "Golden Saffron Mousse",
        price: 950.00,
        img: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&q=80",
        desc: "Light saffron mousse topped with rosewater droplets, micro greens, and premium crushed pistachios.",
        category: "dessert",
        isPopular: false
    },
    15: {
        title: "Gold Leaf Chocolate Fondant",
        price: 1200.00,
        img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80",
        desc: "Melting liquid center chocolate cake using 70% dark cocoa, decorated with edible gold leaf and vanilla gelato.",
        category: "dessert",
        isPopular: false
    },
    16: {
        title: "Jaffna Spiced Prawn Thermidor",
        price: 3500.00,
        img: "https://images.unsplash.com/photo-1559737712-4217316a7f0f?w=800&q=80",
        desc: "Jumbo ocean prawns baked in-shell, filled with a creamy mix of Jaffna curry spices, coconut arrack, and gruyère cheese.",
        category: "srilankan",
        isPopular: false
    }
};

// Application State
let cart = [];
let diningPreference = "dinein"; 
let searchQuery = "";
let activeCategory = "all";
let currentUser = null;

// Load user session from localStorage
try {
    const cachedUser = localStorage.getItem('zentro_logged_in_user');
    if (cachedUser) {
        currentUser = JSON.parse(cachedUser);
    }
} catch (e) {
    console.error("Error reading login state from localStorage", e);
}

// DOM Elements
const productGridContainer = document.getElementById('productGridContainer');
const searchPanel = document.getElementById('searchPanel');
const searchInput = document.getElementById('searchInput');
const openSearchBtn = document.getElementById('openSearchBtn');
const closeSearchBtn = document.getElementById('closeSearchBtn');

const authModal = document.getElementById('authModal');
const openAuthBtn = document.getElementById('openAuthBtn');
const closeAuthModal = document.getElementById('closeAuthModal');
const tabLogin = document.getElementById('tabLogin');
const tabRegister = document.getElementById('tabRegister');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const switchToRegister = document.getElementById('switchToRegister');
const switchToLogin = document.getElementById('switchToLogin');

const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const openCartBtn = document.getElementById('openCartBtn');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartSubtotal = document.getElementById('cartSubtotal');
const cartCountElement = document.querySelector('.cart-count');
const toast = document.getElementById('toast');
const dineinBtn = document.getElementById('dineinBtn');
const takeawayBtn = document.getElementById('takeawayBtn');

const modalOverlay = document.getElementById('productModal');
const closeModal = document.getElementById('closeModal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalPrice = document.getElementById('modalPrice');
const modalDesc = document.getElementById('modalDesc');
const modalTotal = document.getElementById('modalTotal');
const addonSelect = document.getElementById('addonSelect');
const qtyInput = document.getElementById('qtyInput');
const modalSizeGroup = document.getElementById('modalSizeGroup');
const sizeSelectorGroup = document.getElementById('sizeSelectorGroup');

let currentProductPrice = 0;
let currentProductId = null;
let currentProductSize = null;

// Helper to Format Currency (Rs. X,XXX.XX)
function formatPrice(num) {
    return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Render Products Grid
function renderProducts() {
    if (!productGridContainer) return;
    
    productGridContainer.innerHTML = '';
    
    const filtered = Object.entries(productsData).filter(([id, product]) => {
        const matchesCategory = activeCategory === 'all' || 
            (activeCategory === 'popular' && product.isPopular) || 
            (product.category === activeCategory);
            
        const matchesSearch = searchQuery === '' || 
            product.title.toLowerCase().includes(searchQuery) || 
            product.desc.toLowerCase().includes(searchQuery);
            
        return matchesCategory && matchesSearch;
    });
    
    if (filtered.length === 0) {
        productGridContainer.innerHTML = `
            <div class="search-empty-state">
                <i class="fas fa-search-minus"></i>
                <h3>No items found</h3>
                <p>We couldn't find anything matching "${searchQuery}". Try searching for something else.</p>
            </div>
        `;
        return;
    }
    
    filtered.forEach(([id, product]) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.category = product.category;
        
        card.innerHTML = `
            <div class="card-img-wrapper">
                <img src="${product.img}" alt="${product.title}">
                <div class="hover-overlay">
                    <button class="view-btn" data-id="${id}">Quick View</button>
                </div>
            </div>
            <div class="card-info">
                <div class="rating">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
                <h3>${product.title}</h3>
                <p class="desc">${product.desc}</p>
                <div class="card-footer">
                    <span class="price">Rs. ${formatPrice(product.price)}</span>
                    <button class="add-to-cart" data-id="${id}" aria-label="Add to cart">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        `;
        productGridContainer.appendChild(card);
    });
    
    // Bind Action Triggers
    setupQuickAddTriggers();
    setupModalTriggers();
}

// Category Filtering Navigation
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        activeCategory = btn.dataset.filter;
        renderProducts();
    });
});

// Search Overlay Actions
if (openSearchBtn) {
    openSearchBtn.addEventListener('click', () => {
        searchPanel.classList.toggle('active');
        if (searchPanel.classList.contains('active')) {
            searchInput.focus();
        }
    });
}

if (closeSearchBtn) {
    closeSearchBtn.addEventListener('click', () => {
        searchPanel.classList.remove('active');
    });
}

// Close search bar when clicking outside it
document.addEventListener('click', (e) => {
    if (searchPanel && openSearchBtn && !searchPanel.contains(e.target) && !openSearchBtn.contains(e.target)) {
        searchPanel.classList.remove('active');
    }
});

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim().toLowerCase();
        renderProducts();
    });
}

// User Profile / Authentication Modal
function updateAuthUI() {
    if (!openAuthBtn) return;
    if (currentUser) {
        const firstName = currentUser.name.split(' ')[0];
        openAuthBtn.innerHTML = `<span class="user-greeting">Hi, ${firstName}</span>`;
    } else {
        openAuthBtn.innerHTML = `<i class="fas fa-user"></i>`;
    }
}

if (openAuthBtn) {
    openAuthBtn.addEventListener('click', () => {
        if (currentUser) {
            if (confirm(`Logged in as ${currentUser.name}.\n\nWould you like to Log Out?`)) {
                currentUser = null;
                localStorage.removeItem('zentro_logged_in_user');
                updateAuthUI();
                showToast("Logged out successfully.");
            }
        } else {
            authModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
}

if (closeAuthModal) {
    closeAuthModal.addEventListener('click', () => {
        authModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

if (authModal) {
    authModal.addEventListener('click', (e) => {
        if (e.target === authModal) {
            authModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Auth modal tabs logic
function showLoginTab() {
    tabLogin.classList.add('active');
    tabRegister.classList.remove('active');
    loginForm.classList.add('active');
    registerForm.classList.remove('active');
}

function showRegisterTab() {
    tabRegister.classList.add('active');
    tabLogin.classList.remove('active');
    registerForm.classList.add('active');
    loginForm.classList.remove('active');
}

if (tabLogin) tabLogin.addEventListener('click', showLoginTab);
if (tabRegister) tabRegister.addEventListener('click', showRegisterTab);
if (switchToRegister) switchToRegister.addEventListener('click', showRegisterTab);
if (switchToLogin) switchToLogin.addEventListener('click', showLoginTab);

// Form submissions
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('regName').value.trim();
        const email = document.getElementById('regEmail').value.trim();
        const phone = document.getElementById('regPhone').value.trim();
        const address = document.getElementById('regAddress').value.trim();
        const password = document.getElementById('regPassword').value;
        
        let users = [];
        try {
            const stored = localStorage.getItem('zentro_users');
            if (stored) users = JSON.parse(stored);
        } catch (err) {
            console.error(err);
        }
        
        if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
            showToast("This email is already registered. Please login.");
            showLoginTab();
            return;
        }
        
        const newUser = { name, email, phone, address, password };
        users.push(newUser);
        
        try {
            localStorage.setItem('zentro_users', JSON.stringify(users));
            localStorage.setItem('zentro_logged_in_user', JSON.stringify(newUser));
        } catch (err) {
            console.error(err);
        }
        
        currentUser = newUser;
        updateAuthUI();
        registerForm.reset();
        authModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        showToast(`Welcome, ${name}! Account registered successfully.`);
    });
}

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;
        
        let users = [];
        try {
            const stored = localStorage.getItem('zentro_users');
            if (stored) users = JSON.parse(stored);
        } catch (err) {
            console.error(err);
        }
        
        const matched = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
        if (matched) {
            currentUser = matched;
            try {
                localStorage.setItem('zentro_logged_in_user', JSON.stringify(matched));
            } catch (err) {
                console.error(err);
            }
            updateAuthUI();
            loginForm.reset();
            authModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            showToast(`Welcome back, ${matched.name}!`);
        } else {
            showToast("Invalid credentials. Please register or retry.");
        }
    });
}

// Dining Preference Selectors
if (dineinBtn) {
    dineinBtn.addEventListener('click', () => {
        diningPreference = "dinein";
        dineinBtn.classList.add('active');
        takeawayBtn.classList.remove('active');
        showToast("Selected Dining Preference: Dine-In");
    });
}

if (takeawayBtn) {
    takeawayBtn.addEventListener('click', () => {
        diningPreference = "takeaway";
        takeawayBtn.classList.add('active');
        dineinBtn.classList.remove('active');
        showToast("Selected Dining Preference: Takeaway");
    });
}

// Cart Sidebar Actions
function openCart() {
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

if (openCartBtn) openCartBtn.addEventListener('click', openCart);
if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

// Show Toast Alerts
function showToast(msg) {
    const toastMsg = document.getElementById('toastMsg');
    if (toastMsg && toast) {
        toastMsg.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

<<<<<<< HEAD
// Ingredient Heritage Stories database
const heritageStories = {
    1: "Zentro Fab's Wagyu is glazed with a reduction infused with organic Ceylon Cardamom sourced from the foothills of Knuckles Range, blending rich Japanese marbled fat with delicate highland citrus-spice notes.",
    2: "Harvested from the tranquil brackish waters of Chilaw lagoons. We toast our own house Curry Powder—a multi-generation recipe featuring dry-roasted Ceylon Coriander, Fennel seeds, and wild Curry Leaves (Karapincha).",
    3: "Dotted with saffron oil and a splash of local Coconut Arrack. Fresh southern-coast lobster represents the pearl of the Indian Ocean, poached at a precise 58°C to retain its pristine ocean sweetness.",
    4: "An extraordinary Dutch Burgher heirloom. Rice is simmered in high-quality Mutton bone broth, baked in charred banana leaves which impart a signature smoky aroma, together with Sri Lankan Frikkadels (spiced meatballs).",
    5: "Arborio grains are finished with cold-pressed extra virgin coconut oil alongside fresh Italian black truffles, creating a highly unique velvet texture with a gentle tropical whisper.",
    6: "Made using fermented red rice batter and sparkling palm toddy. The resulting lacey, crispy bowl-shaped hoppers are seasoned with a fiery Lunu Miris of crushed Maldive fish, red onions, and bird's eye chili.",
    7: "Paired with a purée of local manioc (cassava) root and finished with micro-herbs harvested from our in-house hydroponic garden, blending ocean brine with earthy Sri Lankan roots.",
    8: "Crafted with hand-stretched Godamba flatbread shredded and wok-tossed with aromatic lemongrass, ginger-garlic paste, organic eggs, and rich coconut chicken curry.",
    9: "We glaze organic duck breast with a premium glaze made of Cinnamomum Verum (True Ceylon Cinnamon) from the pristine slopes of Kandy, offering a sweet, warm flavor profile that is completely unique.",
    10: "Slow-cooked for 6 hours using a traditional Sri Lankan 'Goraka' (Garcinia Cambogia) paste which naturally tenderizes the fat, combined with heavily dry-roasted local black curry powder.",
    11: "This dish infuses French Thermidor with a legendary Jaffna 'Kool' spice mix. Plump lagoon prawns are baked in a rich cream of dry chili, cumin, tamarind, and a splash of aged palm arrack.",
    12: "Our devilled sauce features locally brewed toddy vinegar and high-heat roasted red banana peppers, creating the perfect balance of intense spice, tang, and caramelized onion sweetness.",
    13: "The crown jewel of Sri Lankan desserts. We use dark, organic Kithul Jaggery tapped by hand from wild palm trees, double-steamed with farm-fresh organic eggs, cardamom, and fresh coconut cream.",
    14: "Flavored with Kashmiri saffron threads and sweet Rosewater, garnished with a caramelized crunch of Sri Lankan cashew nuts harvested in the golden dry zones of Puttalam.",
    15: "Our rich 70% dark chocolate cake features a hidden heart liquid center subtly spiced with a single drop of wild clove extract, highlighting the island's historical identity as a global spice hub."
};

// Modal View Handler
=======
// Modal View Handler (Quick View)
>>>>>>> 8626172 (Update .gitignore to exclude node_modules and prepare deployment)
function setupModalTriggers() {
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            const product = productsData[id];
            currentProductId = id;
            currentProductSize = null;
            
            if (product) {
                modalImg.src = product.img;
                modalTitle.textContent = product.title;
                modalDesc.textContent = product.desc;
                
                // Populating Sizing Buttons if present
                if (product.sizes) {
                    modalSizeGroup.style.display = 'block';
                    sizeSelectorGroup.innerHTML = '';
                    
                    const sizes = Object.keys(product.sizes);
                    currentProductSize = sizes[0]; // Set default size to first
                    currentProductPrice = product.sizes[currentProductSize];
                    
                    sizes.forEach((size, idx) => {
                        const sizeBtn = document.createElement('button');
                        sizeBtn.className = `size-btn ${idx === 0 ? 'active' : ''}`;
                        sizeBtn.textContent = size;
                        sizeBtn.type = 'button';
                        sizeBtn.addEventListener('click', () => {
                            document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
                            sizeBtn.classList.add('active');
                            currentProductSize = size;
                            currentProductPrice = product.sizes[size];
                            updateModalTotal();
                        });
                        sizeSelectorGroup.appendChild(sizeBtn);
                    });
                } else {
                    modalSizeGroup.style.display = 'none';
                    currentProductPrice = product.price;
                }
                
                modalPrice.textContent = `Rs. ${formatPrice(currentProductPrice)}`;
                
                // Reset select controls & defaults
                addonSelect.value = "0";
                qtyInput.value = "1";
                updateModalTotal();
                
                // Reset heritage story to collapsed and populate text
                const heritageStoryContent = document.getElementById('heritageStoryContent');
                if (heritageStoryContent) {
                    heritageStoryContent.classList.add('d-none');
                }
                const heritageStoryText = document.getElementById('heritageStoryText');
                if (heritageStoryText) {
                    heritageStoryText.textContent = heritageStories[id] || "No heritage story available for this selection.";
                }
                
                modalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden'; 
            }
        });
    });
}

<<<<<<< HEAD
// Bind Heritage Story button toggler
const heritageStoryBtn = document.getElementById('heritageStoryBtn');
const heritageStoryContent = document.getElementById('heritageStoryContent');
if (heritageStoryBtn && heritageStoryContent) {
    heritageStoryBtn.addEventListener('click', () => {
        heritageStoryContent.classList.toggle('d-none');
    });
}

closeModal.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
});

modalOverlay.addEventListener('click', (e) => {
    if(e.target === modalOverlay) {
=======
if (closeModal) {
    closeModal.addEventListener('click', () => {
>>>>>>> 8626172 (Update .gitignore to exclude node_modules and prepare deployment)
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Calculate Modal Total Price
function updateModalTotal() {
    if (!modalTotal) return;
    const addonPrice = parseFloat(addonSelect.value);
    const qty = parseInt(qtyInput.value);
    const total = (currentProductPrice + addonPrice) * qty;
    modalTotal.textContent = `Rs. ${formatPrice(total)}`;
}

if (addonSelect) addonSelect.addEventListener('change', updateModalTotal);
if (qtyInput) {
    qtyInput.addEventListener('change', () => {
        if (qtyInput.value < 1) qtyInput.value = 1;
        updateModalTotal();
    });
}

const minusBtn = document.querySelector('.qty-btn.minus');
if (minusBtn) {
    minusBtn.addEventListener('click', () => {
        if (qtyInput.value > 1) {
            qtyInput.value = parseInt(qtyInput.value) - 1;
            updateModalTotal();
        }
    });
}

const plusBtn = document.querySelector('.qty-btn.plus');
if (plusBtn) {
    plusBtn.addEventListener('click', () => {
        qtyInput.value = parseInt(qtyInput.value) + 1;
        updateModalTotal();
    });
}

// Render and Update Order Cart UI
function updateCartUI() {
    let total = 0;
    let count = 0;
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div style="text-align: center; color: var(--text-secondary); margin-top: 40px;">
                <i class="fas fa-receipt" style="font-size: 3rem; margin-bottom: 15px; color: var(--border-color);"></i>
                <p>Your order is empty.</p>
            </div>
        `;
    } else {
        cart.forEach((item, index) => {
            const itemCost = (item.price + item.addonPrice) * item.qty;
            total += itemCost;
            count += item.qty;
            
            const displayTitle = item.size ? `${item.title} (${item.size})` : item.title;

            const cartItemHTML = `
                <div class="cart-item">
                    <img src="${item.img}" alt="${item.title}">
                    <div class="cart-item-info">
                        <h4>${displayTitle}</h4>
                        ${item.addonName !== "Standard Preparation" ? `<span class="cart-item-enhancement">+ ${item.addonName}</span>` : ''}
                        <div class="cart-item-price">Rs. ${formatPrice(item.price + item.addonPrice)}</div>
                        <div class="cart-item-qty-control">
                            <button onclick="changeQty(${index}, -1)"><i class="fas fa-minus"></i></button>
                            <span>${item.qty}</span>
                            <button onclick="changeQty(${index}, 1)"><i class="fas fa-plus"></i></button>
                        </div>
                    </div>
                    <button class="remove-cart-item" onclick="removeFromCart(${index})" aria-label="Remove item">
                        <i class="fas fa-trash-can"></i>
                    </button>
                </div>
            `;
            cartItemsContainer.innerHTML += cartItemHTML;
        });
    }

    cartSubtotal.textContent = `Rs. ${formatPrice(total)}`;
    cartCountElement.textContent = count;
}

// Global functions for cart modifications
window.changeQty = function(index, amount) {
    cart[index].qty += amount;
    if (cart[index].qty < 1) {
        cart.splice(index, 1);
    }
    updateCartUI();
};

window.removeFromCart = function(index) {
    const item = cart[index];
    const itemLabel = item.size ? `${item.title} (${item.size})` : item.title;
    cart.splice(index, 1);
    updateCartUI();
    showToast(`Removed ${itemLabel} from your order.`);
};

// Main Menu Quick Add
function setupQuickAddTriggers() {
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = btn.dataset.id;
            const product = productsData[id];
            
            if (product) {
                let sizeName = null;
                let price = product.price;
                
                if (product.sizes) {
                    const sizes = Object.keys(product.sizes);
                    sizeName = sizes[0]; // Choose first size by default
                    price = product.sizes[sizeName];
                }
                
                // Match exact product, standard preparation and size
                const existingIndex = cart.findIndex(item => 
                    item.id === id && 
                    item.addonName === "Standard Preparation" && 
                    item.size === sizeName
                );
                
                if (existingIndex > -1) {
                    cart[existingIndex].qty += 1;
                } else {
                    cart.push({
                        id: id,
                        title: product.title,
                        price: price,
                        img: product.img,
                        qty: 1,
                        addonName: "Standard Preparation",
                        addonPrice: 0,
                        size: sizeName
                    });
                }
                
                updateCartUI();
                
                // Visual Pulse Indicator
                const cartIcon = document.querySelector('.cart-btn i');
                if (cartIcon) {
                    cartIcon.style.transform = 'scale(1.3)';
                    setTimeout(() => {
                        cartIcon.style.transform = 'scale(1)';
                    }, 200);
                }
                
                const itemLabel = sizeName ? `${product.title} (${sizeName})` : product.title;
                showToast(`Added 1 ${itemLabel} to your order.`);
            }
        });
    });
}

// Modal Detail Window Add to Cart
const addToCartModalBtn = document.querySelector('.add-to-cart-modal');
if (addToCartModalBtn) {
    addToCartModalBtn.addEventListener('click', () => {
        const product = productsData[currentProductId];
        const qty = parseInt(qtyInput.value);
        const addonText = addonSelect.options[addonSelect.selectedIndex].text;
        const addonVal = parseFloat(addonSelect.value);
        
        // Extract clean name, e.g., "Add Shaved Black Truffle (+Rs. 2,500.00)" -> "Add Shaved Black Truffle"
        const addonName = addonSelect.value === "0" ? "Standard Preparation" : addonText.split(' (+')[0];
        
        if (product) {
            const existingIndex = cart.findIndex(item => 
                item.id === currentProductId && 
                item.addonName === addonName &&
                item.size === currentProductSize
            );
            
            if (existingIndex > -1) {
                cart[existingIndex].qty += qty;
            } else {
                cart.push({
                    id: currentProductId,
                    title: product.title,
                    price: currentProductPrice,
                    img: product.img,
                    qty: qty,
                    addonName: addonName,
                    addonPrice: addonVal,
                    size: currentProductSize
                });
            }
            
            updateCartUI();
            modalOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            const cartIcon = document.querySelector('.cart-btn i');
            if (cartIcon) {
                cartIcon.style.transform = 'scale(1.3)';
                setTimeout(() => {
                    cartIcon.style.transform = 'scale(1)';
                }, 200);
            }
            
            const itemLabel = currentProductSize ? `${product.title} (${currentProductSize})` : product.title;
            showToast(`Added ${qty} ${itemLabel} to your order.`);
        }
    });
}

<<<<<<< HEAD
// --- AUDIO CONTROLLER & SOUND FX ---
const ambientMusic = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3');
ambientMusic.loop = true;
ambientMusic.volume = 0.25;

const tickSound = new Audio('https://www.soundjay.com/buttons/sounds/button-16.mp3');
tickSound.volume = 0.15;

const successChime = new Audio('https://www.soundjay.com/buttons/sounds/button-09.mp3');
successChime.volume = 0.3;

function playTick() {
    tickSound.currentTime = 0;
    tickSound.play().catch(e => console.log('Audio playback prevented by browser policy'));
}

function playChime() {
    successChime.currentTime = 0;
    successChime.play().catch(e => console.log('Audio playback prevented by browser policy'));
}

// Global click audio delegate for tactile sound effects
document.body.addEventListener('click', (e) => {
    const target = e.target.closest('button, a, .zone-card, .type-option, .qty-btn, .filter-btn, .view-btn, .add-to-cart, .add-to-cart-modal');
    if (target) {
        playTick();
    }
});

// Ambient Music Player Controller
const playerToggleBtn = document.getElementById('playerToggleBtn');
let isMusicPlaying = false;

if (playerToggleBtn) {
    playerToggleBtn.addEventListener('click', () => {
        const icon = playerToggleBtn.querySelector('i');
        if (isMusicPlaying) {
            ambientMusic.pause();
            playerToggleBtn.classList.remove('playing');
            icon.className = 'fas fa-volume-xmark';
            isMusicPlaying = false;
            showToast("Ambient music muted");
        } else {
            ambientMusic.play().then(() => {
                playerToggleBtn.classList.add('playing');
                icon.className = 'fas fa-volume-high';
                isMusicPlaying = true;
                showToast("Ambient music playing");
            }).catch(err => {
                console.error("Audio play failed:", err);
                showToast("Click again to play music");
            });
        }
    });
}

// --- TABLE RESERVATIONS LOGIC ---
const zoneCards = document.querySelectorAll('.zone-card');
const selectedZoneInput = document.getElementById('selectedZoneInput');

// Zone Selection Card Handlers
zoneCards.forEach(card => {
    card.addEventListener('click', () => {
        zoneCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        const zone = card.dataset.zone;
        if (selectedZoneInput) {
            selectedZoneInput.value = zone;
        }
    });
});

// Pre-fill tomorrow's date on the date picker
const resDateInput = document.getElementById('resDate');
if (resDateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    resDateInput.value = `${yyyy}-${mm}-${dd}`;
    resDateInput.min = `${yyyy}-${mm}-${dd}`;
}

// Reservation Form Submit Handler
const reservationForm = document.getElementById('reservationForm');
const ticketModal = document.getElementById('ticketModal');

if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('resName').value.trim();
        const phone = document.getElementById('resPhone').value.trim();
        const date = document.getElementById('resDate').value;
        const time = document.getElementById('resTime').value;
        const guests = document.getElementById('resGuests').value;
        const zone = selectedZoneInput ? selectedZoneInput.value : "Skyline Balcony";
        
        if (!name || !phone || !date || !time) {
            showToast("Please fill in all reservation details.");
            return;
        }
        
        // Generate dynamic ticket code (e.g. ZF-29402-SKY)
        const randomNum = Math.floor(10000 + Math.random() * 90000);
        const zoneShort = zone.split(' ').map(w => w[0]).join('').toUpperCase();
        const ticketCode = `ZF-${randomNum}-${zoneShort}`;
        
        // Populate golden ticket stub
        document.getElementById('ticketGuestName').textContent = name;
        document.getElementById('ticketDate').textContent = date;
        document.getElementById('ticketTime').textContent = time;
        document.getElementById('ticketGuestCount').textContent = `${guests} ${guests == 1 ? 'Guest' : 'Guests'}`;
        document.getElementById('ticketZone').textContent = zone;
        document.getElementById('ticketCode').textContent = ticketCode;
        
        // Play success chime and open modal
        playChime();
        showToast("Table reserved successfully!");
        
        if (ticketModal) {
            ticketModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        // Push reservation to localStorage database
        const localReservations = JSON.parse(localStorage.getItem('zf_reservations')) || [];
        localReservations.push({
            id: ticketCode,
            name: name,
            phone: phone,
            date: date,
            time: time,
            guests: parseInt(guests) || 2,
            zone: zone,
            status: "pending"
        });
        localStorage.setItem('zf_reservations', JSON.stringify(localReservations));
        
        reservationForm.reset();
        // Reset guests range text display to default (2 Guests)
        const guestCountDisplay = document.getElementById('guestCountDisplay');
        if (guestCountDisplay) {
            guestCountDisplay.textContent = "2 Guests";
        }
    });
}

// Close Ticket modal logic
const closeTicketModal = document.getElementById('closeTicketModal');
const closeTicketSuccessBtn = document.getElementById('closeTicketSuccessBtn');

function hideTicketModal() {
    if (ticketModal) {
        ticketModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

if (closeTicketModal) closeTicketModal.addEventListener('click', hideTicketModal);
if (closeTicketSuccessBtn) closeTicketSuccessBtn.addEventListener('click', hideTicketModal);
if (ticketModal) {
    ticketModal.addEventListener('click', (e) => {
        if (e.target === ticketModal) {
            hideTicketModal();
        }
    });
}

// --- MULTI-STEP CHECKOUT & TRACKER LOGIC ---
const cartStepItems = document.getElementById('cartStepItems');
const cartStepCheckout = document.getElementById('cartStepCheckout');
const cartStepTracker = document.getElementById('cartStepTracker');

function showCartStep(stepId) {
    if (cartStepItems && cartStepCheckout && cartStepTracker) {
        cartStepItems.classList.remove('active');
        cartStepCheckout.classList.remove('active');
        cartStepTracker.classList.remove('active');
        
        if (stepId === 1) {
            cartStepItems.classList.add('active');
        } else if (stepId === 2) {
            cartStepCheckout.classList.add('active');
        } else if (stepId === 3) {
            cartStepTracker.classList.add('active');
        }
    }
}

// Step 1: Click "Proceed to Checkout"
=======
// Checkout Form Submission
>>>>>>> 8626172 (Update .gitignore to exclude node_modules and prepare deployment)
const checkoutBtn = document.getElementById('checkoutBtn');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
<<<<<<< HEAD
            showCartStep(2);
            
            // Populate Checkout Summary
            const chkItemsCount = document.getElementById('chkItemsCount');
            const chkMiniItems = document.getElementById('chkMiniItems');
            const chkTotal = document.getElementById('chkTotal');
            
            let total = 0;
            let count = 0;
            chkMiniItems.innerHTML = '';
            
            cart.forEach(item => {
                const itemCost = (item.price + item.addonPrice) * item.qty;
                total += itemCost;
                count += item.qty;
                
                const enhancementText = item.addonName !== "Standard Preparation" ? ` (+ ${item.addonName})` : '';
                chkMiniItems.innerHTML += `
                    <div class="mini-item">
                        <span>${item.qty}x ${item.title}${enhancementText}</span>
                        <span>$${itemCost.toFixed(2)}</span>
                    </div>
                `;
            });
            
            if (chkItemsCount) chkItemsCount.textContent = count;
            if (chkTotal) chkTotal.textContent = `$${total.toFixed(2)}`;
            
            // Adjust fields based on preference
            const dineinFields = document.getElementById('dineinFields');
            const takeawayFields = document.getElementById('takeawayFields');
            if (diningPreference === "dinein") {
                if (dineinFields) dineinFields.classList.remove('d-none');
                if (takeawayFields) takeawayFields.classList.add('d-none');
            } else {
                if (dineinFields) dineinFields.classList.add('d-none');
                if (takeawayFields) takeawayFields.classList.remove('d-none');
            }
=======
            const preferenceText = diningPreference === "dinein" ? "Dine-In" : "Takeaway";
            let msg = "";
            
            if (currentUser) {
                msg = `Order placed successfully!\n\nThank you, ${currentUser.name}. Your ${preferenceText} order is being prepared and will be delivered/ready at: ${currentUser.address}.`;
            } else {
                msg = `Guest order placed successfully!\n\nThank you for ordering. Your ${preferenceText} order is now being processed.`;
            }
            
            alert(msg);
            cart = [];
            updateCartUI();
            setTimeout(closeCart, 500);
>>>>>>> 8626172 (Update .gitignore to exclude node_modules and prepare deployment)
        } else {
            showToast("Your order is empty. Please add items to checkout.");
        }
    });
}
<<<<<<< HEAD

// Back to Cart from Checkout
const backToCartBtn = document.getElementById('backToCartBtn');
if (backToCartBtn) {
    backToCartBtn.addEventListener('click', () => {
        showCartStep(1);
    });
}

// Close cart buttons inside steps
const closeCartBtn2 = document.getElementById('closeCartBtn2');
if (closeCartBtn2) closeCartBtn2.addEventListener('click', closeCart);

const closeCartBtn3 = document.getElementById('closeCartBtn3');
if (closeCartBtn3) closeCartBtn3.addEventListener('click', closeCart);

// --- SIMULATED KITCHEN TIMELINE TRACKER ENGINE ---
let trackerTimers = [];
window.lastTrackerStep = 1;

function clearTrackerTimers() {
    trackerTimers.forEach(timer => clearTimeout(timer));
    trackerTimers = [];
}

function updateOrderStepInLocalStorage(orderId, stepVal) {
    const localOrders = JSON.parse(localStorage.getItem('zf_activeOrders')) || [];
    const index = localOrders.findIndex(o => o.id === orderId);
    if (index !== -1) {
        localOrders[index].step = stepVal;
        localStorage.setItem('zf_activeOrders', JSON.stringify(localOrders));
    }
}

function updateGuestTrackerUI(stepValue) {
    const trackerHeading = document.getElementById('trackerHeading');
    const trackerSub = document.getElementById('trackerSub');
    const trackerEstim = document.getElementById('trackerEstim');
    
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');
    const step4 = document.getElementById('step4');
    
    // Set time placed if not set
    const timePlacedEl = document.getElementById('timePlaced');
    if (timePlacedEl && (!timePlacedEl.textContent || timePlacedEl.textContent === '--:--')) {
        const now = new Date();
        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        timePlacedEl.textContent = `${hours}:${minutes} ${ampm}`;
    }

    // Reset classes
    if (step1) step1.className = 'timeline-step';
    if (step2) step2.className = 'timeline-step';
    if (step3) step3.className = 'timeline-step';
    if (step4) step4.className = 'timeline-step';

    if (stepValue >= 1) {
        if (step1) step1.className = 'timeline-step active';
    }
    if (stepValue >= 2) {
        if (step1) step1.className = 'timeline-step completed';
        if (step2) step2.className = 'timeline-step active';
    }
    if (stepValue >= 3) {
        if (step1) step1.className = 'timeline-step completed';
        if (step2) step2.className = 'timeline-step completed';
        if (step3) step3.className = 'timeline-step active';
    }
    if (stepValue >= 4) {
        if (step1) step1.className = 'timeline-step completed';
        if (step2) step2.className = 'timeline-step completed';
        if (step3) step3.className = 'timeline-step completed';
        if (step4) step4.className = 'timeline-step active';
    }

    if (stepValue === 1) {
        if (trackerHeading) trackerHeading.textContent = "Order Placed";
        if (trackerSub) trackerSub.textContent = "Your details have been confirmed by our maître d'.";
        if (trackerEstim) trackerEstim.textContent = "~20 mins";
    } else if (stepValue === 2) {
        if (trackerHeading) trackerHeading.textContent = "Chef Preparing";
        if (trackerSub) trackerSub.textContent = "Artisanal handcrafting and seasoning in progress.";
        if (trackerEstim) trackerEstim.textContent = "~15 mins";
    } else if (stepValue === 3) {
        if (trackerHeading) trackerHeading.textContent = "Plating & Embellishment";
        if (trackerSub) trackerSub.textContent = "Delicate presentation, micro-herb placements & detailing.";
        if (trackerEstim) trackerEstim.textContent = "~5 mins";
    } else if (stepValue === 4) {
        if (trackerHeading) trackerHeading.textContent = "Ready to Serve";
        const preferenceText = diningPreference === "dinein" ? "Ready to Serve at Table" : "Ready for Pickup";
        const step4Label = document.getElementById('step4Label');
        if (step4Label) step4Label.textContent = preferenceText;
        if (trackerSub) trackerSub.textContent = "Your fine-dining masterpiece is ready to enjoy.";
        if (trackerEstim) trackerEstim.textContent = "Ready";
    }
}

function startKitchenTracker() {
    clearTrackerTimers();
    window.lastTrackerStep = 1;
    
    // Set initial step
    updateGuestTrackerUI(1);
    
    // Step 2: Preparing (after 4s)
    trackerTimers.push(setTimeout(() => {
        window.lastTrackerStep = 2;
        updateGuestTrackerUI(2);
        updateOrderStepInLocalStorage(window.currentGuestOrderId, 2);
        showToast("Chef started cooking your signature selection!");
        playTick();
    }, 4000));
    
    // Step 3: Plating & Quality Check (after 9s)
    trackerTimers.push(setTimeout(() => {
        window.lastTrackerStep = 3;
        updateGuestTrackerUI(3);
        updateOrderStepInLocalStorage(window.currentGuestOrderId, 3);
        showToast("Your dishes are being artistically detailed and plated.");
        playTick();
    }, 9000));
    
    // Step 4: Ready (after 14s)
    trackerTimers.push(setTimeout(() => {
        window.lastTrackerStep = 4;
        updateGuestTrackerUI(4);
        updateOrderStepInLocalStorage(window.currentGuestOrderId, 4);
        showToast("Order complete! Bon Appétit!");
        playChime();
    }, 14000));
}

// Storage listener to sync kitchen status changes from the Staff Portal live
window.addEventListener('storage', (e) => {
    if (e.key === 'zf_activeOrders' && window.currentGuestOrderId) {
        const orders = JSON.parse(e.newValue || '[]');
        const myOrder = orders.find(o => o.id === window.currentGuestOrderId);
        if (myOrder) {
            const serverStep = myOrder.step;
            if (window.lastTrackerStep !== serverStep) {
                clearTrackerTimers();
                updateGuestTrackerUI(serverStep);
                window.lastTrackerStep = serverStep;
                if (serverStep === 2) {
                    showToast("Chef started cooking your signature selection!");
                    playTick();
                } else if (serverStep === 3) {
                    showToast("Your dishes are being artistically detailed and plated.");
                    playTick();
                } else if (serverStep === 4) {
                    showToast("Order complete! Bon Appétit!");
                    playChime();
                }
            }
        }
    }
});

// Step 2 Form Submit: Transition to Step 3 Tracker
const checkoutForm = document.getElementById('checkoutForm');
if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('chkName').value.trim();
        const phone = document.getElementById('chkPhone').value.trim();
        
        if (!name || !phone) {
            showToast("Please fill in your details.");
            return;
        }
        
        // Success transitions
        playChime();
        showToast("Order placed successfully!");
        showCartStep(3);
        
        // Extract details for the Admin Portal activeOrders database before clearing cart
        const orderTableOrTime = diningPreference === "dinein" 
            ? `Table ${document.getElementById('chkTable').value}` 
            : document.getElementById('chkTime').value;
        
        let orderTotal = 0;
        const orderItems = cart.map(item => {
            const cost = (item.price + item.addonPrice) * item.qty;
            orderTotal += cost;
            return {
                title: item.title,
                qty: item.qty,
                price: item.price,
                addonName: item.addonName,
                addonPrice: item.addonPrice
            };
        });

        const randomId = Math.floor(10000 + Math.random() * 90000);
        const orderId = `ZF-${randomId}`;

        const newOrder = {
            id: orderId,
            name: name,
            phone: phone,
            tableOrTime: orderTableOrTime,
            type: diningPreference,
            items: orderItems,
            total: orderTotal,
            step: 1 // Placed
        };

        const localOrders = JSON.parse(localStorage.getItem('zf_activeOrders')) || [];
        localOrders.push(newOrder);
        localStorage.setItem('zf_activeOrders', JSON.stringify(localOrders));

        window.currentGuestOrderId = orderId;
        
        // Clear items and update sidebar UI
        cart = [];
        updateCartUI();
        
        startKitchenTracker();
    });
}

// Dismiss tracker button handler
const closeTrackerBtn = document.getElementById('closeTrackerBtn');
if (closeTrackerBtn) {
    closeTrackerBtn.addEventListener('click', () => {
        clearTrackerTimers();
        showCartStep(1);
        closeCart();
        if (checkoutForm) checkoutForm.reset();
    });
}

// --- MICRO-ANIMATIONS & PARALLAX ---
// Hero Content Parallax Scroll Effect
const heroContent = document.querySelector('.hero-content');
window.addEventListener('scroll', () => {
    if (heroContent) {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight * 1.3);
        }
    }
});
=======
>>>>>>> 8626172 (Update .gitignore to exclude node_modules and prepare deployment)

// Newsletter subscription handler
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;
<<<<<<< HEAD
        if(email) {
=======
        if (email) {
>>>>>>> 8626172 (Update .gitignore to exclude node_modules and prepare deployment)
            showToast("Subscribed to newsletter successfully!");
            newsletterForm.reset();
        }
    });
}
<<<<<<< HEAD
=======

// Initialization on Load
renderProducts();
updateAuthUI();
updateCartUI();
>>>>>>> 8626172 (Update .gitignore to exclude node_modules and prepare deployment)
