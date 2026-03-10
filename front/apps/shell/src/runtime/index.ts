import { bindHeaderGlobalEvents, initHeader } from "@runtime/layout/header";
import { initMegaMenu } from "@runtime/layout/megaMenu";
import { ensureRouteBinder } from "@runtime/layout/routeBridge";
import { mountHotelShell, mountMainShell } from "@runtime/layout/shellMount";
import { ensureStaggerBinding, initStaggerNav } from "@runtime/layout/stagger";
import { initFooter } from "@runtime/layout/footer";
import { reservationDrawer } from "@runtime/ui/drawer";
import { setupLegacyFab } from "@runtime/ui/fab";
import { createRangeCalendar, installRangeCalendarGlobal } from "@runtime/ui/rangeCalendar";
import { setupLegacyChatbot } from "@runtime/widget/chatbot";
import { setupWeatherWidget } from "@runtime/widget/weather";

let globalsInstalled = false;
let drawerBound = false;

const bindDrawerAction = () => {
  if (drawerBound) {
    return;
  }

  drawerBound = true;

  document.body.addEventListener("click", async (event) => {
    const actionElement = (event.target as HTMLElement | null)?.closest('[data-action="OPEN_RESERVATION_DRAWER"]');
    if (!actionElement) {
      return;
    }

    event.preventDefault();
    await reservationDrawer.open();
  });
};

export const installLegacyGlobals = () => {
  if (globalsInstalled) {
    return;
  }

  globalsInstalled = true;

  window.initHeader = () => initHeader();
  window.initFooter = () => initFooter();
  window.initMegaMenu = () => initMegaMenu();
  window.initStaggerNav = () => initStaggerNav();

  installRangeCalendarGlobal();
  bindHeaderGlobalEvents();
  ensureStaggerBinding();
  bindDrawerAction();

  void ensureRouteBinder();
};

export const mountMainShellRuntime = async () => {
  installLegacyGlobals();
  await mountMainShell();
};

export const mountHotelShellRuntime = async () => {
  installLegacyGlobals();
  await mountHotelShell();
};

export const ensureHeaderBehavior = () => {
  installLegacyGlobals();
  initHeader();
};

export const ensureFooterBehavior = () => {
  installLegacyGlobals();
  initFooter();
};

export const ensureMegaMenuBehavior = () => {
  installLegacyGlobals();
  initMegaMenu();
};

export const ensureStaggerNavBehavior = () => {
  installLegacyGlobals();
  initStaggerNav();
};

export const openReservationDrawer = async () => {
  installLegacyGlobals();
  await reservationDrawer.open();
};

export const closeReservationDrawer = () => {
  installLegacyGlobals();
  reservationDrawer.close();
};

export const setupLegacyFabRuntime = () => {
  installLegacyGlobals();
  setupLegacyFab();
};

export const setupLegacyChatbotRuntime = () => {
  installLegacyGlobals();
  setupLegacyChatbot();
};

export const setupWeatherWidgetRuntime = () => {
  installLegacyGlobals();
  setupWeatherWidget();
};

export const createRangeCalendarRuntime = (config?: Record<string, unknown>) => {
  installLegacyGlobals();
  return createRangeCalendar(config);
};

export const runtimeReservationDrawer = reservationDrawer;
