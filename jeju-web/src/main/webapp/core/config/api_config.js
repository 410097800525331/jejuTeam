// core/config/api_config.js

/**
 * 프런트와 백엔드가 같은 서버에 배포될 때는 상대 경로를 우선 사용함
 * 로컬에서 프런트만 따로 띄우는 경우에만 명시적인 로컬 API 주소를 붙임
 */

const REMOTE_API_BASE_URL = 'https://jejugroup.alwaysdata.net';
const LOCAL_API_BASE_URL = 'http://localhost:9090/jeju-web';
const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1']);

const getApiBaseUrl = () => {
    // URL 파라미터로 API 대상을 강제 선택할 수 있게 유지
    const params = new URLSearchParams(window.location.search);
    const apiTarget = params.get('api');

    if (apiTarget === 'local') return LOCAL_API_BASE_URL;
    if (apiTarget === 'remote') return REMOTE_API_BASE_URL;

    const currentHost = window.location.hostname;

    // 운영 서버에서는 같은 오리진 기준 상대 경로 사용
    if (!LOCAL_HOSTS.has(currentHost)) {
        return '';
    }

    // 로컬에서 프런트가 별도 포트로 뜨면 로컬 백엔드 주소를 직접 사용
    return window.location.port !== '9090' ? LOCAL_API_BASE_URL : '';
};

export const API_BASE_URL = getApiBaseUrl();
