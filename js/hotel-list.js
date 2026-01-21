// hotel-list.js

const hotels = [
    {
        id: 1,
        name: "그랜드 하얏트 제주",
        location: "제주시 노형동 · 해변까지 도보 5분",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
        stars: 5,
        rating: 9.2,
        reviews: 2341,
        priceOriginal: 350000,
        priceFinal: 245000,
        badge: "JJ 추천",
        discount: 30,
        amenities: ["무료 와이파이", "수영장", "조식 포함"],
        region: "jeju"
    },
    {
        id: 2,
        name: "파르나스 호텔 제주",
        location: "서귀포시 중문관광단지 · 오션뷰",
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80",
        stars: 5,
        rating: 9.6,
        reviews: 1205,
        priceOriginal: 520000,
        priceFinal: 410000,
        badge: "특가",
        discount: 21,
        amenities: ["인피니티 풀", "스파", "피트니스"],
        region: "jeju"
    },
    {
        id: 3,
        name: "신라 호텔 제주",
        location: "서귀포시 중문 · 럭셔리 휴양",
        image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&q=80",
        stars: 5,
        rating: 9.5,
        reviews: 3500,
        priceOriginal: 600000,
        priceFinal: 480000,
        badge: "인기",
        discount: 20,
        amenities: ["키즈 클럽", "야외 수영장", "글램핑"],
        region: "jeju"
    },
    {
        id: 4,
        name: "랜딩관 제주신화월드 호텔",
        location: "서귀포시 안덕면 · 테마파크 인접",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80",
        stars: 4,
        rating: 8.8,
        reviews: 5420,
        priceOriginal: 200000,
        priceFinal: 135000,
        badge: "가성비",
        discount: 32,
        amenities: ["테마파크", "워터파크", "쇼핑몰"],
        region: "jeju"
    },
    {
        id: 5,
        name: "오사카 리츠칼튼",
        location: "오사카 우메다 · 도심 중심",
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=80",
        stars: 5,
        rating: 9.5,
        reviews: 890,
        priceOriginal: 750000,
        priceFinal: 620000,
        badge: "럭셔리",
        discount: 17,
        amenities: ["클럽 라운지", "스파", "미슐랭"],
        region: "osaka"
    },
    {
        id: 6,
        name: "호텔 닛코 오사카",
        location: "오사카 신사이바시 · 지하철 연결",
        image: "https://images.unsplash.com/photo-1496417263034-38ec4f0d665a?w=600&q=80",
        stars: 4,
        rating: 8.9,
        reviews: 2100,
        priceOriginal: 250000,
        priceFinal: 180000,
        badge: "위치 갑",
        discount: 28,
        amenities: ["무료 와이파이", "조식 뷔페", "공항 버스"],
        region: "osaka"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    initSearch();
    filterAndRenderHotels();
});

// URL Parameters
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        region: params.get('region') || 'jeju' // Default to Jeju if empty
    };
}

// Region Mapping
const regionNames = {
    'jeju': '제주도',
    'seoul': '서울',
    'busan': '부산',
    'osaka': '오사카',
    'tokyo': '도쿄',
    'danang': '다낭',
    'bangkok': '방콕'
};

function initSearch() {
    const { region } = getUrlParams();
    const regionName = regionNames[region] || '제주도';

    // Set Search Input
    const regionInput = document.getElementById('regionInput');
    if (regionInput) regionInput.value = regionName;

    document.getElementById('searchResultTitle').innerHTML = `${regionName}의 숙소 <span class="highlight-orange">${hotels.length}개</span>`;

    // Set Date (Today - Tomorrow)
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const dateStr = `${formatDate(today)} - ${formatDate(tomorrow)} (1박)`;
    document.getElementById('dateRangeDisplay').textContent = dateStr;

    // Set Guest
    document.getElementById('guestDisplay').textContent = "성인 2명, 객실 1개";

    // Mobile Filter Toggle
    const mobileFilterBtn = document.getElementById('mobileFilterBtn');
    const sidebar = document.querySelector('.sidebar');
    
    if (mobileFilterBtn && sidebar) {
        mobileFilterBtn.addEventListener('click', () => {
            sidebar.classList.add('active');
            
            // Add close button if not exists
            if (!document.getElementById('mobileSidebarClose')) {
                const closeBtn = document.createElement('button');
                closeBtn.id = 'mobileSidebarClose';
                closeBtn.innerHTML = '<i data-lucide="x"></i> 닫기';
                closeBtn.style.cssText = 'display:flex; align-items:center; gap:8px; margin-bottom:20px; font-weight:700; font-size:1.1rem; width:100%; justify-content:flex-end;';
                closeBtn.addEventListener('click', () => {
                    sidebar.classList.remove('active');
                });
                sidebar.prepend(closeBtn);
                lucide.createIcons();
            }
        });
    }

    // Sort Event
    document.getElementById('sortSelect').addEventListener('change', (e) => {
        const sortType = e.target.value;
        sortHotels(sortType);
    });
}

function formatDate(date) {
    const m = date.getMonth() + 1;
    const d = date.getDate();
    return `${m}월 ${d}일`;
}

function filterAndRenderHotels() {
    // In a real app, filtering by region would happen here. 
    // For this mock, we verify if 'region' in hotels matches (optional, but good for demo)
    const { region } = getUrlParams();
    
    // Simple filter: if region is 'osaka', show osaka hotels. Else show all or jeju.
    // Let's just render all mock data for visual richness if mapped region is generic, 
    // or filter strictly if needed. For now, I'll filter by region if match found, else show all.
    
    let filtered = hotels.filter(h => !h.region || h.region === region);
    if (filtered.length === 0) filtered = hotels; // Fallback to show something
    
    renderHotels(filtered);
}

function renderHotels(list) {
    const container = document.getElementById('hotelListContainer');
    container.innerHTML = '';

    list.forEach(hotel => {
        const card = document.createElement('article');
        card.className = 'hotel-card-item';
        card.innerHTML = `
            <div class="card-image-wrap">
                <img src="${hotel.image}" alt="${hotel.name}" class="card-image">
                <button class="wishlist-btn-small"><i data-lucide="heart"></i></button>
            </div>
            <div class="card-content">
                <div class="card-info">
                    <div class="card-header-badges">
                        <div class="badge-star">
                            ${renderStars(hotel.stars)}
                        </div>
                    </div>
                    <h3 class="card-title">${hotel.name}</h3>
                    <p class="card-location"><i data-lucide="map-pin" size="14"></i> ${hotel.location}</p>
                    <div class="card-amenities">
                        ${hotel.amenities.map(a => `<span><i data-lucide="check" size="12"></i> ${a}</span>`).join('')}
                    </div>
                </div>
                <div class="card-price-area">
                    <div class="review-badge">
                        <span class="score">${hotel.rating}</span>
                        <span class="review-count">이용후기 ${hotel.reviews.toLocaleString()}개</span>
                    </div>
                    <div style="margin-top:auto">
                        <span class="special-badge">${hotel.badge}</span>
                        <div class="price-original">₩${hotel.priceOriginal.toLocaleString()}</div>
                        <div class="price-final">₩${hotel.priceFinal.toLocaleString()}</div>
                        <p class="price-tax-info">세금 및 봉사료 포함</p>
                        <button class="btn-view-deal">객실 선택</button>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });

    lucide.createIcons();
}

function renderStars(count) {
    let html = '';
    for(let i=0; i<count; i++) {
        html += '<i data-lucide="star" class="fill-current"></i>';
    }
    return html;
}

function sortHotels(type) {
    const { region } = getUrlParams();
    let currentList = hotels.filter(h => !h.region || h.region === region);
    if (currentList.length === 0) currentList = [...hotels];

    if (type === 'price_asc') {
        currentList.sort((a, b) => a.priceFinal - b.priceFinal);
    } else if (type === 'price_desc') {
        currentList.sort((a, b) => b.priceFinal - a.priceFinal);
    } else if (type === 'rating_desc') {
        currentList.sort((a, b) => b.rating - a.rating);
    } 
    // recommended: default order

    renderHotels(currentList);
}
