/* ========== Global FAB System (Hotel Card-Key Edition) ========== */
/* Uses GSAP for animation */

const FABState = {
    currency: localStorage.getItem('jeju_currency') || 'KRW',
    wishlist: JSON.parse(localStorage.getItem('jeju_wishlist') || '[]'),
    
    setCurrency(curr) {
        this.currency = curr;
        localStorage.setItem('jeju_currency', curr);
        document.dispatchEvent(new CustomEvent('currencyChanged', { detail: curr }));
        this.updateCurrencyUI();
    },

    addToWishlist(id) {
        if (!this.wishlist.includes(id)) {
            this.wishlist.push(id);
        } else {
            this.wishlist = this.wishlist.filter(item => item !== id);
        }
        localStorage.setItem('jeju_wishlist', JSON.stringify(this.wishlist));
        this.updateBadge();
    },

    updateBadge() {
        const badge = document.getElementById('fabWishlistCount');
        if (badge) badge.textContent = this.wishlist.length;
    },

    updateCurrencyUI() {
        const btnText = document.querySelector('#fabCurrency .card-label');
        if (btnText) btnText.textContent = this.currency;

        const rate = 1300;
        const symbol = this.currency === 'KRW' ? '₩' : '$';
        
        document.querySelectorAll('[data-price-krw]').forEach(el => {
            const krw = parseInt(el.getAttribute('data-price-krw'));
            if (!isNaN(krw)) {
                let displayPrice = this.currency === 'KRW' ? 
                    krw.toLocaleString() : 
                    Math.round(krw / rate).toLocaleString();
                el.textContent = `${symbol}${displayPrice}`;
            }
        });
    }
};

/* HTML Template - Card Key Structure */
const fabHTML = `
<div class="fab-wrapper" id="fabSystem">
    <!-- Layers -->
    <!-- Shared Element Target: Wishlist Window -->
    <div class="wishlist-window" id="wishlistLayer">
        <div class="wishlist-header">
            <h3>MY STAY PICK</h3>
            <button class="close-wishlist">×</button>
        </div>
        <div class="wishlist-content" id="wishlistContent"></div>
    </div>

    <!-- Card Holder (Trigger) -->
    <div class="card-holder" id="fabHolder">
        <div class="fab-peek"></div>
        <div class="fab-body"></div>
    </div>

    <!-- Cards Container -->
    <div class="fab-cards-container">
        <!-- Card 1: Top (Leftmost) -->
        <div class="fab-card card-1" id="fabTop">
            <i data-lucide="arrow-up" class="card-icon"></i>
            <span class="card-label">TOP</span>
        </div>
        <!-- Card 2: Currency -->
        <div class="fab-card card-2" id="fabCurrency">
            <i data-lucide="coins" class="card-icon"></i>
            <span class="card-label">KRW</span>
        </div>
        <!-- Card 3: Wishlist -->
        <div class="fab-card card-3" id="fabWishlist">
            <i data-lucide="heart" class="card-icon"></i>
            <span class="card-label">PICK</span>
            <span class="fab-badge" id="fabWishlistCount">0</span>
        </div>
        <!-- Card 4: Chatbot (Rightmost) -->
        <div class="fab-card card-4" id="fabChatbot">
            <i data-lucide="message-circle" class="card-icon"></i>
            <span class="card-label">CHAT</span>
        </div>
    </div>
</div>
`;

let isFabOpen = false;
let isAnimating = false;

function initFAB() {
    // 1. Inject HTML
    document.body.insertAdjacentHTML('beforeend', fabHTML);
    
    // Move Wishlist Popup to Body (Fix Stacking Context)
    const popup = document.getElementById('wishlistLayer');
    if (popup) document.body.appendChild(popup);
    
    // 2. Icons
    if (window.lucide) lucide.createIcons();

    // 3. Selection
    const holder = document.getElementById('fabHolder');
    const cards = document.querySelectorAll('.fab-card');
    
    // 4. GSAP Timeline Logic
    holder.addEventListener('click', toggleFabAnimation);

    // 5. Card Actions
    document.getElementById('fabTop').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Optional: Close FAB after action? 
        // toggleFabAnimation(); 
    });

    document.getElementById('fabCurrency').addEventListener('click', () => {
        const next = FABState.currency === 'KRW' ? 'USD' : 'KRW';
        FABState.setCurrency(next);
    });

    document.getElementById('fabWishlist').addEventListener('click', (e) => {
        // Shared Element Transition Logic
        
        // 1. Get Trigger Position
        // Note: card is transformed by GSAP, getBoundingClientRect accounts for that
        const card = document.getElementById('fabWishlist');
        const rect = card.getBoundingClientRect();
        
        // 2. Prepare Modal
        const modal = document.getElementById('wishlistLayer');
        const overlay = document.querySelector('.modal-overlay') || createOverlay();
        
        // Initial State (Match Card)
        modal.style.top = `${rect.top}px`;
        modal.style.left = `${rect.left}px`;
        modal.style.width = `${rect.width}px`;
        modal.style.height = `${rect.height}px`;
        modal.style.display = 'flex';
        modal.style.transform = 'none'; // Reset any prior transforms
        
        // Render content
        renderWishlistPreview();
        
        // 3. Play Animation (Force Reflow / Next Frame)
        requestAnimationFrame(() => {
            modal.classList.add('is-active');
            overlay.classList.add('active');
        });
    });

    // Close Logic
    const closeModal = () => {
        const modal = document.getElementById('wishlistLayer');
        const overlay = document.querySelector('.modal-overlay');
        
        modal.classList.remove('is-active');
        overlay.classList.remove('active');
        
        // Wait for transition then hide
        setTimeout(() => {
             modal.style.display = 'none';
        }, 500); // Match CSS transition duration
    };

    document.querySelectorAll('.close-wishlist').forEach(btn => btn.addEventListener('click', closeModal));
    
    // Create Overlay helper
    function createOverlay() {
        const ov = document.createElement('div');
        ov.className = 'modal-overlay';
        document.body.appendChild(ov);
        ov.addEventListener('click', closeModal);
        return ov;
    }

    document.getElementById('fabChatbot').addEventListener('click', () => {
        if (window.hotelChatbot) {
             const card = document.getElementById('fabChatbot');
             const rect = card.getBoundingClientRect();
             window.hotelChatbot.openChatbot(rect);
        }
    });

    // Initial State
    FABState.updateBadge();
    FABState.updateCurrencyUI();
    
    // Add Hover Animations (GSAP)
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (isFabOpen) {
                gsap.to(card, { y: -110, duration: 0.3, ease: "power2.out", overwrite: "auto" });
            }
        });
        card.addEventListener('mouseleave', () => {
            if (isFabOpen) {
                gsap.to(card, { y: -100, duration: 0.3, ease: "power2.out", overwrite: "auto" });
            }
        });
    });
}

function toggleFabAnimation() {
    if (!window.gsap) {
        console.error('GSAP not loaded');
        return;
    }

    const tl = gsap.timeline();
    const c1 = '.card-1';
    const c2 = '.card-2';
    const c3 = '.card-3';
    const c4 = '.card-4';
    const holder = '#fabHolder';

    // Cooldown Check
    if (isAnimating) return;
    isAnimating = true;
    setTimeout(() => { isAnimating = false; }, 1600);

    if (!isFabOpen) {
        // [Phase A: Opening]
        // Reset visibility (in case CSS hidden them)
        gsap.set([c1, c2, c3, c4], { opacity: 1 });
        
        // Stage 1: Eject Up (All cards)
        // From Y=20 (Hidden) to Y=-75 (Higher rise)
        tl.fromTo([c1, c2, c3, c4], 
            { y: 20, opacity: 0 },
            { y: -100, opacity: 1, duration: 0.6, ease: "power3.out" }
        )
        
        // Step 2: Slide C1 to Left (approx 3 cards width + gaps)
        // Card=65px. Gap=10px. 
        // Positions from right: C4(0), C3(-75), C2(-150), C1(-225)
          .to(c1, { x: -225, duration: 1.0, ease: "elastic.out(1.2, 0.5)" })
          
        // Step 3: Fan out C2, C3, C4
          .to(c2, { x: -150, duration: 1.0, ease: "elastic.out(1.2, 0.5)" }, "-=0.85")
          .to(c3, { x: -75, duration: 1.0, ease: "elastic.out(1.2, 0.5)" }, "-=0.9")
          .to(c4, { x: 0, duration: 1.0, ease: "elastic.out(1.2, 0.5)" }, "-=0.9");
          
        gsap.to(holder, { y: 5, opacity: 0.9, duration: 0.3 }); // Slight dip

    } else {
        // [Phase B: Closing]
        // Stage 1: Stack & Hide
        
        // Collapse X
        tl.to(c1, { x: -150, duration: 0.15, ease: "power2.in" })
          .to([c1, c2], { x: -75, duration: 0.15, ease: "power2.in" })
          .to([c1, c2, c3], { x: 0, duration: 0.15, ease: "power2.in" })
        
        // Stage 2: Tuck In (Y=20, Opacity 0)
          .to([c1, c2, c3, c4], { y: 20, opacity: 0, duration: 0.3, ease: "power3.in" });
          
        gsap.to(holder, { y: 0, opacity: 1, duration: 0.3 }); // Restore holder
    }

    isFabOpen = !isFabOpen;
}

function layerToggle(id) {
    // legacy support if needed
}

function renderWishlistPreview() {
    const el = document.getElementById('wishlistContent');
    if(el) el.innerHTML = `<p>${FABState.wishlist.length}개의 저장된 항목</p>`;
}

function toggleLayer(id) {
    const layer = document.getElementById(id);
    if(layer) layer.classList.toggle('active');
}

// Auto Init
document.addEventListener('DOMContentLoaded', initFAB);
