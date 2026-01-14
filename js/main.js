/* ==================== 풀페이지 스크롤 제어 (최적화됨) ==================== */
let currentSectionIndex = 0;
let isScrolling = false;
let wheelTimeout;
let lastWheelTime = 0;

// DOM 요소 캐싱
const sections = document.querySelectorAll('.section');
const header = document.querySelector('.header');
const topBtn = document.getElementById('topBtn');
const footer = document.querySelector('footer');

const wheelDelay = 50; // 휠 디바운스 시간 조정
const scrollDuration = 1000; // 스크롤 애니메이션 시간

/* ==================== 스크롤 함수 ==================== */
function scrollToSection(index) {
    if (index < 0) index = 0;
    if (index >= sections.length) index = sections.length - 1;
    
    // 이미 해당 섹션이거나 스크롤 중이면 무시 (단, 강제 이동이 필요할 수 있으므로 상황에 따라 조정)
    if (isScrolling) return;

    currentSectionIndex = index;
    isScrolling = true;

    const targetSection = sections[currentSectionIndex];
    const targetPosition = targetSection.offsetTop;

    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });

    // 헤더 및 버튼 상태 업데이트 (즉시 반영)
    updateHeaderAndButtons();

    setTimeout(() => {
        isScrolling = false;
    }, scrollDuration);
}

/* ==================== IntersectionObserver (현재 섹션 감지) ==================== */
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5 // 50% 이상 보일 때 활성화
};

const observer = new IntersectionObserver((entries) => {
    // 자동 스크롤 중일 때는 옵저버에 의한 인덱스 변경을 막아 튀는 현상 방지
    if (isScrolling) return;

    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // 현재 보이는 섹션의 인덱스 찾기
            const index = Array.from(sections).indexOf(entry.target);
            if (index !== -1) {
                currentSectionIndex = index;
                updateHeaderAndButtons();
            }
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

/* ==================== 헤더 및 UI 업데이트 함수 ==================== */
function updateHeaderAndButtons() {
    // 섹션 1(인덱스 0)일 때와 아닐 때 헤더 스타일 구분
    if (currentSectionIndex === 0) {
        header.classList.remove('transparent');
        header.classList.add('section1-header');
        header.classList.remove('section2plus-header');
        
        // 탑 버튼 숨김
        if (topBtn) topBtn.classList.remove('show');
    } else {
        header.classList.add('transparent');
        header.classList.remove('section1-header');
        header.classList.add('section2plus-header');
        
        // 탑 버튼 표시
        if (topBtn) topBtn.classList.add('show');
    }
}

/* ==================== 마우스 휠 이벤트 ==================== */
/* ==================== 마우스 휠 이벤트 (섹션이 2개 이상일 때만 활성화) ==================== */
if (sections.length > 1) {
    document.addEventListener('wheel', (e) => {
        // 기본 스크롤 동작 방지 (완전한 풀페이지 느낌을 위해)
        e.preventDefault();

        const now = Date.now();
        if (now - lastWheelTime < wheelDelay) return;
        lastWheelTime = now;

        clearTimeout(wheelTimeout);
        wheelTimeout = setTimeout(() => {
            if (e.deltaY > 0) {
                // 아래로 스크롤
                scrollToSection(currentSectionIndex + 1);
            } else {
                // 위로 스크롤
                scrollToSection(currentSectionIndex - 1);
            }
        }, wheelDelay);
    }, { passive: false });

    /* ==================== 키보드 이벤트 제어 ==================== */
    document.addEventListener('keydown', (e) => {
        const scrollKeys = ['ArrowUp', 'ArrowDown', ' ', 'PageUp', 'PageDown', 'Home', 'End'];
        
        // 스크롤 중이거나 스크롤 키가 아니면 무시
        if (!scrollKeys.includes(e.key)) return;
        
        e.preventDefault(); // 기본 동작 방지

        if (isScrolling) return;

        if (e.key === 'ArrowDown' || e.key === ' ' || e.key === 'PageDown') {
            scrollToSection(currentSectionIndex + 1);
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            scrollToSection(currentSectionIndex - 1);
        } else if (e.key === 'Home') {
            scrollToSection(0);
        } else if (e.key === 'End') {
            scrollToSection(sections.length - 1);
        }
    }, { passive: false });
}


/* ==================== 탑 버튼 기능 ==================== */
if (topBtn) {
    topBtn.addEventListener('click', () => {
        scrollToSection(0);
    });
}

/* ==================== 네비게이션 링크 클릭 ==================== */
document.querySelectorAll('.gnb-link').forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('href');
        const targetSection = document.querySelector(sectionId);
        if (targetSection) {
            const sectionIndex = Array.from(sections).indexOf(targetSection);
            scrollToSection(sectionIndex);
        }
    });
});

/* ==================== 페이지 로드 시 초기화 ==================== */
window.addEventListener('load', () => {
    const hash = window.location.hash;
    if (hash) {
        const targetSection = document.querySelector(hash);
        if (targetSection) {
            const index = Array.from(sections).indexOf(targetSection);
            if (index !== -1) {
                // 약간의 지연 후 이동하여 정확도 높임
                setTimeout(() => {
                   scrollToSection(index);
                }, 100);
                return;
            }
        }
    }
    // 해시가 없으면 0번으로 초기화 (풀페이지 모드일 때만)
    if (sections.length > 1) {
        setTimeout(() => {
            updateHeaderAndButtons();
            window.scrollTo(0, 0);
        }, 10);
    }
});

// ==================== ✨ 언어 토글 기능 (오류 수정 완료) ✨ =================
// =======================================================================

const changeLanguage = (lang) => {
    // 텍스트 콘텐츠 업데이트
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.dataset.lang;
        if (langData[lang] && langData[lang][key] !== undefined) {
             // HTML 태그 포함 여부에 따라 처리
             if (el.innerHTML.includes('<') && el.innerHTML.includes('>')) {
                // 기존 HTML 구조 유지하면서 텍스트만 바꿀 수 없으므로, 
                // data-lang을 사용하는 요소는 텍스트만 있는 것을 권장하거나, 
                // 특정 태그(strong 등)가 포함된 html 문자열을 langData에 정의해야 함.
                el.innerHTML = langData[lang][key];
             } else {
                el.textContent = langData[lang][key];
             }
        }
    });

    // Placeholder 업데이트
    document.querySelectorAll('[data-lang-placeholder]').forEach(el => {
        const key = el.dataset.langPlaceholder;
        if (langData[lang] && langData[lang][key] !== undefined) {
            el.placeholder = langData[lang][key];
        }
    });

    document.documentElement.lang = lang;
};

const langToggleButton = document.querySelector('.lang-toggle');
// 기본 언어 설정 (localStorage 또는 기본값)
let currentLang = localStorage.getItem('jeju_lang') || 'ko';

if (langToggleButton) {
    langToggleButton.addEventListener('click', () => {
        currentLang = (currentLang === 'ko') ? 'en' : 'ko';
        // 버튼 텍스트 업데이트
        langToggleButton.textContent = (currentLang === 'ko') ? 'English' : '한국어';
        localStorage.setItem('jeju_lang', currentLang);
        changeLanguage(currentLang);
        
        // FAB 등 다른 컴포넌트에도 알림
        document.dispatchEvent(new CustomEvent('languageChanged', { detail: currentLang }));
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // 버튼 초기 텍스트 설정
    if (langToggleButton) {
        langToggleButton.textContent = (currentLang === 'ko') ? 'English' : '한국어';
    }
    changeLanguage(currentLang);
});

/* ==================== 비디오 전환 로직 ==================== */
document.addEventListener('DOMContentLoaded', () => {
    // 호텔 페이지로 이동하는 모든 링크 선택 (버튼 포함)
    const hotelLinks = document.querySelectorAll('a[href="sub/jejuhotel.html"]');
    const videoOverlay = document.getElementById('video-overlay');
    const transitionVideo = document.getElementById('transition-video');

    if (hotelLinks.length > 0 && videoOverlay && transitionVideo) {
        hotelLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault(); // 기본 이동 동작 방지

                // 오버레이 표시
                videoOverlay.classList.add('active');
                
                // 비디오 속성 설정 (자동 재생 정책 대응)
                transitionVideo.muted = true;
                transitionVideo.playsInline = true;
                transitionVideo.currentTime = 0;

                // 비디오 재생 시도
                const playPromise = transitionVideo.play();

                let navigationTriggered = false;
                const triggerNavigation = () => {
                    if (!navigationTriggered) {
                        navigationTriggered = true;
                        window.location.href = 'sub/jejuhotel.html';
                    }
                };

                if (playPromise !== undefined) {
                    playPromise.then(_ => {
                        // 자동 재생 성공
                        console.log("비디오 재생 시작");
                        
                        // 4초 후 강제 이동
                        setTimeout(() => {
                            console.log("4초 경과: 페이지 이동");
                            triggerNavigation();
                        }, 4000);
                    })
                    .catch(error => {
                        console.error("비디오 재생 실패:", error);
                        // 재생 실패 시 즉시 이동
                        triggerNavigation();
                    });
                }

                // 비디오가 4초보다 짧을 경우 종료 시 이동
                transitionVideo.onended = () => {
                    triggerNavigation();
                };

                // 만약 비디오가 너무 오래(5초) 끝나지 않으면 강제 이동 (안전 장치 - 4초 로직 실패 시 대비)
                setTimeout(() => {
                    if (videoOverlay.classList.contains('active')) {
                        triggerNavigation();
                    }
                }, 5000); 
            });
        });
    }
});