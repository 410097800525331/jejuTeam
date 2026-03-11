import { resolveFromAppRoot } from "@runtime/utils/appRoot";
import { getFallbackHomeUrl, safeNavigate } from "@runtime/utils/navigation";

const parseRouteParams = (element: Element) => {
  const raw = element.getAttribute("data-route-params");
  if (!raw) {
    return {};
  }

  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch (_error) {
    return {};
  }
};

const redirectByRoute = async (element: Element) => {
  const routeKey = element.getAttribute("data-route");
  if (!routeKey) {
    return;
  }

  try {
    const resolverPath = resolveFromAppRoot("core/utils/path_resolver.js");
    const resolverModule = await import(resolverPath);
    const targetUrl = resolverModule.resolveRoute(routeKey, parseRouteParams(element));
    safeNavigate(targetUrl, "shell-runtime-fallback");
  } catch (_error) {
    safeNavigate(getFallbackHomeUrl(), "shell-runtime-fallback-home");
  }
};

let binderInitialized = false;

export const ensureRouteBinder = async () => {
  if (binderInitialized) {
    return;
  }

  binderInitialized = true;

  try {
    const binderPath = resolveFromAppRoot("core/utils/router_binder.js");
    const binderModule = await import(binderPath);
    binderModule.initRouterBinder();
    return;
  } catch (error) {
    console.warn("[ShellRuntime] router binder load failed", error);
  }

  document.body.addEventListener("click", async (event) => {
    const routeElement = (event.target as HTMLElement | null)?.closest("[data-route]");
    if (!routeElement) {
      return;
    }

    event.preventDefault();
    await redirectByRoute(routeElement);
  });
};
