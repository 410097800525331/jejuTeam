/*
 * JEJU STAY - Interactive JavaScript (Range Calendar 기능 최종 수정)
 */

// 전역 변수
let currentMonth = new Date();
let calendarState = {
    checkIn: null,  // 확정된 체크인 (Timestamp)
    checkOut: null, // 확정된 체크아웃 (Timestamp)
    tempCheckIn: null,  // 팝업 내 임시 체크인
    tempCheckOut: null  // 팝업 내 임시 체크아웃
};

document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    initHeader();
    initMobileMenu();
    initWishlistButtons();
    initScrollAnimations();
    initSearchTabs();
    initDestinationDropdown();
    initCalendar(); 
    initGuestSelector();
});

/* ========== [유지] 공통 기능 ========== */
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

/* ========== [수정] 검색 및 캘린더 로직 ========== */

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
            destInput.value = item.dataset.value;
            destDropdown.classList.remove('active');
            destField.classList.remove('active');
        });
    });
    
    // 외부 클릭 시 닫기
    document.addEventListener('click', (e) => {
        if (!destField?.contains(e.target)) {
            destDropdown?.classList.remove('active');
            destField?.classList.remove('active');
        }
    });
}

/* ========== [수정] Range Calendar 초기화 ========== */
function initCalendar() {
    const checkInField = document.getElementById('checkInField');
    const checkOutField = document.getElementById('checkOutField');
    const calendarPopup = document.getElementById('calendarPopup');

    function openCalendar(e) {
        e.stopPropagation();
        closeAllPopups('calendarPopup');
        
        // 팝업을 열 때 이전 선택 날짜를 임시 변수에 복사
        calendarState.tempCheckIn = calendarState.checkIn;
        calendarState.tempCheckOut = calendarState.checkOut;
        
        calendarPopup.classList.add('active');
        checkInField.classList.add('active');
        
        renderCalendar();
    }

    checkInField?.addEventListener('click', (e) => openCalendar(e));
    checkOutField?.addEventListener('click', (e) => openCalendar(e));

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

    // 캘린더 팝업 외부 클릭 시 닫기
    document.addEventListener('click', (e) => {
        if (!checkInField?.contains(e.target) && !checkOutField?.contains(e.target) && !calendarPopup?.contains(e.target)) {
            calendarPopup?.classList.remove('active');
            checkInField?.classList.remove('active');
            checkOutField?.classList.remove('active');
        }
    });
}

/* ========== [수정] Range Calendar 날짜 선택 로직 ========== */
function handleDateClick(timestamp) {
    // 오늘 이전 날짜는 선택 불가
    const todayTs = new Date().setHours(0, 0, 0, 0);
    if (timestamp < todayTs) return;

    // 첫 번째 클릭: 이전 선택 초기화 후 새로운 체크인 설정
    if (!calendarState.tempCheckIn || calendarState.tempCheckIn === calendarState.checkIn) {
        // 이전 선택 초기화
        calendarState.tempCheckIn = timestamp;
        calendarState.tempCheckOut = null;
    }
    // 두 번째 클릭: 체크아웃 설정
    else if (timestamp > calendarState.tempCheckIn) {
        calendarState.tempCheckOut = timestamp;
        
        // 확정 날짜로 저장
        calendarState.checkIn = calendarState.tempCheckIn;
        calendarState.checkOut = calendarState.tempCheckOut;
        
        // 디스플레이 업데이트
        updateDateDisplay('checkIn', new Date(calendarState.checkIn));
        updateDateDisplay('checkOut', new Date(calendarState.checkOut));
        
        // 팝업 닫기
        setTimeout(() => {
            closeAllPopups();
        }, 200);
        return;
    }
    // 같은 날짜를 다시 클릭하거나 이전 날짜를 클릭하면 새로 시작
    else {
        calendarState.tempCheckIn = timestamp;
        calendarState.tempCheckOut = null;
    }

    renderCalendar();
}

/** 캘린더 그리기 */
function renderCalendar() {
    const leftDaysElement = document.getElementById('leftCalendarDays');
    const rightDaysElement = document.getElementById('rightCalendarDays');
    if (!leftDaysElement || !rightDaysElement) return;

    // 현재 달과 다음 달 계산
    const leftDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const rightDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);

    document.getElementById('leftMonthTitle').textContent = `${leftDate.getFullYear()}년 ${leftDate.getMonth() + 1}월`;
    document.getElementById('rightMonthTitle').textContent = `${rightDate.getFullYear()}년 ${rightDate.getMonth() + 1}월`;

    // HTML 생성
    leftDaysElement.innerHTML = generateDaysHTML(leftDate);
    rightDaysElement.innerHTML = generateDaysHTML(rightDate);

    // 이벤트 리스너 및 스타일 적용
    const todayTs = new Date().setHours(0, 0, 0, 0);
    
    document.querySelectorAll('.calendar-day:not(.empty)').forEach(dayEl => {
        const d = parseInt(dayEl.dataset.day);
        const m = parseInt(dayEl.dataset.month);
        const y = parseInt(dayEl.dataset.year);
        const currentTs = new Date(y, m - 1, d).setHours(0, 0, 0, 0);

        // 1. 오늘 날짜 - 주황색 원형 테두리
        if (currentTs === todayTs) {
            dayEl.classList.add('today');
        }
        
        // 2. 과거 날짜 비활성화
        if (currentTs < todayTs) {
            dayEl.classList.add('disabled');
        }

        // 3. 선택 로직 (스타일링) - 임시 선택 기준
        const start = calendarState.tempCheckIn;
        const end = calendarState.tempCheckOut;

        // 체크인 날짜
        if (start === currentTs) {
            if (end) {
                dayEl.classList.add('check-in');
            } else {
                dayEl.classList.add('single-date');
            }
        }

        // 체크아웃 날짜
        if (end === currentTs) {
            dayEl.classList.add('check-out');
        }

        // 범위 내 날짜 (연한 주황색)
        if (start && end && currentTs > start && currentTs < end) {
            dayEl.classList.add('in-range');
        }

        // 클릭 이벤트 연결
        if (!dayEl.classList.contains('disabled')) {
            dayEl.addEventListener('click', (e) => {
                e.stopPropagation();
                handleDateClick(currentTs);
            });
        }
    });
}

function generateDaysHTML(date) {
    const y = date.getFullYear();
    const m = date.getMonth();
    const firstDay = new Date(y, m, 1).getDay();
    const lastDay = new Date(y, m + 1, 0).getDate();
    const startOffset = firstDay === 0 ? 6 : firstDay - 1; // 월요일 시작 기준 보정
    
    let html = '';
    for (let i = 0; i < startOffset; i++) html += '<div class="calendar-day empty"></div>';
    for (let d = 1; d <= lastDay; d++) {
        html += `<div class="calendar-day" data-year="${y}" data-month="${m + 1}" data-day="${d}">${d}</div>`;
    }
    return html;
}

function updateDateDisplay(type, dateObj) {
    const displayId = type === 'checkIn' ? 'checkInDisplay' : 'checkOutDisplay';
    const dayId = type === 'checkIn' ? 'checkInDay' : 'checkOutDay';
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    
    document.getElementById(displayId).textContent = 
        `${dateObj.getFullYear()}년 ${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일`;
    document.getElementById(dayId).textContent = dayNames[dateObj.getDay()] + '요일';
}

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
            else if (val > 0) val--;
            span.textContent = val;
        });
    });
}

function closeAllPopups(exceptId) {
    const popups = ['destinationDropdown', 'calendarPopup', 'guestPopupLarge'];
    
    const popupMap = {
        'destinationDropdown': document.getElementById('destinationDropdown'),
        'calendarPopup': document.getElementById('calendarPopup'),
        'guestPopupLarge': document.getElementById('guestPopupLarge')
    };
    
    Object.keys(popupMap).forEach(key => {
        if (key !== exceptId && popupMap[key]) {
            popupMap[key].classList.remove('active');
        }
    });
    
    // 모든 필드 active 제거
    if (!exceptId) {
        document.querySelectorAll('.search-field-new').forEach(f => f.classList.remove('active'));
    }
}

document.addEventListener('click', () => closeAllPopups());
