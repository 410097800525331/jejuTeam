// hotel-search-results.js

// Mock Data for Filters
const filterSections = [
    { title: "인기 검색 조건", items: ["조식 포함", "무료 취소", "수영장", "5성급", "특가 포함"] },
    { title: "숙소 종류", items: ["호텔", "리조트", "호스텔", "아파트", "펜션/풀빌라", "모텔"] },
    { title: "지역", items: ["히로시마 역", "나카 구", "미나미 구", "니시 구", "히가시 구"] },
    { title: "결제 관련", items: ["현장 결제", "무료 취소", "선결제 할인"] },
    { title: "숙소 성급", items: ["5성급", "4성급", "3성급", "2성급"] },
    { title: "서비스/옵션", items: ["공항 셔틀", "발렛 파킹", "24시간 데스크", "수하물 보관"] },
    { title: "편의 시설", items: ["무료 와이파이", "주차장", "피트니스 센터", "스파/사우나", "레스토랑"] },
    { title: "평가 점수", items: ["9+ 최고", "8+ 우수", "7+ 좋음"] },
    { title: "객실 편의 시설", items: ["욕조", "발코니/테라스", "주방/간이 주방", "전용 수영장"] },
    { title: "도심 거리", items: ["도심 내", "2km 이내", "5km 이내"] },
    { title: "침대 종류", items: ["싱글 침대", "더블 침대", "퀸 침대", "킹 침대"] },
    { title: "가족 인기", items: ["패밀리룸", "키즈 클럽", "유아용 침대"] },
    { title: "위치 평가", items: ["교통 편리", "쇼핑 편리", "관광지 인근"] },
    { title: "여행 테마", items: ["비즈니스", "럭셔리", "로맨틱", "가족 여행"] },
    { title: "주변 명소", items: ["평화 기념 공원", "히로시마 성", "슈케이엔 정원"] },
    { title: "침실 수", items: ["1 침실", "2 침실", "3 침실 이상"] },
    { title: "인기 브랜드", items: ["APA 호텔", "토요코 인", "힐튼", "쉐라톤", "IHG", "하얏트"] }
];

// Mock Data for Hotels
const hotels = [
    {
        id: 1,
        name: "오리엔탈 호텔 히로시마 (Oriental Hotel Hiroshima)",
        img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
        stars: 4,
        rating: 8.2,
        reviews: 7659,
        location: "히로시마, 히로시마 - 도심에 위치",
        priceOriginal: 59046,
        priceFinal: 52644,
        deal: "11% 할인",
        badge: "우수",
        amenities: ["무료 와이파이", "스파", "피트니스"]
    },
    {
        id: 2,
        name: "쉐라톤 그랜드 히로시마 호텔 (Sheraton Grand Hiroshima Hotel)",
        img: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80",
        stars: 5,
        rating: 9.1,
        reviews: 2948,
        location: "히로시마, 히로시마 - 도심까지 0.8km",
        priceOriginal: 200012,
        priceFinal: 170258,
        deal: "특가",
        badge: "최고",
        amenities: ["수영장", "조식 포함", "클럽 라운지"]
    },
    {
        id: 3,
        name: "스마일 호텔 히로시마 (Smile Hotel Hiroshima)",
        img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80",
        stars: 3,
        rating: 8.9,
        reviews: 9068,
        location: "히로시마, 히로시마 - 대중교통 이용 편리",
        priceOriginal: 85000,
        priceFinal: 42000,
        deal: "오늘의 딜",
        badge: "우수",
        amenities: ["무료 와이파이", "코인 세탁실"]
    },
    {
        id: 4,
        name: "리가 로얄 호텔 히로시마 (RIHGA Royal Hotel Hiroshima)",
        img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=80",
        stars: 4,
        rating: 9.0,
        reviews: 5120,
        location: "히로시마, 히로시마 - 히로시마 성 인근",
        priceOriginal: 150000,
        priceFinal: 110000,
        deal: "25% 할인",
        badge: "훌륭함",
        amenities: ["스카이 라운지", "사우나", "수영장"]
    },
    {
        id: 5,
        name: "도미 인 히로시마 (Dormy Inn Hiroshima)",
        img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80",
        stars: 3,
        rating: 8.8,
        reviews: 3200,
        location: "히로시마 - 온천 시설 보유",
        priceOriginal: 95000,
        priceFinal: 82000,
        deal: "인기 숙소",
        badge: "우수",
        amenities: ["대욕장", "야식 무료", "사우나"]
    },
    {
        id: 6,
        name: "그랜드 프린스 호텔 히로시마 (Grand Prince Hotel Hiroshima)",
        img: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&q=80",
        stars: 4,
        rating: 8.5,
        reviews: 4500,
        location: "히로시마, 우지나 - 바다 전망",
        priceOriginal: 180000,
        priceFinal: 135000,
        deal: "20% 할인",
        badge: "매우 좋음",
        amenities: ["오션뷰", "온천", "셔틀버스"]
    }
];

document.addEventListener('DOMContentLoaded', () => {
    // Initial Render
    renderFilters();
    initPriceSlider();
    
    // Simulate Skeleton Loading
    renderSkeleton();
    setTimeout(() => {
        renderHotelList();
    }, 1200); // 1.2s fake network delay
    
    
    // Search Button Logger
    const searchBtn = document.querySelector('.btn-search');
    if(searchBtn) {
        searchBtn.addEventListener('click', () => {
            console.log('Search Condition Updated!');
            alert('검색 조건이 갱신되었습니다.');
            // Re-trigger layout
            renderSkeleton();
            setTimeout(renderHotelList, 800);
        });
    }
});

// Render Sidebar Filters with Fixed Layout
function renderFilters() {
    const container = document.getElementById('filterContainer');
    if (!container) return;

    filterSections.forEach((section, index) => {
        const sectionEl = document.createElement('div');
        sectionEl.className = 'filter-section';
        
        // Items HTML construction with updated classes
        let itemsHtml = '';
        section.items.forEach(item => {
            const count = Math.floor(Math.random() * 200) + 1;
            itemsHtml += `
                <label class="checkbox-item">
                    <div class="checkbox-left">
                        <input type="checkbox" name="${section.title}" value="${item}">
                        <span class="checkmark"></span>
                        <span>${item}</span>
                    </div>
                    <span class="item-count">${count}</span>
                </label>
            `;
        });

        sectionEl.innerHTML = `
            <div class="filter-header">
                ${section.title}
                <i data-lucide="chevron-down" size="16"></i>
            </div>
            <div class="filter-content" id="filter-content-${index}">
                ${itemsHtml}
            </div>
        `;
        container.appendChild(sectionEl);

        // Toggle Logic
        const header = sectionEl.querySelector('.filter-header');
        const content = sectionEl.querySelector('.filter-content');
        const icon = header.querySelector('i');
        
        header.addEventListener('click', () => {
             const isHidden = content.style.display === 'none';
             content.style.display = isHidden ? 'flex' : 'none';
             icon.style.transform = isHidden ? 'rotate(0deg)' : 'rotate(180deg)';
             icon.style.transition = 'transform 0.2s';
        });
    });
    
    if(window.lucide) lucide.createIcons();
}

// Custom Range Slider Logic
function initPriceSlider() {
    const sliderInput = document.getElementById('rangeSlider'); // The hidden real input
    const sliderContainer = document.querySelector('.range-slider');
    
    // Convert to custom structure
    // We already have .range-slider in HTML, let's inject custom parts
    if(sliderContainer) {
        sliderContainer.innerHTML = `
            <div class="custom-range-slider">
                <div class="slider-track"></div>
                <div class="slider-fill" id="sliderFill" style="width: 0%"></div>
                <input type="range" class="range-input-styled" min="0" max="100" value="0" id="styledSlider">
            </div>
        `;
    }

    const styledSlider = document.getElementById('styledSlider');
    const inputMax = document.getElementById('priceInputMax');

    if(styledSlider && inputMax) {
        styledSlider.addEventListener('input', (e) => {
            const val = e.target.value;
            // Visual Update
            document.getElementById('sliderFill').style.width = val + '%';
            
            // Value Update (Mock mapping)
            // 0 -> 0, 100 -> 2,000,000 roughly
            const price = Math.round(val * 20000);
            inputMax.value = price.toLocaleString();
        });
    }
}

// Skeleton Rendering
function renderSkeleton() {
    const container = document.getElementById('hotelListContainer');
    if(!container) return;
    
    // Create 4 skeleton items
    let skeletons = '';
    for(let i=0; i<4; i++) {
        skeletons += `
            <div class="skeleton-card">
                <div class="skeleton-img skeleton"></div>
                <div class="skeleton-content">
                     <div class="skeleton-line skeleton"></div>
                     <div class="skeleton-line short skeleton"></div>
                     <div class="skeleton-line skeleton"></div>
                     <div class="skeleton-line price skeleton"></div>
                </div>
            </div>
        `;
    }
    container.innerHTML = skeletons;
}

// Render Real Hotel List
function renderHotelList() {
    const container = document.getElementById('hotelListContainer');
    if(!container) return;

    container.innerHTML = '';
    
    hotels.forEach((hotel, index) => {
        const card = document.createElement('article');
        card.className = 'hotel-card';
        // Animation Stagger
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <div class="card-gallery">
                <img src="${hotel.img}" alt="${hotel.name}" class="card-img">
            </div>
            <div class="card-info">
                <div class="info-top">
                    <!-- Rating Stars -->
                    <div class="star-rating">
                        ${getStarHtml(hotel.stars)}
                    </div>
                    
                    <h3 class="card-title">${hotel.name}</h3>
                    
                    <div class="location-text">
                        <i data-lucide="map-pin"></i> ${hotel.location}
                    </div>
                </div>
                
                <div class="amneties-box">
                    ${hotel.amenities.map(a => `<span class="amenity-tag">${a}</span>`).join('')}
                </div>
            </div>
            
            <div class="card-price">
                <div class="review-badge">
                     <div class="score-box">${hotel.rating}</div>
                     <span class="review-count">${hotel.badge} · ${hotel.reviews.toLocaleString()}건</span>
                </div>
                
                <div class="price-details">
                    <span class="special-deal">${hotel.deal}</span>
                    <div class="original-price">₩${hotel.priceOriginal.toLocaleString()}</div>
                    <div class="final-price">₩${hotel.priceFinal.toLocaleString()}</div>
                    <div class="tax-note">세금 및 봉사료 불포함</div>
                    <button class="btn-check-avail">객실 선택</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });

    if(window.lucide) lucide.createIcons();
}

function getStarHtml(stars) {
    let html = '';
    for(let i=0; i<stars; i++) html += '<i data-lucide="star"></i>';
    return html;
}
