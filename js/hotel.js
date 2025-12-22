/**
 * JEJU STAY - Interactive JavaScript (Hotel Page - Optimized)
 */

document.addEventListener('DOMContentLoaded', function() {
    // 1. 공통 및 신규 기능 초기화
    lucide.createIcons();
    initHeader();
    initMobileMenu();
    initWishlistButtons();
    initScrollAnimations();

    // 2. 검색 위젯 핵심 기능
    initSearchTabs();
    initDestinationDropdown();
    initCalendar(); 
    initGuestSelector();
});

/* ==========================================================================
   [유지] 기존 공통 기능 (헤더, 메뉴, 애니메이션)
   ========================================================================== */
function initHeader() {
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    });
}

function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    if (menuBtn && mobileNav) {
        menuBtn.addEventListener('click', () => mobileNav.classList.toggle('active'));
    }
}

function initWishlistButtons() {
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); e.stopPropagation();
            btn.classList.toggle('active');
        });
    });
}

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.hotel-card, .destination-card').forEach(el => observer.observe(el));
}

/* ==========================================================================
   [교체] 검색 위젯 및 연속 선택 캘린더 로직
   ========================================================================== */

/** 탭 전환 (호텔/펜션 vs 즐길거리) */
function initSearchTabs() {
    const tabs = document.querySelectorAll('.search-tab-large');
    const hotelForm = document.getElementById('searchFormHotel');
    const activityForm = document.getElementById('searchFormActivity');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            if (tab.dataset.tab === 'activity') {
                hotelForm.classList.add('hidden');
                activityForm.classList.remove('hidden');
            } else {
                hotelForm.classList.remove('hidden');
                activityForm.classList.add('hidden');
            }
        });
    });
}

/** 여행지 드롭다운 */
function initDestinationDropdown() {
    const destField = document.getElementById('destinationFieldLarge');
    const destInput = document.getElementById('destinationInput');
    const destDropdown = document.getElementById('destinationDropdown');

    destField?.addEventListener('click', (e) => {
        e.stopPropagation();
        closeAllPopups('destinationDropdown');
        destDropdown.classList.toggle('active');
        destField.classList.toggle('active');
    });

    document.querySelectorAll('.destination-item, .destination-item-text').forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            destInput.value = item.dataset.value || item.querySelector('.destination-name').textContent;
            destDropdown.classList.remove('active');
            destField.classList.remove('active');
        });
    });
}

/** 캘린더 상태 관리 및 연속 선택 기능 */
let currentMonth = new Date(); 
let bookingData = {
    checkIn: null,
    checkOut: null,
    selecting: 'checkIn' 
};

function initCalendar() {
    const checkInField = document.getElementById('checkInField');
    const checkOutField = document.getElementById('checkOutField');
    const calendarPopup = document.getElementById('calendarPopup');

    [checkInField, checkOutField].forEach(field => {
        field?.addEventListener('click', (e) => {
            e.stopPropagation();
            closeAllPopups('calendarPopup');
            bookingData.selecting = field.id === 'checkInField' ? 'checkIn' : 'checkOut';
            calendarPopup.classList.add('active');
            field.classList.add('active');
            renderCalendar();
        });
    });

    document.getElementById('prevMonth')?.addEventListener('click', (e) => {
        e.stopPropagation();
        currentMonth.setMonth(currentMonth.getMonth() - 1);
        renderCalendar();
    });

    document.getElementById('nextMonth')?.addEventListener('click', (e) => {
        e.stopPropagation();
        currentMonth.setMonth(currentMonth.getMonth() + 1);
        renderCalendar();
    });

    // 캘린더 탭 전환
    document.querySelectorAll('.calendar-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.stopPropagation();
            document.querySelectorAll('.calendar-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const isFlexible = tab.dataset.calendarTab === 'flexible';
            document.getElementById('calendarView').classList.toggle('hidden', isFlexible);
            document.getElementById('flexibleView').classList.toggle('hidden', !isFlexible);
        });
    });
}

function renderCalendar() {
    const leftDaysElement = document.getElementById('leftCalendarDays');
    const rightDaysElement = document.getElementById('rightCalendarDays');
    if (!leftDaysElement || !rightDaysElement) return;

    const leftDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const rightDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);

    document.getElementById('leftMonthTitle').textContent = `${leftDate.getFullYear()}년 ${leftDate.getMonth() + 1}월`;
    document.getElementById('rightMonthTitle').textContent = `${rightDate.getFullYear()}년 ${rightDate.getMonth() + 1}월`;

    leftDaysElement.innerHTML = generateDaysHTML(leftDate);
    rightDaysElement.innerHTML = generateDaysHTML(rightDate);
    
    document.querySelectorAll('.calendar-day:not(.empty)').forEach(dayEl => {
        const d = parseInt(dayEl.dataset.day);
        const m = parseInt(dayEl.dataset.month);
        const y = parseInt(dayEl.dataset.year);
        const dateObj = new Date(y, m - 1, d);

        // 선택된 날짜 강조
        if (bookingData.checkIn && dateObj.getTime() === bookingData.checkIn.getTime()) dayEl.classList.add('selected');
        if (bookingData.checkOut && dateObj.getTime() === bookingData.checkOut.getTime()) dayEl.classList.add('selected');

        dayEl.addEventListener('click', (e) => {
            e.stopPropagation();
            if (bookingData.selecting === 'checkIn') {
                bookingData.checkIn = dateObj;
                bookingData.checkOut = null; 
                updateDateDisplay('checkIn', y, m, d);
                // 자동 전환
                bookingData.selecting = 'checkOut';
                renderCalendar(); 
            } else {
                if (dateObj <= bookingData.checkIn) {
                    alert('체크아웃 날짜는 체크인보다 늦어야 합니다.');
                    return;
                }
                bookingData.checkOut = dateObj;
                updateDateDisplay('checkOut', y, m, d);
                setTimeout(() => { closeAllPopups(); }, 200);
            }
        });
    });
}

function updateDateDisplay(type, y, m, d) {
    const displayId = type === 'checkIn' ? 'checkInDisplay' : 'checkOutDisplay';
    const dayId = type === 'checkIn' ? 'checkInDay' : 'checkOutDay';
    const dayNames = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    const date = new Date(y, m - 1, d);
    document.getElementById(displayId).textContent = `${y}년 ${m}월 ${d}일`;
    document.getElementById(dayId).textContent = dayNames[date.getDay()];
}

function generateDaysHTML(date) {
    const y = date.getFullYear();
    const m = date.getMonth();
    const firstDay = new Date(y, m, 1).getDay();
    const startOffset = firstDay === 0 ? 6 : firstDay - 1; 
    const lastDay = new Date(y, m + 1, 0).getDate();
    let html = '';
    for (let i = 0; i < startOffset; i++) html += '<div class="calendar-day empty"></div>';
    for (let d = 1; d <= lastDay; d++) {
        html += `<div class="calendar-day" data-year="${y}" data-month="${m + 1}" data-day="${d}">${d}</div>`;
    }
    return html;
}

/** 인원 선택 */
function initGuestSelector() {
    const guestField = document.getElementById('guestFieldLarge');
    const guestPopup = document.getElementById('guestPopupLarge');
    
    guestField?.addEventListener('click', (e) => {
        e.stopPropagation();
        closeAllPopups('guestPopupLarge');
        guestPopup.classList.toggle('active');
        guestField.classList.toggle('active');
    });

    document.querySelectorAll('.counter-btn-new').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const target = btn.dataset.target;
            const span = document.getElementById(`${target}CountLarge`);
            let val = parseInt(span.textContent);
            if (btn.classList.contains('plus')) val++;
            else if (val > (target === 'children' ? 0 : 1)) val--;
            span.textContent = val;
            
            document.getElementById('guestSummary').textContent = `성인 ${document.getElementById('adultsCountLarge').textContent}명`;
            document.getElementById('roomSummary').textContent = `객실 ${document.getElementById('roomsCountLarge').textContent}개`;
        });
    });
}

/** 팝업 닫기 유틸리티 */
function closeAllPopups(exceptId) {
    const popups = {
        'destinationDropdown': document.getElementById('destinationDropdown'),
        'calendarPopup': document.getElementById('calendarPopup'),
        'guestPopupLarge': document.getElementById('guestPopupLarge')
    };
    const fields = {
        'destinationDropdown': document.getElementById('destinationFieldLarge'),
        'calendarPopup': document.getElementById('checkInField'),
        'guestPopupLarge': document.getElementById('guestFieldLarge')
    };

    for (let id in popups) {
        if (id !== exceptId && popups[id]) {
            popups[id].classList.remove('active');
            fields[id]?.classList.remove('active');
        }
    }
}

document.addEventListener('click', () => closeAllPopups());
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAllPopups(); });