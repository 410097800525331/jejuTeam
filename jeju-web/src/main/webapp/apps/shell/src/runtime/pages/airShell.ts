interface PageShellHosts {
  footerHost: HTMLElement;
  headerHost: HTMLElement;
}

import { mountAirFooter } from "@runtime/pages/airFooter";

let jqueryLoadPromise: Promise<void> | null = null;
let airJqueryPatched = false;

const patchAirHeaderAssets = () => {
  const brokenMyPageIcons = Array.from(document.querySelectorAll<HTMLImageElement>('img[src$="icon-login.png"]'));
  brokenMyPageIcons.forEach((icon) => {
    icon.src = "assets/img/ico-my-page.png";
  });
};

const patchAirHeaderMarkupInjection = () => {
  if (airJqueryPatched) {
    return;
  }

  const jquery = (window as { jQuery?: { fn?: { append?: (...args: unknown[]) => unknown } } }).jQuery;
  const originalAppend = jquery?.fn?.append;
  if (!originalAppend || !jquery?.fn) {
    return;
  }

  airJqueryPatched = true;
  jquery.fn.append = function patchedAppend(...args: unknown[]) {
    const nextArgs = args.map((arg) => {
      if (typeof arg !== "string") {
        return arg;
      }

      return arg.replaceAll("assets/img/icon-login.png", "assets/img/ico-my-page.png");
    });

    return originalAppend.apply(this, nextArgs);
  };
};

const ensureJquery = async (loadScript: (src: string) => Promise<void>) => {
  if ((window as { jQuery?: unknown }).jQuery) {
    return;
  }

  if (!jqueryLoadPromise) {
    jqueryLoadPromise = loadScript("https://code.jquery.com/jquery-3.7.1.min.js");
  }

  await jqueryLoadPromise;
};

export const syncAirShellBase = (toAbsoluteUrl: (resourcePath: string) => string) => {
  let baseElement = document.getElementById("jeju-page-shell-base") as HTMLBaseElement | null;
  if (!baseElement) {
    baseElement = document.createElement("base");
    baseElement.id = "jeju-page-shell-base";
    document.head.prepend(baseElement);
  }

  baseElement.href = toAbsoluteUrl("jejuair/");
  document.body.classList.add("jejuair-main-content");
};

export const clearAirShellBase = () => {
  const baseElement = document.getElementById("jeju-page-shell-base");
  if (baseElement) {
    baseElement.remove();
  }

  document.body.classList.remove("jejuair-main-content");
};

export const mountAirPageShell = async (
  hosts: PageShellHosts,
  options: {
    loadScript: (src: string) => Promise<void>;
    loadStyle: (href: string) => void;
  },
) => {
  options.loadStyle("jejuair/css/main.css");
  hosts.headerHost.innerHTML = '<header id="header_wrap"></header>';
  hosts.footerHost.innerHTML = '<footer id="footer_wrap"></footer>';
  const footerRoot = hosts.footerHost.querySelector<HTMLElement>("#footer_wrap");
  if (footerRoot) {
    mountAirFooter(footerRoot);
  }

  await ensureJquery(options.loadScript);
  patchAirHeaderMarkupInjection();
  await options.loadScript("jejuair/js/header.js");
  patchAirHeaderAssets();
};
