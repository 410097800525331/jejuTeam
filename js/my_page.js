
$(document).ready(function () {
  // ===== 1. 메인 탭 전환 =====
  $('.tab-nav-btn').on('click', function () {
    const tabId = $(this).data('tab');

    $('.tab-nav-btn').removeClass('active');
    $('.tab-pane').removeClass('active');

    $(this).addClass('active');
    $('#' + tabId).addClass('active');
  });

  // ===== 2. 서비스 탭 전환 (예약) =====
  $('.service-tab-btn').on('click', function () {
    const service = $(this).data('service');

    $('.service-tab-btn').removeClass('active');
    $('.reservation-group').removeClass('active');

    $(this).addClass('active');

    if (service === 'all') {
      $('.reservation-group').addClass('active');
    } else {
      $('.reservation-group[data-service="' + service + '"]').addClass('active');
    }
  });

  // ===== 3. 쿠폰 탭 전환 =====
  $('.coupon-tab-btn').on('click', function () {
    const couponTab = $(this).data('coupon-tab');

    $('.coupon-tab-btn').removeClass('active');
    $(this).addClass('active');

    if (couponTab === 'all') {
      $('.coupon-item').show();
    } else {
      $('.coupon-item').hide();
      $('.coupon-item.' + couponTab).show();
    }
  });

  // ===== 4. 상세보기 모달 =====
  const modal = $('#detailModal');
  const closeBtn = $('.modal-close');

  $(document).on('click', '.btn-detail', function () {
    const $bookingCard = $(this).closest('.booking-card');
    const title = $bookingCard.find('.booking-title h4').text();
    const details = $bookingCard.find('.booking-details').html();

    let modalContent = `
            <h3>${title}</h3>
            <hr style="margin: 15px 0; border: none; border-top: 1px solid #e8e8e8;">
            <div style="margin: 20px 0;">
                ${details}
            </div>
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e8e8e8; display: flex; gap: 10px;">
                <button class="btn-detail" style="flex: 1;">수정</button>
                <button class="btn-cancel" style="flex: 1;">취소</button>
            </div>
        `;

    $('#modalBody').html(modalContent);
    modal.fadeIn(300);
  });

  closeBtn.on('click', function () {
    modal.fadeOut(300);
  });

  $(window).on('click', function (event) {
    if (event.target === modal[0]) {
      modal.fadeOut(300);
    }
  });

  // ===== 5. 예약 취소 =====
  $(document).on('click', '.btn-cancel', function () {
    const $bookingCard = $(this).closest('.booking-card');
    const title = $bookingCard.find('.booking-title h4').text();

    if (confirm(`"${title}" 예약을 취소하시겠습니까?`)) {
      $bookingCard.fadeOut(300, function () {
        $(this).remove();
        showNotification('예약이 취소되었습니다.', 'success');
      });
    }
  });

  // ===== 6. 쿠폰 사용 =====
  $(document).on('click', '.btn-use-coupon', function () {
    const couponName = $(this).closest('.coupon-item').find('h4').text();
    showNotification(`"${couponName}"을(를) 사용했습니다.`, 'success');
  });

  // ===== 7. 리뷰 작성 =====
  $(document).on('click', '.btn-review', function () {
    showNotification('리뷰 작성 페이지로 이동합니다.', 'info');
  });

  // ===== 8. 다시 예약 =====
  $(document).on('click', '.btn-rebook', function () {
    showNotification('예약 페이지로 이동합니다.', 'info');
  });

  // ===== 9. 위시리스트 삭제 =====
  $(document).on('click', '.btn-remove', function () {
    const itemName = $(this).closest('.wishlist-item').find('p').text();
    if (confirm(`"${itemName}"을(를) 위시리스트에서 제거하시겠습니까?`)) {
      $(this).closest('.wishlist-item').fadeOut(300, function () {
        $(this).remove();
        showNotification('위시리스트에서 제거되었습니다.', 'success');
      });
    }
  });

  // ===== 10. 고객센터 버튼 =====
  $('.btn-support').on('click', function () {
    const supportType = $(this).closest('.support-card').find('h4').text();
    showNotification(`${supportType} 페이지로 이동합니다.`, 'info');
  });

  // ===== 11. 기본 정보 저장 =====
  $('.settings-card').eq(0).find('.btn-save').on('click', function () {
    const email = $('.settings-card').eq(0).find('input:eq(1)').val();
    const phone = $('.settings-card').eq(0).find('input:eq(2)').val();
    const birthDate = $('.settings-card').eq(0).find('input:eq(3)').val();

    if (!email || !phone || !birthDate) {
      showNotification('모든 필드를 입력해주세요.', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showNotification('유효한 이메일을 입력해주세요.', 'error');
      return;
    }

    if (!isValidPhone(phone)) {
      showNotification('유효한 휴대폰 번호를 입력해주세요.', 'error');
      return;
    }

    saveUserProfile({ email, phone, birthDate });
    showNotification('기본 정보가 저장되었습니다.', 'success');
  });

  // ===== 12. 비밀번호 변경 =====
  $('.settings-card').eq(1).find('.btn-save').on('click', function () {
    const currentPassword = $('.settings-card').eq(1).find('input:eq(0)').val();
    const newPassword = $('.settings-card').eq(1).find('input:eq(1)').val();
    const confirmPassword = $('.settings-card').eq(1).find('input:eq(2)').val();

    if (!currentPassword || !newPassword || !confirmPassword) {
      showNotification('모든 필드를 입력해주세요.', 'error');
      return;
    }

    if (newPassword !== confirmPassword) {
      showNotification('새 비밀번호가 일치하지 않습니다.', 'error');
      return;
    }

    if (newPassword.length < 8) {
      showNotification('비밀번호는 최소 8자 이상이어야 합니다.', 'error');
      return;
    }

    showNotification('비밀번호가 변경되었습니다.', 'success');
    $('.settings-card').eq(1).find('input').val('');
  });

  // ===== 13. 알림 설정 저장 =====
  $('.settings-card').eq(2).find('.btn-save').on('click', function () {
    const emailNotif = $('.toggle-switch input:eq(0)').is(':checked');
    const smsNotif = $('.toggle-switch input:eq(1)').is(':checked');
    const marketingNotif = $('.toggle-switch input:eq(2)').is(':checked');

    saveNotificationSettings({
      email: emailNotif,
      sms: smsNotif,
      marketing: marketingNotif
    });

    showNotification('알림 설정이 저장되었습니다.', 'success');
  });

  // ===== 14. 계정 탈퇴 =====
  $(document).on('click', '.btn-danger', function () {
    if (confirm('정말로 계정을 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      if (confirm('계정 탈퇴를 한번 더 확인합니다. 계속 진행하시겠습니까?')) {
        showNotification('계정이 탈퇴되었습니다.', 'success');
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      }
    }
  });

  // ===== 15. 개인정보 다운로드 및 로그인 기록 =====
  $(document).on('click', '.btn-secondary', function () {
    const buttonText = $(this).text();
    if (buttonText === '다운로드') {
      showNotification('개인정보가 다운로드되었습니다.', 'success');
    } else if (buttonText === '조회') {
      showNotification('로그인 기록 페이지로 이동합니다.', 'info');
    }
  });

  // ===== 16. 약관 링크 =====
  $(document).on('click', '.terms-link', function (e) {
    e.preventDefault();
    const linkText = $(this).text();
    showNotification(`"${linkText}" 페이지로 이동합니다.`, 'info');
  });

  // ===== 17. 로그아웃 =====
  $('.logout-btn').on('click', function () {
    if (confirm('로그아웃 하시겠습니까?')) {
      showNotification('로그아웃 되었습니다.', 'success');
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    }
  });

  // 페이지 로드 시 초기화
  initializePage();
});

// ===== 유틸리티 함수 =====

/**
 * 알림 표시 함수
 */
function showNotification(message, type = 'info') {
  const bgColor = type === 'success' ? '#ff5000' : type === 'error' ? '#d32f2f' : '#667eea';

  const notification = $(`
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 24px;
            background-color: ${bgColor};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            animation: slideIn 0.3s ease;
            font-size: 14px;
            font-weight: 500;
            max-width: 400px;
        ">
            ${message}
        </div>
        <style>
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        </style>
    `);

  $('body').append(notification);

  setTimeout(() => {
    notification.fadeOut(300, function () {
      $(this).remove();
    });
  }, 3000);
}

/**
 * 이메일 유효성 검사
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 휴대폰 번호 유효성 검사
 */
function isValidPhone(phone) {
  const phoneRegex = /^01[0-9]-\d{3,4}-\d{4}$/;
  return phoneRegex.test(phone);
}

/**
 * 사용자 프로필 저장
 */
function saveUserProfile(profile) {
  localStorage.setItem('userProfile', JSON.stringify(profile));
}

/**
 * 사용자 프로필 불러오기
 */
function getUserProfile() {
  const profile = localStorage.getItem('userProfile');
  return profile ? JSON.parse(profile) : null;
}

/**
 * 알림 설정 저장
 */
function saveNotificationSettings(settings) {
  localStorage.setItem('notificationSettings', JSON.stringify(settings));
}

/**
 * 알림 설정 불러오기
 */
function getNotificationSettings() {
  const settings = localStorage.getItem('notificationSettings');
  return settings ? JSON.parse(settings) : null;
}

/**
 * 페이지 로드 시 초기화
 */
function initializePage() {
  // 사용자 정보 로드
  const userProfile = getUserProfile();
  if (userProfile) {
    $('.settings-card').eq(0).find('input:eq(1)').val(userProfile.email || '');
    $('.settings-card').eq(0).find('input:eq(2)').val(userProfile.phone || '');
    $('.settings-card').eq(0).find('input:eq(3)').val(userProfile.birthDate || '');
  }

  // 알림 설정 로드
  const notificationSettings = getNotificationSettings();
  if (notificationSettings) {
    $('.toggle-switch input:eq(0)').prop('checked', notificationSettings.email);
    $('.toggle-switch input:eq(1)').prop('checked', notificationSettings.sms);
    $('.toggle-switch input:eq(2)').prop('checked', notificationSettings.marketing);
  }

  // 첫 번째 탭 활성화
  $('.tab-nav-btn').first().addClass('active');
  $('.tab-pane').first().addClass('active');

  // 예약 탭 초기화
  $('.service-tab-btn').first().addClass('active');
  $('.reservation-group').addClass('active');
}

/**
 * 날짜 포맷팅
 */
function formatDate(date) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(date).toLocaleDateString('ko-KR', options);
}

/**
 * 가격 포맷팅
 */
function formatPrice(price) {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW'
  }).format(price);
}