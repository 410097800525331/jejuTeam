/*
 * JEJU STAY - Life (Long Stay) Interactive JavaScript
 * Based on hotel.js, extended for Long Term Stay logic
 */

// 전역 변수
let currentMonth = new Date();
let calendarState = {
    checkIn: null,  // 확정된 체크인 (Timestamp)
    checkOut: null, // 확정된 체크아웃 (Timestamp)
    tempCheckIn: null,  // 팝업 내 임시 체크인
    tempCheckOut: null  // 팝업 내 임시 체크아웃
};
let hoverDate = null;

// Constants
const MIN_STAY_DAYS = 14;
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Icons
    if (window.lucide) {
        lucide.createIcons();
    }

    initHeader();
    initMobileMenu();
    initWishlistButtons();
    initScrollAnimations();
    // initSearchTabs(); // 롱스테이 페이지는 탭 없음
    initDestinationDropdown(); // 기존 목적지 검색 유지
    initCalendar(); // 롱스테이 전용 로직 포함
    initAmenityFilter();
    initMobileSearch();
});

/* ========== 공통 기능 (hotel.js와 동일) ========== */
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
    document.querySelectorAll('.hotel-card, .destination-card, .curation-card').forEach(el => observer.observe(el));
}

function initDestinationDropdown() {
    const destField = document.getElementById('destinationFieldLarge');
    const destInput = document.getElementById('destinationInput');
    const destDropdown = document.getElementById('destinationDropdown');
    
    if (destField && destDropdown) {
        // Toggle Dropdown
        destField.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = destDropdown.classList.contains('active');
            closeAllPopups(); // Close others
            
            if (!isActive) {
                destDropdown.classList.add('active');
                destField.classList.add('active');
            }
        });

        // Handle Item Click
        document.querySelectorAll('.destination-item, .destination-item-text').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const val = item.dataset.value;
                if (destInput) destInput.value = val;
                closeAllPopups();
            });
        });
    }
}

/* ========== Amenity Filter Logic ========== */
function initAmenityFilter() {
    const amenityField = document.getElementById('amenityField');
    const amenityDropdown = document.getElementById('amenityDropdown');
    const amenitySummary = document.getElementById('amenitySummary');
    const checkboxes = document.querySelectorAll('.amenity-option input[type="checkbox"]');
    
    if (!amenityField || !amenityDropdown) return;

    // Toggle Dropdown
    amenityField.addEventListener('click', (e) => {
        if (e.target.closest('.amenity-dropdown')) return; // checkbox click
        e.stopPropagation();
        const isActive = amenityDropdown.classList.contains('active');
        closeAllPopups(); // Close others
        if (!isActive) {
            amenityDropdown.classList.add('active');
            amenityField.classList.add('active');
        }
    });

    // Handle Filter Change
    checkboxes.forEach(chk => {
        chk.addEventListener('change', () => {
            updateFilterState();
        });
    });

    function updateFilterState() {
        // 1. Update Summary Text
        const checked = Array.from(checkboxes).filter(c => c.checked);
        if (checked.length === 0) {
            amenitySummary.textContent = '주방, 세탁기 등';
            amenitySummary.style.color = '#94a3b8';
        } else {
            const labels = checked.map(c => c.nextElementSibling.textContent);
            amenitySummary.textContent = labels.join(', ');
            amenitySummary.style.color = 'var(--primary)';
        }

        // 2. Filter Hotel Cards
        const selectedValues = checked.map(c => c.value);
        filterCards(selectedValues);
    }

    function filterCards(amenities) {
        const cards = document.querySelectorAll('.hotel-card.long-stay');
        cards.forEach(card => {
            const cardAmenities = (card.dataset.amenity || '').split(',');
            // Check if card has ALL selected amenities
            const isMatch = amenities.every(val => cardAmenities.includes(val));
            
            if (isMatch) {
                card.style.display = 'flex';
                // Reset animation
                card.style.animation = 'none';
                card.offsetHeight; /* trigger reflow */
                card.style.animation = 'fadeInUp 0.6s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    }
}

/* ========== Mobile Search Interaction ========== */
function initMobileSearch() {
    const summaryView = document.getElementById('mobileSearchSummary');
    const searchWidget = document.querySelector('.search-widget-large');
    
    if (summaryView && searchWidget) {
        summaryView.addEventListener('click', () => {
            searchWidget.classList.toggle('expanded');
        });
    }
}

/* ========== Long Stay Calendar Logic (Keep Existing) ========== */
// ... (Calendar functions omitted for brevity in replace, but needed in full file)
// Since replace_file_content replaces a block, I must ensure I don't delete calendar logic if I target a range.
// But I am rewriting the file structure slightly.
// Wait, I should not overwrite initCalendar if I don't include it in replacement.
// The replace_file_content tool requires TargetContent to match EXACTLY.
// It is better to use the "EndLine" feature carefully or replace specific function blocks.
// However, the previous tool call showed initAmenityFilter at line 89.
// And closeAllPopups at line 388.
// I will replace from initHeader downwards to overwrite Filter and Utility functions, but preserve initCalendar if possible?
// Looking at the file, initCalendar is lines 100-176.
// I can replace initAmenityFilter block specifically.
// And append initMobileSearch at the end.
// And update closeAllPopups.

// Let's do partial replacements to be safe.

// 1. Replace initAmenityFilter
// 2. Add initMobileSearch at bottom
// 3. Update closeAllPopups


/* ========== Long Stay Calendar Logic ========== */
function initCalendar() {
    const calendarPopup = document.getElementById('calendarPopup');
    const checkInField = document.getElementById('checkInField');
    const checkOutField = document.getElementById('checkOutField');
    const dateFieldGroup = document.querySelector('.date-field-group');

    function toggleCalendar(event) {
        event.stopPropagation();
        const isActive = calendarPopup.classList.contains('active');
        closeAllPopups('calendarPopup');

        if (!isActive) {
            calendarPopup.classList.add('active');
            dateFieldGroup.classList.add('active');
            renderCalendar();
        } else {
            calendarPopup.classList.remove('active');
            dateFieldGroup.classList.remove('active');
        }
    }

    checkInField?.addEventListener('click', toggleCalendar);
    checkOutField?.addEventListener('click', toggleCalendar);
    calendarPopup?.addEventListener('click', (e) => e.stopPropagation());

    // Navigation
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

    // Actions
    document.getElementById('btn-clear')?.addEventListener('click', (e) => {
        e.stopPropagation();
        calendarState = { checkIn: null, checkOut: null, tempCheckIn: null, tempCheckOut: null };
        updateDateDisplay('checkIn', null);
        updateDateDisplay('checkOut', null);
        renderCalendar();
        updateWarning(null);
    });

    document.getElementById('btn-confirm')?.addEventListener('click', (e) => {
        e.stopPropagation();
        // Validation Check on Confirm
        if (calendarState.tempCheckIn && calendarState.tempCheckOut) {
            const days = (calendarState.tempCheckOut - calendarState.tempCheckIn) / ONE_DAY_MS;
            if (days < MIN_STAY_DAYS) {
                alert(`장기 체류 서비스는 최소 ${MIN_STAY_DAYS}박부터 예약 가능합니다.`);
                return;
            }
        }
        
        calendarState.checkIn = calendarState.tempCheckIn;
        calendarState.checkOut = calendarState.tempCheckOut;
        closeAllPopups();
        
        // 여기에 "패키지 요금 적용" 로직 시뮬레이션
        checkPackageRate();
    });

    document.addEventListener('click', (e) => {
        if (calendarPopup?.classList.contains('active') && !dateFieldGroup?.contains(e.target)) {
            calendarPopup.classList.remove('active');
            dateFieldGroup?.classList.remove('active');
        }
    });

    // Initial warning update
    updateWarning(null);
}

function updateWarning(message) {
    const warningEl = document.getElementById('stayWarning');
    if (!warningEl) return;
    
    if (message) {
        warningEl.textContent = message;
        warningEl.style.display = 'block';
    } else {
        warningEl.style.display = 'none';
    }
}

function checkPackageRate() {
    if (calendarState.checkIn && calendarState.checkOut) {
        const days = (calendarState.checkOut - calendarState.checkIn) / ONE_DAY_MS;
        if (days >= 28) {
            // 한 달 살기 패키지 적용 알림 (간단히 Alert 또는 UI 변경)
            // console.log("Monthly Package Rate Applied");
            // 실제 구현에서는 가격 정보를 업데이트하겠지만, 여기서는 데모용으로 Alert 대신
            // 검색 버튼 텍스트를 변경해보겠습니다.
            const searchBtn = document.getElementById('searchBtn');
            if(searchBtn) {
                searchBtn.innerHTML = `<span>한 달 살기 특가 검색 (${days}박)</span>`;
                searchBtn.style.background = 'linear-gradient(45deg, #FF5000, #FF8A00)';
            }
        }
    }
}

/* ========== Rendering Logic (Copied & Adapted) ========== */
function renderCalendar() {
    const container = document.getElementById('calendarMonths');
    if (!container) return;
    container.innerHTML = '';

    const leftDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const rightDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);

    [leftDate, rightDate].forEach(date => {
        const monthDiv = document.createElement('div');
        monthDiv.className = 'DayPicker-Month';
        
        const caption = document.createElement('div');
        caption.className = 'DayPicker-Caption';
        caption.textContent = `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
        monthDiv.appendChild(caption);

        const weekdays = document.createElement('div');
        weekdays.className = 'DayPicker-Weekdays';
        const daysRaw = ['월', '화', '수', '목', '금', '토', '일'];
        daysRaw.forEach(d => {
            const wd = document.createElement('div');
            wd.className = 'DayPicker-Weekday';
            wd.textContent = d;
            weekdays.appendChild(wd);
        });
        monthDiv.appendChild(weekdays);

        const body = document.createElement('div');
        body.className = 'DayPicker-Body';
        body.innerHTML = generateMonthDaysHTML(date);
        monthDiv.appendChild(body);

        container.appendChild(monthDiv);
    });

    attachDayListeners();
}

function generateMonthDaysHTML(dateObj) {
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const startOffset = firstDay === 0 ? 6 : firstDay - 1;
    const lastDate = new Date(year, month + 1, 0).getDate();
    const todayTs = new Date().setHours(0,0,0,0);
    let html = '';

    for(let i=0; i<startOffset; i++) {
        html += `<div class="DayPicker-Day DayPicker-Day--outside"></div>`;
    }

    for(let d=1; d<=lastDate; d++) {
        const currentTs = new Date(year, month, d).getTime();
        let classes = ['DayPicker-Day'];
        let ariaDisabled = 'false';

        if (currentTs < todayTs) {
            classes.push('DayPicker-Day--disabled');
            ariaDisabled = 'true';
        }

        const checkIn = calendarState.tempCheckIn || calendarState.checkIn;
        const checkOut = calendarState.tempCheckOut || calendarState.checkOut;

        if (checkIn && currentTs === checkIn) {
            classes.push('DayPicker-Day--selected', 'DayPicker-Day--checkIn');
            if (checkOut || hoverDate > checkIn) classes.push('DayPicker-Day--hasRange');
        }
        if (checkOut && currentTs === checkOut) {
            classes.push('DayPicker-Day--selected', 'DayPicker-Day--checkOut');
            if (checkIn) classes.push('DayPicker-Day--hasRange');
        }
        if (checkIn && checkOut && currentTs > checkIn && currentTs < checkOut) {
            classes.push('DayPicker-Day--inRange');
        }

        html += `<div class="${classes.join(' ')}" role="gridcell" 
                 data-timestamp="${currentTs}" data-day="${d}">${d}</div>`;
    }
    return html;
}

function attachDayListeners() {
    const days = document.querySelectorAll('.DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside)');
    days.forEach(day => {
        day.addEventListener('click', (e) => {
            e.stopPropagation();
            const ts = parseInt(day.dataset.timestamp);
            handleDateClick(ts);
        });
        day.addEventListener('mouseenter', () => {
             const ts = parseInt(day.dataset.timestamp);
             handleDateHover(ts);
        });
    });
}

function handleDateClick(timestamp) {
    if (!calendarState.tempCheckIn || (calendarState.tempCheckIn && calendarState.tempCheckOut)) {
        calendarState.tempCheckIn = timestamp;
        calendarState.tempCheckOut = null;
        updateWarning(null); // Reset warning
    } else {
        if (timestamp < calendarState.tempCheckIn) {
            calendarState.tempCheckIn = timestamp;
        } else if (timestamp === calendarState.tempCheckIn) {
            return;
        } else {
            calendarState.tempCheckOut = timestamp;
            
            // Check Warning immediately
            const diff = (timestamp - calendarState.tempCheckIn) / ONE_DAY_MS;
            if (diff < MIN_STAY_DAYS) {
                updateWarning(`* 최소 ${MIN_STAY_DAYS}박 이상 선택해야 합니다 (현재 ${diff}박)`);
                // 선택은 허용하되 경고 표시 (Confirm 시 막음)
            } else {
                updateWarning(null);
                if (diff >= 28) {
                    updateWarning(`* 한 달 살기 패키지 요금이 적용됩니다 (${diff}박)`);
                     document.getElementById('stayWarning').style.color = 'var(--primary)'; // Positive Color
                }
            }
        }
    }
    
    // Update UI
    updateDateDisplay('checkIn', calendarState.tempCheckIn ? new Date(calendarState.tempCheckIn) : null);
    updateDateDisplay('checkOut', calendarState.tempCheckOut ? new Date(calendarState.tempCheckOut) : null);
    renderCalendar();
}

function handleDateHover(timestamp) {
    if (calendarState.tempCheckIn && !calendarState.tempCheckOut) {
        hoverDate = timestamp;
        updateHoverStyles();
    }
}

function updateHoverStyles() {
    const days = document.querySelectorAll('.DayPicker-Day:not(.DayPicker-Day--outside):not(.DayPicker-Day--disabled)');
    const start = calendarState.tempCheckIn;
    const currentHover = hoverDate;

    days.forEach(dayEl => {
        dayEl.classList.remove('DayPicker-Day--inRange', 'DayPicker-Day--previewEnd', 'DayPicker-Day--hasRange');
        if (dayEl.classList.contains('DayPicker-Day--checkIn')) dayEl.classList.add('DayPicker-Day--hasRange');

        const dayTs = parseInt(dayEl.dataset.timestamp);
        if (start && currentHover && dayTs > start && dayTs <= currentHover) {
             if (dayTs < currentHover) dayEl.classList.add('DayPicker-Day--inRange');
             else if (dayTs === currentHover) dayEl.classList.add('DayPicker-Day--previewEnd');
        }
    });
}

function updateDateDisplay(type, dateObj) {
    const displayId = type === 'checkIn' ? 'checkInDisplay' : 'checkOutDisplay';
    const dayId = type === 'checkIn' ? 'checkInDay' : 'checkOutDay';
    const dayNames = ['일', '월', '화', '수', '목', '금', '토']; 
    
    const elDisplay = document.getElementById(displayId);
    const elDay = document.getElementById(dayId);
    
    if (!elDisplay || !elDay) return;

    if (!dateObj) {
        elDisplay.textContent = '날짜 선택';
        elDay.textContent = type === 'checkIn' ? '체크인' : '체크아웃';
        return;
    }

    const y = dateObj.getFullYear();
    const m = String(dateObj.getMonth() + 1).padStart(2, '0');
    const d = String(dateObj.getDate()).padStart(2, '0');
    
    elDisplay.textContent = `${y}-${m}-${d}`;
    elDay.textContent = dayNames[dateObj.getDay()];
}

function closeAllPopups(exceptId) {
    const popups = ['calendarPopup', 'amenityDropdown', 'destinationDropdown']; // Add others if needed
    popups.forEach(id => {
        if (id !== exceptId) {
            const p = document.getElementById(id);
            if(p) p.classList.remove('active');
        }
    });

    // Remove active state from trigger fields if nothing is open
    if (!exceptId) {
        document.querySelectorAll('.date-field-group').forEach(f => f.classList.remove('active'));
        document.getElementById('amenityField')?.classList.remove('active');
        document.getElementById('destinationFieldLarge')?.classList.remove('active');
    } else {
        // Close others' triggers when opening one
        if (exceptId !== 'calendarPopup') document.querySelectorAll('.date-field-group').forEach(f => f.classList.remove('active'));
        if (exceptId !== 'amenityDropdown') document.getElementById('amenityField')?.classList.remove('active');
        if (exceptId !== 'destinationDropdown') document.getElementById('destinationFieldLarge')?.classList.remove('active');
    }
}
