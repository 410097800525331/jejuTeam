import { setVerificationSuccessAction, setUsernameCheckAction } from './signup_state.js';
import { API_BASE_URL } from '../../../core/config/api_config.js';

const SOCIAL_CONFIG_DEFAULTS = Object.freeze({
  KAKAO_JS_KEY: '',
  NAVER_CLIENT_ID: ''
});

let cachedSocialConfig = null;

const normalizeSocialConfig = (payload) => {
  const social = payload && typeof payload === 'object' ? (payload.social || {}) : {};

  return {
    KAKAO_JS_KEY: String(social.kakaoJsKey || '').trim(),
    NAVER_CLIENT_ID: String(social.naverClientId || '').trim()
  };
};

const fetchSocialConfig = async () => {
  if (cachedSocialConfig) {
    return { ...cachedSocialConfig };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/public/config`, {
      method: 'GET',
      credentials: 'same-origin'
    });

    if (!response.ok) {
      throw new Error(`public config request failed (${response.status})`);
    }

    const payload = await response.json();
    cachedSocialConfig = {
      ...SOCIAL_CONFIG_DEFAULTS,
      ...normalizeSocialConfig(payload)
    };
  } catch (error) {
    console.error('[SignUp] Failed to load social config', error);
    cachedSocialConfig = { ...SOCIAL_CONFIG_DEFAULTS };
  }

  return { ...cachedSocialConfig };
};

const ensureKakaoSdkReady = async () => {
  if (typeof Kakao === 'undefined') {
    return { ok: false, message: '카카오 SDK를 불러오지 못했습니다' };
  }

  const socialConfig = await fetchSocialConfig();
  if (!socialConfig.KAKAO_JS_KEY) {
    return { ok: false, message: '카카오 JavaScript 키가 설정되지 않았습니다' };
  }

  if (!Kakao.isInitialized()) {
    Kakao.init(socialConfig.KAKAO_JS_KEY);
  }

  return { ok: true };
};

const resolveNaverCallbackUrl = () => {
  return new URL(window.location.pathname, window.location.origin).href;
};

export const checkIdAvailability = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        action: 'checkId',
        id: userId
      })
    });

    const data = await response.json();
    setUsernameCheckAction(userId, data.success);
    return data.success;
  } catch (error) {
    console.error('Failed to check ID availability using backend', error);
    alert('서버와 통신할 수 없습니다');
    setUsernameCheckAction(userId, false);
    return false;
  }
};

export const triggerPassAuth = async () => {
  return new Promise((resolve) => {
    const mockWindow = window.open('', '_blank', 'width=500,height=600');
    if (mockWindow) {
      mockWindow.document.write(`
        <div style="font-family: sans-serif; padding: 20px; text-align: center;">
          <h2>PASS 인증 시뮬레이션</h2>
          <p>사용자 인증 진행중</p>
        </div>
      `);
      setTimeout(() => {
        mockWindow.close();
        const data = {
          success: true,
          data: {
            method: 'PASS',
            name: '제주사용자',
            phone: '010-1234-5678',
            gender: 'M'
          }
        };
        setVerificationSuccessAction(data.data);
        resolve(data);
      }, 1500);
    } else {
      alert('팝업 차단을 해제해 주세요');
      resolve({ success: false });
    }
  });
};

export const triggerSocialAuth = async (provider) => {
  if (provider === 'kakao') {
    return new Promise(async (resolve) => {
      const sdkReady = await ensureKakaoSdkReady();
      if (!sdkReady.ok) {
        alert(sdkReady.message);
        resolve({ success: false });
        return;
      }

      Kakao.Auth.login({
        success: function () {
          Kakao.API.request({
            url: '/v2/user/me',
            success: function (res) {
              const data = {
                method: 'KAKAO',
                name: res.kakao_account?.name || res.properties?.nickname || '',
                phone: res.kakao_account?.phone_number || '010-0000-0000',
                gender: res.kakao_account?.gender === 'male' ? 'M' : 'F'
              };
              setVerificationSuccessAction(data);
              resolve({ success: true, data });
            },
            fail: function (error) {
              console.error(error);
              resolve({ success: false });
            }
          });
        },
        fail: function (error) {
          console.error(error);
          resolve({ success: false });
        }
      });
    });
  }

  if (provider === 'naver') {
    const socialConfig = await fetchSocialConfig();

    return new Promise((resolve) => {
      if (typeof naver === 'undefined' || typeof naver.LoginWithNaverId === 'undefined') {
        alert('네이버 SDK를 불러오지 못했습니다');
        resolve({ success: false });
        return;
      }

      if (!socialConfig.NAVER_CLIENT_ID) {
        alert('네이버 Client ID가 설정되지 않았습니다');
        resolve({ success: false });
        return;
      }

      try {
        // Naver SDK v2 expects a target container for its internal button renderer.
        // Keep it hidden because we trigger auth with our custom button.
        const naverSdkContainerId = 'naverIdLogin';
        let naverSdkContainer = document.getElementById(naverSdkContainerId);
        if (!naverSdkContainer) {
          naverSdkContainer = document.createElement('div');
          naverSdkContainer.id = naverSdkContainerId;
          naverSdkContainer.style.display = 'none';
          document.body.appendChild(naverSdkContainer);
        }

        const naverLogin = new naver.LoginWithNaverId({
          clientId: socialConfig.NAVER_CLIENT_ID,
          callbackUrl: resolveNaverCallbackUrl(),
          isPopup: true,
          loginButton: { color: 'green', type: 3, height: 60 }
        });

        naverLogin.init();
        naverLogin.getLoginStatus(function (status) {
          if (status) {
            const data = {
              method: 'NAVER',
              name: naverLogin.user.getName() || '',
              phone: naverLogin.user.getMobile() || '',
              gender: naverLogin.user.getGender() === 'M' ? 'M' : 'F'
            };
            setVerificationSuccessAction(data);
            resolve({ success: true, data });
            return;
          }

          naverLogin.authorize();
          resolve({ success: false, pending: true });
        });
      } catch (error) {
        console.error('[SignUp] Naver auth initialization failed', error);
        resolve({ success: false });
      }
    });
  }

  if (provider === 'pass') {
    return triggerPassAuth();
  }

  return { success: false };
};

export const initDaumPostcode = (callback) => {
  if (typeof daum !== 'undefined' && daum.Postcode) {
    new daum.Postcode({
      oncomplete: function (data) {
        callback(data);
      }
    }).open();
    return;
  }

  console.error('Daum API not loaded');
  alert('주소 API를 불러오지 못했습니다');
};

export const submitSignup = async (payload) => {
  const params = new URLSearchParams();
  params.append('id', payload.id);
  params.append('pw', payload.pw);
  params.append('name', payload.name);
  params.append('phone', payload.phone);
  params.append('email', payload.email);
  params.append('birthDate', payload.birthDate);
  params.append('rrnBackFirstDigit', payload.rrnBackFirstDigit);
  params.append('gender', payload.gender);
  params.append('provider', payload.provider);

  const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params
  });

  let responseBody = {};
  try {
    responseBody = await response.json();
  } catch (_) {
    responseBody = {};
  }

  if (!response.ok || responseBody.success === false) {
    const message = responseBody.message || `Signup failed (${response.status})`;
    throw new Error(message);
  }

  return responseBody;
};
