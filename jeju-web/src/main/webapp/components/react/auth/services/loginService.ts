const loadLoginModules = async () => {
  // @ts-expect-error 레거시 JS 모듈 로딩 목적
  const sanitizerModule = import("../../../../core/utils/sanitizer.js");
  // @ts-expect-error 레거시 JS 모듈 로딩 목적
  const sessionModule = import("../../../../core/auth/session_manager.js");
  // @ts-expect-error 레거시 JS 모듈 로딩 목적
  const configModule = import("../../../../core/config/api_config.js");

  return Promise.all([sanitizerModule, sessionModule, configModule]);
};

export const loginWithCredentials = async (loginId: string, password: string) => {
  const [{ sanitizeHTML, validateParam }, { saveSession }, { API_BASE_URL }] = await loadLoginModules();

  if (!validateParam(loginId) || !validateParam(password)) {
    throw new Error("잘못된 입력 형식이 포함된 상태");
  }

  const params = new URLSearchParams();
  params.append("id", sanitizeHTML(loginId));
  params.append("pw", sanitizeHTML(password));

  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    body: params,
    credentials: "include",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
  });

  if (!response.ok) {
    let message = "로그인에 실패한 상태";

    try {
      const payload = await response.json();
      message = typeof payload.message === "string" && payload.message ? payload.message : message;
    } catch (_error) {
      // 응답 메시지가 비정상이면 기본 문구 유지 목적
    }

    throw new Error(message);
  }

  const data = await response.json();
  return saveSession(data.user);
};

export const navigateAfterLogin = async (sessionData: Record<string, unknown>) => {
  // @ts-expect-error 레거시 JS 모듈 로딩 목적
  const routesModule = import("../../../../core/constants/routes.js");
  // @ts-expect-error 레거시 JS 모듈 로딩 목적
  const pathResolverModule = import("../../../../core/utils/path_resolver.js");
  // @ts-expect-error 레거시 JS 모듈 로딩 목적
  const localAdminModule = import("../../../../core/auth/local_admin.js");

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
