import { createRoot, Root } from "react-dom/client";
import { HtmlTemplate } from "@runtime/components/layout/HtmlTemplate";
import { initFooter } from "@runtime/layout/footer";
import { initHeader } from "@runtime/layout/header";
import { resolveFromAppRoot, getAppRoot } from "@runtime/utils/appRoot";

const roots = new Map<string, Root>();

const renderTemplate = (
  hostId: string,
  templatePath: string,
  onLoaded?: () => Promise<void> | void
) => {
  const host = document.getElementById(hostId);
  if (!host) {
    return;
  }

  const current = roots.get(hostId);
  if (current) {
    current.unmount();
  }

  const root = createRoot(host);
  roots.set(hostId, root);

  root.render(
    <HtmlTemplate
      path={templatePath}
      basePath={getAppRoot()}
      onLoaded={() => {
        Promise.resolve(onLoaded?.()).catch((error) => {
          console.error("[ShellRuntime] onLoaded failed", error);
        });
      }}
    />
  );
};

const dispatchLoadedEvent = (eventName: "mainHeaderLoaded" | "mainFooterLoaded") => {
  document.dispatchEvent(new Event(eventName));
};

const ensureLucideIcons = () => {
  const lucide = (window as { lucide?: { createIcons?: () => void } }).lucide;
  if (lucide?.createIcons) {
    lucide.createIcons();
  }
};

export const mountMainShell = async () => {
  const headerPath = resolveFromAppRoot("components/layout/header/main_header.html");
  const footerPath = resolveFromAppRoot("components/layout/footer/main_footer.html");

  renderTemplate("main-header-placeholder", headerPath, async () => {
    initHeader();
    ensureLucideIcons();
    dispatchLoadedEvent("mainHeaderLoaded");
  });

  renderTemplate("main-footer-placeholder", footerPath, async () => {
    initFooter();
    ensureLucideIcons();
    dispatchLoadedEvent("mainFooterLoaded");
  });
};

export const mountHotelShell = async () => {
  const headerPath = resolveFromAppRoot("components/layout/header/header.html");
  const footerPath = resolveFromAppRoot("components/layout/footer/footer.html");

  renderTemplate("hotel-header-placeholder", headerPath, async () => {
    initHeader();
    ensureLucideIcons();
    dispatchLoadedEvent("mainHeaderLoaded");
  });

  renderTemplate("hotel-footer-placeholder", footerPath, async () => {
    initFooter();
    ensureLucideIcons();
    dispatchLoadedEvent("mainFooterLoaded");
  });
};
