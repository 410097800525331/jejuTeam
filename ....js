/**
 * JEJU STAY - Interactive Features
 * 검색 위젯, 캘린더, 인원 선택 등 인터랙션 로직
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Initialize all components
    initHeader();
    initSearchTabs();
    initDestinationDropdown();
    initCalendar();
    initGuestSelector();
    initWishlist();
    initMobileMenu();
    initScrollAnimations();
});

/**
 * Header scroll effect
 */
function initHeader() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * Search tabs switching
 */
function initSearchTabs() {
    const tabs = document.querySelectorAll('.search-tab-large');
    const hotelForm = document.getElementById('searchFormHotel');
    const activityForm = document.getElementById('searchFormActivity');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
            
            const tabType = tab.dataset.tab;
            
            if (tabType === 'activity') {
                hotelForm.classList.add('hidden');
                activityForm.classList.remove('hidden');
            } else {
                hotelForm.classList.remove('hidden');
                activityForm.classList.add('hidden');
            }
            
            // Close all popups
            closeAllPopups();
        });
    });
}

/**
 * Destination dropdown
 */
function initDestinationDropdown() {
    // Hotel form destination
    const destinationField = document.getElementById('destinationFieldLarge');
    const destinationInput = document.getElementById('destinationInput');
    const destinationDropdown = document.getElementById('destinationDropdown');
    
    // Activity form destination
    const destinationFieldActivity = document.getElementById('destinationFieldActivity');
    const destinationInputActivity = document.getElementById('destinationInputActivity');
    const destinationDropdownActivity = document.getElementById('destinationDropdownActivity');
    
    // Setup for hotel form
    if (destinationField && destinationDropdown) {
        setupDestinationField(destinationField, destinationInput, destinationDropdown);
    }
    
    // Setup for activity form
    if (destinationFieldActivity && destinationDropdownActivity) {
        setupDestinationField(destinationFieldActivity, destinationInputActivity, destinationDropdownActivity);
    }
}

function setupDestinationField(field, input, dropdown) {
    // Show dropdown on focus
    input.addEventListener('focus', () => {
        closeAllPopups();
        dropdown.classList.add('active');
        field.classList.add('active');
    });
    
    // Handle destination item click
    const items = dropdown.querySelectorAll('.destination-item, .destination-item-text');
    items.forEach(item => {
        item.addEventListener('click', () => {
            const value = item.dataset.value;
            input.value = value;
            dropdown.classList.remove('active');
            field.classList.remove('active');
        });
    });
    
    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!field.contains(e.target)) {
            dropdown.classList.remove('active');
            field.classList.remove('active');
        }
    });
}

/**
 * Calendar functionality
 */
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let checkInDate = new Date();
let checkOutDate = new Date();
checkOutDate.setDate(checkOutDate.getDate() + 1);

let isSelectingCheckOut = false;

function initCalendar() {
    const checkInField = document.getElementById('checkInField');
    const checkOutField = document.getElementById('checkOutField');
    const calendarPopup = document.getElementById('calendarPopup');
    const calendarTabs = document.querySelectorAll('.calendar-tab');
    const calendarView = document.getElementById('calendarView');
    const flexibleView = document.getElementById('flexibleView');
    
    // Update initial display
    updateDateDisplay();
    
    // Show calendar on check-in/check-out field click
    if (checkInField) {
        checkInField.addEventListener('click', (e) => {
            e.stopPropagation();
            closeAllPopups();
            isSelectingCheckOut = false;
            calendarPopup.classList.add('active');
            checkInField.classList.add('active');
            renderCalendars();
        });
    }
    
    if (checkOutField) {
        checkOutField.addEventListener('click', (e) => {
            e.stopPropagation();
            closeAllPopups();
            isSelectingCheckOut = true;
            calendarPopup.classList.add('active');
            checkOutField.classList.add('active');
            renderCalendars();
        });
    }
    
    // Calendar tabs
    calendarTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            calendarTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            if (tab.dataset.calendarTab === 'calendar') {
                calendarView.classList.remove('hidden');
                flexibleView.classList.add('hidden');
            } else {
                calendarView.classList.add('hidden');
                flexibleView.classList.remove('hidden');
                initFlexibleView();
            }
        });
    });
    
    // Navigation buttons
    const prevMonth = document.getElementById('prevMonth');
    const nextMonth = document.getElementById('nextMonth');
    
    if (prevMonth) {
        prevMonth.addEventListener('click', () => {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            renderCalendars();
        });
    }
    
    if (nextMonth) {
        nextMonth.addEventListener('click', () => {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            renderCalendars();
        });
    }
    
    // Close on outside click
    document.addEventListener('click', (e) => {
        if (calendarPopup && !calendarPopup.contains(e.target) && 
            checkInField && !checkInField.contains(e.target) && 
            checkOutField && !checkOutField.contains(e.target)) {
            calendarPopup.classList.remove('active');
            if (checkInField) checkInField.classList.remove('active');
            if (checkOutField) checkOutField.classList.remove('active');
        }
    });
    
    // Initial render
    renderCalendars();
}

function renderCalendars() {
    const leftDays = document.getElementById('leftCalendarDays');
    const rightDays = document.getElementById('rightCalendarDays');
    const leftTitle = document.getElementById('leftMonthTitle');
    const rightTitle = document.getElementById('rightMonthTitle');
    
    if (!leftDays || !rightDays) return;
    
    // Left calendar (current month)
    leftTitle.textContent = `${currentYear}년 ${currentMonth + 1}월`;
    leftDays.innerHTML = generateCalendarDays(currentYear, currentMonth);
    
    // Right calendar (next month)
    let nextMonth = currentMonth + 1;
    let nextYear = currentYear;
    if (nextMonth > 11) {
        nextMonth = 0;
        nextYear++;
    }
    rightTitle.textContent = `${nextYear}년 ${nextMonth + 1}월`;
    rightDays.innerHTML = generateCalendarDays(nextYear, nextMonth);
    
    // Add click events to days
    document.querySelectorAll('.calendar-day:not(.disabled):not(.other-month)').forEach(day => {
        day.addEventListener('click', () => {
            const date = new Date(day.dataset.date);
            handleDateSelection(date);
        });
    });
    
    // Reinitialize icons
    lucide.createIcons();
}

function generateCalendarDays(year, month) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = firstDay.getDay() || 7; // Convert Sunday (0) to 7
    const daysInMonth = lastDay.getDate();
    
    let html = '';
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Previous month days
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const prevMonthDays = new Date(prevYear, prevMonth + 1, 0).getDate();
    
    for (let i = startDay - 1; i > 0; i--) {
        html += `<div class="calendar-day other-month">${prevMonthDays - i + 1}</div>`;
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        date.setHours(0, 0, 0, 0);
        
        let classes = ['calendar-day'];
        
        // Check if past date
        if (date < today) {
            classes.push('disabled');
        }
        
        // Check if today
        if (date.getTime() === today.getTime()) {
            classes.push('today');
        }
        
        // Check if selected
        if (checkInDate && date.getTime() === checkInDate.getTime()) {
            classes.push('selected', 'range-start');
        }
        if (checkOutDate && date.getTime() === checkOutDate.getTime()) {
            classes.push('selected', 'range-end');
        }
        
        // Check if in range
        if (checkInDate && checkOutDate && date > checkInDate && date < checkOutDate) {
            classes.push('in-range');
        }
        
        html += `<div class="${classes.join(' ')}" data-date="${date.toISOString()}">${day}</div>`;
    }
    
    // Next month days
    const totalCells = Math.ceil((startDay - 1 + daysInMonth) / 7) * 7;
    const remainingCells = totalCells - (startDay - 1 + daysInMonth);
    
    for (let i = 1; i <= remainingCells; i++) {
        html += `<div class="calendar-day other-month">${i}</div>`;
    }
    
    return html;
}

function handleDateSelection(date) {
    if (!isSelectingCheckOut || date < checkInDate) {
        // Selecting check-in date
        checkInDate = date;
        checkOutDate = new Date(date);
        checkOutDate.setDate(checkOutDate.getDate() + 1);
        isSelectingCheckOut = true;
    } else {
        // Selecting check-out date
        checkOutDate = date;
        isSelectingCheckOut = false;
        
        // Close popup after selecting both dates
        const calendarPopup = document.getElementById('calendarPopup');
        const checkInField = document.getElementById('checkInField');
        const checkOutField = document.getElementById('checkOutField');
        
        setTimeout(() => {
            calendarPopup.classList.remove('active');
            if (checkInField) checkInField.classList.remove('active');
            if (checkOutField) checkOutField.classList.remove('active');
        }, 300);
    }
    
    updateDateDisplay();
    renderCalendars();
}

function updateDateDisplay() {
    const checkInDisplay = document.getElementById('checkInDisplay');
    const checkInDay = document.getElementById('checkInDay');
    const checkOutDisplay = document.getElementById('checkOutDisplay');
    const checkOutDay = document.getElementById('checkOutDay');
    
    const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    
    if (checkInDisplay && checkInDate) {
        checkInDisplay.textContent = formatDate(checkInDate);
        checkInDay.textContent = days[checkInDate.getDay()];
    }
    
    if (checkOutDisplay && checkOutDate) {
        checkOutDisplay.textContent = formatDate(checkOutDate);
        checkOutDay.textContent = days[checkOutDate.getDay()];
    }
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`;
}

/**
 * Flexible date view
 */
function initFlexibleView() {
    const monthOptions = document.getElementById('monthOptions');
    const durationBtns = document.querySelectorAll('.duration-btn');
    const prevBtn = document.getElementById('prevMonthSelector');
    const nextBtn = document.getElementById('nextMonthSelector');
    const resetBtn = document.querySelector('.flexible-reset');
    const confirmBtn = document.querySelector('.flexible-confirm');
    
    let startMonthOffset = 0;
    let selectedDuration = 7;
    let selectedMonths = [];
    
    // Duration buttons
    durationBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            durationBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedDuration = parseInt(btn.dataset.duration);
        });
    });
    
    // Render months
    function renderMonths() {
        if (!monthOptions) return;
        
        const today = new Date();
        let html = '';
        
        for (let i = 0; i < 6; i++) {
            const monthDate = new Date(today.getFullYear(), today.getMonth() + startMonthOffset + i, 1);
            const monthNum = monthDate.getMonth() + 1;
            const year = monthDate.getFullYear();
            const isSelected = selectedMonths.some(m => m.month === monthNum && m.year === year);
            
            html += `
                <div class="month-option ${isSelected ? 'selected' : ''}" data-month="${monthNum}" data-year="${year}">
                    <i data-lucide="calendar"></i>
                    <span class="month-name">${monthNum}월</span>
                    <span class="month-year">${year}</span>
                </div>
            `;
        }
        
        monthOptions.innerHTML = html;
        lucide.createIcons();
        
        // Add click events
        document.querySelectorAll('.month-option').forEach(option => {
            option.addEventListener('click', () => {
                const month = parseInt(option.dataset.month);
                const year = parseInt(option.dataset.year);
                
                const index = selectedMonths.findIndex(m => m.month === month && m.year === year);
                if (index > -1) {
                    selectedMonths.splice(index, 1);
                    option.classList.remove('selected');
                } else {
                    selectedMonths.push({ month, year });
                    option.classList.add('selected');
                }
            });
        });
    }
    
    // Navigation
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (startMonthOffset > 0) {
                startMonthOffset--;
                renderMonths();
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            startMonthOffset++;
            renderMonths();
        });
    }
    
    // Reset
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            selectedMonths = [];
            renderMonths();
        });
    }
    
    // Confirm
    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
            const calendarPopup = document.getElementById('calendarPopup');
            calendarPopup.classList.remove('active');
        });
    }
    
    renderMonths();
}

/**
 * Guest selector
 */
let guestCounts = {
    rooms: 1,
    adults: 2,
    children: 0
};

function initGuestSelector() {
    const guestField = document.getElementById('guestFieldLarge');
    const guestPopup = document.getElementById('guestPopupLarge');
    
    if (!guestField || !guestPopup) return;
    
    // Toggle popup
    guestField.addEventListener('click', (e) => {
        e.stopPropagation();
        closeAllPopups();
        guestPopup.classList.add('active');
        guestField.classList.add('active');
    });
    
    // Counter buttons
    const counterBtns = guestPopup.querySelectorAll('.counter-btn-new');
    counterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const target = btn.dataset.target;
            const isPlus = btn.classList.contains('plus');
            
            if (isPlus) {
                guestCounts[target]++;
            } else {
                // Minimum values: rooms=1, adults=1, children=0
                const minValue = target === 'children' ? 0 : 1;
                if (guestCounts[target] > minValue) {
                    guestCounts[target]--;
                }
            }
            
            updateGuestDisplay();
            updateCounterButtons();
        });
    });
    
    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!guestField.contains(e.target) && !guestPopup.contains(e.target)) {
            guestPopup.classList.remove('active');
            guestField.classList.remove('active');
        }
    });
    
    updateGuestDisplay();
    updateCounterButtons();
}

function updateGuestDisplay() {
    const guestSummary = document.getElementById('guestSummary');
    const roomSummary = document.getElementById('roomSummary');
    const roomsCount = document.getElementById('roomsCountLarge');
    const adultsCount = document.getElementById('adultsCountLarge');
    const childrenCount = document.getElementById('childrenCountLarge');
    
    if (guestSummary) {
        let text = `성인 ${guestCounts.adults}명`;
        if (guestCounts.children > 0) {
            text += `, 아동 ${guestCounts.children}명`;
        }
        guestSummary.textContent = text;
    }
    
    if (roomSummary) {
        roomSummary.textContent = `객실 ${guestCounts.rooms}개`;
    }
    
    if (roomsCount) roomsCount.textContent = guestCounts.rooms;
    if (adultsCount) adultsCount.textContent = guestCounts.adults;
    if (childrenCount) childrenCount.textContent = guestCounts.children;
}

function updateCounterButtons() {
    const guestPopup = document.getElementById('guestPopupLarge');
    if (!guestPopup) return;
    
    const minusBtns = guestPopup.querySelectorAll('.counter-btn-new.minus');
    minusBtns.forEach(btn => {
        const target = btn.dataset.target;
        const minValue = target === 'children' ? 0 : 1;
        btn.disabled = guestCounts[target] <= minValue;
    });
}

/**
 * Close all popups
 */
function closeAllPopups() {
    // Close destination dropdowns
    document.querySelectorAll('.destination-dropdown').forEach(d => d.classList.remove('active'));
    document.querySelectorAll('.destination-field-new').forEach(f => f.classList.remove('active'));
    
    // Close calendar popup
    const calendarPopup = document.getElementById('calendarPopup');
    if (calendarPopup) calendarPopup.classList.remove('active');
    
    // Close guest popup
    const guestPopup = document.getElementById('guestPopupLarge');
    if (guestPopup) guestPopup.classList.remove('active');
    
    // Remove active states from fields
    document.querySelectorAll('.search-field-new').forEach(f => f.classList.remove('active'));
}

/**
 * Wishlist functionality
 */
function initWishlist() {
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');
    
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            btn.classList.toggle('active');
        });
    });
}

/**
 * Mobile menu
 */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    
    if (menuBtn && mobileNav) {
        menuBtn.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
        });
    }
}

/**
 * Scroll animations
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
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
    document.querySelectorAll('.promo-card, .destination-card, .hotel-card').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}
