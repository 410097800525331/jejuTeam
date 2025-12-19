/**
 * JEJU STAY - Interactive JavaScript
 * 제주항공 브랜드 기반 OTA 플랫폼 인터랙션
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide Icons
    lucide.createIcons();
    
    // Initialize all modules
    initHeader();
    initSearchTabs();
    initDestinationInput();
    initGuestPopup();
    initMobileMenu();
    initWishlistButtons();
});

/**
 * Header Scroll Effect
 * 스크롤 시 헤더 배경이 투명에서 흰색으로 변경
 */
function initHeader() {
    const header = document.getElementById('header');
    const scrollThreshold = 50;
    
    function updateHeader() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Initial check
    updateHeader();
    
    // Throttled scroll listener
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateHeader();
                ticking = false;
            });
            ticking = true;
        }
    });
}

/**
 * Search Tabs Switching
 * 호텔/펜션/즐길거리 탭 전환 시 검색바 구성 변경
 */
function initSearchTabs() {
    const tabs = document.querySelectorAll('.search-tab');
    const dateFieldHotel = document.getElementById('dateFieldHotel');
    const dateFieldActivity = document.getElementById('dateFieldActivity');
    const guestFieldHotel = document.getElementById('guestFieldHotel');
    const guestFieldActivity = document.getElementById('guestFieldActivity');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Get tab type
            const tabType = this.dataset.tab;
            
            // Update search form based on tab type
            updateSearchForm(tabType);
        });
    });
    
    function updateSearchForm(tabType) {
        if (tabType === 'activity') {
            // 즐길거리: 단일 날짜, 인원만 (객실 없음)
            dateFieldHotel.classList.add('hidden');
            dateFieldActivity.classList.remove('hidden');
            guestFieldHotel.classList.add('hidden');
            guestFieldActivity.classList.remove('hidden');
        } else {
            // 호텔/펜션: 체크인-체크아웃, 인원 및 객실
            dateFieldHotel.classList.remove('hidden');
            dateFieldActivity.classList.add('hidden');
            guestFieldHotel.classList.remove('hidden');
            guestFieldActivity.classList.add('hidden');
        }
        
        // Re-initialize Lucide icons for newly visible elements
        lucide.createIcons();
    }
}

/**
 * Destination Input with Recent Searches
 * 목적지 입력창 포커스 시 최근 검색어 표시
 */
function initDestinationInput() {
    const destinationInput = document.getElementById('destinationInput');
    const recentSearches = document.getElementById('recentSearches');
    const recentItems = document.querySelectorAll('.recent-item');
    const destinationField = document.querySelector('.destination-field');
    
    // Show recent searches on focus
    destinationInput.addEventListener('focus', function() {
        recentSearches.classList.add('active');
    });
    
    // Hide recent searches when clicking outside
    document.addEventListener('click', function(e) {
        if (!destinationField.contains(e.target)) {
            recentSearches.classList.remove('active');
        }
    });
    
    // Handle recent item click
    recentItems.forEach(item => {
        item.addEventListener('click', function() {
            const value = this.dataset.value;
            destinationInput.value = value;
            recentSearches.classList.remove('active');
            
            // Trigger input event for any listeners
            destinationInput.dispatchEvent(new Event('input'));
        });
    });
    
    // Filter recent searches based on input
    destinationInput.addEventListener('input', function() {
        const searchValue = this.value.toLowerCase();
        
        recentItems.forEach(item => {
            const itemValue = item.dataset.value.toLowerCase();
            const itemText = item.querySelector('span').textContent.toLowerCase();
            
            if (itemValue.includes(searchValue) || itemText.includes(searchValue)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
        
        // Show dropdown if there's input
        if (searchValue.length > 0) {
            recentSearches.classList.add('active');
        }
    });
}

/**
 * Guest Selection Popup
 * 인원 및 객실 선택 팝업 토글 및 카운터 기능
 */
function initGuestPopup() {
    const guestField = document.getElementById('guestFieldHotel');
    const guestPopup = document.getElementById('guestPopup');
    const guestDisplay = document.getElementById('guestDisplay');
    const applyBtn = document.getElementById('guestApplyBtn');
    
    // Counter elements
    const adultsCount = document.getElementById('adultsCount');
    const childrenCount = document.getElementById('childrenCount');
    const roomsCount = document.getElementById('roomsCount');
    
    // Counter buttons
    const counterBtns = document.querySelectorAll('.counter-btn');
    
    // Guest state
    let guests = {
        adults: 2,
        children: 0,
        rooms: 1
    };
    
    // Toggle popup
    guestField.addEventListener('click', function(e) {
        // Prevent toggle when clicking inside popup
        if (guestPopup.contains(e.target)) {
            return;
        }
        guestPopup.classList.toggle('active');
    });
    
    // Close popup when clicking outside
    document.addEventListener('click', function(e) {
        if (!guestField.contains(e.target)) {
            guestPopup.classList.remove('active');
        }
    });
    
    // Counter button handlers
    counterBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const target = this.dataset.target;
            const isPlus = this.classList.contains('plus');
            
            if (isPlus) {
                incrementCounter(target);
            } else {
                decrementCounter(target);
            }
            
            updateCounterDisplay();
            updateButtonStates();
        });
    });
    
    function incrementCounter(target) {
        const maxValues = { adults: 10, children: 6, rooms: 5 };
        if (guests[target] < maxValues[target]) {
            guests[target]++;
        }
    }
    
    function decrementCounter(target) {
        const minValues = { adults: 1, children: 0, rooms: 1 };
        if (guests[target] > minValues[target]) {
            guests[target]--;
        }
    }
    
    function updateCounterDisplay() {
        adultsCount.textContent = guests.adults;
        childrenCount.textContent = guests.children;
        roomsCount.textContent = guests.rooms;
    }
    
    function updateButtonStates() {
        const minValues = { adults: 1, children: 0, rooms: 1 };
        const maxValues = { adults: 10, children: 6, rooms: 5 };
        
        counterBtns.forEach(btn => {
            const target = btn.dataset.target;
            const isPlus = btn.classList.contains('plus');
            
            if (isPlus) {
                btn.disabled = guests[target] >= maxValues[target];
            } else {
                btn.disabled = guests[target] <= minValues[target];
            }
        });
    }
    
    // Apply button handler
    applyBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // Update display text
        let displayText = `성인 ${guests.adults}명`;
        if (guests.children > 0) {
            displayText += `, 아동 ${guests.children}명`;
        }
        displayText += `, 객실 ${guests.rooms}개`;
        
        guestDisplay.textContent = displayText;
        guestPopup.classList.remove('active');
    });
    
    // Initialize button states
    updateButtonStates();
}

/**
 * Mobile Menu Toggle
 * 모바일 햄버거 메뉴 토글
 */
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const header = document.getElementById('header');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileNav.classList.toggle('active');
        
        // Update icon
        const icon = this.querySelector('svg');
        if (mobileNav.classList.contains('active')) {
            icon.setAttribute('data-lucide', 'x');
            header.classList.add('scrolled');
        } else {
            icon.setAttribute('data-lucide', 'menu');
            if (window.scrollY <= 50) {
                header.classList.remove('scrolled');
            }
        }
        
        // Re-render icon
        lucide.createIcons();
    });
    
    // Close mobile menu when clicking a link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('svg');
            icon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        });
    });
}

/**
 * Wishlist Button Toggle
 * 호텔 카드 위시리스트 버튼 토글
 */
function initWishlistButtons() {
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');
    
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            this.classList.toggle('active');
            
            const icon = this.querySelector('svg');
            if (this.classList.contains('active')) {
                // Filled heart
                this.style.color = '#FF5000';
                icon.style.fill = '#FF5000';
            } else {
                // Empty heart
                this.style.color = '';
                icon.style.fill = 'none';
            }
        });
    });
}

/**
 * Search Button Handler
 * 검색 버튼 클릭 시 알림 (데모용)
 */
document.getElementById('searchBtn').addEventListener('click', function() {
    const destination = document.getElementById('destinationInput').value;
    const dateDisplay = document.getElementById('dateDisplay').textContent;
    const guestDisplay = document.getElementById('guestDisplay').textContent;
    
    if (!destination) {
        alert('여행지를 입력해주세요.');
        document.getElementById('destinationInput').focus();
        return;
    }
    
    // Demo alert - in production, this would navigate to search results
    alert(`검색 조건:\n\n📍 여행지: ${destination}\n📅 일정: ${dateDisplay}\n👥 인원: ${guestDisplay}\n\n검색 결과 페이지로 이동합니다.`);
});

/**
 * Smooth Scroll for Anchor Links
 * 앵커 링크 부드러운 스크롤
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/**
 * Intersection Observer for Animations
 * 스크롤 시 요소 페이드인 애니메이션
 */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animateElements = document.querySelectorAll('.destination-card, .hotel-card, .promo-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Add animation class styles
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Initialize scroll animations
initScrollAnimations();

/**
 * Date Picker Placeholder
 * 날짜 선택 필드 클릭 시 알림 (실제 구현 시 날짜 피커 라이브러리 사용)
 */
document.querySelectorAll('.date-field').forEach(field => {
    field.addEventListener('click', function() {
        // In production, integrate a date picker library like flatpickr
        const isActivity = this.id === 'dateFieldActivity';
        const message = isActivity 
            ? '이용 날짜를 선택해주세요.\n(실제 서비스에서는 날짜 선택 달력이 표시됩니다)'
            : '체크인/체크아웃 날짜를 선택해주세요.\n(실제 서비스에서는 날짜 선택 달력이 표시됩니다)';
        
        // Demo - show alert
        // alert(message);
    });
});

/**
 * Keyboard Navigation Support
 * 키보드 접근성 지원
 */
document.addEventListener('keydown', function(e) {
    // Close popups on Escape
    if (e.key === 'Escape') {
        document.getElementById('recentSearches').classList.remove('active');
        document.getElementById('guestPopup').classList.remove('active');
        document.getElementById('mobileNav').classList.remove('active');
    }
});

/**
 * Console Welcome Message
 */
console.log('%c🏨 JEJU STAY', 'font-size: 24px; font-weight: bold; color: #FF5000;');
console.log('%c제주그룹의 글로벌 호텔 예약 플랫폼에 오신 것을 환영합니다!', 'font-size: 14px; color: #333;');
console.log('%c© 2024 JEJU GROUP. All rights reserved.', 'font-size: 12px; color: #757575;');
