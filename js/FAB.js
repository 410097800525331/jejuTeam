/* ========== Global FAB System (Pure JS) ========== */
const FABState = {
    currency: localStorage.getItem('jeju_currency') || 'KRW',
    wishlist: JSON.parse(localStorage.getItem('jeju_wishlist') || '[]'),
    recentViewed: JSON.parse(localStorage.getItem('jeju_recent') || '[]'),

    setCurrency(curr) {
        this.currency = curr;
        localStorage.setItem('jeju_currency', curr);
        document.dispatchEvent(new CustomEvent('currencyChanged', { detail: curr }));
        this.updateCurrencyUI();
    },

    addToWishlist(id) {
        if (!this.wishlist.includes(id)) {
            this.wishlist.push(id);
            localStorage.setItem('jeju_wishlist', JSON.stringify(this.wishlist));
            this.updateBadge();
        } else {
            // Remove if already exists (Toggle)
            this.wishlist = this.wishlist.filter(item => item !== id);
            localStorage.setItem('jeju_wishlist', JSON.stringify(this.wishlist));
            this.updateBadge();
        }
    },

    addToRecent(id) {
        // Simple Set-like with max length
        if (!this.recentViewed.includes(id)) {
            this.recentViewed.unshift(id);
            if (this.recentViewed.length > 5) this.recentViewed.pop();
            localStorage.setItem('jeju_recent', JSON.stringify(this.recentViewed));
        }
    },

    updateBadge() {
        const badge = document.getElementById('fabWishlistCount');
        if (badge) badge.textContent = this.wishlist.length;
    },

    updateCurrencyUI() {
        const btnText = document.querySelector('#fabCurrency .curr-text');
        if (btnText) btnText.textContent = this.currency;

        // Global Price Update Logic
        const rate = 1300; // Fixed Rate
        const symbol = this.currency === 'KRW' ? '₩' : '$';
        
        document.querySelectorAll('[data-price-krw]').forEach(el => {
            const krw = parseInt(el.getAttribute('data-price-krw'));
            if (!isNaN(krw)) {
                let displayPrice;
                if (this.currency === 'KRW') {
                    displayPrice = krw.toLocaleString();
                } else {
                    displayPrice = Math.round(krw / rate).toLocaleString();
                }
                el.textContent = `${symbol}${displayPrice}`;
            }
        });
    }
};

/* HTML Template Injection */
const fabHTML = `
<div class="fab-wrapper" id="fabSystem">
    <!-- Layers -->
    <div class="fab-layer" id="chatbotLayer">
        <div class="layer-header">
            <h3>AI Chatbot</h3>
            <button class="close-layer"><i data-lucide="x"></i></button>
        </div>
        <div class="layer-content">
            <div class="chat-bubble bot">제주항공 챗봇입니다. 무엇을 도와드릴까요?</div>
            <div class="chat-input-area">
                <input type="text" placeholder="문의사항 입력...">
                <button><i data-lucide="send"></i></button>
            </div>
        </div>
    </div>
    <div class="fab-layer" id="wishlistLayer">
        <div class="layer-header">
            <h3>나의 관심 숙소</h3>
            <button class="close-layer"><i data-lucide="x"></i></button>
        </div>
        <div class="layer-content" id="wishlistContent">
            <!-- JS Rendered -->
        </div>
    </div>

    <!-- Menus -->
    <div class="fab-menu" id="fabMenu">
        <button class="fab-action" id="fabCurrency" data-label="KRW/USD">
            <span class="curr-text">${FABState.currency}</span>
        </button>
        <button class="fab-action" id="fabWishlist" data-label="위시리스트">
            <i data-lucide="heart"></i>
            <span class="fab-badge" id="fabWishlistCount">${FABState.wishlist.length}</span>
        </button>
        <button class="fab-action" id="fabChatbot" data-label="AI 상담">
            <i data-lucide="message-circle"></i>
        </button>
    </div>
    
    <!-- Controls -->
    <div class="fab-controls">
        <button class="fab-btn fab-top" id="fabTop" aria-label="Top">
            <i data-lucide="arrow-up"></i>
        </button>
        <button class="fab-btn fab-main" id="fabMain" aria-label="Menu">
             <i data-lucide="plus" class="fab-logo-img" style="width:24px; height:24px;"></i>
             <i data-lucide="x" class="fab-close-icon"></i>
        </button>
    </div>
</div>
`;

function initFAB() {
    // 1. Inject HTML
    document.body.insertAdjacentHTML('beforeend', fabHTML);
    
    // 2. Refresh Icons for new content
    if (window.lucide) lucide.createIcons();

    // 3. Select Elements
    const wrapper = document.getElementById('fabSystem');
    const mainBtn = document.getElementById('fabMain');
    const topBtn = document.getElementById('fabTop');
    const chatBtn = document.getElementById('fabChatbot');
    const wishBtn = document.getElementById('fabWishlist');
    const currBtn = document.getElementById('fabCurrency');
    const closeLayers = document.querySelectorAll('.close-layer');
    
    // 4. Toggle Menu
    mainBtn.addEventListener('click', () => {
        wrapper.classList.toggle('active');
        // Close layers if main closed? Maybe.
    });

    // 5. Scroll Top
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            topBtn.classList.add('visible');
        } else {
            topBtn.classList.remove('visible');
        }
    });

    topBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 6. Currency Toggle
    currBtn.addEventListener('click', () => {
        const next = FABState.currency === 'KRW' ? 'USD' : 'KRW';
        FABState.setCurrency(next);
    });

    // 7. Layer Toggles
    chatBtn.addEventListener('click', () => {
        // [New] Integration with Global Chatbot
        if (window.hotelChatbot) {
            window.hotelChatbot.openChatbot();
            wrapper.classList.remove('active'); // Close FAB menu
        } else {
            // Fallback if chatbot.js not loaded
             toggleLayer('chatbotLayer');
        }
    });
    wishBtn.addEventListener('click', () => {
        renderWishlistPreview();
        toggleLayer('wishlistLayer');
    });

    closeLayers.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.fab-layer').classList.remove('active');
        });
    });

    function toggleLayer(id) {
        document.querySelectorAll('.fab-layer').forEach(l => {
            if (l.id !== id) l.classList.remove('active');
        });
        document.getElementById(id).classList.toggle('active');
        wrapper.classList.remove('active'); // Close menu on selection
    }

    function renderWishlistPreview() {
        const container = document.getElementById('wishlistContent');
        if (FABState.wishlist.length === 0) {
            container.innerHTML = '<p style="color:#999; text-align:center; padding:20px;">찜한 숙소가 없습니다.</p>';
            return;
        }
        container.innerHTML = `<p style="padding:10px; font-weight:bold;">총 ${FABState.wishlist.length}개의 저장된 숙소</p>`;
        // In real app, fetch details by ID. For now just ID list or count.
    }

    // 8. Initial Trigger
    FABState.updateCurrencyUI();
}

// Auto Init
document.addEventListener('DOMContentLoaded', initFAB);
