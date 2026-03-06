import { deepFreeze } from '../utils/object_util.js';

/**
 * API 엔드포인트 상수 모음
 * 현재 프로젝트에서는 직접 사용 빈도가 낮아도 기준 주소는 로컬 9090으로 맞춤
 */
export const ENDPOINTS = deepFreeze({
  BASE_URL: 'http://localhost:9090/api',

  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/member/signup',
    LOGOUT: '/auth/logout',
    DUPLICATE_CHECK: '/member/userid-check'
  },
  USER: {
    PROFILE: '/member/me',
    UPDATE: '/member/update',
    WITHDRAW: '/member/withdraw'
  },
  RESERVATION: {
    LIST: '/reservations',
    DETAIL: '/reservations/',
    CANCEL: '/reservations/cancel'
  }
});
