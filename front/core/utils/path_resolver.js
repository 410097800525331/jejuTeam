import { ROUTES } from '../constants/routes.js';

const TOKEN_PATTERN = /:([A-Za-z0-9_]+)|\{([A-Za-z0-9_]+)\}/g;
const APP_BASE_URL = new URL('../../', import.meta.url);
const EXTERNAL_URL_PATTERN = /^[a-z][a-z0-9+.-]*:/i;
const SHELL_QUERY_KEY = 'shell';
const SHELL_STORAGE_KEY = 'jeju:mypage-shell';
const SHELL_VALUES = new Set(['main', 'stay', 'air']);
const AUTH_ROUTE_PATH_SEGMENT = '/pages/auth/';

const getNestedValue = (object, keyPath) => {
  return keyPath.split('.').reduce((acc, key) => {
    if (acc && typeof acc === 'object' && key in acc) {
      return acc[key];
    }
    return undefined;
  }, object);
};

const appendQueryString = (url, params, consumedKeys) => {
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (consumedKeys.has(key) || value === undefined || value === null) {
      continue;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item !== undefined && item !== null) {
          query.append(key, String(item));
        }
      });
      continue;
    }

    query.append(key, String(value));
  }

  const queryString = query.toString();
  if (!queryString) {
    return url;
  }

  return `${url}${url.includes('?') ? '&' : '?'}${queryString}`;
};

const toAbsolutePath = (pathLike) => {
  if (EXTERNAL_URL_PATTERN.test(pathLike)) {
    return pathLike;
  }

  const normalizedPath = pathLike.startsWith('/') ? pathLike.slice(1) : pathLike;
  return new URL(normalizedPath, APP_BASE_URL).href;
};

const normalizeShell = (value) => {
  if (typeof value !== 'string') {
    return null;
  }

  const normalized = value.trim().toLowerCase();
  return SHELL_VALUES.has(normalized) ? normalized : null;
};

const resolveShellFromPathname = (pathname = '') => {
  const normalizedPathname = String(pathname).toLowerCase();
  if (normalizedPathname.includes('/jejuair/')) {
    return 'air';
  }

  if (normalizedPathname.includes('/jejustay/')) {
    return 'stay';
  }

  return 'main';
};

const resolveCurrentShell = () => {
  if (typeof window === 'undefined') {
    return 'main';
  }

  try {
    const searchParams = new URLSearchParams(window.location.search);
    const queryShell = normalizeShell(searchParams.get(SHELL_QUERY_KEY));
    if (queryShell) {
      return queryShell;
    }
  } catch (error) {
    // no-op
  }

  if (typeof document !== 'undefined') {
    const datasetShell = normalizeShell(document.body?.dataset?.mypageShell);
    if (datasetShell) {
      return datasetShell;
    }
  }

  try {
    const storedShell = normalizeShell(window.sessionStorage?.getItem(SHELL_STORAGE_KEY));
    if (storedShell) {
      return storedShell;
    }
  } catch (error) {
    // no-op
  }

  return resolveShellFromPathname(window.location.pathname);
};

const injectShellParamIfAuthRoute = (template, params) => {
  if (
    typeof template !== 'string' ||
    !template.includes(AUTH_ROUTE_PATH_SEGMENT) ||
    normalizeShell(params?.[SHELL_QUERY_KEY])
  ) {
    return params;
  }

  const currentShell = resolveCurrentShell();
  // auth 페이지에서는 stay 전용 셸이 스타일 의존성을 만족하지 못하므로 main 셸로 안전하게 고정
  const authShell = currentShell === 'stay' ? 'main' : currentShell;

  return {
    ...params,
    [SHELL_QUERY_KEY]: authShell
  };
};

/**
 * Resolve route key to runtime URL path.
 *
 * @param {string} routeKey - e.g. 'AUTH.LOGIN'
 * @param {Object} [params={}] - path variables and/or query params
 * @returns {string}
 */
export const resolveRoute = (routeKey, params = {}) => {
  if (typeof routeKey !== 'string' || routeKey.trim() === '') {
    throw new TypeError('[RouteResolver] routeKey must be a non-empty string.');
  }

  if (params === null || typeof params !== 'object' || Array.isArray(params)) {
    throw new TypeError('[RouteResolver] params must be a plain object.');
  }

  const normalizedRouteKey = routeKey.trim();
  const template = getNestedValue(ROUTES, normalizedRouteKey);
  if (typeof template !== 'string' || template.trim() === '') {
    throw new Error(`[RouteResolver] Route key not found: ${routeKey}`);
  }

  const enrichedParams = injectShellParamIfAuthRoute(template, params);
  const consumedKeys = new Set();
  const resolvedPath = template.replace(TOKEN_PATTERN, (_, colonKey, braceKey) => {
    const tokenKey = colonKey || braceKey;
    const tokenValue = enrichedParams[tokenKey];

    if (tokenValue === undefined || tokenValue === null) {
      throw new Error(`[RouteResolver] Missing route param: ${tokenKey} (${routeKey})`);
    }

    consumedKeys.add(tokenKey);
    return encodeURIComponent(String(tokenValue));
  });

  const absolutePath = toAbsolutePath(resolvedPath);
  return appendQueryString(absolutePath, enrichedParams, consumedKeys);
};
