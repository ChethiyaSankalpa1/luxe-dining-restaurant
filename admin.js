// admin.js

// --- SOUND ENGINE ---
const tickSound = new Audio('https://www.soundjay.com/buttons/sounds/button-16.mp3');
tickSound.volume = 0.15;
const successChime = new Audio('https://www.soundjay.com/buttons/sounds/button-3.mp3');
successChime.volume = 0.3;
const errorSound = new Audio('https://www.soundjay.com/buttons/sounds/button-10.mp3');
errorSound.volume = 0.2;

function playTick() {
    tickSound.currentTime = 0;
    tickSound.play().catch(e => console.log('Audio playback prevented'));
}

function playChime() {
    successChime.currentTime = 0;
    successChime.play().catch(e => console.log('Audio playback prevented'));
}

function playError() {
    errorSound.currentTime = 0;
    errorSound.play().catch(e => console.log('Audio playback prevented'));
}

// Global click audio delegate for tactile sound effects
document.body.addEventListener('click', (e) => {
    const target = e.target.closest('button, a, .admin-tab');
    if (target) {
        playTick();
    }
});

// --- DATABASE SEEDING ---
if (!localStorage.getItem('zf_reservations')) {
    const defaultReservations = [
        {
            id: "RES-84920",
            name: "Lydia Senaviratne",
            phone: "+94 77 123 4567",
            date: "2026-05-21",
            time: "19:30",
            guests: 4,
            zone: "Skyline Balcony",
            status: "pending"
        },
        {
            id: "RES-39201",
            name: "Marcus Aurelius",
            phone: "+1 650 492 0182",
            date: "2026-05-21",
            time: "20:00",
            guests: 2,
            zone: "Saffron Lounge",
            status: "seated"
        }
    ];
    localStorage.setItem('zf_reservations', JSON.stringify(defaultReservations));
}

if (!localStorage.getItem('zf_activeOrders')) {
    const defaultActiveOrders = [
        {
            id: "ZF-88210",
            name: "Dinesh Gunasekara",
            phone: "+94 71 998 2210",
            tableOrTime: "Table 2",
            type: "dinein",
            items: [
                { title: "Wagyu Beef Tenderloin", qty: 2, price: 120.00, addonName: "Standard Preparation", addonPrice: 0.00 },
                { title: "Gold Leaf Chocolate Fondant", qty: 1, price: 30.00, addonName: "Standard Preparation", addonPrice: 0.00 }
            ],
            total: 270.00,
            step: 2
        },
        {
            id: "ZF-33041",
            name: "Elena Rostova",
            phone: "+7 903 124 5589",
            tableOrTime: "In 20 Mins",
            type: "takeaway",
            items: [
                { title: "Saffron infused Rosewater Mousse", qty: 2, price: 25.00, addonName: "Standard Preparation", addonPrice: 0.00 }
            ],
            total: 50.00,
            step: 1
        }
    ];
    localStorage.setItem('zf_activeOrders', JSON.stringify(defaultActiveOrders));
}

if (!localStorage.getItem('zf_revenue')) {
    localStorage.setItem('zf_revenue', "345.50");
}

if (!localStorage.getItem('zf_seated_guests')) {
    localStorage.setItem('zf_seated_guests', "2");
}

// --- AUTHENTICATION ENGINE ---
const adminLoginForm = document.getElementById('adminLoginForm');
const adminPasscode = document.getElementById('adminPasscode');
const adminLoginError = document.getElementById('adminLoginError');
const standaloneLogin = document.getElementById('standaloneLogin');
const adminDashboard = document.getElementById('adminDashboard');
const logoutAdminBtn = document.getElementById('logoutAdminBtn');

function showToast(msg) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');
    if (toast && toastMsg) {
        toastMsg.textContent = msg;
        toast.classList.add('active');
        setTimeout(() => {
            toast.classList.remove('active');
        }, 3000);
    }
}

function checkAuth() {
    const isAuthed = sessionStorage.getItem('zf_auth') === 'true';
    if (isAuthed) {
        if (standaloneLogin) standaloneLogin.classList.add('d-none');
        if (adminDashboard) {
            adminDashboard.classList.remove('d-none');
            adminDashboard.classList.add('active'); // ensure styles apply properly
        }
        document.body.style.overflow = 'auto';
        renderAll();
    } else {
        if (standaloneLogin) standaloneLogin.classList.remove('d-none');
        if (adminDashboard) {
            adminDashboard.classList.add('d-none');
            adminDashboard.classList.remove('active');
        }
        document.body.style.overflow = 'hidden';
    }
}

if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const passcode = adminPasscode.value.trim();
        const card = adminLoginForm.closest('.login-card-standalone');
        
        if (passcode === 'zentro123') {
            playChime();
            sessionStorage.setItem('zf_auth', 'true');
            showToast("Welcome back, Master Chef!");
            checkAuth();
        } else {
            playError();
            if (adminLoginError) adminLoginError.classList.remove('d-none');
            if (card) {
                card.classList.add('shake');
                setTimeout(() => {
                    card.classList.remove('shake');
                }, 500);
            }
        }
    });
}

if (logoutAdminBtn) {
    logoutAdminBtn.addEventListener('click', () => {
        playTick();
        sessionStorage.removeItem('zf_auth');
        showToast("Logged out of Operational Hub.");
        checkAuth();
    });
}

// --- ADMIN TABS CONTROLLER ---
const adminTabs = document.querySelectorAll('.admin-tab');
adminTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        adminTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        const targetPaneId = tab.getAttribute('data-tab');
        const panes = document.querySelectorAll('.admin-tab-pane');
        panes.forEach(pane => {
            if (pane.id === targetPaneId) {
                pane.classList.add('active');
            } else {
                pane.classList.remove('active');
            }
        });
    });
});

// --- CORE RENDERING ENGINE ---
function renderAll() {
    renderAdminReservations();
    renderAdminOrders();
    updateInsightsPanel();
}

// --- RENDER RESERVATIONS GRID ---
function renderAdminReservations() {
    const adminResGrid = document.getElementById('adminResGrid');
    if (!adminResGrid) return;
    
    const reservations = JSON.parse(localStorage.getItem('zf_reservations')) || [];
    
    if (reservations.length === 0) {
        adminResGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px; border: 1px dashed rgba(212,175,55,0.2); border-radius: 8px; background: rgba(255,255,255,0.01);">
                <p style="color: var(--text-secondary); margin: 0;">No active reservations found</p>
            </div>
        `;
        return;
    }
    
    adminResGrid.innerHTML = '';
    reservations.forEach(res => {
        const isSeated = res.status === 'seated';
        const cardStyle = isSeated 
            ? 'border-color: rgba(46, 204, 113, 0.3); background: rgba(46,204,113,0.02);' 
            : 'border-color: rgba(212, 175, 55, 0.2); background: rgba(255,255,255,0.02);';
            
        const badgeClass = isSeated 
            ? '<span class="badge" style="background: rgba(46, 204, 113, 0.15); color: #2ecc71; border: 1px solid rgba(46, 204, 113, 0.3); padding: 4px 8px; border-radius: 4px; font-size: 0.75rem;"><i class="fas fa-circle-check"></i> SEATED</span>' 
            : '<span class="badge" style="background: rgba(241, 196, 15, 0.15); color: #f1c40f; border: 1px solid rgba(241, 196, 15, 0.3); padding: 4px 8px; border-radius: 4px; font-size: 0.75rem;"><i class="fas fa-clock"></i> PENDING</span>';
        
        adminResGrid.innerHTML += `
            <div class="reservation-card" style="${cardStyle} border: 1px solid var(--glass-border); padding: 20px; border-radius: 8px; display: flex; flex-direction: column; gap: 12px; transition: all 0.3s ease;">
                <div class="res-card-header" style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-weight: 600; color: var(--text-primary); font-size: 1.1rem; font-family: var(--font-heading);">${res.name}</span>
                    ${badgeClass}
                </div>
                <div class="res-card-body" style="display: flex; flex-direction: column; gap: 8px; font-size: 0.85rem; color: var(--text-secondary); border-top: 1px dashed rgba(255,255,255,0.05); border-bottom: 1px dashed rgba(255,255,255,0.05); padding: 10px 0; margin: 5px 0;">
                    <div><i class="fas fa-ticket-alt" style="width: 16px; color: var(--accent-gold);"></i> ID: <span style="font-family: monospace; color: var(--text-primary); font-weight: 500;">${res.id}</span></div>
                    <div><i class="fas fa-phone" style="width: 16px; color: var(--accent-gold);"></i> Phone: <span style="color: var(--text-primary);">${res.phone}</span></div>
                    <div><i class="fas fa-calendar" style="width: 16px; color: var(--accent-gold);"></i> Date: <span style="color: var(--text-primary);">${res.date} at ${res.time}</span></div>
                    <div><i class="fas fa-users" style="width: 16px; color: var(--accent-gold);"></i> Cover: <span style="color: var(--text-primary);">${res.guests} Pax</span></div>
                    <div><i class="fas fa-map-marker-alt" style="width: 16px; color: var(--accent-gold);"></i> Zone: <span style="color: var(--accent-gold); font-weight: 500;">${res.zone}</span></div>
                </div>
                <div class="res-card-actions" style="display: flex; gap: 8px; margin-top: auto;">
                    ${!isSeated ? `<button class="btn btn-primary" onclick="seatReservation('${res.id}')" style="flex: 1; padding: 8px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase;"><i class="fas fa-chair"></i> Seat</button>` : ''}
                    <button class="btn btn-secondary" onclick="cancelReservation('${res.id}')" style="flex: 1; padding: 8px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; border-color: rgba(231,76,60,0.3); color: #e74c3c;"><i class="fas fa-times"></i> Cancel</button>
                </div>
            </div>
        `;
    });
}

window.seatReservation = function(id) {
    const reservations = JSON.parse(localStorage.getItem('zf_reservations')) || [];
    const res = reservations.find(r => r.id === id);
    if (res) {
        res.status = 'seated';
        localStorage.setItem('zf_reservations', JSON.stringify(reservations));
        
        let seatedCount = parseInt(localStorage.getItem('zf_seated_guests')) || 0;
        seatedCount += res.guests;
        localStorage.setItem('zf_seated_guests', String(seatedCount));
        
        showToast(`Guest ${res.name} has been seated.`);
        playChime();
        renderAll();
    }
};

window.cancelReservation = function(id) {
    const reservations = JSON.parse(localStorage.getItem('zf_reservations')) || [];
    const index = reservations.findIndex(r => r.id === id);
    if (index !== -1) {
        const res = reservations[index];
        if (res.status === 'seated') {
            let seatedCount = parseInt(localStorage.getItem('zf_seated_guests')) || 0;
            seatedCount = Math.max(0, seatedCount - res.guests);
            localStorage.setItem('zf_seated_guests', String(seatedCount));
        }
        reservations.splice(index, 1);
        localStorage.setItem('zf_reservations', JSON.stringify(reservations));
        
        showToast(`Reservation ${id} cancelled.`);
        playTick();
        renderAll();
    }
};

// --- RENDER ACTIVE ORDERS PANEL ---
function renderAdminOrders() {
    const adminOrdersPanel = document.getElementById('adminOrdersPanel');
    if (!adminOrdersPanel) return;
    
    const activeOrders = JSON.parse(localStorage.getItem('zf_activeOrders')) || [];
    
    if (activeOrders.length === 0) {
        adminOrdersPanel.innerHTML = `
            <div style="text-align: center; padding: 40px; border: 1px dashed rgba(212,175,55,0.2); border-radius: 8px; background: rgba(255,255,255,0.01);">
                <p style="color: var(--text-secondary); margin: 0;">No active kitchen tickets currently crafting</p>
            </div>
        `;
        return;
    }
    
    adminOrdersPanel.innerHTML = '';
    activeOrders.forEach(order => {
        const stepLabels = ["Placed", "Preparing", "Plating", "Ready"];
        const stepColors = ["#3498db", "#f1c40f", "#e67e22", "#2ecc71"];
        const currentStepLabel = stepLabels[order.step - 1] || "Placed";
        const currentStepColor = stepColors[order.step - 1] || "#3498db";
        const progressPercent = (order.step / 4) * 100;
        const isTakeaway = order.type === 'takeaway';
        
        let orderItemsList = '';
        order.items.forEach(it => {
            const addonText = it.addonName && it.addonName !== "Standard Preparation" 
                ? `<span style="font-size: 0.75rem; color: var(--accent-gold); display: block; margin-top: 2px;">+ ${it.addonName}</span>` 
                : '';
            orderItemsList += `
                <li style="display: flex; justify-content: space-between; align-items: flex-start; font-size: 0.85rem; color: var(--text-primary); border-bottom: 1px solid rgba(255,255,255,0.02); padding: 6px 0;">
                    <div>
                        <span>${it.qty}x ${it.title}</span>
                        ${addonText}
                    </div>
                    <span style="color: var(--text-secondary); font-family: monospace;">$${((it.price + it.addonPrice) * it.qty).toFixed(2)}</span>
                </li>
            `;
        });
        
        adminOrdersPanel.innerHTML += `
            <div class="order-admin-card" style="background: rgba(255,255,255,0.02); border: 1px solid var(--glass-border); padding: 20px; border-radius: 8px; display: flex; flex-direction: column; gap: 15px; margin-bottom: 20px; transition: 0.3s;">
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                    <div>
                        <h4 style="font-family: var(--font-heading); font-size: 1.1rem; color: var(--text-primary); margin: 0;">${order.name}</h4>
                        <span style="font-size: 0.75rem; color: var(--text-secondary); font-family: monospace;">Order ID: ${order.id} | ${order.type.toUpperCase()} (${order.tableOrTime})</span>
                    </div>
                    <div style="text-align: right;">
                        <span style="font-size: 0.8rem; padding: 4px 10px; border-radius: 20px; font-weight: 600; background: ${currentStepColor}15; color: ${currentStepColor}; border: 1px solid ${currentStepColor}30;">
                            ${currentStepLabel}
                        </span>
                    </div>
                </div>
                
                <div style="background: rgba(255,255,255,0.01); border-radius: 6px; padding: 12px 16px;">
                    <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 4px;">
                        ${orderItemsList}
                    </ul>
                    <div style="display: flex; justify-content: space-between; margin-top: 10px; font-weight: 700; font-size: 0.95rem; color: var(--accent-gold); border-top: 1px solid var(--glass-border); padding-top: 8px;">
                        <span>Order Total</span>
                        <span>$${order.total.toFixed(2)}</span>
                    </div>
                </div>
                
                <div style="background: rgba(255,255,255,0.05); height: 6px; border-radius: 3px; overflow: hidden; width: 100%;">
                    <div style="background: ${currentStepColor}; height: 100%; width: ${progressPercent}%; transition: width 0.4s ease, background 0.4s ease;"></div>
                </div>
                
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 5px;">
                    <span style="font-size: 0.8rem; color: var(--text-secondary);"><i class="fas fa-phone" style="color: var(--accent-gold); margin-right: 4px;"></i> ${order.phone}</span>
                    <div style="display: flex; gap: 8px;">
                        ${order.step < 4 ? `<button class="btn btn-primary" onclick="advanceOrderStep('${order.id}')" style="padding: 6px 12px; font-size: 0.75rem; display: flex; align-items: center; gap: 6px;"><i class="fas fa-angles-right"></i> Advance to ${stepLabels[order.step]}</button>` : `<button class="btn" onclick="completeActiveOrder('${order.id}')" style="background: rgba(46, 204, 113, 0.2); color: #2ecc71; border: 1px solid rgba(46, 204, 113, 0.4); padding: 6px 12px; font-size: 0.75rem; display: flex; align-items: center; gap: 6px;"><i class="fas fa-check-double"></i> Complete & Serve</button>`}
                        <button class="btn btn-secondary" onclick="cancelOrder('${order.id}')" style="padding: 6px 12px; font-size: 0.75rem; border-color: rgba(231, 76, 60, 0.3); color: #e74c3c;"><i class="fas fa-ban"></i> Void</button>
                    </div>
                </div>
            </div>
        `;
    });
}

window.advanceOrderStep = function(id) {
    const activeOrders = JSON.parse(localStorage.getItem('zf_activeOrders')) || [];
    const order = activeOrders.find(o => o.id === id);
    if (order) {
        if (order.step < 4) {
            order.step++;
            localStorage.setItem('zf_activeOrders', JSON.stringify(activeOrders));
            showToast(`Order ${id} advanced to ${["Preparing", "Plating", "Ready"][order.step - 2]}.`);
            playTick();
            renderAll();
        }
    }
};

window.completeActiveOrder = function(id) {
    const activeOrders = JSON.parse(localStorage.getItem('zf_activeOrders')) || [];
    const index = activeOrders.findIndex(o => o.id === id);
    if (index !== -1) {
        const order = activeOrders[index];
        let revenue = parseFloat(localStorage.getItem('zf_revenue')) || 0;
        revenue += order.total;
        localStorage.setItem('zf_revenue', String(revenue));
        
        activeOrders.splice(index, 1);
        localStorage.setItem('zf_activeOrders', JSON.stringify(activeOrders));
        
        showToast(`Order ${id} served & completed successfully!`);
        playChime();
        renderAll();
    }
};

window.cancelOrder = function(id) {
    const activeOrders = JSON.parse(localStorage.getItem('zf_activeOrders')) || [];
    const index = activeOrders.findIndex(o => o.id === id);
    if (index !== -1) {
        activeOrders.splice(index, 1);
        localStorage.setItem('zf_activeOrders', JSON.stringify(activeOrders));
        
        showToast(`Order ${id} voided.`);
        playTick();
        renderAll();
    }
};

// --- UPDATE RESTAURANT INSIGHTS PANEL ---
function updateInsightsPanel() {
    const statRevenue = document.getElementById('statRevenue');
    const statSeated = document.getElementById('statSeated');
    const statDishes = document.getElementById('statDishes');
    const statPopularList = document.getElementById('statPopularList');
    
    if (!statRevenue) return;
    
    const activeOrders = JSON.parse(localStorage.getItem('zf_activeOrders')) || [];
    const completedOrdersRevenue = parseFloat(localStorage.getItem('zf_revenue')) || 0;
    const totalSeatedGuestsCount = parseInt(localStorage.getItem('zf_seated_guests')) || 0;
    
    let activeRevenue = 0;
    let activeDishesCount = 0;
    
    activeOrders.forEach(o => {
        activeRevenue += o.total;
        o.items.forEach(item => {
            activeDishesCount += item.qty;
        });
    });
    
    const totalEstimatedRevenue = completedOrdersRevenue + activeRevenue;
    statRevenue.textContent = `$${totalEstimatedRevenue.toFixed(2)}`;
    
    statSeated.textContent = `${totalSeatedGuestsCount} / 40 Guests`;
    statDishes.textContent = String(activeDishesCount);
    
    const dishTally = {
        "Wagyu Beef Tenderloin": 18,
        "Saffron infused Rosewater Mousse": 14,
        "Ceylon Mud Crab Curry": 12,
        "Egg Hoppers Trio": 9,
        "Gold Leaf Chocolate Fondant": 7
    };
    
    activeOrders.forEach(order => {
        order.items.forEach(item => {
            if (dishTally[item.title]) {
                dishTally[item.title] += item.qty;
            } else {
                dishTally[item.title] = item.qty;
            }
        });
    });
    
    const sortedDishes = Object.keys(dishTally).map(key => {
        return { title: key, qty: dishTally[key] };
    }).sort((a, b) => b.qty - a.qty);
    
    if (statPopularList) {
        statPopularList.innerHTML = '';
        sortedDishes.slice(0, 4).forEach((dish, idx) => {
            const medMedal = idx === 0 ? '🏆' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : '✨';
            statPopularList.innerHTML += `
                <li style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.02); padding: 15px; border-radius: 8px; font-size: 0.9rem; border: 1px solid var(--glass-border);">
                    <span style="font-weight: 500; color: var(--text-primary); display: flex; align-items: center; gap: 12px;">
                        <span style="font-size: 1.2rem;">${medMedal}</span> ${dish.title}
                    </span>
                    <span style="color: var(--accent-gold); font-family: monospace; font-weight: 600; background: rgba(212,175,55,0.1); padding: 4px 10px; border-radius: 20px;">${dish.qty} Orders</span>
                </li>
            `;
        });
    }

    // Chart.js Implementation
    const ctx = document.getElementById('revenueChart');
    if (ctx) {
        if (window.myRevenueChart) {
            window.myRevenueChart.destroy();
        }
        
        // Mock data for the week
        const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const data = [1200, 1900, 1500, 2200, 3100, 4200, totalEstimatedRevenue > 4000 ? totalEstimatedRevenue : 3800];
        
        window.myRevenueChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Revenue ($)',
                    data: data,
                    borderColor: '#d4af37',
                    backgroundColor: 'rgba(212, 175, 55, 0.1)',
                    borderWidth: 3,
                    pointBackgroundColor: '#050505',
                    pointBorderColor: '#d4af37',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(18, 18, 18, 0.9)',
                        titleColor: '#d4af37',
                        bodyColor: '#f5f5f5',
                        borderColor: 'rgba(212, 175, 55, 0.3)',
                        borderWidth: 1,
                        padding: 10,
                        displayColors: false,
                        callbacks: {
                            label: function(context) {
                                return '$' + context.parsed.y;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(255, 255, 255, 0.05)' },
                        ticks: { color: '#a0a0a0', callback: function(value) { return '$' + value; } }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: '#a0a0a0' }
                    }
                }
            }
        });
    }
}

// --- LIVE CROSS-TAB STORAGE SYNCHRONIZATION ---
window.addEventListener('storage', (e) => {
    if (e.key === 'zf_reservations' || e.key === 'zf_activeOrders' || e.key === 'zf_revenue' || e.key === 'zf_seated_guests') {
        renderAll();
    }
});

// --- INITIAL AUTH CHECK ---
checkAuth();
