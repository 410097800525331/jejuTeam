import { useCallback, useEffect, useMemo, useReducer } from "react";
import { AuthCard } from "./AuthCard";
import { FormField } from "./FormField";

const SAVED_ID_KEY = "jeju:login-id";

interface LoginState {
  errorMessage: string;
  loginId: string;
  password: string;
  rememberId: boolean;
  submitting: boolean;
}

type LoginAction =
  | { type: "SET_ERROR"; payload: string }
  | { type: "SET_ID"; payload: string }
  | { type: "SET_PASSWORD"; payload: string }
  | { type: "SET_REMEMBER"; payload: boolean }
  | { type: "SET_SUBMITTING"; payload: boolean };

const getSavedLoginId = () => {
  try {
    return localStorage.getItem(SAVED_ID_KEY) ?? "";
  } catch (_error) {
    return "";
  }
};

const initialState = (): LoginState => {
  const savedLoginId = getSavedLoginId();

  return {
    errorMessage: "",
    loginId: savedLoginId,
    password: "",
    rememberId: savedLoginId.length > 0,
    submitting: false,
  };
};

const reducer = (state: LoginState, action: LoginAction): LoginState => {
  switch (action.type) {
    case "SET_ERROR":
      return { ...state, errorMessage: action.payload };
    case "SET_ID":
      return { ...state, errorMessage: "", loginId: action.payload };
    case "SET_PASSWORD":
      return { ...state, errorMessage: "", password: action.payload };
    case "SET_REMEMBER":
      return { ...state, rememberId: action.payload };
    case "SET_SUBMITTING":
      return { ...state, submitting: action.payload };
    default:
      return state;
  }
};

const navigateAfterLogin = async (sessionData: Record<string, unknown>) => {
  // @ts-expect-error 레거시 JS 브리지 모듈
  const routesModule = import("../../../core/constants/routes.js");
  // @ts-expect-error 레거시 JS 브리지 모듈
  const pathResolverModule = import("../../../core/utils/path_resolver.js");
  // @ts-expect-error 레거시 JS 브리지 모듈
  const localAdminModule = import("../../../core/auth/local_admin.js");
  const [{ ROUTES }, { resolveRoute }, { isLocalFrontEnvironment }] = await Promise.all([
    routesModule,
    pathResolverModule,
    localAdminModule,
  ]);

  const urlParams = new URLSearchParams(window.location.search);
  const redirectUrl = urlParams.get("redirect");

  if (redirectUrl && !redirectUrl.startsWith("javascript:") && !redirectUrl.startsWith("data:")) {
    window.location.replace(redirectUrl);
    return;
  }

  const routeKey =
    isLocalFrontEnvironment() &&
    typeof sessionData.role === "string" &&
    sessionData.role.includes("ADMIN")
      ? "ADMIN.DASHBOARD"
      : "HOME";

  try {
    const targetUrl = resolveRoute(routeKey);
    if (window.__JEJU_ROUTE_NAVIGATOR__?.safeNavigate) {
      window.__JEJU_ROUTE_NAVIGATOR__.safeNavigate(targetUrl, "login-success");
      return;
    }
    window.location.replace(targetUrl);
  } catch (_error) {
    window.location.replace(routeKey === "ADMIN.DASHBOARD" ? ROUTES.ADMIN.DASHBOARD : ROUTES.HOME);
  }
};

export const LoginApp = () => {
  const [state, dispatch] = useReducer(reducer, undefined, initialState);

  const isDisabled = useMemo(() => {
    return state.submitting || state.loginId.trim().length === 0 || state.password.trim().length === 0;
  }, [state.loginId, state.password, state.submitting]);

  useEffect(() => {
    try {
      if (state.rememberId && state.loginId.trim()) {
        localStorage.setItem(SAVED_ID_KEY, state.loginId.trim());
        return;
      }

      localStorage.removeItem(SAVED_ID_KEY);
    } catch (_error) {
      // 저장 실패는 UI 흐름을 막지 않는 상태
    }
  }, [state.loginId, state.rememberId]);

  const handleIdChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    dispatch({ type: "SET_ID", payload: event.target.value });
  }, []);

  const handlePasswordChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    dispatch({ type: "SET_PASSWORD", payload: event.target.value });
  }, []);

  const handleRememberChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    dispatch({ type: "SET_REMEMBER", payload: event.target.checked });
  }, []);

  const handleSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(async (event) => {
    event.preventDefault();

    const rawId = state.loginId.trim();
    const rawPw = state.password.trim();

    try {
      dispatch({ type: "SET_SUBMITTING", payload: true });
      dispatch({ type: "SET_ERROR", payload: "" });

      // @ts-expect-error 레거시 JS 브리지 모듈
      const sanitizerModule = import("../../../core/utils/sanitizer.js");
      // @ts-expect-error 레거시 JS 브리지 모듈
      const sessionModule = import("../../../core/auth/session_manager.js");
      // @ts-expect-error 레거시 JS 브리지 모듈
      const configModule = import("../../../core/config/api_config.js");
      const [{ validateParam, sanitizeHTML }, { saveSession }, { API_BASE_URL }] = await Promise.all([
        sanitizerModule,
        sessionModule,
        configModule,
      ]);

      if (!validateParam(rawId) || !validateParam(rawPw)) {
        window.alert("잘못된 입력 형식이 포함되어 있습니다.");
        return;
      }

      const params = new URLSearchParams();
      params.append("id", sanitizeHTML(rawId));
      params.append("pw", sanitizeHTML(rawPw));

      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        body: params,
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "POST",
      });

      if (!response.ok) {
        let message = "로그인에 실패했습니다.";

        try {
          const errorPayload = await response.json();
          message = errorPayload.message || message;
        } catch (_error) {
          // 응답 파싱 실패는 기본 메시지 유지 상태
        }

        throw new Error(message);
      }

      const data = await response.json();
      const savedSession = saveSession(data.user);
      await navigateAfterLogin(savedSession);
    } catch (error) {
      const message = error instanceof Error ? error.message : "로그인에 실패했습니다.";
      console.error("[LoginApp] login failed", error);
      dispatch({ type: "SET_ERROR", payload: message });
    } finally {
      dispatch({ type: "SET_SUBMITTING", payload: false });
    }
  }, [state.loginId, state.password]);

  return (
    <AuthCard>
      <div className="login-header">
        <h1 className="login-title">로그인</h1>
        <p className="login-desc">포인트 적립에서 운임 할인까지 회원 전용 혜택을 받아보세요.</p>
      </div>

      <form className="login-form" id="user_form" onSubmit={handleSubmit}>
        <FormField
          autoComplete="username"
          id="id"
          label="이메일/아이디"
          onChange={handleIdChange}
          placeholder="아이디 또는 이메일 입력"
          value={state.loginId}
        />

        <FormField
          autoComplete="current-password"
          id="pw"
          label="비밀번호"
          onChange={handlePasswordChange}
          placeholder="비밀번호 입력"
          type="password"
          value={state.password}
        />

        <div
          className="error-wrapper"
          id="login-error-wrapper"
          style={{ display: state.errorMessage ? "block" : "none" }}
        >
          <p className="error-msg">{state.errorMessage}</p>
        </div>

        <div className="login_options">
          <label className="remember-me">
            <input checked={state.rememberId} id="saveId" onChange={handleRememberChange} type="checkbox" />
            <span>아이디 저장</span>
          </label>

          <div className="nav-links">
            <a href="#">아이디/비밀번호 찾기</a>
            <span className="divider">|</span>
            <a className="route-link" data-route="AUTH.SIGNUP" href="#">
              회원가입
            </a>
          </div>
        </div>

        <button className="login-btn btn" data-state={state.submitting ? "loading" : "idle"} disabled={isDisabled} type="submit">
          {state.submitting ? "로그인 중" : "로그인"}
        </button>
      </form>
    </AuthCard>
  );
};
