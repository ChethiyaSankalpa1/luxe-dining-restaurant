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

// Comprehensive Product Data for 15 Items (8 Sri Lankan, 4 International, 3 Desserts)
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
    },
    9: {
        title: "Cinnamon Glazed Duck",
        price: 65.00,
        img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
        desc: "Pan-seared spiced duck breast coated in organic ground Ceylon cinnamon and caramelized wild honey glaze."
    },
    10: {
        title: "Berkshire Black Pork Curry",
        price: 45.00,
        img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
        desc: "Tender cubes of Berkshire pork belly simmered in dark, heavy-roasted island spices, cardamom, and thick curry broth. Served with toasted rice flour roti."
    },
    11: {
        title: "Jaffna Spiced Prawn Thermidor",
        price: 70.00,
        img: "https://images.unsplash.com/photo-1559737712-4217316a7f0f?w=800&q=80",
        desc: "Luxe jumbo prawns baked inside shell, stuffed with a decadent cream of Jaffna roasted spice powder, local coconut arrack reduction, and gruyère."
    },
    12: {
        title: "Devilled Beef Tenderloin",
        price: 50.00,
        img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80",
        desc: "Sizzling slices of premium beef tenderloin flash-fried with fresh capsicums, red banana peppers, red onions, and sweet-sour local tomato glaze."
    },
    13: {
        title: "Modern Ceylon Watalappan",
        price: 25.00,
        img: "https://images.unsplash.com/photo-1579372786545-d24232daf58c?w=800&q=80",
        desc: "Rich spiced coconut custard made with organic palm jaggery, nutmeg, and cardamom, garnished with roasted cashews."
    },
    14: {
        title: "Golden Saffron Mousse",
        price: 28.00,
        img: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&q=80",
        desc: "Light and airy organic saffron mousse topped with rosewater droplets, micro greens, and premium crushed pistachios."
    },
    15: {
        title: "Gold Leaf Chocolate Fondant",
        price: 30.00,
        img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80",
        desc: "A melting liquid chocolate cake using pure 70% dark cocoa, decorated with edible 24k gold leaf and paired with vanilla gelato."
    }
};

// State: Order Cart
let cart = [];
let diningPreference = "dinein"; // Default dining preference

// DOM Elements for Cart Sidebar & Dining Preferences
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

// Menu Filters Implementation
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Toggle active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filterValue = btn.dataset.filter;
        
        productCards.forEach(card => {
            const category = card.dataset.category;
            if (filterValue === 'all' || category === filterValue) {
                card.style.display = 'flex';
                // Trigger reflow for animation
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Dining Preference Option Selection
dineinBtn.addEventListener('click', () => {
    diningPreference = "dinein";
    dineinBtn.classList.add('active');
    takeawayBtn.classList.remove('active');
    showToast("Selected Dining Preference: Dine-In");
});

takeawayBtn.addEventListener('click', () => {
    diningPreference = "takeaway";
    takeawayBtn.classList.add('active');
    dineinBtn.classList.remove('active');
    showToast("Selected Dining Preference: Takeaway");
});

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
function setupModalTriggers() {
    const viewBtns = document.querySelectorAll('.view-btn');
    viewBtns.forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        
        newBtn.addEventListener('click', (e) => {
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
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
        });
    });
}
setupModalTriggers();

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
function setupQuickAddTriggers() {
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        
        newBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = newBtn.dataset.id;
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
}
setupQuickAddTriggers();

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
const checkoutBtn = document.getElementById('checkoutBtn');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
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
        } else {
            showToast("Your order is empty. Please add items to checkout.");
        }
    });
}

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

// Newsletter Form
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;
        if(email) {
            showToast("Subscribed to newsletter successfully!");
            newsletterForm.reset();
        }
    });
}
